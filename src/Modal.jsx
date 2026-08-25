import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const Modal = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const inputClasses =
    "doodle-sm w-full border-2 border-line bg-base/70 px-4 py-3 font-sans text-sm text-ink placeholder:text-faint outline-none transition-all duration-200 focus:border-moss focus:shadow-sketch-sm"

  return (
    <>
      <button
        className="group relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-ink"
        onClick={openModal}
      >
        <span>Contact</span>
        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-moss transition-all duration-300 group-hover:w-full" />
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="doodle relative mx-4 w-full max-w-2xl border-2 border-line bg-raised/95 backdrop-blur-xl p-8 shadow-sketch-lg md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grain-bg grain-abs doodle" aria-hidden />
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-moss">
                    Say hello
                  </p>
                  <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight text-ink">
                    Get in touch
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="doodle-sm grid size-10 shrink-0 place-items-center border-2 border-line text-muted transition-all hover:rotate-90 hover:border-moss hover:text-moss"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <form
                action="https://formspree.io/f/meqderqp"
                method="POST"
                className="mt-8 flex flex-col gap-5"
              >
                <p className="text-sm leading-relaxed text-moss md:text-base">
                  Have an interesting opportunity, a question, or just want to
                  connect? Drop a message below.
                </p>

                <div className="flex flex-col gap-4 md:flex-row">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Full name"
                    className={inputClasses}
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className={inputClasses}
                  />
                </div>

                <textarea
                  required
                  name="message"
                  placeholder="Your message…"
                  className={`${inputClasses} h-32 resize-none`}
                />

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="doodle-sm -rotate-1 border-2 border-moss bg-moss px-7 py-3 text-sm font-extrabold uppercase tracking-widest text-base shadow-sketch transition-all duration-300 hover:-translate-y-0.5 hover:rotate-0 hover:brightness-110 active:scale-[0.98]"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Modal
