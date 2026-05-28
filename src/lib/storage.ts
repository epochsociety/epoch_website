// Client-side data store for events, members, documents, and editable content.
// Replace with MongoDB integration later — keep the same shape.

export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  year?: "2025" | "2026";
  email?: string;
  phone?: string;
}

export interface EventDoc {
  id: string;
  name: string;
  url: string; // data URL or Google Drive link
  uploadedAt: number;
  size: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  documents: EventDoc[];
  registerUrl?: string;
  isUpcoming?: boolean;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  counterTarget: number; // counts up to this in the landing page
  counterLabel: string;
  counterEnabled?: boolean;
  aboutText: string;
  timerEventDate?: string;
  timerEventTime?: string;
  timerEnabled?: boolean;
  timerColor?: string;
  timerBorderColor?: string;
  timerEffect?: "none" | "pulse" | "glow" | "float";
  timerLayout?: "merged" | "separate";
  subtitleColor?: string;
  subtitleIcon?: "sparkle" | "dot" | "heart" | "zap";
  subtitleIconEffect?: "none" | "heartbeat" | "rotate" | "bounce";
  globalTheme?: "default" | "ocean" | "emerald" | "sunset" | "minimal-white";
}

const KEY = "epoch.data";

interface DB {
  content: SiteContent;
  members: Member[];
  events: EventItem[];
}

const seed: DB = {
  content: {
    globalTheme: "default",
    heroTitle: "Epoch Society",
    heroSubtitle: "Tech · Innovation · Creativity",
    heroTagline:
      "A collective of curious minds shaping the next chapter of human-computer creativity.",
    counterTarget: 240,
    counterLabel: "Active builders worldwide",
    counterEnabled: true,
    aboutText:
      "We host hackathons, design jams, and intimate talks where engineers, artists, and dreamers turn ideas into prototypes.",
    timerEventDate: "2026-10-01",
    timerEventTime: "10:00",
    timerEnabled: true,
    timerColor: "var(--brand-purple)",
    timerBorderColor: "var(--brand-pink)",
    timerEffect: "glow",
    timerLayout: "merged",
    subtitleColor: "var(--muted-foreground)",
    subtitleIcon: "sparkle",
    subtitleIconEffect: "none",
  },
  members: [
    {
      id: "m1",
      name: "Aarav Sharma",
      role: "President",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      bio: "Systems engineer. Loves rendering pipelines and slow coffee.",
      year: "2026",
      linkedin: "https://linkedin.com",
    },
    {
      id: "m2",
      name: "Mira Chen",
      role: "Design Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Brand and motion designer obsessed with delight in micro-details.",
      year: "2026",
      linkedin: "https://linkedin.com",
    },
    {
      id: "m3",
      name: "Ezra Okafor",
      role: "Innovation Chair",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Robotics researcher building soft actuators in his garage.",
      year: "2025",
      linkedin: "https://linkedin.com",
    },
    {
      id: "m4",
      name: "Lina Park",
      role: "Events Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Curates intimate salons where engineers meet sculptors.",
      year: "2026",
      linkedin: "https://linkedin.com",
    },
  ],
  events: [
    {
      id: "e1",
      title: "Neon Hack ’26",
      date: "2026-07-12",
      description: "48-hour hackathon exploring spatial interfaces and ambient AI.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      documents: [],
      registerUrl: "https://example.com/register",
      isUpcoming: true,
    },
    {
      id: "e2",
      title: "Atelier Salon",
      date: "2026-08-03",
      description: "A studio evening for designers and engineers to swap process notes.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true,
    },
    {
      id: "e3",
      title: "Origin: AI Roundtable",
      date: "2026-09-21",
      description: "Six speakers, one room, on the next decade of generative tools.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true,
    },
  ],
};

function read(): DB {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function write(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db));
  window.dispatchEvent(new CustomEvent("epoch:data"));
}

export const store = {
  getAll: read,
  getContent: () => read().content,
  setContent: (c: Partial<SiteContent>) => {
    const db = read();
    db.content = { ...db.content, ...c };
    write(db);
  },
  getMembers: () => read().members,
  upsertMember: (m: Member) => {
    const db = read();
    const i = db.members.findIndex((x) => x.id === m.id);
    if (i >= 0) db.members[i] = m;
    else db.members.push(m);
    write(db);
  },
  removeMember: (id: string) => {
    const db = read();
    db.members = db.members.filter((m) => m.id !== id);
    write(db);
  },
  getEvents: () => read().events,
  getEvent: (id: string) => read().events.find((e) => e.id === id),
  upsertEvent: (e: EventItem) => {
    const db = read();
    const i = db.events.findIndex((x) => x.id === e.id);
    if (i >= 0) db.events[i] = e;
    else db.events.push(e);
    write(db);
  },
  addDocument: (eventId: string, doc: EventDoc) => {
    const db = read();
    const e = db.events.find((x) => x.id === eventId);
    if (!e) return;
    e.documents.push(doc);
    write(db);
  },
  removeDocument: (eventId: string, docId: string) => {
    const db = read();
    const e = db.events.find((x) => x.id === eventId);
    if (!e) return;
    e.documents = e.documents.filter((d) => d.id !== docId);
    write(db);
  },
};

export function useDataVersion() {
  // tiny hook trigger via storage event
  return KEY;
}
