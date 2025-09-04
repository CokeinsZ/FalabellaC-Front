// src/app/page.tsx
import TopSales from "@/components/molecules/topSales";
import Carousel from "@/components/organisms/carousel";
import Offers from "@/components/organisms/Offers";

const topSellingProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 5899000,
    oldPrice: 6299000,
    discount: "6% OFF",
    rating: 4.8,
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-1inch-blue-titanium?wid=512&hei=512&fmt=jpeg&qlt=90&.v=1693009274451",
  },
  {
    id: 2,
    name: "PlayStation 5 Slim Digital Edition",
    brand: "Sony",
    price: 2699900,
    oldPrice: 2999900,
    discount: "10% OFF",
    rating: 4.9,
    img: "https://m.media-amazon.com/images/I/51eOztNdC9L._SL1000_.jpg",
  },
  {
    id: 3,
    name: "Smart TV Samsung 55'' QLED 4K",
    brand: "Samsung",
    price: 2399900,
    oldPrice: 2899900,
    discount: "17% OFF",
    rating: 4.7,
    img: "https://m.media-amazon.com/images/I/81+Y4W6U+GL._AC_SL1500_.jpg",
  },
  {
    id: 4,
    name: "Audífonos Inalámbricos AirPods Pro (2da Gen)",
    brand: "Apple",
    price: 1199900,
    oldPrice: 1399900,
    discount: "14% OFF",
    rating: 4.6,
    img: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
  },
  {
    id: 5,
    name: "Laptop ASUS ROG Strix G16 Gaming",
    brand: "ASUS",
    price: 7299900,
    oldPrice: 7999900,
    discount: "9% OFF",
    rating: 4.8,
    img: "https://m.media-amazon.com/images/I/71lYhcc++aL._AC_SL1500_.jpg",
  },
  {
    id: 6,
    name: "Echo Dot 5ta Generación con Alexa",
    brand: "Amazon",
    price: 289900,
    oldPrice: 349900,
    discount: "17% OFF",
    rating: 4.5,
    img: "https://m.media-amazon.com/images/I/71xoR4A8XLL._AC_SL1500_.jpg",
  },
];

export default function Home() {
  return (
    <div>
      <Carousel />
      <TopSales title="Top Sales" products={topSellingProducts} />
      <Offers />
    </div>
  );
}
