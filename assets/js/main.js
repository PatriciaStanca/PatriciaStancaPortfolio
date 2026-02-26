// This starts the site scripts when the page is ready.

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

  const loadLucideIcons = () => {
    if (!document.querySelector('[data-lucide]')) return;

    const renderIcons = () => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    };

    if (window.lucide) {
      renderIcons();
      return;
    }

    const script = document.createElement('script');
    script.src = 'assets/js/vendor/lucide.min.js';
    script.defer = true;
    script.addEventListener('load', renderIcons, { once: true });
    document.head.appendChild(script);
  };

  onReady(() => {
    const app = window.SiteApp;
    const initializers = app && Array.isArray(app.initializers) ? app.initializers : [];

    initializers.forEach((initFn) => {
      try {
        if (typeof initFn === 'function') initFn();
      } catch (err) {
        // If one module fails, keep the others running.
      }
    });

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadLucideIcons, { timeout: 800 });
    } else {
      window.setTimeout(loadLucideIcons, 200);
    }
  });
})();
