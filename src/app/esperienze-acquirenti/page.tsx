import { PhotoLayout } from '@/components/PhotoLayout'
import { VideoYoutube } from '@/components/VideoYoutube'
import property from '@/config/property.json'

interface Video {
  label: string
  url: string
}

interface Recensione {
  name: string
  rating: number
  text: string
  data?: string
  url?: string
}

const p = property.esperienzeAcquirenti

// Chi ha già comprato con noi racconta com'è andata: i video con le sue parole,
// le recensioni scritte. Un blocco senza contenuti non compare — una sezione
// "esperienze" vuota direbbe l'opposto di quello che vuole dire.
const videos = (p.videos as Video[]).filter((v) => v.url.trim())
const recensioni = (p.recensioni as Recensione[]).filter((r) => r.text.trim())
const daGoogle = p.recensioniFonte === 'google'

function Stelle({ voto }: { voto: number }) {
  const pieno = Math.max(0, Math.min(5, Math.round(voto)))
  return (
    <span className="text-[#f5b301] text-xs leading-none" aria-label={`${pieno} su 5 stelle`}>
      {'★'.repeat(pieno)}
      {'☆'.repeat(5 - pieno)}
    </span>
  )
}

export default function EsperienzeAcquirentiPage() {
  return (
    <PhotoLayout>
      <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-6">
        <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {videos.length === 0 && recensioni.length === 0 && (
          <p className="text-sm text-[#71717a]">Contenuti non ancora disponibili.</p>
        )}

        {videos.length > 0 && (
          <section className="space-y-4">
            {p.videoHeading && (
              <h2 className="text-[#333333] font-bold text-sm uppercase tracking-wide">{p.videoHeading}</h2>
            )}
            {videos.map((v) => (
              <div key={v.url} className="space-y-2">
                <VideoYoutube url={v.url} title={v.label || 'Esperienza di un acquirente'} />
                {v.label && <p className="text-xs text-[#71717a]">{v.label}</p>}
              </div>
            ))}
          </section>
        )}

        {recensioni.length > 0 && (
          <section className="border-t border-[#e4e4e7] pt-5 space-y-3">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              {p.recensioniHeading && (
                <h2 className="text-[#333333] font-bold text-sm uppercase tracking-wide">{p.recensioniHeading}</h2>
              )}
              {p.recensioniBadge && (
                <span className="text-xs text-[#71717a]">{p.recensioniBadge}</span>
              )}
            </div>

            {recensioni.map((r, i) => (
              <div key={i} className="rounded-xl border border-[#e4e4e7] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f5] flex items-center justify-center text-xs font-bold text-[#71717a] flex-shrink-0">
                    {r.name.charAt(0) || '·'}
                  </div>
                  <div>
                    {r.name && <p className="text-xs font-semibold text-[#18181b]">{r.name}</p>}
                    <Stelle voto={r.rating} />
                  </div>
                  {r.data && <span className="ml-auto text-[11px] text-[#71717a]">{r.data}</span>}
                </div>
                <p className="text-[#333333] text-sm leading-relaxed">{r.text}</p>
                {r.url && (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[11px] text-[#71717a] underline hover:opacity-80"
                  >
                    Leggila su Google
                  </a>
                )}
              </div>
            ))}

            {daGoogle && (
              // Attribuzione richiesta dai termini d'uso delle Places API:
              // le recensioni sono di Google e va detto, con il collegamento
              // alla scheda da cui arrivano.
              <p className="text-[11px] text-[#71717a]">
                Recensioni pubblicate su Google, mostrate come sono state scritte.
              </p>
            )}
          </section>
        )}
      </div>
    </PhotoLayout>
  )
}
