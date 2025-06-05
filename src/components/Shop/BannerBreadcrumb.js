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
      {/* <div className="mb-6">
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-500" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z" />
          </svg>
        </div>
      </div> */}

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
