import { parseYoutubeId } from '@/lib/youtube'

/**
 * Un video YouTube incorporato, in formato 16:9.
 *
 * Usa il dominio `youtube-nocookie.com`: mostra lo stesso video senza lasciare
 * cookie di profilazione finché il visitatore non preme play. Se un domani
 * arriverà un banner di consenso, questo componente sarà comunque tra quelli da
 * bloccare, ma intanto è la scelta meno invasiva.
 *
 * Un indirizzo che non contiene un identificativo riconoscibile non produce
 * nulla: meglio l'assenza di un riquadro con l'errore di YouTube dentro.
 */
export function VideoYoutube({ url, title }: { url: string; title: string }) {
  const id = parseYoutubeId(url)
  if (!id) return null

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#e4e4e7]">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  )
}
