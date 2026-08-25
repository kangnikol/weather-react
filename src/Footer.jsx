import React, { useEffect, useState } from "react"
import { Switch } from "@headlessui/react"
import { FiMoon, FiSun } from "react-icons/fi"
import Modal from "./Modal"

const Footer = () => {
  const [isLight, setIsLight] = useState(
    () => !document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !isLight)
  }, [isLight])

  return (
    <footer className="grid w-full grid-cols-2 items-center gap-y-4 border-t-2 border-dashed border-line/60 py-6 font-sans text-muted md:grid-cols-3 md:py-8">
      {/* Left: Theme Switch */}
      <div className="flex justify-start">
        <Switch
          checked={isLight}
          onChange={setIsLight}
          aria-label="Toggle theme"
          className="doodle-sm relative inline-flex h-7 w-14 items-center border-2 border-line bg-panel transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss"
        >
          <span
            className={`doodle-sm inline-flex size-5 transform items-center justify-center bg-base text-xs shadow-sketch-sm transition-transform duration-300 ${
              isLight ? "translate-x-7 text-sun" : "translate-x-1 text-bloom"
            }`}
          >
            {isLight ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
          </span>
        </Switch>
      </div>

      {/* Center: Copyright */}
      <div className="col-span-2 order-3 flex justify-center md:order-none md:col-span-1">
        <div className="cursor-default text-center text-[10px] font-medium uppercase tracking-[0.25em] opacity-60 transition-opacity hover:opacity-100 md:text-xs">
          © {new Date().getFullYear()} Nicholas Alvi S
        </div>
      </div>

      {/* Right: Contact */}
      <div className="flex justify-end">
        <Modal />
      </div>
    </footer>
  )
}

export default Footer
