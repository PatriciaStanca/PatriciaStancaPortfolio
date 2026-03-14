(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// reveals sections as you scroll down the page.
(function () {
  const selectors = [
    '.section-title',
    '.page-lead',
    '.intro-long',
    '.reveal-force',
    '.summary-card',
    '.key-card',
    '.highlight-item',
    '.skill-node',
    '.skill-node-icon',
    '.skill-node h3',
    '.skill-desc',
    '.skill-node-chips span',
    '.logo-track img',
    '.education-group',
    '.language-card',
    '.accordion-panel',
    '.accordion-trigger',
    '.project-text',
    '.testimonial-card',
    '.role-card',
    '.reference-card',
    '.weather-card',
    '.contact-card',
    '.contact-visual',
    '.cv-embed',
    '#footer .section-title',
    '.footer-col',
    '.footer-decor',
    '.footer-wave',
    '.footer-icon-row',
  ];

  const elements = selectors
    .flatMap((sel) => Array.from(document.querySelectorAll(sel)))
    .filter((el) => !el.classList.contains('page-title'));

  if (!elements.length) return;

  const groups = new Map();
  elements.forEach((el) => {
    const group = el.closest('.summary-grid, .testimonial-grid, .role-track, .footer-grid, .skill-flow, .education-list, .language-list, .logo-track, .key-achievements, .highlights-grid');
    if (!group) return;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(el);
  });

  const groupDelay = new Map();
  groups.forEach((els) => {
    els.forEach((el, idx) => {
      groupDelay.set(el, idx * 120);
    });
  });

  // Reveal order: icon, title, text, chips.
  const skillNodes = document.querySelectorAll('.skill-node');
  skillNodes.forEach((node) => {
    const sequence = [];
    const icon = node.querySelector('.skill-node-icon');
    const title = node.querySelector('h3');
    const desc = node.querySelector('.skill-desc');
    if (icon) sequence.push(icon);
    if (title) sequence.push(title);
    if (desc) sequence.push(desc);
    const chips = Array.from(node.querySelectorAll('.skill-node-chips span'));
    sequence.push(...chips);
    sequence.forEach((el, idx) => {
      groupDelay.set(el, idx * 80);
    });
  });

  elements.forEach((el, idx) => {
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    const manualDelay = el.getAttribute('data-reveal-delay');
    if (manualDelay !== null && manualDelay !== '') {
      el.style.transitionDelay = `${Number(manualDelay)}ms`;
      return;
    }
    const localDelay = groupDelay.get(el);
    const delay = typeof localDelay === 'number' ? localDelay : Math.min(idx * 30, 300);
    el.style.transitionDelay = `${delay}ms`;
  });

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const initiallyVisible = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < viewportHeight * 0.9;
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
  );

  elements.forEach((el) => {
    if (initiallyVisible(el)) {
      el.style.transitionDelay = '0ms';
      el.classList.add('is-visible');
      return;
    }
    observer.observe(el);
  });
})();
  });
})();
