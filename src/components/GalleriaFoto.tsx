'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/Lightbox'

/**
 * Griglia di foto, ciascuna apribile a schermo intero.
 *
 * Vive a parte perché il lightbox ha bisogno di stato: incapsularlo qui lascia
 * la pagina che la ospita un componente server.
 *
 * Le prime foto si caricano subito, le altre quando si avvicinano allo schermo:
 * un annuncio può averne cinquanta, e scaricarle tutte all'apertura della
 * pagina significherebbe decine di megabyte su una connessione mobile.
 */
const SUBITO = 6

export function GalleriaFoto({ images, alt }: { images: string[]; alt: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Image
              src={src}
              alt={`${alt} — foto ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover object-center"
              loading={i < SUBITO ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
