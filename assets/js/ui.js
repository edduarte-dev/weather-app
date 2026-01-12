const weatherResult = document.getElementById("weather-result");
const card = document.querySelector(".weather-card");

/**
 * Formata data e hora local da cidade
 */
function formatDateTime(dateString, timezone) {
  const date = new Date(dateString);

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone
  }).format(date);

  // Capitaliza primeira letra (UX)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Texto e ícone do clima
 */
function getWeatherInfo(code) {
  if (code === 0) return { text: "Ensolarado", icon: "☀️" };
  if (code <= 3) return { text: "Parcialmente nublado", icon: "⛅" };
  if (code >= 45 && code <= 48) return { text: "Neblina", icon: "🌫️" };
  if (code >= 51 && code <= 67) return { text: "Chuva", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { text: "Neve", icon: "❄️" };
  if (code >= 95) return { text: "Tempestade", icon: "⛈️" };

  return { text: "Clima indefinido", icon: "❔" };
}

/**
 * Classe visual do card por clima
 */
function getWeatherClass(code) {
  if (code === 0) return "sunny";
  if (code <= 3) return "cloudy";
  if (code >= 51 && code <= 67) return "rainy";
  if (code >= 71 && code <= 77) return "snowy";
  return "cloudy";
}

/**
 * Renderiza clima na tela
 */
export function renderWeather(city, country, weather) {
  card.className = "weather-card";

  const weatherClass = getWeatherClass(weather.weathercode);
  card.classList.add(weatherClass);

  const info = getWeatherInfo(weather.weathercode);

  const formattedDate = formatDateTime(
    weather.time,
    weather.timezone
  );

  weatherResult.innerHTML = `
    <h2>${city}, ${country}</h2>
    <p class="date">${formattedDate}</p>

    <div class="temperature">
      ${Math.round(weather.temperature)}°C
    </div>

    <p>${info.icon} ${info.text}</p>

    <div class="details">
      <p>💨 Vento: ${weather.windspeed} km/h</p>
    </div>
  `;
}

/**
 * Exibe mensagem de erro
 */
export function renderError(message) {
  weatherResult.innerHTML = `
    <p class="error">${message}</p>
  `;
}

/**
 * Limpa o resultado anterior
 */
export function clearWeather() {
  weatherResult.innerHTML = "";
}

/**
 * Mostra loading
 */
export function showLoading() {
  weatherResult.innerHTML = `
    <p class="loading">⏳ Buscando clima...</p>
  `;
}

/**
 * Remove loading
 */
export function hideLoading() {
  weatherResult.innerHTML = "";
}
