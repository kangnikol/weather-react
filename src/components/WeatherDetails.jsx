import React from "react"
import { motion } from "framer-motion"
import {
  DropletDoodle,
  EyeDoodle,
  ThermometerDoodle,
  WindDoodle,
} from "./DoodleIcons"

/* tiap sobekan punya kemiringan & arah tape-nya sendiri */
const SCRAP_STYLES = [
  { rotate: "-rotate-2", tape: "rotate-[-5deg]" },
  { rotate: "rotate-1", tape: "rotate-[3deg]" },
  { rotate: "-rotate-1", tape: "rotate-[4deg]" },
  { rotate: "rotate-2", tape: "rotate-[-3deg]" },
]

const WeatherDetails = ({ weather, units = "metric" }) => {
  if (!weather) return null

  const windUnit = units === "metric" ? "m/s" : "mph"
  const visibilityKm =
    weather.visibility != null ? (weather.visibility / 1000).toFixed(1) : null

  const details = [
    {
      icon: <ThermometerDoodle className="size-5" />,
      value: `${Math.round(weather.main?.feels_like)}°`,
      label: "feels like",
      tone: "bg-ember/15 text-ember",
    },
    {
      icon: <DropletDoodle className="size-5" />,
      value: `${weather.main?.humidity ?? 0}%`,
      label: "humidity",
      tone: "bg-lake/15 text-lake",
    },
    {
      icon: <WindDoodle className="size-5" />,
      value: `${weather.wind?.speed ?? 0} ${windUnit}`,
      label: "wind",
      tone: "bg-sea/15 text-sea",
    },
    ...(visibilityKm
      ? [
          {
            icon: <EyeDoodle className="size-5" />,
            value: `${visibilityKm} km`,
            label: "visibility",
            tone: "bg-moss/15 text-moss",
          },
        ]
      : []),
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.25 },
    },
  }

  const itemAnim = {
    hidden: { y: 18, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid w-full grid-cols-2 gap-x-5 gap-y-7 md:gap-x-7 lg:grid-cols-4"
    >
      {details.map((item, index) => {
        const scrap = SCRAP_STYLES[index % SCRAP_STYLES.length]
        return (
          <motion.div key={item.label} variants={itemAnim}>
            {/* potongan kertas — ditempel pake paper tape */}
            <div className={`relative ${scrap.rotate}`}>
              <div
                aria-hidden
                className={`paper-tape grain-bg pointer-events-none absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 ${scrap.tape} [filter:drop-shadow(1px_1px_1px_rgb(0_0_0/.12))]`}
              />

              <div className="note-lines border border-line/70 bg-raised px-4 py-5 shadow-sketch-sm">
                <span
                  className={`doodle-sm mb-3 grid size-10 -rotate-3 place-items-center text-lg ${item.tone}`}
                  aria-hidden
                >
                  {item.icon}
                </span>
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="font-display text-xs lowercase tracking-wide text-muted">
                    {item.label}
                  </span>
                  <span className="truncate font-display text-xl font-bold text-ink">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default WeatherDetails
