'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import property from '@/config/property.json'
import { OPEN_MENU_EVENT } from '@/lib/menu-events'

// Le voci con `parent` non compaiono nel menu: si raggiungono dalla pagina
// indice del ramo che le contiene (per esempio "La Documentazione"), così il
// menu resta a un livello solo.
const pages = property.navigation.filter((p) => p.enabled && !('parent' in p && p.parent))

export function Navigation() {
  const pathname = usePathname()
  // The menu is open only while we are still on the route it was opened from,
  // so any navigation closes it without an effect.
  const [openedFrom, setOpenedFrom] = useState<string | null>(null)
  const isOpen = openedFrom === pathname

  const openMenu = () => setOpenedFrom(pathname)
  const closeMenu = () => setOpenedFrom(null)

  // Altre parti della pagina (per esempio "SCOPRI ORA" in home) possono
  // chiedere l'apertura del menu con un evento.
  useEffect(() => {
    const handler = () => setOpenedFrom(pathname)
    window.addEventListener(OPEN_MENU_EVENT, handler)
    return () => window.removeEventListener(OPEN_MENU_EVENT, handler)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Top navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white shadow-sm flex items-center justify-end gap-2 px-4">
        {/* L'indicazione sta nel flusso accanto al pulsante, non sopra di esso:
            così non può sovrapporsi al menu a nessuna larghezza. Se lo schermo
            è troppo stretto per il testo intero, è il testo a farsi da parte —
            il pulsante non si sposta e non si restringe.
            Compare su tutte le pagine: la barra è l'unico modo di spostarsi
            dentro il sito, e il menu chiuso non somiglia granché a un menu. */}
        <p className="min-w-0 truncate select-none text-right text-[#CC1414] italic font-semibold text-[11px] sm:text-sm">
          Clicca sul menu di navigazione
        </p>
        <svg
          width="22"
          height="12"
          viewBox="0 0 22 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="flex-shrink-0"
        >
          <line x1="1" y1="6" x2="17" y2="6" stroke="#CC1414" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 1.5 L20.5 6 L15 10.5" stroke="#CC1414" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <button
          onClick={openMenu}
          aria-label="Apri menu di navigazione"
          className="flex flex-shrink-0 flex-col gap-1.5 p-2 cursor-pointer"
        >
          <span className="block w-6 h-0.5 bg-[#333333]" />
          <span className="block w-6 h-0.5 bg-[#333333]" />
          <span className="block w-6 h-0.5 bg-[#333333]" />
        </button>
      </header>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-out sidebar */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu di navigazione"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="font-bold text-[#CC1414] uppercase tracking-wide text-sm">
            Navigazione
          </span>
          <button
            onClick={closeMenu}
            aria-label="Chiudi menu"
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex-1 overflow-y-auto py-4">
          {pages.map((page) => {
            const isActive = pathname === page.href
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  onClick={closeMenu}
                  className={`flex items-center px-6 py-3 text-sm transition-colors hover:bg-red-50 hover:text-[#CC1414] ${
                    isActive
                      ? 'font-bold text-[#CC1414] bg-red-50'
                      : 'text-[#333333]'
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
