import { Globe, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { motion, useSpring, AnimatePresence, useMotionValue } from "motion/react";
import React, { useEffect, useState, useRef } from "react";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.976H5.078z"></path>
  </svg>
);

const SeamlessVideoLoop = ({ src }: { src: string }) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>, currentId: 1 | 2) => {
    const video = e.target as HTMLVideoElement;
    const fadeDuration = 2.0; // 2 seconds crossfade
    
    if (video.duration && video.duration - video.currentTime <= fadeDuration) {
      if (activeVideo === currentId) {
        const nextId = currentId === 1 ? 2 : 1;
        const nextVideo = nextId === 1 ? video1Ref.current : video2Ref.current;
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
        }
        setActiveVideo(nextId);
      }
    }
  };

  return (
    <>
      <video
        ref={video1Ref}
        src={src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        style={{ transitionDuration: '2000ms' }}
        muted
        playsInline
        autoPlay
        onTimeUpdate={(e) => handleTimeUpdate(e, 1)}
        onEnded={(e) => (e.target as HTMLVideoElement).pause()}
      />
      <video
        ref={video2Ref}
        src={src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${activeVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        style={{ transitionDuration: '2000ms' }}
        muted
        playsInline
        onTimeUpdate={(e) => handleTimeUpdate(e, 2)}
        onEnded={(e) => (e.target as HTMLVideoElement).pause()}
      />
    </>
  );
};

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
          <SeamlessVideoLoop src="/video-1.mp4" />
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

        {activePage === 'thanks' && (
          <motion.div key="bg-thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 flex items-center justify-center">
            {/* Elegant slow pulsing orb for thanks page */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#5C7C8A]/10 blur-[140px] pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Use springs only for size/offset to keep it smooth, but position is immediate
  const size = useSpring(10, { stiffness: 400, damping: 25 });
  const offset = useSpring(-5, { stiffness: 400, damping: 25 });

  useEffect(() => {
    size.set(isHovering ? 32 : 12);
    offset.set(isHovering ? -16 : -6);
  }, [isHovering, size, offset]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Immediate update without state -> no lag
      cursorX.set(e.clientX + offset.get());
      cursorY.set(e.clientY + offset.get());
      
      const target = e.target as HTMLElement;
      setIsHovering(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [cursorX, cursorY, offset]);

  return (
    <motion.div
      className="fixed z-[9999] rounded-full pointer-events-none hidden md:block mix-blend-difference bg-white"
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
      }}
    />
  );
};

const PAGES = ['home', 'about', 'expertise', 'contact', 'thanks'];

const content = {
  en: {
    nav: {
      about: "About me",
      expertise: "Expertise",
      contact: "Contact"
    },
    role: { title: "Role", descPart1: "Graphic", descPart2: "Designer" },
    approach: { title: "Approach", descPart1: "Design with Purpose.", descPart2: "Create with Passion." },
    about: {
      title: "About me",
      headingLine1: "Crafting visual",
      headingLine2: "stories.",
      desc1: "I am a",
      desc1Strong: "Graphic Designer",
      desc1End: "with an uncompromising approach to visual storytelling.",
      desc2Part1: "I specialize in crafting compelling visual narratives through comprehensive ",
      desc2Alive: "Branding",
      desc2Part2: " and engaging Social Media Campaigns. From designing intuitive UI/UX experiences to creating standout Packaging and Visual Identities, every project is an opportunity to build something extraordinary.",
      skills: ['Visual Identity', 'Social Media Campaigns', 'Branding', 'UI/UX Design', 'Packaging']
    },
    expertise: {
      title: "Expertise",
      heading1: "Crafting",
      heading2: "experiences",
      desc: "A multidisciplinary approach allows me to tackle projects from all angles, ensuring a cohesive and striking final product.",
      items: [
         { title: 'Art Direction', desc: 'Guiding the visual narrative to create cohesive and striking brand worlds.' },
         { title: 'Motion Graphics', desc: 'Breathing life into static designs with fluid, cinematic animations.' },
         { title: 'Visual Identity', desc: 'Crafting unique structural design systems that stand out in the dark.' }
      ]
    },
    contact: {
      letThe: "Let the",
      magicBegin: "magic begin",
      btn: "Get in touch",
      avail: "Available for",
      freelance: "Freelance opportunities",
      platforms: [
        {name: 'Instagram', url: 'https://instagram.com'}, 
        {name: 'Behance', url: 'https://behance.net'}, 
        {name: 'LinkedIn', url: 'https://linkedin.com'}
      ] 
    },
    thanks: {
      title: "THANK YOU",
      message: "For taking the time to explore my visual journey.",
      subMessage: "Let's create something memorable together.",
      btn: "Back to Home"
    }
  },
  ar: {
    nav: {
      about: "من أنا",
      expertise: "الخبرات",
      contact: "تواصل معي"
    },
    role: { title: "الدور", descPart1: "مصمم", descPart2: "جرافيك" },
    approach: { title: "المنهجية", descPart1: "تصميم بهدف.", descPart2: "إبداع بشغف." },
    about: {
      title: "من أنا",
      headingLine1: "سرد قصص",
      headingLine2: "بصرية.",
      desc1: "أنا",
      desc1Strong: "مصمم جرافيك",
      desc1End: "ولدي نهج لا يقبل المساومة في السرد البصري.",
      desc2Part1: "أتخصص في صناعة قصص بصرية مؤثرة من خلال تصميم الهويات البصرية و",
      desc2Alive: "العلامات التجارية",
      desc2Part2: "، بالإضافة إلى حملات السوشيال ميديا التفاعلية. بدءًا من تصميم واجهة وتجربة المستخدم (UI/UX) وصولاً إلى تصميم الباكدجينج وتغليف المنتجات، يمثل كل مشروع فرصة لنبني شيئًا استثنائيًا.",
      skills: ['الهوية البصرية', 'حملات السوشيال ميديا', 'تصميم العلامات التجارية', 'واجهة وتجربة المستخدم', 'تغليف المنتجات']
    },
    expertise: {
      title: "الخبرات",
      heading1: "صناعة",
      heading2: "التجارب",
      desc: "يتيح لي النهج متعدد التخصصات معالجة المشاريع من جميع الزوايا، مما يضمن منتجًا نهائيًا متماسكًا وجذابًا.",
      items: [
         { title: 'الإدارة الفنية', desc: 'توجيه السرد البصري لإنشاء عوالم علامة تجارية متماسكة وجذابة.' },
         { title: 'الموشن جرافيك', desc: 'بث الحياة في التصاميم الثابتة برسوم متحركة سينمائية سلسة.' },
         { title: 'الهوية البصرية', desc: 'ابتكار أنظمة هيكلية فريدة تبرز هويتك في وسط الزحام.' }
      ]
    },
    contact: {
      letThe: "لتبدأ",
      magicBegin: "السحر",
      btn: "تواصل معي",
      avail: "متاح لـ",
      freelance: "فرص العمل الحر",
      platforms: [
        {name: 'انستجرام', url: 'https://instagram.com'}, 
        {name: 'بيهانس', url: 'https://behance.net'}, 
        {name: 'لينكد إن', url: 'https://linkedin.com'}
      ] 
    },
    thanks: {
      title: "شكرًا لك",
      message: "على وقتك في استكشاف رحلتي البصرية.",
      subMessage: "لنبني شيئًا لا يُنسى معًا.",
      btn: "العودة للرئيسية"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = content[lang];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [pageIndex, setPageIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedIntro, setHasStartedIntro] = useState(false);
  const activePage = PAGES[pageIndex];

  useEffect(() => {
    // Presentation intro sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setHasStartedIntro(true), 3500);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  const handleNav = (targetPage: string) => {
    const targetIdx = PAGES.indexOf(targetPage);
    if (targetIdx !== pageIndex) {
      setDirection(targetIdx > pageIndex ? 1 : -1);
      setPrevIndex(pageIndex);
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
      
      const scrollable = (e.target as Element).closest('.overflow-y-auto');
      if (scrollable) {
        const isAtTop = scrollable.scrollTop <= 0;
        const isAtBottom = Math.abs(scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight) <= 1;

        if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
           // We are scrolling inside the section, let standard scrolling happen
           return;
        }
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 700) return; // Prevent rapid scrolling but feel responsive
      
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0 && pageIndex < PAGES.length - 1) {
           setDirection(1);
           setPrevIndex(pageIndex);
           setPageIndex(p => p + 1);
           lastScrollTime.current = now;
        } else if (e.deltaY < 0 && pageIndex > 0) {
           setDirection(-1);
           setPrevIndex(pageIndex);
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

  const isVertical = pageIndex === 0 || prevIndex === 0;
  const transitionData = { direction, isVertical };

  const pageVariants = {
    initial: ({ direction, isVertical }: { direction: number, isVertical: boolean }) => ({
      y: isVertical ? (direction > 0 ? "15%" : "-15%") : 0,
      x: !isVertical ? (direction > 0 ? "8%" : "-8%") : 0,
      opacity: 0,
      scale: 0.98,
      filter: "blur(12px)"
    }),
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: ({ direction, isVertical }: { direction: number, isVertical: boolean }) => ({
      y: isVertical ? (direction > 0 ? "-15%" : "15%") : 0,
      x: !isVertical ? (direction > 0 ? "-8%" : "8%") : 0,
      opacity: 0,
      scale: 0.98,
      filter: "blur(12px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div data-lang={lang} dir="ltr" className="min-h-screen bg-transparent text-white overflow-hidden relative selection:bg-teal-500/30 font-sans flex flex-col">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="overflow-hidden mb-3">
                <motion.h1 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="font-display text-lg md:text-xl lg:text-2xl font-light text-white tracking-[0.3em] md:tracking-[0.5em] text-center uppercase pl-[0.3em] md:pl-[0.5em]"
                >
                  SEIF <span className="text-zinc-600">MOHAMED</span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                  className="text-[7px] md:text-[8px] text-[#5C7C8A] uppercase tracking-[0.4em] md:tracking-[0.6em] font-medium text-center pl-[0.4em] md:pl-[0.6em]"
                >
                  {t.role.descPart1} {t.role.descPart2}
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
                className="w-full max-w-[80px] md:max-w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[#5C7C8A]/40 to-transparent mt-8 mb-6 origin-center"
              />
              
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 1, ease: 'easeInOut', delay: 2.2 }}
                 className="flex flex-col items-center"
              >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 border-[1px] border-[#5C7C8A]/20 rounded-full"></div>
                    <div className="w-6 h-6 border-[1px] border-transparent border-t-[#5C7C8A] rounded-full animate-spin"></div>
                  </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Interactive Element */}
      <InteractiveBackground cursorPos={cursorPos} activePage={activePage} />
      <CustomCursor />

      {/* Grain / Noise Overlay for a more analogue cinematic texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}
      ></div>

      {/* Header Container with subtle 3D tilt */}
      <motion.div 
        animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-none"
      >
        <div className="w-full h-full relative pointer-events-none">
          {/* Global Branding Name that smoothly morphs positioning */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            initial={{ opacity: 0, y: -20, top: '48px', left: '50%', x: '-50%' }}
            animate={{
              top: activePage === 'home' ? '48px' : '24px',
              left: activePage === 'home' ? '50%' : '32px',
              x: activePage === 'home' ? '-50%' : '0%',
              y: !isLoading ? 0 : -20,
              opacity: !isLoading ? 1 : 0
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: !hasStartedIntro ? 3 : 0 }}
            className="absolute pointer-events-auto cursor-pointer group flex items-center"
          >
            {/* We overlay the two versions and crossfade them to avoid font-loading snaps */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
              animate={{ opacity: activePage === 'home' ? 1 : 0, scale: activePage === 'home' ? 1 : 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h1 className={`text-[12px] sm:text-[14px] font-sans text-white/80 uppercase whitespace-nowrap ${lang === 'en' ? 'tracking-[0.6em] pl-[0.6em]' : ''}`}>
                Seif Mohamed
              </h1>
            </motion.div>

            <motion.div
              className="flex items-center whitespace-nowrap pl-[0.15em]"
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
             className={`hidden md:flex items-center gap-5 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group/nav ${activePage === 'home' ? 'pointer-events-none' : 'pointer-events-auto'}`}
          >
             {/* Inner glass highlight gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-20 pointer-events-none"></div>
             <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
             
             <button onClick={() => handleNav('about')} className={`group ${activePage === 'about' ? 'text-teal-400' : 'text-zinc-300'} hover:text-teal-300 text-[10px] font-medium ${lang === 'en' ? 'tracking-[0.2em]' : ''} uppercase transition-colors duration-300 relative z-10 whitespace-nowrap`}>
               {t.nav.about}
               <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent transform origin-center transition-all duration-500 ease-out ${activePage === 'about' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-100'}`}></span>
             </button>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <button onClick={() => handleNav('expertise')} className={`group ${activePage === 'expertise' ? 'text-teal-400' : 'text-zinc-300'} hover:text-teal-300 text-[10px] font-medium ${lang === 'en' ? 'tracking-[0.2em]' : ''} uppercase transition-colors duration-300 relative z-10 whitespace-nowrap`}>
               {t.nav.expertise}
               <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent transform origin-center transition-all duration-500 ease-out ${activePage === 'expertise' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-100'}`}></span>
             </button>
             <span className="w-[1px] h-2.5 bg-white/20 relative z-10"></span>
             <button onClick={() => handleNav('contact')} className={`group ${activePage === 'contact' ? 'text-teal-400' : 'text-zinc-300'} hover:text-teal-300 text-[10px] font-medium ${lang === 'en' ? 'tracking-[0.2em]' : ''} uppercase transition-colors duration-300 relative z-10 whitespace-nowrap`}>
               {t.nav.contact}
               <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent transform origin-center transition-all duration-500 ease-out ${activePage === 'contact' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-100'}`}></span>
             </button>
          </motion.div>

          {/* Right Placeholder */}
          <div className="w-32 md:w-48"></div>
        </nav>
      </motion.div>

      {/* Global Bottom Info for Home */}
      <motion.div
        className="fixed bottom-0 left-0 w-full z-40 pointer-events-none p-4 md:p-6 pb-2 md:pb-4 flex flex-col justify-center items-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ 
          opacity: (!isLoading && activePage === 'home') ? 1 : 0,
          y: (!isLoading && activePage === 'home') ? 0 : 40,
          scale: activePage === 'home' ? 1 : 0.95
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: !hasStartedIntro ? 3.2 : 0 }}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className={`text-[10px] sm:text-[11px] uppercase ${lang === 'en' ? 'tracking-[0.3em] md:tracking-[0.4em] pl-[0.3em] md:pl-[0.4em]' : ''} font-sans text-white/80 text-center font-medium`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {t.role.descPart1} {t.role.descPart2}
          </div>
          <div className={`flex items-center gap-3 text-[7px] sm:text-[8px] uppercase font-sans text-white/50 text-center`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <span className="w-6 md:w-10 h-[1px] bg-white/20"></span>
            <span className={`${lang === 'en' ? 'tracking-[0.2em] md:tracking-[0.3em] pl-[0.2em] md:pl-[0.3em]' : ''}`}>{t.approach.descPart1} {t.approach.descPart2}</span>
            <span className="w-6 md:w-10 h-[1px] bg-white/20"></span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 backdrop-blur-md bg-black/20 px-6 py-2.5 rounded-full border border-white/5 shadow-2xl pointer-events-auto mt-1">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300">
            <Facebook className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300">
            <Linkedin className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300">
            <XIcon className="w-3.5 h-3.5" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>
      
      {/* Content wrapper with fixed height to prevent scrolling, using animate presence for paginated feel */}
      <main className="relative z-10 flex-grow w-full h-full overflow-hidden" style={{ perspective: "2000px" }}>
        <AnimatePresence custom={transitionData} mode="sync">
          
          {/* Home Section */}
          {activePage === 'home' && (
            <motion.section 
              key="page-home"
              custom={transitionData}
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
              custom={transitionData}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 pt-32 pb-12 flex flex-col justify-center items-center px-6 md:px-24 z-20"
            >
               <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                 {/* Left side: Heading */}
                 <div className="lg:col-span-4 flex flex-col items-start">
                   <h2 className={`text-sm md:text-base font-medium ${lang === 'en' ? 'tracking-[0.4em]' : ''} uppercase text-teal-500 mb-8 flex items-center gap-4`}>
                     <span className="w-8 h-[1px] bg-teal-500"></span>
                     {t.about.title}
                     <span className="w-24 h-[1px] bg-teal-500/30"></span>
                   </h2>
                   <div className={`font-display text-4xl md:text-5xl lg:text-6xl font-light text-white ${lang === 'ar' ? 'leading-normal' : 'leading-tight'}`}>
                     {t.about.headingLine1} <br/>
                     <span className={`text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500 font-medium italic ${lang === 'ar' ? 'pt-4 pb-4 px-2 block' : 'pb-2 px-2'}`}>{t.about.headingLine2}</span>
                   </div>
                 </div>

                 {/* Right side: Content */}
                 <div className="lg:col-span-8 relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                   <div className="relative z-10 space-y-8 backdrop-blur-sm bg-black/10 p-8 md:p-12 rounded-3xl border border-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                     <p className="text-[17px] md:text-[22px] font-light leading-relaxed text-zinc-200 font-sans">
                       {t.about.desc1} <span className="text-white font-medium">{t.about.desc1Strong}</span> {t.about.desc1End}
                     </p>
                     
                     <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent my-8"></div>
                     
                     <p className="text-sm md:text-[15px] font-light leading-relaxed text-zinc-400 font-sans max-w-2xl">
                       {t.about.desc2Part1}<span className="text-teal-400 italic">{t.about.desc2Alive}</span>{t.about.desc2Part2}
                     </p>
                     
                     <div className="flex flex-wrap gap-3 pt-6">
                       {t.about.skills.map((skill) => (
                         <span key={skill} className={`px-5 py-2.5 rounded-full border border-white/10 text-[10px] md:text-xs ${lang === 'en' ? 'tracking-[0.2em]' : ''} uppercase text-zinc-300 hover:text-white hover:bg-teal-500/20 hover:border-teal-500/50 transition-all duration-300 cursor-default`}>
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
              custom={transitionData}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 pt-32 pb-12 flex flex-col justify-center px-6 md:px-24 z-20"
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 lg:gap-32">
                 <div className="md:w-1/3 flex flex-col justify-between">
                   <div>
                     <h2 className={`text-sm md:text-base font-medium ${lang === 'en' ? 'tracking-[0.4em]' : ''} uppercase text-teal-500 mb-6 flex items-center gap-4`}>
                       <span className="w-8 h-[1px] bg-teal-500"></span>
                       {t.expertise.title}
                     </h2>
                     <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
                       {t.expertise.heading1} <br className="hidden md:block"/>
                       <span className={`font-display italic text-4xl md:text-5xl lg:text-6xl text-teal-400 block mt-2 ${lang === 'ar' ? 'pt-6 pb-2 px-2' : ''}`}>{t.expertise.heading2}</span>
                     </h3>
                   </div>
                   <p className="text-xs text-zinc-400 leading-relaxed font-light mt-auto max-w-sm hidden md:block">
                     {t.expertise.desc}
                   </p>
                 </div>

                 <div className="md:w-2/3 flex flex-col gap-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                   {t.expertise.items.map((item, i) => (
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
                         <h4 className={`text-lg md:text-2xl font-display font-light mb-3 text-zinc-200 group-hover:text-white transition-colors duration-500 ${lang === 'en' ? 'tracking-wider' : ''}`}>
                           {item.title}
                         </h4>
                         <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-lg group-hover:text-zinc-400 transition-colors duration-500">
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
              custom={transitionData}
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

                  <h2 className={`flex flex-col items-center justify-center gap-2 mix-blend-plus-lighter relative z-10 w-full text-center ${lang === 'ar' ? 'mb-4 md:mb-6' : 'mb-8 md:mb-12'}`}>
                    <span className={`text-xs md:text-sm font-sans font-light uppercase text-zinc-400 blur-[0.5px] relative z-20 ${lang === 'en' ? 'tracking-[0.8em] mb-2 md:mb-4' : '-mb-6 md:-mb-10'}`}>
                      {t.contact.letThe}
                    </span>
                    <span className={`font-magic text-[60px] sm:text-[80px] md:text-[100px] tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500 drop-shadow-2xl px-4 pb-8 md:pb-12 ${lang === 'ar' ? 'leading-normal pt-12 md:pt-20 block' : 'leading-[0.8] mt-4 md:-mt-6'}`}>
                      {t.contact.magicBegin}
                    </span>
                  </h2>

                  <a href="mailto:seefmohamed0000000@gmail.com" className={`group px-10 py-4 rounded-full bg-transparent border border-teal-500/50 text-white text-[10px] md:text-xs font-medium ${lang === 'en' ? 'tracking-[0.3em]' : ''} uppercase hover:bg-teal-500 hover:text-black hover:border-teal-500 hover:scale-105 transition-all duration-500 relative z-10 overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.1)] hover:shadow-[0_0_60px_rgba(20,184,166,0.5)]`}>
                    <span className="relative z-10 block">{t.contact.btn}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  </a>
                </div>
              </div>
              
              <div className={`w-full flex flex-col sm:flex-row justify-between items-end gap-6 text-[10px] sm:text-xs ${lang === 'en' ? 'tracking-widest' : ''} uppercase text-zinc-500 mt-auto pb-4`}>
                <div className="flex flex-col gap-2 relative z-10 min-w-[200px]">
                  <span className="text-white/40">{t.contact.avail}</span>
                  <span className="text-zinc-300">{t.contact.freelance}</span>
                </div>
                
                <div className="flex gap-8 relative z-10 min-w-[200px] sm:justify-end">
                  {t.contact.platforms.map((platform) => (
                    <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors duration-300 relative group flex items-center">
                      {platform.name}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Thanks Section */}
          {activePage === 'thanks' && (
            <motion.section 
              key="page-thanks"
              custom={transitionData}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 pt-32 pb-12 flex flex-col items-center justify-center px-6 md:px-24 z-20"
            >
              <div className="w-full flex-grow flex flex-col items-center justify-center">
                <div className="text-center w-full max-w-3xl mx-auto flex flex-col items-center relative">
                  
                  {/* Subtle ambient rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] min-w-[200px] border-[0.5px] border-[#5C7C8A]/10 rounded-[40%] animate-[spin_30s_linear_infinite] pointer-events-none"></div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`font-display text-3xl md:text-4xl lg:text-5xl font-light text-white uppercase ${lang === 'en' ? 'tracking-[0.2em] md:tracking-[0.4em]' : ''} mb-6 md:mb-8 blend-difference px-4 text-center`}
                  >
                    {t.thanks.title}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                  >
                     <p className={`text-sm md:text-base font-sans font-light text-zinc-300 ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}>
                       {t.thanks.message}
                     </p>
                     <p className={`text-[10px] md:text-xs font-sans font-medium text-[#5C7C8A] ${lang === 'en' ? 'tracking-[0.05em]' : ''} mt-2`}>
                       {t.thanks.subMessage}
                     </p>
                  </motion.div>

                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.4 }}
                    onClick={() => handleNav('home')}
                    className={`mt-16 group px-10 py-4 md:px-12 md:py-5 rounded-full bg-transparent border border-[#5C7C8A]/30 text-white text-[10px] md:text-xs font-medium ${lang === 'en' ? 'tracking-[0.3em]' : ''} uppercase hover:bg-[#5C7C8A]/10 hover:border-[#5C7C8A] transition-all duration-500 relative z-10 overflow-hidden backdrop-blur-md`}
                  >
                    <span className="relative z-10">{t.thanks.btn}</span>
                  </motion.button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

