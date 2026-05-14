import { Power } from "lucide-react";
import { motion, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const InteractiveBackground = ({ cursorPos, activePage }: { cursorPos: { x: number, y: number }, activePage: string }) => {
  // Use framer-motion spring for smooth trailing of the cursor
  const springX = useSpring(0, { stiffness: 40, damping: 20 });
  const springY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    springX.set(cursorPos.x - 250); // 250 is half the width of the follower 
    springY.set(cursorPos.y - 250);
  }, [cursorPos, springX, springY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black transition-colors duration-1000">
      {/* Base dark cinematic gradient */ }
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      
      <AnimatePresence mode="wait">
        {activePage === 'home' && (
          <motion.div key="bg-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" 
              alt="Cinematic background"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen saturate-50"
            />
            {/* Color overlay for mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-amber-900/10 mix-blend-multiply"></div>
          </motion.div>
        )}

        {activePage === 'about' && (
          <motion.div key="bg-about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <motion.div
              animate={{
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[20vw] max-w-[800px] max-h-[300px] rounded-full bg-amber-500/10 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none"
            />
          </motion.div>
        )}

        {activePage === 'expertise' && (
          <motion.div key="bg-expertise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -40, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 8, delay: i * 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-[30%] ${i === 0 ? 'left-[20%]' : i === 1 ? 'left-[50%] -translate-x-1/2' : 'right-[20%]'} w-[20vw] h-[30vw] max-w-[300px] max-h-[400px] rounded-[100px] bg-amber-700/10 blur-[60px] md:blur-[90px] mix-blend-screen pointer-events-none`}
              />
            ))}
          </motion.div>
        )}

        {activePage === 'contact' && (
          <motion.div key="bg-contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <motion.div
              animate={{
                y: [0, -100, 0],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] rounded-[50%] bg-amber-600/10 blur-[120px] md:blur-[180px] mix-blend-screen pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

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
  const [activePage, setActivePage] = useState('home');

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
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative selection:bg-amber-500/30 font-sans flex flex-col">
      {/* Background Interactive Element */}
      <InteractiveBackground cursorPos={cursorPos} activePage={activePage} />

      {/* Grain / Noise Overlay for a more analogue cinematic texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}
      ></div>

      {/* Header Container with subtle 3D tilt */}
      <motion.div 
        animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <nav className="w-full px-6 py-5 md:px-10 md:py-6 flex items-center justify-between">
          
          {/* Name / Logo - Left */}
          <motion.a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl font-display tracking-[0.15em] cursor-pointer group flex items-center hover:scale-105 transition-transform"
          >
            <span className="font-semibold text-white group-hover:text-amber-500 transition-colors duration-500">Seif</span>
            <span className="text-zinc-400 group-hover:text-white transition-colors duration-500 ml-1.5 md:ml-2">Mohamed</span>
          </motion.a>

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
             
             <button onClick={() => setActivePage('about')} className={`${activePage === 'about' ? 'text-amber-400' : 'text-zinc-300'} hover:text-amber-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10`}>About me</button>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <button onClick={() => setActivePage('expertise')} className={`${activePage === 'expertise' ? 'text-amber-400' : 'text-zinc-300'} hover:text-amber-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10`}>Expertise</button>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <button onClick={() => setActivePage('contact')} className={`${activePage === 'contact' ? 'text-amber-400' : 'text-zinc-300'} hover:text-amber-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10`}>Contact</button>
          </motion.div>

          {/* Power Icon - Right */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button aria-label="Action" onClick={() => setActivePage('home')} className={`h-9 w-9 flex items-center justify-center rounded-full border border-white/10 ${activePage === 'home' ? 'bg-amber-500/20' : 'bg-white/5'} hover:bg-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,183,3,0.2)]`}>
              <Power className={`w-4 h-4 ${activePage === 'home' ? 'text-amber-400' : 'text-zinc-400'} group-hover:text-amber-400 transition-colors duration-300`} strokeWidth={1.5} />
            </button>
          </motion.div>
        </nav>
      </motion.div>
      
      {/* Content wrapper with fixed height to prevent scrolling, using animate presence for paginated feel */}
      <main className="relative z-10 flex-grow flex flex-col w-full h-full pt-24 pb-12 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* Home Section */}
          {activePage === 'home' && (
            <motion.section 
              key="page-home"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-grow flex flex-col items-center justify-center px-6 relative"
            >
              <div className="text-center relative z-10 max-w-4xl mx-auto">
                 <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter mb-4 md:mb-8 mix-blend-plus-lighter drop-shadow-2xl">
                   SEIF<br/>
                   <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-lg">MOHAMED</span>
                 </h1>
                 <p className="text-xs md:text-sm text-zinc-300 font-light tracking-[0.3em] max-w-md mx-auto uppercase leading-relaxed mt-8 drop-shadow-md">
                   Graphic Designer <span className="text-amber-500/50 mx-2">|</span> Visual Artist
                 </p>
                 
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setActivePage('about')}
                   className="mt-12 px-8 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 hover:text-amber-400 text-xs font-medium tracking-[0.2em] uppercase transition-all backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                 >
                   Explore Portfolio
                 </motion.button>
              </div>
            </motion.section>
          )}

          {/* About Section */}
          {activePage === 'about' && (
            <motion.section 
              key="page-about"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-grow flex items-center justify-center px-6 relative"
            >
               <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-16 rounded-3xl relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-default group">
                 {/* Internal subtle glow */}
                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 group-hover:from-amber-500/10 transition-colors duration-1000"></div>
                 
                 <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-amber-500 mb-6 flex items-center gap-4 relative z-10">
                   <span className="w-12 h-[1px] bg-amber-500/50"></span>
                   About me
                 </h2>
                 <p className="text-xl md:text-3xl font-light leading-relaxed text-zinc-300 mb-8 font-display relative z-10">
                   I blend <span className="text-white font-medium italic">liquid glass aesthetics</span> with gritty, cinematic storytelling to create visuals that don't just look good, but feel <span className="text-amber-400">alive</span>.
                 </p>
                 <div className="flex flex-wrap gap-4 relative z-10 mt-12">
                   {['Art Direction', 'Motion Graphics', 'UI/UX Design', '3D Generalist'].map((skill) => (
                     <span key={skill} className="px-4 py-2 rounded-full border border-white/10 text-[10px] md:text-xs tracking-widest uppercase text-zinc-400 bg-black/20 hover:text-white hover:border-amber-500/50 transition-colors">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>
            </motion.section>
          )}

          {/* Expertise Section */}
          {activePage === 'expertise' && (
            <motion.section 
              key="page-expertise"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-grow flex flex-col justify-center px-6 relative"
            >
              <div className="max-w-6xl mx-auto w-full">
                 <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-amber-500 mb-12 md:mb-16 flex items-center gap-4 justify-center">
                   <span className="w-12 h-[1px] bg-amber-500/50"></span>
                   Expertise
                   <span className="w-12 h-[1px] bg-amber-500/50"></span>
                 </h2>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                   {[
                     { title: 'Art Direction', desc: 'Guiding the visual narrative to create cohesive and striking brand worlds.' },
                     { title: 'Motion Graphics', desc: 'Breathing life into static designs with fluid, cinematic animations.' },
                     { title: 'Visual Identity', desc: 'Crafting unique structural design systems that stand out in the dark.' }
                   ].map((item, i) => (
                     <motion.div 
                       key={item.title}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: i * 0.15 }}
                       className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500 group shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden"
                     >
                       <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-700 pointer-events-none"></div>
                       <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-500 bg-black/20">
                         <span className="text-amber-500 font-display text-lg">0{i+1}</span>
                       </div>
                       <h3 className="text-lg md:text-xl font-display tracking-widest mb-4 group-hover:text-amber-400 transition-colors uppercase">{item.title}</h3>
                       <p className="text-zinc-400 font-light leading-relaxed text-xs md:text-sm">
                         {item.desc}
                       </p>
                     </motion.div>
                   ))}
                 </div>
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          {activePage === 'contact' && (
            <motion.section 
              key="page-contact"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-grow flex flex-col items-center justify-center px-6 relative"
            >
              <div className="text-center w-full max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light mb-8 mix-blend-plus-lighter">
                  Let's create <br/>
                  <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">magic.</span>
                </h2>
                <button className="mt-8 px-10 py-4 rounded-full bg-white text-black text-xs md:text-sm font-medium tracking-[0.2em] uppercase hover:bg-amber-400 hover:text-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,183,3,0.4)]">
                  Get in touch
                </button>
                
                <div className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-widest uppercase text-zinc-500 w-full">
                  <span>© 2026 Seif Mohamed</span>
                  <div className="flex gap-6">
                    <a href="#" className="hover:text-amber-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-amber-400 transition-colors">Behance</a>
                    <a href="#" className="hover:text-amber-400 transition-colors">LinkedIn</a>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

