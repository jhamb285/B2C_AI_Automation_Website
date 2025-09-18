'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Phone, 
  CheckCircle, 
  X, 
  BarChart3,
  Clock,
  DollarSign,
  Users,
  AlertTriangle
} from 'lucide-react'

export default function ComparisonAnalytics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Traditional vs AI Automation Comparison Data
  const comparisonMetrics = [
    {
      metric: 'Call Answer Rate',
      traditional: { value: '73%', description: 'During business hours only' },
      automated: { value: '99%', description: '24/7 availability' },
      improvement: '+35.6%',
      impact: 'high'
    },
    {
      metric: 'Response Time',
      traditional: { value: '4.2 hours', description: 'Average callback time' },
      automated: { value: '1.8 minutes', description: 'Instant AI response' },
      improvement: '98.3% faster',
      impact: 'critical'
    },
    {
      metric: 'Lead Conversion Rate',
      traditional: { value: '18%', description: 'Manual follow-up process' },
      automated: { value: '34%', description: 'AI-powered nurturing' },
      improvement: '+88.9%',
      impact: 'high'
    },
    {
      metric: 'Customer Satisfaction',
      traditional: { value: '7.2/10', description: 'Inconsistent service' },
      automated: { value: '9.1/10', description: 'Consistent AI quality' },
      improvement: '+26.4%',
      impact: 'medium'
    },
    {
      metric: 'Operational Costs',
      traditional: { value: '$8,400/mo', description: 'Staff and overhead' },
      automated: { value: '$2,100/mo', description: 'AI automation costs' },
      improvement: '75% reduction',
      impact: 'critical'
    },
    {
      metric: 'Staff Productivity',
      traditional: { value: '45 calls/day', description: 'Manual handling' },
      automated: { value: '120+ calls/day', description: 'AI-assisted workflow' },
      improvement: '+166.7%',
      impact: 'high'
    }
  ]

  const businessImpacts = [
    {
      title: 'Revenue Growth',
      before: '$45,000/month',
      after: '$78,000/month',
      change: '+73%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Customer Retention',
      before: '67% annual',
      after: '89% annual',
      change: '+33%',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Operating Efficiency',
      before: '23% utilization',
      after: '78% utilization',
      change: '+239%',
      icon: BarChart3,
      color: 'text-purple-500'
    },
    {
      title: 'Response Speed',
      before: '4.2 hours avg',
      after: '2 minutes avg',
      change: '99% faster',
      icon: Clock,
      color: 'text-orange-500'
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    }
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.12, 1]
          }}
          transition={{ 
            duration: 28, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.08) 0%, rgba(168, 85, 247, 0.04) 70%, transparent 100%)',
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
            Performance Analysis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Traditional vs AI Automation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            See the dramatic difference AI automation makes across every key business metric. 
            Real data from businesses that made the switch.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">Performance Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison of traditional operations vs AI automation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-semibold">Metric</th>
                      <th className="text-center p-4 font-semibold">Traditional Method</th>
                      <th className="text-center p-4 font-semibold">AI Automation</th>
                      <th className="text-center p-4 font-semibold">Improvement</th>
                      <th className="text-center p-4 font-semibold">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((item, index) => (
                      <motion.tr
                        key={index}
                        variants={itemVariants}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-4 font-medium">{item.metric}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <X className="h-4 w-4 text-red-500" />
                            <div>
                              <div className="font-semibold text-muted-foreground">{item.traditional.value}</div>
                              <div className="text-xs text-muted-foreground">{item.traditional.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <div>
                              <div className="font-semibold text-foreground">{item.automated.value}</div>
                              <div className="text-xs text-muted-foreground">{item.automated.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                            {item.improvement}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <Badge className={getImpactColor(item.impact)}>
                            {item.impact}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Impact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Real Business Impact</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These aren't just numbers – they represent real transformation in daily operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessImpacts.map((impact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg text-center h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <impact.icon className={`h-6 w-6 ${impact.color}`} />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">{impact.title}</h4>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Before:</span>
                        <span className="font-medium text-red-400">{impact.before}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">After:</span>
                        <span className="font-medium text-green-400">{impact.after}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-bold">
                      {impact.change}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Warning Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="backdrop-blur-sm bg-card/20 border-orange-500/20 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-400 mr-3" />
                <h3 className="text-2xl font-bold text-foreground">The Cost of Waiting</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Every month you delay automation costs your business an average of <span className="font-bold text-orange-400">$12,000 in lost revenue</span> and <span className="font-bold text-red-400">47 missed opportunities</span>. While your competitors automate, you fall further behind.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-400">$144K</div>
                  <div className="text-sm text-muted-foreground">Annual revenue loss</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">564</div>
                  <div className="text-sm text-muted-foreground">Missed leads per year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">92%</div>
                  <div className="text-sm text-muted-foreground">Competitors already automated</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}