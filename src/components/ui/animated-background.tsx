'use client'

import { motion } from 'framer-motion'

interface ParticleProps {
  delay: number
  duration: number
  x: string
  y: string
  size: number
}

const Particle = ({ delay, duration, x, y, size }: ParticleProps) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-sm"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 50, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
)

export const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 16,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-purple-950/10 to-slate-950/50" />
    </div>
  )
}