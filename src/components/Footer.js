import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0D0B26] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#6D36F6] rounded-lg flex items-center justify-center p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full">
                <path d="M12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2ZM4.8 19C5.46 17.02 7.55 16 12 16C16.45 16 18.54 17.02 19.2 19L20 22H4L4.8 19Z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-wide">DAYFLOW</span>
          </div>
          <p className="text-xs text-gray-400">Human Resource Management System</p>
          <p className="text-xs text-gray-400">Simplify HR. Empower People.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-200">Quick Links</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-200">Support</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-200">Connect With Us</h4>
          <div className="flex gap-3 text-gray-400">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6D36F6] hover:text-white transition text-xs font-bold">f</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6D36F6] hover:text-white transition text-xs font-bold">in</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6D36F6] hover:text-white transition text-xs font-bold">tw</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6D36F6] hover:text-white transition text-xs font-bold">ig</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        © 2026 Dayflow HRMS. All rights reserved.
      </div>
    </footer>
  );
}