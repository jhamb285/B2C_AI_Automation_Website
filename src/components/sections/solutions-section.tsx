'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Phone, 
  Zap, 
  MessageSquare, 
  Calendar,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

// Main solutions data based on documentation
const mainSolutions = [
  {
    id: 'ai-employee',
    icon: <Phone className="w-8 h-8" />,
    title: 'AI Employee / CSR',
    description: 'Never miss a call again with our 24/7 AI receptionist that answers calls, qualifies leads, and books appointments.',
    features: [
      'Answers calls in your business voice',
      'Qualifies leads automatically', 
      'Books appointments in real-time',
      'Handles overflow and after-hours calls'
    ],
    colorTheme: 'green'
  },
  {
    id: 'workflow-automation',
    icon: <Zap className="w-8 h-8" />,
    title: 'Workflow Automation',
    description: 'Automate your entire business workflow from lead capture to job completion and payment collection.',
    features: [
      'Lead processing and routing',
      'Estimate follow-ups',
      'Service reminders', 
      'Payment collection automation'
    ],
    colorTheme: 'amber'
  },
  {
    id: 'communication-hub',
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Communication Hub',
    description: 'Centralized communication system that manages all customer interactions across multiple channels.',
    features: [
      'Email and SMS automation',
      'Review request campaigns',
      'Customer feedback loops',
      'Multi-channel messaging'
    ],
    colorTheme: 'orange'
  }
]

// Automation features grid based on documentation
const automationFeatures = [
  {
    id: 'smart-scheduling',
    icon: <Calendar className="w-6 h-6" />,
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling that optimizes your calendar and reduces no-shows.',
    stat: '40% increase in bookings'
  },
  {
    id: 'invoice-automation',
    icon: <FileText className="w-6 h-6" />,
    title: 'Invoice Automation', 
    description: 'Generate and send invoices automatically with payment reminders.',
    stat: '60% faster payments'
  },
  {
    id: 'lead-processing',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Lead Processing',
    description: 'Turn emails into leads instantly and respond before your competition.',
    stat: '95% lead capture rate'
  },
  {
    id: 'customer-management',
    icon: <Users className="w-6 h-6" />,
    title: 'Customer Management',
    description: 'Complete customer lifecycle management with automated touchpoints.',
    stat: '50% more repeat business'
  }
]

// Color theme classes
const colorClasses = {
  green: {
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  amber: {
    text: 'text-amber-600', 
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  orange: {
    text: 'text-orange-600',
    bg: 'bg-orange-50', 
    border: 'border-orange-200'
  }
}

export default function SolutionsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.08) 0%, rgba(59, 130, 246, 0.04) 60%, transparent 100%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Complete Solutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Complete Automation Solutions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your home services business with AI that works alongside your existing systems. 
            No disruption, just enhancement.
          </p>
        </motion.div>

        {/* Main Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {mainSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/50 border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl ${colorClasses[solution.colorTheme as keyof typeof colorClasses].bg} ${colorClasses[solution.colorTheme as keyof typeof colorClasses].border} border flex items-center justify-center mb-4`}>
                    <div className={colorClasses[solution.colorTheme as keyof typeof colorClasses].text}>
                      {solution.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{solution.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Automation Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {automationFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/30 border-border shadow-md hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <Badge variant="secondary" className={`${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-foreground'} border-0 font-semibold`}>
                    {feature.stat}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="backdrop-blur-sm bg-card/30 border-border shadow-lg max-w-4xl mx-auto">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                Ready to Automate Your Business?
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                See how AutoFlow AI can transform your operations in just 15 minutes. Book a personalized demo today.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Schedule Your Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}