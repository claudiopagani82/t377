import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
      },
      {
        // Foto dell'annuncio ufficiale, mostrate nella galleria di "Vivi la
        // Casa". Restano servite dal gestionale dell'agenzia invece di essere
        // copiate qui: sono decine, da centinaia di kilobyte l'una.
        protocol: "https",
        hostname: "annunci.domustua.com",
      },
    ],
  },
};

export default nextConfig;
