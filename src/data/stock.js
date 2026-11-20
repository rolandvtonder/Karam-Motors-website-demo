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
    slug: 'ranger-xlt-2021',
    make: 'Ford',
    model: 'Ranger 2.0 SiT Hi-Rider',
    variant: 'XLT double cab',
    year: 2021,
    price: 299995,
    mileage: 164000,
    colour: 'Sea Grey',
    fuel: 'Diesel · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('ranger-xlt-2021', 10),
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
    slug: 'cla-2015',
    make: 'Mercedes-Benz',
    model: 'CLA 220d',
    variant: 'AMG Line',
    year: 2015,
    price: 229995,
    mileage: 140000,
    colour: 'Iridium Silver',
    fuel: 'Diesel · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('cla-2015', 12),
  },
  {
    slug: 'a3sb-2019',
    make: 'Audi',
    model: 'A3 Sportback 1.4 TFSI',
    variant: 'S tronic',
    year: 2019,
    price: 229900,
    mileage: 144000,
    colour: 'Blue',
    fuel: 'Petrol · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('a3sb-2019', 12),
  },
  {
    slug: 'golf-2013',
    make: 'Volkswagen',
    model: 'Golf 7 TSI',
    variant: 'DSG',
    year: 2013,
    price: 189900,
    mileage: 98000,
    colour: 'White',
    fuel: 'Petrol · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('golf-2013', 12),
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
    slug: 'aclass-2012',
    make: 'Mercedes-Benz',
    model: 'A-Class A200',
    variant: 'Elegance auto',
    year: 2012,
    price: 94995,
    mileage: 198000,
    colour: 'Silver',
    fuel: 'Petrol · Automatic',
    status: 'Available',
    tone: 'ok',
    images: photos('aclass-2012', 12),
  },
  {
    slug: 'bclass-2007',
    make: 'Mercedes-Benz',
    model: 'B-Class B200 Turbo',
    variant: '',
    year: 2007,
    price: 49995,
    mileage: 305000,
    colour: 'Black',
    fuel: 'Petrol · Manual',
    status: 'Available',
    tone: 'ok',
    images: photos('bclass-2007', 12),
  },
]

export const carName = (car) => car.year + ' ' + car.make + ' ' + car.model

/* R259 995 - en-ZA groups with a non-breaking space, which keeps the price on
   one line inside narrow cards */
export const formatRand = (n) =>
  'R' + Math.round(n).toLocaleString('en-ZA', { maximumFractionDigits: 0 })

export const formatKm = (n) =>
  n == null ? 'On request' : n.toLocaleString('en-ZA') + ' km'
