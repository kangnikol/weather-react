import React from 'react'
import { motion } from 'framer-motion'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-base text-text font-cat flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 md:gap-12"
      >
        {children}
      </motion.div>
      
      <div className="w-full max-w-4xl mt-12 z-10">
          <Footer />
      </div>
    </div>
  )
}

export default Layout
