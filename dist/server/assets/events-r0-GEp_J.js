import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { m as motion, a as Link } from "./router-BBmLPuFF.js";
import { s as store, P as PageShell, C as Calendar } from "./PageShell-DtS1bNA_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Events() {
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const [events, setEvents] = reactExports.useState(() => store.getEvents());
  reactExports.useEffect(() => {
    setIsMounted(true);
    const upd = () => setEvents(store.getEvents());
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);
  if (!isMounted) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "Events" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Curated gatherings where engineers and artists collide." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: events.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
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
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/event/$id", params: {
      id: e.id
    }, className: "block group rounded-3xl overflow-hidden glass-strong shadow-soft h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.image, alt: e.title, className: "w-full h-full object-cover group-hover:scale-105 transition duration-700", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
          new Date(e.date).toLocaleDateString(void 0, {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-xl font-semibold group-hover:text-brand-gradient transition", children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: e.description })
      ] })
    ] }) }, e.id)) })
  ] }) }) });
}
export {
  Events as component
};
