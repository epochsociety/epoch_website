import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Send, Mail, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Epoch Society" },
      { name: "description", content: "Get in touch with Epoch Society." },
    ],
  }),
  component: Contact,
});

// Web3Forms public access key. Get yours free at https://web3forms.com
// Set VITE_WEB3FORMS_KEY in your .env file.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New Epoch Society contact message");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setState("done");
        form.reset();
      } else {
        setState("error");
        setErrMsg(json.message || "Something went wrong.");
      }
    } catch (err) {
      setState("error");
      setErrMsg("Network error. Try again.");
    }
  }

  return (
    <PageShell>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight"><span className="text-brand-gradient">Connect</span></h1>
            <p className="mt-4 text-muted-foreground">We read every message. Say hello.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={onSubmit}
            className="glass-strong rounded-3xl p-8 shadow-soft space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field name="name" label="Your name" required />
              <Field name="email" type="email" label="Email" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition resize-none"
                placeholder="Tell us what's on your mind…"
              />
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5" /> hello@epochsociety.com
              </div>
              <button
                disabled={state === "sending"}
                type="submit"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Send message"}
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
            </div>

            {state === "done" && (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Message sent — we'll be in touch soon.
              </div>
            )}
            {state === "error" && (
              <div className="text-sm text-destructive">{errMsg}</div>
            )}
            {WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY" && (
              <div className="text-xs text-muted-foreground italic">
                Heads up: add your Web3Forms access key to <code className="text-foreground">VITE_WEB3FORMS_KEY</code> to actually deliver messages.
              </div>
            )}
          </motion.form>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl bg-card border border-input px-4 py-3 outline-none focus:ring-2 focus:ring-ring/40 transition"
      />
    </div>
  );
}
