import { PhotoLayout } from '@/components/PhotoLayout'
import { ListaDocumenti, documentiDisponibili, vociDocumento } from '@/components/ElencoDocumenti'
import property from '@/config/property.json'

const p = property.planimetrieCatasto
const rel = property.relazioneTecnica

// La pagina 3 accosta due blocchi: le planimetrie e i dati catastali, e la
// relazione tecnica. Parlano della stessa cosa — cosa risulta dell'immobile
// sulla carta — e su due voci di menu affiancate sembravano due argomenti.
// Ciascun blocco resta governato dal proprio interruttore, come le due metà
// della pagina 1 e della pagina 2.
const mostraPlanimetrie = p.enabled
const mostraRelazione = rel.enabled

// Le singole voci senza file allegato non compaiono — è la regola di tutte le
// pagine documentali — ma il blocco sì, finché è acceso: è quello che dà il
// titolo alla pagina. Nasconderlo quando non c'è ancora nulla da scaricare
// faceva aprire "Planimetrie e Catasto" sull'intestazione "Relazione tecnica",
// come se la voce di menu portasse altrove.
const planimetrieVuote = documentiDisponibili(vociDocumento(p.items)).length === 0

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-4">{children}</div>
  )
}

function Paragrafi({ testo }: { testo: string }) {
  return (
    <>
      {testo.split('\n\n').map((paragrafo, i) => (
        <p key={i} className="text-[#555555] text-sm leading-relaxed mb-2 last:mb-0">
          {paragrafo}
        </p>
      ))}
    </>
  )
}

export default function PlanimetrieCatastoPage() {
  return (
    <PhotoLayout>
      <div className="w-full space-y-6">
        {!mostraPlanimetrie && !mostraRelazione && (
          <Card>
            <p className="text-sm text-[#71717a]">Nessun documento disponibile al momento.</p>
          </Card>
        )}

        {mostraPlanimetrie && (
          <Card>
            <h1 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
              {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
              {p.sectionTitle}
            </h1>
            {planimetrieVuote ? (
              <p className="text-sm text-[#71717a]">Nessun documento disponibile al momento.</p>
            ) : (
              <ListaDocumenti items={vociDocumento(p.items)} />
            )}
          </Card>
        )}

        {mostraRelazione && (
          <Card>
            <h2 className="text-[#CC1414] font-bold text-xl uppercase tracking-wide">
              {rel.sectionTitle}
            </h2>

            {rel.introHeading && (
              <div>
                <h3 className="text-[#333333] font-bold text-sm mb-1.5">{rel.introHeading}</h3>
                <Paragrafi testo={rel.introParagraph} />
              </div>
            )}

            {rel.statusHeading && (
              <div>
                <h3 className="text-[#333333] font-bold text-sm mb-1.5">{rel.statusHeading}</h3>
                <Paragrafi testo={rel.statusParagraph} />
              </div>
            )}

            <ListaDocumenti items={vociDocumento(rel.items)} />
          </Card>
        )}
      </div>
    </PhotoLayout>
  )
}
