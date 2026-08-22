CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM ('employee', 'hr');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'half-day', 'leave');

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE RESTRICT,
  employee_id VARCHAR(50) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'employee',
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  job_title VARCHAR(100),
  department VARCHAR(100),
  salary_structure JSONB NOT NULL DEFAULT '{}'::jsonb,
  requires_password_change BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX one_hr_per_company ON profiles(company_id) WHERE role = 'hr';

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIMESTAMPTZ,
  check_out TIMESTAMPTZ,
  status attendance_status NOT NULL DEFAULT 'absent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hr_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE RESTRICT,
  leave_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL CHECK (days > 0),
  reason TEXT NOT NULL,
  status leave_status NOT NULL DEFAULT 'pending',
  hr_comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (end_date >= start_date)
);

CREATE TABLE payroll_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE RESTRICT,
  pay_period DATE NOT NULL,
  gross_amount NUMERIC(12, 2) NOT NULL CHECK (gross_amount >= 0),
  deductions NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (deductions >= 0),
  net_amount NUMERIC(12, 2) GENERATED ALWAYS AS (gross_amount - deductions) STORED,
  status VARCHAR(30) NOT NULL DEFAULT 'paid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(employee_id, pay_period)
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company members can view company" ON companies FOR SELECT USING (id IN (SELECT company_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "HR can view company profiles" ON profiles FOR SELECT USING (company_id IN (SELECT company_id FROM profiles WHERE id = auth.uid() AND role = 'hr'));
CREATE POLICY "Users can view own attendance" ON attendance FOR SELECT USING (employee_id = auth.uid());
CREATE POLICY "HR can manage company attendance" ON attendance FOR ALL USING (employee_id IN (SELECT id FROM profiles WHERE company_id IN (SELECT company_id FROM profiles WHERE id = auth.uid() AND role = 'hr')));
CREATE POLICY "Employees can create own leave" ON leave_requests FOR INSERT WITH CHECK (employee_id = auth.uid());
CREATE POLICY "Employees and HR can view leaves" ON leave_requests FOR SELECT USING (employee_id = auth.uid() OR hr_id = auth.uid());
CREATE POLICY "HR can update company leaves" ON leave_requests FOR UPDATE USING (hr_id = auth.uid());
CREATE POLICY "Employees can view own payroll" ON payroll_records FOR SELECT USING (employee_id = auth.uid());
CREATE POLICY "HR can manage company payroll" ON payroll_records FOR ALL USING (company_id IN (SELECT company_id FROM profiles WHERE id = auth.uid() AND role = 'hr'));
