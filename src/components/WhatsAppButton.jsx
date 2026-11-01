import { whatsappUrl } from '../data/site'
import { WhatsApp } from './icons.jsx'
import './WhatsAppButton.css'

/* One tap to Greg's WhatsApp from any page. It is an ordinary link, sits below
   the menu and loading screen in the stacking order, and hides itself if the
   number in site.js is ever blank. */
export default function WhatsAppButton() {
  const href = whatsappUrl('Hi Karam Motors, I found you on your website. ')
  if (!href) return null

  return (
    <a
      className="wa-button"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Karam Motors on WhatsApp"
    >
      <WhatsApp className="wa-button__icon" />
    </a>
  )
}
