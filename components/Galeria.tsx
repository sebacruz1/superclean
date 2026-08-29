import Image from "next/image";
import { Slide } from "./Slider";

interface GaleriaProps {
  verticales: Slide[];
  horizontales: Slide[];
}

export const Galeria = ({ verticales, horizontales }: GaleriaProps) => {
  return (
    <section id="galeria" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Galería de Trabajos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {verticales.map((t) => (
            <div
              key={t.src}
              className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {horizontales.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {horizontales.map((t) => (
              <div
                key={t.src}
                className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm border border-gray-100"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
