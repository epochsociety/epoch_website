import { T as reactExports, K as jsxRuntimeExports } from "./server-vE8pAmWh.js";
import { m as motion, a as Link } from "./router-BBmLPuFF.js";
import { c as createLucideIcon, s as store, P as PageShell, S as Sparkles } from "./PageShell-DtS1bNA_.js";
import { A as ArrowRight, C as Clock } from "./clock-jMeAVXIe.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$5 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }],
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
      key: "u4xsad"
    }
  ],
  [
    "path",
    {
      d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
      key: "676m9"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05", key: "92ym6u" }]
];
const Rocket = createLucideIcon("rocket", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const iconMap = {
  sparkle: Sparkles,
  dot: Circle,
  heart: Heart,
  zap: Zap
};
const effectMap = {
  none: {},
  heartbeat: {
    animate: {
      scale: [1, 1.2, 1]
    },
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  rotate: {
    animate: {
      rotate: 360
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  },
  bounce: {
    animate: {
      y: [0, -4, 0]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
const timerEffectStyles = (effect, color) => {
  switch (effect) {
    case "pulse":
      return {
        animate: {
          boxShadow: [`0 0 0px ${color}`, `0 0 30px ${color}`, `0 0 0px ${color}`]
        },
        transition: {
          duration: 2,
          repeat: Infinity
        }
      };
    case "glow":
      return {
        style: {
          boxShadow: `0 0 25px ${color}`
        }
      };
    case "float":
      return {
        animate: {
          y: [0, -10, 0]
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };
    default:
      return {};
  }
};
function Countdown({
  date,
  time,
  config
}) {
  const [timeLeft, setTimeLeft] = reactExports.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  reactExports.useEffect(() => {
    if (!date || !time) return;
    const target = (/* @__PURE__ */ new Date(`${date}T${time}`)).getTime();
    const tick = () => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const difference = target - now;
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1e3 * 60 * 60 * 24)),
          hours: Math.floor(difference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
          minutes: Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60)),
          seconds: Math.floor(difference % (1e3 * 60) / 1e3)
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1e3);
    return () => clearInterval(interval);
  }, [date, time]);
  if (!date || !time) return null;
  const timerColor = config.timerColor || "var(--brand-purple)";
  const borderColor = config.timerBorderColor || "var(--brand-pink)";
  const effectProps = timerEffectStyles(config.timerEffect || "glow", timerColor);
  const isSeparate = config.timerLayout === "separate";
  if (isSeparate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 md:gap-6 items-center justify-center flex-wrap", children: Object.entries(timeLeft).map(([unit, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...effectProps, className: "flex flex-col items-center glass-strong rounded-[24px] md:rounded-[32px] w-20 h-24 md:w-28 md:h-32 justify-center border-2 shadow-soft relative overflow-hidden", style: {
      borderColor,
      ...effectProps.style
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-gradient opacity-5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl md:text-5xl font-black tracking-tighter relative z-10", style: {
        color: timerColor
      }, children: value.toString().padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1 relative z-10", children: unit })
    ] }, unit)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...effectProps, className: "flex gap-3 md:gap-5 items-center justify-center p-8 rounded-[40px] glass-strong border-2 relative overflow-hidden", style: {
    borderColor,
    ...effectProps.style
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-gradient opacity-5 pointer-events-none" }),
    Object.entries(timeLeft).map(([unit, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 md:w-24 md:h-24 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl md:text-5xl font-black tracking-tighter", style: {
        color: timerColor
      }, children: value.toString().padStart(2, "0") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold", children: unit })
    ] }, unit))
  ] });
}
function Counter({
  to
}) {
  const [n, setN] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.toLocaleString() });
}
function Index() {
  const [isMounted, setIsMounted] = reactExports.useState(false);
  const [content, setContent] = reactExports.useState(() => store.getContent());
  const [eventsData, setEventsData] = reactExports.useState(() => store.getEvents());
  reactExports.useEffect(() => {
    setIsMounted(true);
    const upd = () => {
      setContent(store.getContent());
      setEventsData(store.getEvents());
    };
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);
  if (!isMounted) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen" }) });
  const upcomingEvents = eventsData.filter((e) => e.isUpcoming !== false);
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : eventsData;
  const top3Events = displayEvents.slice(0, 3);
  const eventsTitle = upcomingEvents.length > 0 ? "Upcoming" : "Past Events";
  const eventsSubtitle = upcomingEvents.length > 0 ? "A glimpse at what's brewing." : "Explore what we've built together.";
  const SubtitleIcon = iconMap[content.subtitleIcon || "sparkle"] || Sparkles;
  const iconEffect = effectMap[content.subtitleIconEffect || "none"] || {};
  const showCounter = content.counterEnabled ?? true;
  const showTimer = content.timerEnabled && content.timerEventDate && content.timerEventTime;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-10 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-wide", style: {
        color: content.subtitleColor || "var(--muted-foreground)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...iconEffect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubtitleIcon, { className: "w-3.5 h-3.5" }) }),
        content.heroSubtitle
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2,
        duration: 0.7
      }, className: "mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: content.heroTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90", children: "where ideas become prototypes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        delay: 0.4
      }, className: "mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground", children: content.heroTagline }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.55
      }, className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/events", className: "group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
          "Explore events",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-0.5 transition" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/members", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong hover:bg-card transition font-medium", children: "Meet the members" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        delay: 0.7
      }, className: `mt-20 flex flex-col ${showCounter ? "md:flex-row" : "items-center"} justify-center gap-10 md:gap-16 w-full max-w-5xl mx-auto`, children: [
        showTimer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center ${!showCounter ? "w-full scale-110" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-6 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            " Countdown to Next Event"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { date: content.timerEventDate, time: content.timerEventTime, config: content })
        ] }),
        showCounter && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl px-8 py-8 flex flex-col items-center justify-center gap-4 shadow-soft min-w-[240px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-brand-gradient grid place-items-center text-white shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-semibold tracking-tight text-brand-gradient", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: content.counterTarget }),
              "+"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1 font-medium", children: content.counterLabel })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold tracking-tight", children: "Three pillars, one society" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: content.aboutText })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        icon: Cpu,
        title: "Tech",
        body: "Build with the newest tools — from on-device AI to robotics."
      }, {
        icon: Sparkles,
        title: "Innovation",
        body: "Question defaults. Ship small. Iterate fast and openly."
      }, {
        icon: Palette,
        title: "Creativity",
        body: "Design, sound, narrative — engineering with taste."
      }].map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-100px"
      }, transition: {
        delay: i * 0.1
      }, whileHover: {
        y: -4
      }, className: "group relative rounded-3xl p-8 glass-strong shadow-soft overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-xl font-semibold", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: p.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-brand-gradient opacity-0 group-hover:opacity-20 blur-2xl transition" })
      ] }, p.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10 flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold tracking-tight", children: eventsTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: eventsSubtitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "text-sm font-medium text-foreground hover:text-brand-gradient hover:bg-clip-text transition", children: "See all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: top3Events.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.08
      }, whileHover: {
        y: -6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/event/$id", params: {
        id: e.id
      }, className: "block group rounded-3xl overflow-hidden glass-strong shadow-soft h-full cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.image, alt: e.title, onError: (event) => {
          event.currentTarget.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&blur=100";
        }, className: "w-full h-full object-cover group-hover:scale-105 transition duration-700", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(e.date).toLocaleDateString(void 0, {
            month: "long",
            day: "numeric",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-semibold group-hover:text-brand-gradient transition", children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: e.description })
        ] })
      ] }) }, e.id)) })
    ] }) })
  ] });
}
export {
  Index as component
};
