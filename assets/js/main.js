// Vanilla JS: bootstrap and feature module initialization

(function () {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  window.addEventListener('load', () => {
    window.setTimeout(() => {
      document.body.classList.remove('is-preload');
    }, 100);
  });

  onReady(() => {
    const app = window.SiteApp;
    const initializers = app && Array.isArray(app.initializers) ? app.initializers : [];

    initializers.forEach((initFn) => {
      try {
        if (typeof initFn === 'function') initFn();
      } catch (err) {
        // Keep other modules running even if one initializer fails.
      }
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
