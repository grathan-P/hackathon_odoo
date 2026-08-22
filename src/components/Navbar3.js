'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';
import { initialPendingRegistrations, readMockCollection } from '@/lib/mockData';

export default function Navbar3() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setUser(getMockSession()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const loadNotifications = () => setNotifications(readMockCollection('pending-registrations', initialPendingRegistrations));
    loadNotifications();
    window.addEventListener('dayflow-mock-data-updated', loadNotifications);
    return () => window.removeEventListener('dayflow-mock-data-updated', loadNotifications);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search employees, leave, attendance..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-700 outline-none focus:ring-2 focus:ring-[#5F3DC4]/20 focus:border-[#5F3DC4]"
        />
        {query && <div className="absolute left-0 top-11 z-50 w-full rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-500 shadow-lg">Searching HR records for <strong className="text-gray-800">{query}</strong></div>}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-50 transition" aria-label="Open notifications">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-white"></span>}
        </button>

        {showNotifications && (
          <div className="absolute right-28 top-14 z-50 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold">Notifications</h3><span className="text-[10px] text-gray-400">{notifications.length} pending</span></div>
            {notifications.length === 0 ? <p className="text-xs text-gray-500">You are all caught up.</p> : notifications.map((item) => <p key={item.id} className="border-b border-gray-100 py-2 text-xs text-gray-600">New registration request from <strong>{item.fullName}</strong></p>)}
          </div>
        )}

        <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 overflow-hidden flex items-center justify-center font-bold text-sm text-[#5F3DC4]">
            PV
          </div>
          <div className="text-left hidden sm:block">
            <h4 className="text-xs font-bold text-gray-800 leading-none">{user?.fullName || 'HR Manager'}</h4>
            <span className="text-[10px] text-gray-500 font-medium">HR Manager</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        {showProfile && <div className="absolute right-8 top-14 z-50 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"><Link href="/profile" className="block rounded-lg px-3 py-2 text-xs hover:bg-gray-50">My Profile</Link><Link href="/" className="block rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-50">Log Out</Link></div>}
      </div>
    </header>
  );
}