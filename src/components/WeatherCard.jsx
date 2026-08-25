import React from "react"
import { motion } from "framer-motion"
import {
  FiArrowDown,
  FiArrowUp,
  FiMapPin,
} from "react-icons/fi"
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiNightAltCloudy,
  WiNightClear,
  WiNightAltRain,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi"

const ACCENTS = {
  sun:   { text: "text-sun",   soft: "bg-sun/10 text-sun" },
  lake:  { text: "text-lake",  soft: "bg-lake/10 text-lake" },
  sea:   { text: "text-sea",   soft: "bg-sea/10 text-sea" },
  bloom: { text: "text-bloom", soft: "bg-bloom/10 text-bloom" },
  moss:  { text: "text-moss",  soft: "bg-moss/10 text-moss" },
  muted: { text: "text-muted", soft: "bg-panel text-muted" },
}

const getConditionMeta = (weather) => {
  const icon = weather.weather?.[0]?.icon ?? "01d"
  const map = {
    "01d": { Icon: WiDaySunny, accent: "sun" },
    "01n": { Icon: WiNightClear, accent: "bloom" },
    "02d": { Icon: WiDayCloudy, accent: "lake" },
    "02n": { Icon: WiNightAltCloudy, accent: "bloom" },
    "03d": { Icon: WiCloud, accent: "lake" },
    "03n": { Icon: WiCloud, accent: "bloom" },
    "04d": { Icon: WiCloudy, accent: "muted" },
    "04n": { Icon: WiCloudy, accent: "bloom" },
    "09d": { Icon: WiShowers, accent: "sea" },
    "09n": { Icon: WiShowers, accent: "sea" },
    "10d": { Icon: WiRain, accent: "lake" },
    "10n": { Icon: WiNightAltRain, accent: "sea" },
    "11d": { Icon: WiThunderstorm, accent: "bloom" },
    "11n": { Icon: WiThunderstorm, accent: "bloom" },
    "13d": { Icon: WiSnow, accent: "sea" },
    "13n": { Icon: WiSnow, accent: "sea" },
    "50d": { Icon: WiFog, accent: "muted" },
    "50n": { Icon: WiFog, accent: "muted" },
  }
  return map[icon] ?? map["01d"]
}

const WeatherCard = ({ weather }) => {
  if (!weather) return null

  const { main, sys, weather: details } = weather
  const temp = Math.round(main.temp)
  const description =
    details[0].description.charAt(0).toUpperCase() +
    details[0].description.slice(1)

  const { Icon, accent } = getConditionMeta(weather)
  const styles = ACCENTS[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* lembar kertas — miring permanen, garis & shadow ikut miring */}
      <div className="note-lines relative -rotate-1 border border-line/70 bg-raised p-8 pt-10 shadow-sketch-lg md:p-12 md:pt-14">
      {/* paper tape — kertasnya ketempel pake satu lakban kertas di tengah */}
      <div
        className="paper-tape grain-bg pointer-events-none absolute -top-3.5 left-1/2 z-10 h-7 w-32 -translate-x-1/2 rotate-[-2deg] [filter:drop-shadow(1px_2px_2px_rgb(0_0_0/.15))]"
        aria-hidden
      />

        <div className="relative flex items-center gap-2 text-muted">
        <FiMapPin className="size-4 shrink-0 text-moss" aria-hidden />
        <span className="font-display text-xl md:text-2xl font-semibold tracking-wide">
          {weather.name}
        </span>
        {sys?.country && (
          <span className="doodle-sm -rotate-2 border border-line bg-base/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
            {sys.country}
          </span>
        )}
      </div>

      <div className="relative mt-6 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-display text-sm lowercase tracking-wide text-muted">
            right now
          </p>
          <h2 className="mt-1 font-display text-7xl md:text-8xl font-bold tracking-tighter leading-none text-ink">
            {temp}°
          </h2>
          <p className="mt-2 text-lg md:text-xl text-muted lowercase">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="doodle-sm inline-flex items-center gap-1 border-2 border-line bg-base/60 px-3 py-1 transition-transform duration-200 hover:-rotate-2">
              <FiArrowUp className="size-3.5 text-ember" aria-hidden />
              {Math.round(main.temp_max)}°
            </span>
            <span className="doodle-sm inline-flex items-center gap-1 border-2 border-line bg-base/60 px-3 py-1 transition-transform duration-200 hover:rotate-2">
              <FiArrowDown className="size-3.5 text-lake" aria-hidden />
              {Math.round(main.temp_min)}°
            </span>
            <span className={`doodle-sm -rotate-1 px-3 py-1 text-xs font-bold ${styles.soft}`}>
              feels like {Math.round(main.feels_like)}°
            </span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: -6 }}
          whileHover={{ rotate: 6, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.15 }}
          className="animate-float-slow self-end md:self-auto"
        >
          <Icon className={`size-28 md:size-36 ${styles.text}`} aria-hidden />
        </motion.div>
      </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard
