import { useRef, useState } from 'react'
import { SITE, mailto } from '../data/site'
import { ArrowLong, Check } from './icons.jsx'
import './SellYourCar.css'
import { url } from '../lib/url'

/* The page inverts to paper here: a full-bleed photograph on the left, and the
   paper panel curving into it with a half-ellipse rather than a straight
   edge. The form has no server behind it yet, so a valid submission opens
   the visitor's email app with everything filled in, addressed to sales. */

const THIS_YEAR = new Date().getFullYear()

const FIELDS = {
  make: (v) => (v.trim() ? '' : 'Enter the make, e.g. Toyota.'),
  model: (v) => (v.trim() ? '' : 'Enter the model, e.g. Corolla 1.8 Prestige.'),
  year: (v) => {
    const n = Number(v)
    if (!v) return 'Enter the year it was first registered.'
    if (!Number.isInteger(n) || n < 1950 || n > THIS_YEAR + 1)
      return 'Enter a year between 1950 and ' + (THIS_YEAR + 1) + '.'
    return ''
  },
  mileage: (v) => {
    if (!v) return 'Enter the odometer reading in kilometres.'
    return /^\d[\d\s]*$/.test(v.trim()) ? '' : 'Use numbers only, e.g. 86500.'
  },
  condition: (v) => (v ? '' : 'Choose the closest description.'),
  name: (v) => (v.trim() ? '' : 'Enter your name so we know who to ask for.'),
  phone: (v) =>
    v.replace(/[^\d]/g, '').length >= 9
      ? ''
      : 'Enter a phone number we can reach you on, e.g. 082 123 4567.',
  email: (v) =>
    !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? ''
      : 'Check the email address - it should look like name@example.com.',
}

const CONDITIONS = ['Extra clean', 'Clean', 'Average', 'Below average', "I don't know"]

