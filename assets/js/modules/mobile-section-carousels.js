(function () {
  'use strict';

  const mobile = window.matchMedia('(max-width: 700px)');
  const definitions = [
    ['.delivery-process', ':scope > article'],
    ['.technical-carousel-track', ':scope > .technical-slide'],
    ['.education-list', ':scope > .education-group'],
    ['.language-list', ':scope > .language-slide']
  ];

  const enhance = (trackSelector, itemSelector) => {
    const track = document.querySelector(trackSelector);
    if (!track || track.dataset.mobileCarouselReady === 'true') return;

    const items = Array.from(track.querySelectorAll(itemSelector));
    if (items.length < 2) return;

    track.dataset.mobileCarouselReady = 'true';
    track.classList.add('mobile-carousel-track');
    items.forEach((item, index) => {
      item.classList.add('mobile-carousel-item');
      item.classList.toggle('is-mobile-active', index === 0);
      if (mobile.matches) item.setAttribute('aria-hidden', String(index !== 0));
    });

    const progress = document.createElement('div');
    progress.className = 'mobile-carousel-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = `
      <span class="mobile-carousel-count"><b>01</b> / ${String(items.length).padStart(2, '0')}</span>
      <span class="mobile-carousel-line"><i></i></span>`;
    track.insertAdjacentElement('afterend', progress);

    const current = progress.querySelector('b');
    const bar = progress.querySelector('i');
    bar.style.width = `${100 / items.length}%`;
    let observer;

    const activate = (item) => {
      const index = Math.max(0, items.indexOf(item));
      items.forEach((candidate) => {
        const active = candidate === item;
        candidate.classList.toggle('is-mobile-active', active);
        if (mobile.matches) candidate.setAttribute('aria-hidden', String(!active));
        else candidate.removeAttribute('aria-hidden');
      });
      current.textContent = String(index + 1).padStart(2, '0');
      bar.style.width = `${100 / items.length}%`;
      bar.style.transform = `translateX(${index * 100}%)`;
    };

    const observe = () => {
      observer?.disconnect();
      if (!mobile.matches) {
        items.forEach((item) => item.removeAttribute('aria-hidden'));
        return;
      }
      if (!('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.intersectionRatio >= 0.55) activate(visible.target);
      }, { root: track, threshold: [0.55, 0.7, 0.85] });
      items.forEach((item) => observer.observe(item));
    };

    track.addEventListener('keydown', (event) => {
      if (!mobile.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const active = items.findIndex((item) => item.classList.contains('is-mobile-active'));
      const next = event.key === 'ArrowRight'
        ? Math.min(items.length - 1, active + 1)
        : Math.max(0, active - 1);
      items[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });

    track.tabIndex = 0;
    observe();
    mobile.addEventListener?.('change', observe);
  };

  definitions.forEach(([track, item]) => enhance(track, item));
})();
