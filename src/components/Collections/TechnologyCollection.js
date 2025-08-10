import Link from 'next/link';
import React from 'react'

const TechnologyCollection = () => {
	const categories = [
		{ name: "Wireless Chargers", image: "/asset/Shop/collectionher/Hoddie.webp", href: "/technology/wirelesschargers" },
		{ name: "Charging Cables", image: "/asset/Shop/collectionher/sweatshirt.webp", href: "/technology/chargingcables" },
		{ name: "Wireless Mice", image: "/asset/Shop/collectionher/oversized.webp", href: "/technology/wirelessmice" },
		{ name: "Tech Gift Sets", image: "/asset/Shop/collectionher/sweatpants.webp", href: "/technology/techgiftsets" },
		{ name: "USB Essentials", image: "/asset/Shop/collectionher/leggings.webp", href: "/technology/usbessentials" },
	];
	return (
		<div className="bg-[#fff] py-10 px-4 text-center mb-10">
			<h2 className="text-2xl md:text-3xl font-semibold mb-2">Best For Technology Collection</h2>
			<p className="text-gray-600 mb-8 text-sm md:text-base"></p>
			<div className="flex flex-wrap justify-center gap-12">
				{categories.map((category, index) => (
					<Link href={category.href} className='group'>
						<div key={index} className="flex flex-col items-center">
							<div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md">
								<img
									src={category.image}
									alt={category.name}
									className="w-full h-full object-cover group-hover:shadow-lg"
								/>
							</div>
							<p className="mt-3 font-medium text-[15px]">{category.name}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default TechnologyCollection