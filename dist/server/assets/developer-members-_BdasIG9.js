import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Users, Search, Plus, Save, Trash2 } from "lucide-react";
import { s as store, g as getSession, P as PageShell } from "./PageShell-jO_Bgqiq.js";
function DeveloperMembers() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [members, setMembers] = useState(() => store.getMembers());
  const [memberYear, setMemberYear] = useState("2026");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
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
    const upd = () => setMembers(store.getMembers());
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);
  if (!ready) return null;
  function flash(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  }
  function saveMember(m) {
    store.upsertMember(m);
    flash("Member saved");
  }
  function deleteMember(id) {
    store.removeMember(id);
    flash("Member removed");
  }
  function addMember() {
    store.upsertMember({
      id: crypto.randomUUID(),
      name: "New member",
      role: "Role",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      bio: "Short bio",
      year: memberYear,
      email: "",
      phone: ""
    });
  }
  const displayedMembers = members.filter((m) => (m.year || "2026") === memberYear && m.name.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/developer", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
      " Back to Dashboard"
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "mb-10 flex items-end justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold tracking-tight", children: "Manage Members" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Add, edit, and organize society members across different years." })
      ] }),
      msg && /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: -4
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft", children: msg })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-3xl p-6 shadow-soft space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setMemberYear("2025"), className: `px-4 py-1.5 rounded-full text-sm font-medium transition ${memberYear === "2025" ? "bg-brand-gradient text-white shadow-soft" : "glass text-muted-foreground hover:text-foreground"}`, children: "2025 Team" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setMemberYear("2026"), className: `px-4 py-1.5 rounded-full text-sm font-medium transition ${memberYear === "2026" ? "bg-brand-gradient text-white shadow-soft" : "glass text-muted-foreground hover:text-foreground"}`, children: "2026 Team" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search members...", className: "w-full rounded-full bg-card border border-input pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        displayedMembers.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-10 text-center text-muted-foreground text-sm glass rounded-2xl border border-border/50", children: "No members found matching your criteria." }),
        displayedMembers.map((m) => /* @__PURE__ */ jsx(MemberRow, { member: m, onSave: saveMember, onDelete: deleteMember }, m.id)),
        /* @__PURE__ */ jsxs("button", { onClick: addMember, className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong hover:bg-card transition text-sm font-medium mt-4", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
          " Add member to ",
          memberYear
        ] })
      ] })
    ] })
  ] }) }) });
}
function MemberRow({
  member,
  onSave,
  onDelete
}) {
  const [m, setM] = useState(member);
  useEffect(() => setM(member), [member]);
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-4 flex flex-col items-start gap-4 border border-border/50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 w-full", children: [
      /* @__PURE__ */ jsx("img", { src: m.image, alt: m.name, onError: (e) => {
        e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&blur=100";
      }, className: "w-12 h-12 rounded-full object-cover shrink-0" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 w-full", children: [
        /* @__PURE__ */ jsx("input", { value: m.name, onChange: (e) => setM({
          ...m,
          name: e.target.value
        }), placeholder: "Name", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" }),
        /* @__PURE__ */ jsx("input", { value: m.role, onChange: (e) => setM({
          ...m,
          role: e.target.value
        }), placeholder: "Role", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 w-full", children: [
      /* @__PURE__ */ jsx("input", { value: m.image, onChange: (e) => setM({
        ...m,
        image: e.target.value
      }), placeholder: "Image URL (e.g. /sam.jpg)", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" }),
      /* @__PURE__ */ jsx("input", { value: m.linkedin || "", onChange: (e) => setM({
        ...m,
        linkedin: e.target.value
      }), placeholder: "LinkedIn URL", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 w-full", children: [
      /* @__PURE__ */ jsx("input", { value: m.email || "", onChange: (e) => setM({
        ...m,
        email: e.target.value
      }), placeholder: "Email address", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" }),
      /* @__PURE__ */ jsx("input", { value: m.phone || "", onChange: (e) => setM({
        ...m,
        phone: e.target.value
      }), placeholder: "Phone number", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => onSave(m), className: "w-8 h-8 rounded-full grid place-items-center bg-brand-gradient text-white shadow-soft", "aria-label": "Save", children: /* @__PURE__ */ jsx(Save, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => onDelete(m.id), className: "w-8 h-8 rounded-full grid place-items-center bg-muted hover:bg-destructive hover:text-destructive-foreground transition", "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }) })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground uppercase font-medium", children: m.year || "2026" })
    ] })
  ] });
}
export {
  DeveloperMembers as component
};
