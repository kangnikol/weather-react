import { useCallback, useRef, useState } from "react"
import axios from "axios"
import {
  fetchCurrentWeather,
  searchPlaces,
} from "../lib/openWeather"

const STATUS_MESSAGES = {
  400: "Invalid request. Please check the city name and try again.",
  401: "API key is invalid or not activated yet. Check your VITE_OWM_API_KEY.",
  404: "City not found. Try a different spelling, e.g. \"Jakarta, ID\".",
  429: "Too many requests. Please wait a moment and try again.",
}

export const useWeather = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)

  /**
   * @param {string | {lat: number, lon: number}} target
   *   A city name string, or coordinates from geocoding suggestions.
   * @param {"metric" | "imperial"} units
   */
  const fetchWeather = useCallback(async (target, units = "metric") => {
    if (!target) return

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      let coords = { lat: target.lat, lon: target.lon }

      if (typeof target === "string" || target.lat == null) {
        const places = await searchPlaces(
          typeof target === "string" ? target : `${target.name}`,
          controller.signal
        )
        if (!places.length) {
          throw Object.assign(new Error(), { statusCode: 404 })
        }
        coords = { lat: places[0].lat, lon: places[0].lon }
      }

      const data = await fetchCurrentWeather(coords, units, controller.signal)
      if (!controller.signal.aborted) setWeather(data)
    } catch (err) {
      if (axios.isCancel(err) || err.code === "ERR_CANCELED") return

      const status =
        err.statusCode ?? err.response?.status ?? null

      setError({
        title:
          status === 404
            ? "Location not found"
            : status === 401
              ? "Unauthorized"
              : "Something went wrong",
        message:
          STATUS_MESSAGES[status] ||
          (err instanceof TypeError || err.message === "Network Error"
            ? "Network error. Check your internet connection."
            : err.message || "Failed to fetch weather data."),
      })
      setWeather(null)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [])

  const clearWeather = useCallback(() => {
    controllerRef.current?.abort()
    setWeather(null)
    setError(null)
  }, [])

  return { weather, loading, error, fetchWeather, clearWeather }
}
