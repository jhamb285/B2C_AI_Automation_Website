'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users,
  Target,
  Lightbulb,
  Award,
  ArrowRight,
  CheckCircle,
  Building,
  Globe,
  Zap
} from 'lucide-react'

export default function AboutSection() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const stats = [
    { number: '500+', label: 'Businesses Automated', icon: Building },
    { number: '2M+', label: 'Calls Handled', icon: Users },
    { number: '98%', label: 'Customer Satisfaction', icon: Award },
    { number: '24/7', label: 'AI Coverage', icon: Globe }
  ]

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to help home service businesses thrive through intelligent automation that enhances rather than replaces human expertise.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Cutting-edge AI technology designed specifically for the unique challenges of home service operations.'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your success is our success. We provide ongoing support, training, and optimization to ensure maximum ROI.'
    }
  ]

  const achievements = [
    'Featured in Home Services Industry Magazine',
    'Winner of 2024 Innovation Award',
    'Certified by leading CRM providers',
    'SOC 2 Type II compliant',
    'GDPR and CCPA compliant',
    '99.9% uptime guarantee'
  ]

  return (
    <section ref={ref} id="about" className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 24, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-[450px] h-[450px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.08) 0%, rgba(34, 197, 94, 0.04) 60%, transparent 100%)',
            filter: 'blur(100px)',
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
            About AutoFlow AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Built for Home Service Excellence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We understand the unique challenges of home service businesses because we've worked exclusively 
            in this industry for over a decade. Our AI automation is purpose-built to integrate seamlessly 
            with your existing operations.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Story */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Story</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    AutoFlow AI was founded by a team of engineers and home service industry veterans 
                    who experienced firsthand the daily challenges of running efficient operations 
                    while maintaining exceptional customer service.
                  </p>
                  <p>
                    After seeing countless businesses struggle with missed calls, manual processes, 
                    and inefficient workflows, we knew there had to be a better way. We built AutoFlow AI 
                    specifically for home service professionals who want to grow their business without 
                    sacrificing quality or customer relationships.
                  </p>
                  <p>
                    Today, we're proud to serve over 500 businesses across North America, helping them 
                    capture more leads, improve efficiency, and deliver better customer experiences 
                    through intelligent automation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {values.map((value, index) => (
              <Card key={index} className="backdrop-blur-sm bg-card/30 border-border shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Recognition & Achievements</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by industry leaders and recognized for innovation
            </p>
          </div>
          
          <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="backdrop-blur-sm bg-card/30 border-border shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">Ready to Join Our Success Stories?</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Join hundreds of home service businesses that have transformed their operations with AutoFlow AI. 
                See why we're the trusted choice for intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <span>Start Your Transformation</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Our Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}