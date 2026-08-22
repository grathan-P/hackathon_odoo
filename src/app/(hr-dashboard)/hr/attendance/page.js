'use client';

import { useEffect, useState } from 'react';
import { Download, Edit3 } from 'lucide-react';
import { initialAttendance, readMockCollection, writeMockCollection } from '@/lib/mockData';

export default function HRAttendancePage() {
  const [logs, setLogs] = useState([]);
  useEffect(() => { const timeoutId = window.setTimeout(() => setLogs(readMockCollection('attendance', initialAttendance)), 0); return () => window.clearTimeout(timeoutId); }, []);

  const editTime = (log, field) => {
    const value = window.prompt(`Enter ${field === 'checkIn' ? 'check-in' : 'check-out'} time`, log[field]);
    if (!value?.trim()) return;
    const updated = logs.map((item) => item.id === log.id ? { ...item, [field]: value.trim(), status: 'Present' } : item);
    setLogs(updated);
    writeMockCollection('attendance', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-gray-900">Attendance Management</h2><p className="text-xs text-gray-500 mt-0.5">Track daily staff attendance logs</p></div><button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-700"><Download className="w-4 h-4" /> Export Report</button></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-gray-100 text-gray-400"><th className="py-3 px-4">Employee</th><th className="py-3 px-4">Date</th><th className="py-3 px-4">Check In</th><th className="py-3 px-4">Check Out</th><th className="py-3 px-4">Status</th><th className="py-3 px-4">Action</th></tr></thead><tbody className="divide-y divide-gray-50">{logs.map((log) => <tr key={log.id}><td className="py-3 px-4"><strong>{log.name}</strong><span className="block text-[10px] text-gray-400">{log.id}</span></td><td className="py-3 px-4">{log.date}</td><td className="py-3 px-4">{log.checkIn}</td><td className="py-3 px-4">{log.checkOut}</td><td className="py-3 px-4"><span className={`rounded-full px-2.5 py-0.5 text-[10px] ${log.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>{log.status}</span></td><td className="py-3 px-4"><button onClick={() => editTime(log, 'checkIn')} title="Edit check-in" className="mr-2 text-gray-400 hover:text-[#5F3DC4]"><Edit3 className="w-4 h-4" /></button><button onClick={() => editTime(log, 'checkOut')} title="Edit check-out" className="text-gray-400 hover:text-[#5F3DC4]"><Edit3 className="w-4 h-4" /></button></td></tr>)}</tbody></table></div>
    </div>
  );
}
