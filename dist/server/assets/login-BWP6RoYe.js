import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { P as PageShell, l as login } from "./PageShell-jO_Bgqiq.js";
function Login() {
  const navigate = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  function submit(e) {
    e.preventDefault();
    setErr("");
    const s = login(username.trim(), password);
    if (!s) return setErr("Invalid credentials");
    navigate({
      to: s.role === "developer" ? "/developer" : "/events"
    });
  }
  return /* @__PURE__ */ jsx(PageShell, { hideFooter: true, children: /* @__PURE__ */ jsx("section", { className: "px-6 py-20 min-h-[80vh] grid place-items-center", children: /* @__PURE__ */ jsxs(motion.form, { initial: {
    opacity: 0,
    y: 12,
    scale: 0.98
  }, animate: {
    opacity: 1,
    y: 0,
    scale: 1
  }, onSubmit: submit, className: "w-full max-w-md glass-strong rounded-3xl p-8 shadow-soft space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-14 h-14 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-semibold", children: "Staff access" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Developer & faculty login" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Username" }),
      /* @__PURE__ */ jsx("input", { value: username, onChange: (e) => setU(e.target.value), className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition", placeholder: "developer or faculty" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Password" }),
      /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setP(e.target.value), className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" })
    ] }),
    err && /* @__PURE__ */ jsx("div", { className: "text-sm text-destructive", children: err }),
    /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
      /* @__PURE__ */ jsx(LogIn, { className: "w-4 h-4" }),
      " Sign in"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground text-center leading-relaxed pt-2 border-t border-border", children: [
      "Default credentials:",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("code", { className: "text-foreground", children: "developer / epoch@dev2026" }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("code", { className: "text-foreground", children: "faculty / epoch@faculty2026" })
    ] })
  ] }) }) });
}
export {
  Login as component
};
