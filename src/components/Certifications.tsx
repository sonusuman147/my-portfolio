import { Award } from "lucide-react";
import { certifications } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 border-t border-edge">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="05 — CERTIFICATIONS" title="Certifications" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 80}>
              <div className="cursor-interactive group h-full rounded-2xl border border-edge2 bg-surface p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
                <div className="h-10 w-10 rounded-xl bg-accentSoft grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Award size={18} className="text-accent" />
                </div>
                <h3 className="font-display text-lg font-medium text-ink leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs font-mono text-accent2">{cert.issuer}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-md bg-surface2 border border-edge px-2.5 py-1 text-[11px] text-muted transition-colors duration-300 group-hover:border-edge2"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
