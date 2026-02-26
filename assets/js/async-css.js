// Promote print-media async stylesheets to all-media without inline handlers.
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

    // Fallback when load event is missed on cached resources.
    window.setTimeout(() => activate(link), 2500);
  });
})();
