// Base URLs da Open-Meteo
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Busca coordenadas (latitude e longitude) a partir do nome da cidade
 * @param {string} city
 * @returns {Object} { name, latitude, longitude, country }
 */
export async function getCoordinates(city) {
  const url = `${GEO_API_URL}?name=${encodeURIComponent(
    city
  )}&count=1&language=pt&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar localização");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const location = data.results[0];

  return {
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    country: location.country
  };
}

/**
 * Busca o clima atual a partir das coordenadas
 * Inclui timezone automática para data/hora local
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Object} weather + timezone
 */
export async function getWeather(latitude, longitude) {
  const url = `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }

  const data = await response.json();

  return {
    ...data.current_weather,
    timezone: data.timezone
  };
}
