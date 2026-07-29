import React, { useState } from 'react'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Tool', href: '#tool' },
  { label: 'Compare', href: '#compare' },
  { label: 'FAQ', href: '#faq' },
]

function TokenLensLogo(): React.ReactElement {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <polygon
          points="18,2 34,10 34,26 18,34 2,26 2,10"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="2"
        />
        <circle cx="18" cy="18" r="5" fill="url(#logoGrad)" />
        <line x1="18" y1="8" x2="18" y2="13" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="23" x2="18" y2="28" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="13" x2="13" y2="15.5" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="23" y1="20.5" x2="28" y2="23" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="23" x2="13" y2="20.5" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
        <line x1="23" y1="15.5" x2="28" y2="13" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {/* Restored original logo design gradient */}
      <span className="text-xl font-bold text-gradient">TokenLens</span>
    </div>
  )
}

function Navbar(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" aria-label="TokenLens Home">
          <TokenLensLogo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link: NavLink) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-800 hover:text-slate-900 text-sm font-semibold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a href="#tool" className="btn-primary text-sm px-4 py-2 font-semibold">
            Try Free ⚡
          </a>
        </div>

        {/* Hamburger Toggle Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link: NavLink) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-800 hover:text-slate-900 text-sm font-semibold py-2 border-b border-glass-border transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#tool" className="btn-primary text-center mt-2 font-semibold">
            Try Free ⚡
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar