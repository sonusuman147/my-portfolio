import { useEffect, useRef, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { nav, profile } from "../data/portfolio";
import logo from "../assets/logo.png";
import Magnetic from "./Magnetic";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Measure the active nav link so the pill indicator can glide to it.
  useEffect(() => {
    const update = () => {
      const el = itemRefs.current[active];
      const container = navRef.current;
      if (!el || !container) {
        setPill(null);
        return;
      }
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setPill({ left: elRect.left - containerRect.left, width: elRect.width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-edge shadow-sm shadow-black/5"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2.5 shrink-0 group"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt=""
            className="h-8 w-8 rounded-full border border-edge2 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-[15px] sm:text-base font-medium text-ink tracking-tight">
            {profile.name}
          </span>
        </a>

        <div ref={navRef} className="relative hidden lg:flex items-center gap-1">
          {pill && (
            <span
              className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-surface2 transition-all duration-300 ease-out"
              style={{ left: pill.left, width: pill.width }}
              aria-hidden="true"
            />
          )}
          {nav.map((item) => (
            <a
              key={item.href}
              ref={(el) => {
                itemRefs.current[item.href] = el;
              }}
              href={item.href}
              className={`relative z-10 px-3.5 py-2 text-sm rounded-full transition-colors duration-300 font-medium ${
                active === item.href ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Magnetic strength={6}>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="h-9 w-9 grid place-items-center rounded-full border border-edge2 text-ink transition-all duration-300 hover:scale-105 hover:border-accent hover:text-accent active:scale-95"
            >
              <span className="transition-transform duration-500 ease-out" style={{ transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)" }}>
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-full border border-edge2 text-ink transition-transform duration-300 active:scale-90"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out bg-bg border-b border-edge ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pb-5 pt-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors duration-200 ${
                active === item.href ? "text-ink bg-surface2" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
