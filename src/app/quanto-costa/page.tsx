import Image from 'next/image'
import { PhotoLayout } from '@/components/PhotoLayout'
import property from '@/config/property.json'

interface Voce {
  label: string
  documentUrl: string | null
}

const p = property.quantoCosta

// Prima e seconda casa hanno imposte diverse, quindi due sezioni distinte
// invece di un prezzo solo. Ciascuna ospita il proprio prospetto, caricato dal
// pannello: finché non c'è, la sezione resta comunque visibile e lo dice — è
// un'informazione che il visitatore si aspetta di trovare qui, e vederla
// annunciata come "in arrivo" è più utile che non trovarla affatto.
const voci = p.voci as Voce[]

export default function QuantoCostaPage() {
  return (
    <PhotoLayout>
      <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-6">
        <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {voci.map((v) => (
          <section key={v.label} className="border-t border-[#e4e4e7] pt-5 first:border-0 first:pt-0">
            <h2 className="text-[#333333] font-bold text-sm uppercase tracking-wide mb-3">
              {v.label}
            </h2>

            {v.documentUrl ? (
              <a
                href={v.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:opacity-80 transition-opacity"
              >
                <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
                <span className="text-[#333333] text-sm font-semibold underline">
                  Scarica il prospetto dei costi
                </span>
              </a>
            ) : (
              <p className="text-sm text-[#71717a]">Prospetto non ancora disponibile.</p>
            )}
          </section>
        ))}
      </div>
    </PhotoLayout>
  )
}
