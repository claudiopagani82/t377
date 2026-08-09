import Image from 'next/image'
import { DocumentLayout } from '@/components/DocumentLayout'

export interface VoceDocumento {
  label: string
  enabled?: boolean
  documentUrl?: string | null
}

interface Props {
  sectionNumber?: string
  sectionTitle: string
  items: VoceDocumento[]
}

/**
 * Normalizza l'elenco delle voci di una sezione documentale.
 *
 * Nei siti nati prima della 1.8 `items` è un elenco di stringhe — la sola
 * etichetta, senza file — e la funzione "Aggiorna" del pannello aggiunge le
 * chiavi nuove ma non riscrive quelle vecchie. Un sito aggiornato arriva quindi
 * qui con le due forme mescolate: senza questa conversione la build fallisce
 * sul tipo e il sito, che fino a un minuto prima funzionava, smette di essere
 * pubblicato. Le voci in forma vecchia non hanno documento, quindi finiscono
 * comunque scartate — ma la pagina si costruisce.
 */
export function vociDocumento(items: unknown): VoceDocumento[] {
  if (!Array.isArray(items)) return []
  return items.map((i) =>
    typeof i === 'string' ? { label: i, documentUrl: null } : (i as VoceDocumento)
  )
}

export function documentiDisponibili(items: VoceDocumento[]): VoceDocumento[] {
  return items.filter((i) => i.enabled !== false && i.documentUrl)
}

/**
 * La sola lista dei documenti, senza intestazione né layout.
 *
 * Serve alle pagine che accostano più blocchi (per esempio la 3, dove
 * planimetrie e relazione tecnica convivono): l'elenco è lo stesso, cambia
 * quello che ci sta intorno. Restituisce `null` quando non c'è nulla da
 * scaricare, così chi la usa decide se mostrare un messaggio o saltare il blocco.
 */
export function ListaDocumenti({ items }: { items: VoceDocumento[] }) {
  const disponibili = documentiDisponibili(items)
  if (disponibili.length === 0) return null

  return (
    <ul className="space-y-3">
      {disponibili.map((item, i) => (
        <li key={i}>
          <a
            href={item.documentUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 hover:opacity-80 transition-opacity"
          >
            <Image src="/images/cuore.png" alt="" width={16} height={14} className="flex-shrink-0 mt-0.5" />
            <span className="text-[#333333] text-sm font-semibold underline">{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

/**
 * Elenco di documenti scaricabili, senza immagini.
 *
 * Mostra **solo** le voci che hanno davvero un file caricato: una voce senza
 * documento sparisce dalla pagina invece di comparire in grigio come "non
 * disponibile". La pagina resta così una lista di cose effettivamente
 * scaricabili, e l'operatore non deve spegnere a mano le voci che non servono.
 */
export function ElencoDocumenti({ sectionNumber, sectionTitle, items }: Props) {
  const vuoto = documentiDisponibili(items).length === 0

  return (
    <DocumentLayout sectionNumber={sectionNumber} sectionTitle={sectionTitle}>
      {vuoto ? (
        <p className="text-sm text-[#71717a]">
          Nessun documento disponibile al momento.
        </p>
      ) : (
        <ListaDocumenti items={items} />
      )}
    </DocumentLayout>
  )
}
