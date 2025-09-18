'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Automations', href: '#automations' },
    { label: 'Features', href: '#features' },
    { label: 'Industries', href: '#industries' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' }
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 border-b border-border/40 backdrop-blur-xl bg-background/80 supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-xl font-bold text-foreground">AI Auto</span>
            <span className="text-sm text-muted-foreground block leading-none">Service</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="backdrop-blur-sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/40 backdrop-blur-xl bg-background/90"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}