import React, { useEffect, useRef } from 'react'

interface AdSlotProps {
  slotId: string
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical'
  className?: string
  label?: string
}

// Your AdSense publisher ID — replace with yours after approval
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

function AdSlot({
  slotId,
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdSlotProps): React.ReactElement {
  const adRef = useRef<HTMLModElement>(null)
  const initialized = useRef<boolean>(false)

  useEffect(() => {
    // Only push once per slot — prevents duplicate ad errors
    if (initialized.current) return
    initialized.current = true

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch {
      // Silently fail — ad blocker or not yet loaded
    }
  }, [])

  // Placeholder shown while awaiting AdSense approval
  const isPlaceholder = ADSENSE_CLIENT === 'ca-pub-XXXXXXXXXXXXXXXX'

  if (isPlaceholder) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div
          className="w-full rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 flex flex-col items-center justify-center gap-2 py-6 px-4"
          style={{ minHeight: format === 'horizontal' ? '90px' : '250px' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="#93c5fd" strokeWidth="1.5" />
            <path d="M3 9h18M9 21V9" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-xs text-slate-400 font-medium text-center">
            Ad Space — {label}
          </span>
          <span className="text-xs text-slate-300">
            AdSense pending approval
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <p className="text-xs text-slate-400 text-center mb-1">{label}</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default AdSlot