'use client';

import { useEffect, useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';

export default function Navbar2() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setUser(getMockSession()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button className="text-gray-500 hover:text-gray-700 md:hidden">
          <Menu className="w-5 h-5" />
        </button>
        {/* Search Field */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-700 outline-none focus:ring-2 focus:ring-[#5F3DC4]/20 focus:border-[#5F3DC4]"
          />
        </div>
      </div>

      {/* Notifications & User Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-50 transition">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 overflow-hidden flex items-center justify-center font-bold text-sm text-[#5F3DC4]">
            RS
          </div>
          <div className="text-left hidden sm:block">
            <h4 className="text-xs font-bold text-gray-800 leading-none">{user?.fullName || 'Employee'}</h4>
            <span className="text-[10px] text-gray-500 font-medium">Employee</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}