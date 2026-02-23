(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Header dropdown (open only on Experience hover/focus)
(function () {
  const nav = document.querySelector('#header .top-nav');
  if (!nav) return;
  const trigger = nav.querySelector('.has-dropdown > a');
  const dropdown = nav.querySelector('.nav-dropdown');
  const navRow = nav.querySelector('.nav-row');
  if (!trigger || !dropdown) return;

  const updateOffset = () => {
    const navRect = nav.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const offset = Math.max(0, triggerRect.left - navRect.left);
    nav.style.setProperty('--dropdown-offset', `${offset}px`);
  };

  const open = () => nav.classList.add('is-dropdown-open');
  const close = () => nav.classList.remove('is-dropdown-open');

  updateOffset();
  window.addEventListener('resize', updateOffset);

  nav.addEventListener('mouseenter', open);
  nav.addEventListener('mouseleave', close);
  trigger.addEventListener('mouseenter', open);
  trigger.addEventListener('focus', open);
  dropdown.addEventListener('mouseenter', open);
  if (navRow) {
    const links = navRow.querySelectorAll('a');
    links.forEach((link) => {
      if (link === trigger) return;
      link.addEventListener('mouseenter', close);
      link.addEventListener('focus', close);
    });
  }
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) close();
  });
})();
  });
})();
