"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { 
    TrendingUp,
    BarChart3,
    PieChart as PieChartIcon,
    Activity,
    CheckCircle,
    Bell
} from "lucide-react";

interface AnalyticsStep {
    message: string;
    visible: boolean;
    icon: React.ComponentType<{ className?: string }>;
    visual: () => React.ReactNode;
}

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let isCancelled = false;
        const duration = 1000;
        const steps = 30;
        const increment = target / steps;
        const stepTime = duration / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            if (isCancelled) return;
            
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepTime);
        
        return () => {
            isCancelled = true;
            clearInterval(timer);
        };
    }, [target]);
    
    return <span>{count}{suffix}</span>;
};

// Simple Chart Animation
const SimpleChart = ({ visible }: { visible: boolean }) => {
    return (
        <div className="w-full h-8 relative overflow-hidden rounded-md bg-green-500/10">
            <svg className="w-full h-full" viewBox="0 0 120 32">
                <motion.path
                    d="M0,24 Q30,8 60,16 T120,12"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.circle
                    cx="0"
                    cy="24"
                    r="2"
                    fill="#10b981"
                    initial={{ cx: 0, cy: 24 }}
                    animate={visible ? { cx: 120, cy: 12 } : { cx: 0, cy: 24 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
};

// Simple Progress Ring
const ProgressRing = ({ visible, percentage }: { visible: boolean; percentage: number }) => {
    const circumference = 2 * Math.PI * 12;
    
    return (
        <div className="w-8 h-8 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                />
                <motion.circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={visible ? { 
                        strokeDashoffset: circumference - (circumference * percentage / 100)
                    } : { 
                        strokeDashoffset: circumference 
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
};

export default function AnalyticsBuildupAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<AnalyticsStep[]>([
        {
            message: "Data collection started",
            visible: false,
            icon: Activity,
            visual: () => (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30"
                >
                    <motion.span className="text-sm font-bold text-green-600">
                        +<AnimatedCounter target={847} />
                    </motion.span>
                    <span className="text-xs text-muted-foreground">data points</span>
                </motion.div>
            )
        },
        {
            message: "Revenue tracking active",
            visible: false,
            icon: TrendingUp,
            visual: () => (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <SimpleChart visible={true} />
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
                        <motion.span className="text-sm font-bold text-green-600">
                            +<AnimatedCounter target={23} suffix="%" />
                        </motion.span>
                        <span className="text-xs text-muted-foreground">growth</span>
                    </div>
                </motion.div>
            )
        },
        {
            message: "Customer insights ready", 
            visible: false,
            icon: PieChartIcon,
            visual: () => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3"
                >
                    <ProgressRing visible={true} percentage={87} />
                    <div className="px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
                        <motion.span className="text-sm font-bold text-green-600">
                            <AnimatedCounter target={87} suffix="%" />
                        </motion.span>
                        <span className="text-xs text-muted-foreground ml-1">satisfied</span>
                    </div>
                </motion.div>
            )
        },
        {
            message: "Real-time monitoring live",
            visible: false,
            icon: Bell,
            visual: () => (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-2"
                >
                    {['AI', 'Sync', 'Live'].map((service, index) => (
                        <motion.div
                            key={service}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30"
                        >
                            <motion.div
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ 
                                    scale: [1, 1.3, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            />
                            <span className="text-xs font-medium text-green-600">{service}</span>
                        </motion.div>
                    ))}
                </motion.div>
            )
        }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSteps(prev => {
                const newSteps = [...prev];
                if (currentStep < newSteps.length) {
                    newSteps[currentStep].visible = true;
                    setCurrentStep(prevStep => {
                        const nextStep = prevStep + 1;
                        
                        // Reset after all steps complete
                        if (nextStep >= newSteps.length) {
                            setTimeout(() => {
                                setSteps(steps => steps.map(s => ({ ...s, visible: false })));
                                setCurrentStep(0);
                            }, 3000);
                            return 0;
                        }
                        
                        return nextStep;
                    });
                }
                return newSteps;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [currentStep]);

    return (
        <div className="w-full h-full flex flex-col justify-center space-y-3">
            <AnimatePresence>
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={step.visible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="p-2 bg-card/60 rounded-lg border border-border/40 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={step.visible ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </motion.div>
                            <step.icon className="w-3 h-3 text-muted-foreground" />
                            <span className="font-medium text-sm text-foreground">{step.message}</span>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={step.visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="ml-6"
                        >
                            {step.visual()}
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}