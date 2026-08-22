'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5F3DC4] rounded-xl flex items-center justify-center p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2ZM4.8 19C5.46 17.02 7.55 16 12 16C16.45 16 18.54 17.02 19.2 19L20 22H4L4.8 19Z" />
              <path d="M19 8C20.66 8 22 6.66 22 5C22 3.34 20.66 2 19 2C17.34 2 16 3.34 16 5C16 6.66 17.34 8 19 8Z" opacity="0.6" />
              <path d="M5 8C6.66 8 8 6.66 8 5C8 3.34 6.66 2 5 2C3.34 2 2 3.34 2 5C2 6.66 3.34 8 5 8Z" opacity="0.6" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">DAYFLOW</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Human Resource Management System</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              pathname === '/' ? 'text-[#6D36F6] font-semibold border-b-2 border-[#6D36F6] pb-1' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition ${
              pathname === '/about' ? 'text-[#6D36F6] font-semibold border-b-2 border-[#6D36F6] pb-1' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            About
          </Link>
          
          {pathname === '/signup' ? (
            <Link
              href="/"
              className="bg-[#6D36F6] hover:bg-[#5F3DC4] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
            >
              Sign In
            </Link>
          ) : (
            <Link
              href="/signup"
              className="bg-[#6D36F6] hover:bg-[#5F3DC4] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
            >
              Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}