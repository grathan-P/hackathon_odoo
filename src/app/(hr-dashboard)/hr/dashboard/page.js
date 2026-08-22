'use client';

import { useEffect, useState } from 'react';
import { initialAttendance, initialLeaveRequests, readMockCollection } from '@/lib/mockData';

export default function HDashboardPage() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  useEffect(() => {
    const load = () => {
      setAttendance(readMockCollection('attendance', initialAttendance));
      setLeaveRequests(readMockCollection('leave-requests', initialLeaveRequests));
    };
    const timeoutId = window.setTimeout(load, 0);
    window.addEventListener('dayflow-mock-data-updated', load);
    return () => { window.clearTimeout(timeoutId); window.removeEventListener('dayflow-mock-data-updated', load); };
  }, []);
  const present = attendance.filter((item) => item.status === 'Present').length;
  const onLeave = attendance.filter((item) => item.status === 'Leave').length;
  const pending = leaveRequests.filter((item) => item.status === 'Pending').length;
  const cards = [['Total Employees', '128'], ['Present Today', present], ['On Leave', onLeave], ['Total Payroll (May)', '₹ 12,45,860'], ['Pending Requests', pending]];
  return <div className="space-y-8"><div><h2 className="text-2xl font-bold text-gray-900">Good morning, Priya! 👋</h2><p className="mt-1 text-xs text-gray-500">Here&apos;s what&apos;s happening in your organization today.</p></div><div className="grid grid-cols-2 gap-4 lg:grid-cols-5">{cards.map(([label, value]) => <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><span className="text-xs font-semibold text-gray-500">{label}</span><h3 className="mt-1 text-2xl font-bold text-gray-900">{value}</h3></div>)}</div><div className="grid grid-cols-1 gap-6 xl:grid-cols-5"><div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-3"><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-gray-900">Attendance Overview</h3><select className="rounded-lg border border-gray-200 px-2 py-1 text-xs"><option>This Week</option><option>This Month</option></select></div><div className="mt-6 flex h-56 items-end gap-3 border-b border-l border-gray-100 px-3 pb-2">{[62, 76, 68, 82, 58, 74, 68].map((height, index) => <div key={index} className="flex-1 rounded-t-lg bg-emerald-400" style={{ height: `${height}%` }} title={`Day ${index + 1}: ${height}% present`} />)}</div><div className="mt-3 flex justify-between text-[10px] text-gray-400"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div className="mt-4 flex gap-5 text-[10px] text-gray-500"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />Present</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-red-400" />Absent</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400" />Leave</span></div></div><div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2"><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-gray-900">Leave Requests</h3><a href="/hr/leave-requests" className="text-xs font-semibold text-[#5F3DC4]">View All</a></div><div className="mt-4 space-y-3">{leaveRequests.slice(0, 4).map((request) => <div key={request.id} className="flex items-center justify-between border-b border-gray-50 pb-3 text-xs"><div><h4 className="font-semibold text-gray-800">{request.employee}</h4><p className="text-[10px] text-gray-400">{request.dates}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${request.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : request.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{request.status}</span></div>)}</div></div></div></div>;
}
