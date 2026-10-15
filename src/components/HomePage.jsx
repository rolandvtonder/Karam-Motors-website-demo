import { useCallback, useEffect, useState } from 'react'
import { usePhotoSequence } from '../hooks/usePhotoSequence'
import { HERO_URLS } from '../data/shots'
import Layout from '../Layout.jsx'
import Preloader from './Preloader.jsx'
import ScrollStage from './ScrollStage.jsx'
import Marquee from './Marquee.jsx'
import Assurances from './Assurances.jsx'
import PageLinks from './PageLinks.jsx'

export default function HomePage() {
  const { imagesRef, progress, ready } = usePhotoSequence(HERO_URLS)
  const [started, setStarted] = useState(false)

  // Scrolling the stage before the photos exist just shows a blank canvas, so
  // the page is held still until the curtain lifts.
  useEffect(() => {
    if (started) return
    const { scrollBehavior } = document.documentElement.style
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = scrollBehavior
    }
  }, [started])

  const onDone = useCallback(() => setStarted(true), [])

  return (
    <Layout
      page="home"
      revealDeps={[started]}
      before={
        <Preloader
          progress={progress}
          ready={ready}
          onDone={onDone}
          total={HERO_URLS.length}
        />
      }
    >
      <ScrollStage imagesRef={imagesRef} started={started} />
      <Marquee />
      <Assurances />
      <PageLinks />
    </Layout>
  )
}
