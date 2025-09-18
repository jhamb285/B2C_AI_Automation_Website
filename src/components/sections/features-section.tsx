'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings,
  Zap,
  Clock,
  Users,
  CreditCard,
  Package,
  Globe,
  ChevronRight,
  CheckCircle
} from 'lucide-react'

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [activeTab, setActiveTab] = useState('solutions')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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

  const featureTabs = [
    {
      id: 'solutions',
      title: 'Core Solutions',
      icon: Zap,
      color: 'text-green-500',
      features: [
        {
          icon: Phone,
          title: 'AI Employee / Customer Service Rep',
          description: '24/7 AI receptionist that answers calls, qualifies leads, books appointments, and handles customer inquiries in your business voice.',
          details: [
            'Never miss a call with 24/7 availability',
            'Answers calls in your business voice and style',
            'Qualifies leads and assesses urgency automatically',
            'Books appointments in real-time with your calendar',
            'Handles overflow and after-hours calls seamlessly',
            'Transfers complex calls to humans when needed'
          ]
        },
        {
          icon: Zap,
          title: 'Complete Workflow Automation',
          description: 'End-to-end business automation from lead capture to payment collection, eliminating manual processes.',
          details: [
            'Automated lead processing and intelligent routing',
            'Smart estimate follow-ups and proposal tracking',
            'Recurring service reminders and maintenance scheduling',
            'Payment collection automation with multiple methods',
            'Invoice generation and accounts receivable management',
            'Job completion workflows and quality assurance'
          ]
        }
      ]
    },
    {
      id: 'communication',
      title: 'AI Communication',
      icon: MessageSquare,
      color: 'text-blue-500',
      features: [
        {
          icon: Phone,
          title: 'AI Answering & Dispatching',
          description: 'Never miss a call with 24/7 AI that handles customer inquiries, books appointments, and dispatches technicians.',
          details: [
            'Answers calls in your business voice and style',
            'Qualifies leads and assesses urgency',
            'Books appointments in real-time',
            'Dispatches appropriate technicians',
            'Handles overflow and after-hours calls',
            'Transfers complex calls to humans when needed'
          ]
        },
        {
          icon: MessageSquare,
          title: 'Multi-Channel Communication',
          description: 'Unified communication hub managing phone, email, SMS, and chat interactions.',
          details: [
            'Automated email responses and follow-ups',
            'SMS appointment reminders and updates',
            'Live chat integration for website visitors',
            'Social media message management',
            'Consistent messaging across all channels',
            'Customer preference tracking'
          ]
        }
      ]
    },
    {
      id: 'automation',
      title: 'Smart Automation',
      icon: Zap,
      color: 'text-green-500',
      features: [
        {
          icon: Calendar,
          title: 'Intelligent Scheduling',
          description: 'AI-powered scheduling that optimizes routes, reduces travel time, and maximizes daily appointments.',
          details: [
            'Route optimization for technicians',
            'Skill-based technician assignment',
            'Weather-aware scheduling adjustments',
            'Automatic rescheduling for cancellations',
            'Buffer time management',
            'Customer availability matching'
          ]
        },
        {
          icon: FileText,
          title: 'Document Automation',
          description: 'Automated generation and management of quotes, invoices, work orders, and contracts.',
          details: [
            'Auto-generated estimates and quotes',
            'Digital work order creation',
            'Automated invoice generation and sending',
            'Contract and agreement templates',
            'Photo and signature capture',
            'Document storage and retrieval'
          ]
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Business Intelligence',
      icon: BarChart3,
      color: 'text-purple-500',
      features: [
        {
          icon: BarChart3,
          title: 'Advanced Analytics Dashboard',
          description: 'Comprehensive business intelligence with real-time insights and performance tracking.',
          details: [
            'Real-time revenue and profit tracking',
            'Lead conversion and source analysis',
            'Technician performance metrics',
            'Customer satisfaction scores',
            'Seasonal trend analysis',
            'Predictive revenue forecasting'
          ]
        },
        {
          icon: Users,
          title: 'Customer Intelligence',
          description: 'Deep customer insights and behavioral analysis to improve service and retention.',
          details: [
            'Customer lifetime value analysis',
            'Service history and preferences',
            'Satisfaction and feedback tracking',
            'Churn prediction and prevention',
            'Upsell and cross-sell opportunities',
            'Customer segmentation and targeting'
          ]
        }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Settings,
      color: 'text-orange-500',
      features: [
        {
          icon: CreditCard,
          title: 'Payment Processing',
          description: 'Seamless payment integration with automated billing and collection.',
          details: [
            'Multiple payment gateway support',
            'Automated recurring billing',
            'Payment reminders and collections',
            'Credit card on file management',
            'Split payment handling',
            'Fraud detection and prevention'
          ]
        },
        {
          icon: Package,
          title: 'CRM & Tool Integration',
          description: 'Works with your existing CRM, accounting, and business tools.',
          details: [
            'Popular CRM system integration',
            'QuickBooks and accounting sync',
            'Google Calendar and Outlook',
            'Inventory management systems',
            'Marketing automation tools',
            'Custom API integrations'
          ]
        }
      ]
    }
  ]

  return (
    <section ref={ref} id="features" className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.04) 60%, transparent 100%)',
            filter: 'blur(90px)',
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
            Complete Solutions & Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Everything You Need to Automate
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Complete automation solutions covering every aspect of your home services business - 
            from AI customer service to advanced business intelligence and seamless integrations.
          </p>
        </motion.div>

        {/* Main Split Layout: Features Left, Performance Analysis Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Features Navigation & Content */}
          <div className="space-y-8">
            {/* Navigation Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-1.5 backdrop-blur-sm bg-card/20 border border-border rounded-lg shadow-lg">
                <div className="flex flex-wrap justify-center gap-1">
                  {featureTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`px-2.5 py-1.5 text-xs transition-all duration-200 ${
                        activeTab === tab.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      <span className="ml-1.5 hidden sm:inline">{tab.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {featureTabs.find(tab => tab.id === activeTab)?.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                  >
                    <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1.5">
                          {feature.details && feature.details.slice(0, 4).map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                              <span className="text-xs text-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Cost of Waiting Warning */}
            <Card className="backdrop-blur-sm bg-orange-500/5 border-orange-500/20 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-orange-600">The Cost of Waiting</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Every month you delay automation costs your business an average of <span className="font-semibold text-orange-500">$12,000 in lost revenue</span> and <span className="font-semibold text-red-500">47 missed opportunities</span>. While your competitors automate, you fall further behind.
                </p>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ChevronRight className="mr-2 h-5 w-5" />
                  Schedule Feature Demo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Traditional vs AI Agent Method Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Traditional Method vs AI Agent Method
              </h3>
              <p className="text-muted-foreground">
                Real data from businesses that made the switch
              </p>
            </div>

            {/* Comparison Table */}
            <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        <th className="text-left p-3 font-semibold text-xs">Metric</th>
                        <th className="text-center p-3 font-semibold text-xs text-red-600">Traditional</th>
                        <th className="text-center p-3 font-semibold text-xs text-green-600">AI Agent</th>
                        <th className="text-center p-3 font-semibold text-xs">Improvement</th>
                        <th className="text-center p-3 font-semibold text-xs">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                      >
                        <td className="p-3 font-medium text-foreground">Call Answer Rate</td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-red-600">73%</div>
                          <div className="text-xs text-muted-foreground">Business hours only</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">99%</div>
                          <div className="text-xs text-muted-foreground">24/7 availability</div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">+35.6%</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="font-semibold uppercase text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">HIGH</Badge>
                        </td>
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                      >
                        <td className="p-3 font-medium text-foreground">Response Time</td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-red-600">4.2 hours</div>
                          <div className="text-xs text-muted-foreground">Average callback</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">1.8 min</div>
                          <div className="text-xs text-muted-foreground">Instant response</div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">98% faster</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="font-semibold uppercase text-xs bg-red-500/10 text-red-500 border-red-500/20">CRITICAL</Badge>
                        </td>
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                      >
                        <td className="p-3 font-medium text-foreground">Lead Conversion</td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-red-600">18%</div>
                          <div className="text-xs text-muted-foreground">Manual follow-up</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">34%</div>
                          <div className="text-xs text-muted-foreground">AI-powered nurturing</div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">+88.9%</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="font-semibold uppercase text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">HIGH</Badge>
                        </td>
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                      >
                        <td className="p-3 font-medium text-foreground">Operational Costs</td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-red-600">$8,400/mo</div>
                          <div className="text-xs text-muted-foreground">Staff & overhead</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">$2,100/mo</div>
                          <div className="text-xs text-muted-foreground">AI automation</div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">75% less</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="font-semibold uppercase text-xs bg-red-500/10 text-red-500 border-red-500/20">CRITICAL</Badge>
                        </td>
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                        className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                      >
                        <td className="p-3 font-medium text-foreground">Customer Satisfaction</td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-red-600">7.2/10</div>
                          <div className="text-xs text-muted-foreground">Inconsistent</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">9.1/10</div>
                          <div className="text-xs text-muted-foreground">Consistent quality</div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">+26.4%</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="font-semibold uppercase text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">MEDIUM</Badge>
                        </td>
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                        className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                      >
                        <td className="p-3 font-medium text-foreground">Staff Productivity</td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-red-600">45 calls/day</div>
                          <div className="text-xs text-muted-foreground">Manual handling</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="font-semibold text-green-600">120+ calls/day</div>
                          <div className="text-xs text-muted-foreground">AI-assisted</div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">+166%</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="font-semibold uppercase text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">HIGH</Badge>
                        </td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Business Impact Summary */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { title: 'Revenue Growth', before: '$45K/mo', after: '$78K/mo', change: '+73%', color: 'text-green-500' },
                { title: 'Cost Reduction', before: '$8.4K/mo', after: '$2.1K/mo', change: '75%', color: 'text-blue-500' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 1.0 }}
                >
                  <Card className="backdrop-blur-sm bg-card/30 border-border shadow-md">
                    <CardContent className="p-4 text-center">
                      <div className={`text-lg font-bold ${item.color} mb-1`}>{item.change}</div>
                      <div className="text-xs font-medium text-foreground mb-2">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.before} → {item.after}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  )
}