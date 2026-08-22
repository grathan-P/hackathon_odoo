const STORAGE_PREFIX = 'dayflow-mock-';

export const initialEmployees = [
  { id: 'OIRSHA20240001', name: 'Rahul Sharma', email: 'rahul@dayflow.test', dept: 'Engineering', role: 'Software Developer', status: 'Active', phone: '9876543211', joiningYear: 2024, companyName: 'Odoo India' },
  { id: 'OISP20240002', name: 'Sneha Patil', email: 'sneha@dayflow.test', dept: 'Marketing', role: 'Marketing Executive', status: 'Active', phone: '9876543212', joiningYear: 2024, companyName: 'Odoo India' },
  { id: 'OIAK20240003', name: 'Amit Kumar', email: 'amit@dayflow.test', dept: 'Engineering', role: 'UI/UX Designer', status: 'Active', phone: '9876543213', joiningYear: 2024, companyName: 'Odoo India' },
  { id: 'OIVJ20230004', name: 'Vikram Joshi', email: 'vikram@dayflow.test', dept: 'Sales', role: 'Sales Executive', status: 'Active', phone: '9876543214', joiningYear: 2023, companyName: 'Odoo India' },
  { id: 'OINS20230005', name: 'Neha Sharma', email: 'neha@dayflow.test', dept: 'HR', role: 'HR Executive', status: 'Active', phone: '9876543215', joiningYear: 2023, companyName: 'Odoo India' },
  { id: 'OIRM20220006', name: 'Rohan Mehta', email: 'rohan@dayflow.test', dept: 'Finance', role: 'Accountant', status: 'Inactive', phone: '9876543216', joiningYear: 2022, companyName: 'Odoo India' },
  { id: 'OIPS20250007', name: 'Pooja Singh', email: 'pooja@dayflow.test', dept: 'Engineering', role: 'QA Engineer', status: 'Active', phone: '9876543217', joiningYear: 2025, companyName: 'Odoo India' },
  { id: 'OIIV20250008', name: 'Isha Verma', email: 'isha@dayflow.test', dept: 'Marketing', role: 'Content Writer', status: 'Active', phone: '9876543218', joiningYear: 2025, companyName: 'Odoo India' },
];

export const initialAttendance = initialEmployees.slice(0, 6).map((employee, index) => ({
  id: employee.id,
  name: employee.name,
  date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  checkIn: index === 3 ? '--' : '09:0' + (5 + index) + ' AM',
  checkOut: index === 3 || index === 5 ? '--' : '06:0' + index + ' PM',
  status: index === 5 ? 'Leave' : index === 3 ? 'Absent' : 'Present',
}));

export const initialLeaveRequests = [
  { id: 'leave-1', employee: 'Amit Kumar', companyName: 'Odoo India', type: 'Casual Leave', dates: 'May 17 - May 19, 2024', days: 3, reason: 'Family Function', status: 'Pending' },
  { id: 'leave-2', employee: 'Sneha Patil', companyName: 'Odoo India', type: 'Sick Leave', dates: 'May 20 - May 21, 2024', days: 2, reason: 'Not feeling well', status: 'Pending' },
  { id: 'leave-3', employee: 'Vikram Joshi', companyName: 'Odoo India', type: 'Personal Leave', dates: 'May 18, 2024', days: 1, reason: 'Personal Work', status: 'Approved' },
  { id: 'leave-4', employee: 'Neha Sharma', companyName: 'Odoo India', type: 'Casual Leave', dates: 'May 22 - May 24, 2024', days: 3, reason: 'Travel', status: 'Pending' },
  { id: 'leave-5', employee: 'Rahul Sharma', companyName: 'Odoo India', type: 'Work From Home', dates: 'May 17, 2024', days: 1, reason: 'Doctor Appointment', status: 'Approved' },
];

export const initialPendingRegistrations = [
  { id: 'registration-1', fullName: 'Arjun Rao', email: 'arjun@dayflow.test', phone: '9876543220', dept: 'Engineering', role: 'Frontend Developer', joiningYear: 2026, status: 'Pending' },
];

export function readMockCollection(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const saved = window.localStorage.getItem(`${STORAGE_PREFIX}${name}`);
  return saved ? JSON.parse(saved) : fallback;
}

export function writeMockCollection(name, value) {
  window.localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('dayflow-mock-data-updated', { detail: name }));
}

export function generateEmployeeId(fullName, joiningYear, employees) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = `${parts[0]?.[0] || 'E'}${parts.at(-1)?.[0] || 'E'}`.toUpperCase();
  const yearSerial = employees.filter((employee) => String(employee.joiningYear) === String(joiningYear)).length + 1;
  return `OI${initials}${joiningYear}${String(yearSerial).padStart(4, '0')}`;
}
