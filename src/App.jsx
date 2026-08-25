import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiAlertCircle, FiRefreshCw, FiThermometer } from "react-icons/fi"
import { useWeather } from "./hooks/useWeather"
import Layout from "./components/Layout"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import WeatherDetails from "./components/WeatherDetails"

const BrandMark = () => (
  <div className="flex select-none items-center gap-3">
    <span className="doodle-sm grid size-10 -rotate-6 place-items-center bg-moss text-base shadow-sketch-sm transition-transform duration-300 hover:rotate-6">
      <FiThermometer className="size-6" aria-hidden />
    </span>
    <span className="relative font-display text-3xl font-bold tracking-tight text-ink">
      clima<span className="text-moss">.</span>
      <svg
        className="absolute -bottom-2.5 left-0 h-2 w-full"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M2 5 Q 12 1 22 5 T 42 5 T 62 4 T 82 5 T 98 3"
          fill="none"
          stroke="rgb(var(--ev-moss))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  </div>
)

const Spinner = () => (
  <motion.div
    key="loader"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center gap-4"
  >
    <div
      className="size-10 animate-spin rounded-full border-[3px] border-line border-t-moss"
      role="status"
      aria-label="Loading"
    />
    <p className="font-display text-sm tracking-wide text-muted">
      talking to the clouds…
    </p>
  </motion.div>
)

const ErrorNotice = ({ error, onRetry }) => (
  <motion.div
    key="error"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="doodle flex w-full max-w-md items-start gap-3 border-2 border-rose/40 bg-rose/10 p-5 shadow-sketch-sm"
  >
    <FiAlertCircle className="mt-0.5 size-5 shrink-0 text-rose" aria-hidden />
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-ink">{error.title}</p>
      <p className="text-sm text-muted">{error.message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="doodle-sm mt-2 inline-flex w-fit items-center gap-2 border-2 border-rose/40 bg-base px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rose transition-all hover:-translate-y-0.5 hover:bg-rose hover:text-base"
        >
          <FiRefreshCw className="size-3.5" aria-hidden />
          Retry
        </button>
      )}
    </div>
  </motion.div>
)

const App = () => {
  const { weather, loading, error, fetchWeather } = useWeather()
  const [units, setUnits] = useState(
    () => localStorage.getItem("clima-units") ?? "metric"
  )
  const lastQueryRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("clima-units", units)
    if (lastQueryRef.current) fetchWeather(lastQueryRef.current, units)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units])

  const handleSearch = async (target) => {
    lastQueryRef.current = target
    await fetchWeather(target, units)
  }

  return (
    <Layout>
      <BrandMark />

      <div className="flex w-full flex-col items-center justify-center gap-10 md:gap-12 min-h-[60vh]">
        <SearchBar
          onSearch={handleSearch}
          isLoading={loading}
          units={units}
          onUnitsChange={setUnits}
        />

        <AnimatePresence mode="wait" className="flex w-full justify-center">
          {loading && <Spinner />}

          {!loading && error && (
            <ErrorNotice error={error} onRetry={() => handleSearch(lastQueryRef.current)} />
          )}

          {!loading && !error && weather && (
            <motion.div
              key="weather-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center gap-6"
            >
              <WeatherCard weather={weather} />
              <WeatherDetails weather={weather} units={units} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

export default App
