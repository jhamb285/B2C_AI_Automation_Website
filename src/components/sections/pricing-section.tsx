'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  X, 
  Star, 
  Zap, 
  Crown, 
  Rocket,
  ArrowRight,
  Phone,
  MessageSquare,
  Calendar,
  BarChart3
} from 'lucide-react'

export default function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '$297',
      period: '/month',
      description: 'Perfect for small home service businesses getting started with automation',
      popular: false,
      features: [
        { name: 'AI Call Answering (100 calls/month)', included: true },
        { name: 'Basic Appointment Scheduling', included: true },
        { name: 'Email & SMS Automation', included: true },
        { name: 'Lead Capture & Processing', included: true },
        { name: 'Basic Analytics Dashboard', included: true },
        { name: 'Standard Integrations (3)', included: true },
        { name: 'Business Hours Support', included: true },
        { name: 'Advanced AI Features', included: false },
        { name: 'Custom Workflows', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Dedicated Account Manager', included: false }
      ],
      cta: 'Start Free Trial',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      icon: Star,
      price: '$597',
      period: '/month',
      description: 'Comprehensive automation for growing home service businesses',
      popular: true,
      features: [
        { name: 'AI Call Answering (500 calls/month)', included: true },
        { name: 'Advanced Scheduling & Routing', included: true },
        { name: 'Multi-Channel Communication', included: true },
        { name: 'Advanced Lead Processing', included: true },
        { name: 'Comprehensive Analytics', included: true },
        { name: 'All Integrations Available', included: true },
        { name: '24/7 Priority Support', included: true },
        { name: 'Advanced AI Features', included: true },
        { name: 'Custom Workflows (5)', included: true },
        { name: 'Revenue Optimization Tools', included: true },
        { name: 'Dedicated Account Manager', included: false }
      ],
      cta: 'Most Popular',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: '$1,197',
      period: '/month',
      description: 'Complete automation solution for large home service operations',
      popular: false,
      features: [
        { name: 'Unlimited AI Call Answering', included: true },
        { name: 'Enterprise Scheduling Suite', included: true },
        { name: 'Omnichannel Communication', included: true },
        { name: 'AI-Powered Lead Intelligence', included: true },
        { name: 'Advanced Business Intelligence', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'White-Glove Support', included: true },
        { name: 'Full AI Automation Suite', included: true },
        { name: 'Unlimited Custom Workflows', included: true },
        { name: 'Advanced Revenue Tools', included: true },
        { name: 'Dedicated Account Manager', included: true }
      ],
      cta: 'Contact Sales',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const addOns = [
    {
      icon: Phone,
      name: 'Additional Call Volume',
      description: 'Extra AI call handling capacity',
      price: '$0.50 per call'
    },
    {
      icon: MessageSquare,
      name: 'Advanced Communication',
      description: 'Social media management and live chat',
      price: '$97/month'
    },
    {
      icon: Calendar,
      name: 'Multi-Location Support',
      description: 'Manage multiple business locations',
      price: '$197/month'
    },
    {
      icon: BarChart3,
      name: 'Custom Analytics',
      description: 'Tailored reporting and dashboards',
      price: '$297/month'
    }
  ]

  return (
    <section ref={ref} id="pricing" className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full z-0"
          style={{ 
            background: 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.04) 60%, transparent 100%)',
            filter: 'blur(80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
              Pricing Plans
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect automation plan for your home services business. 
              All plans include setup, training, and ongoing support.
            </p>
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              <Card className={`backdrop-blur-sm bg-card/50 border-border shadow-lg h-full ${
                plan.popular ? 'border-primary' : ''
              }`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg z-10">
                    Most Popular
                  </div>
                )}

                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${plan.color} opacity-10 rounded-full -mr-16 -mt-16`} />
                
                <CardHeader className="relative z-10 text-center">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${plan.color} mb-4 mx-auto`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'variant-outline'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-ons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
            Optional Add-Ons
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="backdrop-blur-sm bg-card/30 border-border shadow-md text-center h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <addon.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{addon.name}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{addon.description}</p>
                    <div className="text-primary font-bold">{addon.price}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-foreground text-center mb-8">
                Frequently Asked Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Is there a setup fee?</h4>
                  <p className="text-muted-foreground">No setup fees. We include onboarding, training, and integration in all plans.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Can I change plans anytime?</h4>
                  <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time with no penalties.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">What integrations are included?</h4>
                  <p className="text-muted-foreground">We integrate with most CRM, scheduling, and accounting software. Custom integrations available.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h4>
                  <p className="text-muted-foreground">Yes, all plans include a 14-day free trial with full access to features.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg">
            <CardContent className="p-12">
              <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your free trial today and see how AutoFlow AI can automate your home services business 
                while working seamlessly with your existing systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}