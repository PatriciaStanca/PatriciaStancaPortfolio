// turns async CSS on after each file is loaded.
(function () {
  const asyncLinks = document.querySelectorAll('link[data-async-css]');
  if (!asyncLinks.length) return;

  const activate = (link) => {
    link.media = 'all';
    link.removeAttribute('data-async-css');
  };

  asyncLinks.forEach((link) => {
    if (link.sheet) {
      activate(link);
      return;
    }

    link.addEventListener('load', () => activate(link), { once: true });

    // Backup: turn styles on after a short wait.
    window.setTimeout(() => activate(link), 2500);
  });
})();
