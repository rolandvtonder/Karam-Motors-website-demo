import { useEffect, useRef, useState } from 'react'
import { carName, formatRand, formatKm } from '../data/stock'
import { SITE, mailto, whatsappUrl } from '../data/site'
import { ArrowLong, Chevron, Close, Phone, Mail, Chat } from './icons.jsx'
import './CarDialog.css'
import { url } from '../lib/url'

/* Native <dialog>: focus trapping, Escape to close and the inert page behind
   it all come from the browser rather than from code here. */
export default function CarDialog({ car, onClose }) {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(car)

  // keep the last car mounted while the dialog closes, so it doesn't blank
  if (car && car !== shown) {
    setShown(car)
    setIndex(0)
  }

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (car && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    if (!car && dialog.open) dialog.close()
  }, [car])

  /* Every close path runs through here. The dialog's own 'close' event is
     queued rather than synchronous - and deferred entirely in a background
     tab - so the page scroll lock is released directly, not from the event. */
  const close = () => {
    const dialog = ref.current
    if (dialog?.open) dialog.close()
    document.documentElement.style.overflow = ''
    onClose()
  }

  // Escape fires 'cancel' synchronously; take it over so it uses close()
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onCancel = (e) => {
      e.preventDefault()
      document.documentElement.style.overflow = ''
      dialog.close()
      onClose()
    }
    // backstop for any close the browser does on its own
    const onDialogClose = () => {
      document.documentElement.style.overflow = ''
    }
    dialog.addEventListener('cancel', onCancel)
    dialog.addEventListener('close', onDialogClose)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      dialog.removeEventListener('close', onDialogClose)
    }
  }, [onClose])

  const c = shown
  const count = c ? c.images.length : 0
  const step = (d) => setIndex((i) => (i + d + count) % count)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  // click on the backdrop (the dialog element itself, outside the panel)
  const onClick = (e) => {
    if (e.target === ref.current) close()
  }

  const enquiry = c
    ? 'Hi Karam Motors, I am interested in the ' +
      carName(c) +
      ' (' +
      formatRand(c.price) +
      '). Is it still available?'
    : ''
  const wa = c ? whatsappUrl(enquiry) : null

  return (
    <dialog
      className="car-dialog"
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-labelledby="car-dialog-title"
    >
      {c ? (
        <div className="car-dialog__panel">
          <button
            className="car-dialog__close"
            onClick={close}
            aria-label="Close"
          >
            <Close />
          </button>

          <div className="car-dialog__gallery">
            <div className="car-dialog__stage">
              <img
                key={c.images[index]}
                src={c.images[index]}
                alt={carName(c) + ', photo ' + (index + 1) + ' of ' + count}
                width="1280"
                height="960"
              />
              <button
                className="car-dialog__nav car-dialog__nav--prev"
                onClick={() => step(-1)}
                aria-label="Previous photo"
              >
                <Chevron dir="left" />
              </button>
              <button
                className="car-dialog__nav car-dialog__nav--next"
                onClick={() => step(1)}
                aria-label="Next photo"
              >
                <Chevron />
              </button>
              <span className="car-dialog__counter" aria-hidden="true">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>

            <ul className="car-dialog__thumbs" aria-label="Photos">
              {c.images.map((src, i) => (
                <li key={src}>
                  <button
                    className={i === index ? 'is-active' : ''}
                    onClick={() => setIndex(i)}
                    aria-label={'Show photo ' + (i + 1)}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    <img src={src} alt="" loading="lazy" width="1280" height="960" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="car-dialog__info">
            <p className="eyebrow">{c.make}</p>
            <h2 className="car-dialog__title" id="car-dialog-title">
              {c.model}
              {c.variant ? <span> {c.variant}</span> : null}
            </h2>
            <p className="car-dialog__price">{formatRand(c.price)}</p>

            <dl className="car-dialog__specs">
              <div>
                <dt>Year</dt>
                <dd>{c.year}</dd>
              </div>
              <div>
                <dt>Mileage</dt>
                <dd>{formatKm(c.mileage)}</dd>
              </div>
              <div>
                <dt>Colour</dt>
                <dd>{c.colour}</dd>
              </div>
              <div>
                <dt>Fuel</dt>
                <dd>{c.fuel}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{c.status}</dd>
              </div>
            </dl>

            <p className="car-dialog__note">
              Tested, inspected and valeted. Full service and ownership history.
              Test drives are free. Book one by phone or email.
            </p>

            <div className="car-dialog__actions">
              <a
                className="solid-btn"
                href={mailto(SITE.email, 'Enquiry: ' + carName(c), enquiry)}
              >
                <span>Enquire by email</span>
                <Mail className="car-dialog__icon" />
              </a>
              <a className="car-dialog__alt" href={SITE.phone.href}>
                <Phone className="car-dialog__icon" />
                <span>Call {SITE.phone.display}</span>
              </a>
              {wa ? (
                <a className="car-dialog__alt" href={wa} target="_blank" rel="noreferrer">
                  <Chat className="car-dialog__icon" />
                  <span>WhatsApp us</span>
                </a>
              ) : null}
              <a className="car-dialog__alt" href={url('/finance/?car=' + c.slug)}>
                <ArrowLong className="car-dialog__icon car-dialog__icon--wide" />
                <span>Estimate finance</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
