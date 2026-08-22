'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Send } from 'lucide-react';
import { getMockSession } from '@/lib/mockAuth';
import { initialLeaveRequests, readMockCollection, writeMockCollection } from '@/lib/mockData';

export default function LeavePage() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [form, setForm] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const session = getMockSession();
      setUser(session);
      setRequests(readMockCollection('leave-requests', initialLeaveRequests));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const submitRequest = (event) => {
    event.preventDefault();
    if (!form.startDate || !form.endDate || !form.reason.trim()) { setMessage('Please complete the dates and reason.'); return; }
    if (form.endDate < form.startDate) { setMessage('End date must be after the start date.'); return; }
    const request = { id: `leave-${Date.now()}`, employee: user?.fullName || 'Rahul Sharma', companyName: user?.companyName || 'Odoo India', type: form.type, dates: `${form.startDate} - ${form.endDate}`, days: 1, reason: form.reason.trim(), status: 'Pending' };
    const updated = [...requests, request];
    setRequests(updated);
    writeMockCollection('leave-requests', updated);
    setForm({ ...form, startDate: '', endDate: '', reason: '' });
    setMessage('Application sent to your company HR.');
  };

  const ownRequests = requests.filter((request) => request.employee === user?.fullName);
  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-xs font-semibold uppercase tracking-wide text-[#5F3DC4]">{user?.companyName || 'Company'} HR</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Leave applications</h2><p className="mt-1 text-xs text-gray-500">Submit a request directly to the HR assigned to your company.</p></div><div className="grid grid-cols-1 gap-6 lg:grid-cols-5"><form onSubmit={submitRequest} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-3"><div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4"><CalendarDays className="h-5 w-5 text-[#5F3DC4]" /><h3 className="text-sm font-bold">New leave application</h3></div>{message && <p className="mb-4 rounded-lg bg-purple-50 p-3 text-xs font-medium text-[#5F3DC4]">{message}</p>}<label className="mb-4 block text-xs font-semibold text-gray-700">Leave type<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs"><option>Casual Leave</option><option>Sick Leave</option><option>Work From Home</option><option>Personal Leave</option></select></label><div className="mb-4 grid grid-cols-2 gap-3"><label className="text-xs font-semibold text-gray-700">Start date<input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs" /></label><label className="text-xs font-semibold text-gray-700">End date<input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs" /></label></div><label className="block text-xs font-semibold text-gray-700">Reason<textarea value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} rows="4" placeholder="Tell HR why you need leave" className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-xs" /></label><button type="submit" className="mt-5 flex items-center gap-2 rounded-xl bg-[#5F3DC4] px-4 py-2.5 text-xs font-semibold text-white"><Send className="h-4 w-4" /> Send application</button></form><section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2"><h3 className="text-sm font-bold">My applications</h3><div className="mt-4 space-y-3">{ownRequests.length === 0 ? <p className="text-xs text-gray-500">No applications yet.</p> : ownRequests.map((request) => <div key={request.id} className="border-b border-gray-100 pb-3"><div className="flex justify-between text-xs"><strong>{request.type}</strong><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] text-amber-700">{request.status}</span></div><p className="mt-1 text-[10px] text-gray-500">{request.dates}</p><p className="mt-1 text-xs text-gray-600">{request.reason}</p></div>)}</div></section></div></div>;
}
