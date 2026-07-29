import React, { useEffect, useState } from 'react'

function Preloader(): React.ReactElement | null {
  const [visible, setVisible] = useState<boolean>(true)
  const [fadeOut, setFadeOut] = useState<boolean>(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000)
    const hideTimer = setTimeout(() => setVisible(false), 2400)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: '#f0f7ff' }}
    >
      {/* Hexagon Spinner */}
      <div className="relative flex items-center justify-center mb-6">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
          style={{ animationDuration: '1.2s' }}
        >
          <defs>
            <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <polygon
            points="40,4 74,22 74,58 40,76 6,58 6,22"
            fill="none"
            stroke="url(#spinGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="40,16 62,28 62,52 40,64 18,52 18,28"
            fill="none"
            stroke="url(#spinGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Center dot */}
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)' }}
        />
      </div>

      {/* TokenLens text */}
      <div className="flex items-center gap-2">
        <span
          className="text-2xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          TokenLens
        </span>
      </div>

      <p className="text-sm mt-2 font-medium" style={{ color: '#64748b' }}>
        Loading your tool...
      </p>
    </div>
  )
}

export default Preloader