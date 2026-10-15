import { useReveal } from './hooks/useReveal'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './styles/globals.css'

/* Every page shares the same chrome: skip link, fixed nav, footer, and the
   one page-wide reveal observer. `page` marks the current menu entry and
   scopes the per-page spacing rules in globals.css. */
export default function Layout({ page, revealDeps = [], before = null, children }) {
  useReveal(revealDeps)

  return (
    <>
      {before}

      <a className="sr-only skip-link" href="#main">
        Skip to content
      </a>

      <div id="top" />
      <Navbar current={page} solid={page === 'sell'} />

      <main id="main" className={'page page--' + page}>
        {children}
      </main>

      <Footer />
    </>
  )
}

