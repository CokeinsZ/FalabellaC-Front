import Image from 'next/image';

export default function StatsSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-8">¿Por qué vender en falabella.com?</h2>


        <div className="mt-12 grid grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center">
            <Image
              src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt70166425786cb810/66475047428432ba181981c8/cifra-actualizada01.png"
              alt="+180 millones de visitas mensuales regionales"
              width={224}
              height={224}
              className="w-56 h-56 rounded-full bg-gray-100 flex items-center justify-center"
            />
            <p>+180 millones de visitas mensuales regionales</p>
          </div>


          <div className="flex flex-col items-center -mt-6">
            <Image
              src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt73b56a4668bd7dde/664750471d557682fefbe57e/cifra-actualizada02.png"
              alt="Crecimiento de las ventas en x2,8 veces desde 2019"
              width={224}
              height={224}
              className="w-56 h-56 rounded-full bg-gray-100 flex items-center justify-center"
            />
            <p>Crecimiento de las ventas en x2,8 veces desde 2019</p>
          </div>


          <div className="flex flex-col items-center">
            <Image
              src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltaaa0aa36e1bf34a4/664750480bbc62bb857fa41f/cifra-actualizada03.png"
              alt="37 millones de clientes a nivel regional"
              width={224}
              height={224}
              className="w-56 h-56 rounded-full bg-gray-100 flex items-center justify-center"
            />
            <p>37 millones de clientes a nivel regional</p>
          </div>
        </div>
      </div>
    </section>
  );
}