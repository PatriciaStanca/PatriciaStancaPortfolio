(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// This plays the project reel scenes one by one.
(function () {
  const reel = document.querySelector('[data-project-reel]');
  const track = document.querySelector('[data-project-reel-track]');
  if (!reel || !track) return;

  const valueWords = ['Vision', 'Strategy', 'Implementation', 'Insight', 'Impact'];
  const scenePattern = ['phone', 'value', 'vision-detail', 'value', 'image-duo', 'value', 'implementation-detail', 'value', 'insight-detail', 'value', 'impact-detail'];
  const phoneVideoSources = ['assets/media/videos/skroll.mp4'];
  const visionDetailImage = 'assets/media/images/shahid-mehmood-0KgJaDiOS7c-unsplash.jpg';
  const imageDuoLeft = 'assets/media/images/fabric.jpg';
  const implementationTopImage = 'assets/media/images/BANKAPI.jpg';
  const implementationBottomImage = 'assets/media/images/StancaBlogApi.jpg';
  const implementationRightImage = 'assets/media/images/core.jpg';
  const insightLeftImage = 'assets/media/images/etl.jpg';
  const insightRightImage = 'assets/media/images/predict.jpg';
  const impactImage = 'assets/media/images/py.jpg';
  const prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sceneHold = {
    phoneFallback: 8000,
    'vision-detail': 620,
    'image-duo': 680,
    'implementation-detail': 760,
    'insight-detail': 760,
    'impact-detail': 760,
    value: 380,
  };
  const valueTypeLeadMs = 70;
  const valueTypeCharMs = 52;
  const valueTypePauseMs = 260;
  const transitionMs = 340;
  const sceneGapMs = 80;

  let sceneIndex = 0;
  let valueIndex = 0;
  let isInView = false;
  let isRunning = false;
  const timers = new Set();

  const setReelTimeout = (fn, delay) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, delay);
    timers.add(id);
    return id;
  };

  const clearTimers = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  };

  const queueAdvance = (delay) => {
    setReelTimeout(() => {
      if (!isRunning) return;
      advanceScene();
      setReelTimeout(scheduleNext, transitionMs + sceneGapMs);
    }, delay);
  };

  const startValueTyping = (scene) => {
    if (!scene) return sceneHold.value;

    const phrase = scene.querySelector('.project-reel-text-phrase');
    if (!phrase) return sceneHold.value;

    const fullText = phrase.dataset.fullText || phrase.textContent || '';
    phrase.dataset.fullText = fullText;

    const existingHold = Number(scene.dataset.valueHold || 0);
    if (scene.dataset.valueTyped === 'done' && existingHold > 0) {
      const startedAt = Number(scene.dataset.valueStartedAt || 0);
      if (!startedAt) return existingHold;
      return Math.max(140, existingHold - (Date.now() - startedAt));
    }

    if (scene.dataset.valueTyping === 'running' && existingHold > 0) {
      const startedAt = Number(scene.dataset.valueStartedAt || 0);
      if (!startedAt) return existingHold;
      return Math.max(140, existingHold - (Date.now() - startedAt));
    }

    phrase.textContent = '';
    phrase.classList.add('is-typing');
    scene.dataset.valueTyping = 'running';
    scene.dataset.valueTyped = 'pending';

    const totalHold = valueTypeLeadMs + (fullText.length * valueTypeCharMs) + valueTypePauseMs;
    scene.dataset.valueHold = String(totalHold);
    scene.dataset.valueStartedAt = String(Date.now());

    let index = 0;
    const step = () => {
      if (!isRunning || !scene.isConnected) return;
      index += 1;
      phrase.textContent = fullText.slice(0, index);
      if (index < fullText.length) {
        setReelTimeout(step, valueTypeCharMs);
        return;
      }
      scene.dataset.valueTyped = 'done';
      scene.dataset.valueTyping = 'done';
      phrase.classList.remove('is-typing');
    };

    setReelTimeout(step, valueTypeLeadMs);
    return totalHold;
  };

  const createScene = (type) => {
    const scene = document.createElement('div');
    scene.className = 'project-reel-scene';
    scene.setAttribute('data-scene', type);
    scene.setAttribute('aria-hidden', 'true');

    const layout = document.createElement('div');
    layout.className = 'project-reel-layout';

    if (type === 'phone') {
      const stage = document.createElement('div');
      stage.className = 'project-reel-phone-stage';

      const device = document.createElement('div');
      device.className = 'project-reel-phone';

      const media = document.createElement('div');
      media.className = 'project-reel-phone-media';

      const video = document.createElement('video');
      video.className = 'project-reel-phone-video';
      video.controls = false;
      video.muted = true;
      video.loop = false;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-label', 'Screen recording showing live product scroll');
      video.setAttribute('disablepictureinpicture', '');
      video.setAttribute('controlslist', 'nodownload noplaybackrate noremoteplayback');
      video.dataset.src = phoneVideoSources[0];
      video.addEventListener('error', () => {});

      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('fill', 'none');
      icon.setAttribute('aria-hidden', 'true');
      icon.classList.add('project-reel-phone-outline');

      const bodyRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bodyRect.setAttribute('x', '5');
      bodyRect.setAttribute('y', '2');
      bodyRect.setAttribute('width', '14');
      bodyRect.setAttribute('height', '20');
      bodyRect.setAttribute('rx', '2');
      bodyRect.setAttribute('ry', '2');

      const button = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      button.setAttribute('d', 'M12 18h.01');

      icon.append(bodyRect, button);
      media.appendChild(video);
      device.append(media, icon);
      stage.appendChild(device);
      layout.appendChild(stage);
    }

    if (type === 'value') {
      const card = document.createElement('div');
      card.className = 'project-reel-text-card';
      const label = document.createElement('p');
      label.className = 'project-reel-text-kicker';
      label.textContent = 'Core Value';
      const phrase = document.createElement('p');
      phrase.className = 'project-reel-text-phrase';
      phrase.textContent = valueWords[valueIndex % valueWords.length];
      phrase.dataset.fullText = phrase.textContent;
      valueIndex += 1;
      card.append(label, phrase);
      layout.appendChild(card);
    }

    if (type === 'vision-detail') {
      const media = document.createElement('div');
      media.className = 'project-reel-vision-media';
      const image = document.createElement('img');
      image.className = 'project-reel-vision-image';
      image.src = visionDetailImage;
      image.alt = 'Vision concept image';
      image.loading = 'lazy';
      image.decoding = 'async';
      media.appendChild(image);
      layout.appendChild(media);
    }

    if (type === 'image-duo') {
      const duo = document.createElement('div');
      duo.className = 'project-reel-image-duo';

      const outerBox = document.createElement('div');
      outerBox.className = 'project-reel-image-box project-reel-image-outer-box';

      const fabricBox = document.createElement('div');
      fabricBox.className = 'project-reel-fabric-box';
      const fabricImg = document.createElement('img');
      fabricImg.className = 'project-reel-image-box-img';
      fabricImg.src = imageDuoLeft;
      fabricImg.alt = 'Fabric architecture visual';
      fabricImg.loading = 'lazy';
      fabricImg.decoding = 'async';
      fabricBox.appendChild(fabricImg);

      outerBox.appendChild(fabricBox);
      duo.appendChild(outerBox);
      layout.appendChild(duo);
    }

    if (type === 'implementation-detail') {
      const outerBox = document.createElement('div');
      outerBox.className = 'project-reel-slide-7-outer-box';

      const grid = document.createElement('div');
      grid.className = 'project-reel-slide-7-grid';

      const leftColumn = document.createElement('div');
      leftColumn.className = 'project-reel-slide-7-left-column';

      const leftTopCard = document.createElement('div');
      leftTopCard.className = 'project-reel-slide-7-card';
      const leftTopImg = document.createElement('img');
      leftTopImg.className = 'project-reel-slide-7-card-img';
      leftTopImg.src = implementationTopImage;
      leftTopImg.alt = 'Bank API project visual';
      leftTopImg.loading = 'lazy';
      leftTopImg.decoding = 'async';
      leftTopCard.appendChild(leftTopImg);

      const leftBottomCard = document.createElement('div');
      leftBottomCard.className = 'project-reel-slide-7-card';
      const leftBottomImg = document.createElement('img');
      leftBottomImg.className = 'project-reel-slide-7-card-img';
      leftBottomImg.src = implementationBottomImage;
      leftBottomImg.alt = 'Stanca Blog API project visual';
      leftBottomImg.loading = 'lazy';
      leftBottomImg.decoding = 'async';
      leftBottomCard.appendChild(leftBottomImg);
      leftColumn.append(leftTopCard, leftBottomCard);

      const rightColumn = document.createElement('div');
      rightColumn.className = 'project-reel-slide-7-right-column';
      const rightCard = document.createElement('div');
      rightCard.className = 'project-reel-slide-7-card project-reel-slide-7-card-large';
      const rightImg = document.createElement('img');
      rightImg.className = 'project-reel-slide-7-card-img';
      rightImg.src = implementationRightImage;
      rightImg.alt = 'Core architecture visual';
      rightImg.loading = 'lazy';
      rightImg.decoding = 'async';
      rightCard.appendChild(rightImg);
      rightColumn.appendChild(rightCard);

      grid.append(leftColumn, rightColumn);
      outerBox.appendChild(grid);
      layout.appendChild(outerBox);
    }

    if (type === 'insight-detail') {
      const split = document.createElement('div');
      split.className = 'project-reel-insight-layout';

      const leftCol = document.createElement('div');
      leftCol.className = 'project-reel-insight-left';
      const leftImg = document.createElement('img');
      leftImg.className = 'project-reel-insight-left-img';
      leftImg.src = insightLeftImage;
      leftImg.alt = 'ETL flow visual';
      leftImg.loading = 'lazy';
      leftImg.decoding = 'async';
      leftCol.appendChild(leftImg);

      const rightCol = document.createElement('div');
      rightCol.className = 'project-reel-insight-right';
      const rightImg = document.createElement('img');
      rightImg.className = 'project-reel-insight-right-img';
      rightImg.src = insightRightImage;
      rightImg.alt = 'Predictive analytics visual';
      rightImg.loading = 'lazy';
      rightImg.decoding = 'async';
      rightCol.appendChild(rightImg);

      split.append(leftCol, rightCol);
      layout.appendChild(split);
    }

    if (type === 'impact-detail') {
      const frame = document.createElement('div');
      frame.className = 'project-reel-impact-frame';

      const image = document.createElement('img');
      image.className = 'project-reel-impact-image';
      image.src = impactImage;
      image.alt = 'Python analytics workflow visual';
      image.loading = 'lazy';
      image.decoding = 'async';

      frame.appendChild(image);
      layout.appendChild(frame);
    }

    scene.appendChild(layout);
    return scene;
  };

  const showInitialScene = () => {
    track.innerHTML = '';
    sceneIndex = 0;
    valueIndex = 0;
    const first = createScene(scenePattern[sceneIndex % scenePattern.length]);
    first.classList.add('is-active');
    track.appendChild(first);
  };

  const advanceScene = () => {
    const current = track.querySelector('.project-reel-scene.is-active');
    const nextIndex = (sceneIndex + 1) % scenePattern.length;
    sceneIndex = nextIndex;
    const nextType = scenePattern[nextIndex];
    if (nextType === 'phone') valueIndex = 0;
    const incoming = createScene(nextType);
    track.appendChild(incoming);

    window.requestAnimationFrame(() => {
      if (current) current.classList.add('is-leaving');
      incoming.classList.add('is-active');
    });

    if (nextType === 'value') {
      startValueTyping(incoming);
    }

    setReelTimeout(() => {
      if (current && current.parentNode === track) current.remove();
    }, transitionMs + 80);
  };

  const scheduleNext = () => {
    if (!isRunning) return;
    const currentType = scenePattern[sceneIndex % scenePattern.length];

    if (currentType === 'phone') {
      const activeScene = track.querySelector('.project-reel-scene.is-active[data-scene="phone"]');
      const video = activeScene ? activeScene.querySelector('.project-reel-phone-video') : null;
      let hasAdvanced = false;
      const advanceFromPhone = () => {
        if (hasAdvanced || !isRunning) return;
        hasAdvanced = true;
        queueAdvance(sceneGapMs);
      };

      if (video) {
        if (video.dataset.src && !video.getAttribute('src')) {
          video.src = video.dataset.src;
          video.load();
        }

        video.addEventListener('ended', advanceFromPhone, { once: true });
        const tryPlay = () => {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        };

        if (video.readyState >= 2) {
          tryPlay();
        } else {
          video.addEventListener('loadeddata', tryPlay, { once: true });
        }
      }

      setReelTimeout(() => {
        if (!hasAdvanced) advanceFromPhone();
      }, sceneHold.phoneFallback);
      return;
    }

    if (currentType === 'value') {
      const activeScene = track.querySelector('.project-reel-scene.is-active[data-scene="value"]');
      const hold = startValueTyping(activeScene);
      queueAdvance(hold);
      return;
    }

    const hold = sceneHold[currentType] || 620;
    queueAdvance(hold);
  };

  const start = () => {
    if (prefersReducedMotion || isRunning || !isInView) return;
    isRunning = true;
    scheduleNext();
  };

  const stop = () => {
    isRunning = false;
    clearTimers();
    const activeValue = track.querySelector('.project-reel-scene.is-active[data-scene="value"]');
    if (!activeValue) return;
    const phrase = activeValue.querySelector('.project-reel-text-phrase');
    if (!phrase) return;
    const fullText = phrase.dataset.fullText || '';
    if (fullText) phrase.textContent = fullText;
    phrase.classList.remove('is-typing');
    activeValue.dataset.valueTyped = 'done';
    activeValue.dataset.valueTyping = 'done';
  };

  showInitialScene();
  if (prefersReducedMotion) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInView = Boolean(entry && entry.isIntersecting && entry.intersectionRatio > 0.2);
        if (isInView) start();
        if (!isInView) stop();
      },
      { threshold: [0.2] }
    );
    observer.observe(reel);
  } else {
    isInView = true;
    start();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    if (!document.hidden) start();
  });

  window.addEventListener('pagehide', stop);
})();
  });
})();
