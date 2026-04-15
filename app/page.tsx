import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import { Slide } from "@/components/Slider";
import fs from "fs";
import path from "path";

const slideAltByFileName: Record<string, string> = {
  web_limpieza_profesional:
    "Servicio de limpieza profesional para hogares y empresas",
  web_limpieza_alfombras_centro:
    "Limpieza profunda de alfombras en oficinas y centros comerciales",
  web_limpieza_alfombras_serv_pro:
    "Limpieza profesional de alfombras con personal especializado",
  web_lavado_pisos:
    "Lavado y mantencion de pisos en espacios residenciales y comerciales",
  web_hidrolavado_revestimiento_vinilico:
    "Hidrolavado de revestimientos vinilicos en exteriores",
  "web_sanitizado_desinfeccion-1":
    "Sanitizado y desinfeccion de ambientes de alto transito",
};

function getSlideAlt(fileName: string): string {
  const normalizedName = path.parse(fileName).name.toLowerCase();
  const mappedAlt = slideAltByFileName[normalizedName];
  if (mappedAlt) return mappedAlt;

  const readableName = normalizedName
    .replace(/^web_/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return `Servicio de ${readableName}`;
}

export const metadata: Metadata = {
  title: "Limpieza profesional para hogares y empresas",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url.origin,
    areaServed: "Chile",
    serviceType: "Servicios de limpieza profesional",
  };

  const directorio = path.join(process.cwd(), "public/images/slides");
  let fotos: Slide[] = [];
  try {
    if (fs.existsSync(directorio)) {
      fotos = fs
        .readdirSync(directorio)
        .filter((foto) => foto.toLowerCase().endsWith(".webp"))
        .map((foto) => ({
          src: `/images/slides/${foto}`,
          alt: getSlideAlt(foto),
        }));
    } else {
      console.warn("La carpeta de fotos no existe");
    }
  } catch {
    console.error("Error al leer el directorio");
  }

  return (
    <main className="min-h-screen bg-white text-secondary overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <Hero slides={fotos} />
    </main>
  );
}
