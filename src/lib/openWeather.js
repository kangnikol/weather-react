import axios from "axios"

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct"

export const getApiKey = () => {
  const key = import.meta.env.VITE_OWM_API_KEY
  if (!key) {
    throw new Error(
      "OpenWeather API key is missing. Set VITE_OWM_API_KEY in your .env file."
    )
  }
  return key
}

export const searchPlaces = async (query, signal) => {
  const key = getApiKey()
  const res = await axios.get(GEOCODE_URL, {
    signal,
    params: { q: query.trim(), limit: 5, appid: key },
  })
  return (res.data || []).map((place) => ({
    name: place.name,
    state: place.state || null,
    country: place.country || null,
    lat: place.lat,
    lon: place.lon,
  }))
}

export const fetchCurrentWeather = async ({ lat, lon }, units, signal) => {
  const key = getApiKey()
  const res = await axios.get(WEATHER_URL, {
    signal,
    params: { lat, lon, units, appid: key },
  })
  if (res.data?.cod && Number(res.data.cod) !== 200) {
    throw new Error(res.data.message || "Unable to load weather data")
  }
  return res.data
}
