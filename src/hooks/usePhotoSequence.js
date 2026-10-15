import { useEffect, useRef, useState } from 'react'

/**
 * Loads a list of photographs into decoded <img> elements so a canvas can
 * scrub through them at scroll speed - the photo counterpart of a frame
 * sequence.
 *
 * Requests go through a small pool in list order, so the opening shots are
 * ready first and the stage is usable while the tail is still arriving. A
 * photo that fails resolves to null rather than rejecting, so one missing file
 * cannot stall the preloader.
 */

const POOL_SIZE = 6

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      // decode off the main thread before the first scroll needs it - but
      // browsers defer decode() in background tabs, and a loaded image is
      // drawable regardless, so never wait on it for more than a moment
      if (!img.decode) return resolve(img)
      const done = () => resolve(img)
      img.decode().then(done, done)
      setTimeout(done, 800)
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export function usePhotoSequence(urls, { enabled = true } = {}) {
  const imagesRef = useRef(new Array(urls.length).fill(null))
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    let settled = 0
    let cursor = 0

    const worker = async () => {
      while (!cancelled && cursor < urls.length) {
        const index = cursor
        cursor += 1
        const img = await loadImage(urls[index])
        if (cancelled) return
        imagesRef.current[index] = img
        settled += 1
        setProgress(settled / urls.length)
      }
    }

    Promise.all(Array.from({ length: POOL_SIZE }, worker)).then(() => {
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [urls, enabled])

  return { imagesRef, progress, ready }
}
