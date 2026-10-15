/* Business details in one place - every section reads from here, so a new
   phone number or a change of hours is a one-line edit. */

export const FOUNDED = 1980

export const SITE = {
  name: 'Karam Motors',
  tagline: 'Quality pre-owned cars since 1980',
  address: {
    lines: ['Shop 0A, Gardens Shopping Centre', 'Uranium Road, Fourways', 'Johannesburg'],
    mapQuery: 'Gardens Shopping Centre, Uranium Road, Fourways, Johannesburg',
  },
  phone: { display: '011 792 9339', href: 'tel:+27117929339' },
  email: 'sales@karammotors.co.za',
  financeEmail: 'finance@karammotors.co.za',
  /* Leave empty until there is a WhatsApp business number - every WhatsApp
     button on the page hides itself while this is blank. Digits only, with
     the country code, e.g. '27821234567'. */
  whatsapp: '',
  instagram: 'https://www.instagram.com/karammotorscc/',
  hours: [
    { days: 'Monday – Friday', time: '08:00 – 17:00' },
    { days: 'Saturday', time: '09:00 – 12:00' },
    { days: 'Sunday & public holidays', time: 'Closed' },
  ],
}

export const FINANCE_PARTNERS = [
  'ABSA',
  'Marquis Finance',
  'MFC',
  'Standard Bank',
  'WesBank',
]

export const yearsInBusiness = () => new Date().getFullYear() - FOUNDED

export const mapsUrl = () =>
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(SITE.address.mapQuery)

export const mailto = (to, subject, body = '') =>
  'mailto:' +
  to +
  '?subject=' +
  encodeURIComponent(subject) +
  (body ? '&body=' + encodeURIComponent(body) : '')

export const whatsappUrl = (text) =>
  SITE.whatsapp
    ? 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(text)
    : null
