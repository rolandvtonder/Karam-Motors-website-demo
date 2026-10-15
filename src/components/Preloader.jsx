import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { FOUNDED } from '../data/site'
import './Preloader.css'

/**
 * The stage needs decoded photos before it can be scrubbed, so the curtain
 * holds until the hero shots are in memory. It reports real progress rather
 * than a fake timer, and lifts a beat after 100% so the number is legible.
 */
export default function Preloader({ progress, ready, onDone, total }) {
  const [lifting, setLifting] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!ready) return
    const lift = setTimeout(() => {
      setLifting(true)
      onDone?.()
    }, 420)
    const remove = setTimeout(() => setGone(true), 1600)
    return () => {
      clearTimeout(lift)
      clearTimeout(remove)
    }
  }, [ready, onDone])

  if (gone) return null

  const pct = Math.round(progress * 100)

  return (
    <div
      className={'preloader' + (lifting ? ' is-lifting' : '')}
      role="status"
      aria-live="polite"
      aria-label={'Loading the showroom, ' + pct + ' percent'}
    >
      <div className="preloader__brand">
        <Logo className="preloader__logo" />
        <span className="preloader__mark">Karam Motors</span>
        <span className="preloader__city">Est. {FOUNDED} · Fourways</span>
      </div>

      <div className="preloader__meter" aria-hidden="true">
        <span className="preloader__count">{String(pct).padStart(3, '0')}</span>
        <span className="preloader__track">
          <span
            className="preloader__fill"
            style={{ transform: 'scaleX(' + progress.toFixed(4) + ')' }}
          />
        </span>
      </div>

      <p className="preloader__note eyebrow" aria-hidden="true">
        Opening the showroom · {total} photographs
      </p>
    </div>
  )
}
