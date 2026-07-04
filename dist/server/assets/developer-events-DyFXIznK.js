import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { e as useNavigate, a as Link, m as motion } from "./router-BBmLPuFF.js";
import { g as getSession, s as store, P as PageShell, C as Calendar } from "./PageShell-DtS1bNA_.js";
import { S as Switch } from "./switch-l2csl5g4.js";
import { A as ArrowLeft, T as Trash2 } from "./trash-2-XQirgJVz.js";
import { P as Plus } from "./plus-Bs_z2wV7.js";
import { S as Save } from "./save-DqwPgQLD.js";
import { U as Upload } from "./upload-Dy0VYjgc.js";
import { F as FileText, D as Download } from "./file-text-BSkNKpML.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-C-W-DvHo.js";
function readAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
function DeveloperEvents() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  const [events, setEvents] = reactExports.useState([]);
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
    setEvents(store.getEvents());
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
  function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event?")) {
      store.removeEvent(id);
      flash("Event deleted");
    }
  }
  function addEvent() {
    store.upsertEvent({
      id: crypto.randomUUID(),
      title: "New Event",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: "Description of the event",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true
    });
    flash("Event created successfully");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Update event details and upload/manage internal documents and circulars." })
      ] }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: -4
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft", children: msg })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground glass rounded-3xl border border-border/50", children: "No events found. Click below to create one." }),
      events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventRow, { event: e, onSave: saveEvent, onDelete: deleteEvent, flash }, e.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addEvent, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white shadow-soft hover:shadow-glow transition text-sm font-medium mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
      " Create New Event"
    ] })
  ] }) }) });
}
function EventRow({
  event,
  onSave,
  onDelete,
  flash
}) {
  const [e, setE] = reactExports.useState(event);
  const [uploading, setUploading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setE(event);
  }, [event]);
  async function handleDocUpload(evt) {
    const files = evt.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    try {
      for (const f of Array.from(files)) {
        const url = await readAsDataURL(f);
        const doc = {
          id: crypto.randomUUID(),
          name: f.name,
          url,
          uploadedAt: Date.now(),
          size: f.size
        };
        store.addDocument(e.id, doc);
      }
      flash("Document(s) uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to upload document");
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-6 flex flex-col gap-6 shadow-soft border border-border/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/50 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: e.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-brand-gradient font-medium uppercase tracking-wider", children: e.date })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-brand-purple", children: "Event Metadata" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Event Title", value: e.title, onChange: (v) => setE({
            ...e,
            title: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Event Date", type: "date", value: e.date, onChange: (v) => setE({
            ...e,
            date: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", value: e.description, multiline: true, onChange: (v) => setE({
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-card/45 p-4 rounded-xl border border-input", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: e.isUpcoming ?? false, onCheckedChange: (v) => setE({
            ...e,
            isUpcoming: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: 'Feature in "Upcoming Events" on Homepage' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSave(e), className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-medium shadow-soft hover:shadow-glow transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            " Save Event Changes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onDelete(e.id), className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground text-sm font-medium transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            " Delete Event"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-brand-purple", children: "Documents & Circulars" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Upload or delete files under this event." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:bg-card border border-border/40 transition cursor-pointer text-xs font-semibold select-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
            uploading ? "Uploading..." : "Upload File",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", multiple: true, className: "hidden", disabled: uploading, onChange: handleDocUpload })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-2 max-h-[300px] overflow-y-auto pr-1", children: e.documents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground bg-card/30 rounded-xl p-6 text-center border border-dashed border-border/40", children: "No documents uploaded for this event." }) : e.documents.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/45 border border-border/40 rounded-xl p-3 flex items-center justify-between gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-brand-purple shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate max-w-[180px]", title: d.name, children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                (d.size / 1024).toFixed(1),
                " KB ·",
                " ",
                new Date(d.uploadedAt).toLocaleDateString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: d.url, download: d.name, className: "w-7 h-7 rounded-full grid place-items-center bg-muted/60 hover:bg-accent transition", title: "Download", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 text-muted-foreground hover:text-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              store.removeDocument(e.id, d.id);
              flash("Document deleted");
            }, className: "w-7 h-7 rounded-full grid place-items-center bg-muted/60 hover:bg-destructive/10 text-destructive hover:text-destructive transition", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ] })
        ] }, d.id)) })
      ] })
    ] })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-medium text-muted-foreground mb-1", children: label }),
    multiline ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows: 3, placeholder, className: "w-full rounded-xl bg-card border border-input px-3 py-2 text-xs outline-none focus:ring-1.5 focus:ring-ring/40 transition resize-none" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, type, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full rounded-xl bg-card border border-input px-3 py-2 text-xs outline-none focus:ring-1.5 focus:ring-ring/40 transition" })
  ] });
}
export {
  DeveloperEvents as component
};
