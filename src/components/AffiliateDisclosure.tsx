import React, { useState } from 'react'

function AffiliateDisclosure(): React.ReactElement {
  const [dismissed, setDismissed] = useState<boolean>(false)

  if (dismissed) return <></>

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-4">
      <div className="glass-card px-5 py-3 flex items-start sm:items-center justify-between gap-4 border-l-4 border-primary-400">
        <div className="flex items-start sm:items-center gap-3">
          <span className="text-base shrink-0">ℹ️</span>
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-700">Affiliate Disclosure: </span>
            Some links on this page are referral links. If you sign up through them,
            TokenLens may earn a small commission at no extra cost to you.
            This helps keep the tool free for everyone.{' '}
            <a
              href="#disclosure"
              className="text-primary-500 hover:underline font-medium"
            >
              Learn more
            </a>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 text-lg leading-none"
          aria-label="Dismiss disclosure"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default AffiliateDisclosure