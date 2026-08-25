import React from "react"
import { motion } from "framer-motion"
import Footer from "../Footer"
import Doodles from "./Doodles"

const Layout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-base p-4 font-sans text-ink transition-colors duration-300 md:p-12">
      <Doodles />

      <div className="grain-bg grain-fixed" aria-hidden />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 flex w-full max-w-4xl flex-col items-center gap-8 md:gap-12"
      >
        {children}
      </motion.div>

      <div className="z-10 mt-12 w-full max-w-4xl">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
