import React from 'react'
import AdSlot from './AdSlot'

// Top horizontal banner — goes below navbar, above hero
export function AdBannerTop(): React.ReactElement {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-20">
      <AdSlot
        slotId="1234567890"
        format="horizontal"
        label="Advertisement"
        className="w-full"
      />
    </div>
  )
}

// Between tool and comparison table
export function AdBannerMiddle(): React.ReactElement {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      <AdSlot
        slotId="0987654321"
        format="horizontal"
        label="Advertisement"
        className="w-full"
      />
    </div>
  )
}

// Sidebar rectangle — shown on large screens only
export function AdSidebarRect(): React.ReactElement {
  return (
    <div className="hidden xl:block w-64 shrink-0">
      <AdSlot
        slotId="1122334455"
        format="rectangle"
        label="Advertisement"
        className="sticky top-24"
      />
    </div>
  )
}

// Below FAQ, above footer
export function AdBannerBottom(): React.ReactElement {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      <AdSlot
        slotId="5544332211"
        format="horizontal"
        label="Advertisement"
        className="w-full"
      />
    </div>
  )
}