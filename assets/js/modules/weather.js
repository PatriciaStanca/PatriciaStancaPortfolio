(function () {
  const app = (window.SiteApp = window.SiteApp || { initializers: [] });
  app.initializers.push(() => {
// Shows live weather.
(function () {
  const weatherCard = document.querySelector('[data-weather], #weather .weather-card');
  if (!weatherCard) return;
  const tempEl = weatherCard.querySelector('.weather-temp');
  const metaEl = weatherCard.querySelector('.weather-meta');
  const iconHostEl = weatherCard.querySelector('.weather-icon');
  const iconEl = weatherCard.querySelector('.weather-icon i');
  const apiKey = (weatherCard.getAttribute('data-weather-api-key') || '').trim();

  const setOpenWeatherIcon = (iconCode, description) => {
    if (!iconHostEl || !iconCode) return;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const existingImg = iconHostEl.querySelector('img');
    const img = existingImg || document.createElement('img');

    img.src = iconUrl;
    img.alt = description || 'Current weather icon';
    img.width = 52;
    img.height = 52;
    img.loading = 'lazy';

    if (!existingImg) {
      iconHostEl.innerHTML = '';
      iconHostEl.appendChild(img);
    }
  };

  const fetchWeather = async (lat, lon, label) => {
    if (!apiKey) {
      tempEl.textContent = 'Unavailable';
      metaEl.textContent = 'Missing OpenWeather API key';
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather error');
      const data = await res.json();
      const temp = data.main?.temp;
      const iconCode = data.weather?.[0]?.icon;
      const description = data.weather?.[0]?.description;
      if (typeof temp === 'number') {
        tempEl.textContent = `${Math.round(temp)}°C`;
      } else {
        tempEl.textContent = 'Unavailable';
      }
      metaEl.textContent = label;
      setOpenWeatherIcon(iconCode, description);
    } catch (err) {
      tempEl.textContent = 'Unavailable';
      metaEl.textContent = 'Weather service error';
      if (iconEl) {
        iconEl.setAttribute('data-lucide', 'cloud-off');
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      }
    }
  };

  // Starts with Gothenburg weather.
  fetchWeather(57.7089, 11.9746, 'Gothenburg, Sweden');
})();
  });
})();
