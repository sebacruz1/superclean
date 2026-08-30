"use client";

import Image from "next/image";
import { TouchEvent, useEffect, useRef, useState } from "react";

export interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoSliderProps {
  slides: Slide[];
  interval?: number;
  dim?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function PhotoSlider({
  slides = [],
  interval = 4000,
  dim = true,
  sizes = "100vw",
  priority = true,
}: PhotoSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length || 0;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (total <= 1) return;

    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(t);
  }, [interval, total]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || total <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;

    if (delta > threshold) {
      setCurrent((prev) => (prev - 1 + total) % total);
    } else if (delta < -threshold) {
      setCurrent((prev) => (prev + 1) % total);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full min-w-full shrink-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={sizes}
              quality={90}
              className={`object-cover object-center ${dim ? "brightness-75" : ""}`}
              priority={priority && i === 0}
            />
            {slide.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-4 py-3">
                <p className="text-white text-sm font-medium">
                  {slide.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a la foto ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
