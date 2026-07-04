import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, ExternalLink, Upload, FileText, Download, Trash2 } from "lucide-react";
import { g as getSession, s as store, P as PageShell } from "./PageShell-jO_Bgqiq.js";
import { R as Route } from "./router-Dyxl3nzB.js";
import "@tanstack/react-query";
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
  const [event, setEvent] = useState(void 0);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(getSession());
  const [busy, setBusy] = useState(false);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("div", { className: "px-6 py-20 text-center text-muted-foreground", children: "Event not found." }) });
  }
  const isStaff = session?.role === "developer" || session?.role === "faculty";
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-6 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/events", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
      " Back to events"
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "rounded-3xl glass-strong shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[21/9] md:aspect-[21/8] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: event.image, alt: event.title, onError: (e) => {
        e.currentTarget.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&blur=100";
      }, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
          new Date(event.date).toLocaleDateString(void 0, {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-semibold tracking-tight text-brand-gradient", children: event.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl", children: event.description }),
        event.registerUrl && /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs("a", { href: event.registerUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
          "Register for event ",
          /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
        ] }) })
      ] })
    ] }),
    isStaff && /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.2
    }, className: "mt-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold tracking-tight", children: "Internal Documents" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "You are seeing this because you are logged in as ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: session.role }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong hover:bg-card transition cursor-pointer text-sm font-medium", children: [
          /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4" }),
          " ",
          busy ? "Uploading…" : "Upload file",
          /* @__PURE__ */ jsx("input", { type: "file", multiple: true, className: "hidden", onChange: onUpload, disabled: busy })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
        event.documents.length === 0 && /* @__PURE__ */ jsx("div", { className: "md:col-span-2 text-sm text-muted-foreground glass-strong rounded-2xl p-6 text-center", children: "No documents yet." }),
        event.documents.map((d) => /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-2xl p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("a", { href: d.url, target: "_blank", rel: "noreferrer", className: "text-sm font-medium truncate block hover:text-brand-gradient hover:bg-clip-text transition", children: d.name }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              (d.size / 1024).toFixed(1),
              " KB · ",
              new Date(d.uploadedAt).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsx("a", { href: d.url, download: d.name, className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition", "aria-label": "Download", children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => store.removeDocument(id, d.id), className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-destructive hover:text-destructive-foreground transition", "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
        ] }, d.id))
      ] })
    ] })
  ] }) }) });
}
export {
  EventDetails as component
};
