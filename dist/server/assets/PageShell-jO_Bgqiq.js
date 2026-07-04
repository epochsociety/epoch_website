import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Home, Calendar, Image, Users, HelpCircle, Mail, User, LogOut, X, MoreHorizontal, Twitter, Instagram, Github } from "lucide-react";
const SESSION_KEY = "epoch.session";
const CREDS_KEY = "epoch.creds";
const VISITS_KEY = "epoch.visits";
const DEFAULT_CREDS = {
  developer: { username: "developer", password: "epoch@dev2026" },
  faculty: { username: "faculty", password: "epoch@faculty2026" }
};
function getCreds() {
  if (typeof window === "undefined") return DEFAULT_CREDS;
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return DEFAULT_CREDS;
    return { ...DEFAULT_CREDS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CREDS;
  }
}
function updatePassword(role, newPassword) {
  const creds = getCreds();
  creds[role] = { ...creds[role], password: newPassword };
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}
function login(username, password) {
  const creds = getCreds();
  for (const role of ["developer", "faculty"]) {
    if (creds[role].username === username && creds[role].password === password) {
      const session = { role, username, loginAt: Date.now() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
  }
  return null;
}
function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function logout() {
  localStorage.removeItem(SESSION_KEY);
}
function trackVisit() {
  if (typeof window === "undefined") return;
  const key = "epoch.visited";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  const count = Number(localStorage.getItem(VISITS_KEY) || "0") + 1;
  localStorage.setItem(VISITS_KEY, String(count));
}
function getVisitCount() {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(VISITS_KEY) || "0");
}
const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/members", label: "Members", icon: Users },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/contact", label: "Contact", icon: Mail }
];
function Navbar() {
  const [session, setSession] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setSession(getSession());
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onStorage = () => setSession(getSession());
    window.addEventListener("scroll", onScroll);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", onStorage);
    };
  }, [loc.pathname]);
  const visibleLinks = mobileExpanded ? links : [links[0]];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { y: -30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "fixed top-0 left-0 right-0 z-50 px-4 pt-4 hidden md:block",
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `mx-auto max-w-6xl rounded-full px-3 py-2 transition-all duration-500 ${scrolled ? "glass-strong shadow-soft" : "glass"}`,
            children: /* @__PURE__ */ jsxs("nav", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 pl-3 pr-2 group", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-gradient rounded-full blur-md opacity-60 group-hover:opacity-90 transition" }),
                  /* @__PURE__ */ jsx("div", { className: "relative w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold tracking-tight text-foreground", children: "Epoch Society" })
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "flex items-center gap-1", children: links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                Link,
                {
                  to: l.to,
                  activeOptions: { exact: l.to === "/" },
                  className: "relative px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-300 block",
                  activeProps: { className: "!text-foreground" },
                  children: ({ isActive }) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      whileTap: { scale: 0.95 },
                      className: "flex items-center justify-center",
                      children: [
                        isActive && /* @__PURE__ */ jsx(
                          motion.span,
                          {
                            layoutId: "nav-pill",
                            className: "absolute inset-0 rounded-full bg-soft-gradient shadow-soft border border-white/10",
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                              mass: 0.8
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "relative z-10", children: l.label })
                      ]
                    }
                  )
                }
              ) }, l.to)) }),
              session ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pr-1", children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: session.role === "developer" ? "/developer" : "/faculty",
                    className: "flex items-center gap-2 px-3 py-2 rounded-full bg-brand-gradient text-white text-sm font-medium shadow-soft hover:shadow-glow transition",
                    children: [
                      /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsx("span", { className: "inline capitalize", children: session.role })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      logout();
                      setSession(null);
                      window.location.href = "/";
                    },
                    className: "w-9 h-9 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition",
                    "aria-label": "Log out",
                    children: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" })
                  }
                )
              ] }) : /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 pr-1", children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/login",
                  className: "flex items-center gap-2 px-4 py-2 rounded-full bg-muted/65 text-foreground hover:bg-muted text-sm font-medium border border-border/30 hover:border-border/60 shadow-soft transition",
                  children: [
                    /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsx("span", { children: "Login" })
                  ]
                }
              ) })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { y: -30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: `fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:hidden transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 pb-3" : "pb-0"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 pl-1 pr-2 group", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-gradient rounded-full blur-md opacity-60 group-hover:opacity-90 transition" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-8 h-8 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold tracking-tight text-foreground text-sm", children: "Epoch Society" })
          ] }),
          session ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: session.role === "developer" ? "/developer" : "/faculty",
              className: "w-8 h-8 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft",
              children: /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" })
            }
          ) }) : /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/login",
              className: "w-8 h-8 rounded-full bg-muted grid place-items-center text-muted-foreground border border-border/30 shadow-soft",
              children: /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" })
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex justify-center w-full pointer-events-none", children: /* @__PURE__ */ jsxs(
      motion.nav,
      {
        layout: true,
        transition: { type: "spring", stiffness: 400, damping: 30, mass: 1 },
        className: "flex items-center gap-1 bg-background/40 backdrop-blur-2xl shadow-[0_16px_32px_-8px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-border/50 rounded-[2.5rem] px-2 py-2 pointer-events-auto overflow-visible relative",
        style: {
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-gradient opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[2.5rem]" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 relative z-10", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleLinks.map((l) => {
            const Icon = l.icon;
            return /* @__PURE__ */ jsx(
              motion.div,
              {
                layout: true,
                initial: {
                  opacity: 0,
                  scale: 0.4,
                  filter: "blur(8px)",
                  y: 10
                },
                animate: {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  y: 0
                },
                exit: {
                  opacity: 0,
                  scale: 0.4,
                  filter: "blur(8px)",
                  y: 10
                },
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8
                },
                children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: l.to,
                    onClick: () => {
                      if (mobileExpanded) setMobileExpanded(false);
                    },
                    activeOptions: { exact: l.to === "/" },
                    className: "relative flex items-center justify-center w-12 h-12 rounded-full text-muted-foreground transition-colors duration-300",
                    activeProps: { className: "!text-foreground" },
                    children: ({ isActive }) => /* @__PURE__ */ jsxs(Fragment, { children: [
                      isActive && /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          layoutId: "mobile-nav-pill",
                          className: "absolute inset-0 rounded-full bg-background shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(0,0,0,0.02)] border border-border/60",
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 28,
                            mass: 0.8
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Icon,
                        {
                          className: `w-5 h-5 relative z-10 drop-shadow-sm transition-colors ${isActive ? "text-brand-purple" : ""}`
                        }
                      )
                    ] })
                  }
                )
              },
              l.to
            );
          }) }) }),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              layout: true,
              onClick: () => setMobileExpanded(!mobileExpanded),
              whileTap: { scale: 0.85 },
              transition: { type: "spring", stiffness: 400, damping: 25 },
              className: "w-12 h-12 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 shrink-0 bg-transparent relative z-10",
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: { rotate: mobileExpanded ? 90 : 0 },
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                  children: mobileExpanded ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5 drop-shadow-sm" }) : /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-5 h-5 drop-shadow-sm" })
                }
              )
            }
          )
        ]
      }
    ) })
  ] });
}
function Footer() {
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        navigate({ to: "/login" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
  const handleYearClick = () => {
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      navigate({ to: "/login" });
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };
  return /* @__PURE__ */ jsxs("footer", { className: "relative mt-32 pb-10 pt-16 px-6", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto grid gap-10 md:grid-cols-3 items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "font-semibold text-lg tracking-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "text-brand-gradient", children: "Epoch" }),
          " Society"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xs", children: "A club for tech, innovation, and creativity. Built with curiosity." })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Link, { to: "/events", className: "hover:text-foreground transition", children: "Events" }),
        /* @__PURE__ */ jsx(Link, { to: "/gallery", className: "hover:text-foreground transition", children: "Gallery" }),
        /* @__PURE__ */ jsx(Link, { to: "/members", className: "hover:text-foreground transition", children: "Members" }),
        /* @__PURE__ */ jsx(Link, { to: "/faq", className: "hover:text-foreground transition", children: "FAQ" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-foreground transition", children: "Contact" }),
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "hover:text-foreground transition", children: "Staff Login" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center md:justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            "aria-label": "Twitter",
            className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition",
            children: /* @__PURE__ */ jsx(Twitter, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            "aria-label": "Instagram",
            className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition",
            children: /* @__PURE__ */ jsx(Instagram, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            "aria-label": "GitHub",
            className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition",
            children: /* @__PURE__ */ jsx(Github, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto mt-10 flex items-center justify-center sm:justify-start text-xs text-muted-foreground", children: /* @__PURE__ */ jsxs("span", { children: [
      "©",
      " ",
      /* @__PURE__ */ jsx("span", { onClick: handleYearClick, className: "cursor-text select-none", children: (/* @__PURE__ */ new Date()).getFullYear() }),
      " ",
      "Epoch Society. All rights reserved."
    ] }) })
  ] });
}
const KEY = "epoch.data";
const seed = {
  content: {
    globalTheme: "default",
    heroTitle: "Epoch Society",
    heroSubtitle: "Tech · Innovation · Creativity",
    heroTagline: "A collective of curious minds shaping the next chapter of human-computer creativity.",
    counterTarget: 240,
    counterLabel: "Active builders worldwide",
    counterEnabled: true,
    aboutText: "We host hackathons, design jams, and intimate talks where engineers, artists, and dreamers turn ideas into prototypes.",
    timerEventDate: "2026-10-01",
    timerEventTime: "10:00",
    timerEnabled: true,
    timerColor: "var(--brand-purple)",
    timerBorderColor: "var(--brand-pink)",
    timerEffect: "glow",
    timerLayout: "merged",
    subtitleColor: "var(--muted-foreground)",
    subtitleIcon: "sparkle",
    subtitleIconEffect: "none"
  },
  members: [
    {
      id: "m1",
      name: "Aarav Sharma",
      role: "President",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      bio: "Systems engineer. Loves rendering pipelines and slow coffee.",
      year: "2026",
      linkedin: "https://linkedin.com"
    },
    {
      id: "m2",
      name: "Mira Chen",
      role: "Design Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Brand and motion designer obsessed with delight in micro-details.",
      year: "2026",
      linkedin: "https://linkedin.com"
    },
    {
      id: "m3",
      name: "Ezra Okafor",
      role: "Innovation Chair",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Robotics researcher building soft actuators in his garage.",
      year: "2025",
      linkedin: "https://linkedin.com"
    },
    {
      id: "m4",
      name: "Lina Park",
      role: "Events Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Curates intimate salons where engineers meet sculptors.",
      year: "2026",
      linkedin: "https://linkedin.com"
    }
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
      isUpcoming: true
    },
    {
      id: "e2",
      title: "Atelier Salon",
      date: "2026-08-03",
      description: "A studio evening for designers and engineers to swap process notes.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true
    },
    {
      id: "e3",
      title: "Origin: AI Roundtable",
      date: "2026-09-21",
      description: "Six speakers, one room, on the next decade of generative tools.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true
    }
  ]
};
function read() {
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
function write(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
  window.dispatchEvent(new CustomEvent("epoch:data"));
}
const store = {
  getAll: read,
  getContent: () => read().content,
  setContent: (c) => {
    const db = read();
    db.content = { ...db.content, ...c };
    write(db);
  },
  getMembers: () => read().members,
  upsertMember: (m) => {
    const db = read();
    const i = db.members.findIndex((x) => x.id === m.id);
    if (i >= 0) db.members[i] = m;
    else db.members.push(m);
    write(db);
  },
  removeMember: (id) => {
    const db = read();
    db.members = db.members.filter((m) => m.id !== id);
    write(db);
  },
  getEvents: () => read().events,
  getEvent: (id) => read().events.find((e) => e.id === id),
  upsertEvent: (e) => {
    const db = read();
    const i = db.events.findIndex((x) => x.id === e.id);
    if (i >= 0) db.events[i] = e;
    else db.events.push(e);
    write(db);
  },
  addDocument: (eventId, doc) => {
    const db = read();
    const e = db.events.find((x) => x.id === eventId);
    if (!e) return;
    e.documents.push(doc);
    write(db);
  },
  removeDocument: (eventId, docId) => {
    const db = read();
    const e = db.events.find((x) => x.id === eventId);
    if (!e) return;
    e.documents = e.documents.filter((d) => d.id !== docId);
    write(db);
  }
};
function PageShell({
  children,
  hideFooter = false
}) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [theme, setTheme] = useState(
    () => store.getContent().globalTheme || "default"
  );
  useEffect(() => {
    trackVisit();
    const upd = () => setTheme(store.getContent().globalTheme || "default");
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);
  const themeClass = theme === "default" ? "" : `theme-${theme}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `min-h-screen relative overflow-x-hidden bg-background transition-colors duration-500 ${themeClass}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-pink opacity-30 blur-3xl animate-blob" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-40 -right-24 w-[420px] h-[420px] rounded-full bg-brand-blue opacity-25 blur-3xl animate-blob",
              style: { animationDelay: "-6s" }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-[60vh] left-1/3 w-[380px] h-[380px] rounded-full bg-brand-purple opacity-20 blur-3xl animate-blob",
              style: { animationDelay: "-12s" }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Navbar, {}),
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
          motion.main,
          {
            initial: { opacity: 0, filter: "blur(10px)", y: 15 },
            animate: { opacity: 1, filter: "blur(0px)", y: 0 },
            exit: { opacity: 0, filter: "blur(10px)", y: -15 },
            transition: { duration: 0.5, ease: "easeInOut" },
            className: "pt-28",
            children
          },
          currentPath
        ) }),
        !hideFooter && /* @__PURE__ */ jsx(Footer, {})
      ]
    }
  );
}
export {
  PageShell as P,
  getVisitCount as a,
  getSession as g,
  login as l,
  store as s,
  updatePassword as u
};
