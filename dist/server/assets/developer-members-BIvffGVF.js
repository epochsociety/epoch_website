import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { e as useNavigate, a as Link, m as motion } from "./router-BBmLPuFF.js";
import { c as createLucideIcon, s as store, g as getSession, P as PageShell, U as Users } from "./PageShell-DtS1bNA_.js";
import { A as ArrowLeft, T as Trash2 } from "./trash-2-XQirgJVz.js";
import { P as Plus } from "./plus-Bs_z2wV7.js";
import { S as Save } from "./save-DqwPgQLD.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function DeveloperMembers() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  const [members, setMembers] = reactExports.useState(() => store.getMembers());
  const [memberYear, setMemberYear] = reactExports.useState("2026");
  const [search, setSearch] = reactExports.useState("");
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-semibold tracking-tight", children: "Manage Members" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Add, edit, and organize society members across different years." })
      ] }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: -4
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft", children: msg })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-6 shadow-soft space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMemberYear("2025"), className: `px-4 py-1.5 rounded-full text-sm font-medium transition ${memberYear === "2025" ? "bg-brand-gradient text-white shadow-soft" : "glass text-muted-foreground hover:text-foreground"}`, children: "2025 Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMemberYear("2026"), className: `px-4 py-1.5 rounded-full text-sm font-medium transition ${memberYear === "2026" ? "bg-brand-gradient text-white shadow-soft" : "glass text-muted-foreground hover:text-foreground"}`, children: "2026 Team" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search members...", className: "w-full rounded-full bg-card border border-input pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        displayedMembers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-muted-foreground text-sm glass rounded-2xl border border-border/50", children: "No members found matching your criteria." }),
        displayedMembers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberRow, { member: m, onSave: saveMember, onDelete: deleteMember }, m.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addMember, className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong hover:bg-card transition text-sm font-medium mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
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
  const [m, setM] = reactExports.useState(member);
  reactExports.useEffect(() => setM(member), [member]);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url) {
        setM({
          ...m,
          image: base64Url
        });
      }
    };
    reader.readAsDataURL(file);
  };
  const isBase64 = m.image.startsWith("data:");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 flex flex-col items-start gap-4 border border-border/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative cursor-pointer group/avatar shrink-0 w-12 h-12 rounded-full overflow-hidden border border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.image, alt: m.name, onError: (e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&blur=100";
        }, className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-white font-bold uppercase tracking-wider text-center", children: "Upload" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleFileChange })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: m.name, onChange: (e) => setM({
          ...m,
          name: e.target.value
        }), placeholder: "Name", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: m.role, onChange: (e) => setM({
          ...m,
          role: e.target.value
        }), placeholder: "Role", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: isBase64 ? "Uploaded Image" : m.image, onChange: (e) => {
          const val = e.target.value;
          setM({
            ...m,
            image: val === "Uploaded Image" ? "" : val
          });
        }, placeholder: "Image URL", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer px-3 py-1.5 bg-muted rounded-lg border border-input text-xs font-semibold hover:bg-card transition flex items-center shrink-0", children: [
          "Upload",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleFileChange })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: m.linkedin || "", onChange: (e) => setM({
        ...m,
        linkedin: e.target.value
      }), placeholder: "LinkedIn URL", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: m.email || "", onChange: (e) => setM({
        ...m,
        email: e.target.value
      }), placeholder: "Email address", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: m.phone || "", onChange: (e) => setM({
        ...m,
        phone: e.target.value
      }), placeholder: "Phone number", className: "rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSave(m), className: "w-8 h-8 rounded-full grid place-items-center bg-brand-gradient text-white shadow-soft", "aria-label": "Save", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(m.id), className: "w-8 h-8 rounded-full grid place-items-center bg-muted hover:bg-destructive hover:text-destructive-foreground transition", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase font-medium", children: m.year || "2026" })
    ] })
  ] });
}
export {
  DeveloperMembers as component
};
