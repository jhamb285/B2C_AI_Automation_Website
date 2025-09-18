"use client";
import { Card } from "@/components/ui/card";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import type { BentoTile } from "@/lib/bento-data";
import { TILES } from "@/lib/bento-data";
import AIVoice from "@/components/kokonutui/ai-voice";
import AILoadingState from "@/components/kokonutui/ai-loading-state";
import CRMIntegrationsBeam from "@/components/kokonutui/animated-beam";
import EmailFeaturesAnimation from "@/components/kokonutui/email-features-animation";
import AnalyticsClean from "@/components/kokonutui/analytics-clean";
import { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  Mail, 
  Send, 
  PenTool, 
  Sparkles, 
  CheckCircle, 
  BarChart3, 
  TrendingUp,
  Activity,
  Mic,
  Globe,
  Users,
  Database,
  Target
} from "lucide-react";

const PLACE: Record<BentoTile["id"], string> = {
  live_analytics: "lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3",
  voice:          "lg:col-start-4 lg:col-end-6 lg:row-start-1 lg:row-end-2",
  email:          "lg:col-start-6 lg:col-end-8 lg:row-start-1 lg:row-end-2",
  ai_content:     "lg:col-start-4 lg:col-end-6 lg:row-start-2 lg:row-end-3",
  web:            "lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3",
  lifecycle:      "lg:col-start-1 lg:col-end-5 lg:row-start-3 lg:row-end-4",
  crm:            "lg:col-start-5 lg:col-end-8 lg:row-start-3 lg:row-end-4",
};

const COLORS: Record<BentoTile["id"], string> = {
  live_analytics: "bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20",
  voice:          "bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20", 
  email:          "bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20",
  ai_content:     "bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20",
  web:            "bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20",
  lifecycle:      "bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20",
  crm:            "bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20",
};

const ICONS: Record<BentoTile["id"], React.ComponentType<{ className?: string }>> = {
  live_analytics: Activity,
  voice:          Mic,
  email:          Mail,
  ai_content:     Sparkles,
  web:            Globe,
  lifecycle:      Target,
  crm:            Database,
};

