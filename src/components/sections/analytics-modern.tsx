'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Phone,
  MessageSquare,
  Calendar,
  Target,
  Zap,
  Eye
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function AnalyticsModern() {
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

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, leads: 320, conversion: 18 },
    { month: 'Feb', revenue: 52000, leads: 385, conversion: 22 },
    { month: 'Mar', revenue: 48000, leads: 410, conversion: 19 },
    { month: 'Apr', revenue: 67000, leads: 445, conversion: 28 },
    { month: 'May', revenue: 78000, leads: 520, conversion: 31 },
    { month: 'Jun', revenue: 89000, leads: 580, conversion: 34 }
  ]

  const leadSourceData = [
    { name: 'Organic Search', value: 35, color: '#3b82f6' },
    { name: 'Paid Ads', value: 28, color: '#10b981' },
    { name: 'Referrals', value: 22, color: '#f59e0b' },
    { name: 'Social Media', value: 15, color: '#8b5cf6' }
  ]

  const performanceMetrics = [
    { name: 'Call Volume', current: 1240, previous: 890, increase: 39 },
    { name: 'Response Time', current: 1.2, previous: 4.8, decrease: 75, unit: 'min' },
    { name: 'Booking Rate', current: 67, previous: 43, increase: 56, unit: '%' },
    { name: 'Customer Satisfaction', current: 9.2, previous: 7.1, increase: 30, unit: '/10' }
  ]

  const kpiCards = [
    {
      title: 'Monthly Revenue',
      value: '$89,000',
      change: '+73%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-500',
      description: 'vs last month'
    },
    {
      title: 'Total Leads',
      value: '580',
      change: '+45%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500',
      description: 'this month'
    },
    {
      title: 'Avg Response Time',
      value: '1.2 min',
      change: '-75%',
      trend: 'down',
      icon: Clock,
      color: 'text-purple-500',
      description: 'industry leading'
    },
    {
      title: 'Conversion Rate',
      value: '34%',
      change: '+89%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-500',
      description: 'above industry avg'
    }
  ]

  const automationStats = [
    { metric: 'Calls Handled', value: '1,240', automation: '94%' },
    { metric: 'Appointments Booked', value: '387', automation: '89%' },
    { metric: 'Follow-ups Sent', value: '2,156', automation: '100%' },
    { metric: 'Quotes Generated', value: '234', automation: '78%' }
  ]

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.06) 0%, rgba(34, 197, 94, 0.03) 70%, transparent 100%)',
            filter: 'blur(120px',
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
            <BarChart3 className="mr-2 h-4 w-4" />
            Live Analytics Dashboard
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Real-Time Business Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive analytics dashboard showing live performance data, automation metrics, 
            and predictive insights for your business.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                    </div>
                    <Badge className={`${kpi.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">{kpi.title}</h3>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Revenue Trend Chart */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Revenue Growth Trend
                </CardTitle>
                <CardDescription>Monthly revenue progression with AI automation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#revenueGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lead Sources Pie Chart */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Lead Sources Distribution
                </CardTitle>
                <CardDescription>Where your leads are coming from this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Metrics Comparison
              </CardTitle>
              <CardDescription>Before vs After AI automation implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="previous" fill="#f59e0b" name="Before AI" />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="After AI" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Automation Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Automation Coverage</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how much of your business operations are now automated
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="backdrop-blur-sm bg-card/30 border-border shadow-md text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground">{stat.metric}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">processed this month</div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {stat.automation} automated
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                <Eye className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">See Your Data Like This</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Get access to this comprehensive analytics dashboard with real-time insights 
                specific to your business. Track performance, identify opportunities, and optimize operations.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Live Demo Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}