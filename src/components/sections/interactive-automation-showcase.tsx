'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
// import { div } from '@/components/kokonutui/liquid-glass-card'
// import BackgroundPaths from '@/components/kokonutui/background-paths'
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
  CheckCircle2
} from 'lucide-react'
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, Pie } from 'recharts'

// Automation categories for navigation
const automationCategories = [
  { id: 'lead-capturing', label: 'Lead Capturing', icon: <Target className="w-4 h-4" /> },
  { id: 'lead-nurturing', label: 'Lead Nurturing', icon: <Users className="w-4 h-4" /> },
  { id: 'sales', label: 'Sales Pipeline', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'marketing', label: 'Marketing', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'customer-success', label: 'Customer Success', icon: <CheckCircle2 className="w-4 h-4" /> }
]

// Sample automation data with enhanced metrics and features
const automationData = {
  'lead-capturing': {
    title: 'AI Lead Capturing Engine',
    subtitle: 'Intelligent prospect identification and qualification',
    description: 'Advanced AI system that identifies, qualifies, and captures high-quality leads across multiple channels with 94% accuracy.',
    videoUrl: '/demo-video-placeholder.mp4',
    metrics: [
      { label: 'Lead Quality Score', value: '94%', icon: <Target className="w-5 h-5" />, color: 'emerald' },
      { label: 'Time Saved', value: '42hrs/week', icon: <Clock className="w-5 h-5" />, color: 'blue' },
      { label: 'Cost Reduction', value: '$18,500/mo', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Conversion Rate', value: '67%', icon: <TrendingUp className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      'Multi-channel lead detection (web, social, email)',
      'Real-time lead scoring with AI algorithms',
      'Automated qualification workflows',
      'CRM integration and data enrichment',
      'Smart lead routing and assignment',
      'Predictive lead behavior analysis'
    ],
    businessImpact: {
      description: 'Transform your lead generation with AI that never stops working',
      stats: [
        { label: 'Lead Volume Increase', value: 340, color: '#10B981' },
        { label: 'Quality Score Improvement', value: 89, color: '#6366F1' },
        { label: 'Sales Team Efficiency', value: 156, color: '#8B5CF6' }
      ],
      chartData: {
        revenue: [
          { month: 'Jan', before: 45000, after: 78000 },
          { month: 'Feb', before: 52000, after: 89000 },
          { month: 'Mar', before: 48000, after: 95000 },
          { month: 'Apr', before: 61000, after: 112000 },
          { month: 'May', before: 55000, after: 125000 },
          { month: 'Jun', before: 67000, after: 142000 }
        ],
        leadSources: [
          { name: 'Website', value: 35, color: '#10B981' },
          { name: 'Social Media', value: 28, color: '#6366F1' },
          { name: 'Email', value: 22, color: '#8B5CF6' },
          { name: 'Referrals', value: 15, color: '#F59E0B' }
        ]
      }
    }
  },
  'lead-nurturing': {
    title: 'Lead Nurturing AI Agent',
    subtitle: 'Personalized engagement that converts',
    description: 'AI-powered lead nurturing that delivers personalized content and timely follow-ups, increasing conversion rates by 156%.',
    videoUrl: '/demo-video-placeholder.mp4',
    metrics: [
      { label: 'Conversion Rate', value: '156%', icon: <TrendingUp className="w-5 h-5" />, color: 'emerald' },
      { label: 'Engagement Score', value: '87%', icon: <MessageSquare className="w-5 h-5" />, color: 'blue' },
      { label: 'ROI Increase', value: '$24,300/mo', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Time Efficiency', value: '34hrs/week', icon: <Clock className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      'AI-driven lead qualification and scoring',
      'Personalized email generation with context',
      'Intelligent meeting scheduling integration',
      'Automated follow-up sequences',
      'Centralized database with Google Sheets sync',
      'Complete activity logging with AI rationale',
      'Multi-channel lead capture webhooks',
      'Real-time lead status management'
    ],
    businessImpact: {
      description: 'AI that nurtures leads while your team focuses on closing',
      stats: [
        { label: 'Lead to Customer Rate', value: 67, color: '#10B981' },
        { label: 'Engagement Improvement', value: 234, color: '#6366F1' },
        { label: 'Sales Cycle Reduction', value: 45, color: '#8B5CF6' }
      ],
      chartData: {
        revenue: [
          { month: 'Jan', before: 38000, after: 67000 },
          { month: 'Feb', before: 42000, after: 78000 },
          { month: 'Mar', before: 39000, after: 82000 },
          { month: 'Apr', before: 48000, after: 95000 },
          { month: 'May', before: 45000, after: 108000 },
          { month: 'Jun', before: 52000, after: 125000 }
        ],
        leadSources: [
          { name: 'Email Sequences', value: 42, color: '#10B981' },
          { name: 'Content Nurturing', value: 31, color: '#6366F1' },
          { name: 'Social Engagement', value: 18, color: '#8B5CF6' },
          { name: 'Direct Outreach', value: 9, color: '#F59E0B' }
        ]
      }
    }
  },
  'sales': {
    title: 'Sales Pipeline Accelerator',
    subtitle: 'AI-powered deal progression and closing',
    description: 'Intelligent sales automation that identifies opportunities, scores deals, and automates follow-ups to accelerate your pipeline.',
    videoUrl: '/demo-video-placeholder.mp4',
    metrics: [
      { label: 'Win Rate', value: '+124%', icon: <Target className="w-5 h-5" />, color: 'emerald' },
      { label: 'Cycle Time', value: '-45%', icon: <Clock className="w-5 h-5" />, color: 'blue' },
      { label: 'Revenue Impact', value: '$52,000/mo', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Deal Volume', value: '+189%', icon: <BarChart3 className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      'Automated prospect research and enrichment',
      'AI-powered deal scoring and priority ranking',
      'Smart follow-up sequences for different stages',
      'Automated proposal generation and tracking',
      'CRM synchronization and data enrichment',
      'Performance analytics and forecasting'
    ],
    businessImpact: {
      description: 'Close more deals faster with intelligent sales automation',
      stats: [
        { label: 'Deal Velocity', value: 78, color: '#10B981' },
        { label: 'Pipeline Value', value: 234, color: '#6366F1' },
        { label: 'Close Rate', value: 156, color: '#8B5CF6' }
      ],
      chartData: {
        revenue: [
          { month: 'Jan', before: 85000, after: 145000 },
          { month: 'Feb', before: 92000, after: 178000 },
          { month: 'Mar', before: 88000, after: 195000 },
          { month: 'Apr', before: 105000, after: 225000 },
          { month: 'May', before: 98000, after: 248000 },
          { month: 'Jun', before: 112000, after: 285000 }
        ],
        leadSources: [
          { name: 'Outbound Sales', value: 38, color: '#10B981' },
          { name: 'Inbound Leads', value: 29, color: '#6366F1' },
          { name: 'Partnerships', value: 21, color: '#8B5CF6' },
          { name: 'Referrals', value: 12, color: '#F59E0B' }
        ]
      }
    }
  },
  'marketing': {
    title: 'Marketing Automation Hub',
    subtitle: 'Omnichannel marketing orchestration',
    description: 'Comprehensive marketing automation that creates, schedules, and optimizes campaigns across all channels for maximum impact.',
    videoUrl: '/demo-video-placeholder.mp4',
    metrics: [
      { label: 'Campaign ROI', value: '+298%', icon: <TrendingUp className="w-5 h-5" />, color: 'emerald' },
      { label: 'Reach Increase', value: '450%', icon: <Users className="w-5 h-5" />, color: 'blue' },
      { label: 'Cost Savings', value: '$15,800/mo', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Automation Rate', value: '94%', icon: <Zap className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      'AI-generated content creation and optimization',
      'Multi-channel campaign orchestration',
      'Automated A/B testing and optimization',
      'Customer journey mapping and automation',
      'Real-time performance analytics',
      'Predictive audience segmentation'
    ],
    businessImpact: {
      description: 'Scale your marketing with AI that adapts and optimizes in real-time',
      stats: [
        { label: 'Campaign Performance', value: 312, color: '#10B981' },
        { label: 'Audience Growth', value: 187, color: '#6366F1' },
        { label: 'Engagement Rate', value: 245, color: '#8B5CF6' }
      ],
      chartData: {
        revenue: [
          { month: 'Jan', before: 28000, after: 56000 },
          { month: 'Feb', before: 32000, after: 68000 },
          { month: 'Mar', before: 29000, after: 74000 },
          { month: 'Apr', before: 35000, after: 89000 },
          { month: 'May', before: 38000, after: 98000 },
          { month: 'Jun', before: 42000, after: 115000 }
        ],
        leadSources: [
          { name: 'Social Media', value: 35, color: '#10B981' },
          { name: 'Email Marketing', value: 28, color: '#6366F1' },
          { name: 'Content Marketing', value: 24, color: '#8B5CF6' },
          { name: 'Paid Ads', value: 13, color: '#F59E0B' }
        ]
      }
    }
  },
  'customer-success': {
    title: 'Customer Success Engine',
    subtitle: 'Proactive retention and growth automation',
    description: 'AI-driven customer success platform that prevents churn, identifies upsell opportunities, and maximizes customer lifetime value.',
    videoUrl: '/demo-video-placeholder.mp4',
    metrics: [
      { label: 'Churn Reduction', value: '73%', icon: <Users className="w-5 h-5" />, color: 'emerald' },
      { label: 'Upsell Success', value: '+189%', icon: <TrendingUp className="w-5 h-5" />, color: 'blue' },
      { label: 'LTV Increase', value: '$35,500', icon: <DollarSign className="w-5 h-5" />, color: 'violet' },
      { label: 'Response Time', value: '2.3min', icon: <Clock className="w-5 h-5" />, color: 'amber' }
    ],
    features: [
      'Predictive churn analysis and prevention',
      'Automated customer health scoring',
      'Proactive support ticket resolution',
      'Upsell and cross-sell opportunity detection',
      'Customer satisfaction monitoring',
      'Automated onboarding and retention campaigns'
    ],
    businessImpact: {
      description: 'Turn customers into advocates with proactive AI-driven success management',
      stats: [
        { label: 'Customer Retention', value: 89, color: '#10B981' },
        { label: 'Revenue Growth', value: 167, color: '#6366F1' },
        { label: 'Satisfaction Score', value: 94, color: '#8B5CF6' }
      ],
      chartData: {
        revenue: [
          { month: 'Jan', before: 125000, after: 178000 },
          { month: 'Feb', before: 132000, after: 195000 },
          { month: 'Mar', before: 128000, after: 215000 },
          { month: 'Apr', before: 145000, after: 245000 },
          { month: 'May', before: 152000, after: 268000 },
          { month: 'Jun', before: 159000, after: 298000 }
        ],
        leadSources: [
          { name: 'Renewals', value: 45, color: '#10B981' },
          { name: 'Upsells', value: 32, color: '#6366F1' },
          { name: 'Cross-sells', value: 18, color: '#8B5CF6' },
          { name: 'Referrals', value: 5, color: '#F59E0B' }
        ]
      }
    }
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
      <div className="overflow-hidden p-0 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg border border-border/30 rounded-lg transition-all duration-300 hover:border-primary/40">
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
              className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg backdrop-blur-sm"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
          </motion.div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 p-2 bg-background/20 backdrop-blur-sm rounded-lg border border-border/30"
          >
            <BarChart3 className="w-5 h-5 text-primary" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 left-4 p-2 bg-background/20 backdrop-blur-sm rounded-lg border border-border/30"
          >
            <Zap className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const MetricCard = ({ metric }: { metric: { label: string; value: string; icon: React.ReactNode; color: string } }) => {
  const colorClasses = {
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    violet: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="p-6 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
            {metric.icon}
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const StickyNotesSection = ({ features }: { features: string[] }) => {
  const noteColors = [
    'bg-yellow-100/80 border-yellow-200/50 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800/30 dark:text-yellow-200',
    'bg-pink-100/80 border-pink-200/50 text-pink-900 dark:bg-pink-900/20 dark:border-pink-800/30 dark:text-pink-200',
    'bg-blue-100/80 border-blue-200/50 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-200',
    'bg-green-100/80 border-green-200/50 text-green-900 dark:bg-green-900/20 dark:border-green-800/30 dark:text-green-200',
    'bg-purple-100/80 border-purple-200/50 text-purple-900 dark:bg-purple-900/20 dark:border-purple-800/30 dark:text-purple-200',
    'bg-orange-100/80 border-orange-200/50 text-orange-900 dark:bg-orange-900/20 dark:border-orange-800/30 dark:text-orange-200'
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: Math.random() * 4 - 2 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.05, rotate: 0, z: 10 }}
          className={`p-4 rounded-lg border backdrop-blur-sm transform transition-all duration-200 ${noteColors[index % noteColors.length]}`}
          style={{ 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)',
            transform: `rotate(${Math.random() * 4 - 2}deg)`
          }}
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium leading-relaxed">{feature}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const BusinessImpactCharts = ({ data }: { 
  data: { 
    stats: Array<{ label: string; value: number; color: string }>; 
    chartData: { 
      revenue: Array<{ month: string; before: number; after: number }>; 
      leadSources: Array<{ name: string; value: number; color: string }> 
    } 
  } 
}) => {
  return (
    <div className="space-y-6">
      {/* Revenue Comparison Chart */}
      <div className="p-6 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
        <h4 className="text-lg font-semibold text-foreground mb-4">Revenue Impact Over Time</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.chartData.revenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === 'before' ? 'Before AI' : 'After AI']} />
              <Line type="monotone" dataKey="before" stroke="#94A3B8" strokeWidth={2} name="before" />
              <Line type="monotone" dataKey="after" stroke="#10B981" strokeWidth={3} name="after" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Stats */}
        <div className="p-6 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
          <h4 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h4>
          <div className="space-y-4">
            {data.stats.map((stat, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">+{stat.value}%</div>
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Distribution */}
        <div className="p-6 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
          <h4 className="text-lg font-semibold text-foreground mb-4">Source Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie 
                  data={data.chartData.leadSources} 
                  dataKey="value" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={60}
                  startAngle={90}
                  endAngle={450}
                >
                  {data.chartData.leadSources.map((entry, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.chartData.leadSources.map((source, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-xs text-muted-foreground">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InteractiveAutomationShowcase() {
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
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background Paths */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <BackgroundPaths title="" />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Interactive Showcase
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              AI Automations in Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our complete automation library. Each solution is ready to deploy and starts 
            delivering measurable results from day one.
          </p>
        </motion.div>

        {/* Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="p-2 backdrop-blur-xl bg-background/20 border border-border/30 rounded-lg max-w-4xl mx-auto shadow-lg">
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
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Side - Floating Video Player */}
            <div className="space-y-6">
              <FloatingVideoPlayer 
                isPlaying={isVideoPlaying}
                onPlayPause={() => setIsVideoPlaying(!isVideoPlaying)}
              />
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {currentAutomation.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <MetricCard metric={metric} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Automation Information */}
            <div className="space-y-6">
              {/* Header */}
              <div className="p-8 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
                <div className="space-y-4">
                  <Badge className="bg-primary/10 text-primary border-primary/30">
                    {automationCategories.find(cat => cat.id === activeCategory)?.label}
                  </Badge>
                  <h3 className="text-3xl font-bold text-foreground">{currentAutomation.title}</h3>
                  <p className="text-lg text-primary font-medium">{currentAutomation.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{currentAutomation.description}</p>
                </div>
              </div>

              {/* Expandable Features Section */}
              <div className="backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
                <button
                  onClick={() => toggleSection('features')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-lg font-semibold text-foreground">Core Features</span>
                  </div>
                  {expandedSection === 'features' ? 
                    <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSection === 'features' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <StickyNotesSection features={currentAutomation.features} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Expandable Business Impact Section */}
              <div className="backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg">
                <button
                  onClick={() => toggleSection('business')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span className="text-lg font-semibold text-foreground">Business Impact & Analytics</span>
                  </div>
                  {expandedSection === 'business' ? 
                    <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  }
                </button>
                
                <AnimatePresence>
                  {expandedSection === 'business' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        <p className="text-muted-foreground mb-6">{currentAutomation.businessImpact.description}</p>
                        <BusinessImpactCharts data={currentAutomation.businessImpact} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <div className="p-6 backdrop-blur-xl bg-background/10 border border-border/30 rounded-lg text-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Schedule Demo
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}