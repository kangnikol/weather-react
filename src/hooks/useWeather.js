import { useState, useCallback } from "react"
import axios from "axios"

const apiURL = "https://api.openweathermap.org/data/2.5/weather"
const apiKEY = "512b347a7d7784c6598cae4c38f9846c"

export const useWeather = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (city) => {
    if (!city) return

    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const res = await axios.get(apiURL, {
        params: {
          q: city,
          units: "metric",
          appid: apiKEY,
        },
      })
      
      if (res.data.cod && res.data.cod !== 200) {
          throw new Error(res.data.message || "City not found")
      }
      
      setWeather(res.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch weather")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearWeather = useCallback(() => {
      setWeather(null)
      setError(null)
  }, [])

  return { weather, loading, error, fetchWeather, clearWeather }
}
