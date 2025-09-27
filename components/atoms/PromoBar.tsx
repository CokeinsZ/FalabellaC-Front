import Image from "next/image";
export default function PromoBar() {
  return (
    <div className="w-full bg-black text-white text-sm">

        <Image
          src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltd5a4aaa921f611de/68cc97dec51babb392ef9901/Huincha_transversal_iphone-17-pro_Desk.webp?auto=webp&quality=70&width=90p"
          alt="Linio"
          width={1400}
          height={120}
        />
    </div>
  );
}