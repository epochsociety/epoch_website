import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Linkedin, Mail, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { store } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members — Epoch Society" },
      { name: "description", content: "Meet the engineers, designers, and dreamers behind Epoch Society." },
    ],
  }),
  component: Members,
});

function Members() {
  const [isMounted, setIsMounted] = useState(false);
  const [members, setMembers] = useState(() => store.getMembers());
  const [year, setYear] = useState<"2025" | "2026">("2026");
  const [session, setSession] = useState(getSession());

  useEffect(() => {
    setIsMounted(true);
    const upd = () => {
      setMembers(store.getMembers());
      setSession(getSession());
    };
    upd();
    window.addEventListener("epoch:data", upd);
    window.addEventListener("storage", upd);
    return () => {
      window.removeEventListener("epoch:data", upd);
      window.removeEventListener("storage", upd);
    };
  }, []);

  if (!isMounted) return <PageShell><div className="min-h-screen" /></PageShell>;

  const displayedMembers = members.filter((m) => (m.year || "2026") === year);

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight"><span className="text-brand-gradient">Members</span></h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">The humans shaping what we make next.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-3 mb-14">
            <button 
              onClick={() => setYear("2025")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${year === "2025" ? "bg-brand-gradient text-white shadow-soft" : "glass hover:bg-card text-muted-foreground hover:text-foreground"}`}
            >
              2025
            </button>
            <button 
              onClick={() => setYear("2026")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${year === "2026" ? "bg-brand-gradient text-white shadow-soft" : "glass hover:bg-card text-muted-foreground hover:text-foreground"}`}
            >
              2026
            </button>
          </motion.div>

          <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedMembers.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="text-center group"
                >
                  <div className="relative mx-auto w-40 h-40">
                    <div className="absolute inset-0 rounded-full bg-brand-gradient blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white shadow-soft">
                      <img 
                        src={m.image} 
                        alt={m.name} 
                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&blur=100"; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                        loading="lazy" 
                      />
                    </div>
                  </div>
                  <h3 className="mt-6 font-semibold text-lg">{m.name}</h3>
                  <div className="text-xs uppercase tracking-wider text-brand-gradient font-medium mt-1">{m.role}</div>
                  <div className="mt-3 flex justify-center gap-2">
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-[#0A66C2] transition-colors grid place-items-center" aria-label={`LinkedIn for ${m.name}`}>
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {session?.role === "faculty" && m.email && (
                      <a href={`mailto:${m.email}`} className="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-rose-500 transition-colors grid place-items-center" aria-label={`Email ${m.name}`} title={m.email}>
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {session?.role === "faculty" && m.phone && (
                      <a href={`tel:${m.phone}`} className="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:text-white hover:bg-emerald-500 transition-colors grid place-items-center" aria-label={`Call ${m.name}`} title={m.phone}>
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {displayedMembers.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No members found for this year.
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
