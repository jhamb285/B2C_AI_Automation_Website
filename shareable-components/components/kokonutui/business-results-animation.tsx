"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingUp, Phone, DollarSign, Clock } from "lucide-react";

interface Metric {
    icon: React.ComponentType<any>;
    label: string;
    value: number;
    target: number;
    unit: string;
    color: string;
}

const metrics: Metric[] = [
    {
        icon: Phone,
        label: "Calls Answered",
        value: 0,
        target: 247,
        unit: "",
        color: "#10B981"
    },
    {
        icon: DollarSign,
        label: "Revenue Boost",
        value: 0,
        target: 35,
        unit: "%",
        color: "#3B82F6"
    },
    {
        icon: Clock,
        label: "Response Time",
        value: 15,
        target: 2,
        unit: "sec",
        color: "#8B5CF6"
    }
];

export default function BusinessResultsAnimation() {
    const [animatedMetrics, setAnimatedMetrics] = useState(metrics);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const animateMetrics = () => {
            setIsAnimating(true);
            
            const duration = 2000; // 2 seconds
            const steps = 60; // 60 frames
            const stepDuration = duration / steps;

            let currentStep = 0;
            
            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                
                setAnimatedMetrics(prev => 
                    prev.map(metric => ({
                        ...metric,
                        value: metric.label === "Response Time" 
                            ? Math.max(metric.target, metric.value - ((metric.value - metric.target) * progress))
                            : Math.min(metric.target, metric.target * progress)
                    }))
                );

                if (currentStep >= steps) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    
                    // Reset after 3 seconds and start again
                    setTimeout(() => {
                        setAnimatedMetrics(metrics);
                        setTimeout(animateMetrics, 1000);
                    }, 3000);
                }
            }, stepDuration);
        };

        // Start first animation after 500ms
        const initialTimeout = setTimeout(animateMetrics, 500);
        
        return () => {
            clearTimeout(initialTimeout);
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 w-full max-w-sm"
            >
                <div className="text-center mb-6">
                    <motion.div
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                        animate={{
                            scale: isAnimating ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: isAnimating ? Infinity : 0,
                        }}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Live Results
                    </motion.div>
                </div>

                {animatedMetrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50"
                    >
                        <div className="flex items-center gap-3">
                            <div 
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${metric.color}20` }}
                            >
                                <metric.icon 
                                    className="w-4 h-4" 
                                    style={{ color: metric.color }}
                                />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                {metric.label}
                            </span>
                        </div>
                        
                        <motion.div 
                            className="text-lg font-bold"
                            style={{ color: metric.color }}
                            animate={isAnimating ? {
                                scale: [1, 1.1, 1],
                            } : {}}
                            transition={{
                                duration: 0.3,
                                repeat: isAnimating ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                        >
                            {metric.label === "Response Time" 
                                ? Math.max(metric.target, metric.value).toFixed(1)
                                : Math.round(metric.value)
                            }
                            <span className="text-sm ml-1">{metric.unit}</span>
                        </motion.div>
                    </motion.div>
                ))}
                
                {/* Progress indicator */}
                <motion.div 
                    className="mt-4 h-1 bg-muted rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        animate={isAnimating ? {
                            width: ["0%", "100%"]
                        } : {
                            width: "0%"
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}