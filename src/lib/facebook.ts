export interface LatestFacebookPost {
  url: string
  image: string | null
  text: string
}

// Facebook, a differenza di YouTube, non pubblica nessun feed leggibile senza
// autenticazione: servirebbe un token della Graph API. Quel token vive una volta
// sola nell'admin hub, che espone questo endpoint pubblico di sola lettura — così
// i siti generati non contengono credenziali e non richiedono configurazione.
const PROXY_URL = process.env.SOCIAL_PROXY_URL ?? 'https://domus-admin-hub.vercel.app'

export async function getLatestFacebookPost(): Promise<LatestFacebookPost | null> {
  try {
    const res = await fetch(`${PROXY_URL}/api/social/facebook`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null

    const data = (await res.json()) as { post?: LatestFacebookPost | null }
    const post = data.post
    if (!post?.url || !post.text) return null

    return { url: post.url, image: post.image ?? null, text: post.text }
  } catch {
    return null
  }
}
