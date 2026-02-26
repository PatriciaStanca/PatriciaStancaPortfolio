(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Opens and closes accordion items.
(function () {
  const triggers = Array.from(document.querySelectorAll('[data-accordion] .accordion-trigger'));
  if (!triggers.length) return;

  const syncPanel = (trigger) => {
    const panel = trigger.nextElementSibling;
    if (!panel || !panel.classList.contains('accordion-panel')) return;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    panel.classList.toggle('is-open', isOpen);
    panel.style.display = isOpen ? 'block' : 'none';
  };

  triggers.forEach((trigger) => syncPanel(trigger));

  document.addEventListener(
    'click',
    (event) => {
      const trigger = event.target.closest('[data-accordion] .accordion-trigger');
      if (!trigger) return;
      const panel = trigger.nextElementSibling;
      if (!panel || !panel.classList.contains('accordion-panel')) return;
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
      panel.style.display = !open ? 'block' : 'none';
    },
    true
  );
})();
  });
})();
