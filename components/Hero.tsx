import PhotoSlider, { Slide } from "./Slider";

interface HeroProps {
  slides: Slide[];
}

export const Hero = ({ slides }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative w-full h-[80vh] min-h-[560px] overflow-hidden mt-20 md:mt-24"
    >
      <div className="absolute inset-0 z-0">
        <PhotoSlider slides={slides} interval={4000} />
      </div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Limpieza Profesional <br />
          <span className="text-blue-400">a tu Medida</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mb-10 drop-shadow">
          Brindamos soluciones de limpieza impecables para hogares y empresas en
          todo Chile, con personal capacitado y confianza garantizada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-xl hover:scale-105">
            Cotizar Ahora
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-semibold rounded-full hover:bg-white/20 transition-all">
            Nuestros Servicios
          </button>
        </div>
      </div>
    </section>
  );
};
