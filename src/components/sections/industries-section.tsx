'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Hammer,
  TreePine,
  Home,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle,
  Bug
} from 'lucide-react'

// Industry solutions data based on documentation
const industries = [
  {
    id: 'hvac',
    icon: <Wrench className="w-8 h-8" />,
    title: 'HVAC Services',
    description: 'Emergency call handling, maintenance scheduling, and seasonal campaign automation.',
    benefits: [
      'Handle emergency calls 24/7',
      'Schedule maintenance appointments',
      'Automate seasonal reminders',
      'Process service requests instantly'
    ],
    stats: {
      callCapture: '95%',
      bookings: '+40%',
      revenue: '+25%'
    },
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'electrical',
    icon: <Zap className="w-8 h-8" />,
    title: 'Electrical Contractors',
    description: 'Safety-first call screening, urgent job prioritization, and follow-up automation.',
    benefits: [
      'Screen for emergency situations',
      'Prioritize urgent electrical work',
      'Schedule inspections automatically',
      'Follow up on estimates'
    ],
    stats: {
      callCapture: '98%',
      bookings: '+35%', 
      revenue: '+30%'
    },
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'plumbing',
    icon: <Droplets className="w-8 h-8" />,
    title: 'Plumbing Services',
    description: 'Emergency response coordination, appointment optimization, and customer communication.',
    benefits: [
      'Coordinate emergency responses',
      'Optimize appointment scheduling',
      'Automate service reminders',
      'Handle insurance claims'
    ],
    stats: {
      callCapture: '92%',
      bookings: '+45%',
      revenue: '+28%'
    },
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'general-contractors',
    icon: <Hammer className="w-8 h-8" />,
    title: 'General Contractors',
    description: 'Project coordination, estimate follow-ups, and multi-phase job management.',
    benefits: [
      'Coordinate project timelines',
      'Follow up on estimates',
      'Manage multi-phase jobs',
      'Track material deliveries'
    ],
    stats: {
      callCapture: '90%',
      bookings: '+50%',
      revenue: '+35%'
    },
    gradient: 'from-gray-400 to-slate-600'
  },
  {
    id: 'landscaping',
    icon: <TreePine className="w-8 h-8" />,
    title: 'Landscaping',
    description: 'Seasonal service automation, weather-based scheduling, and maintenance programs.',
    benefits: [
      'Automate seasonal services',
      'Weather-based scheduling',
      'Maintenance program management',
      'Equipment rental coordination'
    ],
    stats: {
      callCapture: '88%',
      bookings: '+55%',
      revenue: '+40%'
    },
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    id: 'home-services',
    icon: <Home className="w-8 h-8" />,
    title: 'Home Services',
    description: 'Comprehensive automation for cleaning, maintenance, and repair services.',
    benefits: [
      'Recurring service scheduling',
      'Quality assurance follow-ups',
      'Customer preference tracking',
      'Service customization'
    ],
    stats: {
      callCapture: '94%',
      bookings: '+60%',
      revenue: '+32%'
    },
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'pest-control',
    icon: <Bug className="w-8 h-8" />,
    title: 'Pest Control',
    description: '24/7 AI front desk, missed‑call text‑back, rapid intake & scheduling, review engine, and recurring plan automation tailored to residential pest.',
    benefits: [
      'Answer every lead after‑hours and during peaks (AI receptionist)',
      'Reply in ~2 minutes via SMS/chat; auto‑book inspections',
      'Run multi‑touch follow‑ups and review requests',
      'Automate quarterly/annual plan reminders & renewals'
    ],
    stats: {
      callCapture: '~92-95%',
      bookings: '~2 minutes',
      revenue: '~20-40%'
    },
    gradient: 'from-red-400 to-orange-500'
  }
]

// Real-world use cases based on documentation
const useCases = [
  {
    id: 'emergency-calls',
    icon: <Phone className="w-6 h-6" />,
    title: 'Emergency Call Handling',
    description: 'AI instantly assesses urgency, dispatches appropriate technicians, and keeps customers informed.',
    example: 'Customer calls about no heat at 2 AM → AI assesses urgency → Dispatches emergency tech → Sends ETA updates'
  },
  {
    id: 'smart-scheduling',
    icon: <Calendar className="w-6 h-6" />,
    title: 'Smart Scheduling',
    description: 'Optimize routes, reduce travel time, and maximize daily appointments with intelligent scheduling.',
    example: 'AI analyzes location, job type, and technician skills → Optimizes daily routes → Reduces travel time by 30%'
  },
  {
    id: 'revenue-optimization',
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Revenue Optimization',
    description: 'Automate renewals, upsells, and referrals to grow revenue from existing customers first. Probability of selling to existing customers: 60–70% vs 5–20% new prospects. A 5% lift in retention can raise profits 25–95%. Call tracking/attribution ties marketing to revenue for smarter budget allocation.',
    example: 'During maintenance call → AI suggests additional services → Automates follow-up → Increases job value by 25%'
  }
]

