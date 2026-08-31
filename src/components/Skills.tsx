import { skillGroups } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import IconCloud from "./IconCloud";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-edge relative overflow-hidden">
      <IconCloud />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <Reveal>
          <SectionHeading tag="03 — SKILLS" title="Technical toolkit" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 70}>
              <div className="cursor-interactive h-full rounded-2xl border border-edge2 bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5 group">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-lg text-ink font-medium transition-transform duration-300 group-hover:translate-x-0.5">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10px] text-muted transition-colors duration-300 group-hover:text-accent2">
                    {group.note}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-surface2 border border-edge px-3 py-1.5 text-[13px] text-ink transition-all duration-300 group-hover:border-accent3/30 group-hover:text-accent/90"
                    >
                      {s}
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
