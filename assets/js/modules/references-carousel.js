(function () {
  'use strict';

  const track = document.querySelector('[data-reference-track]');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('[data-reference-card]'));
  const current = document.querySelector('[data-reference-current]');
  const bar = document.querySelector('[data-reference-bar]');
  const mobile = window.matchMedia('(max-width: 700px)');
  let observer;

  const activate = (card) => {
    const index = Math.max(0, cards.indexOf(card));
    cards.forEach((item) => item.classList.toggle('is-active', item === card));
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    if (bar) bar.style.transform = `translateX(${index * 100}%)`;
  };

  const start = () => {
    if (observer) observer.disconnect();
    cards.forEach((card, index) => card.classList.toggle('is-active', index === 0));
    if (!mobile.matches || !('IntersectionObserver' in window)) return;

    observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.intersectionRatio >= 0.55) activate(visible.target);
    }, {
      root: track,
      threshold: [0.55, 0.7, 0.85]
    });

    cards.forEach((card) => observer.observe(card));
  };

  start();
  mobile.addEventListener?.('change', start);
})();
