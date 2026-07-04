import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { s as store, P as PageShell } from "./PageShell-jO_Bgqiq.js";
import { useState, useEffect } from "react";
function Events() {
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState(() => store.getEvents());
  useEffect(() => {
    setIsMounted(true);
    const upd = () => setEvents(store.getEvents());
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);
  if (!isMounted) return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen" }) });
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-14", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "text-brand-gradient", children: "Events" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Curated gatherings where engineers and artists collide." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: events.map((e, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.07
    }, whileHover: {
      y: -6
    }, children: /* @__PURE__ */ jsxs(Link, { to: "/event/$id", params: {
      id: e.id
    }, className: "block group rounded-3xl overflow-hidden glass-strong shadow-soft h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: e.image, alt: e.title, className: "w-full h-full object-cover group-hover:scale-105 transition duration-700", loading: "lazy" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }),
          new Date(e.date).toLocaleDateString(void 0, {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-semibold group-hover:text-brand-gradient transition", children: e.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: e.description })
      ] })
    ] }) }, e.id)) })
  ] }) }) });
}
export {
  Events as component
};
