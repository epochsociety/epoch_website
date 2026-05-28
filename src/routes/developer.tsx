import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Eye, KeyRound, Users, Type, Save, Calendar, Clock, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getSession, getVisitCount, updatePassword } from "@/lib/auth";
import { store, type SiteContent } from "@/lib/storage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/developer")({
  head: () => ({ meta: [{ title: "Developer Dashboard — Epoch Society" }] }),
  component: Developer,
});

function Developer() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [visits, setVisits] = useState(0);
  const [content, setContent] = useState<SiteContent>(() => store.getContent());
  const [memberCount, setMemberCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [facultyPw, setFacultyPw] = useState("");
  const [devPw, setDevPw] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) { navigate({ to: "/login" }); return; }
    if (s.role !== "developer") { navigate({ to: "/events" }); return; }
    setReady(true);
    setVisits(getVisitCount());
    
    const upd = () => {
      setContent(store.getContent());
      setMemberCount(store.getMembers().length);
      setEventCount(store.getEvents().length);
    };
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, [navigate]);

  if (!ready) return null;

  function saveContent() {
    store.setContent(content);
    flash("Content saved");
  }
  
  function flash(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  }
  
  function savePasswords() {
    if (facultyPw) updatePassword("faculty", facultyPw);
    if (devPw) updatePassword("developer", devPw);
    setFacultyPw(""); setDevPw("");
    flash("Passwords updated");
  }

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Developer Dashboard</h1>
              <p className="mt-2 text-muted-foreground">Global control center for the Epoch Society platform.</p>
              <p className="mt-1 text-xs text-brand-gradient">Note: When using local images (like "sam.jpg"), place them directly in the <code className="text-foreground bg-muted px-1 rounded">public</code> folder.</p>
            </div>
            {msg && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2 rounded-full bg-brand-gradient text-white text-sm shadow-soft">{msg}</motion.div>}
          </motion.div>

          {/* Quick Stats & Navigation */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <Stat icon={Eye} label="Site visitors" value={visits.toString()} />
            
            <Link to="/developer-members" className="glass-strong rounded-3xl p-6 flex flex-col justify-between shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all group border border-border/50">
               <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white">
                    <Users className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
               </div>
               <div className="mt-4">
                  <div className="text-2xl font-semibold tracking-tight">{memberCount}</div>
                  <div className="text-xs font-medium text-brand-purple mt-1 uppercase tracking-widest">Manage Members</div>
               </div>
            </Link>

            <Link to="/developer-events" className="glass-strong rounded-3xl p-6 flex flex-col justify-between shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all group border border-border/50">
               <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient grid place-items-center text-white">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
               </div>
               <div className="mt-4">
                  <div className="text-2xl font-semibold tracking-tight">{eventCount}</div>
                  <div className="text-xs font-medium text-brand-purple mt-1 uppercase tracking-widest">Manage Events</div>
               </div>
            </Link>
          </div>

          <h2 className="text-lg font-semibold tracking-tight mb-4">Website Settings</h2>
          <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="content">
            
            {/* Landing page content */}
            <AccordionItem value="content" className="glass-strong rounded-3xl px-6 border-none shadow-soft">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0">
                    <Type className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Hero & Branding</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <Field label="Hero title" value={content.heroTitle} onChange={(v) => setContent({ ...content, heroTitle: v })} />
                  <Field label="Hero subtitle text" value={content.heroSubtitle} onChange={(v) => setContent({ ...content, heroSubtitle: v })} />
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Global Theme</h3>
                  <div>
                    <Select value={content.globalTheme || "default"} onValueChange={(v: any) => setContent({...content, globalTheme: v})}>
                      <SelectTrigger className="w-full bg-card">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Epoch Purple (Default)</SelectItem>
                        <SelectItem value="ocean">Ocean Blue</SelectItem>
                        <SelectItem value="emerald">Emerald Green</SelectItem>
                        <SelectItem value="sunset">Sunset Orange</SelectItem>
                        <SelectItem value="minimal-white">Minimal White</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Subtitle Styling</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Color (CSS var or Hex)</label>
                      <input value={content.subtitleColor || ""} onChange={(e) => setContent({...content, subtitleColor: e.target.value})} className="w-full rounded-xl bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition" placeholder="e.g. #ff0000" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Icon</label>
                      <Select value={content.subtitleIcon || "sparkle"} onValueChange={(v: any) => setContent({...content, subtitleIcon: v})}>
                        <SelectTrigger className="w-full bg-card">
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sparkle">Sparkle</SelectItem>
                          <SelectItem value="dot">Dot</SelectItem>
                          <SelectItem value="heart">Heart</SelectItem>
                          <SelectItem value="zap">Zap</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Icon Effect</label>
                      <Select value={content.subtitleIconEffect || "none"} onValueChange={(v: any) => setContent({...content, subtitleIconEffect: v})}>
                        <SelectTrigger className="w-full bg-card">
                          <SelectValue placeholder="Select effect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="pulse">Pulse</SelectItem>
                          <SelectItem value="heartbeat">Heartbeat</SelectItem>
                          <SelectItem value="rotate">Rotate</SelectItem>
                          <SelectItem value="bounce">Bounce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4">
                   <div className="flex items-center gap-3">
                    <Switch checked={content.counterEnabled ?? true} onCheckedChange={(v) => setContent({...content, counterEnabled: v})} />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Enable Counter Section</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Counter target" type="number" value={String(content.counterTarget)} onChange={(v) => setContent({ ...content, counterTarget: Number(v) || 0 })} />
                    <Field label="Counter label" value={content.counterLabel} onChange={(v) => setContent({ ...content, counterLabel: v })} />
                  </div>
                </div>

                <div className="mt-4">
                  <Field label="Hero tagline" value={content.heroTagline} onChange={(v) => setContent({ ...content, heroTagline: v })} multiline />
                </div>
                <div className="mt-4">
                  <Field label="About text" value={content.aboutText} onChange={(v) => setContent({ ...content, aboutText: v })} multiline />
                </div>
                <button onClick={saveContent} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition">
                  <Save className="w-4 h-4" /> Save all changes
                </button>
              </AccordionContent>
            </AccordionItem>

            {/* Timer Management */}
            <AccordionItem value="timer" className="glass-strong rounded-3xl px-6 border border-border/50 shadow-soft">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Timer Management</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 space-y-6">
                <div className="flex items-center gap-3 bg-muted/40 p-4 rounded-xl border border-border/50">
                  <Switch checked={content.timerEnabled ?? true} onCheckedChange={(v) => setContent({...content, timerEnabled: v})} />
                  <label className="text-sm font-medium">Show Countdown Timer on Homepage</label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Target Date (YYYY-MM-DD)" type="date" value={content.timerEventDate || ""} onChange={(v) => setContent({ ...content, timerEventDate: v })} />
                  <Field label="Target Time (HH:MM)" type="time" value={content.timerEventTime || ""} onChange={(v) => setContent({ ...content, timerEventTime: v })} />
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Timer Customization</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Theme Color (CSS var or Hex)</label>
                      <input value={content.timerColor || ""} onChange={(e) => setContent({...content, timerColor: e.target.value})} className="w-full rounded-xl bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition" placeholder="e.g. oklch(0.6 0.2 290)" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Border Color (CSS var or Hex)</label>
                      <input value={content.timerBorderColor || ""} onChange={(e) => setContent({...content, timerBorderColor: e.target.value})} className="w-full rounded-xl bg-card border border-input px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring/40 transition" placeholder="e.g. #ff00ff" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Animation Effect</label>
                      <Select value={content.timerEffect || "glow"} onValueChange={(v: any) => setContent({...content, timerEffect: v})}>
                        <SelectTrigger className="w-full bg-card">
                          <SelectValue placeholder="Select effect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="pulse">Soft Pulse</SelectItem>
                          <SelectItem value="glow">Neon Glow</SelectItem>
                          <SelectItem value="float">Floating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Layout Style</label>
                      <Select value={content.timerLayout || "merged"} onValueChange={(v: any) => setContent({...content, timerLayout: v})}>
                        <SelectTrigger className="w-full bg-card">
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="merged">Merged Island</SelectItem>
                          <SelectItem value="separate">Separate Blocks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <button onClick={saveContent} className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition">
                  <Save className="w-4 h-4" /> Save timer configuration
                </button>
              </AccordionContent>
            </AccordionItem>

            {/* Credentials */}
            <AccordionItem value="credentials" className="glass-strong rounded-3xl px-6 border-none shadow-soft">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-gradient grid place-items-center text-white shrink-0">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Security & Access</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <Field label="New developer password" value={devPw} onChange={setDevPw} type="password" placeholder="leave blank to keep" />
                  <Field label="New faculty password" value={facultyPw} onChange={setFacultyPw} type="password" placeholder="leave blank to keep" />
                </div>
                <button onClick={savePasswords} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition">
                  <Save className="w-4 h-4" /> Update passwords
                </button>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </section>
    </PageShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass-strong rounded-3xl p-6 flex items-center gap-4 shadow-soft border border-border/50">
      <div className="w-12 h-12 rounded-full bg-brand-gradient grid place-items-center text-white">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">{label}</div>
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
