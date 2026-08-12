import Image from 'next/image'
import { DomusTuaLogo } from '@/components/DomusTuaLogo'
import { ScopriOraButton } from '@/components/ScopriOraButton'
import property from '@/config/property.json'

export default function BenvenutoPage() {
  return (
    <div className="relative h-[calc(100vh-3rem)] flex items-center justify-center overflow-hidden">
      {/* Background property photo */}
      <Image
        src="/images/foto-principale.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/15" aria-hidden="true" />

      {/* Phone mockup — mobile only: unchanged original design */}
      <div className="flex md:hidden relative z-10 items-center justify-center">
        <div className="relative shadow-2xl" style={{ width: 280, height: 560 }}>

          {/* Screen content (visible through iPhone frame) */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center px-8 py-10">
            {/* Property photo inside screen */}
            <Image
              src="/images/foto-principale.jpg"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-white/60" aria-hidden="true" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <DomusTuaLogo size={95} className="mb-3" />

              <h1 className="text-[#CC1414] font-bold text-center uppercase text-base leading-tight mb-2">
                {property.title}
              </h1>

              {property.subtitle && (
                <p className="text-[#CC1414] font-semibold text-center text-base leading-tight mb-2">
                  {property.subtitle}
                </p>
              )}

              <p className="text-[#555555] italic text-sm text-center mb-2 whitespace-pre-line">
                {property.description}
              </p>

              <ScopriOraButton className="text-[#CC1414] font-bold italic text-3xl mb-2 hover:opacity-80 transition-opacity cursor-pointer" />

              <p className="text-[#555555] text-sm text-center leading-snug">
                tutti i dettagli dell&apos;immobile visualizzando la{' '}
                <strong className="text-[#333333]">nostra brochure digitale</strong>
              </p>
            </div>
          </div>

          {/* iPhone frame overlay — mix-blend-mode:multiply makes white screen transparent */}
          <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'multiply' }}>
            <Image
              src="/images/iphone-mockup.png"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>

        </div>
      </div>

      {/* Desktop/tablet only: direct full-screen content, no phone-frame mockup */}
      <div className="hidden md:flex relative z-10 flex-col items-center max-w-md w-full mx-8 px-8 py-8 bg-white/65 rounded-2xl shadow-lg">
        <DomusTuaLogo size={130} className="mb-5" />

        <h1 className="text-[#CC1414] font-bold text-center uppercase text-2xl leading-tight mb-3">
          {property.title}
        </h1>

        {property.subtitle && (
          <p className="text-[#CC1414] font-semibold text-center text-xl leading-tight mb-3">
            {property.subtitle}
          </p>
        )}

        <p className="text-[#555555] italic text-lg text-center mb-4 whitespace-pre-line">
          {property.description}
        </p>

        <ScopriOraButton className="text-[#CC1414] font-bold italic text-5xl mb-4 hover:opacity-80 transition-opacity cursor-pointer" />

        <p className="text-[#555555] text-base text-center leading-snug">
          tutti i dettagli dell&apos;immobile visualizzando la{' '}
          <strong className="text-[#333333]">nostra brochure digitale</strong>
        </p>
      </div>
    </div>
  )
}
