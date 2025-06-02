import React, { useEffect, useState } from 'react';

const images = [
	'/asset/Home/collection1.png',
	'/asset/Home/collection5.png',
	'/asset/Home/collection2.png',
	'/asset/Home/collection3.png',
	'/asset/Home/collection4.png',
];

const SwiperCollection = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % images.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const getTransform = (index) => {
		const offset = index - activeIndex;
		const total = images.length;
		const middle = Math.floor(total / 2);

		let pos = offset;
		if (offset < -middle) pos += total;
		if (offset > middle) pos -= total;

		const baseTranslate = 350;
		const translateX = pos * baseTranslate;

		// Scale logic
		let scale = 0.8;
		if (Math.abs(pos) === 0) scale = 0.6;
		else if (Math.abs(pos) === 1) scale = 0.7;
		else scale = 0.8;

		// Height logic based on position
		let height = '400px';
		if (Math.abs(pos) === 0) height = '300px';
		else if (Math.abs(pos) === 1) height = '350px';

		// Width
		let width = '400px';
		if (Math.abs(pos) === 0) height = '300px';
		else if (Math.abs(pos) === 1) height = '350px';

		return {
			transform: `translateX(${translateX}px) scale(${scale})`,
			zIndex: pos === 0 ? 60 : 20 - Math.abs(pos),
			opacity: Math.abs(pos) > middle ? 0 : 1,
			height,
			width,
		};
	};

	return (
		<div className="flex justify-center items-center w-[80%] mb-[300px]">
			<div className="relative w-[100%] h-[200px] carousel-3d">
				{images.map((src, index) => {
					const styles = getTransform(index);
					return (
						<div
							key={index}
							className="absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out"
							style={{
								transform: styles.transform,
								zIndex: styles.zIndex,
								opacity: styles.opacity,
								height: styles.height,
								width: styles.width,
								transformStyle: 'preserve-3d',
								transformOrigin: 'center center',
								top: '50%',
								left: '50%',
								transition: 'all 0.7s ease-in-out',
							}}
						>
							<img
								src={src}
								className=" object-cover rounded-xl shadow-xl"
								style={{
									height: '100%',
									width: '100%',
									transition: 'height 0.7s ease-in-out',
								}}
								alt={`img-${index}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SwiperCollection;
