'use client'

import React from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Pause,
  DollarSign, 
  TrendingUp, 
  Clock, 
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Zap,
  Users,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Star
} from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Automation categories for navigation
const automationCategories = [
  { id: 'lead-capturing', label: 'Lead Capturing', icon: <Target className="w-4 h-4" /> },
  { id: 'lead-nurturing', label: 'Lead Nurturing', icon: <Users className="w-4 h-4" /> },
  { id: 'sales', label: 'Sales Pipeline', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'smart-scheduling', label: 'Smart Scheduling', icon: <Clock className="w-4 h-4" /> },
  { id: 'customer-success', label: 'Customer Success', icon: <CheckCircle2 className="w-4 h-4" /> }
]

// Define the automation data type
interface AutomationData {
  title: string;
  subtitle: string;
  description: string;
  detailedInfo?: {
    sectionName: string;
    facts: Array<{ text: string; source: { domain: string; url: string } }>;
  };
  metrics: Array<{ label: string; value: string; icon: React.ReactNode; color: string }>;
  features: Array<{ title: string; description: string; icon: React.ReactNode; }>;
}

// Sample automation data with enhanced metrics and features
const automationData: Record<string, AutomationData> = {
  'lead-nurturing': {
    title: 'Lead Nurturing',
    subtitle: '',
    description: 'Hands-free nurturing with intelligent automation features:',
    detailedInfo: {
      sectionName: 'Lead Nurturing',
      facts: [
        { text: 'Automated/triggered emails get 70.5% higher open rates and 152% higher CTR than newsletters', source: { domain: 'lifesight.io', url: 'https://lifesight.io/blog/triggered-emails/' } },
        { text: 'Welcome/triggered emails see 42% higher read rates vs average campaigns', source: { domain: 'campaignmonitor.com', url: 'https://www.campaignmonitor.com/resources/infographics/how-effective-are-welcome-emails/' } },
        { text: '80% of sales require 5+ follow-ups, yet 44% of reps stop after one', source: { domain: 'brevetgroup.com', url: 'https://blog.thebrevetgroup.com/21-mind-blowing-sales-stats' } },
        { text: 'Marketing automation closes the gap with consistent multi-touch sequences', source: { domain: 'marketingdonut.co.uk', url: 'https://www.marketingdonut.co.uk/sales/sales-strategy/why-you-must-follow-up-leads' } }
      ]
    },
    metrics: [
      { label: 'Conversion Rate', value: '+30-40%', icon: <TrendingUp className="w-5 h-5" />, color: 'emerald' },
      { label: 'Engagement Score', value: '+30% bump', icon: <MessageSquare className="w-5 h-5" />, color: 'blue' },
      { label: 'ROI Increase', value: '+20% average', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Time Efficiency', value: '10-12hrs/week', icon: <Clock className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      { 
        title: 'Multi-Touch Automation', 
        description: 'Automatically sends 5+ strategic follow-ups so you never lose deals to insufficient touchpoints', 
        icon: <MessageSquare className="w-6 h-6" />
      },
      { 
        title: 'High-Impact Email Sequences', 
        description: 'Triggered emails that get 152% higher CTR than newsletters with personalized timing', 
        icon: <Zap className="w-6 h-6" />
      },
      { 
        title: 'Smart Lead Qualification', 
        description: 'AI scores and qualifies leads automatically, prioritizing your highest-value prospects', 
        icon: <Target className="w-6 h-6" />
      },
      { 
        title: 'Centralized Lead Intelligence', 
        description: 'Complete activity tracking synced to Google Sheets with AI-powered insights and rationale', 
        icon: <Users className="w-6 h-6" />
      }
    ]
  },
  'lead-capturing': {
    title: 'AI Lead Capturing Engine',
    subtitle: '',
    description: 'Stop losing emergency pest leads to voicemail and slow callbacks.',
    detailedInfo: {
      sectionName: 'Lead Capturing',
      facts: [
        { text: '85% of missed callers don\'t call back', source: { domain: 'aircall.io', url: 'https://aircall.io/blog/customer-happiness/missed-calls/' } },
        { text: 'Businesses answer only 38% of inbound calls; 37.8% go to voicemail; 24.3% get no response', source: { domain: 'numa.com', url: 'https://www.numa.com/blog/22-business-phone-statistics' } },
        { text: '78% of buyers choose the first company to respond', source: { domain: 'leandata.com', url: 'https://www.leandata.com/blog/the-modern-rules-of-lead-response-time/' } },
        { text: 'Respond in 5 minutes → 21× more likely to qualify vs 30 minutes', source: { domain: 'getcensus.com', url: 'https://www.getcensus.com/ops_glossary/lead-response-time-crucial-sales-metric-explained' } },
        { text: 'Respond in 1 minute → conversions +391%', source: { domain: 'rep.ai', url: 'https://rep.ai/blog/lead-response' } }
      ]
    },
    metrics: [
      { label: 'Lead Quality Score', value: '+50-60%', icon: <Target className="w-5 h-5" />, color: 'emerald' },
      { label: 'Time Saved', value: '10-12hrs/week', icon: <Clock className="w-5 h-5" />, color: 'blue' },
      { label: 'Cost Reduction', value: '$4K-5K/mo', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Conversion Rate', value: '67%', icon: <TrendingUp className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      { 
        title: 'Instant Response System', 
        description: 'Responds in under 1 minute for 391% higher conversions - no more lost leads to voicemail', 
        icon: <Clock className="w-6 h-6" />
      },
      { 
        title: 'Multi-Channel Capture', 
        description: 'Captures leads from web, social, email, and calls - answers the 62% of calls businesses miss', 
        icon: <Target className="w-6 h-6" />
      },
      { 
        title: 'AI Lead Qualification', 
        description: 'Instantly qualifies leads with 21× higher success rate when responding within 5 minutes', 
        icon: <CheckCircle2 className="w-6 h-6" />
      },
      { 
        title: 'Smart Lead Routing', 
        description: 'Routes qualified leads to the right team member ensuring 78% of buyers choose you first', 
        icon: <ArrowUpRight className="w-6 h-6" />
      }
    ]
  },
  'sales': {
    title: 'Sales Pipeline',
    subtitle: '',
    description: 'Maximize revenue from existing customers through intelligent cross-sell and upsell opportunities using AI-driven insights.',
    detailedInfo: {
      sectionName: 'Sales Pipeline',
      facts: [
        { text: 'Probability of selling to existing customers: 60-70% vs 5-20% for new prospects', source: { domain: 'hbr.org', url: 'https://hbr.org/2014/10/the-value-of-keeping-the-right-customers' } },
        { text: 'Cross-selling to existing customers is 6-7× more cost-effective than acquiring new ones', source: { domain: 'salesforce.com', url: 'https://www.salesforce.com/resources/articles/customer-retention/' } },
        { text: 'Upselling is 68% less expensive than acquiring new customers', source: { domain: 'outfunnel.com', url: 'https://outfunnel.com/upselling-statistics/' } },
        { text: 'Companies with strong cross-selling see 20% revenue growth annually', source: { domain: 'mckinsey.com', url: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/next-in-personalization' } },
        { text: 'AI-driven recommendations increase upsell acceptance rates by 30-50%', source: { domain: 'salesforce.com', url: 'https://www.salesforce.com/news/stories/ai-sales-statistics/' } }
      ]
    },
    metrics: [
      { label: 'Win Rate', value: '+124%', icon: <Target className="w-5 h-5" />, color: 'emerald' },
      { label: 'Cycle Time', value: '-45%', icon: <Clock className="w-5 h-5" />, color: 'blue' },
      { label: 'Revenue Impact', value: '$52,000/mo', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Deal Volume', value: '+189%', icon: <BarChart3 className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      { 
        title: 'Existing Customer Intelligence', 
        description: 'Target 60-70% win rates with existing customers vs 5-20% with new prospects using purchase history AI', 
        icon: <Users className="w-6 h-6" />
      },
      { 
        title: 'Cross-Sell Optimization', 
        description: 'Identify opportunities that are 6-7× more cost-effective than acquiring new customers', 
        icon: <TrendingUp className="w-6 h-6" />
      },
      { 
        title: 'Smart Upsell Timing', 
        description: 'AI-driven recommendations increase acceptance rates by 30-50% with perfect timing', 
        icon: <Target className="w-6 h-6" />
      },
      { 
        title: 'Revenue Growth Engine', 
        description: 'Drive 20% annual revenue growth through systematic cross-selling to your existing base', 
        icon: <DollarSign className="w-6 h-6" />
      }
    ]
  },
  'smart-scheduling': {
    title: 'Smart Scheduling',
    subtitle: '',
    description: 'Eliminate scheduling conflicts and optimize calendar efficiency with AI-powered appointment management and intelligent time blocking.',
    detailedInfo: {
      sectionName: 'Smart Scheduling',
      facts: [
        { text: 'Manual scheduling takes an average of 23 minutes per appointment', source: { domain: 'acuityscheduling.com', url: 'https://acuityscheduling.com/blog/online-scheduling-statistics/' } },
        { text: 'Businesses lose 67% of sales opportunities due to poor meeting coordination', source: { domain: 'calendly.com', url: 'https://calendly.com/blog/scheduling-statistics' } },
        { text: 'Automated scheduling increases meeting show-up rates by 37%', source: { domain: 'hubspot.com', url: 'https://blog.hubspot.com/marketing/meeting-scheduling-statistics' } },
        { text: 'AI-optimized calendars can save 2-4 hours per week per employee', source: { domain: 'microsoft.com', url: 'https://www.microsoft.com/en-us/research/blog/ai-scheduling-optimization/' } },
        { text: 'Smart scheduling reduces no-shows by up to 45%', source: { domain: 'setmore.com', url: 'https://www.setmore.com/blog/online-appointment-scheduling-statistics/' } }
      ]
    },
    metrics: [
      { label: 'Time Saved', value: '3.2 hrs/week', icon: <Clock className="w-5 h-5" />, color: 'emerald' },
      { label: 'Show-up Rate', value: '+37%', icon: <CheckCircle2 className="w-5 h-5" />, color: 'blue' },
      { label: 'Efficiency Gain', value: '89%', icon: <Zap className="w-5 h-5" />, color: 'violet' },
      { label: 'Cost Reduction', value: '$2,400/mo', icon: <DollarSign className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      { 
        title: '23-Minute Time Saver', 
        description: 'Eliminates the 23 minutes of manual work per appointment with AI-powered scheduling', 
        icon: <Clock className="w-6 h-6" />
      },
      { 
        title: 'Opportunity Protector', 
        description: 'Prevents the 67% of sales lost due to poor meeting coordination with smart conflict resolution', 
        icon: <CheckCircle2 className="w-6 h-6" />
      },
      { 
        title: 'Show-Up Maximizer', 
        description: 'Increases meeting attendance by 37% and reduces no-shows by 45% with intelligent reminders', 
        icon: <Users className="w-6 h-6" />
      },
      { 
        title: 'Productivity Multiplier', 
        description: 'Saves 2-4 hours per week per employee with AI-optimized calendar management', 
        icon: <Zap className="w-6 h-6" />
      }
    ]
  },
  'customer-success': {
    title: 'Customer Success',
    subtitle: '',
    description: 'Boost Google Maps ratings, manage reviews intelligently, and automatically fix service issues to protect your reputation.',
    detailedInfo: {
      sectionName: 'Customer Success',
      facts: [
        { text: '88% of consumers read reviews to determine the quality of a local business', source: { domain: 'brightlocal.com', url: 'https://www.brightlocal.com/research/local-consumer-review-survey/' } },
        { text: 'Businesses with 4+ star ratings receive 2.5× more clicks than those with lower ratings', source: { domain: 'moz.com', url: 'https://moz.com/blog/google-my-business-ranking-factors' } },
        { text: 'One negative review can drive away 22% of potential customers', source: { domain: 'podium.com', url: 'https://www.podium.com/article/online-reviews-statistics/' } },
        { text: 'Automated review requests get 30-50% higher response rates than manual outreach', source: { domain: 'reviewtrackers.com', url: 'https://www.reviewtrackers.com/blog/review-request-best-practices/' } },
        { text: '85% of customers expect businesses to respond to negative reviews within 24 hours', source: { domain: 'reputation.com', url: 'https://www.reputation.com/resources/articles/online-reputation-management-statistics/' } }
      ]
    },
    metrics: [
      { label: 'Google Rating', value: '+1.2 stars', icon: <Star className="w-5 h-5" />, color: 'emerald' },
      { label: 'Review Volume', value: '+285%', icon: <MessageSquare className="w-5 h-5" />, color: 'blue' },
      { label: 'Issue Resolution', value: '94% auto', icon: <CheckCircle2 className="w-5 h-5" />, color: 'violet' },
      { label: 'Response Time', value: '<15 min', icon: <Clock className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      { 
        title: 'Reputation Shield', 
        description: 'Prevents 22% customer loss from negative reviews with instant <15 minute response automation', 
        icon: <CheckCircle2 className="w-6 h-6" />
      },
      { 
        title: '5-Star Rating Booster', 
        description: 'Drives 2.5× more clicks with automated review campaigns that get 30-50% higher response rates', 
        icon: <Star className="w-6 h-6" />
      },
      { 
        title: 'Review Intelligence System', 
        description: 'Smart sentiment analysis routes positive reviews to Google Maps and fixes issues instantly', 
        icon: <MessageSquare className="w-6 h-6" />
      },
      { 
        title: 'Service Recovery Automation', 
        description: 'Automatically detects and fixes service issues before they become negative reviews', 
        icon: <AlertTriangle className="w-6 h-6" />
      }
    ]
  }
}

const FloatingVideoPlayer = ({ isPlaying, onPlayPause }: { 
  isPlaying: boolean; 
  onPlayPause: () => void; 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative group"
    >
      <div className="overflow-hidden p-0 backdrop-blur-sm bg-card/20 border border-border rounded-lg shadow-lg transition-all duration-300 hover:border-primary/40">
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          {/* Video placeholder */}
          <div className="absolute inset-4 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg border border-border/50" />
          
          {/* Floating play/pause button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <Button
              onClick={onPlayPause}
              size="lg"
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
          </motion.div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/30"
          >
            <BarChart3 className="w-5 h-5 text-primary" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/30"
          >
            <Zap className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const MetricCard = ({ metric, index }: { metric: { label: string; value: string; icon: React.ReactNode; color: string }, index: number }) => {
  const colorClasses = {
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    violet: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
  }

  // Extract numeric value for progress bar
  const numericValue = parseFloat(metric.value.replace(/[^0-9.-]/g, '')) || 0
  const maxValue = 100 // Assuming percentage-based metrics
  const progressPercentage = Math.min(numericValue, maxValue)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="p-4 backdrop-blur-sm bg-card/20 border border-border rounded-lg shadow-lg">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
              {metric.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Performance</span>
              <span className="text-xs font-medium text-primary">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${colorClasses[metric.color as keyof typeof colorClasses].replace('text-', 'bg-').replace('/10', '/60')}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.2 + 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const StickyNotesSection = ({ features }: { features: Array<{ title: string; description: string; icon: React.ReactNode; }> }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
          whileHover={{ 
            scale: 1.03, 
            y: -4,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        >
          <div className="p-6 backdrop-blur-sm bg-card/60 border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
            <div className="flex flex-col gap-4">
              {/* Icon and Title */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
            
            {/* Subtle accent gradient */}
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/60 via-primary/30 to-primary/10" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const DetailedInfoSection = ({ detailedInfo }: {
  detailedInfo: {
    sectionName: string;
    facts: Array<{ text: string; source: { domain: string; url: string } }>;
  }
}) => {
  // Helper function to make numbers/percentages bold
  const formatFactText = (text: string) => {
    // Match patterns like: 85%, 21×, +391%, ≤5 minutes, etc.
    return text.replace(
      /(\d+(?:\.\d+)?%?|[≤≥~]?\d+(?:\.\d+)?[×%]?|\+\d+(?:\.\d+)?%?)/g, 
      '<strong>$1</strong>'
    );
  };

  return (
    <div className="space-y-3 w-full">
      {/* Clean Facts List with right-aligned sources */}
      <div className="space-y-2 w-full">
        {detailedInfo.facts.map((fact, index) => (
          <div key={index} className="flex items-start gap-4 w-full">
            {/* Bigger bullet point - properly aligned */}
            <span className="text-primary mt-1.5 flex-shrink-0 text-xl font-bold leading-none">•</span>
            
            {/* Main content area */}
            <div className="flex-1 flex items-start justify-between gap-6 min-w-0">
              {/* Fact text with bold numbers */}
              <span 
                className="text-foreground text-xs leading-relaxed flex-1"
                dangerouslySetInnerHTML={{ __html: formatFactText(fact.text) }}
              />
              
              {/* Source badge on the right side */}
              <div className="flex-shrink-0">
                <Badge asChild variant="outline" className="px-3 py-1.5 text-xs">
                  <a
                    href={fact.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:bg-accent transition-colors"
                    aria-label={`Open source: ${fact.source.domain}`}
                  >
                    <img
                      src={`https://logo.clearbit.com/${fact.source.domain}`}
                      alt={`${fact.source.domain} logo`}
                      className="size-4 rounded-sm object-contain"
                      onError={(e) => ((e.currentTarget.style.display = "none"))}
                    />
                    <span className="font-medium">{fact.source.domain}</span>
                    <ExternalLink className="size-3 opacity-70" aria-hidden />
                  </a>
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default function AutomationShowcaseSimple() {
  const [activeCategory, setActiveCategory] = useState('lead-nurturing')
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const currentAutomation = automationData[activeCategory as keyof typeof automationData]

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setExpandedSection(null) // Reset expanded sections when switching
  }

  return (
    <section ref={ref} id="automations" className="relative pt-8 pb-8">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 mt-2"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              AI Automations in Action
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Explore our complete automation library. Each solution delivers measurable results from day one.
          </motion.p>
        </motion.div>

        {/* Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <div className="p-2 backdrop-blur-sm bg-card/20 border border-border rounded-lg max-w-4xl mx-auto shadow-lg">
            <div className="flex flex-wrap justify-center gap-2">
              {automationCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  className={`px-4 py-2 transition-all duration-200 ${
                    activeCategory === category.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content - Split Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="grid lg:grid-cols-[60%_40%] gap-6 items-start"
          >
            {/* Left Side - Floating Video Player */}
            <div className="space-y-4">
              <FloatingVideoPlayer 
                isPlaying={isVideoPlaying}
                onPlayPause={() => setIsVideoPlaying(!isVideoPlaying)}
              />
              
              {/* Enhanced Metrics Grid with Animations */}
              <div className="grid grid-cols-2 gap-3">
                {currentAutomation.metrics.map((metric, index) => (
                  <MetricCard key={index} metric={metric} index={index} />
                ))}
              </div>
            </div>

            {/* Right Side - Automation Information */}
            <div className="space-y-4">
              {/* Header - Now with bigger minimum height and better width */}
              <div className="p-4 backdrop-blur-sm bg-card/20 border border-border rounded-lg shadow-lg relative min-h-[250px] w-full">
                {/* Primary CTA - Top Right of this block */}
                <div className="absolute top-6 right-6">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    Schedule Demo
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="pr-32">
                    <Badge className="bg-primary/10 text-primary border-primary/30">
                      {automationCategories.find(cat => cat.id === activeCategory)?.label}
                    </Badge>
                  </div>
                  <div className="pr-32">
                    <h3 className="text-2xl font-bold text-foreground">{currentAutomation.title}</h3>
                  </div>
                  {currentAutomation.subtitle && (
                    <p className="text-lg text-primary font-medium pr-32">{currentAutomation.subtitle}</p>
                  )}
                  <div className="pr-8">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{currentAutomation.description}</p>
                  </div>
                  
                  {/* Feature bullets - Full width with button clearance */}
                  <div className="space-y-2 feature-bullets-list pr-8">
                    {currentAutomation.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {React.cloneElement(feature.icon as React.ReactElement, { className: "w-2.5 h-2.5" })}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 w-full">
                          <span className="text-base font-semibold text-foreground">{feature.title}: </span>
                          <span className="text-base text-muted-foreground">{feature.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Detailed Info Section - New */}
                  {currentAutomation.detailedInfo && (
                    <div className="pt-4">
                      <Separator className="mb-4" />
                      <DetailedInfoSection detailedInfo={currentAutomation.detailedInfo} />
                    </div>
                  )}

                </div>
              </div>



            </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </section>
  )
}