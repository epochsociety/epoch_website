import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Cpu, Palette, Rocket, Clock, Circle, Heart, Zap as ZapIcon } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { store, type SiteContent } from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Epoch Society — Tech, Innovation & Creativity" },
      { name: "description", content: "Hackathons, salons, and quiet talks for builders shaping what comes next." },
    ],
  }),
  component: Index,
});

const iconMap = {
  sparkle: Sparkles,
  dot: Circle,
  heart: Heart,
  zap: ZapIcon,
};

const effectMap = {
  none: {},
  heartbeat: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
  },
  rotate: {
    animate: { rotate: 360 },
    transition: { duration: 4, repeat: Infinity, ease: "linear" }
  },
  bounce: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

const timerEffectStyles = (effect: string, color: string) => {
  switch(effect) {
    case 'pulse': return {
      animate: { boxShadow: [`0 0 0px ${color}`, `0 0 30px ${color}`, `0 0 0px ${color}`] },
      transition: { duration: 2, repeat: Infinity }
    };
    case 'glow': return {
      style: { boxShadow: `0 0 25px ${color}` }
    };
    case 'float': return {
      animate: { y: [0, -10, 0] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    };
    default: return {};
  }
};

function Countdown({ date, time, config }: { date?: string; time?: string; config: SiteContent }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!date || !time) return;
    const target = new Date(`${date}T${time}`).getTime();
    
    const tick = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  if (!date || !time) return null;

  const timerColor = config.timerColor || 'var(--brand-purple)';
  const borderColor = config.timerBorderColor || 'var(--brand-pink)';
  const effectProps = timerEffectStyles(config.timerEffect || 'glow', timerColor);
  const isSeparate = config.timerLayout === 'separate';

  if (isSeparate) {
    return (
      <div className="flex gap-4 md:gap-6 items-center justify-center flex-wrap">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div 
            key={unit}
            {...effectProps}
            className="flex flex-col items-center glass-strong rounded-[24px] md:rounded-[32px] w-20 h-24 md:w-28 md:h-32 justify-center border-2 shadow-soft relative overflow-hidden"
            style={{ borderColor, ...effectProps.style }}
          >
            <div className="absolute inset-0 bg-brand-gradient opacity-5 pointer-events-none" />
            <span className="text-3xl md:text-5xl font-black tracking-tighter relative z-10" style={{ color: timerColor }}>
              {value.toString().padStart(2, '0')}
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1 relative z-10">
              {unit}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      {...effectProps}
      className="flex gap-3 md:gap-5 items-center justify-center p-8 rounded-[40px] glass-strong border-2 relative overflow-hidden"
      style={{ borderColor, ...effectProps.style }}
    >
      <div className="absolute inset-0 bg-brand-gradient opacity-5 pointer-events-none" />
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center relative z-10">
          <div className="w-16 h-16 md:w-24 md:h-24 grid place-items-center">
            <span className="text-3xl md:text-5xl font-black tracking-tighter" style={{ color: timerColor }}>
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">
            {unit}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}</span>;
}

function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState(() => store.getContent());
  const [eventsData, setEventsData] = useState(() => store.getEvents());

  useEffect(() => {
    setIsMounted(true);
    const upd = () => {
      setContent(store.getContent());
      setEventsData(store.getEvents());
    };
    upd();
    window.addEventListener("epoch:data", upd);
    return () => window.removeEventListener("epoch:data", upd);
  }, []);

  if (!isMounted) return <PageShell><div className="min-h-screen" /></PageShell>;

  const upcomingEvents = eventsData.filter(e => e.isUpcoming !== false);
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : eventsData;
  const top3Events = displayEvents.slice(0, 3);
  const eventsTitle = upcomingEvents.length > 0 ? "Upcoming" : "Past Events";
  const eventsSubtitle = upcomingEvents.length > 0 ? "A glimpse at what's brewing." : "Explore what we've built together.";

  const SubtitleIcon = iconMap[content.subtitleIcon || 'sparkle'] || Sparkles;
  const iconEffect = effectMap[content.subtitleIconEffect || 'none'] || {};

  const showCounter = content.counterEnabled ?? true;
  const showTimer = content.timerEnabled && content.timerEventDate && content.timerEventTime;

  return (
    <PageShell>
      {/* HERO */}
      <section className="px-6 pt-10 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-wide"
            style={{ color: content.subtitleColor || 'var(--muted-foreground)' }}
          >
            <motion.div {...iconEffect}>
              <SubtitleIcon className="w-3.5 h-3.5" />
            </motion.div>
            {content.heroSubtitle}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            <span className="text-brand-gradient">{content.heroTitle}</span>
            <br />
            <span className="text-foreground/90">where ideas become prototypes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground"
          >
            {content.heroTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-medium shadow-soft hover:shadow-glow transition"
            >
              Explore events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              to="/members"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong hover:bg-card transition font-medium"
            >
              Meet the members
            </Link>
          </motion.div>

          {/* Combined Timer and Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className={`mt-20 flex flex-col ${showCounter ? 'md:flex-row' : 'items-center'} justify-center gap-10 md:gap-16 w-full max-w-5xl mx-auto`}
          >
            {showTimer && (
              <div className={`flex flex-col items-center ${!showCounter ? 'w-full scale-110' : ''}`}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-medium">
                  <Clock className="w-4 h-4" /> Countdown to Next Event
                </div>
                <Countdown date={content.timerEventDate} time={content.timerEventTime} config={content} />
              </div>
            )}
            
            {showCounter && (
              <div className="flex flex-col items-center justify-center h-full">
                 <div className="glass-strong rounded-3xl px-8 py-8 flex flex-col items-center justify-center gap-4 shadow-soft min-w-[240px]">
                  <div className="w-12 h-12 rounded-full bg-brand-gradient grid place-items-center text-white shadow-glow">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-semibold tracking-tight text-brand-gradient">
                      <Counter to={content.counterTarget} />+
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium">{content.counterLabel}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Three pillars, one society</h2>
            <p className="mt-3 text-muted-foreground">{content.aboutText}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Tech", body: "Build with the newest tools — from on-device AI to robotics." },
              { icon: Sparkles, title: "Innovation", body: "Question defaults. Ship small. Iterate fast and openly." },
              { icon: Palette, title: "Creativity", body: "Design, sound, narrative — engineering with taste." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl p-8 glass-strong shadow-soft overflow-hidden"
              >
                <div className="w-14 h-14 rounded-full bg-brand-gradient grid place-items-center text-white shadow-soft">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-brand-gradient opacity-0 group-hover:opacity-20 blur-2xl transition" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{eventsTitle}</h2>
              <p className="mt-2 text-muted-foreground">{eventsSubtitle}</p>
            </div>
            <Link to="/events" className="text-sm font-medium text-foreground hover:text-brand-gradient hover:bg-clip-text transition">
              See all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {top3Events.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-3xl overflow-hidden glass-strong shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={e.image} 
                    alt={e.title} 
                    onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&blur=100"; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                    loading="lazy" 
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</div>
                  <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{e.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
