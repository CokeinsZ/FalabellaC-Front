import Image from "next/image";

export default function Offers() {
  const offers = [
    {
      id: 1,
      title: "Portátil ASUS Vivobook Go 15",
      discount: "62% DCTO.",
      price: "$1.249.900",
      normal: "$3.249.900",
      img: "https://media.falabella.com/falabellaCO/73147715_1/w=800,h=800,fit=pad",
      brand: "ASUS",
    },
    {
      id: 2,
      title: "Perfumería",
      discount: "60% DCTO.",
      price: "Productos seleccionados",
      img: "https://media.falabella.com.co/falabellaCO/3941400_1/width=480,height=480,quality=70,format=webp,fit=pad",
      brand: "Versace",
    },
    {
      id: 3,
      title: "Desigual",
      discount: "50% DCTO.",
      price: "Productos seleccionados",
      img: "https://media.falabella.com.co/falabellaCO/73244443_1/width=480,height=480,quality=70,format=webp,fit=pad",
      brand: "Desigual",
    },
  ];

  return (
    <section className="px-8 py-12">
      <h2 className="text-center text-3xl font-bold mb-8">
        <span className="text-red-600">Solo x</span> pocas horas
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="relative rounded-2xl overflow-hidden shadow-lg group hover:scale-105 transition-transform"
          >
            {/* Image */}
            <div className="relative h-64 w-full">
              <Image
                src={offer.img}
                alt={offer.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>

            {/* Content */}
            <div className="absolute bottom-0 p-4 text-white">
              <span className="bg-red-600 px-3 py-1 rounded-full font-bold text-lg">
                {offer.discount}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{offer.title}</h3>
              <p className="text-sm">{offer.price}</p>
              <p className="line-through opacity-80">{offer.normal}</p>
            </div>

            {/* Brand on top */}
            <div className="absolute top-3 left-3 bg-white px-3 py-1 text-black font-semibold rounded-md shadow">
              {offer.brand}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