export default function IndustriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} id="industries" className="relative pt-12 pb-12">{/* Reduced padding */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Industry Solutions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Industry-Proven Automation Solutions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Specialized AI automation engineered for the unique operational challenges of home service businesses. 
            Proven performance across HVAC, plumbing, electrical, and landscaping with measurable efficiency gains.
          </p>
        </motion.div>

        {/* Industries Horizontal Scrolling Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Moving carousel container - Fixed infinite loop */}
            <motion.div
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="flex gap-6"
              style={{ width: 'calc(200% + 24px)' }}
            >
              {/* First set of industries */}
              {industries.map((industry, index) => (
                <motion.div
                  key={`first-${industry.id}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-shrink-0 w-80"
                >
                  <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-80">
                    {/* Gradient background */}
                    <div 
                      className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-40 bg-gradient-to-br ${industry.gradient}`}
                      style={{ transform: 'translate(25%, -25%)' }}
                    />
                    
                    {/* Small icon on top of circle */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                        <div className="text-primary [&>svg]:w-5 [&>svg]:h-5">
                          {industry.icon}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3 relative z-10 h-24">
                      <CardTitle className="text-lg font-bold text-foreground leading-tight">{industry.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 flex flex-col justify-between" style={{ height: 'calc(100% - 96px)' }}>
                      {/* Benefits - Show only first 3 for space with consistent height */}
                      <ul className="space-y-1.5 mb-4 flex-grow">
                        {industry.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0 mr-1.5" />
                            <span className="text-xs text-foreground leading-tight">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Performance Stats - Fixed at bottom */}
                      <div className="grid grid-cols-3 gap-1.5 mt-auto">
                        <div className="text-center p-2 bg-primary/5 rounded-md border border-primary/10">
                          <div className="text-sm font-bold text-primary leading-none">{industry.stats.callCapture}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-none">Calls</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-md border border-primary/10">
                          <div className="text-sm font-bold text-primary leading-none">{industry.stats.bookings}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-none">Bookings</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-md border border-primary/10">
                          <div className="text-sm font-bold text-primary leading-none">{industry.stats.revenue}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-none">Revenue</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {industries.map((industry, index) => (
                <motion.div
                  key={`second-${industry.id}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-shrink-0 w-80"
                >
                  <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-80">
                    {/* Gradient background */}
                    <div 
                      className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-40 bg-gradient-to-br ${industry.gradient}`}
                      style={{ transform: 'translate(25%, -25%)' }}
                    />
                    
                    {/* Small icon on top of circle */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                        <div className="text-primary [&>svg]:w-5 [&>svg]:h-5">
                          {industry.icon}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3 relative z-10 h-24">
                      <CardTitle className="text-lg font-bold text-foreground leading-tight">{industry.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 flex flex-col justify-between" style={{ height: 'calc(100% - 96px)' }}>
                      {/* Benefits - Show only first 3 for space with consistent height */}
                      <ul className="space-y-1.5 mb-4 flex-grow">
                        {industry.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0 mr-1.5" />
                            <span className="text-xs text-foreground leading-tight">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Performance Stats - Fixed at bottom */}
                      <div className="grid grid-cols-3 gap-1.5 mt-auto">
                        <div className="text-center p-2 bg-primary/5 rounded-md border border-primary/10">
                          <div className="text-sm font-bold text-primary leading-none">{industry.stats.callCapture}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-none">Calls</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-md border border-primary/10">
                          <div className="text-sm font-bold text-primary leading-none">{industry.stats.bookings}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-none">Bookings</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-md border border-primary/10">
                          <div className="text-sm font-bold text-primary leading-none">{industry.stats.revenue}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-none">Revenue</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Real-World Use Cases */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Real-World Use Cases</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our AI automation transforms everyday business operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full backdrop-blur-sm bg-card/30 border-border shadow-md hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                      <div className="text-primary">
                        {useCase.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">{useCase.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-sm text-foreground font-medium italic">
                        {useCase.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                See AutoFlow AI in Action for Your Industry
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Get a personalized demo showing exactly how AutoFlow AI will work with your specific business type and existing systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg relative">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 rounded-lg"
                  />
                  <span className="relative z-10">Book Industry Demo</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg border-primary/50 text-primary hover:border-primary/70 hover:bg-primary/10 backdrop-blur-sm"
                >
                  View Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}