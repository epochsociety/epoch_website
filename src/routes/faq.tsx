import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Epoch Society" },
      { name: "description", content: "Frequently asked questions about joining Epoch Society." },
    ],
  }),
  component: FAQ,
});

const faqs = [
  { q: "Who can join Epoch Society?", a: "Anyone curious about tech, design, or making things. We welcome students, professionals, and self-taught builders." },
  { q: "Is there a membership fee?", a: "No. Membership is free. Some events have a small fee to cover materials." },
  { q: "How often do you host events?", a: "Roughly one large event per month plus weekly informal meetups." },
  { q: "Can I propose an event or talk?", a: "Yes — use the Contact page and tell us what you'd love to share." },
  { q: "Do you accept remote members?", a: "Absolutely. Many of our jams happen online and we ship recordings." },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="glass-strong rounded-3xl overflow-hidden shadow-soft"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 text-left p-6">
        <span className="font-medium">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="w-9 h-9 grid place-items-center rounded-full bg-brand-gradient text-white shrink-0">
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  return (
    <PageShell>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight"><span className="text-brand-gradient">FAQ</span></h1>
            <p className="mt-4 text-muted-foreground">Quick answers to common questions.</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((f, i) => <Item key={f.q} {...f} i={i} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
