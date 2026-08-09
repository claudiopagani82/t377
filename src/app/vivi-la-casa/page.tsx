import Image from 'next/image'
import { PhotoLayout } from '@/components/PhotoLayout'
import { GalleriaFoto } from '@/components/GalleriaFoto'
import property from '@/config/property.json'

const p = property.viviLaCasa
const video = property.videoSocial
const matterport = property.matterport

// "Vivi la Casa" riunisce i due modi di vedere l'immobile senza esserci: il
// video social e la visita virtuale. Erano due voci di menu separate, e chi
// cercava "le immagini della casa" non sapeva quale delle due aprire.
// Ciascun blocco resta governato dal proprio interruttore.
const mostraVideo = video.enabled
const mostraMatterport = matterport.enabled

// Le foto arrivano dall'annuncio ufficiale, aggiornate dal pannello: qui c'è
// solo l'elenco degli indirizzi. Se l'annuncio non è ancora stato letto — o non
// ha foto — la galleria non compare, senza riquadro vuoto.
const galleria = property.viviLaCasa.gallery as string[]
const mostraGalleria = property.viviLaCasa.galleryEnabled && galleria.length > 0

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/85 rounded-xl shadow-md p-6 w-full space-y-4">{children}</div>
  )
}

function Intestazione({ titolo, sottotitolo }: { titolo: string; sottotitolo: string }) {
  return (
    <div className="text-center">
      <h2 className="text-[#CC1414] font-bold uppercase text-base tracking-wide mb-2">{titolo}</h2>
      <p className="text-[#555555] text-sm">{sottotitolo}</p>
    </div>
  )
}

export default function ViviLaCasaPage() {
  return (
    <PhotoLayout>
      <div className="w-full space-y-6">
        <h1 className="text-center text-[#CC1414] font-bold text-xl uppercase tracking-wide drop-shadow-sm">
          {p.sectionNumber && <span className="mr-1">{p.sectionNumber}</span>}
          {p.sectionTitle}
        </h1>

        {!mostraVideo && !mostraMatterport && !mostraGalleria && (
          <Card>
            <p className="text-sm text-[#71717a]">Contenuti non ancora disponibili.</p>
          </Card>
        )}

        {mostraGalleria && (
          <Card>
            <h2 className="text-center text-[#CC1414] font-bold uppercase text-base tracking-wide">
              {property.viviLaCasa.galleryHeading}
            </h2>
            <GalleriaFoto images={galleria} alt="Foto dell'immobile" />
          </Card>
        )}

        {mostraVideo && (
          <Card>
            <Intestazione titolo={video.heading} sottotitolo={video.subtitle} />

            <div className="flex justify-center">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex flex-col items-center justify-center gap-4 p-8 shadow-lg hover:opacity-90 transition-opacity"
                style={{ width: 340, minHeight: 400 }}
              >
                {video.thumbnail && (
                  <>
                    <Image src={video.thumbnail} alt="Anteprima video Instagram" fill className="object-cover object-center" />
                    <div className="absolute inset-0 bg-black/40" />
                  </>
                )}
                <svg className="relative z-10" width="60" height="60" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <p className="relative z-10 text-white font-semibold text-center text-sm">Video immobile disponibile su Instagram</p>
                <p className="relative z-10 text-white/80 text-xs text-center">{video.instagramHandle}</p>
              </a>
            </div>
          </Card>
        )}

        {mostraMatterport && (
          <Card>
            <Intestazione titolo={matterport.heading} sottotitolo={matterport.subtitle} />

            <div className="relative w-full rounded-xl overflow-hidden border border-gray-200" style={{ paddingBottom: '56.25%' }}>
              <Image
                src="/images/matterport-thumbnail.jpg"
                alt="Tour virtuale Matterport 3D"
                fill
                className="object-cover object-center"
              />
              <a
                href={matterport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#CC1414]/90 flex items-center justify-center shadow-lg hover:bg-[#CC1414] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-center text-white">
                  <p className="font-semibold text-sm">{matterport.propertyName}</p>
                  <p className="text-xs text-white/70 mt-1">{matterport.propertyLocation}</p>
                </div>
              </a>
            </div>
          </Card>
        )}
      </div>
    </PhotoLayout>
  )
}
