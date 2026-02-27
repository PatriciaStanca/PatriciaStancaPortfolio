(function () {
  const ns = (window.SiteSearchModule = window.SiteSearchModule || {});

  // Handles search UI rendering, open/close behavior, and result interactions.
  ns.attachUi = (ctx) => {
    // Opens a matched project accordion and scrolls to it.
    const openProject = (item) => {
      if (!item || !item.trigger || !item.panel) return;
      item.trigger.setAttribute('aria-expanded', 'true');
      item.panel.classList.add('is-open');
      item.panel.style.display = 'block';

      const headerOffset = ctx.headerEl ? ctx.headerEl.offsetHeight + 12 : 0;
      const top = item.trigger.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      window.setTimeout(() => item.trigger.focus(), 350);
    };

    // Briefly highlights the chosen search result on the page.
    const highlightElement = (el) => {
      if (!el) return;
      document.querySelectorAll('.search-highlight').forEach((node) => node.classList.remove('search-highlight'));
      el.classList.add('search-highlight');
      if (ctx.highlightTimer) window.clearTimeout(ctx.highlightTimer);
      ctx.highlightTimer = window.setTimeout(() => el.classList.remove('search-highlight'), 1400);
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

    // Renders helper text and quick suggestions.
    const renderGuidance = (query, resultsCount) => {
      if (!ctx.guidanceEl) return;
      if (!query.trim()) {
        ctx.guidanceEl.innerHTML = `
          <p>${ctx.defaultGuidance}</p>
          <ul>
            ${ctx.suggestions.map((item) => `<li><button type="button" data-search-suggestion="${item}">${item}</button></li>`).join('')}
          </ul>
        `;
        return;
      }
      if (resultsCount === 0) {
        ctx.guidanceEl.innerHTML = `
          <p>No matches found. Try keywords like:</p>
          <ul>
            ${ctx.suggestions.map((item) => `<li><button type="button" data-search-suggestion="${item}">${item}</button></li>`).join('')}
          </ul>
        `;
        return;
      }
      ctx.guidanceEl.textContent = '';
    };

    const closeSearch = () => {
      document.body.classList.remove('is-search-open');
      ctx.headerInput.value = '';
      ctx.panelInput.value = '';
      ctx.panelInput.blur();
      ctx.hideTimer = window.setTimeout(() => {
        ctx.overlay.setAttribute('hidden', '');
        ctx.drawer.setAttribute('hidden', '');
      }, 250);
    };

    // Scores and renders grouped search results.
    const renderResults = (query) => {
      const terms = ctx.splitTerms(query);
      ctx.resultsPanel.innerHTML = '';

      const results = ctx.searchItems
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
        ctx.resultsPanel.innerHTML = '';
        if (terms.length && !results.length) {
          const empty = document.createElement('p');
          empty.className = 'search-empty';
          empty.textContent = 'No results found on this site.';
          ctx.resultsPanel.appendChild(empty);
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
            if (item.url && !ctx.isCurrentPage(item.url)) {
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
        ctx.resultsPanel.appendChild(group);
      });
    };

    const openSearch = () => {
      if (ctx.hideTimer) {
        window.clearTimeout(ctx.hideTimer);
        ctx.hideTimer = null;
      }
      ctx.overlay.removeAttribute('hidden');
      ctx.drawer.removeAttribute('hidden');
      document.body.classList.add('is-search-open');
      ctx.panelInput.value = ctx.headerInput.value;
      renderGuidance(ctx.panelInput.value, 0);
      renderResults(ctx.panelInput.value);
      if (!ctx.indexReady && !ctx.indexPromise) {
        ctx.indexPromise = ctx.buildSiteIndex().then(() => {
          renderResults(ctx.panelInput.value);
        });
      }
      window.setTimeout(() => ctx.panelInput.focus(), 0);
    };

    const syncInputs = (source, value) => {
      if (source === 'header') {
        ctx.panelInput.value = value;
      } else {
        ctx.headerInput.value = value;
      }
    };

    ctx.openProject = openProject;
    ctx.highlightElement = highlightElement;
    ctx.openItem = openItem;
    ctx.renderGuidance = renderGuidance;
    ctx.renderResults = renderResults;
    ctx.openSearch = openSearch;
    ctx.closeSearch = closeSearch;
    ctx.syncInputs = syncInputs;
  };
})();
