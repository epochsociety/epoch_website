import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { e as useNavigate, m as motion } from "./router-BBmLPuFF.js";
import { c as createLucideIcon, P as PageShell, l as login } from "./PageShell-DtS1bNA_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function Login() {
  const navigate = useNavigate();
  const [username, setU] = reactExports.useState("");
  const [password, setP] = reactExports.useState("");
  const [err, setErr] = reactExports.useState("");
  function submit(e) {
    e.preventDefault();
    setErr("");
    const s = login(username.trim(), password);
    if (!s) return setErr("Invalid credentials");
    navigate({
      to: s.role === "developer" ? "/developer" : "/faculty"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { hideFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-20 min-h-[80vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { initial: {
    opacity: 0,
    y: 12,
    scale: 0.98
  }, animate: {
    opacity: 1,
    y: 0,
    scale: 1
  }, onSubmit: submit, className: "w-full max-w-md glass-strong rounded-3xl p-8 shadow-soft space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-14 h-14 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-semibold", children: "Staff access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Developer & faculty login" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Username" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: username, onChange: (e) => setU(e.target.value), className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition", placeholder: "developer or faculty" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setP(e.target.value), className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
      " Sign in"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground text-center leading-relaxed pt-2 border-t border-border", children: [
      "Default credentials:",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-foreground", children: "developer / epoch@dev2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-foreground", children: "faculty / epoch@faculty2026" })
    ] })
  ] }) }) });
}
export {
  Login as component
};
