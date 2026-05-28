import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles, User, LogOut, Home, Calendar, Image, Users, HelpCircle, Mail, MoreHorizontal, X } from "lucide-react";
import { getSession, logout, type Session } from "@/lib/auth";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/members", label: "Members", icon: Users },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const loc = useLocation();

  useEffect(() => {
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

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 hidden md:block"
      >
        <div
          className={`mx-auto max-w-6xl rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-soft" : "glass"
          }`}
        >
          <nav className="flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-2 pl-3 pr-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-gradient rounded-full blur-md opacity-60 group-hover:opacity-90 transition" />
                <div className="relative w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <span className="font-semibold tracking-tight text-foreground">
                Epoch Society
              </span>
            </Link>

            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="relative px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-300 block"
                    activeProps={{ className: "!text-foreground" }}
                  >
                    {({ isActive }) => (
                      <motion.div whileTap={{ scale: 0.95 }} className="flex items-center justify-center">
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-soft-gradient shadow-soft border border-white/10"
                            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                          />
                        )}
                        <span className="relative z-10">{l.label}</span>
                      </motion.div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {session ? (
              <div className="flex items-center gap-1 pr-1">
                <Link
                  to={session.role === "developer" ? "/developer" : "/events"}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-brand-gradient text-white text-sm font-medium shadow-soft hover:shadow-glow transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="inline capitalize">
                    {session.role}
                  </span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setSession(null);
                    window.location.href = "/";
                  }}
                  className="w-9 h-9 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}
          </nav>
        </div>
      </motion.header>

      {/* Minimal Top Bar for Mobile */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:hidden transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 pb-3" : "pb-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 pl-1 pr-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gradient rounded-full blur-md opacity-60 group-hover:opacity-90 transition" />
              <div className="relative w-8 h-8 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="font-semibold tracking-tight text-foreground text-sm">
              Epoch Society
            </span>
          </Link>
          
          {session ? (
             <div className="flex items-center gap-1">
              <Link
                to={session.role === "developer" ? "/developer" : "/events"}
                className="w-8 h-8 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft"
              >
                <User className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </motion.header>

      {/* Mobile Bottom Navbar Expandable */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex justify-center w-full pointer-events-none">
        <motion.nav 
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
          className="flex items-center gap-1 bg-background/40 backdrop-blur-2xl shadow-[0_16px_32px_-8px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-border/50 rounded-[2.5rem] px-2 py-2 pointer-events-auto overflow-visible relative"
          style={{ backdropFilter: "blur(32px) saturate(200%)", WebkitBackdropFilter: "blur(32px) saturate(200%)" }}
        >
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[2.5rem]" />
          <div className="flex items-center gap-1 relative z-10">
            <AnimatePresence mode="popLayout">
              {visibleLinks.map((l) => {
                const Icon = l.icon;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.4, filter: "blur(8px)", y: 10 }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, scale: 0.4, filter: "blur(8px)", y: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
                    key={l.to}
                  >
                    <Link
                      to={l.to}
                      onClick={() => {
                         if(mobileExpanded) setMobileExpanded(false);
                      }}
                      activeOptions={{ exact: l.to === "/" }}
                      className="relative flex items-center justify-center w-12 h-12 rounded-full text-muted-foreground transition-colors duration-300"
                      activeProps={{ className: "!text-foreground" }}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.span
                              layoutId="mobile-nav-pill"
                              className="absolute inset-0 rounded-full bg-background shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(0,0,0,0.02)] border border-border/60"
                              transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
                            />
                          )}
                          <Icon className={`w-5 h-5 relative z-10 drop-shadow-sm transition-colors ${isActive ? 'text-brand-purple' : ''}`} />
                        </>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          <motion.button 
            layout
            onClick={() => setMobileExpanded(!mobileExpanded)}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-12 h-12 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 shrink-0 bg-transparent relative z-10"
          >
            <motion.div
              animate={{ rotate: mobileExpanded ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {mobileExpanded ? <X className="w-5 h-5 drop-shadow-sm" /> : <MoreHorizontal className="w-5 h-5 drop-shadow-sm" />}
            </motion.div>
          </motion.button>
        </motion.nav>
      </div>
    </>
  );
}
