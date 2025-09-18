'use client'

import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, Sparkles, Orbit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 4000, 
  className = "" 
}: { 
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0, rotate: 0, opacity: 0.1 }}
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 180, 360],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{
        duration: duration / 1000,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay / 1000
      }}
    >
      {children}
    </motion.div>
  )
}

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement 
          delay={0} 
          duration={6000}
          className="absolute top-20 right-20"
        >
          <Orbit className="w-32 h-32 text-primary/20" />
        </FloatingElement>
        
        <FloatingElement 
          delay={2000} 
          duration={5000}
          className="absolute top-60 left-10"
        >
          <Sparkles className="w-24 h-24 text-primary/30" />
        </FloatingElement>

      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="px-4 py-2 text-sm bg-primary/10 text-primary border border-primary/30 backdrop-blur-sm">
              ✨ Trusted by 500+ Home Service Businesses
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
                Never Miss Another Lead with AI Automation
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transform your home services business with AI that captures leads, automates workflows, and integrates seamlessly with your existing systems.
              <span className="text-primary font-semibold"> 95% lead capture rate guaranteed.</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Free Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-primary/50 text-primary hover:border-primary/70 hover:bg-primary/10 backdrop-blur-sm"
              >
                <PlayCircle className="mr-2 w-5 h-5" />
                See ROI Calculator
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}