import { motion } from "framer-motion";
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite, 
  SiGit, 
  SiPostgresql, 
  SiFlask, 
  SiSqlite,
  SiPython,
  SiMysql,
  SiMongodb
} from "react-icons/si";

const ICONS = [
  { Icon: SiReact, color: "#61DAFB", size: 40, x: -20, y: -30, rotate: -15, delay: 0 },
  { Icon: SiTypescript, color: "#3178C6", size: 48, x: 25, y: -45, rotate: 10, delay: 0.2 },
  { Icon: SiTailwindcss, color: "#06B6D4", size: 36, x: 40, y: 15, rotate: 25, delay: 0.4 },
  { Icon: SiVite, color: "#646CFF", size: 42, x: -35, y: 20, rotate: -20, delay: 0.6 },
  { Icon: SiGit, color: "#F05032", size: 32, x: 10, y: 40, rotate: 5, delay: 0.8 },
  { Icon: SiPostgresql, color: "#4169E1", size: 45, x: -15, y: 60, rotate: -10, delay: 1.0 },
  { Icon: SiFlask, color: "#ffffff", size: 38, x: 35, y: -10, rotate: 15, delay: 1.2 },
  { Icon: SiSqlite, color: "#003B57", size: 44, x: -45, y: -10, rotate: -5, delay: 1.4 },
  { Icon: SiPython, color: "#3776AB", size: 50, x: 5, y: -65, rotate: 20, delay: 1.6 },
  { Icon: SiMysql, color: "#4479A1", size: 35, x: 55, y: 45, rotate: -15, delay: 1.8 },
  { Icon: SiMongodb, color: "#47A248", size: 38, x: -50, y: 55, rotate: 10, delay: 2.0 },
];

export default function IconCloud() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] opacity-15">
        {ICONS.map(({ Icon, color, size, x, y, rotate, delay }, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay, ease: "easeOut" }}
            style={{
              x: `${x * 12}px`,
              y: `${y * 8}px`,
            }}
          >
            <motion.div
              animate={{ 
                y: ["-10px", "10px", "-10px"],
                rotate: [rotate - 5, rotate + 5, rotate - 5]
              }}
              transition={{
                duration: 4 + i % 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center bg-[#1a1a24]/50 border border-white/5 backdrop-blur-sm p-4 rounded-2xl shadow-xl"
            >
              <Icon size={size} color={color} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
