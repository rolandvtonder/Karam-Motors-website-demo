import { useEffect, useRef } from 'react'
import {
  HERO_SHOTS,
  HERO_GRADE,
  SHOTS_PER_CHAPTER,
} from '../data/shots'
import { FOUNDED, FINANCE_PARTNERS, yearsInBusiness } from '../data/site'
import { STOCK } from '../data/stock'
import { clamp, easeOut, drawStage, sizeCanvas } from '../lib/photoStage'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ArrowLong, CarGlyph, Gauge, SealCheck } from './icons.jsx'
import './ScrollStage.css'
import { url } from '../lib/url'

const SHOTS = HERO_SHOTS.length
const CHAPTERS = SHOTS / SHOTS_PER_CHAPTER // 4
/* scroll distance per chapter. Four shots per chapter puts each photo on
   ~46vh of travel - long enough that the push-in reads as a camera move, short
   enough that the cross-fades keep arriving. The sticky stage's height is
   derived from this, so change it here and nowhere else. */
const CHAPTER_VH = 185

const STATS = [
  { to: yearsInBusiness(), unit: '', label: 'Years in the trade' },
  { to: 2, unit: '', label: 'Generations of Karams' },
  { to: FINANCE_PARTNERS.length, unit: '', label: 'Finance partners' },
  { to: 48, unit: 'h', label: 'Trade-in appraisal' },
]

export default function ScrollStage({ imagesRef, started }) {
  const reduced = usePrefersReducedMotion()

  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const chapterRefs = useRef([])
  const labelRef = useRef(null)
  const progressBarRef = useRef(null)
  const countUpRefs = useRef([])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    let raf = 0
    let lastPos = -1
    let lastShot = -1
    let lastChapter = -1
    let needsRedraw = true

    /* --- the single scroll loop ------------------------------------------- */
    const render = () => {
      raf = requestAnimationFrame(render)

      const travel = stage.offsetHeight - window.innerHeight
      const scrolled = clamp(-stage.getBoundingClientRect().top, 0, travel)
      const p = travel > 0 ? scrolled / travel : 0

      // continuous shot position; quantised so a still page costs nothing
      const pos = Math.round(p * (SHOTS - 1) * 400) / 400
      if (pos !== lastPos || needsRedraw) {
        drawStage(ctx, imagesRef.current, HERO_SHOTS, pos, HERO_GRADE)
        lastPos = pos
        needsRedraw = false
      }

      // chapter visibility, written straight to the node so React stays out
      // of the scroll path entirely
      const scaled = p * CHAPTERS
      const active = Math.min(CHAPTERS - 1, Math.floor(scaled))

      chapterRefs.current.forEach((el, i) => {
        if (!el) return
        const lp = clamp(scaled - i, 0, 1)
        // chapter 01 is fully present at rest: it is the hero on first paint
        const fadeIn = i === 0 ? 1 : clamp(lp / 0.18, 0, 1)
        // the last chapter holds to the end instead of fading to nothing
        const fadeOut = i === CHAPTERS - 1 ? 1 : clamp((1 - lp) / 0.2, 0, 1)
        const opacity = Math.min(fadeIn, fadeOut)
        el.style.opacity = opacity.toFixed(3)
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
        if (!reduced) {
          const rise = (1 - easeOut(fadeIn)) * 40 - (1 - easeOut(fadeOut)) * 40
          el.style.transform = 'translate3d(0,' + rise.toFixed(2) + 'px,0)'
        }
      })

      // chapter 04's counters tick up as it arrives
      const ch4 = clamp(scaled - 3, 0, 1)
      countUpRefs.current.forEach((el) => {
        if (!el) return
        const target = Number(el.dataset.to)
        const value = Math.round(target * easeOut(clamp(ch4 / 0.5, 0, 1)))
        const next = String(value)
        if (el.textContent !== next) el.textContent = next
      })

      /* HUD */
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = 'scaleX(' + p.toFixed(4) + ')'
      }
      if (active !== lastChapter) {
        lastChapter = active
        stage.dataset.chapter = String(active + 1)
      }
      const shotIndex = Math.min(SHOTS - 1, Math.round(pos))
      if (shotIndex !== lastShot) {
        lastShot = shotIndex
        if (labelRef.current) {
          labelRef.current.textContent = HERO_SHOTS[shotIndex].label
        }
      }
    }

    const onResize = () => {
      sizeCanvas(canvas)
      needsRedraw = true
    }

    // observe the canvas itself: window resize misses layout-only changes
    // (scrollbars appearing, the mobile URL bar settling)
    const ro = new ResizeObserver(onResize)
    sizeCanvas(canvas)
    ro.observe(canvas)
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [imagesRef, reduced])

  // nudge a redraw once the curtain lifts, in case the loop ran before the
  // first photos finished decoding
  useEffect(() => {
    if (started) window.dispatchEvent(new Event('resize'))
  }, [started])

  const setChapter = (i) => (el) => {
    chapterRefs.current[i] = el
  }

  return (
    <section
      className="stage"
      ref={stageRef}
      data-chapter="1"
      style={{ height: CHAPTERS * CHAPTER_VH + 'vh' }}
      aria-label="Welcome to Karam Motors"
    >
      <div className="stage__pin">
        <canvas className="stage__canvas" ref={canvasRef} aria-hidden="true" />

        <div className="stage__progress" aria-hidden="true">
          <span ref={progressBarRef} />
        </div>

        {/* ------------------------------ 01 - HERO ------------------------ */}
        <article className="chapter chapter--hero" ref={setChapter(0)}>
          <div className="chapter__inner">
            <p className="hero__eyebrow">
              <i className="hero__eyebrow-rule" aria-hidden="true" />
              <CarGlyph className="hero__eyebrow-glyph" />
              <span>Karam Motors · Fourways</span>
            </p>

            <h1 className="hero__title">
              <span>Family owned</span>
              <span>since {FOUNDED}.</span>
            </h1>

            <p className="hero__lede">
              We&rsquo;ve been buying and selling cars for over 40 years. Come
              and meet the team, and let us help you find the car you&rsquo;re
              looking for.
            </p>

            <ul className="hero__features">
              <li>
                <Gauge className="hero__feature-icon" />
                <div>
                  <h2>Cars of all sizes</h2>
                  <p>Cars under R100K, student cars, family cars, 4x4s and bakkies.</p>
                </div>
              </li>
              <li>
                <SealCheck className="hero__feature-icon" />
                <div>
                  <h2>Finance arranged</h2>
                  <p>Approved with all five major South African banks.</p>
                </div>
              </li>
            </ul>

            <div className="hero__actions">
              <a className="solid-btn hero__cta" href={url('/stock/')}>
                <span>View {STOCK.length} cars in stock</span>
                <ArrowLong className="solid-btn__arrow" />
              </a>
              <a className="hero__link" href={url('/sell/')}>
                <span>Sell your car</span>
                <ArrowLong className="hero__link-arrow" />
              </a>
            </div>
          </div>
        </article>

        {/* ---------------------------- 02 - INSPECTED --------------------- */}
        <article className="chapter chapter--seal" ref={setChapter(1)}>
          <div className="chapter__inner">
            <p className="eyebrow">What we offer</p>
            <h2 className="chapter__title">
              <span>Quality cars,</span>
              <span>great service.</span>
            </h2>
            <p className="chapter__body">
              A good selection of popular pre-owned cars and a knowledgeable,
              experienced sales team. Tell us what you&rsquo;re looking for and
              we&rsquo;ll help you find it.
            </p>
            <ul className="spec-chips">
              <li>Under R100K</li>
              <li>Family cars</li>
              <li>4x4s &amp; bakkies</li>
            </ul>
          </div>
        </article>

        {/* ---------------------------- 03 - SERVICE ----------------------- */}
        <article className="chapter chapter--layers" ref={setChapter(2)}>
          <div className="chapter__inner">
            <p className="eyebrow">Our services</p>
            <h2 className="chapter__title">
              <span>Here to help.</span>
            </h2>
            <ol className="layer-list">
              <li>
                <span className="layer-list__no">01</span>
                <span className="layer-list__name">Car finance</span>
                <span className="layer-list__meta">Stress-free application</span>
              </li>
              <li>
                <span className="layer-list__no">02</span>
                <span className="layer-list__name">Trade-ins</span>
                <span className="layer-list__meta">Fair value for your car</span>
              </li>
              <li>
                <span className="layer-list__no">03</span>
                <span className="layer-list__name">Licence &amp; registration</span>
                <span className="layer-list__meta">For all our customers</span>
              </li>
              <li>
                <span className="layer-list__no">04</span>
                <span className="layer-list__name">Extended warranties</span>
                <span className="layer-list__meta">Ask our sales team</span>
              </li>
            </ol>
          </div>
        </article>

        {/* ---------------------------- 04 - FIGURES ----------------------- */}
        <article className="chapter chapter--calibre" ref={setChapter(3)}>
          <div className="chapter__inner">
            <div className="calibre__head">
              <p className="eyebrow">In figures</p>
              <h2 className="chapter__title">
                <span>A name you can trust.</span>
              </h2>
            </div>
            <dl className="calibre__stats">
              {STATS.map((stat, i) => (
                <div className="calibre__stat" key={stat.label}>
                  <dt>
                    <span
                      ref={(el) => {
                        countUpRefs.current[i] = el
                      }}
                      data-to={stat.to}
                    >
                      0
                    </span>
                    {stat.unit ? <em>{stat.unit}</em> : null}
                    <span className="sr-only">{stat.to}</span>
                  </dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        {/* ------------------------------- HUD ----------------------------- */}
        <div className="readout" aria-hidden="true">
          <span className="readout__sep" />
          <span className="readout__label" ref={labelRef}>
            {HERO_SHOTS[0].label}
          </span>
        </div>
      </div>
    </section>
  )
}
