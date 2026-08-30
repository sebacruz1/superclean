import Image from "next/image";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { contactInfo } from "@/lib/contact";

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Sobre Nosotros", href: "#about" },
  { name: "Servicios", href: "#services" },
  { name: "Contacto", href: "#contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/superclean_profesional",
    Icon: FaInstagram,
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/supercleanchile",
    Icon: FaXTwitter,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/supercleanprofesional",
    Icon: FaFacebook,
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <a href="#hero" className="inline-flex items-center">
            <Image
              src="/logo.webp"
              alt="Logo de SuperClean"
              width={900}
              height={300}
              quality={90}
              className="h-10 w-auto"
            />
          </a>
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Soluciones de limpieza profesional para hogares y empresas en todo
            Chile, con personal capacitado y confianza garantizada.
          </p>

          <div className="flex gap-4 mt-5">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-white/70 hover:text-blue-400 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Navegación</h3>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-white/70 hover:text-blue-400 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Contacto</h3>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <MdPhone className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" />
              <a
                href={contactInfo.phoneHref}
                className="hover:text-blue-400 transition-colors"
              >
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MdEmail className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-blue-400 transition-colors"
              >
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MdLocationOn className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" />
              <span>
                {contactInfo.addresses.map((address) => (
                  <span key={address}>
                    {address}
                    <br />
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-white/60">
          © {year} SuperClean. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
