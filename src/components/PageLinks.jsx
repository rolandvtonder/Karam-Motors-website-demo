import { STOCK } from '../data/stock'
import { ArrowLong } from './icons.jsx'
import './PageLinks.css'
import { url } from '../lib/url'

/* With every section on its own page, the home page ends on a row of
   portrait cards into the rest of the site - the same photographic card the
   showroom uses, held back behind a scrim so the label reads first. */
const CARDS = [
  {
    href: url('/stock/'),
    label: 'Current stock',
    note: STOCK.length + ' cars on the floor',
    image: url('/stock/c250-2015/01.jpg'),
  },
  {
    href: url('/sell/'),
    label: 'Sell your car',
    note: 'Appraisal within 48 hours',
    image: url('/stock/pajero-2008/01.jpg'),
  },
  {
    href: url('/finance/'),
    label: 'Finance',
    note: 'Five lenders, one application',
    image: url('/stock/i20-2021/03.jpg'),
  },
  {
    href: url('/story/'),
    label: 'Our story',
    note: 'Two generations since 1980',
    image: url('/stock/almera-2014/07.jpg'),
  },
]

export default function PageLinks() {
  return (
    <section className="links" aria-labelledby="links-title">
      <div className="shell">
        <header className="links__head" data-reveal>
          <p className="eyebrow">Explore</p>
          <h2 className="section-title" id="links-title">
            How can we help?
          </h2>
        </header>

        <ul className="links__grid">
          {CARDS.map((card, i) => (
            <li key={card.href} data-reveal style={{ '--i': i }}>
              <a className="l-card" href={card.href}>
                <img src={card.image} alt="" loading="lazy" width="1280" height="960" />
                <span className="l-card__text">
                  <span className="l-card__label">{card.label}</span>
                  <span className="l-card__note">{card.note}</span>
                  <ArrowLong className="l-card__arrow" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
