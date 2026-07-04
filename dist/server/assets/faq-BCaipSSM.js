import { jsx, jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { P as PageShell } from "./PageShell-jO_Bgqiq.js";
import "@tanstack/react-router";
const faqs = [{
  q: "Who can join Epoch Society?",
  a: "Anyone curious about tech, design, or making things. We welcome students, professionals, and self-taught builders."
}, {
  q: "Is there a membership fee?",
  a: "No. Membership is free. Some events have a small fee to cover materials."
}, {
  q: "How often do you host events?",
  a: "Roughly one large event per month plus weekly informal meetups."
}, {
  q: "Can I propose an event or talk?",
  a: "Yes — use the Contact page and tell us what you'd love to share."
}, {
  q: "Do you accept remote members?",
  a: "Absolutely. Many of our jams happen online and we ship recordings."
}];
function Item({
  q,
  a,
  i
}) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    y: 12
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    delay: i * 0.05
  }, className: "glass-strong rounded-3xl overflow-hidden shadow-soft", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between gap-4 text-left p-6", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: q }),
      /* @__PURE__ */ jsx(motion.span, { animate: {
        rotate: open ? 45 : 0
      }, className: "w-9 h-9 grid place-items-center rounded-full bg-brand-gradient text-white shrink-0", children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.3,
      ease: "easeOut"
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-muted-foreground text-sm leading-relaxed", children: a }) }) })
  ] });
}
function FAQ() {
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-14", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "text-brand-gradient", children: "FAQ" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Quick answers to common questions." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((f, i) => /* @__PURE__ */ jsx(Item, { ...f, i }, f.q)) })
  ] }) }) });
}
export {
  FAQ as component
};
