import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { store } from "@/lib/storage";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Epoch Society" },
      { name: "description", content: "Hackathons, salons, and roundtables hosted by Epoch Society." },
    ],
  }),
  component: Events,
});

function Events() {
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState(() => store.getEvents());

  useEffect(() => {
    setIsMounted(true);
    const upd = () => setEvents(store.getEvents());
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);

  if (!isMounted) return <PageShell><div className="min-h-screen" /></PageShell>;

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight"><span className="text-brand-gradient">Events</span></h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Curated gatherings where engineers and artists collide.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  to="/event/$id"
                  params={{ id: e.id }}
                  className="block group rounded-3xl overflow-hidden glass-strong shadow-soft h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(e.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold group-hover:text-brand-gradient transition">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
