(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// This lets people search across the site.
(function () {
  const searchRoot = document.querySelector('[data-search-root]');
  const overlay = document.querySelector('[data-search-overlay]');
  const drawer = document.querySelector('[data-search-drawer]');
  if (!searchRoot || !overlay || !drawer) return;
  const headerInput = searchRoot.querySelector('[data-search-input="header"]');
  const panelInput = drawer.querySelector('[data-search-input="panel"]');
  const resultsPanel = drawer.querySelector('[data-search-results]');
  const guidanceEl = drawer.querySelector('[data-search-guidance]');
  const focusBtn = searchRoot.querySelector('[data-search-focus]');
  const openBtn = document.querySelector('[data-search-open]');
  const closeBtn = drawer.querySelector('[data-search-close]');
  const headerEl = document.getElementById('header');

  if (!headerInput || !panelInput || !resultsPanel || !guidanceEl) return;

  const suggestions = ['Fabric', 'Power BI', 'Boplats', 'Gothenburg Energi', 'ML', 'Automation'];
  const defaultGuidance = 'Start typing to search the page.';
  const pageConfigs = [
    { url: 'index.html', label: 'Home' },
    { url: 'generic.html', label: 'About' },
    { url: 'elements.html', label: 'Experience' },
    { url: 'cv.html', label: 'CV' },
    { url: 'contact.html', label: 'Contact' },
    { url: 'privacy.html', label: 'Privacy' },
  ];

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isCurrentPage = (url) => url === currentPath;

  const normalize = (value) => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const splitTerms = (value) => normalize(value).split(' ').filter(Boolean);
  const slugify = (value) =>
    (value || '')
      .toLowerCase()
      .replace(/&amp;/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  const getSearchId = (type, title, index) => `search-${type}-${slugify(title)}-${index + 1}`;

  const assignSearchIds = (root) => {
    const projectTriggers = Array.from(root.querySelectorAll('.project-accordion .accordion-trigger'));
    projectTriggers.forEach((trigger, idx) => {
      if (!trigger.id) trigger.id = getSearchId('project', trigger.querySelector('.accordion-title')?.textContent || 'project', idx);
    });
    const roles = Array.from(root.querySelectorAll('.role-card'));
    roles.forEach((card, idx) => {
      if (!card.id) card.id = getSearchId('role', card.querySelector('h4')?.textContent || 'role', idx);
    });
    const references = Array.from(root.querySelectorAll('.testimonial-card'));
    references.forEach((card, idx) => {
      if (!card.id) card.id = getSearchId('reference', card.querySelector('.testimonial-author')?.textContent || 'reference', idx);
    });
  };

  const buildItemsFromRoot = (root, pageLabel, pageUrl) => {
    const items = [];
    const projectTriggers = Array.from(root.querySelectorAll('.project-accordion .accordion-trigger'));
    projectTriggers.forEach((trigger, idx) => {
      const panel = trigger.nextElementSibling;
      const title = trigger.querySelector('.accordion-title')?.textContent?.trim() || 'Untitled project';
      const meta = trigger.querySelector('.accordion-meta')?.textContent?.trim() || '';
      const company = trigger.getAttribute('data-company') || meta.split('·')[0]?.trim() || '';
      const tag = trigger.querySelector('.accordion-tag')?.textContent?.trim() || '';
      const tools = Array.from(panel?.querySelectorAll('.project-tools li') || [])
        .map((li) => li.textContent?.trim())
        .filter(Boolean);
      const bodyText = panel?.querySelector('.project-text')?.textContent?.trim() || '';
      const dataTags = trigger.getAttribute('data-tags') || '';
      const dataCategory = trigger.getAttribute('data-category') || '';
      const combined = [title, company, meta, tag, tools.join(' '), dataTags, dataCategory, bodyText].join(' ');

      const section = trigger.closest('section');
      const sectionId = section?.id || '';
      const isPersonal = sectionId === 'personal-projects';
      const groupLabel = isPersonal ? 'Personal Projects' : 'Work Projects';
      const contextLabel = isPersonal ? 'Personal Project' : 'Work Project';
      const anchorId = trigger.id || getSearchId('project', title, idx);

      items.push({
        type: 'project',
        trigger,
        panel,
        element: trigger,
        title,
        company: company || meta,
        subtitle: meta,
        group: groupLabel,
        context: contextLabel,
        combined,
        combinedNormalized: normalize(combined),
        titleNormalized: normalize(title),
        companyNormalized: normalize(company || meta),
        tagsNormalized: normalize([tag, tools.join(' '), dataTags, dataCategory].join(' ')),
        url: pageUrl,
        anchorId,
      });
    });

    const roleCards = Array.from(root.querySelectorAll('.role-card'));
    roleCards.forEach((card, idx) => {
      const title = card.querySelector('h4')?.textContent?.trim() || 'Previous role';
      const meta = card.querySelector('.role-meta')?.textContent?.trim() || '';
      const points = Array.from(card.querySelectorAll('.role-points li'))
        .map((li) => li.textContent?.trim())
        .filter(Boolean)
        .join(' ');
      const chips = Array.from(card.querySelectorAll('.role-chip'))
        .map((chip) => chip.textContent?.trim())
        .filter(Boolean)
        .join(' ');
      const combined = [title, meta, points, chips].join(' ');
      const anchorId = card.id || getSearchId('role', title, idx);
      items.push({
        type: 'role',
        element: card,
        title,
        company: meta,
        subtitle: meta,
        group: 'Previous Work',
        context: 'Previous Work',
        combined,
        combinedNormalized: normalize(combined),
        titleNormalized: normalize(title),
        companyNormalized: normalize(meta),
        tagsNormalized: normalize(chips),
        url: pageUrl,
        anchorId,
      });
    });

    const referenceCards = Array.from(root.querySelectorAll('.testimonial-card'));
    referenceCards.forEach((card, idx) => {
      const author = card.querySelector('.testimonial-author')?.textContent?.trim() || 'Reference';
      const text = card.querySelector('.testimonial-text')?.textContent?.trim() || '';
      const combined = [author, text].join(' ');
      const anchorId = card.id || getSearchId('reference', author, idx);
      items.push({
        type: 'reference',
        element: card,
        title: author || 'Reference',
        company: author,
        subtitle: '',
        group: 'References',
        context: 'Reference',
        combined,
        combinedNormalized: normalize(combined),
        titleNormalized: normalize(author || 'Reference'),
        companyNormalized: normalize(author),
        tagsNormalized: normalize(text),
        url: pageUrl,
        anchorId,
      });
    });

    const sectionItems = Array.from(root.querySelectorAll('main section'))
      .map((section) => {
        if (section.querySelector('.project-accordion, .role-card, .testimonial-card')) return null;
        const heading = section.querySelector('h2, h3, h4');
        const title = heading?.textContent?.trim() || 'Section';
        const combined = section.textContent?.trim() || '';
        const anchorId = section.id || getSearchId('section', title, 0);
        return {
          type: 'section',
          element: section,
          title,
          company: '',
          subtitle: '',
          group: pageLabel,
          context: 'Section',
          combined,
          combinedNormalized: normalize(combined),
          titleNormalized: normalize(title),
          companyNormalized: '',
          tagsNormalized: '',
          url: pageUrl,
          anchorId,
        };
      })
      .filter(Boolean);

    items.push(...sectionItems);
    return items;
  };

  assignSearchIds(document);

  let searchItems = buildItemsFromRoot(
    document,
    pageConfigs.find((page) => page.url === currentPath)?.label || 'Page',
    null
  );
  let indexReady = false;
  let indexPromise = null;

  const buildSiteIndex = async () => {
    const items = [...searchItems];
    const targets = pageConfigs.filter((page) => !isCurrentPage(page.url));
    await Promise.all(
      targets.map(async (page) => {
        try {
          const res = await fetch(page.url, { cache: 'no-store' });
          if (!res.ok) return;
          const html = await res.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          assignSearchIds(doc);
          items.push(...buildItemsFromRoot(doc, page.label, page.url));
        } catch (err) {
          // If a page fails, keep local search results.
        }
      })
    );
    searchItems = items;
    indexReady = true;
    return items;
  };

  const openProject = (item) => {
    if (!item || !item.trigger || !item.panel) return;
    item.trigger.setAttribute('aria-expanded', 'true');
    item.panel.classList.add('is-open');
    item.panel.style.display = 'block';

    const headerOffset = headerEl ? headerEl.offsetHeight + 12 : 0;
    const top = item.trigger.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    window.setTimeout(() => item.trigger.focus(), 350);
  };

  let highlightTimer = null;
  const highlightElement = (el) => {
    if (!el) return;
    document.querySelectorAll('.search-highlight').forEach((node) => node.classList.remove('search-highlight'));
    el.classList.add('search-highlight');
    if (highlightTimer) window.clearTimeout(highlightTimer);
    highlightTimer = window.setTimeout(() => el.classList.remove('search-highlight'), 1400);
  };

  const openItem = (item) => {
    if (!item) return;
    if (item.type === 'project') {
      openProject(item);
      highlightElement(item.trigger);
      return;
    }
    if (!item.element) return;
    item.element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    highlightElement(item.element);
  };

  const renderGuidance = (query, resultsCount) => {
    if (!guidanceEl) return;
    if (!query.trim()) {
      guidanceEl.innerHTML = `
        <p>${defaultGuidance}</p>
        <ul>
          ${suggestions.map((item) => `<li><button type="button" data-search-suggestion="${item}">${item}</button></li>`).join('')}
        </ul>
      `;
      return;
    }
    if (resultsCount === 0) {
      guidanceEl.innerHTML = `
        <p>No matches found. Try keywords like:</p>
        <ul>
          ${suggestions.map((item) => `<li><button type="button" data-search-suggestion="${item}">${item}</button></li>`).join('')}
        </ul>
      `;
      return;
    }
    guidanceEl.textContent = '';
  };

  const renderResults = (query) => {
    const terms = splitTerms(query);
    resultsPanel.innerHTML = '';

    const results = searchItems
      .map((item) => {
        let score = 0;
        terms.forEach((term) => {
          if (item.titleNormalized.includes(term)) score += 5;
          if (item.companyNormalized.includes(term)) score += 3;
          if (item.tagsNormalized.includes(term)) score += 2;
          if (item.combinedNormalized.includes(term)) score += 1;
        });
        return score > 0 ? { item, score } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 30);

    renderGuidance(query, results.length);

    if (!terms.length || !results.length) {
      resultsPanel.innerHTML = '';
      if (terms.length && !results.length) {
        const empty = document.createElement('p');
        empty.className = 'search-empty';
        empty.textContent = 'No results found on this site.';
        resultsPanel.appendChild(empty);
      }
      return;
    }

    const grouped = new Map();
    results.forEach(({ item }) => {
      const key = item.group || 'Results';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(item);
    });

    grouped.forEach((items, groupLabel) => {
      const group = document.createElement('div');
      group.className = 'search-group';
      const title = document.createElement('h3');
      title.className = 'search-group-title';
      title.textContent = groupLabel;
      const list = document.createElement('ul');
      list.className = 'search-results';
      items.slice(0, 7).forEach((item) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-result';
        btn.innerHTML = `
          <span class="result-title">${item.title}</span>
          <span class="result-context">${item.context}</span>
          ${item.subtitle ? `<span class="result-meta">${item.subtitle}</span>` : ''}
        `;
        btn.addEventListener('click', () => {
          closeSearch();
          if (item.url && !isCurrentPage(item.url)) {
            const anchor = item.anchorId ? `#${item.anchorId}` : '';
            window.location.href = `${item.url}${anchor}`;
            return;
          }
          openItem(item);
        });
        li.appendChild(btn);
        list.appendChild(li);
      });
      group.appendChild(title);
      group.appendChild(list);
      resultsPanel.appendChild(group);
    });
  };

  let hideTimer = null;

  const openSearch = () => {
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
    overlay.removeAttribute('hidden');
    drawer.removeAttribute('hidden');
    document.body.classList.add('is-search-open');
    panelInput.value = headerInput.value;
    renderGuidance(panelInput.value, 0);
    renderResults(panelInput.value);
    if (!indexReady && !indexPromise) {
      indexPromise = buildSiteIndex().then(() => {
        renderResults(panelInput.value);
      });
    }
    window.setTimeout(() => panelInput.focus(), 0);
  };

  const closeSearch = () => {
    document.body.classList.remove('is-search-open');
    headerInput.value = '';
    panelInput.value = '';
    panelInput.blur();
    hideTimer = window.setTimeout(() => {
      overlay.setAttribute('hidden', '');
      drawer.setAttribute('hidden', '');
    }, 250);
  };

  const syncInputs = (source, value) => {
    if (source === 'header') {
      panelInput.value = value;
    } else {
      headerInput.value = value;
    }
  };

  focusBtn?.addEventListener('click', () => {
    headerInput.focus();
    openSearch();
  });

  openBtn?.addEventListener('click', () => {
    openSearch();
  });

  headerInput.addEventListener('focus', openSearch);
  headerInput.addEventListener('input', (event) => {
    syncInputs('header', event.target.value);
    openSearch();
    renderResults(event.target.value);
  });

  panelInput.addEventListener('input', (event) => {
    syncInputs('panel', event.target.value);
    renderResults(event.target.value);
  });

  overlay.addEventListener('click', closeSearch);
  closeBtn?.addEventListener('click', closeSearch);

  drawer.addEventListener('click', (event) => {
    const suggestion = event.target.closest('[data-search-suggestion]');
    if (!suggestion) return;
    const value = suggestion.getAttribute('data-search-suggestion') || '';
    headerInput.value = value;
    panelInput.value = value;
    renderResults(value);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('is-search-open')) {
      closeSearch();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (document.body.classList.contains('is-search-open')) return;
    if (event.defaultPrevented) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
    if (event.key.length !== 1) return;
    headerInput.focus();
    headerInput.value = event.key;
    openSearch();
    renderResults(event.key);
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
    highlightElement(target);
  });
})();
  });
})();
