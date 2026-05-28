import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Calendar, Save, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { store, type EventItem } from "@/lib/storage";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/developer-events")({
  head: () => ({ meta: [{ title: "Manage Events — Epoch Society" }] }),
  component: DeveloperEvents,
});

function DeveloperEvents() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState<EventItem[]>(() => store.getEvents());
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) { navigate({ to: "/login" }); return; }
    if (s.role !== "developer") { navigate({ to: "/events" }); return; }
    setReady(true);
    
    const upd = () => setEvents(store.getEvents());
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);

  if (!ready) return null;

  function flash(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  }

  function saveEvent(e: EventItem) { 
    store.upsertEvent(e); 
    flash("Event saved"); 
  }

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/developer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                 <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Manage Events</h1>
              </div>
              <p className="mt-2 text-muted-foreground">Update event metadata and control which events appear on the homepage.</p>
            </div>
            {msg && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft">{msg}</motion.div>}
          </motion.div>

          <div className="space-y-6">
            {events.map((e) => (
              <EventRow key={e.id} event={e} onSave={saveEvent} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function EventRow({ event, onSave }: { event: EventItem; onSave: (e: EventItem) => void }) {
  const [e, setE] = useState(event);
  useEffect(() => setE(event), [event]);
  
  return (
    <div className="glass-strong rounded-3xl p-6 flex flex-col gap-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{e.title}</h3>
        <span className="text-xs text-brand-gradient font-medium uppercase tracking-wider">{e.date}</span>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Event Title" value={e.title} onChange={(v) => setE({ ...e, title: v })} />
        <Field label="Event Date" type="date" value={e.date} onChange={(v) => setE({ ...e, date: v })} />
        <div className="md:col-span-2">
          <Field label="Description" value={e.description} multiline onChange={(v) => setE({ ...e, description: v })} />
        </div>
        <Field label="Image URL (e.g. /poster.jpg)" value={e.image} onChange={(v) => setE({ ...e, image: v })} />
        <Field label="Registration / External URL" placeholder="e.g. Luma link" value={e.registerUrl || ""} onChange={(v) => setE({ ...e, registerUrl: v })} />
      </div>

      <div className="flex items-center gap-3 bg-card/50 p-4 rounded-xl border border-input mt-2">
        <Switch checked={e.isUpcoming ?? false} onCheckedChange={(v) => setE({...e, isUpcoming: v})} />
        <label className="text-sm font-medium">Feature in "Upcoming Events" on Homepage</label>
      </div>

      <div className="flex justify-end mt-2">
        <button onClick={() => onSave(e)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-medium shadow-soft hover:shadow-glow transition">
          <Save className="w-4 h-4" /> Save event changes
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", multiline, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder} className="w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition resize-none" />
      ) : (
        <input value={value} type={type} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" />
      )}
    </div>
  );
}
