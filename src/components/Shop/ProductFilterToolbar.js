import { FiFilter, FiList } from "react-icons/fi"
import { BsGrid3X3Gap } from "react-icons/bs"
import { IoChevronDown } from "react-icons/io5"

export default function ProductFilterToolbar() {
  return (
    <div className="w-full bg-stone-100 px-16 py-8 border-b border-stone-200 bg-[#F9F1E7] flex flex-col sm:flex-row items-center justify-center gap-4">
      
        {/* Left Section - Filter and View Controls */}
        <div className="flex items-center gap-3 ">
          {/* Filter Button */}
          <div className="flex items-center gap-2 px-3 py-2 text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-stone-200 rounded-md transition-colors">
            <img src="/asset/Shop/system-filtering.png" alt="Filter" className="w-5 h-5" />
            <span className="text-sm font-medium">Filter</span>
          </div>


          {/* View Toggle Buttons */}
          <div className="flex items-center overflow-hidden">
            <div className="px-3 py-2 text-gray-900  cursor-pointer">
              <img src="/asset/Shop/grid-big-round.png" alt="Filter" className="w-5 h-5" />
            </div>
            <div className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-stone-200 cursor-pointer transition-colors">
              <img src="/asset/Shop/view-list.png" alt="Filter" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Center Section - Results Count */}
        <div className="flex-1 text-center sm:text-left">
          <span className="p-2 text-[16px] border-l-2 border-[#9F9F9F] text-gray-600">Showing 1–16 of 32 results</span>
        </div>

        {/* Right Section - Show and Sort Controls */}
        <div className="flex items-center gap-4">
          {/* Show Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[20px] text-gray-700 font-medium">Show</span>
            <div className="flex items-center gap-1 px-2 py-1 text-gray-600 bg-white hover:text-gray-900 hover:bg-stone-200  cursor-pointer transition-colors">
              <span className="text-[20px]">16</span>
              <IoChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[20px] text-gray-700 font-medium">Sort by</span>
            <div className="flex items-center gap-1 px-2 py-1 text-gray-600 bg-white hover:text-gray-900 hover:bg-stone-200  cursor-pointer transition-colors">
              <span className="text-[20px]">Default</span>
              <IoChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

  )
}
