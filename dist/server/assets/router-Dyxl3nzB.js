import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
const appCss = "/assets/styles-Dq308tPg.css";
function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden",
      initial: { clipPath: "inset(0% 0 0% 0)" },
      exit: { clipPath: "inset(50% 0 50% 0)", opacity: 0 },
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "h-[1px] bg-foreground w-0 mb-6",
            animate: { width: [0, 200, 200, 0], x: [0, 0, 0, 200] },
            transition: {
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.4, 0.8, 1]
            }
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, filter: "blur(8px)" },
            animate: {
              opacity: [0, 1, 1, 0],
              filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(12px)"]
            },
            transition: {
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.4, 0.8, 1]
            },
            className: "flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: {
                    letterSpacing: ["0.1em", "0.4em", "0.4em", "0.8em"],
                    paddingLeft: ["0.1em", "0.4em", "0.4em", "0.8em"]
                  },
                  transition: {
                    duration: 2.2,
                    ease: [0.16, 1, 0.3, 1],
                    times: [0, 0.4, 0.8, 1]
                  },
                  className: "text-xl md:text-2xl font-medium uppercase text-foreground",
                  children: "Epoch"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: {
                    letterSpacing: ["0.4em", "0.15em", "0.15em", "-0.05em"],
                    paddingLeft: ["0.4em", "0.15em", "0.15em", "-0.05em"]
                  },
                  transition: {
                    duration: 2.2,
                    ease: [0.16, 1, 0.3, 1],
                    times: [0, 0.4, 0.8, 1]
                  },
                  className: "text-[10px] md:text-xs font-light uppercase text-muted-foreground",
                  children: "Society"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "h-[1px] bg-foreground w-0 mt-6",
            animate: { width: [0, 200, 200, 0], x: [0, 0, 0, -200] },
            transition: {
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.4, 0.8, 1]
            }
          }
        )
      ] })
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-background relative overflow-hidden px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gradient rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full text-center glass-strong rounded-3xl p-12 shadow-soft relative z-10 border border-border/50", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("span", { className: "text-7xl md:text-8xl font-black text-foreground tracking-tighter", children: "404" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Lost in the Void" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "The page you're looking for drifted off into another epoch. It might have been moved or deleted." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "group inline-flex items-center justify-center rounded-full bg-brand-gradient text-white px-8 py-3 text-sm font-semibold shadow-soft hover:shadow-glow transition-all duration-300",
          children: [
            "Return to Base",
            /* @__PURE__ */ jsx("svg", { className: "ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
          ]
        }
      ) })
    ] })
  ] });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-hero-gradient px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center glass-strong rounded-3xl p-10 shadow-soft", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Something went sideways" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try again or head home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-brand-gradient text-white px-5 py-2.5 text-sm font-medium shadow-soft hover:shadow-glow transition",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "/", className: "rounded-full border border-input bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted transition", children: "Go home" })
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Epoch Society — Tech, Innovation & Creativity" },
      { name: "description", content: "A club for builders, designers, and dreamers turning ideas into prototypes." },
      { property: "og:title", content: "Epoch Society" },
      { property: "og:description", content: "Tech · Innovation · Creativity" },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Loader, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const $$splitComponentImporter$a = () => import("./members-B_ZV8xnq.js");
const Route$a = createFileRoute("/members")({
  head: () => ({
    meta: [{
      title: "Members — Epoch Society"
    }, {
      name: "description",
      content: "Meet the engineers, designers, and dreamers behind Epoch Society."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./login-BWP6RoYe.js");
const Route$9 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Staff login — Epoch Society"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./gallery-BMEf2Dh4.js");
const Route$8 = createFileRoute("/gallery")({
  head: () => ({
    meta: [{
      title: "Gallery — Epoch Society"
    }, {
      name: "description",
      content: "Moments from our events, studios, and late-night build sessions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./faq-BCaipSSM.js");
const Route$7 = createFileRoute("/faq")({
  head: () => ({
    meta: [{
      title: "FAQ — Epoch Society"
    }, {
      name: "description",
      content: "Frequently asked questions about joining Epoch Society."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./events-EaWqKhb4.js");
const Route$6 = createFileRoute("/events")({
  head: () => ({
    meta: [{
      title: "Events — Epoch Society"
    }, {
      name: "description",
      content: "Hackathons, salons, and roundtables hosted by Epoch Society."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./developer-members-_BdasIG9.js");
const Route$5 = createFileRoute("/developer-members")({
  head: () => ({
    meta: [{
      title: "Manage Members — Epoch Society"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./developer-events-LhDNmLdM.js");
const Route$4 = createFileRoute("/developer-events")({
  head: () => ({
    meta: [{
      title: "Manage Events — Epoch Society"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./developer-D5pyXRnB.js");
const Route$3 = createFileRoute("/developer")({
  head: () => ({
    meta: [{
      title: "Developer Dashboard — Epoch Society"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-GBUSY9rD.js");
const Route$2 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Epoch Society"
    }, {
      name: "description",
      content: "Get in touch with Epoch Society."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BxloScFk.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Epoch Society — Tech, Innovation & Creativity"
    }, {
      name: "description",
      content: "Hackathons, salons, and quiet talks for builders shaping what comes next."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./event._id-Br7KTHVN.js");
const Route = createFileRoute("/event/$id")({
  head: () => ({
    meta: [{
      title: "Event details — Epoch Society"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MembersRoute = Route$a.update({
  id: "/members",
  path: "/members",
  getParentRoute: () => Route$b
});
const LoginRoute = Route$9.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$b
});
const GalleryRoute = Route$8.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$b
});
const FaqRoute = Route$7.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$b
});
const EventsRoute = Route$6.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$b
});
const DeveloperMembersRoute = Route$5.update({
  id: "/developer-members",
  path: "/developer-members",
  getParentRoute: () => Route$b
});
const DeveloperEventsRoute = Route$4.update({
  id: "/developer-events",
  path: "/developer-events",
  getParentRoute: () => Route$b
});
const DeveloperRoute = Route$3.update({
  id: "/developer",
  path: "/developer",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const EventIdRoute = Route.update({
  id: "/event/$id",
  path: "/event/$id",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  DeveloperRoute,
  DeveloperEventsRoute,
  DeveloperMembersRoute,
  EventsRoute,
  FaqRoute,
  GalleryRoute,
  LoginRoute,
  MembersRoute,
  EventIdRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
