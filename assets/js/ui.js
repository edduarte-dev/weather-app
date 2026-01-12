const weatherResult = document.getElementById("weather-result");

/**
 * Exibe os dados do clima na tela
 */
export function renderWeather(city, country, weather) {
  weatherResult.innerHTML = `
    <h2>${city}, ${country}</h2>

    <div class="weather-info">
      <p><strong>Temperatura:</strong> ${weather.temperature}°C</p>
      <p><strong>Vento:</strong> ${weather.windspeed} km/h</p>
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
