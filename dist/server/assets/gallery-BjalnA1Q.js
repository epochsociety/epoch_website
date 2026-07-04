import { K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { P as PageShell } from "./PageShell-DtS1bNA_.js";
import { m as motion } from "./router-BBmLPuFF.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const images = ["https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=900&fit=crop", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=1000&fit=crop", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=900&fit=crop", "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=700&fit=crop", "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=800&fit=crop", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=900&fit=crop", "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"];
function Gallery() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "Gallery" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Moments from our late-night builds, studios, and salons." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 md:columns-3 gap-4 [column-fill:_balance]", children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.figure, { initial: {
      opacity: 0,
      y: 16
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-50px"
    }, transition: {
      delay: i % 4 * 0.06
    }, whileHover: {
      scale: 1.01
    }, className: "mb-4 break-inside-avoid overflow-hidden rounded-3xl glass-strong shadow-soft group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", loading: "lazy", className: "w-full object-cover group-hover:scale-105 transition duration-700" }) }, src)) })
  ] }) }) });
}
export {
  Gallery as component
};
