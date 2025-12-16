import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWeather } from './hooks/useWeather'
import Layout from './components/Layout'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import WeatherDetails from './components/WeatherDetails'
import Modal from './Modal'

const App = () => {
  const { weather, loading, error, fetchWeather } = useWeather()

  return (
    <Layout>

      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-12">
        <SearchBar onSearch={fetchWeather} isLoading={loading} />

        <AnimatePresence mode="wait">
          {loading && (
             <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-teal font-bold text-xl animate-pulse"
             >
                Loading...
             </motion.div>
          )}

          {error && (
            <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red font-bold text-xl bg-red/10 p-4 rounded-xl border border-red/20"
            >
                {error}
            </motion.div>
          )}
          
          {weather && !loading && !error && (
            <motion.div
                key="weather-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8 w-full"
            >
               <WeatherCard weather={weather} />
               <WeatherDetails weather={weather} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

export default App
