import { ExternalLink, Globe } from 'lucide-react'
import { PhotoLayout } from '@/components/PhotoLayout'
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from '@/components/icons'
import property from '@/config/property.json'

interface Numero {
  valore: string
  etichetta: string
}

interface Premio {
  titolo: string
  anno?: string
}

interface Social {
  platform: string
  url: string
}

const p = property.mondoDomusTua

const numeri = (p.numeri as Numero[]).filter((n) => n.valore.trim())
// Uno stesso premio vinto più volte è una riga sola con gli anni accanto: due
// righe identiche tranne l'anno direbbero meno di quel che vale averlo vinto
// due volte di fila.
const premi = Object.values(
  (p.premi as Premio[])
    .filter((x) => x.titolo.trim())
    .reduce<Record<string, { titolo: string; anni: string[] }>>((acc, x) => {
      const voce = (acc[x.titolo] ??= { titolo: x.titolo, anni: [] })
      if (x.anno?.trim()) voce.anni.push(x.anno.trim())
      return acc
    }, {})
).map((v) => ({ ...v, anni: v.anni.sort() }))
const social = (p.social as Social[]).filter((s) => s.url.trim())

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
}

const SOCIAL_NOMI: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

// I valori dell'agenzia, i tre che ricorrono in ogni sua pagina.
const VALORI = [
  {
    titolo: 'Professionalità',
    testo: 'Vent’anni di mestiere, e un protocollo — Domus D.O.C., Domus di Origine Certificata — che verifica ogni immobile prima di metterlo in vendita.',
  },
  {
    titolo: 'Innovazione',
    testo: 'Home staging, rendering e realtà virtuale, video emozionali, Open Domus: strumenti nati per far vedere una casa com’è davvero, non com’è in fotografia.',
  },
  {
    titolo: 'Integrità',
    testo: 'Le regole si dicono prima e valgono per tutti. Nessuna offerta al buio, nessuna corsa contro il tempo, nessuna informazione tenuta nascosta.',
  },
]

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-4">{children}</div>
}

function Titolo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[#CC1414] font-bold text-base uppercase tracking-wide">{children}</h2>
  )
}

