import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { About } from "../components/About";
import { Galeria } from "../components/Galeria";

import { Slide } from "@/components/Slider";
import { siteConfig } from "@/lib/seo";
import fs from "fs";
import type { Metadata } from "next";
import path from "path";
import { Services } from "@/components/Services";
import Contact from "@/components/Contact";
import ServerReviews from "@/components/ServerReviews";
import { Footer } from "@/components/Footer";
import { contactInfo, structuredAddresses } from "@/lib/contact";

const slideAltByFileName: Record<string, string> = {
  "limpieza-profesional":
    "Servicio de limpieza profesional para hogares y empresas",
  "limpieza-alfombras-centro":
    "Limpieza profunda de alfombras en oficinas y centros comerciales",
  "limpieza-alfombras-serv-pro":
    "Limpieza profesional de alfombras con personal especializado",
  "lavado-pisos":
    "Lavado y mantención de pisos en espacios residenciales y comerciales",
  "hidrolavado-revestimiento-vinilico":
    "Hidrolavado de revestimientos vinílicos en exteriores",
  "sanitizado-desinfeccion":
    "Sanitizado y desinfección de ambientes de alto tránsito",
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

const trabajoAltByFileName: Record<string, string> = {
  "hidrolavado-fachadas": "Antes y después de hidrolavado de fachada exterior",
  "lavado-interior-vehiculos":
    "Antes y después de lavado de interior de vehículo",
  "lavado-pisos-duros-2": "Antes y después de lavado de pisos duros",
  "limpieza-alfombras": "Antes y después de limpieza de alfombras en pasillo",
  "limpieza-delicada-alfombras":
    "Limpieza delicada de alfombra con máquina profesional",
  "limpieza-recuperacion-pisos-flotantes":
    "Antes y después de recuperación de pisos flotantes",
};

function getTrabajoAlt(fileName: string): string {
  const normalizedName = path.parse(fileName).name.toLowerCase();
  const mappedAlt = trabajoAltByFileName[normalizedName];
  if (mappedAlt) return mappedAlt;

  const readableName = normalizedName.replace(/[-_]+/g, " ").trim();
  return `Antes y después de ${readableName}`;
}

const trabajosHorizontalesFileNames = new Set([
  "hidrolavado-fachadas.webp",
  "lavado-interior-vehiculos.webp",
  "limpieza-alfombras.webp",
]);

function readWebpImages(
  carpetaRelativa: string,
  getAlt: (fileName: string) => string,
): Slide[] {
  const directorio = path.join(process.cwd(), "public", carpetaRelativa);
  try {
    if (!fs.existsSync(directorio)) {
      console.warn(`La carpeta ${carpetaRelativa} no existe`);
      return [];
    }

    return fs
      .readdirSync(directorio)
      .filter((foto) => foto.toLowerCase().endsWith(".webp"))
      .map((foto) => ({
        src: `/${carpetaRelativa}/${foto}`,
        alt: getAlt(foto),
      }));
  } catch {
    console.error(`Error al leer la carpeta ${carpetaRelativa}`);
    return [];
  }
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
    "@graph": structuredAddresses.map((address, index) => ({
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url.origin}/#location-${index}`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url.origin,
      image: `${siteConfig.url.origin}/logo.webp`,
      telephone: contactInfo.phoneHref.replace("tel:", ""),
      email: contactInfo.email,
      address: {
        "@type": "PostalAddress",
        ...address,
      },
      areaServed: "Chile",
      serviceType: "Servicios de limpieza profesional",
    })),
  };

  const fotos = readWebpImages("images/slides", getSlideAlt).map((foto) => {
    const mobilePath = foto.src.replace(
      "/images/slides/",
      "/images/banner-movil/",
    );
    const mobileExists = fs.existsSync(
      path.join(process.cwd(), "public", mobilePath),
    );
    return { ...foto, mobileSrc: mobileExists ? mobilePath : foto.src };
  });
  const trabajos = readWebpImages("images/before_after", getTrabajoAlt);
  const trabajosVerticales = trabajos.filter(
    (t) => !trabajosHorizontalesFileNames.has(path.basename(t.src)),
  );
  const trabajosHorizontales = trabajos.filter((t) =>
    trabajosHorizontalesFileNames.has(path.basename(t.src)),
  );

  return (
    <main className="min-h-screen bg-white text-secondary overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <Hero slides={fotos} />
      <About />
      <Services />
      <Galeria
        verticales={trabajosVerticales}
        horizontales={trabajosHorizontales}
      />
      <ServerReviews />
      <Contact />
      <Footer />
    </main>
  );
}
