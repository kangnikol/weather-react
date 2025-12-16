import React, { useEffect, useState } from "react"
import Modal from "./Modal"
import { Switch } from "@headlessui/react"

const Footer = () => {
  const [mode, setMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark:latte", mode)
  }, [mode])

  const handleToggle = () => {
    setMode((prevMode) => !prevMode)
  }

  return (
    <>
      <div className="w-full mt-auto">
        <footer className="w-full grid grid-cols-2 md:grid-cols-3 items-center py-6 md:py-8 text-subtext0 font-sans gap-y-4 md:gap-y-0 border-t border-transparent">
          {/* Left: Theme Switch */}
          <div className="flex justify-start order-1">
            <Switch
              checked={mode}
              onChange={handleToggle}
              className={`${mode ? "bg-surface1" : "bg-surface1"} relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  mode ? "translate-x-5" : "translate-x-1"
                } inline-block w-3 h-3 transform bg-text rounded-full transition-transform`}
              />
            </Switch>
          </div>

          {/* Center: Copyright */}
          <div className="flex justify-center order-3 md:order-2 col-span-2 md:col-span-1">
             <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60 font-medium text-center hover:opacity-100 transition-opacity cursor-default">
              © 2025 Nicholas Alvi S
            </div>
          </div>

          {/* Right: Contact */}
          <div className="flex justify-end order-2 md:order-3">
             <Modal />
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer
