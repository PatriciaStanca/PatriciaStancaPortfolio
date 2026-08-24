(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const resetAboutPosition = (event) => {
    if (!event.persisted || window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  window.addEventListener('pageshow', resetAboutPosition);
})();
