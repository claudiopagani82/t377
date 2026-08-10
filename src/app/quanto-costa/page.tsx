import Image from 'next/image'
import { PhotoLayout } from '@/components/PhotoLayout'
import property from '@/config/property.json'

interface Voce {
  label: string
  text: string
  documentUrl: string | null
}

const p = property.quantoCosta

// Prima e seconda casa hanno imposte diverse, quindi due voci distinte invece di
// un prezzo solo. Una voce compare se ha un importo o un prospetto allegato:
// finché non si sa nulla è meglio non mostrarla che mostrarla vuota.
const voci = (p.voci as Voce[]).filter((v) => v.text.trim() || v.documentUrl)

export default function QuantoCostaPage() {
  return (
    <PhotoLayout>
      <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-4">
        <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {voci.length === 0 ? (
          <p className="text-sm text-[#71717a]">Informazioni non ancora disponibili.</p>
        ) : (
          <dl className="space-y-4">
            {voci.map((v) => (
              <div key={v.label} className="border-b border-[#f0f0f0] pb-4 last:border-0 last:pb-0">
                <dt className="text-[#CC1414] font-bold text-sm uppercase tracking-wide mb-1">
                  {v.label}
                </dt>
                {v.text && (
                  <dd className="text-[#333333] text-sm leading-relaxed whitespace-pre-line">{v.text}</dd>
                )}
                {v.documentUrl && (
                  <dd className="mt-2">
                    <a
                      href={v.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 hover:opacity-80 transition-opacity"
                    >
                      <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
                      <span className="text-[#333333] text-sm font-semibold underline">
                        Scarica il prospetto dettagliato
                      </span>
                    </a>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        )}
      </div>
    </PhotoLayout>
  )
}
