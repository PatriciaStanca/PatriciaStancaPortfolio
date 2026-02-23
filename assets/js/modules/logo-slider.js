(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Logo slider (index)
(function () {
  const track = document.querySelector('.logo-track');
  const left = document.querySelector('.slider-btn.left');
  const right = document.querySelector('.slider-btn.right');
  if (!track || !left || !right) return;
  right.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' });
  });
  left.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });
})();
  });
})();
