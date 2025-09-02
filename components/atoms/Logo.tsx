import Image from "next/image";

interface LogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ src, alt, width = 100, height = 30, className }: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`cursor-pointer ${className}`}
    />
  );
}
