import React, { useEffect, useState } from 'react'

const BRAND = 'TokenLens'

function PageLoader(): React.ReactElement {
  const [displayed, setDisplayed] = useState<string>('')
  const [charIndex, setCharIndex] = useState<number>(0)
  const [showCursor, setShowCursor] = useState<boolean>(true)

  // Type out letters one by one
  useEffect(() => {
    if (charIndex < BRAND.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + BRAND[charIndex])
        setCharIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [charIndex])

  // Blinking cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
      style={{ background: '#f0f7ff' }}
    >
      {/* Writing animation */}
      <div className="flex items-center gap-1 mb-4">
        <span
          className="text-4xl font-bold tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {displayed}
        </span>
        <span
          className="text-4xl font-bold text-primary-400 transition-opacity duration-100"
          style={{
            opacity: showCursor ? 1 : 0,
            color: '#60a5fa',
          }}
        >
          |
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-48 h-1 rounded-full overflow-hidden mt-2"
        style={{ background: '#ddeeff' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
            width: `${(charIndex / BRAND.length) * 100}%`,
            transition: 'width 0.1s ease',
          }}
        />
      </div>
    </div>
  )
}

export default PageLoader