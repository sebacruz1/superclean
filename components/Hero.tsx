import PhotoSlider, { Slide } from "./Slider";

interface HeroProps {
  slides: Slide[];
}

export const Hero = ({ slides }: HeroProps) => {
  const mobileSlides = slides.map((slide) => ({
    ...slide,
    src: slide.src.replace("/images/slides/", "/images/banner-movil/"),
  }));

  return (
    <section id="hero" className="w-full mt-24 md:mt-24">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative w-full aspect-2/1">
          <PhotoSlider
            slides={mobileSlides}
            interval={4000}
            dim={false}
            sizes="(min-width: 768px) 0px, 100vw"
          />
        </div>

        <div className="bg-secondary text-center px-4 pt-16 pb-10">
          <h1 className="text-4xl font-bold text-white mb-6">
            Limpieza Profesional <br />
            <span className="text-blue-400">a tu Medida</span>
          </h1>

          <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-10">
            Brindamos soluciones de limpieza impecables para hogares y empresas
            en todo Chile, con personal capacitado y confianza garantizada.
          </p>

          <div className="flex flex-col gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-xl">
              Cotizar Ahora
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-semibold rounded-full hover:bg-white/20 transition-all">
              Nuestros Servicios
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative h-[80vh] min-h-140 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <PhotoSlider
            slides={slides}
            interval={4000}
            sizes="(min-width: 768px) 100vw, 0px"
            priority={false}
          />
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Limpieza Profesional <br />
            <span className="text-blue-400">a tu Medida</span>
          </h1>

          <p className="text-xl text-gray-100 max-w-2xl mb-10 drop-shadow">
            Brindamos soluciones de limpieza impecables para hogares y empresas
            en todo Chile, con personal capacitado y confianza garantizada.
          </p>

          <div className="flex flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-xl hover:scale-105">
              Cotizar Ahora
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-semibold rounded-full hover:bg-white/20 transition-all">
              Nuestros Servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
