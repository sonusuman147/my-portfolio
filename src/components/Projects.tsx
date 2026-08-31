import { ExternalLink, Users, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons/BrandIcons";
import { projects, type Project } from "../data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-edge2 px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-sm active:translate-y-0 active:scale-95"
        >
          <GithubIcon size={14} />
          GitHub
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/40 px-4 py-2 text-xs font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/20 hover:shadow-sm active:translate-y-0 active:scale-95"
        >
          <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          Live demo
        </a>
      )}
      {project.team && (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono">
          <Users size={13} />
          Team project
        </span>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="cursor-interactive group rounded-3xl border border-edge2 bg-surface p-7 sm:p-10 relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40">
        <div
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-[90px] transition-transform duration-500 group-hover:scale-125"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-widest shadow-[0_0_10px_rgba(249,115,22,0.15)]">
              FEATURED
            </span>
            <span className="text-[11px] font-mono text-teal-400/90 font-medium uppercase tracking-[0.14em]">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink">
            {project.name}
          </h3>
          <p className="mt-1 text-xs font-mono text-muted">{project.type}</p>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {project.features.map((f) => (
              <div key={f} className="flex items-start gap-2.5 text-sm text-ink/90">
                <span className="mt-2 h-1 w-1 rounded-full bg-accent2 shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-surface2 border border-edge px-2.5 py-1 text-[11px] font-mono text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primaryHref = project.live || project.github;
  return (
    <Reveal delay={(index % 2) * 90}>
      <article className="cursor-interactive group relative h-full rounded-2xl border border-edge2 bg-surface p-6 sm:p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[10px] font-mono text-teal-400/80 font-medium uppercase tracking-[0.12em]">
            {project.category}
          </span>
          {project.team && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted font-mono">
              <Users size={12} /> Team
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              {project.name}
            </h3>
            <p className="mt-0.5 text-xs font-mono text-muted">{project.type}</p>
          </div>
          {primaryHref && (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
              aria-label={`View ${project.name} project`}
            >
              View <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted flex-1">
          {project.description}
        </p>

        <ul className="mt-5 space-y-1.5">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink/85">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface2 border border-edge px-2 py-1 text-[10.5px] font-mono text-muted transition-colors duration-300 group-hover:border-edge2 group-hover:text-ink/80"
            >
              {t}
            </span>
          ))}
        </div>

        <ProjectLinks project={project} />
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-edge">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="02 — PROJECTS" title="Selected Work" />
        </Reveal>

        {featured && <div className="mb-6">{<FeaturedCard project={featured} />}</div>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
