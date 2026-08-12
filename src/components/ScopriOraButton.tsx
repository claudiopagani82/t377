'use client'

import { OPEN_MENU_EVENT } from '@/lib/menu-events'

// Apre il menu di navigazione invece di portare a una pagina: la home invita
// così a usare il menu, che resta l'unico punto di ingresso alle sezioni.
export function ScopriOraButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_MENU_EVENT))}
      className={className}
      style={{ fontFamily: 'var(--font-dancing-script), Dancing Script, cursive' }}
    >
      SCOPRI ORA
    </button>
  )
}
