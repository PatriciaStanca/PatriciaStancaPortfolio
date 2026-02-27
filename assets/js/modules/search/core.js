(function () {
  const ns = (window.SiteSearchModule = window.SiteSearchModule || {});

  // Builds the shared search context used by all search sub-modules.
  ns.createContext = () => {
    const searchRoot = document.querySelector('[data-search-root]');
    const overlay = document.querySelector('[data-search-overlay]');
    const drawer = document.querySelector('[data-search-drawer]');
    if (!searchRoot || !overlay || !drawer) return null;

    const headerInput = searchRoot.querySelector('[data-search-input="header"]');
    const panelInput = drawer.querySelector('[data-search-input="panel"]');
    const resultsPanel = drawer.querySelector('[data-search-results]');
    const guidanceEl = drawer.querySelector('[data-search-guidance]');
    if (!headerInput || !panelInput || !resultsPanel || !guidanceEl) return null;

    const focusBtn = searchRoot.querySelector('[data-search-focus]');
    const openBtn = document.querySelector('[data-search-open]');
    const closeBtn = drawer.querySelector('[data-search-close]');
    const headerEl = document.getElementById('header');

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

    return {
      searchRoot,
      overlay,
      drawer,
      headerInput,
      panelInput,
      resultsPanel,
      guidanceEl,
      focusBtn,
      openBtn,
      closeBtn,
      headerEl,
      suggestions,
      defaultGuidance,
      pageConfigs,
      currentPath,
      isCurrentPage,
      normalize,
      splitTerms,
      getSearchId,
      searchItems: [],
      indexReady: false,
      indexPromise: null,
      highlightTimer: null,
      hideTimer: null,
      assignSearchIds: null,
      buildItemsFromRoot: null,
      buildSiteIndex: null,
      openProject: null,
      highlightElement: null,
      openItem: null,
      renderGuidance: null,
      renderResults: null,
      openSearch: null,
      closeSearch: null,
      syncInputs: null,
    };
  };
})();
