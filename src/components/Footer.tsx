import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "./icons/BrandIcons";
import { profile } from "../data/portfolio";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const icons = [
  { href: profile.social.github, label: "GitHub", icon: GithubIcon },
  { href: profile.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: profile.social.twitter, label: "X / Twitter", icon: TwitterIcon },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-edge py-10">
      <Reveal>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left font-mono">
            <p className="text-sm text-ink">
              © {year} {profile.name}.
            </p>
            <p className="text-xs text-muted mt-1 flex items-center justify-center sm:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              SYSTEM.ONLINE
            </p>
          </div>
          <div className="flex items-center gap-2">
            {icons.map(({ href, label, icon: Icon }) => (
              <Magnetic key={label} strength={8}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="h-9 w-9 grid place-items-center rounded-full border border-edge text-muted transition-all duration-300 hover:scale-110 hover:text-accent hover:border-accent hover:bg-accentSoft"
                >
                  <Icon size={15} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
