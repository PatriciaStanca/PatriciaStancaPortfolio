(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Shows live weather.
(function () {
  const weatherCard = document.querySelector('[data-weather], #weather .weather-card');
  if (!weatherCard) return;
  const tempEl = weatherCard.querySelector('.weather-temp');
  const metaEl = weatherCard.querySelector('.weather-meta');
  const iconEl = weatherCard.querySelector('.weather-icon i');

  const setIcon = (code) => {
    if (!iconEl) return;
    // Matches weather codes to icons.
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

  // Starts with Gothenburg weather.
  fetchWeather(57.7089, 11.9746, 'Gothenburg, Sweden');
})();
  });
})();
