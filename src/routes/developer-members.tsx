import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Users, Search, Plus, Save, Trash2, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { store, type Member } from "@/lib/storage";

export const Route = createFileRoute("/developer-members")({
  head: () => ({ meta: [{ title: "Manage Members — Epoch Society" }] }),
  component: DeveloperMembers,
});

function DeveloperMembers() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [members, setMembers] = useState<Member[]>(() => store.getMembers());
  const [memberYear, setMemberYear] = useState<"2025" | "2026">("2026");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) { navigate({ to: "/login" }); return; }
    if (s.role !== "developer") { navigate({ to: "/events" }); return; }
    setReady(true);
    
    const upd = () => setMembers(store.getMembers());
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);

  if (!ready) return null;

  function flash(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  }

  function saveMember(m: Member) { store.upsertMember(m); flash("Member saved"); }
  function deleteMember(id: string) { store.removeMember(id); flash("Member removed"); }
  function addMember() {
    store.upsertMember({
      id: crypto.randomUUID(),
      name: "New member",
      role: "Role",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
      bio: "Short bio",
      year: memberYear,
      email: "",
      phone: "",
    });
  }

  const displayedMembers = members.filter(m => 
    (m.year || "2026") === memberYear && 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

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
                    <Users className="w-5 h-5" />
                  </div>
                 <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Manage Members</h1>
              </div>
              <p className="mt-2 text-muted-foreground">Add, edit, and organize society members across different years.</p>
            </div>
            {msg && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft">{msg}</motion.div>}
          </motion.div>

          <div className="glass-strong rounded-3xl p-6 shadow-soft space-y-6">
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setMemberYear("2025")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${memberYear === "2025" ? "bg-brand-gradient text-white shadow-soft" : "glass text-muted-foreground hover:text-foreground"}`}
                  >
                    2025 Team
                  </button>
                  <button 
                    onClick={() => setMemberYear("2026")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${memberYear === "2026" ? "bg-brand-gradient text-white shadow-soft" : "glass text-muted-foreground hover:text-foreground"}`}
                  >
                    2026 Team
                  </button>
                </div>
                
                <div className="relative w-full sm:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <input 
                     value={search} 
                     onChange={e => setSearch(e.target.value)}
                     placeholder="Search members..." 
                     className="w-full rounded-full bg-card border border-input pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition" 
                   />
                </div>
             </div>

             <div className="space-y-3">
                {displayedMembers.length === 0 && (
                  <div className="py-10 text-center text-muted-foreground text-sm glass rounded-2xl border border-border/50">
                    No members found matching your criteria.
                  </div>
                )}
                {displayedMembers.map((m) => (
                  <MemberRow key={m.id} member={m} onSave={saveMember} onDelete={deleteMember} />
                ))}
                <button onClick={addMember} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong hover:bg-card transition text-sm font-medium mt-4">
                  <Plus className="w-4 h-4" /> Add member to {memberYear}
                </button>
             </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function MemberRow({ member, onSave, onDelete }: { member: Member; onSave: (m: Member) => void; onDelete: (id: string) => void }) {
  const [m, setM] = useState(member);
  useEffect(() => setM(member), [member]);
  return (
    <div className="glass rounded-2xl p-4 flex flex-col items-start gap-4 border border-border/50">
      <div className="flex gap-3 w-full">
        <img 
          src={m.image} 
          alt={m.name} 
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&blur=100"; }}
          className="w-12 h-12 rounded-full object-cover shrink-0" 
        />
        <div className="grid grid-cols-2 gap-2 w-full">
          <input value={m.name} onChange={(e) => setM({ ...m, name: e.target.value })} placeholder="Name" className="rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
          <input value={m.role} onChange={(e) => setM({ ...m, role: e.target.value })} placeholder="Role" className="rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <input value={m.image} onChange={(e) => setM({ ...m, image: e.target.value })} placeholder="Image URL (e.g. /sam.jpg)" className="rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
        <input value={m.linkedin || ""} onChange={(e) => setM({ ...m, linkedin: e.target.value })} placeholder="LinkedIn URL" className="rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <input value={m.email || ""} onChange={(e) => setM({ ...m, email: e.target.value })} placeholder="Email address" className="rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
        <input value={m.phone || ""} onChange={(e) => setM({ ...m, phone: e.target.value })} placeholder="Phone number" className="rounded-lg bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2">
          <button onClick={() => onSave(m)} className="w-8 h-8 rounded-full grid place-items-center bg-brand-gradient text-white shadow-soft" aria-label="Save"><Save className="w-3.5 h-3.5" /></button>
          <button onClick={() => onDelete(m.id)} className="w-8 h-8 rounded-full grid place-items-center bg-muted hover:bg-destructive hover:text-destructive-foreground transition" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
        <span className="text-xs text-muted-foreground uppercase font-medium">{m.year || "2026"}</span>
      </div>
    </div>
  );
}
