(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// opens, closes, and controls the mobile menu.
const menu = document.getElementById('menu');
const menuToggle = document.querySelector('.menu-toggle');
const header = document.getElementById('header');
const body = document.body;
let menuLocked = false;

const lockMenu = () => {
  if (menuLocked) return false;
  menuLocked = true;
  window.setTimeout(() => (menuLocked = false), 350);
  return true;
};

const syncHeaderHeight = () => {
  if (!header) return;
  body.style.setProperty('--header-height', `${header.offsetHeight}px`);
};

const resetOpenMenuPosition = (pageScroll) => {
  if (!menu) return;
  menu.scrollTop = 0;
  const inner = menu.querySelector('.inner');
  if (inner) inner.scrollTop = 0;
  requestAnimationFrame(() => window.scrollTo({ top: pageScroll, behavior: 'auto' }));
};

syncHeaderHeight();
window.addEventListener('resize', syncHeaderHeight);

const showMenu = () => {
  if (lockMenu()) {
    const pageScroll = window.scrollY;
    syncHeaderHeight();
    body.classList.add('is-menu-visible');
    resetOpenMenuPosition(pageScroll);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }
};

const hideMenu = () => {
  if (lockMenu()) {
    body.classList.remove('is-menu-visible');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }
};

const toggleMenu = () => {
  if (!lockMenu()) return;
  const pageScroll = window.scrollY;
  const isOpen = body.classList.toggle('is-menu-visible');
  if (isOpen) resetOpenMenuPosition(pageScroll);
  if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpen));
};

if (menu) {
  menu.addEventListener('click', (event) => {
    event.stopPropagation();
    hideMenu();
  });

  const inner = menu.querySelector('.inner');
  if (inner) {
    inner.addEventListener('click', (event) => event.stopPropagation());
    inner.addEventListener('click', (event) => {
      const accordion = event.target.closest('.mobile-accordion');
      if (accordion) {
        event.preventDefault();
        const parent = accordion.closest('.mobile-parent');
        const isOpen = parent && parent.classList.contains('is-open');
        if (parent) parent.classList.toggle('is-open', !isOpen);
        accordion.setAttribute('aria-expanded', String(!isOpen));
        return;
      }
    });
    inner.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '#menu') return;
      event.preventDefault();
      event.stopPropagation();
      hideMenu();
      window.setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideMenu();
  });
}
  });
})();
