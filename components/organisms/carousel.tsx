"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { storeImageDTO } from "@/hooks/useStoreImages";

interface storeImageProps {
  title: string;
  images: storeImageDTO[];
}

function Carousel({ title, images }: storeImageProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto h-64 flex items-center justify-center bg-gray-200 rounded-lg shadow">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-96 max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg"
    >
      {/* Images */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src.img}
            alt={`Slide ${idx}`}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black"
      >
        <ChevronRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 flex w-full justify-center space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 w-3 rounded-full ${
              current === idx ? "bg-yellow-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
