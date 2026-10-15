import { useEffect, useRef, useState } from 'react'
import { SITE, mapsUrl, whatsappUrl } from '../data/site'
import { ArrowLong, Pin, Phone, Mail, Clock, Chat } from './icons.jsx'
import './Contact.css'

/* The map is a plain Google Maps embed (no API key). It is only attached once
   the section is near the viewport, so the third-party frame never competes
   with the hero for bandwidth. */
const EMBED =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(SITE.address.mapQuery) +
  '&z=15&output=embed'

export default function Contact() {
  const mapRef = useRef(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowMap(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const wa = whatsappUrl('Hi Karam Motors, ')

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="shell contact__grid">
        <div className="contact__info">
          <p className="eyebrow" data-reveal>
            Visit the showroom
          </p>
          <h1 className="section-title contact__title" id="contact-title" data-reveal>
            Come and see us
          </h1>
          <p className="contact__moved" data-reveal style={{ '--i': 1 }}>
            We&rsquo;ve moved. After more than four decades on Oxford Street in
            Randburg, you&rsquo;ll now find us at the Gardens Shopping Centre in
            Fourways.
          </p>

          <dl className="contact__list" data-reveal style={{ '--i': 2 }}>
            <div>
              <dt>
                <Pin className="contact__icon" />
                <span>Address</span>
              </dt>
              <dd>
                {SITE.address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt>
                <Phone className="contact__icon" />
                <span>Phone</span>
              </dt>
              <dd>
                <a href={SITE.phone.href}>{SITE.phone.display}</a>
              </dd>
            </div>
            <div>
              <dt>
                <Mail className="contact__icon" />
                <span>Email</span>
              </dt>
              <dd>
                <a href={'mailto:' + SITE.email}>{SITE.email}</a>
                <a href={'mailto:' + SITE.financeEmail}>{SITE.financeEmail}</a>
              </dd>
            </div>
            <div>
              <dt>
                <Clock className="contact__icon" />
                <span>Hours</span>
              </dt>
              <dd>
                <table className="contact__hours">
                  <tbody>
                    {SITE.hours.map((h) => (
                      <tr key={h.days}>
                        <th scope="row">{h.days}</th>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>

          <div className="contact__actions" data-reveal style={{ '--i': 3 }}>
            <a className="solid-btn" href={mapsUrl()} target="_blank" rel="noreferrer">
              <span>Get directions</span>
              <ArrowLong className="solid-btn__arrow" />
            </a>
            {wa ? (
              <a className="contact__alt" href={wa} target="_blank" rel="noreferrer">
                <Chat className="contact__icon" />
                <span>WhatsApp us</span>
              </a>
            ) : (
              <a className="contact__alt" href={SITE.phone.href}>
                <Phone className="contact__icon" />
                <span>Call {SITE.phone.display}</span>
              </a>
            )}
          </div>
        </div>

        <div className="contact__map" ref={mapRef} data-reveal style={{ '--i': 1 }}>
          {showMap ? (
            <iframe
              title="Map showing Karam Motors at the Gardens Shopping Centre, Fourways"
              src={EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
          <a className="contact__map-link" href={mapsUrl()} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
