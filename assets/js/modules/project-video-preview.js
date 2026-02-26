(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Restarts preview videos from the beginning.
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
  });
})();
