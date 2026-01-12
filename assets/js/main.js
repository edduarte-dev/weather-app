import { getCoordinates, getWeather } from "./api.js";
import {
  renderWeather,
  renderError,
  clearWeather,
  showLoading,
  hideLoading
} from "./ui.js";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const button = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    cityInput.focus();
    return;
  }

  // Limpa resultado anterior e mostra loading
  clearWeather();
  showLoading();
  button.disabled = true;

  try {
    const location = await getCoordinates(city);
    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    hideLoading();
    renderWeather(location.name, location.country, weather);

    cityInput.value = "";
    cityInput.focus();
  } catch (error) {
    hideLoading();
    renderError(error.message);
  } finally {
    button.disabled = false;
  }
});
