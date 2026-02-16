// Vanilla JS: core interactions (no external frameworks)

(function () {
  const onReady = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  // Remove preload class after load
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      document.body.classList.remove('is-preload');
    }, 100);
  });

  onReady(() => {
    // Weather widget (Open-Meteo, no API key)
    (function () {
      const weatherCard = document.querySelector('[data-weather], #weather .weather-card');
      if (!weatherCard) return;
      const tempEl = weatherCard.querySelector('.weather-temp');
      const metaEl = weatherCard.querySelector('.weather-meta');
      const iconEl = weatherCard.querySelector('.weather-icon i');

      const setIcon = (code) => {
        if (!iconEl) return;
        // Simple mapping for Open-Meteo weather codes
        let name = 'cloud-sun';
        if ([0].includes(code)) name = 'sun';
        if ([1, 2].includes(code)) name = 'cloud-sun';
        if ([3, 45, 48].includes(code)) name = 'cloud';
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) name = 'cloud-rain';
        if ([71, 73, 75, 77, 85, 86].includes(code)) name = 'cloud-snow';
        if ([95, 96, 99].includes(code)) name = 'cloud-lightning';
        iconEl.setAttribute('data-lucide', name);
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      };

      const fetchWeather = async (lat, lon, label) => {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('Weather error');
          const data = await res.json();
          const temp = data.current?.temperature_2m;
          const code = data.current?.weather_code;
          if (typeof temp === 'number') {
            tempEl.textContent = `${Math.round(temp)}°C`;
          } else {
            tempEl.textContent = 'Unavailable';
          }
          metaEl.textContent = label;
          if (typeof code === 'number') setIcon(code);
        } catch (err) {
          tempEl.textContent = 'Unavailable';
          metaEl.textContent = 'Weather service error';
        }
      };

      // Default: Gothenburg
      fetchWeather(57.7089, 11.9746, 'Gothenburg, Sweden');
    })();

    // Contact form validation (vanilla JS)
    (function () {
      const form = document.querySelector('.contact-form');
      if (!form) return;
      const fields = Array.from(form.querySelectorAll('input, textarea, select'));

      const getMessage = (field) => {
        if (field.validity.valueMissing) return 'This field is required.';
        if (field.validity.typeMismatch) return 'Please enter a valid email address.';
        if (field.validity.patternMismatch) {
          if (field.name === 'phone') return 'Please enter a valid phone number.';
          if (field.name === 'first_name' || field.name === 'last_name') return 'Please use letters only (no numbers) in the name.';
          return 'Please enter a valid value.';
        }
        if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
        return 'Please enter a valid value.';
      };

      // Extra regex validation using Validators (if available)
      const validateWithRegex = (field) => {
        if (!window.Validators) return true;
        const value = field.value.trim();
        if (field.name === 'first_name' || field.name === 'last_name') return window.Validators.name.test(value);
        if (field.name === 'email') return window.Validators.email.test(value);
        if (field.name === 'message') return window.Validators.minLength(10).test(value);
        return true;
      };

      const showError = (field) => {
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
        let error = field.parentElement.querySelector('.form-error');
        if (!error) {
          error = document.createElement('div');
          error.className = 'form-error';
          error.setAttribute('role', 'alert');
          error.setAttribute('aria-live', 'polite');
          if (field.id) error.id = `${field.id}-error`;
          field.parentElement.appendChild(error);
        }
        error.textContent = getMessage(field);
        if (error.id) field.setAttribute('aria-describedby', error.id);
      };

      const clearError = (field) => {
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
        const error = field.parentElement.querySelector('.form-error');
        if (error) error.remove();
        if (field.getAttribute('aria-describedby') === `${field.id}-error`) {
          field.removeAttribute('aria-describedby');
        }
      };

      fields.forEach((field) => {
        field.addEventListener('input', () => {
          if (field.checkValidity() && validateWithRegex(field)) clearError(field);
        });
        field.addEventListener('blur', () => {
          if (!field.checkValidity() || !validateWithRegex(field)) showError(field);
        });
      });

      form.addEventListener('submit', async (event) => {
        let firstInvalid = null;
        fields.forEach((field) => {
          if (!field.checkValidity() || !validateWithRegex(field)) {
            showError(field);
            if (!firstInvalid) firstInvalid = field;
          } else {
            clearError(field);
          }
        });
        if (firstInvalid) {
          event.preventDefault();
          firstInvalid.focus();
          return;
        }

        // If using Formspree, submit via fetch to avoid leaving the page.
        if (!form.hasAttribute('data-formspree')) return;
        event.preventDefault();
        const formData = new FormData(form);
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData,
          });
          const feedback = form.querySelector('.form-feedback');
          if (res.ok) {
            form.reset();
            if (feedback) {
              feedback.textContent = 'Thanks! Your message has been sent.';
              feedback.classList.remove('is-error');
              feedback.classList.add('is-success');
            }
          } else {
            if (feedback) {
              feedback.textContent = 'Sorry, something went wrong. Please try again.';
              feedback.classList.remove('is-success');
              feedback.classList.add('is-error');
            }
          }
        } catch (err) {
          const feedback = form.querySelector('.form-feedback');
          if (feedback) {
            feedback.textContent = 'Network error. Please try again.';
            feedback.classList.remove('is-success');
            feedback.classList.add('is-error');
          }
        }
      });
    })();

    // Mobile menu (if trigger exists)
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

    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    const showMenu = () => {
      if (lockMenu()) {
        syncHeaderHeight();
        body.classList.add('is-menu-visible');
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
      const isOpen = body.classList.toggle('is-menu-visible');
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

      document.addEventListener('click', (event) => {
        const trigger = event.target.closest('a[href="#menu"]');
        if (!trigger) return;
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hideMenu();
      });
    }

    // Logo slider (index)
    (function () {
      const track = document.querySelector('.logo-track');
      const left = document.querySelector('.slider-btn.left');
      const right = document.querySelector('.slider-btn.right');
      if (!track || !left || !right) return;
      right.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
      });
      left.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
      });
    })();

    // Accordion (elements)
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

    // Role cards slider (elements)
    (function () {
      const track = document.getElementById('role-cards');
      if (!track) return;
      const prev = track.parentElement.querySelector('.slider-btn.left');
      const next = track.parentElement.querySelector('.slider-btn.right');

      const getStep = () => {
        const card = track.querySelector('.role-card');
        if (!card) return 320;
        const styles = getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || 0);
        return card.getBoundingClientRect().width + (isNaN(gap) ? 0 : gap);
      };

      if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
      if (next) next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
    })();

    // Testimonials slider (elements)
    (function () {
      const track = document.getElementById('testimonial-track');
      if (!track) return;
      const prev = track.parentElement.querySelector('.slider-btn.left');
      const next = track.parentElement.querySelector('.slider-btn.right');

      const getStep = () => {
        const card = track.querySelector('.testimonial-card');
        if (!card) return 320;
        const styles = getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || 0);
        return card.getBoundingClientRect().width + (isNaN(gap) ? 0 : gap);
      };

      if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
      if (next) next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
    })();

    // Project video preview: show a preview frame, but play from the start.
    (function () {
      const videos = document.querySelectorAll('.project-video');
      if (!videos.length) return;
      videos.forEach((video) => {
        let hasReset = false;
        video.addEventListener('play', () => {
          if (hasReset) return;
          hasReset = true;
          if (video.currentTime > 1) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {});
            }
          }
        });
      });
    })();

    // Scroll reveal (all pages)
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

      // Stagger inside each skill card: icon -> title -> description -> chips
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

      elements.forEach((el) => observer.observe(el));
    })();

    // CV embed switcher (cv.html)
    (function () {
      const embed = document.getElementById('cv-embed');
      const fallback = document.getElementById('cv-fallback');
      const buttons = document.querySelectorAll('.cv-switch[data-cv]');
      if (!embed || buttons.length === 0) return;

      const setActive = (btn) => {
        buttons.forEach((button) => {
          const isActive = button === btn;
          button.setAttribute('aria-pressed', String(isActive));
          button.classList.toggle('btn-primary', isActive);
          button.classList.toggle('btn-secondary', !isActive);
        });
      };

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const pdf = button.getAttribute('data-cv');
          if (!pdf) return;
          embed.setAttribute('data', pdf);
          if (fallback) fallback.setAttribute('href', pdf);
          setActive(button);
        });
      });
    })();

    // Lucide: optional icon library that converts <i data-lucide> into SVGs (keeps HTML clean).
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
