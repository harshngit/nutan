import React, { useEffect, useState } from "react";
import { FaHeart, FaShare, FaStar, FaStarOfLife } from 'react-icons/fa';
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
			<div className='flex justify-between items-center w-full'>
				<p className='font-thin text-[15px] text-[#666666]'>DF</p>
				<FaHeart className='text-[#F24822] text-[25px]' />
			</div>
			<div className='flex justify-start w-full'>
				<h2 className='font-normal text-[25px] text-[#000]'>FOR HIM</h2>
			</div>
			<div className='flex justify-start items-center gap-5 w-full'>
				<h2 className='font-normal text-[27px] text-[#000]'>$39.00
					<span className='text-[18px] text-[#442D2D]'> $59.00</span>
				</h2>
				<div className='bg-[#836953] rounded-xl text-[12px] text-white px-3 py-1'>SAVE 33%</div>
			</div>
			<div className='flex justify-start items-center gap-5 w-full'>
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
			</div>
			<div className='flex justify-start items-center w-full'>
				<p className='font-400 text-[18px] text-[#666666]'>Only <span className="font-bold">9</span> item(s) left in stock!</p>
			</div>
			<div className=" w-full">
				{/* Size */}
				<div className="flex justify-between items-center mb-4">
					<div className="text-lg font-semibold">
						Size: <span className="font-normal">{selectedSize}</span>
					</div>
					<a href="#" className="underline font-medium text-black hover:text-blue-600">
						Size Guide
					</a>
				</div>
				<div className="flex gap-4 mb-6">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`w-10 h-10  text-sm font-medium rounded transition-all duration-150 ${selectedSize === size
								? "bg-black text-white"
								: "bg-white text-black border-black hover:bg-gray-100"
								}`}
						>
							{size}
						</button>
					))}
				</div>

				{/* Color */}
				<div className="text-lg font-semibold mb-2">
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
			<div className="w-full px-4 py-4 text-center bg-black cursor-pointer text-white font-normal text-[18px]">
				Add to Cart
			</div>
			<div className="flex justify-start items-center gap-1 text-black">
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
			</div>
		</div>
	)
}

export default Details