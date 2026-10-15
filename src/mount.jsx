import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Each page's entry renders its own tree into #root. */
export function mount(element) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>{element}</StrictMode>,
  )
}
