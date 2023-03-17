import React from "react"
import Modal from "./Modal"

const Footer = () => {
  return (
    <>
      <div className="absolute bottom-0">
        <div className="flex justify-center lg:mt-12">
          <img
            src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true"
            alt="catppuccin's Cat"
          />
        </div>
        <footer className="text-base text-white px-4 max-w-3xl w-full flex justify-between mx-auto items-center mb-12">
          <div className="opacity-50 text-subtext0">
            © Nicholas Alvi S, 2023
          </div>
          <Modal />
        </footer>
      </div>
    </>
  )
}

export default Footer
