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
  ...walk('c250-2015', '2015 Mercedes-Benz C250', ['01', '08', '02', '06'], 0),
  ...walk('pajero-2008', '2008 Mitsubishi Pajero', ['01', '05', '08', '02'], 4),
  ...walk('i20-2021', '2021 Hyundai i20', ['01', '03', '08', '05'], 8),
  ...walk('swift-2019', '2019 Suzuki Swift', ['08', '01'], 12),
  ...walk('almera-2014', '2014 Nissan Almera', ['03', '01'], 14),
]

/* the story stage near the foot of the page: a slower, wider drift */
export const STORY_SHOTS = [
  shot(url('/stock/almera-2014/07.jpg'), 0, { zoom: [1.0, 1.08] }),
  shot(url('/stock/c250-2015/05.jpg'), 1, { zoom: [1.0, 1.08] }),
  shot(url('/stock/pajero-2008/04.jpg'), 2, { zoom: [1.0, 1.08] }),
  shot(url('/stock/i20-2021/06.jpg'), 3, { zoom: [1.0, 1.08] }),
  shot(url('/stock/swift-2019/05.jpg'), 4, { zoom: [1.0, 1.08] }),
  shot(url('/stock/almera-2014/05.jpg'), 5, { zoom: [1.0, 1.08] }),
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