export default function SellYourCar() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const check = (name, value) => (FIELDS[name] ? FIELDS[name](value) : '')

  // validate on blur, not on every keystroke; clear as soon as it is fixed
  const onBlur = (e) => {
    const { name, value } = e.target
    if (!(name in FIELDS)) return
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }))
  }

  const onInput = (e) => {
    const { name, value } = e.target
    if (errors[name] && !check(name, value)) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(formRef.current))
    const next = {}
    Object.keys(FIELDS).forEach((name) => {
      const msg = check(name, data[name] || '')
      if (msg) next[name] = msg
    })
    setErrors(next)

    const firstBad = Object.keys(FIELDS).find((name) => next[name])
    if (firstBad) {
      formRef.current.elements[firstBad]?.focus()
      return
    }

    const body = [
      'Hi Karam Motors, I would like a valuation for my car.',
      '',
      'Make: ' + data.make,
      'Model: ' + data.model,
      'Year: ' + data.year,
      'Mileage: ' + data.mileage + ' km',
      'Condition: ' + data.condition,
      'Accident history: ' + (data.accident || 'Not answered'),
      data.notes ? 'Notes: ' + data.notes : '',
      '',
      'Name: ' + data.name,
      'Phone: ' + data.phone,
      data.email ? 'Email: ' + data.email : '',
      '',
      'I can send photos on reply.',
    ]
      .filter((line, i, all) => line || all[i - 1])
      .join('\n')

    window.location.href = mailto(
      SITE.email,
      'Valuation request: ' + data.year + ' ' + data.make + ' ' + data.model,
      body,
    )
    setSent(true)
  }

  const fieldProps = (name) => ({
    id: 'sell-' + name,
    name,
    onBlur,
    onInput,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? 'sell-' + name + '-error' : undefined,
  })

  const errorFor = (name) =>
    errors[name] ? (
      <p className="sell__error" id={'sell-' + name + '-error'}>
        {errors[name]}
      </p>
    ) : null

  return (
    <section className="sell" id="sell" aria-labelledby="sell-title">
      <div className="sell__media" data-reveal>
        <img
          src={url('/stock/c250-2015/04.jpg')}
          alt="A grey Mercedes-Benz C-Class in profile on the Karam Motors forecourt"
          loading="lazy"
          width="1280"
          height="926"
        />
      </div>

      <div className="sell__body">
        <div className="sell__inner">
          <p className="sell__eyebrow" data-reveal>
            We buy cars
          </p>
          <h1 className="sell__title" id="sell-title" data-reveal>
            Sell your car
          </h1>

          <blockquote className="sell__note" data-reveal style={{ '--i': 1 }}>
            <p>
              We&rsquo;ve been buying cars for over 40 years and we pay a fair
              price. Bring us a quote from any competitor and we&rsquo;ll match
              it or beat it. Tell us about your car and you&rsquo;ll have an
              estimated appraisal within 48 hours, with no obligation.
            </p>
          </blockquote>

          {sent ? (
            <div className="sell__done" role="status">
              <Check className="sell__done-icon" />
              <div>
                <h2>Your email is ready to send</h2>
                <p>
                  Your email app should have opened with your details filled in.
                  Press send and we&rsquo;ll reply within 48 hours. Add a few
                  photos to the email if you can. If it didn&rsquo;t open, email{' '}
                  <a href={'mailto:' + SITE.email}>{SITE.email}</a> or call{' '}
                  <a href={SITE.phone.href}>{SITE.phone.display}</a>.
                </p>
                <button className="sell__again" onClick={() => setSent(false)}>
                  Edit my details
                </button>
              </div>
            </div>
          ) : (
            <form
              className="sell__form"
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              data-reveal
              style={{ '--i': 2 }}
            >
              <fieldset>
                <legend>1 · Your car</legend>
                <div className="sell__grid">
                  <div className="sell__field">
                    <label htmlFor="sell-make">
                      Make <abbr title="required">*</abbr>
                    </label>
                    <input {...fieldProps('make')} autoComplete="off" required />
                    {errorFor('make')}
                  </div>
                  <div className="sell__field">
                    <label htmlFor="sell-model">
                      Model <abbr title="required">*</abbr>
                    </label>
                    <input {...fieldProps('model')} autoComplete="off" required />
                    {errorFor('model')}
                  </div>
                  <div className="sell__field">
                    <label htmlFor="sell-year">
                      Year <abbr title="required">*</abbr>
                    </label>
                    <input
                      {...fieldProps('year')}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder={String(THIS_YEAR - 6)}
                      required
                    />
                    {errorFor('year')}
                  </div>
                  <div className="sell__field">
                    <label htmlFor="sell-mileage">
                      Mileage (km) <abbr title="required">*</abbr>
                    </label>
                    <input
                      {...fieldProps('mileage')}
                      inputMode="numeric"
                      placeholder="86 500"
                      required
                    />
                    {errorFor('mileage')}
                  </div>
                  <div className="sell__field">
                    <label htmlFor="sell-condition">
                      Condition <abbr title="required">*</abbr>
                    </label>
                    <select {...fieldProps('condition')} defaultValue="" onChange={onBlur} required>
                      <option value="" disabled>
                        Choose…
                      </option>
                      {CONDITIONS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    {errorFor('condition')}
                  </div>
                  <fieldset className="sell__field sell__radios">
                    <legend>Ever been in an accident?</legend>
                    <div>
                      {['No', 'Yes', 'Not sure'].map((v) => (
                        <label key={v}>
                          <input type="radio" name="accident" value={v} />
                          <span>{v}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </fieldset>

              <fieldset>
                <legend>2 · Your details</legend>
                <div className="sell__grid">
                  <div className="sell__field">
                    <label htmlFor="sell-name">
                      Name <abbr title="required">*</abbr>
                    </label>
                    <input {...fieldProps('name')} autoComplete="name" required />
                    {errorFor('name')}
                  </div>
                  <div className="sell__field">
                    <label htmlFor="sell-phone">
                      Phone <abbr title="required">*</abbr>
                    </label>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      autoComplete="tel"
                      required
                    />
                    {errorFor('phone')}
                  </div>
                  <div className="sell__field sell__field--wide">
                    <label htmlFor="sell-email">
                      Email <span className="sell__optional">optional</span>
                    </label>
                    <input {...fieldProps('email')} type="email" autoComplete="email" />
                    {errorFor('email')}
                  </div>
                  <div className="sell__field sell__field--wide">
                    <label htmlFor="sell-notes">
                      Anything else? <span className="sell__optional">optional</span>
                    </label>
                    <textarea
                      id="sell-notes"
                      name="notes"
                      rows={3}
                      placeholder="Service history, extras, finance still owing…"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="sell__submit">
                <button className="ghost-btn sell__cta" type="submit">
                  <span>Get my valuation</span>
                  <ArrowLong className="ghost-btn__arrow" />
                </button>
                <p className="sell__fine">
                  No obligation. Opens your email app with these details,
                  addressed to {SITE.email}.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
