"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline, IoMenu } from "react-icons/io5";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Servicios", href: "#services" },
    { name: "Contacto", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Navegacion principal"
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          className="text-xl font-black tracking-tighter flex items-center z-50"
          href="#hero"
        >
          <span className="text-primary">Super</span>
          <span className="text-secondary">Clean</span>
        </a>

        {/* PC */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-secondary/80 font-medium hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Menu hamburguesa */}
        <button
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-secondary z-50 transition-transform active:scale-95"
        >
          {isMenuOpen ? (
            <IoCloseCircleOutline size={28} />
          ) : (
            <IoMenu size={28} />
          )}
        </button>

        {/*  menu movil */}
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-secondary hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
