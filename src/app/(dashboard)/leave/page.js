export default function AttendancePage() {
  const records = [
    { date: 'May 18, 2024', day: 'Sat', checkIn: '09:10 AM', checkOut: '06:05 PM', hours: '8h 55m', status: 'Present', location: 'Bengaluru' },
    { date: 'May 17, 2024', day: 'Fri', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9h 05m', status: 'Present', location: 'Bengaluru' },
    { date: 'May 16, 2024', day: 'Thu', checkIn: '09:12 AM', checkOut: '06:00 PM', hours: '8h 48m', status: 'Present', location: 'Bengaluru' },
    { date: 'May 14, 2024', day: 'Tue', checkIn: '--', checkOut: '--', hours: '--', status: 'Absent', location: '--' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Attendance Log</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-semibold">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Day</th>
              <th className="py-3 px-4">Check In</th>
              <th className="py-3 px-4">Check Out</th>
              <th className="py-3 px-4">Work Hours</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {records.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50">
                <td className="py-3 px-4 font-medium text-gray-900">{row.date}</td>
                <td className="py-3 px-4 text-gray-500">{row.day}</td>
                <td className="py-3 px-4">{row.checkIn}</td>
                <td className="py-3 px-4">{row.checkOut}</td>
                <td className="py-3 px-4">{row.hours}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    row.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}