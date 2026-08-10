import { PhotoLayout } from '@/components/PhotoLayout'
import { VideoYoutube } from '@/components/VideoYoutube'
import property from '@/config/property.json'

const p = property.deviVendere

// Chi visita questa casa spesso ne ha una da vendere prima di poterla comprare:
// è l'ostacolo più frequente fra l'interesse e la proposta. La pagina lo dice
// apertamente e offre la valutazione, invece di lasciare che il pensiero resti
// un dubbio non detto.
const mostraCta = Boolean(p.ctaUrl.trim() && p.ctaLabel.trim())

export default function DeviVenderePage() {
  return (
    <PhotoLayout>
      <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-5">
        <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {p.text.trim() && (
          <p className="text-[#333333] text-sm leading-relaxed whitespace-pre-line">{p.text}</p>
        )}

        {p.videoUrl.trim() && <VideoYoutube url={p.videoUrl} title={p.sectionTitle} />}

        {mostraCta && (
          <a
            href={p.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#CC1414] text-white font-semibold text-sm rounded-full px-5 py-3 hover:opacity-90 transition-opacity"
          >
            {p.ctaLabel}
          </a>
        )}
      </div>
    </PhotoLayout>
  )
}
