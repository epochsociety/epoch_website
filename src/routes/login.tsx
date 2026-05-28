import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Staff login — Epoch Society" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const s = login(username.trim(), password);
    if (!s) return setErr("Invalid credentials");
    navigate({ to: s.role === "developer" ? "/developer" : "/events" });
  }

  return (
    <PageShell hideFooter>
      <section className="px-6 py-20 min-h-[80vh] grid place-items-center">
        <motion.form
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          onSubmit={submit}
          className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-soft space-y-5"
        >
          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold">Staff access</h1>
            <p className="text-sm text-muted-foreground">Developer & faculty login</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Username</label>
            <input value={username} onChange={(e) => setU(e.target.value)} className="w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" placeholder="developer or faculty" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setP(e.target.value)} className="w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition" />
          </div>

          {err && <div className="text-sm text-destructive">{err}</div>}

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition">
            <LogIn className="w-4 h-4" /> Sign in
          </button>

          <div className="text-xs text-muted-foreground text-center leading-relaxed pt-2 border-t border-border">
            Default credentials:<br />
            <code className="text-foreground">developer / epoch@dev2026</code><br />
            <code className="text-foreground">faculty / epoch@faculty2026</code>
          </div>
        </motion.form>
      </section>
    </PageShell>
  );
}
