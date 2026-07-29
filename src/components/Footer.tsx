function TokenLensLogoSmall() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="none" stroke="url(#footerGrad)" strokeWidth="2" />
        <circle cx="18" cy="18" r="5" fill="url(#footerGrad)" />
      </svg>
      <span className="text-lg font-bold text-gradient">TokenLens</span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-glass-border mt-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <TokenLensLogoSmall />
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
              Free AI token counter and API cost estimator for developers, marketers,
              and freelancers. No login required.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Tool</h4>
            <ul className="space-y-2">
              {['Token Calculator', 'Cost Comparison', 'FAQ'].map(link => (
                <li key={link}>
                  <a href="#tool" className="text-slate-500 hover:text-primary-400 text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Supported Providers</h4>
            <ul className="space-y-2">
              {['OpenAI', 'Anthropic', 'Google Gemini', 'Mistral AI'].map(p => (
                <li key={p} className="text-slate-500 text-sm">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} TokenLens. Free forever. Built for developers.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-600 hover:text-primary-400 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-600 hover:text-primary-400 text-xs transition-colors">
              Affiliate Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer