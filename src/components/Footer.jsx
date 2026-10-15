import Logo from './Logo.jsx'
import { Instagram } from './icons.jsx'
import { SITE, FOUNDED } from '../data/site'
import './Footer.css'

const YEAR = new Date().getFullYear()

const COLUMNS = [
  {
    title: 'Buy',
    links: [
      { label: 'Current stock', href: '/stock/' },
      { label: 'Finance', href: '/finance/' },
      { label: 'What’s included', href: '/#services' },
    ],
  },
  {
    title: 'Sell',
    links: [
      { label: 'Sell your car', href: '/sell/' },
      { label: 'Finance documents', href: '/finance/#finance-docs' },
    ],
  },
  {
    title: 'Karam Motors',
    links: [
      { label: 'Our story', href: '/story/' },
      { label: 'Visit us', href: '/contact/' },
      { label: 'Instagram', href: SITE.instagram, external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand" data-reveal>
            <div className="footer__lockup">
              <Logo className="footer__logo" alt="" />
              <div>
                <span className="footer__mark">Karam Motors</span>
                <span className="footer__city">Est. {FOUNDED} · Fourways</span>
              </div>
            </div>
            <p className="footer__blurb">
              A family-owned dealership buying and selling quality pre-owned
              cars since {FOUNDED}.
            </p>
            <a
              className="footer__social"
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Karam Motors on Instagram"
            >
              <Instagram className="footer__social-icon" />
              <span aria-hidden="true">@karammotorscc</span>
            </a>
          </div>

          <nav className="footer__cols" aria-label="Footer">
            {COLUMNS.map((col, i) => (
              <div key={col.title} data-reveal style={{ '--i': i + 1 }}>
                <h3 className="eyebrow">{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__legal">
          <p>
            © {YEAR} Karam Motors ·{' '}
            {SITE.address.lines.slice(0, 2).join(', ')}
          </p>
          <p>
            <a href={SITE.phone.href}>{SITE.phone.display}</a> ·{' '}
            <a href={'mailto:' + SITE.email}>{SITE.email}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
