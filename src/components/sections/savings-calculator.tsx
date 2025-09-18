'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Target,
  Phone,
  Lightbulb,
  BarChart3,
  Info,
  PieChart
} from 'lucide-react'
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import CompetitorPopup from '@/components/competitor-popup'

interface SavingsCalculatorProps {
  onShowPopup?: () => void
}

export default function SavingsCalculator({ onShowPopup }: SavingsCalculatorProps = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const sectionInView = useInView(ref, { margin: "-20%" })

  // Popup trigger states
  const [hasInteractedWithSliders, setHasInteractedWithSliders] = useState(false)
  const [showCompetitorPopup, setShowCompetitorPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  // Input states
  const [inputs, setInputs] = useState({
    monthlyLeads: [500],
    avgOrderValue: [225], // Updated to pest control Los Angeles average (~$225)
    currentConversionRate: [15],
    monthlyMarketingBudget: [25000],
    avgCallHandlingTime: [8],
    followUpAttempts: [3],
    staffHourlyRate: [35],
    currentResponseTime: [45],
    businessType: 'pest-control'
  })

  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false)

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

  // Industry benchmarks
  const industryBenchmarks = {
    'pest-control': {
      name: 'Pest Control',
      speedBoost: 0.95,
      conversionBoost: 0.20,
      contactRateBoost: 0.30,
      avgDealSize: 171, // US avg for general pest initial
      seasonalMultiplier: 1.2
    },
    hvac: { 
      name: 'HVAC', 
      speedBoost: 0.92, 
      conversionBoost: 0.27, 
      contactRateBoost: 0.21,
      avgDealSize: 4500,
      seasonalMultiplier: 1.3 
    },
    plumbing: { 
      name: 'Plumbing', 
      speedBoost: 0.89, 
      conversionBoost: 0.24, 
      contactRateBoost: 0.19,
      avgDealSize: 2800,
      seasonalMultiplier: 1.1 
    },
    roofing: { 
      name: 'Roofing', 
      speedBoost: 0.94, 
      conversionBoost: 0.31, 
      contactRateBoost: 0.23,
      avgDealSize: 12500,
      seasonalMultiplier: 1.5 
    },
    electrical: { 
      name: 'Electrical', 
      speedBoost: 0.87, 
      conversionBoost: 0.22, 
      contactRateBoost: 0.18,
      avgDealSize: 3200,
      seasonalMultiplier: 1.0 
    }
  }

  // Calculate savings with advanced formulas
  const calculations = useMemo(() => {
    const benchmark = industryBenchmarks[inputs.businessType as keyof typeof industryBenchmarks]
    const monthlyLeads = inputs.monthlyLeads[0]
    const aov = inputs.avgOrderValue[0]
    const currentConversion = inputs.currentConversionRate[0] / 100
    const marketingBudget = inputs.monthlyMarketingBudget[0]
    const callTime = inputs.avgCallHandlingTime[0]
    const followUps = inputs.followUpAttempts[0]
    const hourlyRate = inputs.staffHourlyRate[0]

    // Current state calculations
    const currentCustomers = monthlyLeads * currentConversion
    const currentRevenue = currentCustomers * aov
    const currentCostPerLead = marketingBudget / monthlyLeads
    const currentStaffHours = (monthlyLeads * callTime / 60) + (monthlyLeads * followUps * 0.5)
    const currentStaffCosts = currentStaffHours * hourlyRate

    // Pest Control AI improvements using specific multipliers
    // AI Receptionist: Monthly Leads × 1.30 (captures missed/after-hours calls)
    const aiReceptionistLeadBoost = monthlyLeads * 1.30
    
    // Smart Follow-up: Conversion Rate × 1.20 (multi-touch sequences)
    const smartFollowupConversionBoost = Math.min(0.60, currentConversion * 1.20)
    
    // Lead Qualification: Revenue × 1.10 (better targeting + cross-sell)
    const leadQualificationMultiplier = 1.10
    
    // Smart Scheduling: Staff Admin Hours × 0.70 (≈30% efficiency gain)  
    const schedulingEfficiency = 0.70
    
    // Calculate new customers and revenue properly
    const newCustomers = aiReceptionistLeadBoost * smartFollowupConversionBoost
    const newRevenue = newCustomers * aov * leadQualificationMultiplier
    
    // Time savings calculations with 30% efficiency gain
    const newStaffHours = (aiReceptionistLeadBoost * callTime / 60 + aiReceptionistLeadBoost * followUps * 0.5) * schedulingEfficiency
    const newStaffCosts = newStaffHours * hourlyRate
    
    // Marketing efficiency improvements - better targeting
    const improvedCostPerLead = currentCostPerLead * 0.85 // 15% improvement
    const marketingSavings = (currentCostPerLead - improvedCostPerLead) * aiReceptionistLeadBoost

    // Calculate individual automation savings with pest control specific impacts
    const baseRevenue = monthlyLeads * aov * currentConversion
    const aiReceptionistLeadIncrease = aiReceptionistLeadBoost - monthlyLeads
    const followupConversionIncrease = Math.max(0, smartFollowupConversionBoost - currentConversion)
    const staffSavingsFromEfficiency = Math.max(0, currentStaffCosts - newStaffCosts)
    
    const automationSavings = {
      aiReceptionist: {
        name: 'AI Receptionist',
        // 30% more leads captured * revenue impact
        monthlySaving: Math.max(100, aiReceptionistLeadIncrease * aov * currentConversion),
        description: '24/7 call handling, no missed leads',
        roi: '20-40%'
      },
      smartFollowUp: {
        name: 'Smart Follow-up',
        // 20% conversion improvement impact on existing leads
        monthlySaving: Math.max(50, monthlyLeads * aov * followupConversionIncrease),
        description: 'Automated multi-channel nurturing',
        roi: '20-30%'
      },
      leadQualification: {
        name: 'Lead Qualification',
        // 10% revenue improvement from better targeting
        monthlySaving: Math.max(25, newRevenue * 0.05), // 5% of new revenue from qualification
        description: 'Better lead scoring and routing',
        roi: '10-15%'
      },
      schedulingAutomation: {
        name: 'Smart Scheduling',
        // 30% efficiency gain in staff time
        monthlySaving: Math.max(50, staffSavingsFromEfficiency),
        description: 'Automated appointment booking',
        roi: '10-20%'
      }
    }

    const totalMonthlySavings = Object.values(automationSavings).reduce((sum, auto) => sum + auto.monthlySaving, 0)
    const revenueIncrease = newRevenue - currentRevenue
    const totalMonthlyImpact = totalMonthlySavings + revenueIncrease
    const annualImpact = totalMonthlyImpact * 12
    const paybackPeriod = 8500 / totalMonthlyImpact // Assuming $8500 setup cost

    return {
      current: {
        customers: Math.round(currentCustomers),
        revenue: currentRevenue,
        costPerLead: currentCostPerLead,
        staffHours: Math.round(currentStaffHours),
        staffCosts: currentStaffCosts
      },
      improved: {
        customers: Math.round(newCustomers),
        revenue: newRevenue,
        costPerLead: improvedCostPerLead,
        staffHours: Math.round(newStaffHours),
        staffCosts: newStaffCosts
      },
      savings: {
        monthly: totalMonthlySavings,
        annual: totalMonthlySavings * 12,
        revenueIncrease: revenueIncrease,
        totalImpact: totalMonthlyImpact,
        annualImpact: annualImpact,
        paybackPeriod: paybackPeriod,
        roi: (annualImpact / 8500) * 100
      },
      automations: automationSavings,
      benchmark
    }
  }, [inputs])

  const updateInput = useCallback((key: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }))
    // Mark that user has interacted with sliders
    if (!hasInteractedWithSliders) {
      setHasInteractedWithSliders(true)
    }
  }, [hasInteractedWithSliders])

  // Chart data - memoized to ensure new references on data change
  const savingsBreakdownData = useMemo(() => {
    return Object.entries(calculations.automations).map(([key, automation]) => ({
      name: automation.name,
      value: Math.round(automation.monthlySaving),
      color: ['#4F46E5', '#059669', '#D97706', '#7C3AED'][Object.keys(calculations.automations).indexOf(key)]
    }))
  }, [calculations.automations])

  const comparisonData = useMemo(() => {
    const data = [
      {
        category: 'Monthly Revenue',
        current: Math.round(calculations.current.revenue),
        improved: Math.round(calculations.improved.revenue),
        improvement: Math.round(calculations.savings.revenueIncrease)
      },
      {
        category: 'Staff Costs',
        current: Math.round(calculations.current.staffCosts),
        improved: Math.round(calculations.improved.staffCosts),
        improvement: Math.round(calculations.current.staffCosts - calculations.improved.staffCosts)
      },
      {
        category: 'Lead Conversion',
        current: calculations.current.customers,
        improved: calculations.improved.customers,
        improvement: calculations.improved.customers - calculations.current.customers
      }
    ]
    return data
  }, [calculations.current, calculations.improved, calculations.savings])

  const COLORS = ['#4F46E5', '#059669', '#D97706', '#7C3AED']

  // Effect to trigger popup when user scrolls away after interacting
  useEffect(() => {
    if (hasInteractedWithSliders && !sectionInView && !hasShownPopup) {
      const timer = setTimeout(() => {
        setShowCompetitorPopup(true)
        setHasShownPopup(true)
      }, 500) // Small delay to ensure smooth scrolling
      
      return () => clearTimeout(timer)
    }
  }, [hasInteractedWithSliders, sectionInView, hasShownPopup])

  return (
    <section ref={ref} id="calculator" className="relative pt-8 pb-8">{/* More compact padding */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-4">
          <Badge className="mb-2 bg-primary/10 text-primary border-primary/30">
            <Calculator className="mr-2 h-4 w-4" />
            ROI Savings Calculator
          </Badge>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              Calculate Your Savings
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get instant ROI calculations based on your specific metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Input Controls */}
          <motion.div variants={itemVariants} className="xl:col-span-1">
            <Card className="sticky top-8 backdrop-blur-sm bg-card/50 border-border shadow-lg">
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4" />
                  Your Business Metrics
                </CardTitle>
                <CardDescription className="text-sm">Adjust the sliders to match your current business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-3">
                {/* Business Type */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Industry Type</Label>
                  <Select value={inputs.businessType} onValueChange={(value) => updateInput('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(industryBenchmarks).map(([key, industry]) => (
                        <SelectItem key={key} value={key}>{industry.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Monthly Leads */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Monthly Leads</Label>
                    <Badge variant="outline" className="font-mono text-xs">{inputs.monthlyLeads[0]}</Badge>
                  </div>
                  <Slider
                    value={inputs.monthlyLeads}
                    onValueChange={(value) => updateInput('monthlyLeads', value)}
                    max={2000}
                    min={50}
                    step={25}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">Range: 50 - 2,000 leads/month</div>
                </div>

                {/* Average Order Value */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Average Order Value</Label>
                    <Badge variant="outline" className="font-mono text-xs">${inputs.avgOrderValue[0]}</Badge>
                  </div>
                  <Slider
                    value={inputs.avgOrderValue}
                    onValueChange={(value) => updateInput('avgOrderValue', value)}
                    max={600}
                    min={150}
                    step={25}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    Range: $150 - $600 | US avg: $171 • LA avg: $225 • NYC avg: $470
                  </div>
                </div>

                {/* Current Conversion Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Current Conversion Rate</Label>
                    <Badge variant="outline" className="font-mono">{inputs.currentConversionRate[0]}%</Badge>
                  </div>
                  <Slider
                    value={inputs.currentConversionRate}
                    onValueChange={(value) => updateInput('currentConversionRate', value)}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">Range: 5% - 50%</div>
                </div>

                {/* Marketing Budget */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Monthly Marketing Budget</Label>
                    <Badge variant="outline" className="font-mono">${inputs.monthlyMarketingBudget[0].toLocaleString()}</Badge>
                  </div>
                  <Slider
                    value={inputs.monthlyMarketingBudget}
                    onValueChange={(value) => updateInput('monthlyMarketingBudget', value)}
                    max={100000}
                    min={5000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">Range: $5,000 - $100,000</div>
                </div>

                {/* Staff Hourly Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Staff Hourly Rate</Label>
                    <Badge variant="outline" className="font-mono">${inputs.staffHourlyRate[0]}</Badge>
                  </div>
                  <Slider
                    value={inputs.staffHourlyRate}
                    onValueChange={(value) => updateInput('staffHourlyRate', value)}
                    max={100}
                    min={15}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">Range: $15 - $100/hour</div>
                </div>

                <Button 
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  variant="outline" 
                  className="w-full"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  {showDetailedBreakdown ? 'Hide' : 'Show'} Detailed Breakdown
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Dashboard */}
          <motion.div variants={itemVariants} className="xl:col-span-2 space-y-4">
            {/* Key Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg bg-gradient-to-br from-green-900/10 to-emerald-900/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400 text-base">
                    <DollarSign className="h-5 w-5" />
                    Monthly Savings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
                    ${Math.round(calculations.savings.monthly).toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-500 mb-3">
                    +${Math.round(calculations.savings.revenueIncrease).toLocaleString()} revenue increase
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    ${Math.round(calculations.savings.annualImpact).toLocaleString()} annual impact
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg bg-gradient-to-br from-blue-900/10 to-cyan-900/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-base">
                    <Clock className="h-5 w-5" />
                    ROI Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
                    {Math.round(calculations.savings.roi)}%
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500 mb-3">
                    Annual return on investment
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Target className="h-3 w-3" />
                    {calculations.savings.paybackPeriod.toFixed(1)} months payback period
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Charts */}
            <Tabs defaultValue="breakdown" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="breakdown">Savings Breakdown</TabsTrigger>
                <TabsTrigger value="comparison">Before vs After</TabsTrigger>
                <TabsTrigger value="timeline">Growth Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="breakdown">
                <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
                  <CardHeader>
                    <CardTitle>Monthly Savings by Automation</CardTitle>
                    <CardDescription>See how each AutoFlow AI feature contributes to your savings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsPie>
                        <Pie
                          data={savingsBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          isAnimationActive={false}
                        >
                          {savingsBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </RechartsPie>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison">
                <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Detailed Automation Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border bg-muted/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">AI Receptionist</h4>
                          <Badge>+20-40% ROI</Badge>
                        </div>
                        <div className="text-xl font-bold text-primary mb-2">$4K-5K/mo</div>
                        <p className="text-sm text-muted-foreground">Never miss a high‑intent call again. AI answers, triages and texts back instantly.</p>
                      </div>
                      <div className="p-3 rounded-lg border bg-muted/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Smart Follow-up</h4>
                          <Badge>+20-30% ROI</Badge>
                        </div>
                        <div className="text-xl font-bold text-primary mb-2">$1.2K-2K/mo</div>
                        <p className="text-sm text-muted-foreground">Automated, multi‑channel follow‑ups (SMS + email) that keep homeowners engaged until they book.</p>
                      </div>
                      <div className="p-3 rounded-lg border bg-muted/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Lead Qualification</h4>
                          <Badge>+10-15% ROI</Badge>
                        </div>
                        <div className="text-xl font-bold text-primary mb-2">$500-1K/mo</div>
                        <p className="text-sm text-muted-foreground">Score, route, and enrich leads automatically so sales works the hottest opportunities first.</p>
                      </div>
                      <div className="p-3 rounded-lg border bg-muted/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Smart Scheduling</h4>
                          <Badge>+10-20% ROI</Badge>
                        </div>
                        <div className="text-xl font-bold text-primary mb-2">$1.5K-3K/mo</div>
                        <p className="text-sm text-muted-foreground">Fills calendars automatically and slashes no‑shows with confirmations and reminders.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline">
                <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
                  <CardHeader>
                    <CardTitle>Projected 12-Month Growth</CardTitle>
                    <CardDescription>Your business growth trajectory with AutoFlow AI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-amber-900/20">
                        <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-2">Month 1-3</div>
                        <div className="text-lg font-semibold mb-2">Setup & Optimization</div>
                        <div className="text-sm text-muted-foreground">Ramp to ~50-70% of projected impact</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-green-900/20">
                        <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Month 4-8</div>
                        <div className="text-lg font-semibold mb-2">Full Implementation</div>
                        <div className="text-sm text-muted-foreground">Reach ~100% of projected impact</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-blue-900/20">
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">Month 9-12</div>
                        <div className="text-lg font-semibold mb-2">Scaling & Growth</div>
                        <div className="text-sm text-muted-foreground">Continuous optimization (+5-15% incremental)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

          </motion.div>
        </div>
      </motion.div>
      
      {/* Competitor Popup */}
      <CompetitorPopup 
        isOpen={showCompetitorPopup} 
        onClose={() => setShowCompetitorPopup(false)} 
      />
    </section>
  )
}