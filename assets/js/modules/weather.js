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

  const setFallbackLucideIcon = () => {
    if (!iconEl) return;
    iconEl.setAttribute('data-lucide', 'cloud-off');
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  const setTempAndMeta = (temp, label) => {
    if (typeof temp === 'number') {
      tempEl.textContent = `${Math.round(temp)}°C`;
    } else {
      tempEl.textContent = 'Unavailable';
    }
    metaEl.textContent = label;
  };

  const fetchFromOpenWeather = async (lat, lon, label) => {
    if (!apiKey) throw new Error('Missing OpenWeather API key');

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `OpenWeather HTTP ${res.status}`);
    }

    const temp = data.main?.temp;
    const iconCode = data.weather?.[0]?.icon;
    const description = data.weather?.[0]?.description;
    setTempAndMeta(temp, label);
    setOpenWeatherIcon(iconCode, description);
  };

  const fetchFromOpenMeteo = async (lat, lon, label) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
    const data = await res.json();
    const temp = data.current?.temperature_2m;
    setTempAndMeta(temp, label);
  };

  const fetchWeather = async (lat, lon, label) => {
    try {
      await fetchFromOpenWeather(lat, lon, label);
      return;
    } catch (err) {
      // Keep this for debugging API key/account issues in production.
      console.warn('OpenWeather failed:', err?.message || err);
    }

    try {
      await fetchFromOpenMeteo(lat, lon, label);
    } catch (err) {
      tempEl.textContent = 'Unavailable';
      metaEl.textContent = 'Weather service error';
      setFallbackLucideIcon();
    }
  };

  // Starts with Gothenburg weather.
  fetchWeather(57.7089, 11.9746, 'Gothenburg, Sweden');
})();
  });
})();
