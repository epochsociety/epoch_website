import { T as reactExports, K as jsxRuntimeExports } from "./server-CUuKPygb.js";
import { e as useNavigate, a as Link, m as motion } from "./router-BsJlmS0W.js";
import { s as store, g as getSession, P as PageShell, C as Calendar } from "./PageShell-BQ6hTOq9.js";
import { S as Switch } from "./switch-CrZLBn-e.js";
import { A as ArrowLeft } from "./arrow-left-jFh1jYII.js";
import { S as Save } from "./save-zjDY9dsi.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function DeveloperEvents() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  const [events, setEvents] = reactExports.useState(() => store.getEvents());
  const [msg, setMsg] = reactExports.useState("");
  reactExports.useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({
        to: "/login"
      });
      return;
    }
    if (s.role !== "developer") {
      navigate({
        to: "/events"
      });
      return;
    }
    setReady(true);
    const upd = () => setEvents(store.getEvents());
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);
  if (!ready) return null;
  function flash(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  }
  function saveEvent(e) {
    store.upsertEvent(e);
    flash("Event saved");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/developer", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
      " Back to Dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "mb-10 flex items-end justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-semibold tracking-tight", children: "Manage Events" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Update event metadata and control which events appear on the homepage." })
      ] }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: -4
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft", children: msg })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventRow, { event: e, onSave: saveEvent }, e.id)) })
  ] }) }) });
}
function EventRow({
  event,
  onSave
}) {
  const [e, setE] = reactExports.useState(event);
  reactExports.useEffect(() => setE(event), [event]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-6 flex flex-col gap-4 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: e.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-brand-gradient font-medium uppercase tracking-wider", children: e.date })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Event Title", value: e.title, onChange: (v) => setE({
        ...e,
        title: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Event Date", type: "date", value: e.date, onChange: (v) => setE({
        ...e,
        date: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", value: e.description, multiline: true, onChange: (v) => setE({
        ...e,
        description: v
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image URL (e.g. /poster.jpg)", value: e.image, onChange: (v) => setE({
        ...e,
        image: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Registration / External URL", placeholder: "e.g. Luma link", value: e.registerUrl || "", onChange: (v) => setE({
        ...e,
        registerUrl: v
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-card/50 p-4 rounded-xl border border-input mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: e.isUpcoming ?? false, onCheckedChange: (v) => setE({
        ...e,
        isUpcoming: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: 'Feature in "Upcoming Events" on Homepage' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSave(e), className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-medium shadow-soft hover:shadow-glow transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
      " Save event changes"
    ] }) })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: label }),
    multiline ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows: 3, placeholder, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition resize-none" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, type, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" })
  ] });
}
export {
  DeveloperEvents as component
};
