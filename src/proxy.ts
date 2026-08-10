import { NextResponse, type NextRequest } from 'next/server'
import property from '@/config/property.json'

/**
 * Spegne il minisito quando è scaduto.
 *
 * La scadenza è un istante preciso — le 23:59:59 del giorno indicato, ora
 * italiana — scritto in `expiresAt` dal pannello. Il controllo sta qui, e non
 * in una pagina, perché le pagine del sito sono statiche: costruite una volta
 * al deploy, non saprebbero mai che nel frattempo è passata la mezzanotte.
 * Questo file invece gira a ogni richiesta, quindi il sito si spegne all'ora
 * giusta senza cron da far scattare e senza un nuovo deploy da attendere.
 *
 * Si chiama `proxy` e non `middleware`: da Next 16 è questo il nome della
 * convenzione, e quella vecchia avverte a ogni build.
 *
 * Un `expiresAt` vuoto significa "nessuna scadenza": i siti creati prima di
 * questa versione restano attivi finché non li si spegne a mano.
 */
const SCADENZA = property.expiresAt ? Date.parse(property.expiresAt) : NaN

/**
 * Le esclusioni stanno qui e non in `config.matcher` perché il matcher è una
 * stringa che Next converte in espressione regolare, e nella conversione le
 * sequenze di escape si perdono: `\.` diventa un punto qualunque, che matcha
 * ogni carattere. Il risultato era che quasi tutte le pagine risultavano
 * escluse e il sito scaduto restava visibile — tranne la home.
 */
function daIgnorare(pathname: string): boolean {
  return (
    pathname.startsWith('/_next/') ||
    pathname === '/non-disponibile' ||
    // Un file ha un'estensione: immagini, documenti, favicon. Una pagina no.
    /\.[a-zA-Z0-9]+$/.test(pathname)
  )
}

export function proxy(request: NextRequest) {
  if (Number.isNaN(SCADENZA) || Date.now() <= SCADENZA) return NextResponse.next()
  if (daIgnorare(request.nextUrl.pathname)) return NextResponse.next()

  // Rewrite, non redirect: l'indirizzo resta quello che il visitatore ha
  // ricevuto — di solito da un messaggio dell'agenzia — e non si trasforma in
  // un link a una pagina d'errore che poi si porterebbe dietro.
  return NextResponse.rewrite(new URL('/non-disponibile', request.url))
}
