const DEFAULT_SITE_URL = "https://superclean.cl";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL;
const normalizedSiteUrl = rawSiteUrl.startsWith("http")
  ? rawSiteUrl
  : `https://${rawSiteUrl}`;

export const siteConfig = {
  name: "SuperClean",
  description:
    "SuperClean ofrece servicios de limpieza profesional para hogares y empresas.",
  url: new URL(normalizedSiteUrl),
};
