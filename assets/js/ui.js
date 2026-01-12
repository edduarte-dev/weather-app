const weatherResult = document.getElementById("weather-result");
const card = document.querySelector(".weather-card");

function getWeatherInfo(code) {
  if (code === 0) return { text: "Ensolarado", icon: "☀️" };
  if (code <= 3) return { text: "Parcialmente nublado", icon: "⛅" };
  if (code >= 45 && code <= 48) return { text: "Neblina", icon: "🌫️" };
  if (code >= 51 && code <= 67) return { text: "Chuva", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { text: "Neve", icon: "❄️" };
  if (code >= 95) return { text: "Tempestade", icon: "⛈️" };

  return { text: "Clima indefinido", icon: "❔" };
}


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

  const info = getWeatherInfo(weather.weathercode);

  weatherResult.innerHTML = `
    <h2>${city}, ${country}</h2>

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
