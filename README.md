# Dayflow HRMS

Dayflow is a human resource management system for companies and their employees. It brings employee information, attendance, leave management, payroll, and HR administration into one focused workspace.

## Features

### Employee workspace

- Time-aware dashboard greeting
- Attendance overview and workday actions
- Check-in and check-out tracking
- Leave applications with status history
- Payroll summary and salary history
- Professional employee profile
- Notifications for leave updates

### HR workspace

- Organization dashboard with attendance and leave summaries
- Employee directory with search and employee details
- Employee profile actions and attendance controls
- Attendance record management
- Leave request approval and rejection
- Employee registration approval
- Company-based HR administration
- Notifications for new registration requests

## Technology

- Next.js App Router
- React
- Tailwind CSS
- Lucide React icons
- Supabase

## Project Structure

```text
src/
  app/
    page.js                         Sign-in page
    signup/page.js                  Account registration
    (dashboard)/                    Employee workspace routes
    (hr-dashboard)/                 HR workspace routes
  components/                       Shared navigation and layout components
  data/                             Application seed data
  lib/                              Authentication and data-access helpers
supabase/
  schema.sql                        Database schema and security policies
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- A Supabase project

### Install dependencies

```bash
npm install
```

### Configure Supabase

Create a `.env.local` file in the project root with the following values from your Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Keep `.env.local` private and do not commit it.

To create the database tables, run [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL Editor.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Commands

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Start the production server
```

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Sign in |
| `/signup` | Register an account |
| `/dashboard` | Employee dashboard |
| `/profile` | Employee profile |
| `/attendance` | Employee attendance |
| `/leave` | Employee leave applications |
| `/payroll` | Employee payroll |
| `/hr/dashboard` | HR dashboard |
| `/hr/employees` | HR employee directory |
| `/hr/attendance` | HR attendance management |
| `/hr/leave-requests` | HR leave approvals |
| `/hr/pending-registrations` | HR registration approvals |

## Database Design

The Supabase schema includes companies, user profiles, attendance records, leave requests, and payroll records. Each company has one HR account enforced by a database constraint. Leave requests store both the employee and the responsible company HR so requests remain within the correct organization.
