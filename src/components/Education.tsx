import { education } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 border-t border-edge">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="04 — EDUCATION" title="Academic timeline" />
        </Reveal>

        <Reveal>
          <div className="relative max-w-3xl">
            <div
              className="timeline-line absolute left-[7px] top-2 bottom-2 w-px bg-edge2 sm:left-[7px] origin-top scale-y-100 transition-transform duration-[1100ms] ease-out"
              aria-hidden="true"
            />
            <ol className="space-y-10">
              {education.map((item, i) => (
                <Reveal key={item.degree} delay={i * 100}>
                  <li className="cursor-interactive group relative pl-9">
                    <span
                      className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                        i === 0
                          ? "bg-accent border-accent"
                          : "bg-bg border-edge2 group-hover:border-accent"
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg sm:text-xl font-medium text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                        {item.degree}
                      </h3>
                      <span className="font-mono text-xs text-accent2 tnum">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.school}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted max-w-xl transition-colors duration-300 group-hover:text-ink/80">
                      {item.note}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
