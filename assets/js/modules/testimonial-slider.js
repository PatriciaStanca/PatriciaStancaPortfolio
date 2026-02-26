(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Moves testimonials left or right.
(function () {
  const track = document.getElementById('testimonial-track');
  if (!track) return;
  const prev = track.parentElement.querySelector('.slider-btn.left');
  const next = track.parentElement.querySelector('.slider-btn.right');

  const getStep = () => {
    const card = track.querySelector('.testimonial-card');
    if (!card) return 320;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return card.getBoundingClientRect().width + (isNaN(gap) ? 0 : gap);
  };

  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
})();
  });
})();
