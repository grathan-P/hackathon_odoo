-- Create custom types
CREATE TYPE user_role AS ENUM ('employee', 'admin');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE leave_type AS ENUM ('paid', 'sick', 'unpaid');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'half-day', 'leave');

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. OIJODO20220001
  full_name VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'employee',
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  job_title VARCHAR(100),
  department VARCHAR(100),
  salary_structure JSONB DEFAULT '{}'::jsonb,
  avatar_url TEXT,
  requires_password_change BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Attendance Table
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIMESTAMPTZ,
  check_out TIMESTAMPTZ,
  status attendance_status DEFAULT 'absent',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- 3. Leaves Table
CREATE TABLE leaves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type leave_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status leave_status DEFAULT 'pending',
  remarks TEXT,
  admin_comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sequence for Employee ID Generation per year
-- We can handle the exact formatting in the backend/Edge functions or Application Logic.
-- We will generate the ID in the Next.js API route when creating the user.

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaves ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
-- Only service role (admin API) can insert profiles, or super admin. 
-- Since we are handling creation via Next.js server actions using Service Role key, we don't need an INSERT policy for normal users.
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Attendance RLS
CREATE POLICY "Users can view own attendance" ON attendance FOR SELECT USING (auth.uid() = employee_id);
-- Admins can view all attendance
CREATE POLICY "Admins can view all attendance" ON attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can insert own attendance" ON attendance FOR INSERT WITH CHECK (auth.uid() = employee_id);
CREATE POLICY "Users can update own attendance" ON attendance FOR UPDATE USING (auth.uid() = employee_id);
CREATE POLICY "Admins can update all attendance" ON attendance FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Leaves RLS
CREATE POLICY "Users can view own leaves" ON leaves FOR SELECT USING (auth.uid() = employee_id);
CREATE POLICY "Admins can view all leaves" ON leaves FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can insert own leaves" ON leaves FOR INSERT WITH CHECK (auth.uid() = employee_id);
CREATE POLICY "Users can update own leaves" ON leaves FOR UPDATE USING (auth.uid() = employee_id);
CREATE POLICY "Admins can update all leaves" ON leaves FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Function to handle new user signup from Supabase Auth (for the initial admin or if we decide to use triggers)
-- But since we are creating users manually via API, we'll let our API handle inserting into `profiles`.
