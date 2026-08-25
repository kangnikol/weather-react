import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiLoader, FiMapPin, FiSearch } from "react-icons/fi"
import { twMerge } from "tailwind-merge"
import { searchPlaces } from "../lib/openWeather"

const UnitsToggle = ({ units, onChange }) => (
  <div className="flex items-center gap-1.5">
    {["metric", "imperial"].map((unit) => (
      <button
        key={unit}
        type="button"
        onClick={() => onChange(unit)}
        className={twMerge(
          "doodle-sm px-3 py-1 text-xs font-bold tracking-wide transition-all duration-200 border-2",
          units === unit
            ? "border-moss bg-moss text-base -rotate-3"
            : "border-transparent text-muted hover:text-ink"
        )}
      >
        °{unit === "metric" ? "C" : "F"}
      </button>
    ))}
  </div>
)

const SearchBar = ({ onSearch, isLoading, units, onUnitsChange }) => {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      try {
        const places = await searchPlaces(query, controller.signal)
        setSuggestions(places)
        setIsOpen(true)
        setActiveIndex(-1)
      } catch (err) {
        if (err.code !== "ERR_CANCELED") setSuggestions([])
      }
    }, 300)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatLabel = (place) =>
    [place.name, place.state, place.country].filter(Boolean).join(", ")

  const selectPlace = (place) => {
    setIsOpen(false)
    setSuggestions([])
    setQuery(place.name)
    onSearch({ lat: place.lat, lon: place.lon })
    inputRef.current?.blur()
  }

  const submitRaw = () => {
    if (!query.trim()) return
    setIsOpen(false)
    onSearch(query.trim())
    inputRef.current?.blur()
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setIsOpen(true)
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectPlace(suggestions[activeIndex])
      } else {
        submitRaw()
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div
        className={twMerge(
          "doodle group-doodle flex items-center gap-3 border-2 border-line bg-raised/80 backdrop-blur-xl",
          "px-5 py-4 transition-all duration-300",
          "focus-within:border-moss focus-within:shadow-sketch"
        )}
      >
        <FiSearch className="size-5 shrink-0 text-faint" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length && setIsOpen(true)}
          placeholder="try ‘Jakarta’ or ‘Tokyo’…"
          disabled={isLoading}
          aria-label="Search city"
          className={twMerge(
            "w-full bg-transparent font-display text-lg md:text-xl text-ink",
            "placeholder:text-faint outline-none border-none focus:ring-0 p-0",
            isLoading && "opacity-50 cursor-wait"
          )}
        />
        {isLoading ? (
          <FiLoader className="size-5 shrink-0 animate-spin text-moss" />
        ) : (
          <UnitsToggle units={units} onChange={onUnitsChange} />
        )}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className={twMerge(
              "doodle absolute z-40 mt-3 w-full overflow-hidden border-2 border-line bg-raised/95 backdrop-blur-xl shadow-sketch-lg divide-y-2 divide-dashed divide-line/50",
              suggestions.length > 1 && "py-2"
            )}
          >
            {suggestions.map((place, index) => (
              <li key={`${place.lat}-${place.lon}-${index}`} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onClick={() => selectPlace(place)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={twMerge(
                    "flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors",
                    index === activeIndex ? "bg-panel" : "bg-transparent"
                  )}
                >
                  <FiMapPin
                    className={twMerge(
                      "size-4 shrink-0",
                      index === activeIndex ? "text-moss" : "text-faint"
                    )}
                  />
                  <span className="font-medium text-ink">{place.name}</span>
                  <span className="ml-auto font-display text-xs tracking-wide text-muted">
                    {[place.state, place.country].filter(Boolean).join(" · ")}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar
