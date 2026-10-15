import { useEffect, useRef, useState } from 'react'
import { STORY_SHOTS, STORY_URLS, STORY_GRADE } from '../data/shots'
import { FOUNDED } from '../data/site'
import { usePhotoSequence } from '../hooks/usePhotoSequence'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { clamp, easeOut, drawStage, sizeCanvas } from '../lib/photoStage'
import { ArrowLong } from './icons.jsx'
import './StoryStage.css'
import { url } from '../lib/url'

const CHAPTERS = 2
/* Shorter than the hero per chapter: this is a slow, wide drift, so a long
   rail would read as nothing happening. */
const CHAPTER_VH = 160
const SHOTS = STORY_SHOTS.length

const TIMELINE = [
  {
    no: String(FOUNDED),
    name: 'Lenny Karam opens the doors',
    meta: 'Oxford Street, Randburg',
  },
  {
    no: 'Then',
    name: 'Greg takes the keys',
    meta: 'From salesman to principal dealer',
  },
  {
    no: 'Today',
    name: 'A new home in Fourways',
    meta: 'With Samantha, Richard and Michael',
  },
]

export default function StoryStage() {
  const reduced = usePrefersReducedMotion()
  const [armed, setArmed] = useState(false)
  const { imagesRef } = usePhotoSequence(STORY_URLS, { enabled: armed })

  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const chapterRefs = useRef([])
  const barRef = useRef(null)

  /* Don't pull these photos on first paint - start once the section is
     within roughly a viewport and a half of the fold. */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || armed) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: '150% 0px' },
    )
    io.observe(stage)
    return () => io.disconnect()
  }, [armed])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    let raf = 0
    let lastPos = -1
    let loaded = 0
    let needsRedraw = true

    const render = () => {
      raf = requestAnimationFrame(render)

      const rect = stage.getBoundingClientRect()
      // nothing to do while the section is off screen
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const travel = stage.offsetHeight - window.innerHeight
      const scrolled = clamp(-rect.top, 0, travel)
      const p = travel > 0 ? scrolled / travel : 0

      // redraw as photos arrive, not only when the scroll moves
      const nowLoaded = imagesRef.current.filter(Boolean).length
      if (nowLoaded !== loaded) {
        loaded = nowLoaded
        needsRedraw = true
      }

      const pos = Math.round(p * (SHOTS - 1) * 400) / 400
      if (pos !== lastPos || needsRedraw) {
        drawStage(ctx, imagesRef.current, STORY_SHOTS, pos, STORY_GRADE)
        lastPos = pos
        needsRedraw = false
      }

      const scaled = p * CHAPTERS
      chapterRefs.current.forEach((el, i) => {
        if (!el) return
        const lp = clamp(scaled - i, 0, 1)
        // chapter 01 is already up when the section arrives, and the last
        // holds until the section scrolls away
        const fadeIn = i === 0 ? 1 : clamp(lp / 0.22, 0, 1)
        const fadeOut = i === CHAPTERS - 1 ? 1 : clamp((1 - lp) / 0.22, 0, 1)
        const opacity = Math.min(fadeIn, fadeOut)
        el.style.opacity = opacity.toFixed(3)
        el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
        if (!reduced) {
          const rise = (1 - easeOut(fadeIn)) * 34 - (1 - easeOut(fadeOut)) * 34
          el.style.transform = 'translate3d(0,' + rise.toFixed(2) + 'px,0)'
        }
      })

      if (barRef.current) {
        barRef.current.style.transform = 'scaleX(' + p.toFixed(4) + ')'
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

  const setChapter = (i) => (el) => {
    chapterRefs.current[i] = el
  }

  return (
    <section
      className="story"
      id="story"
      ref={stageRef}
      style={{ height: CHAPTERS * CHAPTER_VH + 'vh' }}
      aria-label="Our story"
    >
      <div className="story__pin">
        <canvas className="story__canvas" ref={canvasRef} aria-hidden="true" />

        {/* ----------------------------- 01 - CREED ---------------------- */}
        <article className="s-chapter s-chapter--creed" ref={setChapter(0)}>
          <div className="s-chapter__inner">
            <p className="eyebrow">Since {FOUNDED}</p>
            <h1 className="story__title">
              <span>Two generations.</span>
              <span>One family name</span>
              <span>on the door.</span>
            </h1>
            <a className="ghost-btn story__cta" href={url('/contact/')}>
              <span>Visit us in Fourways</span>
              <ArrowLong className="ghost-btn__arrow" />
            </a>
          </div>
        </article>

        {/* ----------------------------- 02 - TIMELINE ------------------- */}
        <article className="s-chapter s-chapter--line" ref={setChapter(1)}>
          <div className="s-chapter__inner">
            <p className="eyebrow">Our story</p>
            <h2 className="story__title story__title--sm">
              <span>From Oxford Street</span>
              <span>to Fourways.</span>
            </h2>
            <ol className="timeline">
              {TIMELINE.map((step) => (
                <li key={step.no}>
                  <span className="timeline__no">{step.no}</span>
                  <span className="timeline__text">
                    <strong>{step.name}</strong>
                    <small>{step.meta}</small>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </article>

        <div className="story__progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  )
}
