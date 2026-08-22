'use client';

import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, Wallet } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';
import { initialAttendance, initialLeaveRequests, readMockCollection } from '@/lib/mockData';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [greeting, setGreeting] = useState('Good day');

  useEffect(() => {
    const load = () => {
      const session = getMockSession();
      setUser(session);
      setAttendance(readMockCollection('attendance', initialAttendance));
      setLeaveRequests(readMockCollection('leave-requests', initialLeaveRequests));
      const hour = new Date().getHours();
      setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
    };
    const timeoutId = window.setTimeout(load, 0);
    window.addEventListener('dayflow-mock-data-updated', load);
    return () => { window.clearTimeout(timeoutId); window.removeEventListener('dayflow-mock-data-updated', load); };
  }, []);

  const employeeName = user?.fullName || 'there';
  const employeeRecord = attendance.find((record) => record.name === user?.fullName) || attendance[0];
  const employeeLeaves = leaveRequests.filter((request) => request.employee === user?.fullName);
  const cards = [
    { label: 'Today\'s attendance', value: employeeRecord?.checkIn || '--', detail: employeeRecord?.status || 'Not marked', icon: Clock, color: 'emerald' },
    { label: 'Leave balance', value: '12 days', detail: `${employeeLeaves.filter((request) => request.status === 'Approved').length} approved requests`, icon: Calendar, color: 'purple' },
    { label: 'Monthly salary', value: '₹54,860', detail: 'May 2024 payroll', icon: Wallet, color: 'amber' },
    { label: 'Working days', value: '18 / 22', detail: 'Days completed', icon: CheckCircle2, color: 'blue' },
  ];

  const colorClasses = { emerald: 'bg-emerald-50 text-emerald-600', purple: 'bg-purple-50 text-purple-600', amber: 'bg-amber-50 text-amber-600', blue: 'bg-blue-50 text-blue-600' };
  return <div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-wide text-[#5F3DC4]">Employee workspace</p><h2 className="mt-1 text-2xl font-bold text-gray-900">{greeting}, {employeeName}!</h2><p className="mt-1 text-xs text-gray-500">Your workday at a glance.</p></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{cards.map(({ label, value, detail, icon: Icon, color }) => <div key={label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-gray-500">{label}</span><div className={`rounded-xl p-2 ${colorClasses[color]}`}><Icon className="h-4 w-4" /></div></div><h3 className="mt-4 text-2xl font-bold text-gray-900">{value}</h3><span className="mt-2 block text-xs text-gray-400">{detail}</span></div>)}</div><div className="grid grid-cols-1 gap-6 lg:grid-cols-2"><section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="text-sm font-bold text-gray-900">Recent leave applications</h3><div className="mt-4 space-y-3">{(employeeLeaves.length ? employeeLeaves : leaveRequests.slice(0, 3)).map((request) => <div key={request.id} className="flex items-center justify-between border-b border-gray-50 pb-3 text-xs"><div><strong className="block text-gray-800">{request.type}</strong><span className="text-gray-400">{request.dates}</span></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-600">{request.status}</span></div>)}</div></section><section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="text-sm font-bold text-gray-900">Today&apos;s focus</h3><p className="mt-3 text-sm leading-6 text-gray-600">Keep your attendance record current and review any leave updates from HR.</p><a href="/attendance" className="mt-5 inline-block rounded-xl bg-[#5F3DC4] px-4 py-2.5 text-xs font-semibold text-white">Open attendance</a></section></div></div>;
}
