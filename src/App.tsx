import { Power, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { motion, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";

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
      
      {/* Universal Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
           className="absolute inset-0 w-full h-full"
           animate={{
             filter: activePage === 'home' ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.6) saturate(0.8)',
             scale: activePage === 'home' ? 1.0 : 1.05,
           }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="/hero.png" 
            alt="Hero image"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
             (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2560&auto=format&fit=crop";
            }}
          />
        </motion.div>
        
        {/* Overall dark overlay to prevent background from overpowering content */}
        <motion.div 
          className="absolute inset-0"
          animate={{ backgroundColor: activePage === 'home' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.6)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Dark overlay specifically at the bottom for navigation readability if needed */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      <AnimatePresence mode="wait">
        {activePage === 'about' && (
          <motion.div key="bg-about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <motion.div
              animate={{
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[20vw] max-w-[800px] max-h-[300px] rounded-full bg-teal-500/10 blur-[100px] md:blur-[150px] mix-blend-screen pointer-events-none"
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
                className={`absolute top-[30%] ${i === 0 ? 'left-[20%]' : i === 1 ? 'left-[50%] -translate-x-1/2' : 'right-[20%]'} w-[20vw] h-[30vw] max-w-[300px] max-h-[400px] rounded-[100px] bg-teal-700/10 blur-[60px] md:blur-[90px] mix-blend-screen pointer-events-none`}
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
              className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] rounded-[50%] bg-teal-600/10 blur-[120px] md:blur-[180px] mix-blend-screen pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cursor Follower - Acts like a light/liquid source */}
      {cursorPos.x !== -1000 && (
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px] pointer-events-none hidden md:block mix-blend-screen"
        />
      )}
    </div>
  );
};

const PAGES = ['home', 'about', 'expertise', 'contact'];

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activePage = PAGES[pageIndex];

  const handleNav = (targetPage: string) => {
    const targetIdx = PAGES.indexOf(targetPage);
    if (targetIdx !== pageIndex) {
      setDirection(targetIdx > pageIndex ? 1 : -1);
      setPageIndex(targetIdx);
    }
  };

  const lastScrollTime = useRef(0);

  // Subtle parallax effect and precise cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    const handleMouseLeave = () => setCursorPos({ x: -1000, y: -1000 });

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 700) return; // Prevent rapid scrolling but feel responsive
      
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0 && pageIndex < PAGES.length - 1) {
           setDirection(1);
           setPageIndex(p => p + 1);
           lastScrollTime.current = now;
        } else if (e.deltaY < 0 && pageIndex > 0) {
           setDirection(-1);
           setPageIndex(p => p - 1);
           lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [pageIndex]);

  const pageVariants = {
    initial: (direction: number) => ({
      y: direction > 0 ? "20%" : "-20%",
      opacity: 0,
      scale: 0.95,
      clipPath: direction > 0 ? "inset(100% 0% 0% 0% round 30px)" : "inset(0% 0% 100% 0% round 30px)",
      filter: "blur(10px)"
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-20%" : "20%",
      opacity: 0,
      scale: 0.95,
      clipPath: direction > 0 ? "inset(0% 0% 100% 0% round 30px)" : "inset(100% 0% 0% 0% round 30px)",
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative selection:bg-teal-500/30 font-sans flex flex-col">
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
        className="fixed top-0 left-0 w-full z-40 pointer-events-none"
      >
        <div className="w-full h-full relative pointer-events-none">
          {/* Global Branding Name that smoothly morphs positioning */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            initial={false}
            animate={{
              top: activePage === 'home' ? '48px' : '24px',
              left: activePage === 'home' ? '50%' : '32px',
              x: activePage === 'home' ? '-50%' : '0%',
              y: 0,
              opacity: 1
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-auto cursor-pointer group flex items-center"
          >
            {/* We overlay the two versions and crossfade them to avoid font-loading snaps */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
              animate={{ opacity: activePage === 'home' ? 1 : 0, scale: activePage === 'home' ? 1 : 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className="text-[12px] sm:text-[14px] font-sans tracking-[0.6em] text-white/80 uppercase whitespace-nowrap">
                Seif Mohamed
              </h1>
            </motion.div>

            <motion.div
              className="flex items-center whitespace-nowrap"
              animate={{ opacity: activePage === 'home' ? 0 : 1, scale: activePage === 'home' ? 1.1 : 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <span className="text-xl md:text-2xl font-display tracking-[0.15em] font-semibold text-white group-hover:text-teal-500 transition-colors duration-500">Seif</span>
              <span className="text-xl md:text-2xl font-display tracking-[0.15em] text-zinc-400 group-hover:text-white transition-colors duration-500 ml-1.5 md:ml-2">Mohamed</span>
            </motion.div>
          </motion.a>
        </div>
      </motion.div>

      {/* Header Container with subtle 3D tilt */}
      <motion.div 
        animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <nav className="w-full px-8 py-6 flex items-center justify-between">
          
          {/* Navigation Container - Left placeholder */}
          <div className="w-32 md:w-48"></div>

          {/* Liquid Glass Nav Pill - Center */}
          <motion.div 
             animate={{ 
               opacity: activePage === 'home' ? 0 : 1, 
               y: activePage === 'home' ? -20 : 0,
               scale: activePage === 'home' ? 0.95 : 1
             }}
             transition={{ duration: 0.8, delay: activePage === 'home' ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
             className={`hidden md:flex items-center gap-5 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group/nav ${activePage === 'home' ? 'pointer-events-none' : ''}`}
          >
             {/* Inner glass highlight gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-20 pointer-events-none"></div>
             <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
             
             <button onClick={() => handleNav('about')} className={`${activePage === 'about' ? 'text-teal-400' : 'text-zinc-300'} hover:text-teal-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10`}>About me</button>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <button onClick={() => handleNav('expertise')} className={`${activePage === 'expertise' ? 'text-teal-400' : 'text-zinc-300'} hover:text-teal-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10`}>Expertise</button>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <button onClick={() => handleNav('contact')} className={`${activePage === 'contact' ? 'text-teal-400' : 'text-zinc-300'} hover:text-teal-400 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors relative z-10`}>Contact</button>
          </motion.div>

          {/* Power Icon - Right */}
          <motion.div
             animate={{ 
               opacity: activePage === 'home' ? 0 : 1, 
               y: activePage === 'home' ? -20 : 0 
             }}
             transition={{ duration: 0.8, delay: activePage === 'home' ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
             className={activePage === 'home' ? 'pointer-events-none' : ''}
          >
            <button aria-label="Action" onClick={() => handleNav('home')} className={`h-9 w-9 flex items-center justify-center rounded-full border border-white/10 ${activePage === 'home' ? 'bg-teal-500/20' : 'bg-white/5'} hover:bg-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(20,184,166,0.2)]`}>
              <Power className={`w-4 h-4 ${activePage === 'home' ? 'text-teal-400' : 'text-zinc-400'} group-hover:text-teal-400 transition-colors duration-300`} strokeWidth={1.5} />
            </button>
          </motion.div>
        </nav>
      </motion.div>

      {/* Global Bottom Info for Home */}
      <motion.div
        className="fixed bottom-0 left-0 w-full z-40 pointer-events-none p-6 md:p-12 pb-12 md:pb-24 flex justify-between items-end gap-4"
        animate={{ 
          opacity: activePage === 'home' ? 1 : 0,
          y: activePage === 'home' ? 0 : 40,
          scale: activePage === 'home' ? 1 : 0.95
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-sans text-white/60 max-w-[200px] text-left">
          <span className="text-white/40 block mb-1">Role</span>
          Mid Level<br />Graphic Designer
        </div>
        <div className="hidden md:flex items-center justify-center gap-6 backdrop-blur-md bg-black/20 px-6 py-3 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          <a href="#" aria-label="Facebook" className="text-white/50 hover:text-teal-400 hover:scale-110 transition-all duration-300">
            <Facebook className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-teal-400 hover:scale-110 transition-all duration-300">
            <Linkedin className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Twitter" className="text-white/50 hover:text-teal-400 hover:scale-110 transition-all duration-300">
            <Twitter className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="WhatsApp" className="text-white/50 hover:text-teal-400 hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
        <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-sans text-white/60 text-right max-w-[200px]">
          <span className="text-white/40 block mb-1">Approach</span>
          Design with Purpose.<br />Create with Passion.
        </div>
      </motion.div>
      
      {/* Content wrapper with fixed height to prevent scrolling, using animate presence for paginated feel */}
      <main className="relative z-10 flex-grow w-full h-full overflow-hidden" style={{ perspective: "2000px" }}>
        <AnimatePresence custom={direction} mode="sync">
          
          {/* Home Section */}
          {activePage === 'home' && (
            <motion.section 
              key="page-home"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex flex-col justify-between z-20 pointer-events-none p-6 md:p-12 pb-24"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Home has no content block now, relying on the global elements */}
            </motion.section>
          )}

          {/* About Section */}
          {activePage === 'about' && (
            <motion.section 
              key="page-about"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 pt-32 pb-12 flex flex-col justify-center items-center px-6 md:px-24 z-20"
            >
               <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                 {/* Left side: Heading */}
                 <div className="lg:col-span-4 flex flex-col items-start">
                   <h2 className="text-sm md:text-base font-medium tracking-[0.4em] uppercase text-teal-500 mb-8 flex items-center gap-4">
                     <span className="w-8 h-[1px] bg-teal-500"></span>
                     About me
                     <span className="w-24 h-[1px] bg-teal-500/30"></span>
                   </h2>
                   <div className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight">
                     Driven by <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500 font-medium">passion.</span>
                   </div>
                 </div>

                 {/* Right side: Content */}
                 <div className="lg:col-span-8 relative">
                   <div className="absolute -left-12 -top-12 text-[150px] font-magic text-teal-500/10 pointer-events-none select-none">
                     S
                   </div>
                   
                   <div className="relative z-10 space-y-8 backdrop-blur-sm bg-black/10 p-8 md:p-12 rounded-3xl border border-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                     <p className="text-xl md:text-3xl font-light leading-relaxed text-zinc-200 font-sans">
                       I am a <span className="text-white font-medium">Mid-Level Graphic Designer</span> with an uncompromising approach to visual storytelling.
                     </p>
                     
                     <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent my-8"></div>
                     
                     <p className="text-base md:text-lg font-light leading-relaxed text-zinc-400 font-sans max-w-2xl">
                       I blend structural aesthetics with cinematic narratives to create visuals that don't just look good, but feel <span className="text-teal-400 italic">alive</span>. Every project is an opportunity to craft experiences with purpose, emotional resonance, and endless dedication. Let's build something extraordinary.
                     </p>
                     
                     <div className="flex flex-wrap gap-3 pt-6">
                       {['Art Direction', 'Motion Graphics', 'UI/UX Design', '3D Generalist'].map((skill) => (
                         <span key={skill} className="px-5 py-2.5 rounded-full border border-white/10 text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-300 hover:text-white hover:bg-teal-500/20 hover:border-teal-500/50 transition-all duration-300 cursor-default">
                           {skill}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
            </motion.section>
          )}

          {/* Expertise Section */}
          {activePage === 'expertise' && (
            <motion.section 
              key="page-expertise"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 pt-32 pb-12 flex flex-col justify-center px-6 md:px-24 z-20"
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 lg:gap-32">
                 <div className="md:w-1/3 flex flex-col justify-between">
                   <div>
                     <h2 className="text-sm md:text-base font-medium tracking-[0.4em] uppercase text-teal-500 mb-6 flex items-center gap-4">
                       <span className="w-8 h-[1px] bg-teal-500"></span>
                       Expertise
                     </h2>
                     <h3 className="font-display text-3xl md:text-5xl font-light text-white leading-tight mb-8">
                       Crafting <br className="hidden md:block"/>
                       <span className="font-magic text-5xl md:text-7xl text-teal-400 capitalize block mt-2">experiences</span>
                     </h3>
                   </div>
                   <p className="text-sm text-zinc-400 leading-relaxed font-light mt-auto max-w-sm hidden md:block">
                     A multidisciplinary approach allows me to tackle projects from all angles, ensuring a cohesive and striking final product.
                   </p>
                 </div>

                 <div className="md:w-2/3 flex flex-col gap-8">
                   {[
                     { title: 'Art Direction', desc: 'Guiding the visual narrative to create cohesive and striking brand worlds.' },
                     { title: 'Motion Graphics', desc: 'Breathing life into static designs with fluid, cinematic animations.' },
                     { title: 'Visual Identity', desc: 'Crafting unique structural design systems that stand out in the dark.' }
                   ].map((item, i) => (
                     <motion.div 
                       key={item.title}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                       className="group flex flex-col sm:flex-row gap-6 sm:gap-12 items-start py-8 border-b border-white/10 hover:border-teal-500/50 transition-colors duration-500"
                     >
                       <div className="text-2xl font-light font-sans text-teal-500/50 w-12 group-hover:text-teal-400 transition-colors duration-500">
                         0{i+1}
                       </div>
                       <div className="flex-1">
                         <h4 className="text-xl md:text-3xl font-display font-light mb-3 text-zinc-200 group-hover:text-white transition-colors duration-500 tracking-wider">
                           {item.title}
                         </h4>
                         <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed max-w-lg group-hover:text-zinc-400 transition-colors duration-500">
                           {item.desc}
                         </p>
                       </div>
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
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 pt-32 pb-12 flex flex-col items-center justify-between px-6 md:px-24 z-20"
            >
              <div className="w-full flex-grow flex flex-col items-center justify-center">
                <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] min-w-[300px] border border-teal-500/10 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] min-w-[400px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite_reverse] pointer-events-none"></div>

                  <h2 className="flex flex-col items-center justify-center gap-2 mix-blend-plus-lighter mb-12 relative z-10">
                    <span className="text-sm md:text-lg font-sans tracking-[0.8em] font-light uppercase text-zinc-400 mb-8 blur-[0.5px]">
                      Let the
                    </span>
                    <span className="font-magic text-[80px] sm:text-[120px] md:text-[160px] leading-[0.8] tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500 drop-shadow-2xl">
                      magic begin
                    </span>
                    <span className="text-teal-500 text-2xl md:text-3xl font-light mt-4">.</span>
                  </h2>

                  <button className="group px-12 py-5 rounded-full bg-transparent border border-teal-500/50 text-white text-xs md:text-sm font-medium tracking-[0.3em] uppercase hover:bg-teal-500 hover:text-black hover:border-teal-500 hover:scale-105 transition-all duration-500 relative z-10 overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.1)] hover:shadow-[0_0_60px_rgba(20,184,166,0.5)]">
                    <span className="relative z-10">Get in touch</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  </button>
                </div>
              </div>
              
              <div className="w-full flex flex-col sm:flex-row justify-between items-end gap-6 text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 mt-auto pb-4">
                <div className="flex flex-col gap-2 relative z-10 text-left">
                  <span className="text-white/40">Available for</span>
                  <span className="text-zinc-300">Freelance opportunities</span>
                </div>
                
                <div className="flex gap-8 relative z-10">
                  {['Instagram', 'Behance', 'LinkedIn'].map((platform) => (
                    <a key={platform} href="#" className="hover:text-teal-400 transition-colors duration-300 relative group flex items-center">
                      {platform}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

