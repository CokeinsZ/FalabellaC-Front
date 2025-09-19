import Image from "next/image";
import { OffersToken } from "../../utils/Token";

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
    <section className={OffersToken.section}>
      <h2 className={OffersToken.title}>
        <span className={OffersToken.highlight}>Solo x</span> pocas horas
      </h2>

      <div className={OffersToken.grid}>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={OffersToken.card}
          >
            {/* Image */}
            <div className={OffersToken.imageWrapper}>
              <Image
                src={offer.img}
                alt={offer.title}
                fill
                className={OffersToken.image}
              />
            </div>

            {/* Dark overlay */}
            <div className={OffersToken.overlay}></div>

            {/* Content */}
            <div className={OffersToken.overlay}>
              <span className={OffersToken.discount}>
                {offer.discount}
              </span>
              <h3 className={OffersToken.titleCard}>{offer.title}</h3>
              <p className={OffersToken.price}>{offer.price}</p>
              <p className={OffersToken.normal}>{offer.normal}</p>
            </div>

            {/* Brand on top */}
            <div className={OffersToken.brand}>
              {offer.brand}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