export default function MondoDomusTuaPage() {
  return (
    <PhotoLayout>
      <div className="w-full space-y-6">
        <h1 className="text-center text-[#CC1414] font-bold text-xl uppercase tracking-wide drop-shadow-sm">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {/* CHI SIAMO */}
        <Card>
          <Titolo>Chi siamo</Titolo>
          <p className="text-[#CC1414] font-bold text-sm uppercase tracking-wide">
            We love home, we love life
          </p>
          <div className="text-[#333333] text-sm leading-relaxed space-y-3">
            <p>
              Crediamo che ognuno meriti una casa che sia il rifugio dei propri sogni e il terreno
              su cui far crescere la propria vita. Da questa convinzione nasce il lavoro di Domus
              Tua Immobiliare: aiutare a trovare la casa giusta, e insieme costruire un ambiente in
              cui clienti e collaboratori possano fiorire.
            </p>
            <p>
              Offriamo una gamma completa di servizi immobiliari — dal marketing emozionale
              all’home staging, dalla consulenza tecnica e legale all’Open Domus — con
              personalizzazione, innovazione e integrità.
            </p>
            {p.claim && (
              <p className="font-semibold text-[#333333]">{p.claim}.</p>
            )}
          </div>
        </Card>

        {/* I VALORI */}
        <Card>
          <Titolo>I valori</Titolo>
          <dl className="space-y-4">
            {VALORI.map((v) => (
              <div key={v.titolo} className="border-b border-[#f0f0f0] pb-4 last:border-0 last:pb-0">
                <dt className="text-[#333333] font-bold text-sm mb-1">{v.titolo}</dt>
                <dd className="text-[#333333] text-sm leading-relaxed">{v.testo}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* IL MANIFESTO */}
        <Card>
          <Titolo>Il manifesto</Titolo>
          <blockquote className="border-l-4 border-[#CC1414] pl-4 text-[#333333] text-sm leading-relaxed italic space-y-3">
            <p>
              Vogliamo essere più di un’agenzia immobiliare: un luogo dove i sogni prendono forma,
              i valori si vivono ogni giorno e la crescita condivisa è la regola, non l’eccezione.
            </p>
            <p>Con Domus Tua è facile vendere ed è sicuro acquistare.</p>
          </blockquote>
        </Card>

        {/* I NUMERI */}
        {numeri.length > 0 && (
          <Card>
            <Titolo>I numeri</Titolo>
            <dl className="grid grid-cols-2 gap-3">
              {numeri.map((n) => (
                <div key={n.etichetta} className="rounded-xl border border-[#e4e4e7] px-4 py-3 text-center">
                  <dt className="text-[#CC1414] font-bold text-xl">{n.valore}</dt>
                  <dd className="text-[#71717a] text-xs mt-0.5">{n.etichetta}</dd>
                </div>
              ))}
            </dl>
          </Card>
        )}

        {/* I PREMI */}
        {premi.length > 0 && (
          <Card>
            <Titolo>I premi</Titolo>
            <ul className="space-y-2">
              {premi.map((x) => (
                <li key={x.titolo} className="flex items-baseline gap-2 text-sm text-[#333333]">
                  <span className="text-[#f5b301]">★</span>
                  <span>
                    <span className="font-semibold">{x.titolo}</span>
                    {x.anni.length > 0 && (
                      <span className="text-[#71717a]"> — {x.anni.join(' e ')}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* LE RECENSIONI */}
        {p.recensioniUrl && (
          <Card>
            <Titolo>Le recensioni</Titolo>
            <p className="text-[#333333] text-sm leading-relaxed">
              Chi ha venduto o comprato con noi lo racconta pubblicamente: le recensioni sono tutte
              lì, senza selezione.
            </p>
            <a
              href={p.recensioniUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18181b] underline hover:opacity-80"
            >
              <ExternalLink className="w-4 h-4" /> Leggi tutte le recensioni
            </a>
          </Card>
        )}

        {/* IL CANALE YOUTUBE */}
        {(p.youtubeCanale || p.youtubePlaylist) && (
          <Card>
            <Titolo>Il canale YouTube</Titolo>
            <p className="text-[#333333] text-sm leading-relaxed">
              Le case raccontate in video e le testimonianze di chi ha comprato con noi.
            </p>
            <div className="space-y-2">
              {p.youtubePlaylist && (
                <a
                  href={p.youtubePlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#18181b] underline hover:opacity-80"
                >
                  <YoutubeIcon size={18} className="text-[#FF0000] flex-shrink-0" />
                  Guarda le video recensioni
                </a>
              )}
              {p.youtubeCanale && (
                <a
                  href={p.youtubeCanale}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#18181b] underline hover:opacity-80"
                >
                  <YoutubeIcon size={18} className="text-[#FF0000] flex-shrink-0" />
                  Vai al canale
                </a>
              )}
            </div>
          </Card>
        )}

        {/* IL SITO E I SOCIAL */}
        <Card>
          <Titolo>Il sito e i social</Titolo>

          {p.sitoUrl && (
            <a
              href={p.sitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#18181b] underline hover:opacity-80"
            >
              <Globe className="w-4 h-4 text-[#CC1414] flex-shrink-0" />
              {p.sitoUrl.replace(/^https?:\/\//, '')}
            </a>
          )}

          {social.length > 0 && (
            <ul className="grid grid-cols-2 gap-2">
              {social.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform]
                return (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] px-3 py-2.5 text-sm text-[#18181b] hover:bg-[#f9f9f9] transition-colors"
                    >
                      {Icon && <Icon size={18} className="flex-shrink-0" />}
                      {SOCIAL_NOMI[s.platform] ?? s.platform}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="border-t border-[#e4e4e7] pt-4 text-sm text-[#333333] space-y-1">
            <p className="font-semibold">{property.agencyName}</p>
            {p.indirizzo && <p className="text-[#71717a]">{p.indirizzo}</p>}
            <p>
              <a href={`tel:${property.agencyPhone.replace(/\s/g, '')}`} className="underline hover:opacity-80">
                {property.agencyPhone}
              </a>
              {' · '}
              <a href={`mailto:${property.agencyEmail}`} className="underline hover:opacity-80">
                {property.agencyEmail}
              </a>
            </p>
          </div>
        </Card>
      </div>
    </PhotoLayout>
  )
}
