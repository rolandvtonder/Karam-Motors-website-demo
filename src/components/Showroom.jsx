import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { STOCK, carName, formatRand, formatKm } from '../data/stock'
import { SITE, mailto } from '../data/site'
import CarDialog from './CarDialog.jsx'
import { ArrowLong } from './icons.jsx'
import './Showroom.css'

/* Vertical scroll through this section drives the rail right-to-left, with
   the watermark and the cards moving at different rates so it reads as depth
   rather than one sliding plane. The travel is sized to the stock count, so a
   lot of five does not leave the visitor scrolling through empty rail. */
const PIN_VH = Math.min(320, 140 + STOCK.length * 30)
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

export default function Showroom() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const washRef = useRef(null)
  const barRef = useRef(null)
  const cardRefs = useRef([])
  const [openCar, setOpenCar] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!section || !track || !viewport) return

    // below 900px, and whenever motion is reduced, the row becomes an ordinary
    // swipeable scroller instead of a pinned rail
    const narrow = window.matchMedia('(max-width: 900px)')
    let raf = 0
    let lastX = null

    const isStatic = () => narrow.matches || reduced

    const clearTransforms = () => {
      track.style.transform = ''
      if (washRef.current) washRef.current.style.transform = ''
      cardRefs.current.forEach((el) => {
        if (el) el.style.transform = ''
      })
      lastX = null
    }

    const render = () => {
      raf = requestAnimationFrame(render)

      if (isStatic()) {
        if (lastX !== null) clearTransforms()
        return
      }

      const travel = section.offsetHeight - window.innerHeight
      const scrolled = clamp(-section.getBoundingClientRect().top, 0, travel)
      const p = travel > 0 ? scrolled / travel : 0

      // how far the rail has to slide for the last card to reach the edge
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      const x = -p * distance
      if (x !== lastX) {
        track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)'
        if (washRef.current) {
          washRef.current.style.transform =
            'translate3d(' + (x * 0.28).toFixed(2) + 'px,0,0)'
        }
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          const lag = (i % 3) * 18 * (1 - p)
          el.style.transform = 'translate3d(0,' + lag.toFixed(2) + 'px,0)'
        })
        if (barRef.current) {
          barRef.current.style.transform = 'scaleX(' + p.toFixed(4) + ')'
        }
        lastX = x
      }
    }

    const onChange = () => clearTransforms()
    narrow.addEventListener('change', onChange)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      narrow.removeEventListener('change', onChange)
    }
  }, [reduced])

  const setCard = (i) => (el) => {
    cardRefs.current[i] = el
  }

  return (
    <section
      className="showroom"
      id="stock"
      ref={sectionRef}
      style={{ height: PIN_VH + 'vh' }}
      data-static={reduced ? '' : undefined}
      aria-labelledby="stock-title"
    >
      <div className="showroom__pin">
        <span className="showroom__wash" ref={washRef} aria-hidden="true">
          Showroom
        </span>

        <div className="shell showroom__head">
          <div>
            <p className="eyebrow">Current stock · {STOCK.length} cars</p>
            <h1 className="section-title" id="stock-title">
              On the floor
            </h1>
          </div>
          <a className="showroom__all" href={SITE.phone.href}>
            <span>Call {SITE.phone.display}</span>
            <ArrowLong className="showroom__all-arrow" />
          </a>
        </div>

        <div className="showroom__viewport" ref={viewportRef}>
          <ul className="showroom__track" ref={trackRef}>
            {STOCK.map((car, i) => (
              <li className="c-card" key={car.slug} ref={setCard(i)}>
                <div className="c-card__plate">
                  <img
                    src={car.images[0]}
                    alt={carName(car)}
                    loading="lazy"
                    width="1280"
                    height="960"
                  />
                  <span className="c-card__count" aria-hidden="true">
                    {car.images.length} photos
                  </span>
                </div>

                <div className="c-card__body">
                  <p className="c-card__make">{car.make}</p>
                  <h2 className="c-card__model">
                    {car.model}
                    {car.variant ? <span> {car.variant}</span> : null}
                  </h2>
                  <ul className="c-card__specs" aria-label="Key details">
                    <li>{car.year}</li>
                    <li>{car.colour}</li>
                    <li>
                      {car.mileage == null
                        ? 'Mileage on request'
                        : formatKm(car.mileage)}
                    </li>
                  </ul>
                  <p className="c-card__price">{formatRand(car.price)}</p>
                </div>

                <div className="c-card__foot">
                  <span className={'c-card__status is-' + car.tone}>
                    <i aria-hidden="true" />
                    {car.status}
                  </span>
                  {/* the button's ::after stretches over the whole card, so
                      the card is one click target with one accessible name */}
                  <button
                    className="c-card__go"
                    onClick={() => setOpenCar(car)}
                    aria-haspopup="dialog"
                  >
                    <span className="sr-only">View {carName(car)}</span>
                    <ArrowLong className="c-card__go-arrow" />
                  </button>
                </div>
              </li>
            ))}

            <li className="c-card c-card--ask" ref={setCard(STOCK.length)}>
              <p className="eyebrow">Not on the floor?</p>
              <h2 className="c-card__ask-title">
                Tell us what you&rsquo;re after. We&rsquo;ll find it.
              </h2>
              <p className="c-card__ask-copy">
                Stock moves quickly. Give us the make, model and budget and
                we&rsquo;ll call you when the right car comes in.
              </p>
              <a
                className="ghost-btn c-card__ask-cta"
                href={mailto(
                  SITE.email,
                  'Car search request',
                  'Hi Karam Motors,\n\nI am looking for:\nMake / model:\nYear range:\nBudget:\n\nMy name and number:\n',
                )}
              >
                <span>Send a request</span>
                <ArrowLong className="ghost-btn__arrow" />
              </a>
            </li>
          </ul>
        </div>

        <div className="shell">
          <div className="showroom__progress" aria-hidden="true">
            <span ref={barRef} />
          </div>
        </div>
      </div>

      <CarDialog car={openCar} onClose={() => setOpenCar(null)} />
    </section>
  )
}
