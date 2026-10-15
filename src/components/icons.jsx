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

export function Chat({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...base}>
      <path d="M4.5 19.5 5.6 16A7.8 7.8 0 1 1 8.4 18.6Z" />
      <path d="M9 10.5h6M9 13.5h4" />
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
