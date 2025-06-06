import React, { useState } from 'react'

const LightBox = () => {
	const images = [
		"/asset/Shop/1.png",
		"/asset/Shop/2.png",
		"/asset/Shop/3.png",
		"/asset/Shop/5.png",
		"/asset/Shop/6.png",
		"/asset/Shop/7.png",
		
	];
	const [selectedImage, setSelectedImage] = useState(images[0]);
	return (
		<div className="flex flex-col-reverse md:flex-row gap-8 items-start justify-start">
			{/* Thumbnails */}
			<div className="flex flex-wrap justify-start items-start md:flex-col gap-4">
				{images.map((img, index) => (
					<img
						key={index}
						src={img}
						alt={`Thumbnail ${index}`}
						onClick={() => setSelectedImage(img)}
						className={`w-16 object-cover cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-300"
							}`}
					/>
				))}
			</div>

			{/* Main Image */}
			<div className="w-full max-w-full">
				<img
					src={selectedImage}
					alt="Selected"
					className="w-full lg:h-[600px] h-[400px] object-cover rounded"
				/>
			</div>
		</div>
	)
}

export default LightBox