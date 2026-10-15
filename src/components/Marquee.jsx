import { FOUNDED, FINANCE_PARTNERS } from '../data/site'
import './Marquee.css'

const WORDS = [
  'Est. ' + FOUNDED,
  'Family owned',
  'Free trade-in valuation',
  'Finance through ' + FINANCE_PARTNERS.join(' · '),
  'Roadworthy certified',
  'Fourways · Johannesburg',
]

/* A quiet transition strip between the pinned rail and the page proper, so
   the scroll does not slam from full-bleed photography straight into a form. */
export default function Marquee() {
  const run = [...WORDS, ...WORDS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <span className="marquee__run" key={copy}>
            {run.map((word, i) => (
              <span className="marquee__word" key={copy + '-' + i}>
                {word}
                <i />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
