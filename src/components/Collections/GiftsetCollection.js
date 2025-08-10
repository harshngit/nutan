import Link from 'next/link';
import React from 'react'

const GiftsetCollection = () => {
	const categories = [
		{ name: "Welcome Kits", image: "/asset/Shop/collectionher/Hoddie.webp", href: "/giftsets/welcomekits" },
		{ name: "Festive Gift Sets", image: "/asset/Shop/collectionher/sweatshirt.webp", href: "/giftsets/festivegiftsets" },
		{ name: "Corporate Combo Packs", image: "/asset/Shop/collectionher/oversized.webp", href: "/giftsets/corporatecombopacks" },
		{ name: "Custom Bundles (Build Your Own)", image: "/asset/Shop/collectionher/sweatpants.webp", href: "/giftsets/custombundles" },
	];
	return (
		<div className="bg-[#fff] py-10 px-4 text-center mb-10">
			<h2 className="text-2xl md:text-3xl font-semibold mb-2">Best For Giftset Collection</h2>
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

export default GiftsetCollection