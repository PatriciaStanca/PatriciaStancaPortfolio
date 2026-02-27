(function () {
  const ns = (window.SiteSearchModule = window.SiteSearchModule || {});

  // Creates and refreshes the searchable index data.
  ns.attachIndex = (ctx) => {
    // Ensures stable IDs so search links can jump to exact sections.
    const assignSearchIds = (root) => {
      const projectTriggers = Array.from(root.querySelectorAll('.project-accordion .accordion-trigger'));
      projectTriggers.forEach((trigger, idx) => {
        if (!trigger.id) trigger.id = ctx.getSearchId('project', trigger.querySelector('.accordion-title')?.textContent || 'project', idx);
      });
      const roles = Array.from(root.querySelectorAll('.role-card'));
      roles.forEach((card, idx) => {
        if (!card.id) card.id = ctx.getSearchId('role', card.querySelector('h4')?.textContent || 'role', idx);
      });
      const references = Array.from(root.querySelectorAll('.testimonial-card'));
      references.forEach((card, idx) => {
        if (!card.id) card.id = ctx.getSearchId('reference', card.querySelector('.testimonial-author')?.textContent || 'reference', idx);
      });
    };

    // Converts page DOM content into normalized search items.
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
        const anchorId = trigger.id || ctx.getSearchId('project', title, idx);

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
          combinedNormalized: ctx.normalize(combined),
          titleNormalized: ctx.normalize(title),
          companyNormalized: ctx.normalize(company || meta),
          tagsNormalized: ctx.normalize([tag, tools.join(' '), dataTags, dataCategory].join(' ')),
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
        const anchorId = card.id || ctx.getSearchId('role', title, idx);
        items.push({
          type: 'role',
          element: card,
          title,
          company: meta,
          subtitle: meta,
          group: 'Previous Work',
          context: 'Previous Work',
          combined,
          combinedNormalized: ctx.normalize(combined),
          titleNormalized: ctx.normalize(title),
          companyNormalized: ctx.normalize(meta),
          tagsNormalized: ctx.normalize(chips),
          url: pageUrl,
          anchorId,
        });
      });

      const referenceCards = Array.from(root.querySelectorAll('.testimonial-card'));
      referenceCards.forEach((card, idx) => {
        const author = card.querySelector('.testimonial-author')?.textContent?.trim() || 'Reference';
        const text = card.querySelector('.testimonial-text')?.textContent?.trim() || '';
        const combined = [author, text].join(' ');
        const anchorId = card.id || ctx.getSearchId('reference', author, idx);
        items.push({
          type: 'reference',
          element: card,
          title: author || 'Reference',
          company: author,
          subtitle: '',
          group: 'References',
          context: 'Reference',
          combined,
          combinedNormalized: ctx.normalize(combined),
          titleNormalized: ctx.normalize(author || 'Reference'),
          companyNormalized: ctx.normalize(author),
          tagsNormalized: ctx.normalize(text),
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
          const anchorId = section.id || ctx.getSearchId('section', title, 0);
          return {
            type: 'section',
            element: section,
            title,
            company: '',
            subtitle: '',
            group: pageLabel,
            context: 'Section',
            combined,
            combinedNormalized: ctx.normalize(combined),
            titleNormalized: ctx.normalize(title),
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

    // Loads other pages and merges them into the site-wide index.
    const buildSiteIndex = async () => {
      const items = [...ctx.searchItems];
      const targets = ctx.pageConfigs.filter((page) => !ctx.isCurrentPage(page.url));
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
      ctx.searchItems = items;
      ctx.indexReady = true;
      return items;
    };

    ctx.assignSearchIds = assignSearchIds;
    ctx.buildItemsFromRoot = buildItemsFromRoot;
    ctx.buildSiteIndex = buildSiteIndex;

    assignSearchIds(document);
    ctx.searchItems = buildItemsFromRoot(
      document,
      ctx.pageConfigs.find((page) => page.url === ctx.currentPath)?.label || 'Page',
      null
    );
  };
})();
