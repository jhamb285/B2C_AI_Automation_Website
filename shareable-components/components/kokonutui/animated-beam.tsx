"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { motion } from "framer-motion";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Icons with proper sizing
const Icons = {
  ai: () => (
    <div className="text-sm font-bold text-primary">AI</div>
  ),
  business: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  whatsapp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" fill="#25D366"/>
    </svg>
  ),
  facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  ),
  database: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="hsl(var(--primary))" strokeWidth="2"/>
    </svg>
  ),
  sheets: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.44 3H16.5v18h2.94c.83 0 1.5-.67 1.5-1.5V4.5c.06-.83-.61-1.5-1.5-1.5z" fill="#0F9D58"/>
      <path d="M7.5 3v18h9V3h-9z" fill="#F1F1F1"/>
      <path d="M4.56 3C3.73 3 3.06 3.67 3.06 4.5V19.5c0 .83.67 1.5 1.5 1.5H7.5V3H4.56z" fill="#0F9D58"/>
      <path d="M7.5 9v3h9V9H7.5zm0 6v3h9v-3H7.5z" fill="#0D652D"/>
    </svg>
  ),
  gmail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.98L12 10.09l9.384-6.269h.98c.904 0 1.636.732 1.636 1.636z" fill="#D44638"/>
    </svg>
  ),
  tools: () => (
    <div className="text-sm">🛠️</div>
  ),
  brain: () => (
    <div className="text-sm">🧠</div>
  ),
};

// (Glow now applied inline via animate/transition on elements)

