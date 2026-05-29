import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface WorkDetailProps {
  id: string;
  lang: 'en' | 'ar';
  onBack: () => void;
}

export const WorkDetail: React.FC<WorkDetailProps> = ({ id, lang, onBack }) => {
  const isAr = lang === 'ar';
  
  if (id === 'social_media') {
    return (
      <div className="w-full min-h-screen pt-16 md:pt-20 pb-24 px-6 md:px-24 flex flex-col relative z-20 bg-zinc-950" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10"></div>

        <div className={`sticky top-6 md:top-10 z-50 mb-20 md:mb-32 w-fit ${isAr ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
          <button onClick={onBack} className={`flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80`}>
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة للخبرات' : 'Back to Expertise'}</span>
          </button>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-display font-light text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          {isAr ? 'سوشيال ميديا وحملات رقمية' : 'Strategic Social Campaigns'}
        </h1>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed mb-16">
          {isAr ? 'نبتكر محتوى يحفز التفاعل ويبني مجتمعات رقمية للعلامات التجارية من خلال السرد البصري المبتكر والتخطيط الاستراتيجي.' : 'We craft content that sparks engagement and builds digital communities around brands through innovative storytelling and strategic planning.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item, i) => (
             <motion.div 
               key={item}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
               className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-purple-500/50 transition-all duration-500"
             >
               <img src={`https://images.unsplash.com/photo-${1550751827 + i}?q=80&w=800&auto=format&fit=crop`} alt="Social Campaign" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                 <h3 className="text-lg font-medium text-white mb-1">{isAr ? 'حملة ترويجية' : 'Campaign'} 0{item}</h3>
                 <p className="text-xs text-purple-300 uppercase tracking-wider">{isAr ? 'انستجرام' : 'Instagram'}</p>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'art_direction') {
    return (
      <div className="w-full min-h-screen pt-16 md:pt-20 pb-24 px-6 md:px-24 flex flex-col relative z-20 bg-[#0a0a0a]" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] pointer-events-none -z-10"></div>

        <div className={`sticky top-6 md:top-10 z-50 mb-20 md:mb-32 w-fit ${isAr ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
          <button onClick={onBack} className={`flex items-center gap-2 text-xs uppercase tracking-widest text-[#B4A79E] hover:text-white transition-colors duration-300 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80`}>
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة' : 'Back'}</span>
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-32">
            <h1 className="text-5xl md:text-8xl font-display font-light text-[#E8E3DF] mb-6 leading-none italic">
              {isAr ? 'الإدارة' : 'Art'}<br/>{isAr ? 'الفنية' : 'Direction'}
            </h1>
            <div className="w-16 h-[1px] bg-[#B4A79E] mb-8"></div>
            <p className="text-[#B4A79E] text-sm md:text-base leading-relaxed font-light">
              {isAr ? 'توجيه الإبداع لخلق عوالم بصرية راقية تروي قصة علامتك التجارية بدقة وتفرد.' : 'Guiding creativity to build sophisticated visual worlds that tell your brand’s story with precision and uniqueness.'}
            </p>
          </div>
          
          <div className="lg:w-2/3 flex flex-col gap-12 md:gap-24">
            {[1, 2, 3].map((item, i) => (
               <motion.div 
                 key={item}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1 }}
                 className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden"
               >
                 <img src={`https://images.unsplash.com/photo-${1493246507139 + i}?q=80&w=1600&auto=format&fit=crop`} alt="Art Direction" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000" />
                 <div className="absolute top-6 left-6 text-xs text-white mix-blend-difference uppercase tracking-[0.3em]">Concept 0{item}</div>
               </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === 'print_packaging') {
    return (
      <div className="w-full min-h-screen pt-16 md:pt-20 pb-24 px-6 md:px-24 flex flex-col relative z-20 bg-zinc-950" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(45, 212, 191, 0.03) 0px, rgba(45, 212, 191, 0.03) 1px, transparent 1px, transparent 10px)' }}></div>
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10"></div>

        <div className={`sticky top-6 md:top-10 z-50 mb-20 md:mb-32 w-fit ${isAr ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
          <button onClick={onBack} className={`flex items-center gap-2 text-xs uppercase tracking-widest text-teal-400 hover:text-white transition-colors duration-300 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80`}>
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'تراجع' : 'Return'}</span>
          </button>
        </div>
        
        <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight uppercase">
            {isAr ? 'مطبوعات' : 'Print &'} <br/>
            <span className="text-teal-400">{isAr ? 'وتغليف' : 'Packaging'}</span>
          </h1>
          <div className="text-right hidden md:block">
            <p className="text-zinc-500 font-mono text-xs mb-2">STRUCTURAL_DESIGN // VISUAL_SYSTEMS</p>
            <p className="text-zinc-400 max-w-sm ml-auto">
              {isAr ? 'تحويل الأفكار إلى واقع ملموس بتصاميم هيكلية وتغليف يحمل هوية علامتك.' : 'Transforming ideas into tangible reality with structural designs and packaging that carry your brand identity.'}
            </p>
          </div>
        </div>

        <div className="columns-1 md:columns-2 gap-8 space-y-8 space-y-reverse">
          {[1, 2, 3, 4].map((item, i) => (
             <motion.div 
               key={item}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className="break-inside-avoid relative group bg-zinc-900 border border-white/5 p-4 rounded-xl"
             >
               <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                 <img src={`https://images.unsplash.com/photo-${1551288049 + item}?q=80&w=800&auto=format&fit=crop`} alt="Packaging" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
               </div>
               <div className="absolute bottom-8 right-8 bg-teal-500 text-black px-4 py-2 font-mono text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 {isAr ? 'المشروع' : 'Project'} 0{item}
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'ui_ux') {
    return (
      <div className="w-full min-h-screen pt-16 md:pt-20 pb-24 px-6 md:px-24 flex flex-col relative z-20 bg-[#02080a]" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: 'linear-gradient(to right, rgba(45, 212, 191, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(45, 212, 191, 0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen -z-10"></div>
        
        <div className={`sticky top-6 md:top-10 z-50 mb-20 md:mb-32 w-fit ${isAr ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
          <button onClick={onBack} className={`flex items-center gap-2 text-xs uppercase tracking-widest text-teal-400 hover:text-white transition-colors duration-300 backdrop-blur-md px-4 py-2.5 rounded-full border border-teal-500/20 bg-black/40 hover:bg-black/60`}>
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'رجوع' : 'Back'}</span>
          </button>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-display text-white mb-6 text-center drop-shadow-[0_0_30px_rgba(45,212,191,0.3)]">
          {isAr ? 'واجهات' : 'Digital'} <span className="text-teal-400 font-light italic">{isAr ? 'المستخدم' : 'Experiences'}</span>
        </h1>
        <p className="text-blue-100/60 max-w-2xl text-center mx-auto text-sm md:text-base leading-relaxed mb-20">
          {isAr ? 'تصميم واجهات مستخدم بديهية وتجارب رقمية تعطي الأولوية لرحلة المستخدم مع الحفاظ على الأناقة البصرية.' : 'Designing intuitive user interfaces and digital experiences that prioritize the user journey while maintaining visual elegance.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl mx-auto">
          {/* Main feature */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group aspect-[16/10] relative"
          >
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="UI Dashboard" />
             <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
               <h3 className="text-2xl text-white font-medium mb-2">{isAr ? 'لوحة تحكم تفاعلية' : 'Interactive Dashboards'}</h3>
               <p className="text-teal-200/80 text-sm">{isAr ? 'تصميم تجربة بيانات' : 'Data Experience Design'}</p>
             </div>
          </motion.div>
          
          {/* Side features */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group relative min-h-[250px]"
            >
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Mobile App" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
               <h3 className="text-xl text-white font-medium">{isAr ? 'تطبيقات الجوال' : 'Mobile Apps'}</h3>
             </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group relative min-h-[250px]"
            >
              <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Web Portal" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
               <h3 className="text-xl text-white font-medium">{isAr ? 'منصات الويب' : 'Web Portals'}</h3>
             </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
