import { Steering, Tag, Document, Delivery } from './icons.jsx'
import './Assurances.css'

const ITEMS = [
  {
    Icon: Steering,
    label: 'Free test drives',
    copy: ['Any car on the floor,', 'at a time that suits you'],
  },
  {
    Icon: Tag,
    label: 'Free trade-in valuation',
    copy: ['Fair value for your', 'current car'],
  },
  {
    Icon: Document,
    label: 'Roadworthy & licensing',
    copy: ['Certification, licence', 'and registration done'],
  },
  {
    Icon: Delivery,
    label: 'Free delivery',
    copy: ['To your door,', 'by arrangement'],
  },
]

export default function Assurances() {
  return (
    <section className="assurances" id="services" aria-label="Included with every car">
      <div className="shell">
        <ul className="assurances__row">
          {ITEMS.map(({ Icon, label, copy }, i) => (
            <li key={label} data-reveal style={{ '--i': i }}>
              <Icon className="assurances__icon" />
              <h3 className="assurances__label">{label}</h3>
              <p className="assurances__copy">
                {copy[0]}
                <br />
                {copy[1]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
