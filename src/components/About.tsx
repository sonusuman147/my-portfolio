import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { about, stats } from "../data/portfolio";
import Reveal from "./Reveal";
import IconCloud from "./IconCloud";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numValue = parseInt(value.replace(/,/g, ''), 10);
  const spring = useSpring(0, { mass: 1, stiffness: 75, damping: 15 });
  
  useEffect(() => {
    if (isInView && !isNaN(numValue)) {
      spring.set(numValue);
    }
  }, [isInView, numValue, spring]);
  
  const display = useTransform(spring, (current) => 
    isNaN(numValue) ? value : Math.round(current).toString()
  );
  
  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 border-t border-edge relative overflow-hidden">
      <IconCloud />
      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-3 sm:mb-4">
            01 — ABOUT
          </div>
          <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink mb-8 sm:mb-10">
            A bit about <span className="font-editorial italic text-accent3">me</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-16">
          <div className="space-y-8 sm:space-y-10">
            <Reveal delay={100}>
              <p className="text-base xs:text-lg sm:text-xl text-ink leading-relaxed">
                {about.paragraphs[0]}
              </p>
            </Reveal>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-edge2">
              <Reveal delay={150}>
                <div className="space-y-3">
                  <div className="font-mono text-xs text-accent">01 // MY APPROACH</div>
                  <p className="text-sm xs:text-[15px] leading-relaxed text-muted">
                    {about.paragraphs[1]}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="space-y-3">
                  <div className="font-mono text-xs text-accent">02 // FOCUS AREAS</div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {about.focusAreas.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-edge2 bg-[#12121c]/50 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10.5px] sm:text-[11px] font-mono text-muted transition-colors hover:text-ink hover:border-accent2"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={250}>
            {/* Gradient Glow Wrapper */}
            <div className="relative lg:sticky lg:top-24 group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 via-transparent to-[#4169E1]/20 blur-xl opacity-50 group-hover:opacity-100 transition duration-700 pointer-events-none" />
              
              <div className="relative rounded-2xl border border-edge2 bg-[#0c0c16]/80 backdrop-blur-xl p-5 sm:p-8 transition-all duration-300 hover:border-[#8b5cf6]/40 hover:shadow-2xl hover:shadow-[#8b5cf6]/10">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8b5cf6] mb-5 sm:mb-6">
                  By the numbers
                </div>
                <dl className="grid grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-3 sm:gap-x-4">
                  {stats.map((s) => (
                    <div key={s.label} className="group/stat transition-transform duration-300 hover:-translate-y-1">
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-3xl xs:text-4xl sm:text-5xl font-medium text-ink tnum group-hover/stat:text-[#8b5cf6] transition-colors">
                        <AnimatedNumber value={s.value} />
                        <span className="text-[#8b5cf6]/70">{s.suffix}</span>
                      </dd>
                      <div className="mt-1.5 sm:mt-2 text-[10.5px] sm:text-[11px] font-mono tracking-wide text-muted leading-snug">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
