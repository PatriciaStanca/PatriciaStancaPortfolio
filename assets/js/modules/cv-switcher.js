(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// CV embed switcher (cv.html)
(function () {
  const embed = document.getElementById('cv-embed');
  const fallback = document.getElementById('cv-fallback');
  const buttons = document.querySelectorAll('.cv-switch[data-cv]');
  if (!embed || buttons.length === 0) return;

  const setActive = (btn) => {
    buttons.forEach((button) => {
      const isActive = button === btn;
      button.setAttribute('aria-pressed', String(isActive));
      button.classList.toggle('btn-primary', isActive);
      button.classList.toggle('btn-secondary', !isActive);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const pdf = button.getAttribute('data-cv');
      if (!pdf) return;
      embed.setAttribute('data', pdf);
      if (fallback) fallback.setAttribute('href', pdf);
      setActive(button);
    });
  });
})();
  });
})();
