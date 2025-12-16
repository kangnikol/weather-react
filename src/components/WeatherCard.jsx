import React from 'react'
import { motion } from 'framer-motion'

const WeatherCard = ({ weather }) => {
  if (!weather) return null

  const { main, weather: weatherDetails } = weather
  const temp = Math.round(main.temp)
  const description = weatherDetails[0].description
  const icon = weatherDetails[0].icon

  // Capitalize description
  const formattedDesc = description.charAt(0).toUpperCase() + description.slice(1)

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  const iconVariants = {
      hidden: { scale: 0, opacity: 0, rotate: -20 },
      visible: { 
          scale: 1, 
          opacity: 1, 
          rotate: 0,
          transition: { type: "spring", stiffness: 200, damping: 10 }
      }
  }

  return (
    <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-start md:items-end justify-between w-full border-text pt-8 mt-4 overflow-hidden gap-8 md:gap-0"
    >
      <div className="flex flex-col w-full md:w-auto">
        <motion.span variants={textVariants} className="text-xs md:text-sm uppercase tracking-[0.2em] text-subtext0 mb-2 block">
            Current Status
        </motion.span>
        <motion.div variants={textVariants} className="overflow-hidden">
             <h2 className="text-[6rem] md:text-9xl font-black font-sans text-text tracking-tighter leading-none">
            {temp}°
            </h2>
        </motion.div>
        <motion.p variants={textVariants} className="text-xl md:text-2xl text-text font-medium mt-2 lowercase">
            {formattedDesc}
        </motion.p>
      </div>

      <motion.div variants={iconVariants} className="self-end md:self-auto w-24 h-24 md:w-32 md:h-32 opacity-80 mix-blend-multiply filter contrast-125 origin-bottom-right">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  )
}

export default WeatherCard
