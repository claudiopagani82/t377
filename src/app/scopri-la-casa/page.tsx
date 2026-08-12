import Image from 'next/image'
import { School, ShoppingCart, Pill, ParkingCircle, TrainFront, type LucideIcon } from 'lucide-react'
import { PhotoLayout } from '@/components/PhotoLayout'
import property from '@/config/property.json'

// "Scopri la Casa" riunisce in una sola pagina i due modi di avvicinarsi
// all'immobile: dove parcheggiare quando ci si arriva, e cosa c'è intorno una
// volta lì. Erano due pagine separate: chi le apriva una dopo l'altra vedeva
// due mappe della stessa zona senza capire perché fossero divise.

interface Parcheggio {
  markerNumber: number
  label: string
  distanceText: string
  durationText: string
}

interface Servizio {
  markerNumber: number
  category: string
  label: string
  distanceText: string
  durationText: string
}

const p = property.scopriLaCasa
const parcheggio = property.doveParcheggiare
const dintorni = property.doveSiamo

const parcheggi = parcheggio.parcheggi as Parcheggio[]
const servizi = dintorni.servizi as Servizio[]

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  scuola: School,
  supermercato: ShoppingCart,
  farmacia: Pill,
  parcheggio: ParkingCircle,
  stazione: TrainFront,
}

// Come nelle sezioni 2, 3, 4 e 5: la foto dell'immobile sotto un velo bianco e i
// contenuti dentro riquadri chiari. La 1 era rimasta l'ultima pagina bianca.
function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white/85 rounded-xl shadow-md p-6 w-full">{children}</div>
}

function Sottotitolo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[#CC1414] font-bold text-base uppercase tracking-wide mb-3">
      {children}
    </h2>
  )
}

function Mappa({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#e4e4e7] mb-4">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )
}

export default function ScopriLaCasaPage() {
  // Ogni blocco resta governato dal proprio interruttore: si può tenere la
  // mappa dei dintorni e spegnere quella dei parcheggi, o viceversa.
  const mostraParcheggio = parcheggio.enabled
  const mostraDintorni = dintorni.enabled

  // La frase di benvenuto la compila il pannello leggendo l'annuncio
  // ufficiale — tipologia dell'immobile e indirizzo — e resta modificabile a
  // mano. Se è vuota non compare: meglio nessuna frase che una a metà.
  const intro = p.intro
  const mostraIntro = intro.enabled && intro.text.trim().length > 0

  return (
    <PhotoLayout>
      <div className="w-full space-y-6">
        <h1 className="text-center text-[#CC1414] font-bold text-xl uppercase tracking-wide drop-shadow-sm">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {mostraIntro && (
          <Card>
            <p className="text-center text-[#333333] text-sm leading-relaxed">{intro.text}</p>
          </Card>
        )}

        {!mostraParcheggio && !mostraDintorni && (
          <Card>
            <p className="text-sm text-[#71717a]">Informazioni non ancora disponibili.</p>
          </Card>
        )}

        {mostraParcheggio && (
          <Card>
            <Sottotitolo>{parcheggio.heading}</Sottotitolo>

            <div className="text-[#333333] text-sm leading-relaxed space-y-3 mb-4">
              {parcheggio.leftText && <p>{parcheggio.leftText}</p>}
              {parcheggio.rightText && <p>{parcheggio.rightText}</p>}
            </div>

            {parcheggio.mapImage && (
              <Mappa src={parcheggio.mapImage} alt="Mappa dei parcheggi vicini" />
            )}

            {parcheggi.length > 0 && (
              <ul className="space-y-2 mb-4">
                {parcheggi.map((v) => (
                  <li key={v.markerNumber} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a73e8] text-white text-xs font-bold flex items-center justify-center">
                      {v.markerNumber}
                    </span>
                    <span className="flex-1 min-w-0 text-sm">
                      <span className="font-semibold">{v.label}</span>
                      <span className="text-[#71717a]"> — {v.distanceText} a piedi, {v.durationText}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {parcheggio.footer && (
              <p className="font-bold text-center text-[#333333] text-sm">{parcheggio.footer}</p>
            )}
          </Card>
        )}

        {mostraDintorni && (
          <Card>
            <Sottotitolo>{dintorni.heading}</Sottotitolo>

            {dintorni.showAddress && dintorni.address && (
              <p className="text-sm text-[#333333] font-semibold mb-4">{dintorni.address}</p>
            )}

            {dintorni.mapImage && (
              <Mappa src={dintorni.mapImage} alt={`Mappa dei dintorni di ${dintorni.address}`} />
            )}

            {servizi.length > 0 && (
              <ul className="space-y-3">
                {servizi.map((s) => {
                  const Icon = CATEGORY_ICONS[s.category] ?? School
                  return (
                    // Dentro il riquadro chiaro il fondo bianco delle righe
                    // sparirebbe: qui basta il bordo a separarle.
                    <li
                      key={s.markerNumber}
                      className="flex items-center gap-3 rounded-xl border border-[#e4e4e7] px-4 py-3"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#CC1414] text-white text-xs font-bold flex items-center justify-center">
                        {s.markerNumber}
                      </span>
                      <Icon className="w-5 h-5 text-[#CC1414] flex-shrink-0" />
                      <div className="flex-1 min-w-0 text-sm text-[#333333]">
                        <p className="font-semibold truncate">{s.label}</p>
                        <p className="text-xs text-[#71717a]">{s.distanceText} · {s.durationText}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>
        )}
      </div>
    </PhotoLayout>
  )
}
