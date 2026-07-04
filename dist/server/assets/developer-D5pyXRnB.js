import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronDown, Check, ChevronUp, Eye, Users, ArrowRight, Calendar, Type, Save, Clock, KeyRound } from "lucide-react";
import { s as store, g as getSession, a as getVisitCount, P as PageShell, u as updatePassword } from "./PageShell-jO_Bgqiq.js";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { c as cn, S as Switch } from "./switch-DVGo3O1K.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import "@radix-ui/react-switch";
import "clsx";
import "tailwind-merge";
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function Developer() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [visits, setVisits] = useState(0);
  const [content, setContent] = useState(() => store.getContent());
  const [memberCount, setMemberCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [facultyPw, setFacultyPw] = useState("");
  const [devPw, setDevPw] = useState("");
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
    setVisits(getVisitCount());
    const upd = () => {
      setContent(store.getContent());
      setMemberCount(store.getMembers().length);
      setEventCount(store.getEvents().length);
    };
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);
  if (!ready) return null;
  function saveContent() {
    store.setContent(content);
    flash("Content saved");
  }
  function flash(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  }
  function savePasswords() {
    if (facultyPw) updatePassword("faculty", facultyPw);
    if (devPw) updatePassword("developer", devPw);
    setFacultyPw("");
    setDevPw("");
    flash("Passwords updated");
  }
  return /* @__PURE__ */ jsx(PageShell, { children: /* @__PURE__ */ jsx("section", { className: "px-6 pt-10 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "mb-10 flex items-end justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold tracking-tight", children: "Developer Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Global control center for the Epoch Society platform." }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-brand-gradient", children: [
          'Note: When using local images (like "sam.jpg"), place them directly in the ',
          /* @__PURE__ */ jsx("code", { className: "text-foreground bg-muted px-1 rounded", children: "public" }),
          " folder."
        ] })
      ] }),
      msg && /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: -4
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft", children: msg })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-4 mb-10", children: [
      /* @__PURE__ */ jsx(Stat, { icon: Eye, label: "Site visitors", value: visits.toString() }),
      /* @__PURE__ */ jsxs(Link, { to: "/developer-members", className: "glass-strong rounded-3xl p-6 flex flex-col justify-between shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all group border border-border/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white", children: /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold tracking-tight", children: memberCount }),
          /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-brand-purple mt-1 uppercase tracking-widest", children: "Manage Members" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/developer-events", className: "glass-strong rounded-3xl p-6 flex flex-col justify-between shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all group border border-border/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white", children: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold tracking-tight", children: eventCount }),
          /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-brand-purple mt-1 uppercase tracking-widest", children: "Manage Events" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold tracking-tight mb-4", children: "Website Settings" }),
    /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, className: "w-full space-y-4", defaultValue: "content", children: [
      /* @__PURE__ */ jsxs(AccordionItem, { value: "content", className: "glass-strong rounded-3xl px-6 border-none shadow-soft", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "hover:no-underline py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsx(Type, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Hero & Branding" })
        ] }) }),
        /* @__PURE__ */ jsxs(AccordionContent, { className: "pb-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Hero title", value: content.heroTitle, onChange: (v) => setContent({
              ...content,
              heroTitle: v
            }) }),
            /* @__PURE__ */ jsx(Field, { label: "Hero subtitle text", value: content.heroSubtitle, onChange: (v) => setContent({
              ...content,
              heroSubtitle: v
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Global Theme" }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Select, { value: content.globalTheme || "default", onValueChange: (v) => setContent({
              ...content,
              globalTheme: v
            }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full bg-card", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select theme" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "default", children: "Epoch Purple (Default)" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "ocean", children: "Ocean Blue" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "emerald", children: "Emerald Green" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "sunset", children: "Sunset Orange" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "minimal-white", children: "Minimal White" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Subtitle Styling" }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Color (CSS var or Hex)" }),
                /* @__PURE__ */ jsx("input", { value: content.subtitleColor || "", onChange: (e) => setContent({
                  ...content,
                  subtitleColor: e.target.value
                }), className: "w-full rounded-xl bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition", placeholder: "e.g. #ff0000" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Icon" }),
                /* @__PURE__ */ jsxs(Select, { value: content.subtitleIcon || "sparkle", onValueChange: (v) => setContent({
                  ...content,
                  subtitleIcon: v
                }), children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full bg-card", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select icon" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "sparkle", children: "Sparkle" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "dot", children: "Dot" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "heart", children: "Heart" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "zap", children: "Zap" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Icon Effect" }),
                /* @__PURE__ */ jsxs(Select, { value: content.subtitleIconEffect || "none", onValueChange: (v) => setContent({
                  ...content,
                  subtitleIconEffect: v
                }), children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full bg-card", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select effect" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "None" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "pulse", children: "Pulse" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "heartbeat", children: "Heartbeat" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "rotate", children: "Rotate" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "bounce", children: "Bounce" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Switch, { checked: content.counterEnabled ?? true, onCheckedChange: (v) => setContent({
                ...content,
                counterEnabled: v
              }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Enable Counter Section" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(Field, { label: "Counter target", type: "number", value: String(content.counterTarget), onChange: (v) => setContent({
                ...content,
                counterTarget: Number(v) || 0
              }) }),
              /* @__PURE__ */ jsx(Field, { label: "Counter label", value: content.counterLabel, onChange: (v) => setContent({
                ...content,
                counterLabel: v
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Field, { label: "Hero tagline", value: content.heroTagline, onChange: (v) => setContent({
            ...content,
            heroTagline: v
          }), multiline: true }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Field, { label: "About text", value: content.aboutText, onChange: (v) => setContent({
            ...content,
            aboutText: v
          }), multiline: true }) }),
          /* @__PURE__ */ jsxs("button", { onClick: saveContent, className: "mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            " Save all changes"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AccordionItem, { value: "timer", className: "glass-strong rounded-3xl px-6 border border-border/50 shadow-soft", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "hover:no-underline py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Timer Management" })
        ] }) }),
        /* @__PURE__ */ jsxs(AccordionContent, { className: "pb-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-muted/40 p-4 rounded-xl border border-border/50", children: [
            /* @__PURE__ */ jsx(Switch, { checked: content.timerEnabled ?? true, onCheckedChange: (v) => setContent({
              ...content,
              timerEnabled: v
            }) }),
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Show Countdown Timer on Homepage" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(Field, { label: "Target Date (YYYY-MM-DD)", type: "date", value: content.timerEventDate || "", onChange: (v) => setContent({
              ...content,
              timerEventDate: v
            }) }),
            /* @__PURE__ */ jsx(Field, { label: "Target Time (HH:MM)", type: "time", value: content.timerEventTime || "", onChange: (v) => setContent({
              ...content,
              timerEventTime: v
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Timer Customization" }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Theme Color (CSS var or Hex)" }),
                /* @__PURE__ */ jsx("input", { value: content.timerColor || "", onChange: (e) => setContent({
                  ...content,
                  timerColor: e.target.value
                }), className: "w-full rounded-xl bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition", placeholder: "e.g. oklch(0.6 0.2 290)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Border Color (CSS var or Hex)" }),
                /* @__PURE__ */ jsx("input", { value: content.timerBorderColor || "", onChange: (e) => setContent({
                  ...content,
                  timerBorderColor: e.target.value
                }), className: "w-full rounded-xl bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition", placeholder: "e.g. #ff00ff" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Animation Effect" }),
                /* @__PURE__ */ jsxs(Select, { value: content.timerEffect || "glow", onValueChange: (v) => setContent({
                  ...content,
                  timerEffect: v
                }), children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full bg-card", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select effect" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "None" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "pulse", children: "Soft Pulse" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "glow", children: "Neon Glow" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "float", children: "Floating" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Layout Style" }),
                /* @__PURE__ */ jsxs(Select, { value: content.timerLayout || "merged", onValueChange: (v) => setContent({
                  ...content,
                  timerLayout: v
                }), children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full bg-card", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select layout" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "merged", children: "Merged Island" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "separate", children: "Separate Blocks" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: saveContent, className: "mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            " Save timer configuration"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AccordionItem, { value: "credentials", className: "glass-strong rounded-3xl px-6 border-none shadow-soft", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "hover:no-underline py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0", children: /* @__PURE__ */ jsx(KeyRound, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Security & Access" })
        ] }) }),
        /* @__PURE__ */ jsxs(AccordionContent, { className: "pb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mt-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "New developer password", value: devPw, onChange: setDevPw, type: "password", placeholder: "leave blank to keep" }),
            /* @__PURE__ */ jsx(Field, { label: "New faculty password", value: facultyPw, onChange: setFacultyPw, type: "password", placeholder: "leave blank to keep" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: savePasswords, className: "mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition", children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            " Update passwords"
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-3xl p-6 flex items-center gap-4 shadow-soft border border-border/50", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-brand-gradient grid place-items-center text-white", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-semibold tracking-tight", children: value }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1", children: label })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline,
  placeholder
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: label }),
    multiline ? /* @__PURE__ */ jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows: 3, placeholder, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition resize-none" }) : /* @__PURE__ */ jsx("input", { value, type, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" })
  ] });
}
export {
  Developer as component
};
