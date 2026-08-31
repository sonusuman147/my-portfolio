import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Game from "./components/Game";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DataBackground from "./components/DataBackground";
import CursorEffects from "./components/CursorEffects";
import Loader from "./components/Loader";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(() => {
    // Check if we've already shown the loader in this session
    return sessionStorage.getItem("portfolio_booted") !== "true";
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("portfolio_booted", "true");
    setLoading(false);
  };

  // Stop scrolling while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-bg text-ink font-body">
      {loading && <Loader onComplete={handleLoaderComplete} />}
      
      <DataBackground />
      <CursorEffects />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:text-[#0B0F1C] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      
      {/* Wrap content in a fade-in div after loading */}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Game />
          <Skills />
          <Education />
          <Certifications />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
