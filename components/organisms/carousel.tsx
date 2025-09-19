"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { storeImageDTO } from "@/hooks/useStoreImages";
import { CarouselToken } from "../atoms/Token";

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
      <div className={CarouselToken.empty}>
        <p className={CarouselToken.emptyText}>No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={CarouselToken.container}
      aria-label={title || "Carousel"}
    >
      {/* Images */}
      <div
        className={CarouselToken.imagesWrapper}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => {
          return (
            <div
              key={idx}
              className={CarouselToken.imageItem}
            >
              <Image
                src={src.img}
                alt={`Slide ${idx}`}
                fill
                className={CarouselToken.image}
                sizes="auto"
                priority={idx === 0}
              />
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className={`${CarouselToken.buttonBase} ${CarouselToken.buttonLeft}`}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className={`${CarouselToken.buttonBase} ${CarouselToken.buttonRight}`}
      >
        <ChevronRight />
      </button>

      {/* Indicators */}
      <div className={CarouselToken.indicators}>
        {images.map((_, idx) =>  {
          return (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`${CarouselToken.indicatorBase} ${
              current === idx
                ? CarouselToken.indicatorActive
                : CarouselToken.indicatorInactive
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
