'use client';
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import Link from 'next/link';
import allProducts from '@/data/ProductData';

const ITEMS_PER_PAGE = 8;

export default function ProductGrid() {
	const [currentPage, setCurrentPage] = useState(1);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const [filters, setFilters] = useState({
		priceRange: [500, 3000],
		sizes: [],
		colors: [],
		materials: [],
		categories: [],
	});

	const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const visibleProducts = allProducts.slice(startIndex, endIndex);

	const handlePageChange = (pageNum) => {
		setCurrentPage(pageNum);
		window.scrollTo({ top: 500, behavior: 'smooth' });
	};

	const handleApplyFilters = () => {
		setIsFilterOpen(false);
		// Add filtering logic here if needed
	};

	const handleResetFilters = () => {
		setFilters({
			priceRange: [500, 3000],
			sizes: [],
			colors: [],
			materials: [],
			categories: [],
		});
	};

	return (
		<div className="pb-5">
			{/* Filter Button */}
			<div className='flex justify-between px-5 items-center mb-10 w-[100%] lg:ml-[5rem]'>
				<div>
					<h2 className='font-normal font-600 lg:text-[32px]'>
						COLLECTION
					</h2>
				</div>
				<button
					className='bg-[#565449] text-white px-5 py-3'
					onClick={() => setIsFilterOpen(true)}
				>
					Filter
				</button>
			</div>

			{/* Sidebar */}
			<FilterSidebar
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				filters={filters}
				setFilters={setFilters}
				onApply={handleApplyFilters}
				onReset={handleResetFilters}
			/>

			{/* Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px]">
				{visibleProducts.map((product) => (
					<div key={product.id} className="bg-white overflow-hidden group">
						<div className="relative">
							{/* Primary Image */}
							<img
								src={product.image}
								alt={product.title}
								className="w-full lg:h-[408px] h-[200px] object-cover transition-opacity duration-300 lg:group-hover:opacity-0"
							/>
							{/* Hover Image */}
							<img
								src={product.hoverImage}
								alt={`${product.title} hover`}
								className="w-full lg:block hidden lg:h-[408px] h-[200px] object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
							/>
						</div>

						{/* Product Info */}
						<div className="p-3 flex justify-between items-start">
							<div className='flex flex-col gap-2 justify-start items-start'>
								<div>
									<Link href={`shop/${product.id}`}>
										<h3 className="text-sm font-semibold">{product.title}</h3>
									</Link>
									<p className="text-gray-700 font-bold">{product.price}</p>
								</div>
								<div className="flex justify-center items-center gap-2">
									<div className="w-5 h-5 rounded-full bg-[#836953] border border-black"></div>
									<div className="w-5 h-5 rounded-full bg-black border border-black"></div>
									<div className="w-5 h-5 rounded-full bg-white border border-black"></div>
								</div>
							</div>
							<button>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-gray-800"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.435 6.577a5.377 5.377 0 00-7.6 0L12 8.412l-1.835-1.835a5.377 5.377 0 00-7.6 7.6l1.835 1.835L12 21.435l7.6-7.6 1.835-1.835a5.377 5.377 0 000-7.6z"
									/>
								</svg>
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 mt-6 text-sm">
					{/* Previous Button */}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40"
					>
						‹
					</button>

					{(() => {
						const pageNumbers = [];
						if (totalPages <= 7) {
							for (let i = 1; i <= totalPages; i++) {
								pageNumbers.push(i);
							}
						} else {
							pageNumbers.push(1);

							if (currentPage > 4) {
								pageNumbers.push('...');
							}

							const start = Math.max(2, currentPage - 1);
							const end = Math.min(totalPages - 1, currentPage + 1);

							for (let i = start; i <= end; i++) {
								pageNumbers.push(i);
							}

							if (currentPage < totalPages - 3) {
								pageNumbers.push('...');
							}

							pageNumbers.push(totalPages);
						}

						return pageNumbers.map((page, index) => (
							<button
								key={index}
								onClick={() => typeof page === 'number' && handlePageChange(page)}
								disabled={page === '...'}
								className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page
									? 'bg-black text-white'
									: ' text-black'
									} ${page === '...' && 'cursor-default'}`}
							>
								{page}
							</button>
						));
					})()}

					{/* Next Button */}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="w-8 h-8 flex items-center justify-center text-black disabled:opacity-40"
					>
						›
					</button>
				</div>
			)}

		</div>
	);
}
