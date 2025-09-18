'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Zap, Phone } from 'lucide-react'

interface CompetitorPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function CompetitorPopup({ isOpen, onClose }: CompetitorPopupProps) {
  const competitorData = [
    { monthlySavings: 18500 },
    { monthlySavings: 12400 },
    { monthlySavings: 24700 },
    { monthlySavings: 31200 }
  ]

  const totalMonthlySavings = competitorData.reduce((sum, comp) => sum + comp.monthlySavings, 0)
  const annualAdvantage = Math.round(totalMonthlySavings * 12 / 1000)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="backdrop-blur-sm bg-card/90 border-red-500/30 rounded-2xl shadow-2xl border max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Card className="shadow-2xl border-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-orange-500/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">
                      ${totalMonthlySavings.toLocaleString()}
                    </div>
                    <div className="text-lg text-foreground">Combined Monthly Savings</div>
                    <div className="text-sm text-orange-400">by nearby competitors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">
                      {competitorData.length}
                    </div>
                    <div className="text-lg text-foreground">Competitors Using AutoFlow</div>
                    <div className="text-sm text-red-400">in your immediate area</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      ${annualAdvantage}K
                    </div>
                    <div className="text-lg text-foreground">Annual Advantage</div>
                    <div className="text-sm text-yellow-400">they&apos;re gaining over you</div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Every Day You Wait, They Get Further Ahead
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    While you&apos;re handling calls manually, they&apos;re capturing 30% more leads with instant response times. 
                    Their customers get faster service, better follow-ups, and they&apos;re building larger profit margins.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      onClick={onClose}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Competing Today
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                      onClick={onClose}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Emergency Setup Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}