import Image from 'next/image';
import IconCircle from '../atoms/Circle';

export default function BenefitsGrid() {
  const items = [
    { title: 'Mayor visibilidad', subtitle: 'para tu marca', green: false, src: 'https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt0890a42ad6a016ef/662979afa02ad761fceea447/beneficio01.svg' },
    { title: 'Herramientas de análisis', subtitle: 'de datos', green: true, src: 'https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt1b3bda6f8128b54d/662a527ecac8486b7b28e7fd/beneficio02.svg' },
    { title: 'Servicios logísticos', subtitle: 'potenciados', green: false, src: 'https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt6d8395c7a457e97a/662979af51b16f0763c4eb07/beneficio03.svg' },
    { title: 'Campañas masivas', subtitle: 'en medios', green: true, src: 'https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt897c71ff2a4587a8/662979af700d6c7355a68bb8/beneficio04.svg' },
    { title: 'Alternativas de financiamiento', subtitle: 'para tu negocio', green: false, src: 'https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt61d81295ef805cf4/662979afbb63726bf11e047c/beneficio05.svg' },
    { title: 'Servicios adicionales', subtitle: 'de marketing', green: true, src: 'https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt3725c73db6d127b9/662979afa02ad7861deea44f/beneficio06.svg' },
  ];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-6 place-items-center">
      {items.map((it, idx) => (
        <div key={idx} className="flex flex-col items-center text-center max-w-xs">
          <IconCircle green={it.green}><IconDummy src={it.src} /></IconCircle>
          <h4 className="mt-4 font-semibold text-gray-800">{it.title}</h4>
          <p className="text-sm text-gray-500 mt-1">{it.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

function IconDummy({ src }: { src: string }) {
  return (
    <Image 
      src={src} 
      alt="icon"
      width={80}
      height={80}
      className="w-full h-full object-contain"
    />
  );
}