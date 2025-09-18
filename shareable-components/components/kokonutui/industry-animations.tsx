'use client'

import { motion } from 'framer-motion'

// HVAC Animation - Realistic air duct system with airflow
export const HVACAnimation = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    {/* Air Duct System */}
    <div className="absolute inset-2 border-2 border-blue-400/60 rounded-lg">
      {/* Main air duct */}
      <div className="absolute top-1/2 left-0 w-full h-3 bg-blue-500/20 border border-blue-400/70 rounded transform -translate-y-1/2">
        {/* Airflow direction indicators */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 w-2 h-1 bg-blue-400/70 transform -translate-y-1/2"
            style={{
              left: `${10 + i * 20}%`,
              clipPath: 'polygon(0 0, 70% 50%, 0 100%)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Vertical air vents */}
      {[...Array(3)].map((_, i) => (
        <div key={`vent-${i}`} className="absolute w-1 bg-blue-400/60" style={{
          left: `${25 + i * 25}%`,
          top: '25%',
          height: '25%'
        }}>
          {/* Air coming out of vents */}
          <motion.div
            className="absolute -top-2 left-1/2 w-3 h-3 border border-blue-300/80 rounded-full transform -translate-x-1/2"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        </div>
      ))}
      
      {/* Temperature control indicator */}
      <motion.div
        className="absolute top-2 right-2 w-3 h-3 bg-blue-400/60 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  </div>
)

// Plumbing Animation - Realistic pipe system with water flow
export const PlumbingAnimation = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    {/* Main water pipes */}
    <div className="absolute inset-1">
      {/* Horizontal main pipe */}
      <div className="absolute top-1/3 left-0 w-full h-2 bg-cyan-600/70 border border-cyan-500/80 rounded-full">
        {/* Water flow animation inside pipe */}
        <motion.div
          className="absolute top-0 left-0 h-full w-4 bg-cyan-400/60 rounded-full"
          animate={{
            x: ['-16px', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      {/* Vertical pipes */}
      {[...Array(3)].map((_, i) => (
        <div key={`pipe-${i}`} 
          className="absolute w-2 bg-cyan-600/70 border-x border-cyan-500/80"
          style={{
            left: `${20 + i * 30}%`,
            top: '33%',
            height: '40%'
          }}
        >
          {/* Water flow in vertical pipes */}
          <motion.div
            className="absolute left-0 w-full h-3 bg-cyan-400/60"
            animate={{
              y: ['-12px', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
          />
        </div>
      ))}
      
      {/* Faucet/valve indicators */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`valve-${i}`}
          className="absolute w-3 h-3 bg-cyan-500/60 rounded-full border-2 border-cyan-400/80"
          style={{
            left: `${30 + i * 40}%`,
            top: '20%'
          }}
          animate={{
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Water pressure gauge */}
      <motion.div
        className="absolute top-2 right-2 w-4 h-4 border-2 border-cyan-400/60 rounded-full"
        animate={{
          borderColor: ["hsl(180 100% 40% / 0.6)", "hsl(180 100% 60% / 0.8)", "hsl(180 100% 40% / 0.6)"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Pressure needle */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1.5 h-0.5 bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2 origin-left"
          animate={{
            rotate: [-30, 30, -30],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Water leak indicator */}
      <motion.div
        className="absolute bottom-4 left-1/4 w-1 h-2 bg-cyan-400/80 rounded-full"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  </div>
)

// Pest Control Animation - Clear bugs and visible spray
export const PestControlAnimation = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    {/* Spray gun/wand */}
    <div className="absolute bottom-3 left-2 w-6 h-2 bg-green-600/80 rounded-full rotate-45 transform origin-left">
      {/* Spray nozzle */}
      <div className="absolute -top-0.5 right-0 w-1.5 h-3 bg-green-500/90 rounded-full" />
    </div>
    
    {/* Visible spray cone */}
    <motion.div
      className="absolute bottom-2 left-4 w-8 h-8 bg-green-400/70 rounded-full transform rotate-45 origin-bottom-left"
      animate={{
        scaleX: [0.5, 1.5, 0.8, 1.2],
        scaleY: [0.3, 1, 0.6, 0.9],
        opacity: [0.3, 0.7, 0.4, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Large visible bugs */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`bug-${i}`}
        className="absolute w-3 h-2 bg-black/80 rounded-full"
        style={{
          left: `${40 + (i % 3) * 20}%`,
          top: `${25 + Math.floor(i / 3) * 30}%`,
        }}
        animate={{
          x: [0, Math.random() * 15 - 7, Math.random() * 10 - 5, 0],
          y: [0, Math.random() * 10 - 5, Math.random() * 15 - 7, 0],
          scale: [1, 0.8, 0.5, 0.2],
          opacity: [1, 0.8, 0.4, 0.1],
          rotate: [0, 90, 180, 270],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeOut",
        }}
      >
        {/* Bug antennae */}
        <div className="absolute -top-0.5 left-1/4 w-0.5 h-1 bg-black/60" />
        <div className="absolute -top-0.5 right-1/4 w-0.5 h-1 bg-black/60" />
        {/* Bug legs */}
        <div className="absolute top-1/2 -left-0.5 w-1 h-0.5 bg-black/80" />
        <div className="absolute top-1/2 -right-0.5 w-1 h-0.5 bg-black/80" />
      </motion.div>
    ))}
    
    {/* Prominent spray particles */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={`spray-${i}`}
        className="absolute w-1.5 h-1.5 bg-green-400/80 rounded-full"
        style={{
          left: `${10 + (i % 2) * 5}%`,
          top: `${60 - (i % 3) * 10}%`,
        }}
        animate={{
          x: [0, 30 + (i % 4) * 15],
          y: [0, -15 + (i % 3) * 10],
          scale: [1, 0.6, 0.2],
          opacity: [0.8, 0.5, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeOut",
        }}
      />
    ))}
    
    {/* Spray effectiveness zones */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`zone-${i}`}
        className="absolute w-6 h-6 border border-green-400/60 rounded-full"
        style={{
          left: `${45 + i * 15}%`,
          top: `${30 + i * 15}%`,
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Dead bug indicator */}
    <motion.div
      className="absolute top-2 right-2 w-2 h-2 bg-red-500/70 rounded-full"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* X mark for dead bug */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-0.5 bg-white/80 rotate-45" />
        <div className="w-1 h-0.5 bg-white/80 -rotate-45 absolute" />
      </div>
    </motion.div>
  </div>
)

// Roofing Animation - Clean water sliding off roof
export const RoofingAnimation = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    {/* Roof structure */}
    <div className="absolute inset-1">
      {/* Main roof slope */}
      <div className="absolute top-1/4 left-0 w-full h-1 bg-orange-600/60 transform rotate-12 origin-left" />
      
      {/* Secondary roof line */}
      <div className="absolute top-1/3 left-1/4 w-3/4 h-0.5 bg-orange-500/80 transform rotate-12 origin-left" />
      
      {/* Water sliding down roof - main flow */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-0.5 bg-blue-400/70 transform rotate-12 origin-left"
        animate={{
          scaleX: [0, 1, 0.3, 1],
          opacity: [0.4, 0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Water streaming off roof edge */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`water-stream-${i}`}
          className="absolute w-0.5 h-6 bg-blue-400/60"
          style={{
            left: `${70 + i * 8}%`,
            top: '28%',
            transform: 'rotate(12deg)',
          }}
          animate={{
            scaleY: [0, 1, 1.2, 0],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Water droplets along roof edge */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`droplet-${i}`}
          className="absolute w-1 h-1 bg-blue-500/80 rounded-full"
          style={{
            left: `${20 + i * 12}%`,
            top: '32%',
          }}
          animate={{
            y: [0, 20, 35],
            scale: [1, 0.7, 0.3],
            opacity: [0.8, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeIn",
          }}
        />
      ))}
      
      {/* Simple shingle pattern */}
      <div className="absolute top-1/3 left-1/4 w-1/2 h-3 bg-orange-400/60 transform rotate-12 origin-left opacity-60">
        {/* Shingle lines */}
        <div className="absolute top-1 left-0 w-full h-0.5 bg-orange-500/70" />
        <div className="absolute top-2 left-1 w-3/4 h-0.5 bg-orange-500/70" />
      </div>
    </div>
  </div>
)

// Construction Animation - Growing skyline with multiple buildings
export const ConstructionAnimation = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    {/* Growing skyline with multiple buildings */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`building-${i}`}
        className="absolute bg-purple-400/70 border border-purple-500/80"
        style={{
          left: `${10 + i * 18}%`,
          bottom: '15%',
          width: `${12 + i * 2}px`,
        }}
        animate={{
          height: [0, `${20 + i * 8}px`, `${25 + i * 10}px`],
          opacity: [0, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
          repeatDelay: 1.5,
          ease: "easeOut",
        }}
      >
        {/* Building windows */}
        <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
          {[...Array(4)].map((_, windowIndex) => (
            <motion.div
              key={`window-${i}-${windowIndex}`}
              className="w-1 h-1 bg-yellow-400/60 rounded-sm"
              animate={{
                opacity: [0, 1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: windowIndex * 0.2 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    ))}
    
    {/* Construction crane */}
    <div className="absolute top-2 right-2 w-0.5 h-8 bg-purple-600/60">
      {/* Crane arm */}
      <div className="absolute top-1 -left-2 w-6 h-0.5 bg-purple-500/60 origin-left">
        {/* Hook and load */}
        <motion.div
          className="absolute right-0 top-0 w-1 h-1 bg-purple-400/80 rounded-full"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
    
    {/* Building foundation/ground */}
    <div className="absolute bottom-2 left-2 w-full h-1 bg-purple-600/70" />
    
    {/* Construction materials being lifted */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`material-${i}`}
        className="absolute w-2 h-1 bg-purple-300/80 border border-purple-400/60"
        style={{
          left: `${20 + i * 25}%`,
          bottom: '20%',
        }}
        animate={{
          y: [0, -15, -25, -15, 0],
          opacity: [0.7, 1, 0.8, 1, 0.7],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Construction workers indicator */}
    {[...Array(2)].map((_, i) => (
      <motion.div
        key={`worker-${i}`}
        className="absolute w-1.5 h-3 bg-purple-500/60 rounded-full"
        style={{
          left: `${25 + i * 40}%`,
          bottom: '15%',
        }}
        animate={{
          x: [0, 5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 1,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* City skyline indicator */}
    <motion.div
      className="absolute top-2 left-2 w-4 h-1 bg-purple-500/60 rounded"
      animate={{
        width: ['16px', '28px', '16px'],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
)

// General Repair Animation - Clear electrical and wood repair work
export const GeneralRepairAnimation = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    {/* Electrical wires being worked on */}
    <div className="absolute top-1/4 left-1/4 w-1/2 h-1">
      {/* Main electrical wire - black */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-black/80 rounded-full" />
      {/* Red wire */}
      <div className="absolute top-1 left-1/4 w-1/2 h-0.5 bg-red-500/80 rounded-full" />
      {/* Blue wire */}
      <div className="absolute top-2 left-1/2 w-1/3 h-0.5 bg-blue-500/80 rounded-full" />
    </div>
    
    {/* Electrical sparks from wire work */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`electrical-spark-${i}`}
        className="absolute w-1 h-1 bg-yellow-400/90 rounded-full"
        style={{
          left: `${45 + (i % 3) * 5}%`,
          top: `${22 + (i % 2) * 8}%`,
        }}
        animate={{
          scale: [0, 2, 0],
          opacity: [0, 1, 0],
          x: [0, Math.random() * 4 - 2],
          y: [0, Math.random() * 4 - 2],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeOut",
        }}
      />
    ))}
    
    {/* Wood planks being assembled */}
    <div className="absolute bottom-1/3 left-1/4 w-1/2 h-4">
      {/* Wood plank 1 */}
      <motion.div
        className="absolute w-8 h-1 bg-amber-600/70 rounded-sm"
        animate={{
          x: [0, 2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Wood plank 2 */}
      <motion.div
        className="absolute top-2 w-6 h-1 bg-amber-700/70 rounded-sm"
        animate={{
          x: [2, 0, 2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
    
    {/* Wood chips from cutting */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`wood-chip-${i}`}
        className="absolute w-0.5 h-0.5 bg-amber-500/80 rounded-full"
        style={{
          left: `${60 + i * 3}%`,
          top: `${55 + i * 2}%`,
        }}
        animate={{
          x: [0, 5, 0],
          y: [0, -3, 2],
          opacity: [0.8, 0.3, 0],
          scale: [1, 0.5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeOut",
        }}
      />
    ))}
    
    {/* Clear hammer tool */}
    <motion.div
      className="absolute top-1/2 right-1/4 w-3 h-1 bg-gray-600/80 rounded"
      animate={{
        rotate: [0, -30, 0],
        y: [0, 3, 0],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Hammer handle */}
      <div className="absolute -left-2 top-1/2 w-2 h-0.5 bg-amber-800/80 rounded transform -translate-y-1/2" />
    </motion.div>
    
    {/* Screwdriver working on electrical */}
    <motion.div
      className="absolute top-1/3 left-1/2 w-0.5 h-3 bg-yellow-600/80 rounded"
      animate={{
        rotate: [0, 360],
        y: [0, -1, 0],
      }}
      transition={{
        rotate: { duration: 0.8, repeat: Infinity, ease: "linear" },
        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Screwdriver handle */}
      <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-500/80 rounded transform -translate-x-1/2" />
    </motion.div>
    
    {/* Wrench on pipes/connections */}
    <motion.div
      className="absolute top-2/3 left-1/3 w-3 h-0.5 bg-gray-500/80 rounded"
      animate={{
        rotate: [0, 45, -45, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Toolbox with organized tools */}
    <div className="absolute bottom-2 left-2 w-6 h-3 bg-red-600/70 border border-red-500/60 rounded-sm">
      {/* Toolbox handle */}
      <div className="absolute -top-1 left-1/2 w-2 h-1 bg-red-500/80 rounded transform -translate-x-1/2" />
      {/* Tools in toolbox */}
      <div className="absolute top-1 left-1 w-0.5 h-1 bg-gray-400/80 rounded" />
      <div className="absolute top-1 left-2 w-0.5 h-1 bg-yellow-500/80 rounded" />
      <div className="absolute top-1 left-3 w-0.5 h-1 bg-blue-500/80 rounded" />
    </div>
    
    {/* Work completion indicator */}
    <motion.div
      className="absolute top-2 right-2 w-2 h-2 bg-green-500/70 rounded-full"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Checkmark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-0.5 bg-white/90 rotate-45 transform translate-x-0.5" />
        <div className="w-0.5 h-1 bg-white/90 -rotate-45 absolute" />
      </div>
    </motion.div>
  </div>
)

// Animation mapper
export const IndustryAnimationMap = {
  'HVAC': HVACAnimation,
  'Plumbing': PlumbingAnimation,
  'Pest Control': PestControlAnimation,
  'Roofing': RoofingAnimation,
  'Construction': ConstructionAnimation,
  'General Repair': GeneralRepairAnimation,
}