import Image from 'next/image';


const cards = [
  {
    title: 'Publica tus productos',
    text: 'Ahora que has tomado la decisión de aumentar tus ventas a través del marketplace nº 1 en Chile, es el momento de prepararte para causar una gran primera impresión con tus productos.',
    img: 'https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt1dcd89f0c787d3b9/66301672bb637218fa1e2975/publicatusproductos.png?auto=webp&disable=upscale&quality=70&width=1280',
  },
  {
    title: 'Tus primeras ventas',
    text: 'Tu primera venta es el inicio de todas las oportunidades de crecimiento que tendrás vendiendo en falabella.com. Lo que sigue ahora es...',
    img: 'https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4a2e71c56b3dca16/663018bb33301ddf21895320/tusprimerasventas.png?auto=webp&disable=upscale&quality=70&width=1280',
  },
  {
    title: 'Gestión de pagos',
    text: 'Conoce el proceso de facturación por tus ventas en falabella.com y cómo retirar tu dinero a través de Fpay.',
    img: 'https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltaf2aed2067c18892/6630192d528fc15bd155e0f1/gestiondepagos.png?auto=webp&disable=upscale&quality=70&width=1280',
  },
  {
    title: 'Haz crecer tu negocio',
    text: 'Accede a servicios financieros como seller a través de Fpay, la plataforma que te acompañará en tus ventas en el Marketplace falabella.com y mucho más...',
    img: 'https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltf0f2a043f1349f7f/663019a3fb977c928736df2a/hazcrecertunegocio.png?auto=webp&disable=upscale&quality=70&width=1280',
  },
];


export default function CardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {cards.map((c, i) => (
        <article key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="w-full h-40 relative">
            <Image src={c.img} alt={c.title} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-800">{c.title}</h4>
            <p className="text-sm text-gray-500 mt-3">{c.text}</p>
            <div className="mt-6">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm">Conocer más aquí</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}