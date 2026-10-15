import { url } from '../lib/url'

/* ===========================================================================
   CURRENT STOCK - the editable list.

   To add a car: drop its photos in /public/stock/<slug>/ as 01.jpg, 02.jpg …
   (01 is the cover shot), then copy an entry below and change the details.
   To sell one: change `status` to 'Sold' and `tone` to 'mute', or delete it.

   tone: 'ok' green · 'warn' amber · 'mute' grey
   mileage: kilometres as a number, or null to show "On request"
   ======================================================================== */

const photos = (slug, count = 8) =>
  Array.from(
    { length: count },
    (_, i) =>
      url('/stock/' + slug + '/' + String(i + 1).padStart(2, '0') + '.jpg'),
  )

export const STOCK = [
  {
    slug: 'c250-2015',
    make: 'Mercedes-Benz',
    model: 'C-Class C250 BlueTEC',
    variant: 'Exclusive',
    year: 2015,
    price: 259995,
    mileage: null,
    colour: 'Grey',
    fuel: 'Diesel',
    status: 'Available',
    tone: 'ok',
    images: photos('c250-2015'),
  },
  {
    slug: 'pajero-2008',
    make: 'Mitsubishi',
    model: 'Pajero 3.2 Di-D GLS',
    variant: '5-door',
    year: 2008,
    price: 229995,
    mileage: null,
    colour: 'White',
    fuel: 'Diesel · 3.2L turbo, 121 kW',
    status: 'Available',
    tone: 'ok',
    images: photos('pajero-2008'),
  },
  {
    slug: 'i20-2021',
    make: 'Hyundai',
    model: 'i20 1.2',
    variant: 'Motion',
    year: 2021,
    price: 209995,
    mileage: null,
    colour: 'White',
    fuel: 'Petrol',
    status: 'Available',
    tone: 'ok',
    images: photos('i20-2021'),
  },
  {
    slug: 'swift-2019',
    make: 'Suzuki',
    model: 'Swift 1.2',
    variant: 'GA',
    year: 2019,
    price: 134995,
    mileage: null,
    colour: 'Silver',
    fuel: 'Petrol',
    status: 'Available',
    tone: 'ok',
    images: photos('swift-2019'),
  },
  {
    slug: 'almera-2014',
    make: 'Nissan',
    model: 'Almera',
    variant: '',
    year: 2014,
    price: 99995,
    mileage: null,
    colour: 'White',
    fuel: 'Petrol',
    status: 'Available',
    tone: 'ok',
    images: photos('almera-2014'),
  },
]

export const carName = (car) => car.year + ' ' + car.make + ' ' + car.model

/* R259 995 - en-ZA groups with a non-breaking space, which keeps the price on
   one line inside narrow cards */
export const formatRand = (n) =>
  'R' + Math.round(n).toLocaleString('en-ZA', { maximumFractionDigits: 0 })

export const formatKm = (n) =>
  n == null ? 'On request' : n.toLocaleString('en-ZA') + ' km'
