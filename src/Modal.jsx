import React, { useState } from "react"

const Modal = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <button
        className="text-xs uppercase tracking-widest text-text hover:text-teal transition-colors flex items-center gap-2 group relative"
        onClick={openModal}
      >
        <span>Contact</span>
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full"></span>
      </button>

      {showModal && (
        <div className="fixed h-screen w-screen overflow-hidden z-[100] top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-base/50 flex items-center justify-center">
          <div className="relative mx-4 w-full max-w-2xl bg-base border border-surface2 shadow-2xl rounded-sm p-8 md:p-12 transition-all duration-300">
            <div className="w-full text-text">
              <div className="flex justify-between items-start mb-8">
                  <h2 className="text-4xl font-bold text-text tracking-tight">
                    Get In Touch
                  </h2>
                  <button 
                    onClick={closeModal}
                    className="text-subtext0 hover:text-text transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
              </div>

              <form
                action="https://formspree.io/f/meqderqp"
                method="POST"
                className="flex flex-col gap-6"
              >
                <p className="text-lg text-subtext0">
                  Do you have an interesting job opportunity? Want to ask me a
                  question? Or, just want to connect?
                </p>

                <div className="flex flex-col md:flex-row gap-6">
                  <input
                    required
                    name="name"
                    type="text"
                    className="flex-1 bg-transparent border-b border-surface2 p-2 outline-none text-text placeholder:text-surface2 focus:border-teal transition-colors rounded-none"
                    placeholder="FULL NAME"
                  />

                  <input
                    required
                    name="email"
                    type="email"
                    className="flex-1 bg-transparent border-b border-surface2 p-2 outline-none text-text placeholder:text-surface2 focus:border-teal transition-colors rounded-none"
                    placeholder="EMAIL"
                  />
                </div>
                <textarea
                  required
                  name="message"
                  className="w-full bg-transparent border-b border-surface2 p-2 outline-none text-text placeholder:text-surface2 focus:border-teal transition-colors h-32 resize-none rounded-none"
                  placeholder="MESSAGE"
                />
                <div className="flex justify-end mt-4">
                    <button
                    type="submit"
                    className="bg-text text-base px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-teal transition-colors"
                    >
                    Send Message
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
