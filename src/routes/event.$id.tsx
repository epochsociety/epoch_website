import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Calendar, ArrowLeft, Upload, Download, Trash2, FileText, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { store, type EventItem, type EventDoc } from "@/lib/storage";

export const Route = createFileRoute("/event/$id")({
  head: () => ({ meta: [{ title: "Event details — Epoch Society" }] }),
  component: EventDetails,
});

function readAsDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function EventDetails() {
  const { id } = Route.useParams();
  const [event, setEvent] = useState<EventItem | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(getSession());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setReady(true);
    setEvent(store.getEvent(id));
    setSession(getSession());
    
    const upd = () => {
      setEvent(store.getEvent(id));
      setSession(getSession());
    };
    window.addEventListener("epoch:data", upd);
    window.addEventListener("storage", upd);
    return () => {
      window.removeEventListener("epoch:data", upd);
      window.removeEventListener("storage", upd);
    };
  }, [id]);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        const url = await readAsDataURL(f);
        const doc: EventDoc = {
          id: crypto.randomUUID(),
          name: f.name,
          url,
          uploadedAt: Date.now(),
          size: f.size,
        };
        store.addDocument(id, doc);
      }
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return null;
  if (!event) {
    return (
      <PageShell>
        <div className="px-6 py-20 text-center text-muted-foreground">Event not found.</div>
      </PageShell>
    );
  }

  const isStaff = session?.role === "developer" || session?.role === "faculty";

  return (
    <PageShell>
      <section className="px-6 pt-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <Link to="/events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to events
          </Link>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl glass-strong shadow-soft overflow-hidden">
            <div className="aspect-[21/9] md:aspect-[21/8] overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&blur=100"; }}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                <Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-brand-gradient">{event.title}</h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {event.description}
              </p>
              
              {event.registerUrl && (
                <div className="mt-8">
                  <a href={event.registerUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition">
                    Register for event <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* FACULTY / DEVELOPER DOCUMENT SECTION */}
          {isStaff && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12">
              <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Internal Documents</h2>
                  <p className="text-sm text-muted-foreground">You are seeing this because you are logged in as <span className="font-medium text-foreground">{session.role}</span>.</p>
                </div>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong hover:bg-card transition cursor-pointer text-sm font-medium">
                  <Upload className="w-4 h-4" /> {busy ? "Uploading…" : "Upload file"}
                  <input type="file" multiple className="hidden" onChange={onUpload} disabled={busy} />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {event.documents.length === 0 && (
                  <div className="md:col-span-2 text-sm text-muted-foreground glass-strong rounded-2xl p-6 text-center">
                    No documents yet.
                  </div>
                )}
                {event.documents.map((d) => (
                  <div key={d.id} className="glass-strong rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href={d.url} target="_blank" rel="noreferrer" className="text-sm font-medium truncate block hover:text-brand-gradient hover:bg-clip-text transition">{d.name}</a>
                      <div className="text-xs text-muted-foreground">{(d.size / 1024).toFixed(1)} KB · {new Date(d.uploadedAt).toLocaleDateString()}</div>
                    </div>
                    <a href={d.url} download={d.name} className="w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-accent transition" aria-label="Download">
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => store.removeDocument(id, d.id)}
                      className="w-9 h-9 rounded-full grid place-items-center bg-muted hover:bg-destructive hover:text-destructive-foreground transition"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
