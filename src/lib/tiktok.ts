// L'handle si ricava dall'URL già presente in property.json: nessun campo nuovo
// da compilare per chi crea i siti.
export function parseTiktokUsername(url: string): string | null {
  return url.match(/tiktok\.com\/@([A-Za-z0-9._]+)/)?.[1] ?? null
}
