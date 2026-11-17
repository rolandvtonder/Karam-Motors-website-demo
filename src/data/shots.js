import { shot } from '../lib/photoStage'
import { url } from '../lib/url'

/* ===========================================================================
   Shot lists for the two scroll-scrubbed photo stages.

   Each chapter of the hero is SHOTS_PER_CHAPTER photos of one car, ordered as
   a walk-around. Swap a car by changing the paths and the label - the stage
   picks up the count automatically, but keep it a multiple of
   SHOTS_PER_CHAPTER or a chapter ends mid-car.
   ======================================================================== */

export const SHOTS_PER_CHAPTER = 4

const walk = (slug, label, nums, start) =>
  nums.map((n, i) =>
    shot(url('/stock/' + slug + '/' + n + '.jpg'), start + i, { label }),
  )

export const HERO_SHOTS = [
  ...walk('xc60-2021', '2021 Volvo XC60', ['01', '02', '04', '05'], 0),
  ...walk('cla-2015', '2015 Mercedes-Benz CLA 220d', ['01', '02', '04', '06'], 4),
  ...walk('ranger-xlt-2021', '2021 Ford Ranger XLT', ['01', '05', '02', '07'], 8),
  ...walk('countryman-2017', '2017 MINI Countryman', ['01', '03'], 12),
  ...walk('a1-2013', '2013 Audi A1', ['01', '03'], 14),
]

/* the story stage near the foot of the page: a slower, wider drift */
export const STORY_SHOTS = [
  shot(url('/stock/a1-2013/07.jpg'), 0, { zoom: [1.0, 1.08] }),
  shot(url('/stock/xc60-2021/04.jpg'), 1, { zoom: [1.0, 1.08] }),
  shot(url('/stock/countryman-2017/02.jpg'), 2, { zoom: [1.0, 1.08] }),
  shot(url('/stock/a3-2016/03.jpg'), 3, { zoom: [1.0, 1.08] }),
  shot(url('/stock/hilux-1999/03.jpg'), 4, { zoom: [1.0, 1.08] }),
  shot(url('/stock/ranger-xlt-2021/06.jpg'), 5, { zoom: [1.0, 1.08] }),
]

export const HERO_URLS = HERO_SHOTS.map((s) => s.src)
export const STORY_URLS = STORY_SHOTS.map((s) => s.src)

/* grades: the hero sits in the brand navy; the story stage is a touch warmer
   and darker, so the page's last chapter reads as evening rather than noon */
export const HERO_GRADE = {
  filter: 'saturate(0.62) brightness(0.74) contrast(1.06)',
  tint: '#8fa6b8',
  vignette: 'rgba(5, 13, 19, 0.82)',
  ground: '#050d13',
}

export const STORY_GRADE = {
  filter: 'saturate(0.45) brightness(0.6) contrast(1.08) sepia(0.12)',
  tint: '#9aa7b0',
  vignette: 'rgba(5, 10, 14, 0.9)',
  ground: '#050a0e',
}
