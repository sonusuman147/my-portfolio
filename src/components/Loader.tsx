import { useEffect, useState } from "react";

const BOOT_SEQUENCE = [
  { text: "Initializing system modules...", delay: 150, progress: 15 },
  { text: "Loading dependencies [react, vite, tailwind]...", delay: 250, progress: 35 },
  { text: "Mounting component tree...", delay: 200, progress: 60 },
  { text: "Establishing secure connection...", delay: 200, progress: 85 },
  { text: "System Ready.", delay: 250, progress: 100 },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalDelay = 0;
    
    BOOT_SEQUENCE.forEach((step, index) => {
      totalDelay += step.delay;
      
      setTimeout(() => {
        setLines(prev => [...prev, step.text]);
        setProgress(step.progress);
        
        // If it's the last step, wait a moment then fade out
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 500);
          }, 300);
        }
      }, totalDelay);
    });
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a12] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        fading ? "opacity-0 scale-[1.02] blur-md pointer-events-none" : "opacity-100 scale-100 blur-0"
      }`}
    >
      <div className="w-full max-w-2xl px-4">
        {/* macOS Terminal Window */}
        <div className="rounded-xl overflow-hidden bg-[#12121c] border border-gray-800 shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a24] border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-[11px] font-mono text-gray-400 select-none">
              bash — 80×24
            </div>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 font-mono">
            <div className="text-xl sm:text-2xl font-bold text-[#8b5cf6] mb-6 flex items-center">
              &lt;System.Init/&gt;
              <span className="w-3 h-6 ml-2 bg-[#8b5cf6] animate-pulse" />
            </div>

            <div className="space-y-2 mb-8 min-h-[140px] text-sm sm:text-[15px] text-gray-300">
              {lines.map((line, i) => (
                <div key={i} className="flex items-start">
                  <span className="text-gray-600 mr-4">[{new Date().toISOString().substring(11, 19)}]</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>BOOT_PROGRESS</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8b5cf6] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