export default function FeaturesBento() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto relative">
      {/* Section Title and Description */}
      <div className="mb-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            See Your Business
            <span className="text-orange-500/80"> Come Alive</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Experience real-time automation in action. Watch as leads flow through your pipeline, 
            campaigns launch automatically, and AI creates content while you focus on growing your business.
          </p>
        </motion.div>
      </div>

      <LayoutGroup>
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4
            [--bento-row-h:280px] auto-rows-[var(--bento-row-h)]
          "
        >
          {TILES.map((t) => (
            <motion.div
              key={t.id}
              layout
              layoutId={`tile-${t.id}`}
              className={`${PLACE[t.id]}`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            >
              <Card className={`h-full rounded-3xl overflow-hidden relative p-4 ${COLORS[t.id]}`}>
                {/* Contextual Icon - Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  >
                    {(() => {
                      const IconComponent = ICONS[t.id];
                      const iconColor = t.id === 'live_analytics' ? 'text-blue-500' :
                                      t.id === 'voice' ? 'text-green-500' :
                                      t.id === 'email' ? 'text-green-500' :
                                      t.id === 'ai_content' ? 'text-orange-500' :
                                      t.id === 'web' ? 'text-blue-500' :
                                      t.id === 'lifecycle' ? 'text-blue-500' :
                                      'text-green-500';
                      return <IconComponent className={`w-5 h-5 ${iconColor}`} />;
                    })()}
                  </motion.div>
                </div>
                <TileContent id={t.id} title={t.title} />
              </Card>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}

// Animation Components
function LiveAnalyticsAnimation() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Live Analytics</h3>
      </div>
      <div className="flex-1">
        <AnalyticsClean />
      </div>
    </div>
  );
}

function EmailAnimation() {
  const [scheduledSlots, setScheduledSlots] = useState([false, false, false, false]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScheduledSlots(prev => {
        const newSlots = [...prev];
        const emptyIndex = newSlots.findIndex(slot => !slot);
        if (emptyIndex !== -1) {
          newSlots[emptyIndex] = true;
        } else {
          setTimeout(() => setScheduledSlots([false, false, false, false]), 1000);
        }
        return newSlots;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Email campaigns</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {scheduledSlots.map((filled, index) => (
            <motion.div
              key={index}
              className={`w-12 h-10 rounded-lg border-2 flex flex-col items-center justify-center ${
                filled ? 'border-blue-500 bg-blue-500/20' : 'border-dashed border-muted-foreground/30'
              }`}
              animate={{ scale: filled ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className={`w-4 h-4 ${filled ? 'text-blue-500' : 'text-muted-foreground/50'}`} />
              <div className="text-xs text-muted-foreground mt-1">Day {index + 1}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-2 bg-blue-500/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <Send className="w-4 h-4 text-blue-500" />
        </div>
      </div>
    </div>
  );
}

function AIContentAnimation() {
  const [currentText, setCurrentText] = useState('');
  const [currentPhase, setCurrentPhase] = useState<'thinking' | 'writing' | 'enhancing' | 'publishing'>('thinking');
  
  const contentPhrases = [
    "10 Ways to Boost Your HVAC Business",
    "Customer Service Excellence Guide", 
    "Seasonal Maintenance Tips for Clients"
  ];
  
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      const currentPhrase = contentPhrases[phraseIndex];
      
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeText, 100);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        setTimeout(typeText, 50);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => {
          setCurrentPhase('publishing');
          setTimeout(() => {
            isDeleting = true;
            setCurrentPhase('thinking');
            typeText();
          }, 1500);
        }, 1000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % contentPhrases.length;
        setTimeout(typeText, 500);
      }
    };
    
    typeText();
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">AI content</h3>
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-muted/50 rounded-lg p-4 min-h-[80px] relative overflow-hidden mb-3">
          <div className="text-sm text-foreground leading-relaxed">
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-purple-500 ml-1"
            />
          </div>
          {currentPhase === 'publishing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 bg-green-500/10 rounded-lg flex items-center justify-center"
            >
              <CheckCircle className="w-6 h-6 text-green-500" />
            </motion.div>
          )}
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <motion.div
            animate={{ rotate: currentPhase === 'thinking' ? 360 : 0 }}
            transition={{ duration: 1, repeat: currentPhase === 'thinking' ? Infinity : 0 }}
            className="w-2 h-2 bg-purple-500 rounded-full"
          />
          {currentPhase}...
        </div>
      </div>
    </div>
  );
}

function LifecycleAnimation() {
  const allLeads = [
    { id: 1, name: 'HVAC Solutions Inc', stage: 'Lead', time: '2 min ago' },
    { id: 2, name: 'Tech Repair Co', stage: 'Qualified', time: '5 min ago' },
    { id: 3, name: 'Green Energy LLC', stage: 'Proposal', time: '8 min ago' },
    { id: 4, name: 'Quick Fix Plumbing', stage: 'Closed', time: '12 min ago' },
    { id: 5, name: 'Metro Construction', stage: 'Lead', time: '15 min ago' },
    { id: 6, name: 'Smart Home Systems', stage: 'Qualified', time: '18 min ago' },
    { id: 7, name: 'Elite Contractors', stage: 'Proposal', time: '22 min ago' },
    { id: 8, name: 'City Services Group', stage: 'Lead', time: '25 min ago' },
  ];

  const [visibleLeads, setVisibleLeads] = useState<typeof allLeads>([]);
  const [leadIndex, setLeadIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (leadIndex < allLeads.length) {
        setVisibleLeads(prev => [allLeads[leadIndex], ...prev].slice(0, 4));
        setLeadIndex(prev => (prev + 1) % allLeads.length);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [leadIndex]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Lead': return 'bg-blue-500/10 border-blue-500/30 text-blue-600';
      case 'Qualified': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600';
      case 'Proposal': return 'bg-orange-500/10 border-orange-500/30 text-orange-600';
      case 'Closed': return 'bg-green-500/10 border-green-500/30 text-green-600';
      default: return 'bg-muted/10 border-border text-muted-foreground';
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-4">
      <h3 className="text-lg font-semibold mb-4">Lead lifecycle</h3>
      
      <div className="flex-1 space-y-3 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleLeads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-card border border-border rounded-lg p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm text-foreground">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.time}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStageColor(lead.stage)}`}>
                  {lead.stage}
                </span>
                
                <div className="flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {visibleLeads.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="text-sm">Monitoring pipeline...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TileContent({ id, title }: { id: BentoTile["id"]; title: string }) {
  // Mount animation hooks by id. Keep minimal content; real animations live in separate files.
  switch (id) {
    case "live_analytics":
      return <LiveAnalyticsAnimation />;
    case "voice":
      return (
        <div className="h-full w-full flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Voice automation</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="scale-90">
              <AIVoice />
            </div>
          </div>
        </div>
      );
    case "email":
      return (
        <div className="h-full w-full flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Email campaigns</h3>
          <div className="flex-1">
            <EmailFeaturesAnimation />
          </div>
        </div>
      );
    case "ai_content":
      return <AIContentAnimation />;
    case "web":
      return (
        <div className="h-full w-full flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Web scraping</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="scale-110 w-full h-full flex items-center justify-center">
              <AILoadingState />
            </div>
          </div>
        </div>
      );
    case "lifecycle":
      return <LifecycleAnimation />;
    case "crm":
      return (
        <div className="h-full w-full flex flex-col">
          <h3 className="text-lg font-semibold mb-4">CRM integration</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="scale-100 w-full h-full">
              <CRMIntegrationsBeam />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="h-full w-full flex items-start">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      );
  }
}