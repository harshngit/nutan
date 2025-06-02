'use client';
import { Slider } from '@material-tailwind/react';
import React, { useState } from 'react';

export default function FilterSidebar({
	isOpen,
	onClose,
	filters,
	setFilters,
	onApply,
	onReset,
}) {
	const [activeTab, setActiveTab] = useState('price');

	const sizes = ['XS', 'S', 'M', 'L', 'XL'];
	const colors = ['#000000', '#FFFFFF', '#C2B280', '#A0522D', '#808080'];
	const materials = ['Cotton', 'Polyester', 'Linen', 'Wool'];
	const categories = ['For Him', 'For Her', 'Arabic', 'Signature'];

	const handlePriceChange = (_, newValue) => {
		setFilters({ ...filters, priceRange: newValue });
	};

	const handleCheckboxChange = (key, value) => {
		const current = filters[key];
		setFilters({
			...filters,
			[key]: current.includes(value)
				? current.filter((item) => item !== value)
				: [...current, value],
		});
	};

	return (
		<div
			className={`
        fixed lg:top-[8rem] top-[7rem] right-0 lg:w-[40%] w-[80%] h-full 
        bg-[#D9D9D9] shadow-xl 
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
		>
			{/* Header */}
			<div className="grid grid-cols-5 px-6 py-5 border-b border-gray-200">
				<h2 className="col-span-4 text-center font-bold text-gray-900 uppercase tracking-wider">
					Filters
				</h2>
				<button
					onClick={onClose}
					className="col-span-1 text-2xl text-black hover:text-white"
				>
					&times;
				</button>
			</div>

			{/* Tabs - Replace with divs */}
			<div className="flex lg:h-[calc(76%-100px)] h-[calc(70%-100px)]">
				<div className="lg:w-40 bg-transparent border-r border-gray-200 rounded-none">
					{['price', 'size', 'color', 'material', 'category'].map((val) => (
						<div
							key={val}
							onClick={() => setActiveTab(val)}
							className={`
                relative cursor-pointer text-left text-sm py-3 px-4 font-medium transition
                ${activeTab === val
									? `text-[#A6784B]
                     before:content-['']
                     before:absolute before:left-0 before:top-0
                     before:h-full before:w-3
                     before:bg-[#A6784B]
                     before:rounded-tr-full before:rounded-br-full`
									: 'text-gray-700 hover:text-black'}
              `}
						>
							{val.charAt(0).toUpperCase() + val.slice(1)}
						</div>
					))}
				</div>

				{/* Tab Panels */}
				<div className="flex-1 overflow-y-auto">
					{activeTab === 'price' && (
						<div className="p-5">
							<h3 className="text-sm font-semibold text-[#A6784B] mb-3">
								Select Price Range
							</h3>
							<Slider
								value={filters.priceRange}
								min={500}
								max={3000}
								onChange={handlePriceChange}
								valueLabelDisplay="auto"
							/>
							<div className="flex justify-between text-sm text-black mt-2">
								<span>Rs. {filters.priceRange[0]}</span>
								<span>Rs. {filters.priceRange[1]}</span>
							</div>
						</div>
					)}

					{activeTab === 'size' && (
						<div className="p-5">
							<h3 className="text-sm font-semibold text-[#A6784B] mb-3">
								Select Sizes
							</h3>
							<div className="flex flex-wrap gap-2">
								{sizes.map((size) => (
									<button
										key={size}
										onClick={() => handleCheckboxChange('sizes', size)}
										className={`px-3 py-1 border rounded-full text-sm transition ${filters.sizes.includes(size)
											? 'bg-black text-white border-black'
											: 'bg-white text-black border-gray-300'
											}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}

					{activeTab === 'color' && (
						<div className="p-5">
							<h3 className="text-sm font-semibold text-[#A6784B] mb-3">
								Select Colors
							</h3>
							<div className="flex flex-wrap gap-3">
								{colors.map((color) => (
									<button
										key={color}
										onClick={() => handleCheckboxChange('colors', color)}
										className={`w-7 h-7 rounded-full border-2 transition ${filters.colors.includes(color)
											? 'ring-2 ring-black'
											: 'border-gray-300'
											}`}
										style={{ backgroundColor: color }}
									/>
								))}
							</div>
						</div>
					)}

					{activeTab === 'material' && (
						<div className="p-5">
							<h3 className="text-sm font-semibold text-[#A6784B] mb-3">
								Select Materials
							</h3>
							<div className="flex flex-col gap-2 text-sm">
								{materials.map((material) => (
									<label key={material} className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={filters.materials.includes(material)}
											onChange={() =>
												handleCheckboxChange('materials', material)
											}
										/>
										{material}
									</label>
								))}
							</div>
						</div>
					)}

					{activeTab === 'category' && (
						<div className="p-5">
							<h3 className="text-sm font-semibold text-[#A6784B] mb-3">
								Select Category
							</h3>
							<div className="flex flex-col gap-2 text-sm">
								{categories.map((cat) => (
									<label key={cat} className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={filters.categories.includes(cat)}
											onChange={() =>
												handleCheckboxChange('categories', cat)
											}
										/>
										{cat}
									</label>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Footer Buttons */}
			<div className="p-5 border-t border-gray-200 flex justify-start gap-10">
				<button
					onClick={onReset}
					className="px-5 py-2 border bg-white text-sm border-gray-400 text-gray-700 rounded-full hover:bg-gray-100"
				>
					Reset
				</button>
				<button
					onClick={onApply}
					className="px-6 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800"
				>
					Apply Filters
				</button>
			</div>
		</div>
	);
}
