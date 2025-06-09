import Link from "next/link"
import { FaChevronRight } from "react-icons/fa";

export default function BreadcrumbHero() {
  return (
    <div
      className="relative w-full h-[300px] flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: ` url('/asset/Shop/Rectangle 1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <div className="mb-1">
        <div className="w-16 h-12 flex items-center justify-center">
          <img 
            src="/asset/Shop/banner-logo.png" 
            alt="Icon"
            className="w-32 h-32 object-contain" 
          />
        </div>
      </div>


      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop</h1>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="text-black transition-colors duration-200">
          Home
        </Link>
        <FaChevronRight className="w-4 h-4 text-black" />
        <span className="text-gray-900 font-medium">Shop</span>
      </nav>
    </div>
  )
}
