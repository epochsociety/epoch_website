import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
      initial={{ clipPath: "inset(0% 0 0% 0)" }}
      exit={{ clipPath: "inset(50% 0 50% 0)", opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Top Line */}
        <motion.div
          className="h-[1px] bg-foreground w-0 mb-6"
          animate={{ width: [0, 200, 200, 0], x: [0, 0, 0, 200] }}
          transition={{
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.4, 0.8, 1],
          }}
        />

        {/* Typographic Core */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{
            opacity: [0, 1, 1, 0],
            filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(12px)"],
          }}
          transition={{
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.4, 0.8, 1],
          }}
          className="flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{
              letterSpacing: ["0.1em", "0.4em", "0.4em", "0.8em"],
              paddingLeft: ["0.1em", "0.4em", "0.4em", "0.8em"],
            }}
            transition={{
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.4, 0.8, 1],
            }}
            className="text-xl md:text-2xl font-medium uppercase text-foreground"
          >
            Epoch
          </motion.span>
          <motion.span
            animate={{
              letterSpacing: ["0.4em", "0.15em", "0.15em", "-0.05em"],
              paddingLeft: ["0.4em", "0.15em", "0.15em", "-0.05em"],
            }}
            transition={{
              duration: 2.2,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.4, 0.8, 1],
            }}
            className="text-[10px] md:text-xs font-light uppercase text-muted-foreground"
          >
            Society
          </motion.span>
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          className="h-[1px] bg-foreground w-0 mt-6"
          animate={{ width: [0, 200, 200, 0], x: [0, 0, 0, -200] }}
          transition={{
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.4, 0.8, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
