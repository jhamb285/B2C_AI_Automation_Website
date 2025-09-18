'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Zap,
  Sun,
  Moon,
  LogIn
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
  companyName = "AI Auto Service",
  logo,
  navItems = [
    { label: "Automation", sectionId: "automation" },
    { label: "Features", sectionId: "features" },
    { label: "Contact", sectionId: "contact" }
  ]
}: FloatingNavBarProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false)

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
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'scale-95 shadow-xl' : 'scale-100 shadow-lg'
      }`}
    >
      <div className={`flex items-center gap-8 px-8 py-3 backdrop-blur-xl border rounded-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 border-border/80 shadow-2xl' 
          : 'bg-background/80 border-border/60 shadow-lg'
      }`}>
        {/* Company Name */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            {logo || <Zap className="w-6 h-6 text-primary" />}
          </div>
          <span className="text-xl font-bold text-foreground">{companyName}</span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Right Side Controls - Theme + Login */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
                document.documentElement.classList.toggle('dark')
              }}
              className="relative w-9 h-9 rounded-full border-border/50 hover:bg-accent/50"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="w-px h-5 bg-border/50"></div>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-accent/50 rounded-full px-3 py-1.5">
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Login</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default FloatingNavBar