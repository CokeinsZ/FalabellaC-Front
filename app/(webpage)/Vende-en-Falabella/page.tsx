import Link from 'next/link';

import StatsSection from '@/components/atoms/Stats';
import BenefitsGrid from '@/components/molecules/SellerBenefitsGrid';
import CardsSection from '@/components/molecules/SellerCardSection';
import Image from 'next/image';

export default function Page() {
	return (
		<main className="w-full">
			<section className="relative w-full h-56 md:h-96">
				<Link href="/registro-seller" className="block w-full h-full">
					<Image
						src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt0d2ee8883d01f844/67daaf1807d0f932ef5d3394/vitrina-registro-home-desk.png?auto=webp&disable=upscale&quality=70&width=1920"
						alt="vendedora feliz"
						fill
						className="object-contain"
					/>
				</Link>
			</section>


			{/* Stats grandes centrales */}
			<StatsSection />


			<section className="max-w-6xl mx-auto px-6 py-12">
				<h2 className="text-3xl md:text-4xl font-medium text-center text-gray-800 mb-12">
					Disfruta de todos los beneficios de vender en falabella.com:
				</h2>
				<BenefitsGrid />
			</section>


			{/* Cards informativas */}
			<section className="bg-white py-12">
				<div className="max-w-6xl mx-auto px-6">
					<h3 className="text-2xl md:text-3xl text-center font-medium text-gray-800 mb-10">Antes de empezar a vender, te recomendamos leer:</h3>
					<CardsSection />
				</div>
			</section>
		</main>
	);
}