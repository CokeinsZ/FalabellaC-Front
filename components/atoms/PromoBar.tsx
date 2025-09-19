export default function PromoBar() {
  return (
    <div className="w-full bg-black text-white text-sm">
      <div className="max-w-[1300px] mx-auto px-4 py-2 flex items-center justify-between">
        <div className="truncate">
          iPhone 17 PRO — SOLD OUT. Espéralo pronto de vuelta
        </div>
        <a
          href="#"
          className="inline-block px-4 py-1 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
        >
          ¡CONOCE MÁS!
        </a>
      </div>
    </div>
  );
}