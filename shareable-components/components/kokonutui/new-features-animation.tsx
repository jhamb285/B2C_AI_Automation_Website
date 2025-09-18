"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
    Bot, 
    MessageSquare, 
    Calendar, 
    Mail, 
    Phone, 
    Settings,
    Sparkles,
    CheckCircle2 
} from "lucide-react";

interface Feature {
    icon: React.ComponentType<any>;
    name: string;
    description: string;
    color: string;
    status: "installing" | "configuring" | "complete";
}

interface NewFeaturesAnimationProps {
    onStepComplete?: (stepIndex: number) => void;
    onReset?: () => void;
}

const features: Feature[] = [
    {
        icon: Mail,
        name: "Email Integration",
        description: "Setting up lead capture system",
        color: "#F59E0B",
        status: "installing"
    },
    {
        icon: Bot,
        name: "Analytics Engine",
        description: "Configuring data processing",
        color: "#3B82F6",
        status: "installing"
    },
    {
        icon: Settings,
        name: "Report Generator",
        description: "Building monthly insights",
        color: "#8B5CF6",
        status: "installing"
    },
    {
        icon: CheckCircle2,
        name: "Service Monitor",
        description: "Enabling continuous updates",
        color: "#10B981",
        status: "installing"
    }
];

export default function NewFeaturesAnimation({ onStepComplete, onReset }: NewFeaturesAnimationProps) {
    const [currentFeatures, setCurrentFeatures] = useState(features);
    const [activeIndex, setActiveIndex] = useState(0);
    const callbackRef = useRef<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeatures(prev => {
                const newFeatures = [...prev];
                const currentFeature = newFeatures[activeIndex];
                
                if (currentFeature.status === "installing") {
                    currentFeature.status = "configuring";
                } else if (currentFeature.status === "configuring") {
                    currentFeature.status = "complete";
                    
                    // Trigger callback when feature completes - use setTimeout to avoid render conflicts
                    if (onStepComplete && !callbackRef.current) {
                        callbackRef.current = true;
                        setTimeout(() => {
                            onStepComplete(activeIndex);
                            callbackRef.current = false;
                        }, 0);
                    }
                    
                    // Move to next feature
                    setActiveIndex(prevIndex => {
                        const nextIndex = (prevIndex + 1) % features.length;
                        
                        // Reset all features when we complete the cycle
                        if (nextIndex === 0) {
                            // Trigger reset callback after 5 seconds (let 4th step be visible)
                            if (onReset) {
                                setTimeout(() => {
                                    onReset();
                                }, 5000); // 5 second delay before reset
                            }
                            setTimeout(() => {
                                setCurrentFeatures(features.map(f => ({ ...f, status: "installing" as const })));
                            }, 8000); // 8 second total delay before restarting
                        }
                        
                        return nextIndex;
                    });
                }
                
                return newFeatures;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const getStatusIcon = (status: Feature["status"]) => {
        switch (status) {
            case "installing":
                return (
                    <motion.div
                        className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                );
            case "configuring":
                return (
                    <motion.div
                        className="w-3 h-3 bg-yellow-500 rounded-full"
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                );
            case "complete":
                return (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                    </motion.div>
                );
        }
    };

    const getStatusText = (status: Feature["status"]) => {
        switch (status) {
            case "installing": return "Installing...";
            case "configuring": return "Configuring...";
            case "complete": return "Ready!";
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm space-y-4"
            >
                <div className="text-center mb-6">
                    <motion.div
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-2"
                        animate={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        <Sparkles className="w-4 h-4" />
                        Setting Up Features
                    </motion.div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                        <motion.div
                            className="bg-primary h-1.5 rounded-full"
                            animate={{
                                width: `${((activeIndex + 1) / features.length) * 100}%`
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="popLayout">
                    {currentFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                                opacity: 1, 
                                x: 0,
                                scale: index === activeIndex ? 1.02 : 1
                            }}
                            className={`flex items-center gap-3 p-3 rounded-lg border border-border/50 transition-colors duration-300 ${
                                index === activeIndex ? 'bg-muted/50' : 'bg-transparent'
                            }`}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ 
                                duration: 0.3,
                                layout: { duration: 0.2 }
                            }}

                        >
                            <div 
                                className="p-2 rounded-lg shrink-0"
                                style={{ backgroundColor: `${feature.color}20` }}
                            >
                                <feature.icon 
                                    className="w-4 h-4" 
                                    style={{ color: feature.color }}
                                />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-foreground">
                                    {feature.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {feature.description}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                {getStatusIcon(feature.status)}
                                <span 
                                    className="text-xs font-medium"
                                    style={{ 
                                        color: feature.status === "complete" ? "#10B981" : 
                                               feature.status === "configuring" ? "#F59E0B" : 
                                               "hsl(var(--muted-foreground))"
                                    }}
                                >
                                    {getStatusText(feature.status)}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.div
                    className="text-center mt-6"
                    animate={{
                        opacity: currentFeatures.every(f => f.status === "complete") ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-xs text-muted-foreground">
                        {currentFeatures.filter(f => f.status === "complete").length} of {features.length} features ready
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}