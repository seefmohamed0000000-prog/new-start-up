import { Power } from "lucide-react";
import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const InteractiveBackground = ({ cursorPos }: { cursorPos: { x: number, y: number } }) => {
  // Use framer-motion spring for smooth trailing of the cursor
  const springX = useSpring(0, { stiffness: 40, damping: 20 });
  const springY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    springX.set(cursorPos.x - 250); // 250 is half the width of the follower 
    springY.set(cursorPos.y - 250);
  }, [cursorPos, springX, springY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Base dark cinematic gradient */ }
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      
      {/* Ambient floating liquid orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, -80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-amber-600/10 blur-[80px] md:blur-[120px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, -30, 90, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-zinc-800/50 blur-[80px] md:blur-[120px] mix-blend-screen pointer-events-none"
      />

      {/* Interactive Cursor Follower - Acts like a light/liquid source */}
      {cursorPos.x !== -1000 && (
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none hidden md:block mix-blend-screen"
        />
      )}
    </div>
  );
};

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  // Subtle parallax effect and precise cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    // Hide cursor orb when leaving window
    const handleMouseLeave = () => setCursorPos({ x: -1000, y: -1000 });

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-amber-500/30 font-sans flex flex-col">
      {/* Background Interactive Element */}
      <InteractiveBackground cursorPos={cursorPos} />

      {/* Grain / Noise Overlay for a more analogue cinematic texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}
      ></div>

      {/* Header Container with subtle 3D tilt */}
      <motion.div 
        animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="relative z-20 w-full"
      >
        <nav className="absolute top-0 left-0 w-full px-6 py-5 md:px-10 md:py-6 flex items-center justify-between">
          
          {/* Name / Logo - Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-lg font-light tracking-[0.2em] uppercase cursor-default group"
          >
            <span className="font-bold text-white group-hover:text-amber-500 transition-colors duration-500">Seif</span>
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-500">Mohamed</span>
          </motion.div>

          {/* Liquid Glass Nav Pill - Center */}
          <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="hidden md:flex items-center gap-5 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group/nav"
          >
             {/* Inner glass highlight gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-20 pointer-events-none"></div>
             <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
             
             <a href="#about" className="text-zinc-300 hover:text-amber-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10">About me</a>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <a href="#works" className="text-zinc-300 hover:text-amber-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10">Works</a>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <a href="#contact" className="text-zinc-300 hover:text-amber-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10">Contact</a>
          </motion.div>

          {/* Power Icon - Right */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button aria-label="Action" className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,183,3,0.2)]">
              <Power className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors duration-300" strokeWidth={1.5} />
            </button>
          </motion.div>
        </nav>
      </motion.div>
      
      {/* Optional simple mobile navigation trigger if needed later */}
      <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
         <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs tracking-widest text-zinc-400 uppercase">
           Scroll to explore
         </div>
      </div>

    </div>
  );
}
