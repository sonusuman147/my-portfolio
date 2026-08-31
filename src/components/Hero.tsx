import { useEffect, useState, useRef } from "react";
import { ArrowDown, Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "./icons/BrandIcons";
import { profile } from "../data/portfolio";
import profileImg from "../assets/profile.jpg";
import resumeFile from "../assets/Sonu_Suman_Ojha_Resume.pdf";
import Magnetic from "./Magnetic";

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#0a0a0a]"
    >
      {/* SVG Glitch Distortion Filter */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="glitch-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.4"
              numOctaves="1"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.4; 0.02 0.6; 0.01 0.4"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-10"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Interactive Cinematic Highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out -z-10"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(144, 172, 196, 0.07), transparent 40%)`
        }}
      />
      
      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 -z-20 opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between h-full">
        
        {/* Left: copy */}
        <div className="w-full lg:w-[60%] pt-10 lg:pt-0 pb-20 lg:pb-0 z-20 mix-blend-difference">
          <div 
            className="stagger-in flex items-center gap-4 text-[11px] sm:text-xs font-mono tracking-[0.3em] text-[#90acc4]/80 uppercase mb-8" 
            style={{ animationDelay: `${DELAY.badge}ms` }}
          >
            <span className="h-[1px] w-8 sm:w-12 bg-[#90acc4]/50" />
            HELLO, I AM
          </div>

          <h1
            className="stagger-in font-editorial italic font-light text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-[#a5c0d6] relative z-30 drop-shadow-2xl"
            style={{ animationDelay: `${DELAY.name}ms` }}
          >
            Sonu Suman <br />
            <span className="pl-12 md:pl-24">Ojha</span>
          </h1>

          <p
            className="stagger-in mt-6 sm:mt-8 font-mono text-sm sm:text-base text-[#90acc4]/90 max-w-lg leading-relaxed"
            style={{ animationDelay: `${DELAY.subtitle}ms` }}
          >
            {profile.headline}
          </p>

          <p
            className="stagger-in mt-6 max-w-xl text-[15px] sm:text-base leading-relaxed text-gray-400"
            style={{ animationDelay: `${DELAY.description}ms` }}
          >
            {profile.intro}
          </p>

          <div
            className="stagger-in mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: `${DELAY.buttons}ms` }}
          >
            <Magnetic strength={6}>
              <a
                href="#projects"
                className="btn-glow group inline-flex items-center justify-center gap-2 rounded-none border border-[#90acc4]/30 bg-transparent text-[#e5e7eb] px-7 py-3.5 text-[13px] font-mono tracking-widest uppercase transition-all duration-300 hover:bg-[#90acc4]/10 hover:border-[#90acc4]/80 active:scale-[0.98]"
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
                className="btn-glow group inline-flex items-center justify-center gap-2 rounded-none text-gray-400 px-5 py-3 text-[13px] font-mono tracking-widest uppercase transition-all duration-300 hover:text-[#e5e7eb] active:scale-[0.98]"
              >
                <FileDown size={14} className="transition-transform duration-300 group-hover:-translate-y-1" />
                Resume
              </a>
            </Magnetic>
          </div>

          <div
            className="stagger-in mt-14 flex items-center gap-5"
            style={{ animationDelay: `${DELAY.socials}ms` }}
          >
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Magnetic key={label} strength={10}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-[#90acc4]"
                >
                  <Icon size={18} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Right: Dramatic profile photo with subtle Parallax */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[70%] h-full pointer-events-none overflow-hidden -z-10 opacity-70 sm:opacity-90 lg:opacity-100 transition-transform duration-75 ease-linear"
          style={{ 
            transform: `translate3d(${(mousePos.x - (typeof window !== 'undefined' ? window.innerWidth : 1000) / 2) * -0.015}px, ${(mousePos.y - (typeof window !== 'undefined' ? window.innerHeight : 800) / 2) * -0.015}px, 0)` 
          }}
        >
          <div className="relative w-full h-full">
            
            {/* Base Image: Sharp, high contrast grayscale */}
            <img
              src={profileImg}
              alt="Portrait of Sonu Suman Ojha"
              className="absolute right-0 lg:right-[-5%] top-1/2 -translate-y-1/2 min-h-full min-w-full object-cover lg:object-contain object-right lg:object-right saturate-0 contrast-[1.4] brightness-90"
            />
            
            {/* Liquid Glitched Image Overlay */}
            <img
              src={profileImg}
              alt=""
              className="absolute right-0 lg:right-[-5%] top-1/2 -translate-y-1/2 min-h-full min-w-full object-cover lg:object-contain object-right lg:object-right saturate-0 contrast-[1.6] brightness-[0.85] opacity-80 mix-blend-screen"
              style={{
                filter: "url(#glitch-distortion)",
                maskImage: "linear-gradient(to right, transparent 30%, black 70%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 30%, black 70%)",
              }}
            />

            {/* Heavy Film Grain localized over the photo */}
            <div 
              className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }}
            />

            {/* Gradient Mask to blend image into the dark background naturally */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent lg:via-[#0a0a0a]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70" />
          </div>
        </div>

      </div>
    </section>
  );
}
