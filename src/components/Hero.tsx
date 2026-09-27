import { useEffect, useState, useRef } from "react";
import { ArrowDown, Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "./icons/BrandIcons";
import { profile } from "../data/portfolio";
import profileImg from "../assets/profile.jpg";
import resumeFile from "../assets/Sonu_Suman_Ojha_Resume.pdf";
import Magnetic from "./Magnetic";
import { usePointerFine } from "../hooks/usePointerFine";

const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: GithubIcon },
  { href: profile.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: profile.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: profile.social.twitter, label: "X / Twitter", icon: TwitterIcon },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

const DELAY = {
  badge: 0,
  name: 100,
  subtitle: 200,
  description: 300,
  buttons: 400,
  socials: 500,
};

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const isFine = usePointerFine();

  useEffect(() => {
    if (!isFine) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFine]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] lg:min-h-screen flex items-center pt-20 lg:pt-24 pb-12 lg:pb-16 overflow-hidden bg-[#060913]"
    >
      {/* Background Cosmic Radial Glow behind photo */}
      <div
        className="absolute right-[-10%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] lg:w-[640px] h-[340px] sm:h-[520px] lg:h-[640px] rounded-full bg-gradient-to-tr from-[#0284c7]/30 via-[#38bdf8]/20 to-[#6366f1]/25 blur-3xl pointer-events-none -z-10 animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      {/* Interactive Cinematic Highlight */}
      {isFine && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out -z-10"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 45%)`
          }}
        />
      )}

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 -z-20 opacity-15"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 my-auto">

        {/* Left Column: Hero Text Content */}
        <div className="w-full lg:w-[58%] pt-2 sm:pt-6 lg:pt-0 z-20">
          <div
            className="stagger-in flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#38bdf8] uppercase mb-4 sm:mb-6"
            style={{ animationDelay: `${DELAY.badge}ms` }}
          >
            <span className="h-[2px] w-6 sm:w-10 bg-[#38bdf8]/60" />
            HELLO, I AM
          </div>

          <h1
            className="stagger-in font-editorial italic font-normal text-4xl xs:text-5xl sm:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.92] sm:leading-[0.88] tracking-tight text-[#f1f5f9] drop-shadow-lg break-words"
            style={{ animationDelay: `${DELAY.name}ms` }}
          >
            Sonu Suman <br />
            <span className="pl-4 xs:pl-8 sm:pl-16 not-italic font-editorial italic text-[#e0f2fe]">Ojha</span>
          </h1>

          <p
            className="stagger-in mt-4 sm:mt-6 font-mono text-xs xs:text-sm sm:text-base text-[#94a3b8] max-w-xl leading-relaxed"
            style={{ animationDelay: `${DELAY.subtitle}ms` }}
          >
            {profile.headline}
          </p>

          <p
            className="stagger-in mt-3 sm:mt-5 max-w-xl text-xs xs:text-sm sm:text-[15px] leading-relaxed text-gray-400"
            style={{ animationDelay: `${DELAY.description}ms` }}
          >
            {profile.intro}
          </p>

          {/* Buttons Row */}
          <div
            className="stagger-in mt-6 sm:mt-8 flex flex-row items-center gap-3 sm:gap-4 flex-wrap"
            style={{ animationDelay: `${DELAY.buttons}ms` }}
          >
            <Magnetic strength={6}>
              <a
                href="#projects"
                className="btn-glow group inline-flex items-center justify-center gap-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-[13px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#0284c7]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Work
                <ArrowDown
                  size={14}
                  className="-rotate-90 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>

            <Magnetic strength={6}>
              <a
                href={resumeFile}
                download="Sonu_Suman_Ojha_Resume.pdf"
                className="btn-glow group inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/80 bg-[#0f172a]/70 hover:bg-[#1e293b] text-slate-200 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-[13px] font-mono font-medium tracking-wider uppercase transition-all duration-300 hover:border-slate-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileDown size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Resume
              </a>
            </Magnetic>
          </div>

          {/* Social Icons */}
          <div
            className="stagger-in mt-8 sm:mt-10 flex items-center gap-4 sm:gap-5 flex-wrap"
            style={{ animationDelay: `${DELAY.socials}ms` }}
          >
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Magnetic key={label} strength={8}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-slate-400 transition-all duration-300 hover:scale-110 hover:text-[#38bdf8] p-1"
                >
                  <Icon size={19} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Right Column: Vivid Profile Photo with Glow Aura */}
        <div
          className="w-full lg:w-[42%] flex justify-center lg:justify-end z-10 pointer-events-none relative lg:static"
          style={isFine ? {
            transform: `translate3d(${(mousePos.x - (typeof window !== 'undefined' ? window.innerWidth : 1000) / 2) * -0.012}px, ${(mousePos.y - (typeof window !== 'undefined' ? window.innerHeight : 800) / 2) * -0.012}px, 0)`
          } : undefined}
        >
          {/* Mobile Overlay Background Photo positioning */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[340px] sm:max-w-[440px] lg:hidden opacity-35 pointer-events-none -z-10 overflow-hidden">
            <img
              src={profileImg}
              alt=""
              className="w-full h-auto object-cover rounded-full filter saturate-110 contrast-105 mask-radial"
              style={{
                maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
              }}
            />
          </div>

          {/* Desktop Framed Portrait Photo */}
          <div className="hidden lg:block relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border border-slate-700/40 shadow-2xl shadow-sky-500/10">
            {/* Ambient Cosmic Background Ring behind portrait */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent pointer-events-none" />

            {/* Vivid Full-Color Profile Portrait */}
            <img
              src={profileImg}
              alt="Portrait of Sonu Suman Ojha"
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105 saturate-[1.15] contrast-[1.08] brightness-[1.02]"
            />

            {/* Soft Subtle Bottom Edge Fade */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060913] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#060913]/40 to-transparent" />
          </div>

        </div>

      </div>
    </section>
  );
}
