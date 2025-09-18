'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Bot,
  Sun,
  Moon,
  LogIn,
  ArrowRight
} from 'lucide-react'

interface FloatingNavBarProps {
  companyName?: string
  logo?: React.ReactNode
  navItems?: Array<{
    label: string
    sectionId: string
  }>
}

export const FloatingNavBar = ({ 
  companyName = "AutoAI",
  logo,
  navItems = [
    { label: "Demo", sectionId: "automations" },
    { label: "ROI Calculator", sectionId: "calculator" },
    { label: "Live Features", sectionId: "features" },
    { label: "Industry", sectionId: "industries" }
  ]
}: FloatingNavBarProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [email, setEmail] = React.useState('')

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Smooth scroll with animation
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = Math.min(Math.abs(distance) / 2, 1000) // Dynamic duration, max 1s
      let start: number | null = null

      function step(timestamp: number) {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        
        // Easing function for smooth animation
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle email submission
      console.log('Email submitted:', email)
      setEmail('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'scale-95' : 'scale-100'
      }`}
    >
      <div className={`flex items-center gap-4 px-4 py-2 backdrop-blur-xl border rounded-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-blue-100/95 to-purple-100/95 border-blue-300/80' 
          : 'bg-gradient-to-r from-blue-100/90 to-purple-100/90 border-blue-300/60'
      }`}>
        {/* Company Name */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full border border-primary/20">
            {logo || <Bot className="w-5 h-5 text-primary" />}
          </div>
          <span className="text-lg font-bold text-gray-900">{companyName}</span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-3">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-gray-700 hover:text-gray-900 transition-colors rounded-full px-2.5 py-1.5 hover:bg-white/50 text-sm font-bold"
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Separator */}
        <div className="hidden lg:block w-px h-5 bg-gray-400/60 rounded-full"></div>
        
        {/* Contact Form */}
        <form onSubmit={handleEmailSubmit} className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email to contact us"
            className="px-3 py-1.5 text-sm bg-white/80 border border-gray-400/60 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent placeholder-gray-600 text-gray-900 font-normal w-48"
            required
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full w-9 h-9 bg-primary hover:bg-primary/90 text-white transition-all duration-200"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default FloatingNavBar