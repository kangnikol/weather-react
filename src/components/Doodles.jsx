import React from "react"

const SunDoodle = (props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...props}>
    <circle cx="32" cy="32" r="12" />
    <path d="M32 8v6M32 50v6M8 32h6M50 32h6M15 15l4 4M45 45l4 4M49 15l-4 4M19 45l-4 4" />
  </svg>
)

const CloudDoodle = (props) => (
  <svg viewBox="0 0 80 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...props}>
    <path d="M22 40c-8 0-14-5-14-12s6-12 13-11c1-9 9-13 16-11 6 2 9 7 9 7s3-2 8-1c7 1 10 8 8 14-1 5-6 8-6 8H22z" />
  </svg>
)

const StarDoodle = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c.6 4.8 2.4 7.4 8 8-5.6.6-7.4 3.2-8 8-.6-4.8-2.4-7.4-8-8 5.6-.6 7.4-3.2 8-8z" />
  </svg>
)

const SquiggleDoodle = (props) => (
  <svg viewBox="0 0 60 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...props}>
    <path d="M2 8c4-6 8-6 12 0s8 6 12 0 8-6 12-0 8 6 12 0" />
  </svg>
)

const Doodles = () => {
  return (
    <>
      <SunDoodle
        className="pointer-events-none absolute top-[8%] right-[6%] z-0 hidden size-20 text-sun/50 animate-float-slow md:block"
        aria-hidden
      />
      <CloudDoodle
        className="pointer-events-none absolute bottom-[18%] left-[4%] z-0 hidden w-24 text-lake/40 animate-float-slow md:block"
        style={{ animationDelay: "1.5s", animationDuration: "6s" }}
        aria-hidden
      />
      <StarDoodle
        className="pointer-events-none absolute top-[38%] left-[8%] z-0 hidden size-6 text-bloom/50 animate-float-slow md:block"
        style={{ animationDelay: "2.5s", animationDuration: "4.5s" }}
        aria-hidden
      />
      <StarDoodle
        className="pointer-events-none absolute bottom-[30%] right-[10%] z-0 hidden size-4 text-moss/60 animate-float-slow md:block"
        style={{ animationDelay: "0.8s", animationDuration: "5.5s" }}
        aria-hidden
      />
      <SquiggleDoodle
        className="pointer-events-none absolute top-[20%] left-[14%] z-0 hidden w-14 -rotate-12 text-sea/50 animate-float-slow md:block"
        style={{ animationDelay: "3s", animationDuration: "6.5s" }}
        aria-hidden
      />
    </>
  )
}

export default Doodles
