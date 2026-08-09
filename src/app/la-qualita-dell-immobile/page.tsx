import Image from 'next/image'
import { PhotoLayout } from '@/components/PhotoLayout'
import property from '@/config/property.json'

interface Voce {
  label: string
  text: string
}

const p = property.qualitaImmobile
const car = property.caratteristichePrincipali

// Le dieci voci sono fisse, ma non tutte valgono per ogni immobile: un
// appartamento in condominio non ha un tetto proprio, uno non ristrutturato non
// ha ristrutturazioni. Una voce senza testo non compare, invece di lasciare
// un'etichetta seguita dal nulla.
const voci = (p.voci as Voce[]).filter((v) => v.text.trim())

// I due blocchi restano governati da interruttori distinti, come le due metà di
// "Scopri la Casa": si può pubblicare la qualità e tenere spente le
// caratteristiche, o viceversa. Nel pannello sono due sezioni separate.
const mostraQualita = p.enabled && voci.length > 0
const mostraCaratteristiche = car.enabled

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-4">{children}</div>
  )
}

function VoceElenco({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
      <span className="text-[#333333] text-sm leading-relaxed">{children}</span>
    </li>
  )
}

export default function QualitaImmobilePage() {
  return (
    <PhotoLayout>
      <div className="w-full space-y-6">
        {!mostraQualita && !mostraCaratteristiche && (
          <Card>
            <p className="text-sm text-[#71717a]">Informazioni non ancora disponibili.</p>
          </Card>
        )}

        {mostraQualita && (
          <Card>
            <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
              {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
              {p.sectionTitle}
            </h1>

            <dl className="space-y-4">
              {voci.map((v) => (
                <div key={v.label} className="border-b border-[#f0f0f0] pb-4 last:border-0 last:pb-0">
                  <dt className="text-[#CC1414] font-bold text-sm uppercase tracking-wide mb-1">
                    {v.label}
                  </dt>
                  <dd className="text-[#333333] text-sm leading-relaxed">{v.text}</dd>
                </div>
              ))}
            </dl>
          </Card>
        )}

        {mostraCaratteristiche && (
          <Card>
            <h2 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
              {car.sectionTitle}
            </h2>

            <ul className="space-y-3">
              {car.features.map((feature, index) => (
                <VoceElenco key={index}>
                  {'label' in feature && feature.label ? (
                    <><strong>{feature.label}:</strong> {feature.text}</>
                  ) : (
                    feature.text
                  )}
                </VoceElenco>
              ))}
            </ul>

            {car.condominioItems.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-[#CC1414] font-bold uppercase text-base mb-3">
                  {car.condominioTitle}
                </h3>
                <ul className="space-y-3">
                  {car.condominioItems.map((item, index) => (
                    <VoceElenco key={index}>{item}</VoceElenco>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}
      </div>
    </PhotoLayout>
  )
}
