'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  MapPin, 
  Calendar, 
  Clock, 
  Zap,
  Phone
} from 'lucide-react'

export default function CompetitorSavings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [showLogos, setShowLogos] = useState(false)

  const competitorData = [
    {
      id: 'nearby-hvac',
      name: 'ClimateCare Pro',
      industry: 'HVAC',
      location: 'Within 5 miles',
      size: 'Mid-size (15-25 employees)',
      monthlySavings: 18500,
      yearlyRevenue: 285000,
      improvements: {
        callCapture: '+23%',
        responseTime: '67% faster',
        bookingRate: '+41%',
        customerSatisfaction: '+38%'
      },
      timeUsing: '8 months',
      lastUpdate: '2 days ago',
      logo: '🌡️',
      blurAmount: showLogos ? 'blur-0' : 'blur-md'
    },
    {
      id: 'competitor-plumbing',
      name: 'AquaFix Solutions',
      industry: 'Plumbing', 
      location: 'Within 3 miles',
      size: 'Small (8-12 employees)',
      monthlySavings: 12400,
      yearlyRevenue: 195000,
      improvements: {
        callCapture: '+28%',
        responseTime: '58% faster', 
        bookingRate: '+35%',
        customerSatisfaction: '+42%'
      },
      timeUsing: '11 months',
      lastUpdate: '1 day ago',
      logo: '🔧',
      blurAmount: showLogos ? 'blur-0' : 'blur-md'
    },
    {
      id: 'electrical-competitor',
      name: 'PowerPro Electric',
      industry: 'Electrical',
      location: 'Within 7 miles',
      size: 'Large (25-40 employees)',
      monthlySavings: 24700,
      yearlyRevenue: 420000,
      improvements: {
        callCapture: '+31%',
        responseTime: '72% faster',
        bookingRate: '+45%',
        customerSatisfaction: '+35%'
      },
      timeUsing: '6 months',
      lastUpdate: '3 hours ago',
      logo: '⚡',
      blurAmount: showLogos ? 'blur-0' : 'blur-md'
    },
    {
      id: 'roofing-competitor',
      name: 'TopShield Roofing',
      industry: 'Roofing',
      location: 'Within 4 miles',
      size: 'Mid-size (12-20 employees)',
      monthlySavings: 31200,
      yearlyRevenue: 580000,
      improvements: {
        callCapture: '+19%',
        responseTime: '63% faster',
        bookingRate: '+52%',
        customerSatisfaction: '+44%'
      },
      timeUsing: '14 months',
      lastUpdate: '5 hours ago',
      logo: '🏠',
      blurAmount: showLogos ? 'blur-0' : 'blur-md'
    }
  ]

  const totalMonthlySavings = competitorData.reduce((sum, comp) => sum + comp.monthlySavings, 0)

  return (
    <section ref={ref} id="competitors" className="relative pt-12 pb-12">{/* Reduced padding */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/30">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Competitor Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Your Competitors Are Already Saving
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            See how nearby businesses in your industry are using AutoFlow AI to gain competitive advantages. 
            <span className="text-orange-400 font-semibold"> Don't get left behind.</span>
          </p>
        </motion.div>

        {/* Toggle Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <Button
            onClick={() => setShowLogos(!showLogos)}
            variant="outline"
            className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500"
          >
            {showLogos ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Company Names
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Reveal Company Names
              </>
            )}
          </Button>
        </motion.div>

        {/* Competitor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {competitorData.map((competitor, index) => (
            <motion.div
              key={competitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="backdrop-blur-sm bg-card/20 border-red-500/20 hover:border-red-500/40 transition-all duration-300 group shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`text-4xl ${competitor.blurAmount} transition-all duration-300`}>
                        {competitor.logo}
                      </div>
                      <div>
                        <CardTitle className={`text-lg font-bold ${competitor.blurAmount} transition-all duration-300`}>
                          {competitor.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{competitor.industry} • {competitor.size}</p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                      <MapPin className="mr-1 h-3 w-3" />
                      {competitor.location}
                    </Badge>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="text-2xl font-bold text-green-400">
                        ${competitor.monthlySavings.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Monthly Savings</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-400">
                        ${Math.round(competitor.yearlyRevenue / 1000)}K
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">Added Revenue</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Performance Improvements */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold">Performance Improvements</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(competitor.improvements).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className="font-bold text-orange-400 text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Info */}
                  <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Using for {competitor.timeUsing}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Updated {competitor.lastUpdate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}