import { Link, useNavigate } from "@tanstack/react-router";
import { Github, Twitter, Instagram } from "lucide-react";
import { useEffect, useRef } from "react";

export function Footer() {
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "l"
      ) {
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

  return (
    <footer className="relative mt-32 pb-10 pt-16 px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 items-start">
        <div>
          <div className="font-semibold text-lg tracking-tight">
            <span className="text-brand-gradient">Epoch</span> Society
          </div>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            A club for tech, innovation, and creativity. Built with curiosity.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/events" className="hover:text-foreground transition">
            Events
          </Link>
          <Link to="/gallery" className="hover:text-foreground transition">
            Gallery
          </Link>
          <Link to="/members" className="hover:text-foreground transition">
            Members
          </Link>
          <Link to="/faq" className="hover:text-foreground transition">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-foreground transition">
            Contact
          </Link>
          <Link to="/login" className="hover:text-foreground transition">
            Staff Login
          </Link>
        </nav>

        <div className="flex items-center md:justify-end gap-2">
          <a
            href="#"
            aria-label="Twitter"
            className="w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 flex items-center justify-center sm:justify-start text-xs text-muted-foreground">
        <span>
          ©{" "}
          <span onClick={handleYearClick} className="cursor-text select-none">
            {new Date().getFullYear()}
          </span>{" "}
          Epoch Society. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
