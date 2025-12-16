import React from 'react'
import { FaTint, FaUmbrella, FaWind } from 'react-icons/fa'
import { motion } from 'framer-motion'



const WeatherDetails = ({ weather }) => {
  if (!weather) return null

  const details = [
    {
      icon: <FaWind />,
      value: `${weather.wind?.speed} mph`,
      label: "Wind",
    },
    {
        icon: <FaUmbrella />,
        value: `${weather.rain?.["1h"] || 0} mm`,
        label: "Rain",
    },
    {
      icon: <FaTint />,
      value: `${weather.main?.humidity}%`,
      label: "Humidity",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  }

  const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  }

  return (
    <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full justify-between mt-8 md:mt-12 border-t border-surface0 pt-8 overflow-x-auto md:overflow-visible gap-8 md:gap-0 pb-2 md:pb-0"
    >
        {details.map((item, index) => (
            <motion.div 
                key={item.label}
                variants={itemAnim}
                className="flex flex-col gap-1 min-w-[max-content]"
            >
                <div className="flex items-center gap-2 text-subtext0">
                     <span className="text-sm">{item.icon}</span>
                     <span className="text-xs uppercase tracking-widest font-sans font-bold">{item.label}</span>
                </div>
                <span className="text-2xl font-bold text-text font-sans">{item.value}</span>
            </motion.div>
        ))}
    </motion.div>
  )
}

export default WeatherDetails