export default function CRMIntegrationsBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Node references
  const businessRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const facebookRef = useRef<HTMLDivElement>(null);
  const gmailRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const sheetsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Layout Container - Floating */}
      <div
        className="relative flex flex-1 w-full mx-auto items-center justify-center"
        ref={containerRef}
        style={{ height: '240px' }}
      >
        {/* Clean Grid Layout with Dynamic Row Heights */}
        <div className="grid grid-cols-3 gap-3 w-full items-center justify-items-center" style={{ gridTemplateRows: 'auto auto auto' }}>
          
          {/* Row 1 - Compact Top */}
          <div></div>
          <motion.div
            ref={businessRef}
            className="px-3 py-2 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 border-2 border-blue-500/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 2px 4px rgba(59,130,246,0.1)",
                "0 4px 12px rgba(59,130,246,0.25), 0 0 0 1px rgba(59,130,246,0.1)",
                "0 2px 4px rgba(59,130,246,0.1)"
              ],
              borderColor: [
                "rgba(59,130,246,0.3)",
                "rgba(59,130,246,0.5)", 
                "rgba(59,130,246,0.3)"
              ]
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="text-[11px] leading-tight font-semibold text-blue-600 text-center whitespace-nowrap">
              Your Business
            </div>
          </motion.div>
          <div></div>

          {/* Row 2 - Main Content Row */}
          <div className="flex flex-col gap-1.5">
            <Circle ref={whatsappRef} className="w-7 h-7 border-2 border-green-400/40 bg-gradient-to-br from-green-400/15 to-green-400/5 rounded-full shadow-sm">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 rgba(34,197,94,0)",
                    "0 0 12px rgba(34,197,94,0.4)",
                    "0 0 0 rgba(34,197,94,0)"
                  ]
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
              >
              <Icons.whatsapp />
              </motion.div>
            </Circle>
            <Circle ref={facebookRef} className="w-7 h-7 border-2 border-blue-400/40 bg-gradient-to-br from-blue-400/15 to-blue-400/5 rounded-full shadow-sm">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 rgba(59,130,246,0)",
                    "0 0 12px rgba(59,130,246,0.4)",
                    "0 0 0 rgba(59,130,246,0)"
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
              >
              <Icons.facebook />
              </motion.div>
            </Circle>
            <Circle ref={gmailRef} className="w-7 h-7 border-2 border-red-400/40 bg-gradient-to-br from-red-400/15 to-red-400/5 rounded-full shadow-sm">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 rgba(239,68,68,0)",
                    "0 0 12px rgba(239,68,68,0.4)",
                    "0 0 0 rgba(239,68,68,0)"
                  ]
                }}
                transition={{ duration: 2.0, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
              >
                <Icons.gmail />
              </motion.div>
            </Circle>
          </div>
          
          <Circle ref={aiRef} className="w-12 h-12 border-2 border-primary bg-gradient-to-br from-primary/15 to-primary/5 rounded-full shadow-lg">
            <motion.div
              animate={{
                scale: [1, 1.08, 1.02, 1],
                boxShadow: [
                  "0 0 0 rgba(59,130,246,0)",
                  "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)",
                  "0 0 8px rgba(59,130,246,0.4)",
                  "0 0 0 rgba(59,130,246,0)"
                ],
                rotate: [0, 2, -1, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
            >
            <Icons.ai />
            </motion.div>
          </Circle>
          
          <div className="flex flex-col gap-2">
            <Circle ref={sheetsRef} className="w-8 h-8 border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 to-emerald-400/5 rounded-full shadow-sm">
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    "0 0 0 rgba(16,185,129,0)",
                    "0 0 12px rgba(16,185,129,0.4)",
                    "0 0 0 rgba(16,185,129,0)"
                  ]
                }}
                transition={{ duration: 1.7, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
              >
              <Icons.sheets />
              </motion.div>
            </Circle>
            <Circle ref={dashboardRef} className="w-8 h-8 border-2 border-orange-400/40 bg-gradient-to-br from-orange-400/15 to-orange-400/5 rounded-full shadow-sm">
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    "0 0 0 rgba(251,146,60,0)",
                    "0 0 12px rgba(251,146,60,0.4)",
                    "0 0 0 rgba(251,146,60,0)"
                  ]
                }}
                transition={{ duration: 1.9, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
              >
                <Icons.tools />
              </motion.div>
            </Circle>
          </div>

          {/* Row 3 - Compact Bottom */}
          <div></div>
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Circle ref={settingsRef} className="w-10 h-10 border-2 border-indigo-400 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-full">
              <Icons.brain />
            </Circle>
          </motion.div>
          <div></div>

        </div>

        {/* Animated Beams */}
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={businessRef} 
          duration={3.2}
          startYOffset={-18}
          endYOffset={15}
          gradientStartColor="hsl(217 91% 60%)"
          gradientStopColor="hsl(221 83% 53%)"
          pathColor="hsl(217 91% 60% / 0.1)"
          pathWidth={1}
        />
        
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={settingsRef} 
          duration={4.1}
          startYOffset={18}
          endYOffset={-15}
          gradientStartColor="hsl(263 70% 50%)"
          gradientStopColor="hsl(280 70% 60%)"
          pathColor="hsl(263 70% 50% / 0.1)"
          pathWidth={1}
        />
        
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={whatsappRef} 
          duration={3.5}
          startXOffset={-18}
          endXOffset={12}
          gradientStartColor="hsl(142 76% 36%)"
          gradientStopColor="hsl(142 69% 58%)"
          pathColor="hsl(142 76% 36% / 0.1)"
          pathWidth={1}
        />
        
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={facebookRef} 
          duration={3.8}
          startXOffset={-18}
          endXOffset={12}
          gradientStartColor="hsl(217 91% 60%)"
          gradientStopColor="hsl(221 83% 53%)"
          pathColor="hsl(217 91% 60% / 0.1)"
          pathWidth={1}
        />
        
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={sheetsRef} 
          duration={3.6}
          startXOffset={18}
          endXOffset={-12}
          gradientStartColor="hsl(158 64% 52%)"
          gradientStopColor="hsl(160 84% 39%)"
          pathColor="hsl(158 64% 52% / 0.1)"
          pathWidth={1}
        />
        
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={dashboardRef} 
          duration={4.2}
          startXOffset={18}
          endXOffset={-12}
          gradientStartColor="hsl(25 95% 53%)"
          gradientStopColor="hsl(20 90% 48%)"
          pathColor="hsl(25 95% 53% / 0.1)"
          pathWidth={1}
        />
        
        <AnimatedBeam 
          containerRef={containerRef} 
          fromRef={aiRef} 
          toRef={gmailRef} 
          duration={3.7}
          startXOffset={-18}
          endXOffset={12}
          gradientStartColor="hsl(0 84% 60%)"
          gradientStopColor="hsl(0 72% 51%)"
          pathColor="hsl(0 84% 60% / 0.1)"
          pathWidth={1}
        />
      </div>
    </div>
  );
}