(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });

  app.initializers.push(() => {
    const prototype = document.querySelector('[data-project-prototype]');
    const workSource = document.querySelector('#work-project-archive > [data-accordion]');
    const personalSource = document.querySelector('#personal-projects [data-accordion]');
    if (!prototype || !workSource || !personalSource) return;

    const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    }[character]));
    const sectionByLabel = (panel, label) => Array.from(panel.querySelectorAll('.project-section'))
      .find((section) => section.querySelector('.project-kicker')?.textContent.trim().toUpperCase().startsWith(label));
    const paragraphFrom = (section) => section?.querySelector('p:not(.project-kicker)')?.textContent.trim() || '';
    const listFrom = (section) => Array.from(section?.querySelectorAll('li') || []).map((item) => item.textContent.trim());

    const extract = (source) => Array.from(source.querySelectorAll(':scope > .accordion-trigger')).map((trigger) => {
      const panel = trigger.nextElementSibling;
      const image = panel?.querySelector('img');
      const linkSection = sectionByLabel(panel, 'LINK');
      const link = linkSection?.querySelector('a');
      return {
        id: trigger.id,
        title: trigger.querySelector('.accordion-title')?.textContent.trim() || 'Project',
        meta: trigger.querySelector('.accordion-meta')?.textContent.trim() || '',
        category: trigger.querySelector('.accordion-tag')?.textContent.trim() || 'Project',
        what: paragraphFrom(sectionByLabel(panel, 'WHAT')),
        why: paragraphFrom(sectionByLabel(panel, 'WHY')),
        contribution: listFrom(sectionByLabel(panel, 'MY CONTRIBUTION')),
        tools: listFrom(sectionByLabel(panel, 'TOOLS')),
        linkHref: link?.href || '',
        linkLabel: link?.textContent.trim() || '',
        imageSrc: image?.getAttribute('src') || '',
        imageAlt: image?.getAttribute('alt') || '',
      };
    });

    const extractedWork = extract(workSource);
    const preferredWorkOrder = [
      'proj-analytics-platform-implementation',
      'proj-needs-driven-analytics',
    ];
    const work = [
      ...preferredWorkOrder.map((id) => extractedWork.find((project) => project.id === id)),
      ...extractedWork.filter((project) => !preferredWorkOrder.includes(project.id)),
    ].filter(Boolean);
    const collections = { work, personal: extract(personalSource) };
    if (!work.length || !collections.personal.length) return;

    const story = prototype.querySelector('.project-prototype__story');
    const stage = prototype.querySelector('.project-prototype__sticky');
    const steps = prototype.querySelector('.project-prototype__steps');
    const modeButtons = Array.from(prototype.querySelectorAll('[data-project-mode]'));
    const archiveToggle = document.querySelector('.project-archive-toggle');
    const workArchive = document.getElementById('work-project-archive');
    const personalArchive = document.getElementById('personal-projects');
    let mode = 'work';
    let activeIndex = -1;
    let transitionTimer = 0;
    let ticking = false;

    const detailsMarkup = (project) => {
      const contribution = project.contribution.length
        ? `<ul>${project.contribution.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : `<p>${escapeHtml(paragraphFrom(sectionByLabel(document.getElementById(project.id)?.nextElementSibling, 'MY CONTRIBUTION')))}</p>`;
      return `
        <section><h5>What</h5><p>${escapeHtml(project.what)}</p></section>
        <section><h5>Why</h5><p>${escapeHtml(project.why)}</p></section>
        <section class="project-prototype__contribution"><h5>My Contribution</h5>${contribution}</section>
        <section class="project-prototype__tools"><h5>Tools</h5><p>${project.tools.map(escapeHtml).join(' · ')}</p></section>
        ${project.linkHref ? `<section class="project-prototype__link"><h5>Link</h5><a href="${escapeHtml(project.linkHref)}">${escapeHtml(project.linkLabel)}</a></section>` : ''}`;
    };

    const markup = (project, index, total) => `
      <article class="project-prototype__scene" data-prototype-project="${index + 1}">
        <div class="project-prototype__text">
          <p class="project-prototype__category">${escapeHtml(project.category)}</p>
          <div class="project-prototype__intro">
            <h3>${escapeHtml(project.title)}</h3>
            <div class="project-prototype__overview">
              <section>
                <h4>What</h4>
                <p>${escapeHtml(project.what)}</p>
              </section>
              <section>
                <h4>Why</h4>
                <p>${escapeHtml(project.why)}</p>
              </section>
              <section>
                <h4>Impact</h4>
                <p>${escapeHtml(project.contribution.at(-1) || project.why)}</p>
              </section>
            </div>
            <p class="project-prototype__meta">${escapeHtml(project.meta)}</p>
            <button class="project-prototype__details-toggle" type="button" aria-expanded="false">
              View project details <span aria-hidden="true">→</span>
            </button>
          </div>
          <div class="project-prototype__details-panel" hidden>
            <div class="project-prototype__details-panel-head">
              <p>Project details</p>
              <button type="button" class="project-prototype__details-close">Close <span aria-hidden="true">×</span></button>
            </div>
            <div class="project-prototype__details">${detailsMarkup(project)}</div>
          </div>
        </div>
        <figure class="project-prototype__image">
          <img class="project-prototype__image-backdrop" src="${escapeHtml(project.imageSrc)}" alt="" aria-hidden="true">
          <div class="project-prototype__image-matte">
            <img class="project-prototype__image-main" src="${escapeHtml(project.imageSrc)}" alt="${escapeHtml(project.imageAlt)}" decoding="async">
          </div>
        </figure>
      </article>`;

    const classifyImage = () => {
      const figure = stage.querySelector('.project-prototype__image');
      const image = stage.querySelector('.project-prototype__image-main');
      if (!figure || !image) return;
      const apply = () => {
        const ratio = image.naturalWidth / Math.max(1, image.naturalHeight);
        figure.classList.remove('is-landscape', 'is-portrait', 'is-square');
        figure.classList.add(ratio > 1.25 ? 'is-landscape' : ratio < 0.8 ? 'is-portrait' : 'is-square');
      };
      if (image.complete) apply(); else image.addEventListener('load', apply, { once: true });
    };

    const show = (index, immediate = false) => {
      const projects = collections[mode];
      const next = Math.max(0, Math.min(projects.length - 1, index));
      if (next === activeIndex && stage.firstElementChild) return;
      activeIndex = next;
      window.clearTimeout(transitionTimer);
      const update = () => {
        stage.innerHTML = markup(projects[activeIndex], activeIndex, projects.length);
        classifyImage();
        requestAnimationFrame(() => stage.classList.remove('is-switching'));
      };
      if (immediate || !stage.firstElementChild || matchMedia('(prefers-reduced-motion: reduce)').matches) update();
      else {
        stage.classList.add('is-switching');
        transitionTimer = window.setTimeout(update, 260);
      }
    };

    const configureStory = () => {
      const count = collections[mode].length;
      const step = innerWidth <= 700 ? 42 : innerWidth <= 1024 ? 38 : 34;
      story.style.setProperty('--project-scroll-distance', `${(count - 1) * step}svh`);
      steps.innerHTML = Array.from({ length: count - 1 }, () => '<span></span>').join('');
      steps.style.setProperty('--project-step-height', `${step}svh`);
    };

    const updateFromScroll = () => {
      const rect = story.getBoundingClientRect();
      const stickyTop = Number.parseFloat(getComputedStyle(stage).top) || 0;
      const travel = Math.max(0, stickyTop - rect.top);
      const available = Math.max(1, story.offsetHeight - stage.offsetHeight);
      const count = collections[mode].length;
      const index = Math.min(count - 1, Math.floor((travel / available) * count));
      show(index);
    };

    const setMode = (nextMode) => {
      if (!collections[nextMode]) return;
      if (nextMode === mode) return;
      mode = nextMode;
      activeIndex = -1;
      modeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.projectMode === mode)));
      configureStory();
      show(0, true);
      const storyTop = story.getBoundingClientRect().top + scrollY;
      const stickyTop = Number.parseFloat(getComputedStyle(stage).top) || 0;
      if (story.getBoundingClientRect().top < stickyTop) scrollTo({ top: storyTop - stickyTop, behavior: 'auto' });
    };

    const syncModeWithLocation = ({ scroll = false } = {}) => {
      const hash = window.location.hash;
      if (hash !== '#personal-projects' && hash !== '#projects') return;
      setMode(hash === '#personal-projects' ? 'personal' : 'work');
      if (!scroll) return;
      requestAnimationFrame(() => prototype.scrollIntoView({ block: 'start', behavior: 'auto' }));
    };

    modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.projectMode)));
    window.addEventListener('hashchange', () => syncModeWithLocation({ scroll: true }));
    archiveToggle?.addEventListener('click', () => {
      const expanded = archiveToggle.getAttribute('aria-expanded') !== 'true';
      archiveToggle.setAttribute('aria-expanded', String(expanded));
      archiveToggle.querySelector('[aria-hidden="true"]').textContent = expanded ? '−' : '+';
      if (workArchive) workArchive.hidden = !expanded;
      if (personalArchive) personalArchive.hidden = !expanded;
    });
    stage.addEventListener('click', (event) => {
      const open = event.target.closest('.project-prototype__details-toggle');
      const close = event.target.closest('.project-prototype__details-close');
      if (!open && !close) return;
      const scene = stage.querySelector('.project-prototype__scene');
      const intro = stage.querySelector('.project-prototype__intro');
      const panel = stage.querySelector('.project-prototype__details-panel');
      if (!scene || !intro || !panel) return;
      const expanded = Boolean(open);
      open?.setAttribute('aria-expanded', 'true');
      scene.classList.toggle('is-details-open', expanded);
      intro.hidden = expanded;
      panel.hidden = !expanded;
      if (expanded) panel.querySelector('.project-prototype__details-close')?.focus();
      else stage.querySelector('.project-prototype__details-toggle')?.focus();
    });
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { updateFromScroll(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', configureStory, { passive: true });

    document.body.classList.add('project-prototype-ready');
    configureStory();
    show(0, true);
    syncModeWithLocation();
    updateFromScroll();
  });
})();
