import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { Menu, Close, Phone, Mail } from './icons.jsx'
import { SITE, FOUNDED } from '../data/site'
import './Navbar.css'

const LINKS = [
  { page: 'home', label: 'Home', href: '/' },
  { page: 'stock', label: 'Current Stock', href: '/stock/' },
  { page: 'sell', label: 'Sell Your Car', href: '/sell/' },
  { page: 'finance', label: 'Finance', href: '/finance/' },
  { page: 'story', label: 'Our Story', href: '/story/' },
  { page: 'contact', label: 'Visit Us', href: '/contact/' },
]

/* `solid` starts the bar on its blurred navy ground instead of transparent -
   for pages that open on the light paper panel, where an ivory wordmark over
   a clear bar would vanish. */
export default function Navbar({ current, solid = false }) {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // a full-screen menu that scrolls the page behind it is a bug, not a feature
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className={'nav' + (lifted || solid ? ' is-lifted' : '')}>
        <button
          className="nav__icon nav__menu"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <Menu className="nav__glyph" />
        </button>

        <a className="nav__brand" href="/" aria-label="Karam Motors home">
          <Logo className="nav__logo" alt="" />
          <span className="nav__words">
            <span className="nav__mark">Karam Motors</span>
            <span className="nav__city">Est. {FOUNDED} · Fourways</span>
          </span>
        </a>

        <div className="nav__actions">
          <a className="nav__icon" href={'mailto:' + SITE.email} aria-label={'Email ' + SITE.email}>
            <Mail className="nav__glyph" />
          </a>
          <a className="nav__call" href={SITE.phone.href}>
            <Phone className="nav__glyph" />
            <span className="nav__call-text">{SITE.phone.display}</span>
            <span className="sr-only">Call Karam Motors</span>
          </a>
        </div>
      </header>

      <div
        id="site-menu"
        className={'menu' + (open ? ' is-open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        // hidden from the tree entirely while closed so tab order stays sane
        {...(open ? {} : { inert: '' })}
      >
        <div className="menu__bar">
          <span className="eyebrow">Menu</span>
          <button
            className="nav__icon"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Close className="nav__glyph" />
          </button>
        </div>

        <nav className="menu__links" aria-label="Main">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={link.page === current ? 'page' : undefined}
              style={{ '--i': i }}
            >
              <span className="menu__no">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu__label">{link.label}</span>
            </a>
          ))}
        </nav>

        <footer className="menu__foot">
          <p className="eyebrow">{SITE.address.lines.slice(0, 2).join(', ')}</p>
          <a className="eyebrow" href={SITE.phone.href}>
            {SITE.phone.display}
          </a>
        </footer>
      </div>
    </>
  )
}
