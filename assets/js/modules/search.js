(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// This lets people search across the site.
(function () {
  const ns = window.SiteSearchModule;
  if (!ns || typeof ns.createContext !== 'function') return;

  const ctx = ns.createContext();
  if (!ctx) return;

  if (typeof ns.attachIndex !== 'function') return;
  if (typeof ns.attachUi !== 'function') return;
  if (typeof ns.bindEvents !== 'function') return;

  ns.attachIndex(ctx);
  ns.attachUi(ctx);
  ns.bindEvents(ctx);
})();
  });
})();
