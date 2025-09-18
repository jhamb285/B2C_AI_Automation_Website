'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Calculator', href: '#calculator' },
      { name: 'Industries', href: '#industries' },
      { name: 'Integrations', href: '#integrations' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Contact Support', href: '/support' },
      { name: 'System Status', href: '/status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
      { name: 'Compliance', href: '/compliance' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-background to-muted/20 border-t border-border">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.02) 70%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">AutoFlow AI</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Intelligent automation for home service businesses. Transform your operations 
                  with AI that works alongside your existing systems to capture more leads, 
                  improve efficiency, and deliver exceptional customer experiences.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">1-800-AUTOFLOW</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">hello@autoflow.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Links Columns */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Support
              </h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="text-sm font-semibold text-foreground mb-2">Ready to Get Started?</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Start your free trial today
                </p>
                <Button size="sm" className="w-full">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 AutoFlow AI. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}