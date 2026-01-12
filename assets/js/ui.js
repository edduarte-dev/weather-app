const weatherResult = document.getElementById("weather-result");
const card = document.querySelector(".weather-card");

function getWeatherClass(code) {
  if (code === 0) return "sunny";
  if (code <= 3) return "cloudy";
  if (code >= 51 && code <= 67) return "rainy";
  if (code >= 71 && code <= 77) return "snowy";
  return "cloudy";
}

export function renderWeather(city, country, weather) {
  card.className = "weather-card";

  const weatherClass = getWeatherClass(weather.weathercode);
  card.classList.add(weatherClass);

  weatherResult.innerHTML = `
    <h2>${city}, ${country}</h2>

    <div class="temperature">
      ${Math.round(weather.temperature)}°C
    </div>

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
