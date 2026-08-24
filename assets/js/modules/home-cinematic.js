(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });

  app.initializers.push(() => {
    if (!document.body.classList.contains('page-index')) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const revealItems = Array.from(document.querySelectorAll('.cinematic-reveal'));
    const stages = Array.from(document.querySelectorAll('[data-cinematic-stage]')).map((stage) => ({
      element: stage,
      active: false,
      depthItems: Array.from(stage.querySelectorAll('[data-depth]')).map((item) => ({
        element: item,
        depth: Number(item.getAttribute('data-depth') || 0),
      })),
      cards: Array.from(stage.querySelectorAll('[data-cinematic-card]')).map((item) => ({
        element: item,
        finalX: Number(item.getAttribute('data-final-x') || 0),
        finalY: Number(item.getAttribute('data-final-y') || 0),
        finalRotate: Number(item.getAttribute('data-final-rotate') || 0),
      })),
    }));

    revealItems.forEach((item) => {
      const delay = Number(item.getAttribute('data-cinematic-delay') || 0);
      item.style.setProperty('--cinematic-delay', `${delay}ms`);
    });

    if (revealItems.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-cinematic-visible');
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 8% 0px' }
      );

      revealItems.forEach((item) => observer.observe(item));
    }

    if (reduceMotion.matches || !stages.length) return;

    let ticking = false;
    let mobileLayout = window.matchMedia('(max-width: 980px)').matches;
    let viewportWidth = window.innerWidth;

    const stageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stageData = stages.find(({ element }) => element === entry.target);
          if (!stageData) return;
          stageData.active = entry.isIntersecting;
          entry.target.classList.toggle('is-stage-active', entry.isIntersecting);

          if (entry.isIntersecting) {
            entry.target.querySelectorAll('img[loading="lazy"]').forEach((image) => {
              image.loading = 'eager';
              if (typeof image.decode === 'function') image.decode().catch(() => {});
            });
            requestUpdate();
          }
        });
      },
      { rootMargin: '100% 0px 100% 0px' }
    );

    stages.forEach(({ element }) => stageObserver.observe(element));

    const updateParallax = () => {
      ticking = false;
      const viewport = window.innerHeight || document.documentElement.clientHeight;

      stages.forEach(({ element: stage, active, depthItems, cards }) => {
        if (!active) return;
        const rect = stage.getBoundingClientRect();
        const centerProgress = Math.max(-1, Math.min(1, (viewport * 0.5 - (rect.top + rect.height * 0.5)) / viewport));
        const scrollSpan = Math.max(rect.height, 1);
        const travelProgress = Math.max(0, Math.min(1, (viewport - rect.top) / scrollSpan));
        const easedProgress = 1 - Math.pow(1 - travelProgress, 2);

        stage.style.setProperty('--stage-progress', centerProgress.toFixed(4));
        stage.style.setProperty('--card-progress', easedProgress.toFixed(4));
        stage.style.setProperty('--center-fade', Math.max(0, Math.min(1, (travelProgress - 0.18) / 0.72)).toFixed(4));

        depthItems.forEach(({ element: item, depth }) => {
          item.style.setProperty('--parallax-y', `${(centerProgress * depth).toFixed(2)}px`);
        });

        cards.forEach(({ element: item, finalX, finalY, finalRotate }) => {
          const scale = mobileLayout
            ? Math.min(viewportWidth / 1180, 0.62)
            : Math.min(viewportWidth / 1440, 1);
          const motionProgress = Math.min(1, 0.32 + easedProgress * 0.68);
          const cardScale = 1.16 - easedProgress * 0.24;
          const x = finalX * scale * motionProgress;
          const y = finalY * scale * motionProgress;
          const rotation = finalRotate * motionProgress;
          item.style.setProperty('--motion-x', `${x.toFixed(2)}px`);
          item.style.setProperty('--motion-y', `${y.toFixed(2)}px`);
          item.style.setProperty('--motion-rotate', `${rotation.toFixed(2)}deg`);
          item.style.setProperty('--active-card-scale', cardScale.toFixed(3));
        });
      });
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    const updateViewport = () => {
      mobileLayout = window.matchMedia('(max-width: 980px)').matches;
      viewportWidth = window.innerWidth;
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', updateViewport);
  });
})();
