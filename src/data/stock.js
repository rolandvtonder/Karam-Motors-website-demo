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
    slug: 'xc60-2021',
    make: 'Volvo',
    model: 'XC60 D4 AWD',
    variant: 'Momentum',
    year: 2021,
    price: 319995,
    mileage: 143000,
    colour: 'Silver',
    fuel: 'Diesel · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('xc60-2021', 12),
  },
  {
    slug: 'c250-2015',
    make: 'Mercedes-Benz',
    model: 'C-Class C250 BlueTEC',
    variant: 'Exclusive',
    year: 2015,
    price: 259995,
    mileage: 186000,
    colour: 'Grey',
    fuel: 'Diesel',
    status: 'Available',
    tone: 'ok',
    images: photos('c250-2015'),
  },
  {
    slug: 'countryman-2017',
    make: 'MINI',
    model: 'Countryman Cooper S',
    variant: 'Auto',
    year: 2017,
    price: 229995,
    mileage: 130000,
    colour: 'Island Blue',
    fuel: 'Petrol · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('countryman-2017', 12),
  },
  {
    slug: 'pajero-2008',
    make: 'Mitsubishi',
    model: 'Pajero 3.2 Di-D GLS',
    variant: '5-door',
    year: 2008,
    price: 229995,
    mileage: 282500,
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
    mileage: 57000,
    colour: 'White',
    fuel: 'Petrol',
    status: 'Available',
    tone: 'ok',
    images: photos('i20-2021'),
  },
  {
    slug: 'a3-2016',
    make: 'Audi',
    model: 'A3 1.4 TFSI',
    variant: '3-door S auto',
    year: 2016,
    price: 159995,
    mileage: 149500,
    colour: 'Polar White',
    fuel: 'Petrol · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('a3-2016', 12),
  },
  {
    slug: 'swift-2019',
    make: 'Suzuki',
    model: 'Swift 1.2',
    variant: 'GA',
    year: 2019,
    price: 134995,
    mileage: 61000,
    colour: 'Silver',
    fuel: 'Petrol',
    status: 'Available',
    tone: 'ok',
    images: photos('swift-2019'),
  },
  {
    slug: 'a1-2013',
    make: 'Audi',
    model: 'A1 Sportback 1.4 TFSI',
    variant: 'Ambition',
    year: 2013,
    price: 129995,
    mileage: 174000,
    colour: 'White',
    fuel: 'Petrol · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('a1-2013', 10),
  },
  {
    slug: 'ranger-2012',
    make: 'Ford',
    model: 'Ranger 2.2 TDCi 4x4',
    variant: 'XL single cab',
    year: 2012,
    price: 129995,
    mileage: 256604,
    colour: 'White',
    fuel: 'Diesel · Manual',
    status: 'Available',
    tone: 'ok',
    images: photos('ranger-2012', 12),
  },
  {
    slug: 'i10-2017',
    make: 'Hyundai',
    model: 'i10 1.1',
    variant: 'Motion',
    year: 2017,
    price: 129995,
    mileage: 86000,
    colour: 'White',
    fuel: 'Petrol · Manual',
    status: 'Available',
    tone: 'ok',
    images: photos('i10-2017', 10),
  },
  {
    slug: 'hilux-1999',
    make: 'Toyota',
    model: 'Hilux 2700i 4x4 Raider',
    variant: 'Double cab',
    year: 1999,
    price: 119995,
    mileage: 376800,
    colour: 'White',
    fuel: 'Petrol · Manual',
    status: 'Available',
    tone: 'ok',
    images: photos('hilux-1999', 12),
  },
  {
    slug: 'almera-2014',
    make: 'Nissan',
    model: 'Almera',
    variant: '',
    year: 2014,
    price: 99995,
    mileage: 191000,
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
