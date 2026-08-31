import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "./icons/BrandIcons";
import { profile } from "../data/portfolio";
import Reveal from "./Reveal";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", value: "github.com/sonusuman147", href: profile.social.github, icon: GithubIcon },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sonu-suman-ojha",
    href: profile.social.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    value: "instagram.com/nxt__sonu__",
    href: profile.social.instagram,
    icon: InstagramIcon,
  },
  { label: "X / Twitter", value: "x.com/SonusumanO", href: profile.social.twitter, icon: TwitterIcon },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-40 border-t border-edge relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-8">
              07 — CONTACT
            </div>
            <a 
              href={`mailto:${profile.email}`}
              className="cursor-interactive inline-block group relative"
            >
              <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-ink transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent3">
                LET'S WORK<br/>
                <span className="font-editorial italic">TOGETHER</span>
              </h2>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="max-w-xl mx-auto text-center text-lg sm:text-xl leading-relaxed text-ink mb-16">
            Open to internships, entry-level data analytics roles, and interesting
            collaborations.
          </p>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-[#8b5cf6]/10 via-accent2/10 to-[#8b5cf6]/10 blur-2xl opacity-50 pointer-events-none animate-pan-x" />
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 60} className={l.label === "Email" ? "lg:col-span-5 mb-3" : "lg:col-span-2"}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`cursor-interactive group flex items-center justify-between gap-3 rounded-2xl border border-edge2 bg-surface px-5 py-4 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 ${l.label === 'Email' ? 'btn-glow' : ''}`}
              >
                <span className="flex items-center gap-4">
                  <span className="h-10 w-10 grid place-items-center rounded-full bg-surface2 text-ink transition-all duration-300 group-hover:scale-110 group-hover:text-accent group-hover:bg-accentSoft">
                    <l.icon size={18} />
                  </span>
                  <span className="text-left">
                    <span className="block text-xs font-mono text-muted mb-0.5">{l.label}</span>
                    <span className="block text-[15px] font-medium text-ink transition-colors group-hover:text-accent2">{l.value}</span>
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-all duration-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110"
                />
              </a>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
