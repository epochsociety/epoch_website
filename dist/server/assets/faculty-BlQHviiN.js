import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { e as useNavigate, m as motion } from "./router-BBmLPuFF.js";
import { g as getSession, s as store, P as PageShell, C as Calendar } from "./PageShell-DtS1bNA_.js";
import { A as Accordion, b as AccordionItem, c as AccordionTrigger, a as AccordionContent } from "./accordion-C9TDM2od.js";
import { F as FileText, D as Download } from "./file-text-BSkNKpML.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-C-W-DvHo.js";
function FacultyPortal() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  const [session, setSession] = reactExports.useState(getSession());
  const [events, setEvents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({
        to: "/login"
      });
      return;
    }
    if (s.role !== "faculty" && s.role !== "developer") {
      navigate({
        to: "/events"
      });
      return;
    }
    setReady(true);
    setSession(s);
    setEvents(store.getEvents());
    const upd = () => setEvents(store.getEvents());
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);
  if (!ready || !session) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20 min-h-[75vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-semibold tracking-tight", children: "Events" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Select an event below to view and download all official circulars, documents, and assets." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-strong rounded-3xl p-12 text-center text-muted-foreground", children: "No events currently scheduled." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full space-y-4", children: events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: e.id, className: "glass-strong rounded-3xl px-6 border-none shadow-soft transition-all duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "hover:no-underline py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground group-hover:text-brand-purple transition", children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
          new Date(e.date).toLocaleDateString(void 0, {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-6 pt-2 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] rounded-2xl overflow-hidden border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.image, alt: e.title, className: "w-full h-full object-cover", onError: (evt) => {
            evt.currentTarget.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop";
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: e.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-brand-purple", children: "Official Documents & Attachments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: e.documents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground bg-card/30 rounded-2xl p-6 text-center border border-dashed border-border/40", children: "No attachments uploaded for this event." }) : e.documents.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/45 border border-border/40 rounded-xl p-3 flex items-center justify-between gap-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-brand-purple shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate max-w-[240px] md:max-w-[320px]", title: d.name, children: d.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                  (d.size / 1024).toFixed(1),
                  " KB ·",
                  " ",
                  new Date(d.uploadedAt).toLocaleDateString()
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: d.url, download: d.name, className: "w-8 h-8 rounded-full grid place-items-center bg-muted/60 hover:bg-brand-purple hover:text-white transition", title: "Download Document", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }) })
          ] }, d.id)) })
        ] })
      ] }) })
    ] }, e.id)) }) })
  ] }) }) });
}
export {
  FacultyPortal as component
};
