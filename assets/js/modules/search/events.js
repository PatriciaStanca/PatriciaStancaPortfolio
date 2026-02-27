(function () {
  const ns = (window.SiteSearchModule = window.SiteSearchModule || {});

  // Wires all keyboard, input, click, and hash-navigation events for search.
  ns.bindEvents = (ctx) => {
    ctx.focusBtn?.addEventListener('click', () => {
      ctx.headerInput.focus();
      ctx.openSearch();
    });

    ctx.openBtn?.addEventListener('click', () => {
      ctx.openSearch();
    });

    ctx.headerInput.addEventListener('focus', ctx.openSearch);
    ctx.headerInput.addEventListener('input', (event) => {
      ctx.syncInputs('header', event.target.value);
      ctx.openSearch();
      ctx.renderResults(event.target.value);
    });

    ctx.panelInput.addEventListener('input', (event) => {
      ctx.syncInputs('panel', event.target.value);
      ctx.renderResults(event.target.value);
    });

    ctx.overlay.addEventListener('click', ctx.closeSearch);
    ctx.closeBtn?.addEventListener('click', ctx.closeSearch);

    ctx.drawer.addEventListener('click', (event) => {
      const suggestion = event.target.closest('[data-search-suggestion]');
      if (!suggestion) return;
      const value = suggestion.getAttribute('data-search-suggestion') || '';
      ctx.headerInput.value = value;
      ctx.panelInput.value = value;
      ctx.renderResults(value);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('is-search-open')) {
        ctx.closeSearch();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (document.body.classList.contains('is-search-open')) return;
      if (event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      if (event.key.length !== 1) return;
      ctx.headerInput.focus();
      ctx.headerInput.value = event.key;
      ctx.openSearch();
      ctx.renderResults(event.key);
    });

    window.addEventListener('load', () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;
      if (target.classList.contains('accordion-trigger')) {
        const panel = target.nextElementSibling;
        if (panel && panel.classList.contains('accordion-panel')) {
          target.setAttribute('aria-expanded', 'true');
          panel.classList.add('is-open');
          panel.style.display = 'block';
        }
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      ctx.highlightElement(target);
    });
  };
})();
