import defaultUsers from '@/data/mockUsers.json';
import { generateEmployeeId, initialEmployees } from '@/lib/mockData';

const USERS_KEY = 'dayflow-mock-users';
const SESSION_KEY = 'dayflow-mock-session';

function readUsers() {
  if (typeof window === 'undefined') return defaultUsers;

  const savedUsers = window.localStorage.getItem(USERS_KEY);
  return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
}

export function createEmployeeLoginId(fullName, joiningYear = new Date().getFullYear()) {
  return generateEmployeeId(fullName, joiningYear, initialEmployees);
}

export function registerMockUser(user) {
  const users = readUsers();
  const newUser = {
    ...user,
    loginId: user.role === 'employee' ? user.loginId || createEmployeeLoginId(user.fullName, user.joiningYear) : undefined,
  };
  const updatedUsers = [...users, newUser];

  window.localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  return newUser;
}

export function companyHasHr(companyName) {
  const normalizedCompany = companyName.trim().toLowerCase();
  return readUsers().some((user) => user.role === 'hr' && user.companyName?.trim().toLowerCase() === normalizedCompany);
}

export function authenticateMockUser(identifier, password) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const user = readUsers().find((candidate) => (
    (candidate.email.toLowerCase() === normalizedIdentifier || candidate.loginId?.toLowerCase() === normalizedIdentifier)
    && candidate.password === password
  ));

  if (!user) return null;

  const sessionUser = { ...user };
  delete sessionUser.password;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return sessionUser;
}

export function getMockSession() {
  if (typeof window === 'undefined') return null;
  const session = window.localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

export function clearMockSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
