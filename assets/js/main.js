import { getCoordinates, getWeather } from "./api.js";
import { renderWeather, renderError, clearWeather } from "./ui.js";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) return;

  clearWeather();

  try {
    const location = await getCoordinates(city);
    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    renderWeather(
      location.name,
      location.country,
      weather
    );
  } catch (error) {
    renderError(error.message);
  }
});
