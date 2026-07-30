import React from 'react'

function TokenLensLogoSmall(): React.ReactElement {
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

function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-blue-100 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <TokenLensLogoSmall />
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
              Free AI token counter and API cost estimator for developers, marketers,
              and freelancers. No login required. Ever.
            </p>
          </div>

          {/* Tool Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Tool</h4>
            <ul className="space-y-2">
              {[
                { label: 'Token Calculator', href: '#tool' },
                { label: 'Cost Comparison', href: '#compare' },
                { label: 'FAQ', href: '#faq' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-primary-500 text-sm transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Supported Providers</h4>
            <ul className="space-y-2">
              {[
                { label: 'OpenAI (GPT-4o)', href: 'https://platform.openai.com/signup' },
                { label: 'Anthropic (Claude)', href: 'https://console.anthropic.com/login' },
                { label: 'Google (Gemini)', href: 'https://aistudio.google.com/app/apikey' },
                { label: 'Mistral AI', href: 'https://console.mistral.ai/' },
                { label: 'Meta Llama (Groq)', href: 'https://console.groq.com/login' },
              ].map(p => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-slate-500 hover:text-primary-500 text-sm transition-colors font-medium"
                  >
                    {p.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure — legally required */}
        <div
          id="disclosure"
          className="glass-card p-5 mb-6 border-l-4 border-primary-300"
        >
          <h5 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Affiliate Disclosure
          </h5>
          <p className="text-xs text-slate-500 leading-relaxed">
            TokenLens participates in referral programs with AI providers. Some links on this
            page are affiliate or referral links, marked with "→". If you sign up or make a
            purchase through these links, TokenLens may earn a commission at no additional cost
            to you. We only link to services we genuinely recommend and use. This disclosure is
            provided in compliance with the FTC guidelines on endorsements and testimonials.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} TokenLens. Free forever. Built for developers.
          </p>
          <div className="flex items-center gap-4">
            <a href="#disclosure" className="text-slate-400 hover:text-primary-500 text-xs transition-colors">
              Affiliate Disclosure
            </a>
            <a href="#" className="text-slate-400 hover:text-primary-500 text-xs transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer