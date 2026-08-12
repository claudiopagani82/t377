import Image from 'next/image'
import { DomusTuaLogo } from '@/components/DomusTuaLogo'
import property from '@/config/property.json'

interface PhotoLayoutProps {
  children: React.ReactNode
  logoSize?: number
  backgroundImage?: string
}

// La foto di sfondo è quella dell'immobile, copiata nel sito dalla copertina
// dell'annuncio ufficiale al momento della creazione. Finché non c'è, le pagine
// restano sul fondo chiaro: uno sfondo mancante non deve lasciare un riquadro
// rotto in mezzo alla brochure.
const SFONDO = property.fotoPrincipale

export function PhotoLayout({ children, logoSize = 100, backgroundImage = SFONDO }: PhotoLayoutProps) {
  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-start overflow-hidden bg-[#f4f4f5]">
      {/* Background property photo */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
      )}
      {/* White wash overlay */}
      <div className="absolute inset-0 bg-white/45" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-8">
        <DomusTuaLogo size={logoSize} className="mb-6" />
        {children}
      </div>
    </div>
  )
}
