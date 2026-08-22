'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  CalendarCheck, 
  CalendarDays, 
  Wallet, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
    { name: 'Leave', icon: CalendarDays, path: '/leave' },
    { name: 'Payroll', icon: Wallet, path: '/payroll' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between h-screen sticky top-0">
      <div className="p-6">
        {/* Brand Header */}
        <Link href="/dashboard" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#5F3DC4] rounded-xl flex items-center justify-center p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2ZM4.8 19C5.46 17.02 7.55 16 12 16C16.45 16 18.54 17.02 19.2 19L20 22H4L4.8 19Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">DAYFLOW</h1>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">HR Management System</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#F3EFEF] text-[#5F3DC4] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#5F3DC4]' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Nav Links */}
      <div className="p-6 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition">
          <Settings className="w-5 h-5 text-gray-500" />
          Settings
        </button>
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Log Out
        </Link>
      </div>
    </aside>
  );
}