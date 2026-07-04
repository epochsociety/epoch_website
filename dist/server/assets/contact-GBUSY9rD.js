import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { P as PageShell } from "./PageShell-jO_Bgqiq.js";
import "@tanstack/react-router";
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
function Contact() {
  const [state, setState] = useState("idle");
  const [errMsg, setErrMsg] = useState("");
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
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-14", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "text-brand-gradient", children: "Connect" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "We read every message. Say hello." })
    ] }),
    /* @__PURE__ */ jsxs(motion.form, { initial: {
      opacity: 0,
      y: 16
    }, animate: {
      opacity: 1,
      y: 0
    }, onSubmit, className: "glass-strong rounded-3xl p-8 shadow-soft space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsx(Field, { name: "name", label: "Your name", required: true }),
        /* @__PURE__ */ jsx(Field, { name: "email", type: "email", label: "Email", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Message" }),
        /* @__PURE__ */ jsx("textarea", { name: "message", required: true, rows: 5, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition resize-none", placeholder: "Tell us what's on your mind…" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap pt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5" }),
          " hello@epochsociety.com"
        ] }),
        /* @__PURE__ */ jsxs("button", { disabled: state === "sending", type: "submit", className: "group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition disabled:opacity-60", children: [
          state === "sending" ? "Sending…" : "Send message",
          /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 group-hover:translate-x-0.5 transition" })
        ] })
      ] }),
      state === "done" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-emerald-600", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
        " Message sent — we'll be in touch soon."
      ] }),
      state === "error" && /* @__PURE__ */ jsx("div", { className: "text-sm text-destructive", children: errMsg }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground italic", children: [
        "Heads up: add your Web3Forms access key to ",
        /* @__PURE__ */ jsx("code", { className: "text-foreground", children: "VITE_WEB3FORMS_KEY" }),
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
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: label }),
    /* @__PURE__ */ jsx("input", { name, type, required, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" })
  ] });
}
export {
  Contact as component
};
