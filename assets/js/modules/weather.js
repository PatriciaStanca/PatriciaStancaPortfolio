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
  const apiKey = (weatherCard.getAttribute('data-weather-api-key') || '').trim();

  const mapConditionToLucide = (conditionId) => {
    if (typeof conditionId !== 'number') return 'cloud';
    if (conditionId >= 200 && conditionId <= 232) return 'cloud-lightning';
    if (conditionId >= 300 && conditionId <= 321) return 'cloud-drizzle';
    if (conditionId >= 500 && conditionId <= 531) return 'cloud-rain';
    if (conditionId >= 600 && conditionId <= 622) return 'cloud-snow';
    if (conditionId >= 700 && conditionId <= 781) return 'cloud-fog';
    if (conditionId === 800) return 'sun';
    if (conditionId >= 801 && conditionId <= 804) return 'cloud';
    return 'cloud';
  };

  const setLucideIcon = (name) => {
    if (!iconEl) return;
    iconEl.setAttribute('data-lucide', name);
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
    const conditionId = data.weather?.[0]?.id;
    setTempAndMeta(temp, label);
    setLucideIcon(mapConditionToLucide(conditionId));
  };

  const fetchWeather = async (lat, lon, label) => {
    try {
      await fetchFromOpenWeather(lat, lon, label);
    } catch (err) {
      console.warn('OpenWeather failed:', err?.message || err);
      tempEl.textContent = 'Unavailable';
      const message = String(err?.message || '');
      if (message.toLowerCase().includes('invalid api key') || message.includes('401')) {
        metaEl.textContent = 'Invalid/inactive OpenWeather API key';
      } else if (message.includes('429')) {
        metaEl.textContent = 'OpenWeather rate limit reached';
      } else {
        metaEl.textContent = 'Weather service error';
      }
      setLucideIcon('cloud-off');
    }
  };

  // Starts with Gothenburg weather.
  fetchWeather(57.7089, 11.9746, 'Gothenburg, Sweden');
})();
  });
})();
