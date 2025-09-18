'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  PlayCircle, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  TrendingUp, 
  MessageSquare,
  ArrowRight
} from 'lucide-react'

interface AutomationFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: string
  stats: {
    efficiency: string
    timesSaved: string
    conversion: string
  }
  features: string[]
  benefits: {
    description: string
    impact: string
    industries: string[]
  }
  demoVideoUrl?: string
}

const automations: AutomationFeature[] = [
  {
    id: 'lead-nurturing',
    title: 'Lead Nurturing AI Agent',
    description: 'End-to-end lead management that transforms prospects into customers with AI-driven personalization and intelligent follow-up sequences.',
    icon: <Users className="w-8 h-8" />,
    category: 'Lead Management',
    stats: {
      efficiency: '85%',
      timesSaved: '34hrs/week',
      conversion: '156%'
    },
    features: [
      'AI-driven lead qualification and scoring (0-100 scale)',
      'Personalized email generation with context awareness',
      'Intelligent meeting scheduling with calendar integration',
      'Automated follow-up sequences based on engagement',
      'Centralized database with Google Sheets integration',
      'Complete activity logging with AI decision rationale',
      'Multi-channel lead capture (webhooks, email, chat)',
      'Real-time lead status management and updates'
    ],
    benefits: {
      description: 'Transform your lead management with AI that never sleeps',
      impact: '67% improvement in lead quality, 96% faster engagement',
      industries: ['Technology & SaaS', 'Professional Services', 'E-commerce', 'Consulting']
    }
  },
  {
    id: 'sales-automation',
    title: 'Sales Pipeline Accelerator',
    description: 'Automate your entire sales process from prospecting to closing with AI-powered deal progression and smart opportunity management.',
    icon: <TrendingUp className="w-8 h-8" />,
    category: 'Sales Operations',
    stats: {
      efficiency: '78%',
      timesSaved: '28hrs/week',
      conversion: '124%'
    },
    features: [
      'Automated prospect research and enrichment',
      'AI-powered deal scoring and priority ranking',
      'Smart follow-up sequences for different deal stages',
      'Automated proposal generation and tracking',
      'CRM synchronization and data enrichment',
      'Performance analytics and forecasting',
      'Competitive intelligence gathering',
      'Commission calculation automation'
    ],
    benefits: {
      description: 'Close more deals faster with intelligent sales automation',
      impact: '45% shorter sales cycles, 32% higher win rates',
      industries: ['B2B Technology', 'Manufacturing', 'Financial Services', 'Healthcare']
    }
  },
  {
    id: 'customer-engagement',
    title: 'Customer Engagement Engine',
    description: 'Deliver personalized customer experiences at scale with AI-driven communication, support automation, and retention campaigns.',
    icon: <MessageSquare className="w-8 h-8" />,
    category: 'Customer Success',
    stats: {
      efficiency: '92%',
      timesSaved: '42hrs/week',
      conversion: '189%'
    },
    features: [
      'Personalized customer journey mapping',
      'Automated onboarding sequence management',
      'AI-powered support ticket resolution',
      'Proactive churn prevention alerts',
      'Customer satisfaction monitoring',
      'Upsell and cross-sell opportunity detection',
      'Multi-channel communication orchestration',
      'Customer health scoring and insights'
    ],
    benefits: {
      description: 'Keep customers engaged and reduce churn with smart automation',
      impact: '73% reduction in churn, 298% increase in customer lifetime value',
      industries: ['SaaS Platforms', 'E-commerce', 'Subscription Services', 'Digital Agencies']
    }
  }
]

const ExpandableCard = ({ automation }: { automation: AutomationFeature }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'features' | 'benefits'>('features')
  
  return (
    <motion.div
      layout
      className="relative group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      
      <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 hover:border-primary/40 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-2xl text-primary-foreground">
              {automation.icon}
            </div>
            <div>
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/30">
                {automation.category}
              </Badge>
              <h3 className="text-2xl font-bold text-foreground">{automation.title}</h3>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Demo
          </Button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          {automation.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(automation.stats).map(([key, value]) => (
            <div key={key} className="text-center p-4 bg-muted/30 rounded-xl border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">{value}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-4 text-primary hover:text-foreground hover:bg-primary/10"
        >
          {isExpanded ? 'Show Less' : 'Explore Features & Benefits'}
          {isExpanded ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
        </Button>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="pt-4 border-t border-border/30">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={activeTab === 'features' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('features')}
                  className={activeTab === 'features' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                >
                  Features
                </Button>
                <Button
                  variant={activeTab === 'benefits' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('benefits')}
                  className={activeTab === 'benefits' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                >
                  Benefits & ROI
                </Button>
              </div>

              {/* Tab Content */}
              {activeTab === 'features' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-4">Core Features</h4>
                  <div className="grid gap-3">
                    {automation.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'benefits' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Business Impact</h4>
                    <p className="text-muted-foreground mb-4">{automation.benefits.description}</p>
                    <div className="p-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl border border-primary/20">
                      <p className="text-primary font-medium">{automation.benefits.impact}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Perfect For</h4>
                    <div className="flex flex-wrap gap-2">
                      {automation.benefits.industries.map((industry, index) => (
                        <Badge key={index} className="bg-secondary/30 text-secondary-foreground border-secondary/30">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ProductFeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section 
      ref={ref}
      className="relative py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            AI Automation Portfolio
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Pre-Built Automations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose from our library of proven automation workflows. Each one is ready to deploy 
            and starts delivering results on day one.
          </p>
        </motion.div>

        {/* Automation Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ExpandableCard automation={automation} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl border border-primary/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Need a Custom Automation?
            </h3>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              Our team can build bespoke automation workflows tailored to your specific business needs and processes.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            >
              Discuss Custom Automation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}