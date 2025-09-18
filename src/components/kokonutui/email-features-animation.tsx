"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
    Mail, 
    Calendar, 
    Send,
    Users,
    Target,
    CheckCircle2 
} from "lucide-react";

interface EmailStep {
    icon: React.ComponentType<any>;
    name: string;
    description: string;
    completed: boolean;
}

export default function EmailFeaturesAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [campaignCycle, setCampaignCycle] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Different campaign types with varied text
    const campaignTypes = [
        {
            name: "Welcome Series",
            steps: [
                { icon: Users, name: "Import Leads", description: "Syncing new customers" },
                { icon: Mail, name: "Welcome Email", description: "Crafting onboarding message" },
                { icon: Calendar, name: "Follow-up", description: "Scheduling day 3 check-in" },
                { icon: Send, name: "Launch", description: "Activating welcome series" }
            ]
        },
        {
            name: "Lead Nurturing",
            steps: [
                { icon: Users, name: "Segment Leads", description: "Sorting by interest level" },
                { icon: Mail, name: "Value Content", description: "Creating educational emails" },
                { icon: Calendar, name: "Drip Schedule", description: "Weekly touchpoint setup" },
                { icon: Send, name: "Deploy", description: "Starting nurture sequence" }
            ]
        },
        {
            name: "Re-engagement",
            steps: [
                { icon: Users, name: "Identify Inactive", description: "Finding dormant contacts" },
                { icon: Mail, name: "Win-back Offer", description: "Designing special promotion" },
                { icon: Calendar, name: "Timing Strategy", description: "Optimal send windows" },
                { icon: Send, name: "Execute", description: "Launching comeback campaign" }
            ]
        },
        {
            name: "Product Launch",
            steps: [
                { icon: Users, name: "Target Audience", description: "Selecting VIP customers" },
                { icon: Mail, name: "Announcement", description: "Building excitement email" },
                { icon: Calendar, name: "Launch Sequence", description: "Multi-day reveal plan" },
                { icon: Send, name: "Go Live", description: "Product launch activation" }
            ]
        }
    ];

    const currentCampaign = campaignTypes[campaignCycle];
    const steps = currentCampaign.steps;
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Auto-scroll effect when step changes - scroll within container only
    useEffect(() => {
        if (currentStep > 0 && currentStep <= steps.length) {
            const activeStepIndex = currentStep - 1;
            const stepElement = stepRefs.current[activeStepIndex];
            const container = scrollContainerRef.current;
            
            if (stepElement && container) {
                // Calculate position relative to container
                const containerRect = container.getBoundingClientRect();
                const stepRect = stepElement.getBoundingClientRect();
                const relativeTop = stepRect.top - containerRect.top;
                const containerHeight = container.clientHeight;
                
                // Only scroll if element is not fully visible within container
                if (relativeTop < 0 || relativeTop + stepRect.height > containerHeight) {
                    container.scrollTo({
                        top: container.scrollTop + relativeTop - (containerHeight - stepRect.height) / 2,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }, [currentStep, steps.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const next = prev + 1;
                if (next < steps.length) {
                    setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
                    return next;
                } else if (next === steps.length) {
                    // Complete the last step
                    setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
                    return next;
                } else {
                    // Move to next campaign cycle
                    setCampaignCycle(prevCycle => (prevCycle + 1) % campaignTypes.length);
                    setCompletedSteps([]);
                    return 0;
                }
            });
        }, 1500); // Slightly slower for better readability

        return () => clearInterval(interval);
    }, [campaignCycle, steps.length]); // Re-run when campaign changes

    return (
        <div className="w-full h-full flex flex-col p-4">
            {/* Main Header */}
            <h3 className="text-lg font-semibold mb-4">Email campaigns</h3>
            
            {/* Sub-header with Campaign Type */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Active Campaign</span>
                </div>
                <motion.span 
                    key={campaignCycle}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full"
                >
                    {currentCampaign.name}
                </motion.span>
            </div>

            {/* Steps - Hidden Scrollbar */}
            <div 
                ref={scrollContainerRef}
                className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden max-h-full [&::-webkit-scrollbar]:hidden"
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none',  /* Internet Explorer 10+ */
                }}
            >
                {steps.map((step, index) => {
                    const isActive = currentStep === index + 1;
                    const isCompleted = completedSteps.includes(index);
                    const Icon = step.icon;

                    return (
                        <motion.div
                            key={`${campaignCycle}-${index}`}
                            ref={(el) => stepRefs.current[index] = el}
                            className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all duration-500 relative overflow-hidden ${
                                isActive 
                                    ? 'border-primary bg-primary/10 shadow-md' 
                                    : isCompleted
                                        ? 'border-primary/40 bg-primary/5'
                                        : 'border-border/30 bg-transparent'
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                                opacity: 1, 
                                y: 0,
                                scale: isActive ? 1.02 : 1
                            }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                            {/* Highlight sweep effect */}
                            {isActive && (
                                <>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ 
                                            duration: 1.5, 
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    {/* Glow effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-primary/5 rounded-lg"
                                        animate={{ 
                                            opacity: [0.2, 0.4, 0.2]
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </>
                            )}
                            <div className="flex-shrink-0">
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
                                    >
                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-primary/20 border-primary' 
                                                : 'bg-background border-muted-foreground/30'
                                        }`}
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                        }}
                                    >
                                        <Icon 
                                            className={`w-3 h-3 transition-colors duration-300 ${
                                                isActive ? 'text-primary' : 'text-muted-foreground'
                                            }`}
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 relative z-10">
                                <motion.div 
                                    className={`text-xs font-medium leading-tight transition-colors duration-300 ${
                                        isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-foreground'
                                    }`}
                                    animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {step.name}
                                </motion.div>
                                <div className="text-xs text-muted-foreground leading-tight">{step.description}</div>
                            </div>

                            {/* Progress indicator */}
                            {isActive && (
                                <motion.div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </motion.div>
                            )}

                            {isActive && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.4 }}
                                    className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary z-10"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${Math.min(((currentStep + 1) / steps.length) * 100, 100)}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
}