document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#technical-skills');
  const track = section?.querySelector('.technical-carousel-track');
  const slides = track ? [
    track.querySelector('.technical-slide--specific'),
    track.querySelector('.technical-slide--everyday'),
    track.querySelector('.technical-slide--developing')
  ].filter(Boolean) : [];
  if (!track || slides.length !== 3) return;

  let current = 1;
  let frame = 0;

  const update = (index) => {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
  };

  const positionFor = (slide) => slide.offsetLeft - ((track.clientWidth - slide.offsetWidth) / 2);

  const goTo = (index, behavior = 'smooth') => {
    const target = Math.max(0, Math.min(index, slides.length - 1));
    const left = positionFor(slides[target]);
    if (behavior === 'instant') track.scrollLeft = left;
    else track.scrollTo({ left, behavior });
    update(target);
  };

  const detectCurrent = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const trackCenter = track.getBoundingClientRect().left + (track.clientWidth / 2);
      const distances = slides.map((slide) => Math.abs((slide.getBoundingClientRect().left + slide.offsetWidth / 2) - trackCenter));
      update(distances.indexOf(Math.min(...distances)));
    });
  };

  track.addEventListener('scroll', detectCurrent, { passive: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.intersectionRatio >= 0.55) update(slides.indexOf(visible.target));
    }, { root: track, threshold: [0.55, 0.75, 0.95] });
    slides.forEach((slide) => observer.observe(slide));
  }

  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    goTo(current + (event.key === 'ArrowRight' ? 1 : -1));
  });

  update(1);
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      goTo(1, 'instant');
      requestAnimationFrame(() => section.classList.add('technical-carousel-ready'));
    });
  }, { once: true });
});
