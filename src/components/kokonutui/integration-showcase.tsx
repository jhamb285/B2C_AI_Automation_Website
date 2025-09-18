"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Database, 
  Mail, 
  Calendar, 
  Users, 
  Zap,
  CheckCircle,
  Loader2,
  Webhook,
  CloudCog
} from "lucide-react";

const integrations = [
  { 
    icon: Database, 
    name: "CRM Systems", 
    color: "hsl(var(--primary))", 
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    status: "connected",
    services: ["Salesforce", "HubSpot", "Pipedrive"]
  },
  { 
    icon: Mail, 
    name: "Email Platforms", 
    color: "hsl(var(--destructive))", 
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    status: "connecting",
    services: ["Gmail", "Outlook", "Mailchimp"]
  },
  { 
    icon: Calendar, 
    name: "Calendar Tools", 
    color: "hsl(var(--orange-500))", 
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    status: "connected",
    services: ["Google Cal", "Outlook", "Calendly"]
  },
  { 
    icon: Users, 
    name: "Communication", 
    color: "hsl(var(--green-500))", 
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    status: "connected",
    services: ["Slack", "Teams", "Discord"]
  },
  { 
    icon: CloudCog, 
    name: "Automation", 
    color: "hsl(var(--blue-500))", 
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    status: "connected",
    services: ["Zapier", "Make", "N8N"]
  },
  { 
    icon: Webhook, 
    name: "APIs & Webhooks", 
    color: "hsl(var(--purple-500))", 
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    status: "connecting",
    services: ["REST APIs", "GraphQL", "Webhooks"]
  }
];

export default function IntegrationShowcase() {
  const [activeIntegration, setActiveIntegration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIntegration(prev => (prev + 1) % integrations.length);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 800);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="w-full h-full relative overflow-hidden">{/* Removed background */}

      {/* Main Integration Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Central Hub */}
          <motion.div
            className="relative w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"
            animate={{ 
              scale: isProcessing ? [1, 1.1, 1] : 1,
              borderColor: isProcessing ? 
                ['hsl(var(--primary))', 'hsl(var(--primary) / 0.3)', 'hsl(var(--primary))'] : 
                'hsl(var(--primary))'
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/10"
              animate={{
                scale: isProcessing ? [1, 1.4, 1] : 1,
                opacity: isProcessing ? [0.4, 0.1, 0.4] : 0.4
              }}
              transition={{ duration: 0.8 }}
            />
            {isProcessing ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Zap className="w-5 h-5 text-primary" />
            )}
          </motion.div>

          {/* Integration Nodes */}
          {integrations.map((integration, index) => {
            const angle = (index * 360) / integrations.length;
            const radius = 70;
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
            const isActive = activeIntegration === index;
            const Icon = integration.icon;

            return (
              <motion.div
                key={integration.name}
                className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-sm ${
                  isActive 
                    ? `${integration.bgColor} ${integration.borderColor} shadow-lg` 
                    : 'bg-card/50 border-border hover:border-muted-foreground'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  y: isActive ? [0, -4, 0] : 0
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Icon 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                
                {/* Status Indicator */}
                <div className="absolute -top-1 -right-1">
                  {integration.status === 'connected' ? (
                    <CheckCircle className="w-3 h-3 text-green-500 bg-background rounded-full" />
                  ) : (
                    <motion.div
                      className="w-3 h-3 rounded-full bg-yellow-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Connection Line */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        left: -x, 
                        top: -y, 
                        width: Math.abs(x) * 2 + 48, 
                        height: Math.abs(y) * 2 + 48 
                      }}
                    >
                      <motion.line
                        x1={Math.abs(x) + 24}
                        y1={Math.abs(y) + 24}
                        x2={Math.abs(x) - x + 24}
                        y2={Math.abs(y) - y + 24}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* Data Flow Animation */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(3)].map((_, i) => {
                  const angle = (activeIntegration * 360) / integrations.length;
                  const startX = Math.cos((angle - 90) * (Math.PI / 180)) * 70;
                  const startY = Math.sin((angle - 90) * (Math.PI / 180)) * 70;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-primary shadow-lg"
                      style={{
                        left: `calc(50% + ${startX}px)`,
                        top: `calc(50% + ${startY}px)`,
                      }}
                      animate={{
                        x: -startX,
                        y: -startY,
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

{/* Removed bottom info panel */}
    </div>
  );
}