'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, CalendarDays, ChevronDown, Menu } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';
import { initialLeaveRequests, readMockCollection } from '@/lib/mockData';

export default function Navbar2() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const load = () => {
      const session = getMockSession();
      setUser(session);
      const requests = readMockCollection('leave-requests', initialLeaveRequests);
      setNotifications(requests.filter((request) => request.employee === session?.fullName));
    };
    const timeoutId = window.setTimeout(load, 0);
    window.addEventListener('dayflow-mock-data-updated', load);
    return () => { window.clearTimeout(timeoutId); window.removeEventListener('dayflow-mock-data-updated', load); };
  }, []);

  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
  const initials = user?.fullName?.split(' ').map((part) => part[0]).join('').slice(0, 2) || 'EM';

  return (
    <header className="flex min-h-16 items-center justify-between border-b border-gray-100 bg-white px-8 py-3 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 md:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
        <div className="flex items-center gap-3 rounded-xl bg-purple-50 px-3 py-2"><CalendarDays className="h-4 w-4 text-[#5F3DC4]" /><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#5F3DC4]">Today</p><p className="text-xs font-semibold text-gray-700">{today}</p></div></div>
        <Link href="/attendance" className="hidden rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 sm:block">View attendance</Link>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-50" aria-label="Open notifications"><Bell className="h-5 w-5" />{notifications.length > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />}</button>
        {showNotifications && <div className="absolute right-24 top-14 z-50 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl"><h3 className="mb-2 text-sm font-bold">Notifications</h3>{notifications.length === 0 ? <p className="text-xs text-gray-500">No new notifications.</p> : notifications.map((item) => <div key={item.id} className="border-b border-gray-100 py-2 text-xs"><strong>{item.type}</strong> request is <span className="font-semibold">{item.status.toLowerCase()}</span>.</div>)}</div>}
        <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-3 border-l border-gray-100 pl-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-[#5F3DC4]">{initials}</span><span className="hidden text-left sm:block"><strong className="block text-xs text-gray-800">{user?.fullName || 'Employee'}</strong><small className="text-[10px] text-gray-500">Employee</small></span><ChevronDown className="h-4 w-4 text-gray-400" /></button>
        {showProfile && <div className="absolute right-8 top-14 z-50 w-40 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"><Link href="/profile" className="block rounded-lg px-3 py-2 text-xs hover:bg-gray-50">My Profile</Link><Link href="/" className="block rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-50">Log Out</Link></div>}
      </div>
    </header>
  );
}
