import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // Flicker animation for opacity
  const flickerOpacity = [0, 1, 0, 1, 0, 1, 1];
  const flickerOpacityHalf = [0, 0.5, 0, 0.5, 0, 0.5, 0.5];
  const flickerTimes = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 1];

  const flickerOutOpacity = [1, 0, 1, 0, 1, 0, 0];
  const flickerOutOpacityHalf = [0.5, 0, 0.5, 0, 0.5, 0, 0];

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0, width: "10rem" }}
          animate={{ opacity: flickerOpacity, width: "20rem" }}
          exit={{ opacity: flickerOutOpacity, transition: { duration: 0.8, times: flickerTimes, ease: "linear" } }}
          transition={{
            opacity: { duration: 1, times: flickerTimes, ease: "linear", delay: 0.5 },
            width: { delay: 1.5, duration: 0.8, ease: "easeInOut" },
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-36 overflow-visible w-[20rem] bg-gradient-conic from-teal-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-[#050505] h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-24 h-[100%] left-0 bg-[#050505]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, width: "10rem" }}
          animate={{ opacity: flickerOpacity, width: "20rem" }}
          exit={{ opacity: flickerOutOpacity, transition: { duration: 0.8, times: flickerTimes, ease: "linear" } }}
          transition={{
            opacity: { duration: 1, times: flickerTimes, ease: "linear", delay: 0.5 },
            width: { delay: 1.5, duration: 0.8, ease: "easeInOut" },
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-36 w-[20rem] bg-gradient-conic from-transparent via-transparent to-teal-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-24 h-[100%] right-0 bg-[#050505]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-[#050505] h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        <div className="absolute top-1/2 h-24 w-full translate-y-6 scale-x-150 bg-[#050505] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: flickerOpacityHalf }}
          exit={{ opacity: flickerOutOpacityHalf, transition: { duration: 0.8, times: flickerTimes, ease: "linear" } }}
          transition={{ opacity: { duration: 1, times: flickerTimes, ease: "linear", delay: 0.5 } }}
          className="absolute inset-auto z-50 h-24 w-[18rem] -translate-y-1/2 rounded-full bg-teal-500 blur-3xl"
        ></motion.div>
        
        <motion.div
          initial={{ width: "5rem", opacity: 0 }}
          animate={{ width: "10rem", opacity: flickerOpacity }}
          exit={{ opacity: flickerOutOpacity, transition: { duration: 0.8, times: flickerTimes, ease: "linear" } }}
          transition={{
            opacity: { duration: 1, times: flickerTimes, ease: "linear", delay: 0.5 },
            width: { delay: 1.5, duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute inset-auto z-30 h-24 w-40 -translate-y-[4rem] rounded-full bg-teal-400 blur-2xl"
        ></motion.div>
        
        <motion.div
          initial={{ width: "10rem", opacity: 0 }}
          animate={{ width: "20rem", opacity: flickerOpacity }}
          exit={{ opacity: flickerOutOpacity, transition: { duration: 0.8, times: flickerTimes, ease: "linear" } }}
          transition={{
            opacity: { duration: 1, times: flickerTimes, ease: "linear", delay: 0.5 },
            width: { delay: 1.5, duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute inset-auto z-50 h-[1px] w-[20rem] -translate-y-[5rem] bg-teal-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-24 w-full -translate-y-[8rem] bg-[#050505] "></div>
      </div>

      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
