import { a5 as useRouter, T as reactExports, K as jsxRuntimeExports } from "./server-CUuKPygb.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, f as usePresence, d as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion, a as Link, e as useNavigate } from "./router-BsJlmS0W.js";
function useRouterState(opts) {
  const contextRouter = useRouter();
  const router = contextRouter;
  {
    const state = router.stores.__store.get();
    return state;
  }
}
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
      size.direction = computedStyle.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = children.props?.ref ?? children?.ref;
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom, direction } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const isRTL = direction === "rtl";
    const x = anchorX === "left" ? isRTL ? `right: ${right}` : `left: ${left}` : isRTL ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      ref.current?.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender?.();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && safeToRemove?.();
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$d = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$d);
const __iconNode$c = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$c);
const __iconNode$b = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$b);
const __iconNode$a = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
];
const Github = createLucideIcon("github", __iconNode$a);
const __iconNode$9 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$9);
const __iconNode$8 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$8);
const __iconNode$7 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const SESSION_KEY = "epoch.session";
const CREDS_KEY = "epoch.creds";
const VISITS_KEY = "epoch.visits";
const DEFAULT_CREDS = {
  developer: { username: "developer", password: "epoch@dev2026" },
  faculty: { username: "faculty", password: "epoch@faculty2026" }
};
function getCreds() {
  if (typeof window === "undefined") return DEFAULT_CREDS;
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return DEFAULT_CREDS;
    return { ...DEFAULT_CREDS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CREDS;
  }
}
function updatePassword(role, newPassword) {
  const creds = getCreds();
  creds[role] = { ...creds[role], password: newPassword };
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}
function login(username, password) {
  const creds = getCreds();
  for (const role of ["developer", "faculty"]) {
    if (creds[role].username === username && creds[role].password === password) {
      const session = { role, username, loginAt: Date.now() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
  }
  return null;
}
function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function logout() {
  localStorage.removeItem(SESSION_KEY);
}
function trackVisit() {
  if (typeof window === "undefined") return;
  const key = "epoch.visited";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  const count = Number(localStorage.getItem(VISITS_KEY) || "0") + 1;
  localStorage.setItem(VISITS_KEY, String(count));
}
function getVisitCount() {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(VISITS_KEY) || "0");
}
const links = [
  { to: "/", label: "Home", icon: House },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/members", label: "Members", icon: Users },
  { to: "/faq", label: "FAQ", icon: CircleQuestionMark },
  { to: "/contact", label: "Contact", icon: Mail }
];
function Navbar() {
  const [session, setSession] = reactExports.useState(null);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [mobileExpanded, setMobileExpanded] = reactExports.useState(false);
  const loc = useLocation();
  reactExports.useEffect(() => {
    setSession(getSession());
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onStorage = () => setSession(getSession());
    window.addEventListener("scroll", onScroll);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", onStorage);
    };
  }, [loc.pathname]);
  const visibleLinks = mobileExpanded ? links : [links[0]];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.header,
      {
        initial: { y: -30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "fixed top-0 left-0 right-0 z-50 px-4 pt-4 hidden md:block",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mx-auto max-w-6xl rounded-full px-3 py-2 transition-all duration-500 ${scrolled ? "glass-strong shadow-soft" : "glass"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 pl-3 pr-2 group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-gradient rounded-full blur-md opacity-60 group-hover:opacity-90 transition" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-tight text-foreground", children: "Epoch Society" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex items-center gap-1", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  activeOptions: { exact: l.to === "/" },
                  className: "relative px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-300 block",
                  activeProps: { className: "!text-foreground" },
                  children: ({ isActive }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileTap: { scale: 0.95 }, className: "flex items-center justify-center", children: [
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        layoutId: "nav-pill",
                        className: "absolute inset-0 rounded-full bg-soft-gradient shadow-soft border border-white/10",
                        transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: l.label })
                  ] })
                }
              ) }, l.to)) }),
              session ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pr-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: session.role === "developer" ? "/developer" : "/events",
                    className: "flex items-center gap-2 px-3 py-2 rounded-full bg-brand-gradient text-white text-sm font-medium shadow-soft hover:shadow-glow transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline capitalize", children: session.role })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      logout();
                      setSession(null);
                      window.location.href = "/";
                    },
                    className: "w-9 h-9 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition",
                    "aria-label": "Log out",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
                  }
                )
              ] }) : null
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.header,
      {
        initial: { y: -30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: `fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:hidden transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 pb-3" : "pb-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 pl-1 pr-2 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-gradient rounded-full blur-md opacity-60 group-hover:opacity-90 transition" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-8 h-8 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-tight text-foreground text-sm", children: "Epoch Society" })
          ] }),
          session ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: session.role === "developer" ? "/developer" : "/events",
              className: "w-8 h-8 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" })
            }
          ) }) : null
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex justify-center w-full pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.nav,
      {
        layout: true,
        transition: { type: "spring", stiffness: 400, damping: 30, mass: 1 },
        className: "flex items-center gap-1 bg-background/40 backdrop-blur-2xl shadow-[0_16px_32px_-8px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-border/50 rounded-[2.5rem] px-2 py-2 pointer-events-auto overflow-visible relative",
        style: { backdropFilter: "blur(32px) saturate(200%)", WebkitBackdropFilter: "blur(32px) saturate(200%)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-gradient opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[2.5rem]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: visibleLinks.map((l) => {
            const Icon2 = l.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                layout: true,
                initial: { opacity: 0, scale: 0.4, filter: "blur(8px)", y: 10 },
                animate: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
                exit: { opacity: 0, scale: 0.4, filter: "blur(8px)", y: 10 },
                transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.8 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: l.to,
                    onClick: () => {
                      if (mobileExpanded) setMobileExpanded(false);
                    },
                    activeOptions: { exact: l.to === "/" },
                    className: "relative flex items-center justify-center w-12 h-12 rounded-full text-muted-foreground transition-colors duration-300",
                    activeProps: { className: "!text-foreground" },
                    children: ({ isActive }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          layoutId: "mobile-nav-pill",
                          className: "absolute inset-0 rounded-full bg-background shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(0,0,0,0.02)] border border-border/60",
                          transition: { type: "spring", stiffness: 400, damping: 28, mass: 0.8 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: `w-5 h-5 relative z-10 drop-shadow-sm transition-colors ${isActive ? "text-brand-purple" : ""}` })
                    ] })
                  }
                )
              },
              l.to
            );
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              layout: true,
              onClick: () => setMobileExpanded(!mobileExpanded),
              whileTap: { scale: 0.85 },
              transition: { type: "spring", stiffness: 400, damping: 25 },
              className: "w-12 h-12 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 shrink-0 bg-transparent relative z-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: mobileExpanded ? 90 : 0 },
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                  children: mobileExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 drop-shadow-sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-5 h-5 drop-shadow-sm" })
                }
              )
            }
          )
        ]
      }
    ) })
  ] });
}
function Footer() {
  const navigate = useNavigate();
  const clickCountRef = reactExports.useRef(0);
  const clickTimeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        navigate({ to: "/login" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
  const handleYearClick = () => {
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      navigate({ to: "/login" });
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative mt-32 pb-10 pt-16 px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid gap-10 md:grid-cols-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-lg tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "Epoch" }),
          " Society"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xs", children: "A club for tech, innovation, and creativity. Built with curiosity." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "hover:text-foreground transition", children: "Events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "hover:text-foreground transition", children: "Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/members", className: "hover:text-foreground transition", children: "Members" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/faq", className: "hover:text-foreground transition", children: "FAQ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-foreground transition", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center md:justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Twitter", className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Instagram", className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "GitHub", className: "w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto mt-10 flex items-center justify-center sm:justify-start text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "© ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: handleYearClick, className: "cursor-text select-none", children: (/* @__PURE__ */ new Date()).getFullYear() }),
      " Epoch Society. All rights reserved."
    ] }) })
  ] });
}
const KEY = "epoch.data";
const seed = {
  content: {
    globalTheme: "default",
    heroTitle: "Epoch Society",
    heroSubtitle: "Tech · Innovation · Creativity",
    heroTagline: "A collective of curious minds shaping the next chapter of human-computer creativity.",
    counterTarget: 240,
    counterLabel: "Active builders worldwide",
    counterEnabled: true,
    aboutText: "We host hackathons, design jams, and intimate talks where engineers, artists, and dreamers turn ideas into prototypes.",
    timerEventDate: "2026-10-01",
    timerEventTime: "10:00",
    timerEnabled: true,
    timerColor: "var(--brand-purple)",
    timerBorderColor: "var(--brand-pink)",
    timerEffect: "glow",
    timerLayout: "merged",
    subtitleColor: "var(--muted-foreground)",
    subtitleIcon: "sparkle",
    subtitleIconEffect: "none"
  },
  members: [
    {
      id: "m1",
      name: "Aarav Sharma",
      role: "President",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      bio: "Systems engineer. Loves rendering pipelines and slow coffee.",
      year: "2026",
      linkedin: "https://linkedin.com"
    },
    {
      id: "m2",
      name: "Mira Chen",
      role: "Design Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Brand and motion designer obsessed with delight in micro-details.",
      year: "2026",
      linkedin: "https://linkedin.com"
    },
    {
      id: "m3",
      name: "Ezra Okafor",
      role: "Innovation Chair",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Robotics researcher building soft actuators in his garage.",
      year: "2025",
      linkedin: "https://linkedin.com"
    },
    {
      id: "m4",
      name: "Lina Park",
      role: "Events Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Curates intimate salons where engineers meet sculptors.",
      year: "2026",
      linkedin: "https://linkedin.com"
    }
  ],
  events: [
    {
      id: "e1",
      title: "Neon Hack ’26",
      date: "2026-07-12",
      description: "48-hour hackathon exploring spatial interfaces and ambient AI.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      documents: [],
      registerUrl: "https://example.com/register",
      isUpcoming: true
    },
    {
      id: "e2",
      title: "Atelier Salon",
      date: "2026-08-03",
      description: "A studio evening for designers and engineers to swap process notes.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true
    },
    {
      id: "e3",
      title: "Origin: AI Roundtable",
      date: "2026-09-21",
      description: "Six speakers, one room, on the next decade of generative tools.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
      documents: [],
      isUpcoming: true
    }
  ]
};
function read() {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}
function write(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
  window.dispatchEvent(new CustomEvent("epoch:data"));
}
const store = {
  getAll: read,
  getContent: () => read().content,
  setContent: (c) => {
    const db = read();
    db.content = { ...db.content, ...c };
    write(db);
  },
  getMembers: () => read().members,
  upsertMember: (m) => {
    const db = read();
    const i = db.members.findIndex((x) => x.id === m.id);
    if (i >= 0) db.members[i] = m;
    else db.members.push(m);
    write(db);
  },
  removeMember: (id) => {
    const db = read();
    db.members = db.members.filter((m) => m.id !== id);
    write(db);
  },
  getEvents: () => read().events,
  getEvent: (id) => read().events.find((e) => e.id === id),
  upsertEvent: (e) => {
    const db = read();
    const i = db.events.findIndex((x) => x.id === e.id);
    if (i >= 0) db.events[i] = e;
    else db.events.push(e);
    write(db);
  },
  addDocument: (eventId, doc) => {
    const db = read();
    const e = db.events.find((x) => x.id === eventId);
    if (!e) return;
    e.documents.push(doc);
    write(db);
  },
  removeDocument: (eventId, docId) => {
    const db = read();
    const e = db.events.find((x) => x.id === eventId);
    if (!e) return;
    e.documents = e.documents.filter((d) => d.id !== docId);
    write(db);
  }
};
function PageShell({ children, hideFooter = false }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [theme, setTheme] = reactExports.useState(() => store.getContent().globalTheme || "default");
  reactExports.useEffect(() => {
    trackVisit();
    const upd = () => setTheme(store.getContent().globalTheme || "default");
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);
  const themeClass = theme === "default" ? "" : `theme-${theme}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen relative overflow-x-hidden bg-background transition-colors duration-500 ${themeClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-pink opacity-30 blur-3xl animate-blob" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-40 -right-24 w-[420px] h-[420px] rounded-full bg-brand-blue opacity-25 blur-3xl animate-blob", style: { animationDelay: "-6s" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60vh] left-1/3 w-[380px] h-[380px] rounded-full bg-brand-purple opacity-20 blur-3xl animate-blob", style: { animationDelay: "-12s" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.main,
      {
        initial: { opacity: 0, filter: "blur(10px)", y: 15 },
        animate: { opacity: 1, filter: "blur(0px)", y: 0 },
        exit: { opacity: 0, filter: "blur(10px)", y: -15 },
        transition: { duration: 0.5, ease: "easeInOut" },
        className: "pt-28",
        children
      },
      currentPath
    ) }),
    !hideFooter && /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  AnimatePresence as A,
  Calendar as C,
  Mail as M,
  PageShell as P,
  Sparkles as S,
  Users as U,
  getVisitCount as a,
  createLucideIcon as c,
  getSession as g,
  login as l,
  store as s,
  updatePassword as u
};
