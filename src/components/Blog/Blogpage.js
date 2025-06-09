"use client";
import React, { useState } from 'react';
import { FiSearch, FiUser, FiCalendar, FiTag } from 'react-icons/fi';


const blogPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
      image: "/asset/blog/blog1.jpg",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood"
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
      image: "/asset/blog/blog2.jpg",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade"
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.",
      image: "/asset/blog/blog3.jpg",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood"
    }
  ];

  const categories = [
    { name: "Crafts", count: 2 },
    { name: "Design", count: 8 },
    { name: "Handmade", count: 7 },
    { name: "Interior", count: 1 },
    { name: "Wood", count: 6 }
  ];

  const recentPosts = [
    {
      title: "Going all-in with millennial design",
      date: "03 Aug 2022",
      image: "/asset/Blog/post1.jpg",
    },
    {
      title: "Exploring new ways of decorating",
      date: "03 Aug 2022",
    image: "/asset/Blog/post2.jpg",    },
    {
      title: "Handmade pieces that took time to make",
      date: "03 Aug 2022",
    image: "/asset/Blog/post3.jpg",    },
    {
      title: "Modern home in Milan",
      date: "03 Aug 2022",
    image: "/asset/Blog/post4.jpg",    },
    {
      title: "Colorful office redesign",
      date: "03 Aug 2022",
    image: "/asset/Blog/post5.jpg",    }
  ];


export default function Blogpage() {
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8
    const totalPages = 3 // Calculate based on your actual data length
  
    
    const handlePageChange = (page) => {
      setCurrentPage(page)
      // Add logic to fetch new products or filter existing data
    }
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
      }
  }
  

  

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white">
                {/* Featured Image */}
                <div className="mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                </div>

                {/* Post Meta */}
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTag className="w-4 h-4" />
                    <span>{post.category}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h2>

                {/* Post Excerpt */}
                <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="border-b border-gray-900 inline-block">
                  <button className="text-gray-900 font-medium pb-1 hover:text-gray-600 transition-colors">
                    Read more
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search Box */}
            <div className="bg-white">
              <div className="relative">
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  placeholder=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiSearch className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="flex justify-between items-center">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      {category.name}
                    </button>
                    <span className="text-gray-400 text-sm">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 leading-tight mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Component */}
                <div className="mt-[70px] flex justify-center">
                  <div className="flex items-center  gap-[38px]">
                    {/* Page Numbers */}
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 flex  items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[#B88E2F] text-white"
                            : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`px-6 h-12 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
      </div>
    </div>
  );
}