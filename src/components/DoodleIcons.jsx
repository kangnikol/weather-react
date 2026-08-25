import React from "react"

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

export const ThermometerDoodle = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M10.5 4.2c-.3 3.4-.1 6.6.2 9.2" />
    <path d="M14.2 4c.3 3.2.2 6.4-.1 9.3" />
    <path d="M10.7 13.4c-1.5.8-2.4 2.1-2.3 3.7.1 2.1 1.8 3.7 3.9 3.6 2-.1 3.6-1.7 3.6-3.8 0-1.5-.8-2.8-2.2-3.5" />
    <path d="M12.3 14.6v3.8" />
    <path d="M16.8 6.6l2 .3" />
    <path d="M17 10.1l2 .2" />
  </svg>
)

export const DropletDoodle = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 3.2c2.8 3.6 6 7.4 6 10.6a6.1 6.1 0 0 1-12.2 0c0-3.2 3.4-7 6.2-10.6z" />
    <path d="M9.2 14.2c.1 1.7 1.1 2.9 2.6 3.3" />
  </svg>
)

export const WindDoodle = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M3 8.5h8.5c1.5 0 2.6-1 2.6-2.3 0-1.2-.9-2.1-2-2.1-1 0-1.7.5-2 1.4" />
    <path d="M3 13.4h13c1.6 0 2.8 1 2.8 2.4 0 1.2-.9 2.2-2.1 2.2-1.2 0-2-.8-2.2-1.9" />
    <path d="M3.2 18.2h5.5" />
  </svg>
)

export const EyeDoodle = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M2.5 12.3C5.2 7.2 8.8 5.2 12.1 5.2c3.3 0 6.8 2 9.4 7.1-2.7 5-6.2 6.9-9.5 6.9-3.3 0-6.8-1.9-9.5-6.9z" />
    <circle cx="12" cy="12.3" r="2.6" />
  </svg>
)
