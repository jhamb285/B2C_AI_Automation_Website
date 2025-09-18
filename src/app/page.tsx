'use client'

import { motion } from 'framer-motion'
import AutomationShowcaseSimple from '@/components/sections/automation-showcase-simple'
import IndustriesSection from '@/components/sections/industries-section'
import FeaturesBento from '@/components/sections/FeaturesBento'
import ContactSection from '@/components/sections/contact-section'
import FloatingNavBar from '@/components/sections/floating-navbar'
import SavingsCalculator from '@/components/sections/savings-calculator'
import CompetitorSavings from '@/components/sections/competitor-savings'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Continuous Background Animations - Fixed positioning for full coverage */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large Beautiful Orbs - Continuous across all sections */}
        <motion.div
          animate={{ 
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.06) 60%, transparent 100%)',
            filter: 'blur(80px)',
            willChange: 'transform'
          }}
        />
        
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 90, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 8
          }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle at 70% 40%, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 70%, transparent 100%)',
            filter: 'blur(90px)',
            willChange: 'transform'
          }}
        />
        
        <motion.div
          animate={{ 
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.25, 1]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.08) 0%, rgba(244, 114, 182, 0.04) 80%, transparent 100%)',
            filter: 'blur(70px)',
            willChange: 'transform'
          }}
        />
        
        <motion.div
          animate={{ 
            x: [0, -70, 0],
            y: [0, 85, 0],
            scale: [1, 1.18, 1]
          }}
          transition={{ 
            duration: 28, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 12
          }}
          className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle at 60% 60%, rgba(34, 197, 94, 0.09) 0%, rgba(59, 130, 246, 0.04) 75%, transparent 100%)',
            filter: 'blur(65px)',
            willChange: 'transform'
          }}
        />
        
        {/* Central Gentle Aurora */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.08, 1],
            opacity: [0.08, 0.03, 0.08]
          }}
          transition={{ 
            duration: 45, 
            repeat: Infinity, 
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ 
            background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.04), rgba(168, 85, 247, 0.06), rgba(59, 130, 246, 0.08))',
            filter: 'blur(120px)',
            willChange: 'transform'
          }}
        />
        
        {/* Additional orb for better coverage */}
        <motion.div
          animate={{ 
            x: [0, -90, 0],
            y: [0, -70, 0],
            scale: [1, 1.22, 1]
          }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 18
          }}
          className="absolute top-1/4 left-1/2 w-[450px] h-[450px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle at 40% 80%, rgba(244, 63, 94, 0.07) 0%, rgba(168, 85, 247, 0.04) 65%, transparent 100%)',
            filter: 'blur(85px)',
            willChange: 'transform'
          }}
        />
      </div>

      {/* All content with relative z-index and top padding for navbar */}
      <div className="relative z-10 space-y-6 pt-20">
        <FloatingNavBar />
        <AutomationShowcaseSimple />
        <SavingsCalculator />
        <FeaturesBento />
        <CompetitorSavings />
        <IndustriesSection />
        <ContactSection />
      </div>
    </main>
  );
}
