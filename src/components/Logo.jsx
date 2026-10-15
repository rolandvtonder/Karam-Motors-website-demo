import './Logo.css'
import { url } from '../lib/url'

/* The supplied logo is a navy disc on an opaque near-black square
   (227 x 221). Rather than re-drawing it, the original file is shown through
   a circular window cut exactly to the disc, so it sits cleanly on any of the
   page's navies. Disc measured at x 30-217, y 11-197. */
export default function Logo({ className = '', alt = 'Karam Motors' }) {
  return (
    <span className={'logo ' + className} role="img" aria-label={alt}>
      <img src={url('/brand/logo.png')} alt="" aria-hidden="true" draggable="false" />
    </span>
  )
}
