import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { c as createLucideIcon, s as store, g as getSession, P as PageShell, A as AnimatePresence, M as Mail } from "./PageShell-DtS1bNA_.js";
import { m as motion } from "./router-BBmLPuFF.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function Members() {
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const [members, setMembers] = reactExports.useState(() => store.getMembers());
  const [year, setYear] = reactExports.useState("2026");
  const [session, setSession] = reactExports.useState(getSession());
  reactExports.useEffect(() => {
    setIsMounted(true);
    const upd = () => {
      setMembers(store.getMembers());
      setSession(getSession());
    };
    upd();
    window.addEventListener("epoch:data", upd);
    window.addEventListener("storage", upd);
    return () => {
      window.removeEventListener("epoch:data", upd);
      window.removeEventListener("storage", upd);
    };
  }, []);
  if (!isMounted) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen" }) });
  const displayedMembers = members.filter((m) => (m.year || "2026") === year);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "Members" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "The humans shaping what we make next." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95
    }, animate: {
      opacity: 1,
      scale: 1
    }, className: "flex items-center justify-center gap-3 mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setYear("2025"), className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${year === "2025" ? "bg-brand-gradient text-white shadow-soft" : "glass hover:bg-card text-muted-foreground hover:text-foreground"}`, children: "2025" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setYear("2026"), className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${year === "2026" ? "bg-brand-gradient text-white shadow-soft" : "glass hover:bg-card text-muted-foreground hover:text-foreground"}`, children: "2026" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: displayedMembers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
      opacity: 0,
      scale: 0.9,
      y: 20
    }, animate: {
      opacity: 1,
      scale: 1,
      y: 0
    }, exit: {
      opacity: 0,
      scale: 0.9,
      y: -20
    }, transition: {
      duration: 0.4,
      type: "spring",
      bounce: 0.3
    }, whileHover: {
      y: -6
    }, className: "text-center group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-40 h-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-brand-gradient blur-xl opacity-30 group-hover:opacity-60 transition duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.image, alt: m.name, onError: (e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&blur=100";
        }, className: "w-full h-full object-cover group-hover:scale-105 transition duration-700", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-semibold text-lg", children: m.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-brand-gradient font-medium mt-1", children: m.role }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [
        m.linkedin && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: m.linkedin, target: "_blank", rel: "noreferrer", className: "w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-[#0A66C2] transition-colors grid place-items-center", "aria-label": `LinkedIn for ${m.name}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-4 h-4" }) }),
        session?.role === "faculty" && m.email && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${m.email}`, className: "w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-rose-500 transition-colors grid place-items-center", "aria-label": `Email ${m.name}`, title: m.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }) }),
        session?.role === "faculty" && m.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${m.phone}`, className: "w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-emerald-500 transition-colors grid place-items-center", "aria-label": `Call ${m.name}`, title: m.phone, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }) })
      ] })
    ] }, m.id)) }) }),
    displayedMembers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground", children: "No members found for this year." })
  ] }) }) });
}
export {
  Members as component
};
