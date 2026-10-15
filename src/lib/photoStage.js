/* ===========================================================================
   The photo stage - what the frame sequence becomes when the footage is a set
   of stills from the lot rather than a rendered film.

   Scroll position maps to a continuous shot position `s`. Every shot runs a
   slow push-in and drift (a Ken Burns move) over its own stretch of scroll,
   and the last 30% of each stretch cross-fades into the next shot, which has
   already started moving - so there is never a frame where nothing is in
   motion, and never a hard cut.

   The stock photos are bright midday shots on a light forecourt. Drawn as-is
   they would punch a white hole in a navy page, so every frame is graded on
   the canvas: desaturated, pulled down, and multiplied into the brand blue.
   ======================================================================== */

export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)
export const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const lerp = (a, b, t) => a + (b - a) * t

const FADE = 0.3 // share of each shot spent cross-fading into the next
const LEAD = 0.3 // how early a shot starts moving, so it arrives in motion

/* Canvas filters are the cheap path to a grade - but only cheap once. Run
   per frame on a 2x canvas they cost ~38ms a draw (measured, 2880x1800), so
   each photo is graded a single time into an offscreen canvas at its native
   size and that copy is what gets drawn. Where filters are missing the
   multiply pass below still carries most of the look. */
const graded = new WeakMap()

function gradedCopy(img, filter) {
  if (!filter) return img
  let byFilter = graded.get(img)
  if (!byFilter) {
    byFilter = new Map()
    graded.set(img, byFilter)
  }
  let copy = byFilter.get(filter)
  if (copy) return copy
  copy = document.createElement('canvas')
  copy.width = img.naturalWidth || img.width
  copy.height = img.naturalHeight || img.height
  const cctx = copy.getContext('2d')
  if (typeof cctx.filter === 'string') cctx.filter = filter
  cctx.drawImage(img, 0, 0)
  byFilter.set(filter, copy)
  return copy
}

/** Ken Burns progress for shot `k` at position `s`. */
const moveAt = (s, k) => clamp((s - k + LEAD) / (1 + LEAD), 0, 1)

function drawPhoto(ctx, img, shot, t, cw, ch, grade) {
  const portrait = cw / ch < 0.9
  const zoom = lerp(shot.zoom[0], shot.zoom[1], easeInOut(t))
  const fx = lerp(shot.x[0], shot.x[1], t)

  let scale
  let y
  if (portrait) {
    /* A 4:3 forecourt shot cover-fitted to a phone shows a door handle. Size
       it to the width instead, hold it in the upper part of the screen, and
       let the ground below carry the type. */
    scale = Math.max((cw * 1.32) / img.width, (ch * 0.56) / img.height) * zoom
    y = ch * 0.1 - (img.height * scale - ch * 0.56) * 0.35
  } else {
    scale = Math.max(cw / img.width, ch / img.height) * zoom
    y = (ch - img.height * scale) * shot.y
  }
  const w = img.width * scale
  const h = img.height * scale
  const x = (cw - w) * fx

  ctx.drawImage(gradedCopy(img, grade.filter), x, y, w, h)

  if (portrait) {
    // feather the photo's bottom edge into the ground
    const top = y + h * 0.55
    const g = ctx.createLinearGradient(0, top, 0, y + h)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, grade.ground)
    ctx.fillStyle = g
    ctx.fillRect(0, top, cw, y + h - top + 1)
  }
}

/** Nearest decoded photo, so a scroll past an unloaded shot is never black. */
function nearest(images, index) {
  for (let d = 1; d < images.length; d += 1) {
    if (images[index - d]) return images[index - d]
    if (images[index + d]) return images[index + d]
  }
  return null
}

/**
 * Draw the stage at shot position `s` (0 … shots.length - 1).
 * `images` is the decoded array from usePhotoSequence, aligned with `shots`.
 */
export function drawStage(ctx, images, shots, s, grade) {
  const cw = ctx.canvas.width
  const ch = ctx.canvas.height
  const last = shots.length - 1
  const i = clamp(Math.floor(s), 0, last)
  const u = s - i

  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
  ctx.fillStyle = grade.ground
  ctx.fillRect(0, 0, cw, ch)

  const current = images[i] || nearest(images, i)
  if (current) drawPhoto(ctx, current, shots[i], moveAt(s, i), cw, ch, grade)

  if (i < last && u > 1 - FADE) {
    const next = images[i + 1]
    if (next) {
      ctx.globalAlpha = easeInOut((u - (1 - FADE)) / FADE)
      drawPhoto(ctx, next, shots[i + 1], moveAt(s, i + 1), cw, ch, grade)
      ctx.globalAlpha = 1
    }
  }

  // tint everything into the brand blue
  ctx.globalCompositeOperation = 'multiply'
  ctx.fillStyle = grade.tint
  ctx.fillRect(0, 0, cw, ch)

  // vignette - pulls the eye to the car and darkens the corners the HUD uses
  ctx.globalCompositeOperation = 'source-over'
  const r = Math.hypot(cw, ch) / 2
  const v = ctx.createRadialGradient(cw / 2, ch * 0.45, r * 0.35, cw / 2, ch / 2, r)
  v.addColorStop(0, 'rgba(0,0,0,0)')
  v.addColorStop(1, grade.vignette)
  ctx.fillStyle = v
  ctx.fillRect(0, 0, cw, ch)
}

/* The source photos are 1280px wide, so backing pixels past ~1920 add fill
   cost without adding detail - cap the density rather than matching the
   screen's DPR. */
const MAX_BACKING_WIDTH = 1920

/** Size a canvas to its box, density capped. Returns true if it changed. */
export function sizeCanvas(canvas) {
  const dpr = Math.min(
    window.devicePixelRatio || 1,
    1.5,
    MAX_BACKING_WIDTH / Math.max(1, canvas.clientWidth),
  )
  const w = Math.round(canvas.clientWidth * Math.max(1, dpr))
  const h = Math.round(canvas.clientHeight * Math.max(1, dpr))
  if (canvas.width === w && canvas.height === h) return false
  canvas.width = w
  canvas.height = h
  return true
}

/* Shot helper: alternate drift direction so consecutive shots don't all slide
   the same way, which reads as a conveyor belt rather than a camera. */
export const shot = (src, k, opts = {}) => ({
  src,
  zoom: opts.zoom || [1.02, 1.12],
  x: opts.x || (k % 2 ? [0.62, 0.42] : [0.4, 0.58]),
  y: opts.y ?? 0.55,
  label: opts.label || '',
})
