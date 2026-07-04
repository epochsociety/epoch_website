// Simple client-side mock auth. Replace with real backend (MongoDB) later.
// Default credentials — change in the developer panel.

export type Role = "developer" | "faculty";
export interface Session {
  role: Role;
  username: string;
  loginAt: number;
}

const SESSION_KEY = "epoch.session";
const CREDS_KEY = "epoch.creds";
const VISITS_KEY = "epoch.visits";

const DEFAULT_CREDS = {
  developer: { username: "developer", password: "epoch@dev2026" },
  faculty: { username: "faculty", password: "epoch@faculty2026" },
};

export function getCreds() {
  if (typeof window === "undefined") return DEFAULT_CREDS;
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return DEFAULT_CREDS;
    return { ...DEFAULT_CREDS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CREDS;
  }
}

export function updatePassword(role: Role, newPassword: string) {
  const creds = getCreds();
  creds[role] = { ...creds[role], password: newPassword };
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}

export function login(username: string, password: string): Session | null {
  const creds = getCreds();
  for (const role of ["developer", "faculty"] as Role[]) {
    if (creds[role].username === username && creds[role].password === password) {
      const session: Session = { role, username, loginAt: Date.now() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
  }
  return null;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function trackVisit() {
  if (typeof window === "undefined") return;
  const key = "epoch.visited";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  const count = Number(localStorage.getItem(VISITS_KEY) || "0") + 1;
  localStorage.setItem(VISITS_KEY, String(count));
}

export function getVisitCount(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(VISITS_KEY) || "0");
}
