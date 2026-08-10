import property from '@/config/property.json'

// Mostrata quando il minisito è scaduto o è stato spento a mano. È volutamente
// spoglia: non deve sembrare un errore del sito, ma una pagina che dice
// esattamente quello che è successo.
export const metadata = {
  title: 'Non disponibile',
  robots: { index: false, follow: false },
}

export default function NonDisponibilePage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 text-center gap-3">
      <p className="text-[#333333] text-base font-semibold">
        Questa presentazione non è più disponibile.
      </p>
      <p className="text-[#71717a] text-sm">
        Per informazioni sull&apos;immobile puoi scrivere a{' '}
        <a href={`mailto:${property.agencyEmail}`} className="underline hover:opacity-80">
          {property.agencyEmail}
        </a>{' '}
        o chiamare il{' '}
        <a href={`tel:${property.agencyPhone.replace(/\s/g, '')}`} className="underline hover:opacity-80">
          {property.agencyPhone}
        </a>
        .
      </p>
    </div>
  )
}
