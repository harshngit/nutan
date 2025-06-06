import React, { useEffect, useState } from "react";
import { FaHeart, FaShare, FaStar, FaStarOfLife } from 'react-icons/fa';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FiFacebook, FiLinkedin, FiMinus, FiPlus, FiTwitter } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";


const sizes = ["M", "L", "XL", "XXL"];
const colors = [
	{ name: "Black", code: "bg-black" },
	{ name: "Blue", code: "bg-blue-300" },
	{ name: "Pink", code: "bg-pink-300" },
];

const data = [
	{
		title: "Description",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id justo nec ipsum iaculis aliquet.",
	},
	{
		title: "Materials",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Pellentesque habitant morbi tristique senectus.",
	},
	{
		title: "Delivery And Payment",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nibh nec arcu aliquet fermentum.",
	},
];



const Details = ({ rating = 4, total = 5, count = 3 }) => {
	const [quantity, setQuantity] = useState(1)

	// Remove TypeScript type annotations - this is the fix for your error
	const handleQuantityChange = (action) => {
		if (action === "increase") {
			setQuantity((prev) => prev + 1)
		} else if (action === "decrease" && quantity > 1) {
			setQuantity((prev) => prev - 1)
		}
	}

	const handleAddToCart = () => {
		console.log(`Adding ${quantity} items to cart`)
		// Add your cart logic here
	}

	const handleCompare = () => {
		console.log("Adding to compare")
		// Add your compare logic here
	}
	const [timeLeft, setTimeLeft] = useState(5 * 60 + 59 + 47 / 100); // 5:59:47 (MM:SS:MS)

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => Math.max(prev - 0.01, 0));
		}, 10); // update every 10ms

		return () => clearInterval(timer);
	}, []);
	// start
	const fullStars = Math.floor(rating);
	const hasHalf = rating % 1 >= 0.5;
	const emptyStars = total - fullStars - (hasHalf ? 1 : 0);

	const formatTime = (totalSeconds) => {
		const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
		const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
		const milliseconds = String(Math.floor((totalSeconds % 1) * 100)).padStart(2, "0");

		return { hours, minutes, seconds, milliseconds };
	};

	const { hours, minutes, seconds, milliseconds } = formatTime(timeLeft)
	const [selectedSize, setSelectedSize] = useState("M");
	const [selectedColor, setSelectedColor] = useState("Blue");
	// Description code

	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (index) => {
		setOpenIndex(index === openIndex ? null : index);
	};


	return (
		<div className='px-5 py-5 w-full flex flex-col justify-start items-start gap-5'>
			{/* <div className='flex justify-between items-center w-full'>
				<p className='font-thin text-[15px] text-[#666666]'>DF</p>
				<FaHeart className='text-[#F24822] text-[25px]' />
			</div> */}
			<div className='flex justify-start w-full'>
				<h2 className='font-normal text-[25px] text-[#000]'>Asgaard sofa</h2>
			</div>
			<div className='flex justify-start items-center gap-5 w-full'>
				<h2 className='font-normal text-[27px] text-[#000]'>Rs. 250,000.00
					{/* <span className='text-[18px] text-[#442D2D]'> $59.00</span> */}
				</h2>
				{/* <div className='bg-[#836953] rounded-xl text-[12px] text-white px-3 py-1'>SAVE 33%</div> */}
			</div>

			<div className='flex flex-row justify-start items-center gap-5 w-full'>
				<div className="flex flex-row justify-start items-center gap-1 ">
					<FaStar className="text-[#FFC700]" ></FaStar>
					<FaStar className="text-[#FFC700]" ></FaStar>
					<FaStar className="text-[#FFC700]" ></FaStar>
					<FaStar className="text-[#FFC700]" ></FaStar>
					<FaRegStarHalfStroke className="text-[#FFC700]"> </FaRegStarHalfStroke>

				</div>
				<p className='px-4 font-400 text-[13px] text-[#9F9F9F] border-l-2'>5 Customer Review</p>
			</div>

			{/* <div className='flex justify-start items-center gap-5 w-full'>
				<div className='bg-[#FDEFEE] border-[2px] border-[#F8CCCC] w-full flex justify-between text-[20px] text-[#FF706B] px-5 py-5'>
					<h3 className='lg:text-[20px] text-[17px] font-400'>Hurry up! Sale ends in:</h3>
					<div className="lg:text-[20px] text-[17px] font-bold tracking-widest flex space-x-2">
						<span>{hours}</span>
						<span>:</span>
						<span>{minutes}</span>
						<span>:</span>
						<span>{seconds}</span>
					</div>
				</div>
			</div> */}
			<div className='flex justify-start items-center w-full'>
				<p className='font-400 text-[18px] text-[#666666]'>Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.</p>
			</div>
			<div className=" w-full">
				{/* Size */}
				<div className="flex justify-between items-center mb-4">
					<div className="text-lg font-semibold">Size:
						<span className="font-normal gap-4">{selectedSize}</span>
					</div>
					{/* <a href="#" className="underline font-medium text-black hover:text-blue-600">
						Size Guide
					</a> */}
				</div>
				<div className="flex gap-4 mb-6">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`w-10 h-10 text-sm font-medium rounded transition-all duration-150
								${selectedSize === size
									? "bg-[#B88E2F] text-white"
									: "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"}
							`}
						>
							{size}
						</button>

					))}
				</div>

				{/* Color */}
				<div className="text-lg lg:py-4 font-semibold mb-2">
					Color: <span className="font-normal">{selectedColor}</span>
				</div>
				<div className="flex gap-4">
					{colors.map((color) => (
						<button
							key={color.name}
							onClick={() => setSelectedColor(color.name)}
							className={`w-10 h-10 rounded-full border-2 ${selectedColor === color.name
								? "ring-2 ring-offset-2 ring-black"
								: "border-gray-300"
								} ${color.code}`}
						></button>
					))}
				</div>
			</div>
			<div className="w-full flex  flex-row lg:py-4 gap-2 border-b-2">

				<div className="flex flex-col sm:flex-row gap-4 mb-8">
					{/* Quantity Selector */}
					<div className="flex items-center border border-gray-300 rounded-lg">
						<button
							onClick={() => handleQuantityChange("decrease")}
							className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={quantity <= 1}
						>
							<FiMinus className="w-4 h-4" />
						</button>
						<span className="px-6 py-3 text-center min-w-[60px] font-medium text-[20px]">{quantity}</span>
						<button onClick={() => handleQuantityChange("increase")} className="p-3 hover:bg-gray-50 transition-colors">
							<FiPlus className="w-4 h-4" />
						</button>
					</div>

					{/* Add to Cart Button */}
					<button
						onClick={handleAddToCart}
						className="flex-1 text-[20px] px-10 py-3 border border-black rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
					>
						Add To Cart
					</button>

					{/* Compare Button */}
					<button
						onClick={handleCompare}
						className="flex items-center text-[20px] justify-center gap-2 px-10 py-3 border border-black rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
					>
						<FiPlus className="w-4 h-4" />
						Compare
					</button>
				</div>
			</div>

			{/* Product Information */}
			<div className="space-y-4 text-sm">
				{/* SKU */}
				<div className="flex items-center gap-4">
					<span className="text-gray-500 text-[16px] w-20">SKU</span>
					<span className="text-gray-500 text-[16px]">:</span>
					<span className="text-gray-600 text-[16px]">SS001</span>
				</div>

				{/* Category */}
				<div className="flex items-center gap-4">
					<span className="text-gray-500 text-[16px] w-20">Category</span>
					<span className="text-gray-500 text-[16px]">:</span>
					<span className="text-gray-600 text-[16px]">Sofas</span>
				</div>

				{/* Tags */}
				<div className="flex items-center gap-4">
					<span className="text-gray-500 w-20 text-[16px] ">Tags</span>
					<span className="text-gray-500 text-[16px]">:</span>
					<div className="flex flex-wrap text-[16px] gap-1">
						{["Sofa", "Chair", "Home", "Shop"].map((tag, index) => (
							<span key={tag} className="text-gray-600">
								{tag}
								{index < 3 && <span className="text-gray-400 ml-1">,</span>}
							</span>
						))}
					</div>
				</div>

				{/* Share */}
				<div className="flex items-center  gap-4">
					<span className="text-gray-500 text-[16px] w-20">Share</span>
					<span className="text-gray-500 text-[16px] ">:</span>
					<div className="flex items-center gap-3">

						<a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
							<img
								src="/asset/Shop/facebook.png"
								alt="LinkedIn"
								className="w-8 h-8 p-1  hover:opacity-80"
							/>
						</a>
						<a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
							<img
								src="/asset/Shop/linkdin.png"
								alt="LinkedIn"
								className="w-8 h-8 p-1  hover:opacity-80"
							/>
						</a>

						<a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
							<img
								src="/asset/Shop/twitter.png"
								alt="Twitter"
								className="w-8 h-8 p-1  hover:opacity-80"
							/>
						</a>
					</div>

				</div>
			</div>

			{/* <div className="flex justify-start items-center gap-1 text-black">
				{[...Array(fullStars)].map((_, i) => (
					<FaStar key={`full-${i}`} fill="black" className="w-4 h-4" />
				))}
				{hasHalf && <StarHalf fill="black" className="w-4 h-4" />}
				{[...Array(emptyStars)].map((_, i) => (
					<FaStar key={`empty-${i}`} className="w-4 h-4" />
				))}
				<span className="ml-1 text-sm font-medium">({count})</span>
			</div>
			<div className="w-full flex justify-start cursor-pointer gap-2 items-center">
				<LuShare2 className="text-[19px] " />
				<h3 className="font-normak">Share</h3>
			</div>
			<div className="w-full mx-auto divide-y divide-gray-200">
				{data.map((item, index) => (
					<div key={index}>
						<button
							className="w-full flex justify-between items-center py-3 font-normal text-[18px] text-left"
							onClick={() => toggle(index)}
						>
							{item.title}
							<IoIosArrowDown
								className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
									}`}
							/>
						</button>
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
								}`}
						>
							<p className="py-2 text-gray-600">{item.content}</p>
						</div>
					</div>
				))}
			</div> */}
		</div>
	)
}

export default Details