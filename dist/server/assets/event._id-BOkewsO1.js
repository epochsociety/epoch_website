import { T as reactExports, K as jsxRuntimeExports } from "./server-CUuKPygb.js";
import { b as Route, a as Link, m as motion } from "./router-BsJlmS0W.js";
import { c as createLucideIcon, g as getSession, s as store, P as PageShell, C as Calendar } from "./PageShell-BQ6hTOq9.js";
import { A as ArrowLeft } from "./arrow-left-jFh1jYII.js";
import { T as Trash2 } from "./trash-2-Byi7eAnM.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function readAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
function EventDetails() {
  const {
    id
  } = Route.useParams();
  const [event, setEvent] = reactExports.useState(void 0);
  const [ready, setReady] = reactExports.useState(false);
  const [session, setSession] = reactExports.useState(getSession());
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setReady(true);
    setEvent(store.getEvent(id));
    setSession(getSession());
    const upd = () => {
      setEvent(store.getEvent(id));
      setSession(getSession());
    };
    window.addEventListener("epoch:data", upd);
    window.addEventListener("storage", upd);
    return () => {
      window.removeEventListener("epoch:data", upd);
      window.removeEventListener("storage", upd);
    };
  }, [id]);
  async function onUpload(e) {
    const files = e.target.files;
    if (!files || !files.length) return;
    setBusy(true);
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
        store.addDocument(id, doc);
      }
    } finally {
      setBusy(false);
    }
  }
  if (!ready) return null;
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-20 text-center text-muted-foreground", children: "Event not found." }) });
  }
  const isStaff = session?.role === "developer" || session?.role === "faculty";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-6 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/events", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
      " Back to events"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "rounded-3xl glass-strong shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[21/9] md:aspect-[21/8] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.image, alt: event.title, onError: (e) => {
        e.currentTarget.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&blur=100";
      }, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          new Date(event.date).toLocaleDateString(void 0, {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-semibold tracking-tight text-brand-gradient", children: event.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl", children: event.description }),
        event.registerUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: event.registerUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
          "Register for event ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    isStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.2
    }, className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Internal Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "You are seeing this because you are logged in as ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: session.role }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong hover:bg-card transition cursor-pointer text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
          " ",
          busy ? "Uploading…" : "Upload file",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", multiple: true, className: "hidden", onChange: onUpload, disabled: busy })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
        event.documents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 text-sm text-muted-foreground glass-strong rounded-2xl p-6 text-center", children: "No documents yet." }),
        event.documents.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-2xl p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: d.url, target: "_blank", rel: "noreferrer", className: "text-sm font-medium truncate block hover:text-brand-gradient hover:bg-clip-text transition", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              (d.size / 1024).toFixed(1),
              " KB · ",
              new Date(d.uploadedAt).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: d.url, download: d.name, className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition", "aria-label": "Download", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => store.removeDocument(id, d.id), className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-destructive hover:text-destructive-foreground transition", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
        ] }, d.id))
      ] })
    ] })
  ] }) }) });
}
export {
  EventDetails as component
};
