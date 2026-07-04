import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { trackVisit } from "@/lib/auth";
import { useRouterState } from "@tanstack/react-router";
import { store } from "@/lib/storage";

export function PageShell({
  children,
  hideFooter = false,
}: {
  children: React.ReactNode;
  hideFooter?: boolean;
}) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [theme, setTheme] = useState(
    () => store.getContent().globalTheme || "default",
  );

  useEffect(() => {
    trackVisit();
    const upd = () => setTheme(store.getContent().globalTheme || "default");
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);

  const themeClass = theme === "default" ? "" : `theme-${theme}`;

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden bg-background transition-colors duration-500 ${themeClass}`}
    >
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-pink opacity-30 blur-3xl animate-blob" />
        <div
          className="absolute top-40 -right-24 w-[420px] h-[420px] rounded-full bg-brand-blue opacity-25 blur-3xl animate-blob"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute top-[60vh] left-1/3 w-[380px] h-[380px] rounded-full bg-brand-purple opacity-20 blur-3xl animate-blob"
          style={{ animationDelay: "-12s" }}
        />
      </div>

      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPath}
          initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -15 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pt-28"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!hideFooter && <Footer />}
    </div>
  );
}
