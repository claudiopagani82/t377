// TikTok non espone i video di un profilo via API pubblica: servirebbero OAuth
// e una revisione dell'app. L'unica via senza credenziali è la sua pagina di
// embed, che mostra i video più recenti e si aggiorna da sola.
//
// Si punta l'iframe direttamente a quella pagina invece di usare embed.js: lo
// script ufficiale crea sì l'iframe, ma non gli comunica mai l'altezza e lo
// lascia alto un pixel. Così il componente non ha bisogno di JavaScript e non
// carica script di terze parti nella pagina.
//
// L'altezza è fissa perché il contenuto è cross-origin e non può comunicarci la
// propria: 430px stanno larghi sul widget reale (~400px) senza lasciare bianco
// in fondo alla card.
export function TiktokEmbed({ username }: { username: string }) {
  return (
    <iframe
      src={`https://www.tiktok.com/embed/@${username}`}
      title={`Ultimi video di @${username} su TikTok`}
      loading="lazy"
      className="w-full h-[430px] border-0"
    />
  )
}
