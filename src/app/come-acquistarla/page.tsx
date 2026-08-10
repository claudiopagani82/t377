import Image from 'next/image'
import { PhotoLayout } from '@/components/PhotoLayout'
import { VideoYoutube } from '@/components/VideoYoutube'
import property from '@/config/property.json'

interface Voce {
  label: string
  enabled?: boolean
  text?: string
  videoUrl?: string
  documentUrl?: string | null
}

const p = property.comeAcquistarla

// I tre passi dell'acquisto — manifestare interesse, presentare la proposta,
// versare la caparra — erano una pagina di fotografie della bozza cartacea.
// Ogni passo ha ora tre modi di essere spiegato, tutti facoltativi: il testo,
// un video, il documento da scaricare. Un passo che non ne ha nessuno non
// compare: sarebbe un titolo seguito dal nulla.
const voci = (p.items as Voce[]).filter(
  (v) => v.enabled !== false && (v.text?.trim() || v.videoUrl?.trim() || v.documentUrl)
)

export default function ComeAcquistarlaPage() {
  return (
    <PhotoLayout>
      <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-6">
        <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {voci.length === 0 ? (
          <p className="text-sm text-[#71717a]">Nessun contenuto disponibile al momento.</p>
        ) : (
          voci.map((v) => (
            <section key={v.label} className="border-t border-[#e4e4e7] pt-5 first:border-0 first:pt-0 space-y-3">
              <h2 className="text-[#333333] font-bold text-sm uppercase tracking-wide">{v.label}</h2>

              {v.text?.trim() && (
                <p className="text-[#333333] text-sm leading-relaxed whitespace-pre-line">{v.text}</p>
              )}

              {v.videoUrl?.trim() && <VideoYoutube url={v.videoUrl} title={v.label} />}

              {v.documentUrl && (
                <a
                  href={v.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity"
                >
                  <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
                  <span className="text-[#333333] text-sm font-semibold underline">{v.label}</span>
                </a>
              )}
            </section>
          ))
        )}
      </div>
    </PhotoLayout>
  )
}
