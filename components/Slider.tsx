"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface Slide {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoSliderProps {
  slides: Slide[];
  interval?: number;
}

export default function PhotoSlider({
  slides = [],
  interval = 4000,
}: PhotoSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = slides.length || 0;

  useEffect(() => {
    if (total <= 1) return;

    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(t);
  }, [interval, total]);

  return (
    <div className="relative h-full w-full overflow-hidden select-none">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full min-w-full shrink-0 bg-gray-200 p-2 md:p-4"
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-contain object-center brightness-75"
                priority={i === 0}
              />
            </div>
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
    </div>
  );
}
