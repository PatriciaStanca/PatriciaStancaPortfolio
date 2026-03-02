(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Opens and closes the Experience dropdown.
(function () {
  const nav = document.querySelector('#header .top-nav');
  if (!nav) return;
  const parentItem = nav.querySelector('.has-dropdown');
  const trigger = nav.querySelector('.has-dropdown > a');
  const dropdown = nav.querySelector('.nav-dropdown');
  const navRow = nav.querySelector('.nav-row');
  if (!parentItem || !trigger || !dropdown) return;

  const updateOffset = () => {
    const navRect = nav.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const offset = Math.max(0, triggerRect.left - navRect.left);
    nav.style.setProperty('--dropdown-offset', `${offset}px`);
  };

  let closeTimer = null;
  const clearCloseTimer = () => {
    if (!closeTimer) return;
    window.clearTimeout(closeTimer);
    closeTimer = null;
  };
  const open = () => nav.classList.add('is-dropdown-open');
  const close = () => nav.classList.remove('is-dropdown-open');
  const closeSoon = () => {
    clearCloseTimer();
    closeTimer = window.setTimeout(close, 120);
  };

  updateOffset();
  window.addEventListener('resize', updateOffset);

  // Open only when interacting with the Experience menu item.
  parentItem.addEventListener('mouseenter', () => {
    clearCloseTimer();
    open();
  });
  nav.addEventListener('mouseenter', clearCloseTimer);
  nav.addEventListener('mouseleave', closeSoon);
  trigger.addEventListener('focus', () => {
    clearCloseTimer();
    open();
  });
  dropdown.addEventListener('mouseenter', () => {
    clearCloseTimer();
    open();
  });
  if (navRow) {
    const links = navRow.querySelectorAll('a');
    links.forEach((link) => {
      if (link === trigger) return;
      link.addEventListener('mouseenter', closeSoon);
      link.addEventListener('focus', closeSoon);
      link.addEventListener('click', closeSoon);
    });
  }
  dropdown.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeSoon);
  });
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) closeSoon();
  });
})();
  });
})();
