import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { c as createLucideIcon, P as PageShell, M as Mail } from "./PageShell-DtS1bNA_.js";
import { m as motion } from "./router-BBmLPuFF.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
function Contact() {
  const [state, setState] = reactExports.useState("idle");
  const [errMsg, setErrMsg] = reactExports.useState("");
  async function onSubmit(e) {
    e.preventDefault();
    setState("sending");
    setErrMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New Epoch Society contact message");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      const json = await res.json();
      if (json.success) {
        setState("done");
        form.reset();
      } else {
        setState("error");
        setErrMsg(json.message || "Something went wrong.");
      }
    } catch (err) {
      setState("error");
      setErrMsg("Network error. Try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "Connect" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "We read every message. Say hello." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { initial: {
      opacity: 0,
      y: 16
    }, animate: {
      opacity: 1,
      y: 0
    }, onSubmit, className: "glass-strong rounded-3xl p-8 shadow-soft space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "name", label: "Your name", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "email", type: "email", label: "Email", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "message", required: true, rows: 5, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition resize-none", placeholder: "Tell us what's on your mind…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
          " hello@epochsociety.com"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: state === "sending", type: "submit", className: "group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition disabled:opacity-60", children: [
          state === "sending" ? "Sending…" : "Send message",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 group-hover:translate-x-0.5 transition" })
        ] })
      ] }),
      state === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-emerald-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
        " Message sent — we'll be in touch soon."
      ] }),
      state === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-destructive", children: errMsg }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground italic", children: [
        "Heads up: add your Web3Forms access key to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-foreground", children: "VITE_WEB3FORMS_KEY" }),
        " to actually deliver messages."
      ] })
    ] })
  ] }) }) });
}
function Field({
  name,
  label,
  type = "text",
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" })
  ] });
}
export {
  Contact as component
};
