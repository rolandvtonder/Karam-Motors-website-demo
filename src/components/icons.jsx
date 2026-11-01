/* Inline SVG only - no icon dependency. Everything is drawn on a 24- or
   32-unit grid with hairline strokes so the set reads as one family. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function ArrowLong({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 12" {...base}>
      <path d="M0 6h45" />
      <path d="M39.5 1.5 45 6l-5.5 4.5" />
    </svg>
  )
}

export function Chevron({ className, dir = 'right' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.25}>
      <path d={dir === 'left' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'} />
    </svg>
  )
}

export function Menu({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  )
}

export function Close({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  )
}

export function Phone({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M6.6 3.5h2.6l1.5 4.1-2 1.3a10.6 10.6 0 0 0 6.4 6.4l1.3-2 4.1 1.5v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  )
}

export function Mail({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  )
}

export function Pin({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </svg>
  )
}

export function Clock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </svg>
  )
}

/* WhatsApp's own mark, so it is recognised at a glance - the one filled icon
   in the set, because the brand's shape does not survive as a hairline. */
export function WhatsApp({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export function Instagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" />
    </svg>
  )
}

export function Check({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base} strokeWidth={1.25}>
      <path d="m5 12.5 4.2 4L19 7" />
    </svg>
  )
}

/* --- hero + services ----------------------------------------------------- */

export function CarGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M3.5 15.5v-3l2.2-4.6A2 2 0 0 1 7.5 6.8h9a2 2 0 0 1 1.8 1.1l2.2 4.6v3" />
      <path d="M3.5 15.5h17v2h-17z" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
      <path d="M5.4 11.8h13.2" />
    </svg>
  )
}

export function SealCheck({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" {...base}>
      <circle cx="16" cy="16" r="11" />
      <path d="m11 16.2 3.4 3.3L21 12.8" />
    </svg>
  )
}

export function Steering({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" {...base}>
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="3" />
      <path d="M5.4 13.6c3.5 1 7.2 1.2 7.8 1.6M26.6 13.6c-3.5 1-7.2 1.2-7.8 1.6M16 19v8" />
    </svg>
  )
}

export function Tag({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" {...base}>
      <path d="M4.5 16.6V5.5h11.1L27 16.9 16.9 27Z" />
      <circle cx="10.5" cy="11.5" r="2" />
    </svg>
  )
}

export function Document({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" {...base}>
      <path d="M8 4.5h11l5 5v18H8z" />
      <path d="M19 4.5v5h5M12 15h8M12 19h8M12 23h5" />
    </svg>
  )
}

export function Delivery({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" {...base}>
      <path d="M3 9h13v12H3z" />
      <path d="M16 13h6l4 4.2V21h-10z" />
      <circle cx="9" cy="23" r="2.2" />
      <circle cx="22" cy="23" r="2.2" />
    </svg>
  )
}

export function Gauge({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M4.2 17.5a8.6 8.6 0 1 1 15.6 0" />
      <path d="m12 13 3.6-4.2" />
      <circle cx="12" cy="13" r="1.2" />
    </svg>
  )
}

export function Handshake({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M2.5 8.5 6 7l3 1 3-2 3.5 1.2 3-.7 2 .9" />
      <path d="M2.5 8.5v6l3 .5 4.2 3.6a1.4 1.4 0 0 0 2-.2l3.6-4.4 2.7-.4 2.5-1.6V7.9" />
      <path d="m12 6-3.4 3.1a1.3 1.3 0 0 0 1.7 2l2.1-1.4 4.2 3.6" />
    </svg>
  )
}
