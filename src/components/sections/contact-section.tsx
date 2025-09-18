'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Zap,
  Users,
  ArrowRight,
  Star,
  Upload,
  FileText,
  X
} from 'lucide-react'

// Form state type
interface ContactForm {
  name: string
  email: string
  phone: string
  company: string
  industry: string
  message: string
  uploadedFile: File | null
}

const industries = [
  'HVAC & Heating',
  'Plumbing Services', 
  'Pest Control',
  'Roofing & Construction',
  'Electrical Services',
  'Landscaping & Lawn Care',
  'Cleaning Services',
  'Auto Repair',
  'Other Service Business'
]

const benefits = [
  { icon: Zap, text: 'Get started in 24 hours', color: 'text-orange-500' },
  { icon: Users, text: 'Dedicated success manager', color: 'text-blue-500' },
  { icon: Star, text: 'Custom automation setup', color: 'text-green-500' }
]

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: '',
    uploadedFile: null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: keyof ContactForm, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB')
      return
    }
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file')
      return
    }
    
    setFormData(prev => ({ ...prev, uploadedFile: file }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const removeFile = () => {
    setFormData(prev => ({ ...prev, uploadedFile: null }))
  }

  // Contact method handlers
  const handlePhoneContact = () => {
    if (formData.phone) {
      // Open WhatsApp with pre-filled message
      const message = encodeURIComponent(`Hi! I'm interested in AI automation for my business (${formData.company}). Can we discuss?`)
      window.open(`https://wa.me/${formData.phone.replace(/\D/g, '')}?text=${message}`, '_blank')
    } else {
      // Show phone number
      window.open('tel:+15551234567', '_self')
    }
  }

  const handleEmailContact = () => {
    const subject = encodeURIComponent('AI Automation Inquiry')
    const body = encodeURIComponent(`Hi,\n\nI'm interested in AI automation for my business.\n\nCompany: ${formData.company}\nIndustry: ${formData.industry}\n\nBest regards,\n${formData.name}`)
    window.open(`mailto:hello@aiauto.com?subject=${subject}&body=${body}`, '_self')
  }

  const handleMeetingContact = () => {
    // Open Calendly or similar booking link
    window.open('https://calendly.com/your-calendar-link', '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would integrate with your backend API
    // The API would then trigger n8n automation to:
    // 1. Add to Google Sheets
    // 2. Send confirmation email via Gmail
    // 3. Create calendar event if meeting requested
    // 4. Send notifications to your team
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const isFormValid = formData.name && formData.email && formData.company

  if (isSubmitted) {
    return (
      <section className="relative pt-12 pb-12">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="w-24 h-24 bg-green-500/20 border-4 border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We've received your information and will be in touch within 24 hours. 
              {formData.uploadedFile && ' Thanks for sharing your business details - this will help us prepare a more targeted consultation.'}
            </p>
            
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground">What happens next?</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <span>Our team reviews your business needs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <span>We prepare a custom automation strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <span>Schedule a demo tailored to your industry</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative pt-12 pb-12">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-5 gap-8 items-start relative">
        {/* Vertical Dividing Line */}
        <div className="hidden lg:block absolute left-[40%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">Get Started Today</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Ready to Transform
              <span className="text-orange-500/80"> Your Business?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join hundreds of service businesses that have automated their operations 
              and increased revenue by 40% on average. Get a personalized demo and see 
              how AI can work for your specific industry.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg bg-${benefit.color.split('-')[1]}-500/10 border border-${benefit.color.split('-')[1]}-500/20`}>
                  <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                </div>
                <span className="text-foreground font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Direct Contact Section */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] via-transparent to-blue-500/[0.02] pointer-events-none" />
            
            <div className="relative">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Prefer to Connect Directly?</h3>
                <p className="text-muted-foreground text-sm">Choose your preferred method to get in touch instantly.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePhoneContact}
                  className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center hover:border-blue-500/40 hover:bg-blue-500/15 transition-all group"
                >
                  <Phone className="w-6 h-6 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">Call/WhatsApp</div>
                  <div className="text-xs text-muted-foreground">Instant support</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmailContact}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center hover:border-green-500/40 hover:bg-green-500/15 transition-all group"
                >
                  <Mail className="w-6 h-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">Send Email</div>
                  <div className="text-xs text-muted-foreground">Quick inquiry</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMeetingContact}
                  className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center hover:border-orange-500/40 hover:bg-orange-500/15 transition-all group"
                >
                  <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">Book Demo</div>
                  <div className="text-xs text-muted-foreground">15-min call</div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-card border border-border rounded-3xl p-6 shadow-lg relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-orange-500/[0.02] pointer-events-none" />
          
          <div className="relative">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Get Your Free Consultation</h3>
              <p className="text-muted-foreground">Share your business details and we'll create a custom automation strategy.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Smith"
                    required
                    className="bg-background/80 border-border focus:border-primary h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@company.com"
                    required
                    className="bg-background/80 border-border focus:border-primary h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-background/80 border-border focus:border-primary h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full h-11 px-3 bg-background/80 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Company Name - Full Width */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Company Name *</label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="ABC Services Inc."
                  required
                  className="bg-background/80 border-border focus:border-primary h-11"
                />
              </div>

              {/* Message and File Upload Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    What's your biggest challenge? <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="e.g., Too many manual tasks, losing leads, poor follow-up..."
                    className="bg-background/80 border-border focus:border-primary min-h-[100px] resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Business Details <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-4 transition-all min-h-[100px] ${
                      dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-border/80'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.uploadedFile ? (
                      <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-6 h-6 text-primary" />
                          <div>
                            <div className="font-medium text-sm text-foreground">{formData.uploadedFile.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {(formData.uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={removeFile}
                          className="p-1 rounded-full hover:bg-red-500/10 text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="text-center flex flex-col justify-center h-full">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <div className="text-sm font-medium text-foreground mb-1">
                          Drop files here
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          PDF, DOC, DOCX, TXT
                        </div>
                        <input
                          type="file"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded text-xs text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>


              {/* Submit Button */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold py-4 h-14 rounded-xl flex items-center justify-center gap-2 group shadow-lg shadow-primary/25"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Consultation</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                By submitting, you agree to receive communications from us.<br />
                We respect your privacy and will never spam you.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}