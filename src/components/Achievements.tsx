import { MapPin, Calendar } from "lucide-react";
import { achievements } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 sm:py-24 md:py-32 border-t border-edge">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <SectionHeading tag="06 — ACHIEVEMENTS" title="Achievements & activities" />
        </Reveal>

        <div className="space-y-4">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="cursor-interactive group rounded-2xl border border-edge2 bg-gradient-to-r from-surface to-surface2 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent2/40 hover:shadow-xl hover:shadow-accent2/5">
                <div className="font-editorial italic text-2xl xs:text-3xl sm:text-4xl text-accent2 shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-base xs:text-lg font-medium text-ink">{a.title}</h3>
                    <span className="rounded-full border border-edge2 px-2.5 py-0.5 text-[10.5px] sm:text-[11px] font-mono text-muted">
                      {a.role}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} /> {a.place}
                    </span>
                    {a.period && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {a.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 sm:mt-3 text-xs xs:text-sm leading-relaxed text-muted max-w-3xl">
                    {a.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
