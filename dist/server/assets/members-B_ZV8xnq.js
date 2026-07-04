import { jsx, jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Linkedin, Mail, Phone } from "lucide-react";
import { s as store, g as getSession, P as PageShell } from "./PageShell-jO_Bgqiq.js";
import "@tanstack/react-router";
function Members() {
  const [isMounted, setIsMounted] = useState(false);
  const [members, setMembers] = useState(() => store.getMembers());
  const [year, setYear] = useState("2026");
  const [session, setSession] = useState(getSession());
  useEffect(() => {
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
  if (!isMounted) return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen" }) });
  const displayedMembers = members.filter((m) => (m.year || "2026") === year);
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "text-brand-gradient", children: "Members" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "The humans shaping what we make next." })
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95
    }, animate: {
      opacity: 1,
      scale: 1
    }, className: "flex items-center justify-center gap-3 mb-14", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setYear("2025"), className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${year === "2025" ? "bg-brand-gradient text-white shadow-soft" : "glass hover:bg-card text-muted-foreground hover:text-foreground"}`, children: "2025" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setYear("2026"), className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${year === "2026" ? "bg-brand-gradient text-white shadow-soft" : "glass hover:bg-card text-muted-foreground hover:text-foreground"}`, children: "2026" })
    ] }),
    /* @__PURE__ */ jsx(motion.div, { layout: true, className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: displayedMembers.map((m) => /* @__PURE__ */ jsxs(motion.div, { layout: true, initial: {
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
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-40 h-40", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-brand-gradient blur-xl opacity-30 group-hover:opacity-60 transition duration-500" }),
        /* @__PURE__ */ jsx("div", { className: "relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-soft", children: /* @__PURE__ */ jsx("img", { src: m.image, alt: m.name, onError: (e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&blur=100";
        }, className: "w-full h-full object-cover group-hover:scale-105 transition duration-700", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-6 font-semibold text-lg", children: m.name }),
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-brand-gradient font-medium mt-1", children: m.role }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [
        m.linkedin && /* @__PURE__ */ jsx("a", { href: m.linkedin, target: "_blank", rel: "noreferrer", className: "w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-[#0A66C2] transition-colors grid place-items-center", "aria-label": `LinkedIn for ${m.name}`, children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" }) }),
        session?.role === "faculty" && m.email && /* @__PURE__ */ jsx("a", { href: `mailto:${m.email}`, className: "w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-rose-500 transition-colors grid place-items-center", "aria-label": `Email ${m.name}`, title: m.email, children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) }),
        session?.role === "faculty" && m.phone && /* @__PURE__ */ jsx("a", { href: `tel:${m.phone}`, className: "w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-emerald-500 transition-colors grid place-items-center", "aria-label": `Call ${m.name}`, title: m.phone, children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }) })
      ] })
    ] }, m.id)) }) }),
    displayedMembers.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-20 text-muted-foreground", children: "No members found for this year." })
  ] }) }) });
}
export {
  Members as component
};
