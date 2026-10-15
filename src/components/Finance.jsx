import { useId, useState } from 'react'
import { SITE, FINANCE_PARTNERS, mailto } from '../data/site'
import { STOCK, carName, formatRand } from '../data/stock'
import { ArrowLong, Check } from './icons.jsx'
import './Finance.css'

const DOCUMENTS = [
  'Certified copy of your driver’s licence',
  'Copy of your SA barcoded ID or smart ID card',
  'Proof of physical address, e.g. a municipal account',
  'Completed finance application form',
  'Most recent proof of income, e.g. a payslip',
  'Three months’ bank statements, stamped by the bank',
]

const STEPS = [
  { no: '01', name: 'Choose your car', meta: 'From the floor, or one we find for you' },
  { no: '02', name: 'Send your documents', meta: 'By email, or bring them in' },
  { no: '03', name: 'We submit to the banks', meta: 'Five lenders, one application' },
]

const TERMS = [12, 24, 36, 48, 54, 60, 72]

/* Instalment with an optional balloon: the balloon's present value is taken
   off the principal, the rest amortises monthly. */
function instalment(price, deposit, months, ratePct, balloonPct) {
  const principal = Math.max(0, price - deposit)
  const balloon = (price * balloonPct) / 100
  const r = ratePct / 100 / 12
  if (principal <= 0) return 0
  if (r === 0) return (principal - balloon) / months
  const pvBalloon = balloon / Math.pow(1 + r, months)
  return ((principal - pvBalloon) * r) / (1 - Math.pow(1 + r, -months))
}

function Slider({ label, value, min, max, step, onChange, format, hint }) {
  const id = useId()
  return (
    <div className="calc__row">
      <div className="calc__row-head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': ((value - min) / (max - min)) * 100 + '%' }}
        aria-valuetext={format(value)}
      />
      {hint ? <p className="calc__hint">{hint}</p> : null}
    </div>
  )
}

/* "Estimate finance" on a car links here as /finance/?car=<slug>, so the
   estimator opens on that car; otherwise it starts on the first in stock */
function initialCar() {
  const slug = new URLSearchParams(window.location.search).get('car')
  return STOCK.find((c) => c.slug === slug) || STOCK[0]
}

export default function Finance() {
  const [carSlug, setCarSlug] = useState(() => initialCar()?.slug || '')
  const [price, setPrice] = useState(() => initialCar()?.price || 200000)
  const [depositPct, setDepositPct] = useState(10)
  const [termIndex, setTermIndex] = useState(TERMS.indexOf(72))
  const [rate, setRate] = useState(12.5)
  const [balloonPct, setBalloonPct] = useState(0)

  const onCar = (slug) => {
    setCarSlug(slug)
    const car = STOCK.find((c) => c.slug === slug)
    if (car) setPrice(car.price)
  }

  const months = TERMS[termIndex]
  const deposit = Math.round((price * depositPct) / 100)
  const monthly = instalment(price, deposit, months, rate, balloonPct)
  const selected = STOCK.find((c) => c.slug === carSlug)

  const enquiry =
    'Hi Karam Motors, I would like to apply for finance' +
    (selected ? ' on the ' + carName(selected) : '') +
    '.\n\nVehicle price: ' +
    formatRand(price) +
    '\nDeposit: ' +
    formatRand(deposit) +
    '\nTerm: ' +
    months +
    ' months\nBalloon: ' +
    balloonPct +
    '%\n\nMy name and number:\n'

  return (
    <section className="finance" id="finance" aria-labelledby="finance-title">
      <div className="shell finance__grid">
        <div className="finance__copy">
          <p className="eyebrow" data-reveal>
            Vehicle finance
          </p>
          <h1 className="section-title finance__title" id="finance-title" data-reveal>
            Finance, made simple
          </h1>
          <p className="finance__lede" data-reveal style={{ '--i': 1 }}>
            We apply to {FINANCE_PARTNERS.length} of South Africa&rsquo;s major
            lenders for you, so one application gets several answers. Our team
            walks you through it from start to finish.
          </p>

          <ul className="finance__partners" aria-label="Lending partners" data-reveal style={{ '--i': 2 }}>
            {FINANCE_PARTNERS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <ol className="finance__steps" data-reveal style={{ '--i': 3 }}>
            {STEPS.map((s) => (
              <li key={s.no}>
                <span className="finance__step-no">{s.no}</span>
                <span className="finance__step-text">
                  <strong>{s.name}</strong>
                  <small>{s.meta}</small>
                </span>
              </li>
            ))}
          </ol>

          <div className="finance__docs" id="finance-docs" data-reveal style={{ '--i': 4 }}>
            <h2 className="finance__docs-title">What to bring</h2>
            <ul>
              {DOCUMENTS.map((d) => (
                <li key={d}>
                  <Check className="finance__check" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="calc" data-reveal style={{ '--i': 1 }}>
          <div className="calc__head">
            <p className="eyebrow">Repayment estimator</p>
            <div className="calc__car">
              <label htmlFor="calc-car">Car</label>
              <select id="calc-car" value={carSlug} onChange={(e) => onCar(e.target.value)}>
                {STOCK.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {carName(c)} · {formatRand(c.price)}
                  </option>
                ))}
                <option value="">Another amount</option>
              </select>
            </div>
          </div>

          <div className="calc__result" aria-live="polite">
            <span className="calc__result-label">Estimated monthly instalment</span>
            <span className="calc__result-value">
              {formatRand(monthly)}
              <small>/ month</small>
            </span>
            <span className="calc__result-meta">
              {formatRand(price - deposit)} financed over {months} months
              {balloonPct ? ' · ' + formatRand((price * balloonPct) / 100) + ' balloon' : ''}
            </span>
          </div>

          <div className="calc__rows">
            <Slider
              label="Vehicle price"
              value={price}
              min={30000}
              max={1000000}
              step={5000}
              onChange={(v) => {
                setPrice(v)
                setCarSlug('')
              }}
              format={formatRand}
            />
            <Slider
              label="Deposit"
              value={depositPct}
              min={0}
              max={50}
              step={1}
              onChange={setDepositPct}
              format={(v) => v + '% · ' + formatRand((price * v) / 100)}
            />
            <Slider
              label="Term"
              value={termIndex}
              min={0}
              max={TERMS.length - 1}
              step={1}
              onChange={setTermIndex}
              format={(i) => TERMS[i] + ' months'}
            />
            <Slider
              label="Interest rate"
              value={rate}
              min={8}
              max={22}
              step={0.25}
              onChange={setRate}
              format={(v) => v.toFixed(2) + '%'}
              hint="Your actual rate is set by the bank after a credit check."
            />
            <Slider
              label="Balloon payment"
              value={balloonPct}
              min={0}
              max={35}
              step={5}
              onChange={setBalloonPct}
              format={(v) => (v ? v + '%' : 'None')}
              hint="A lump sum at the end of the term, which lowers the instalment."
            />
          </div>

          <a
            className="solid-btn calc__cta"
            href={mailto(SITE.financeEmail, 'Finance application', enquiry)}
          >
            <span>Start an application</span>
            <ArrowLong className="solid-btn__arrow" />
          </a>
          <p className="calc__fine">
            An estimate only, not a quote. It excludes initiation and monthly
            service fees, insurance and licensing. Applications go to{' '}
            <a href={'mailto:' + SITE.financeEmail}>{SITE.financeEmail}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
