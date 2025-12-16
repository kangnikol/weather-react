import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const SearchBar = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSearch(inputValue)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <span className="text-sm uppercase tracking-[0.2em] text-subtext0">
        Location
      </span>
      <div className="relative w-full border-b-2 border-text">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ENTER CITY..."
          disabled={isLoading}
          className={twMerge(
            "text-5xl md:text-8xl font-black font-sans text-text bg-transparent placeholder:text-surface2",
            "outline-none w-full transition-all duration-300 uppercase tracking-tightest decoration-0 pb-2 border-0",
            isLoading && "opacity-50 cursor-wait"
          )}
        />
      </div>
    </div>
  )
}

export default SearchBar
