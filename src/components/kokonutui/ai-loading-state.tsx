"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Globe, Search, Database, Zap } from "lucide-react";

const steps = [
    { icon: Search, label: "Scanning", color: "#3B82F6" },
    { icon: Database, label: "Processing", color: "#8B5CF6" },
    { icon: Globe, label: "Extracting", color: "#F59E0B" },
    { icon: Zap, label: "Complete", color: "#10B981" }
];

export default function AILoadingState() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                const next = prev + 1;
                if (next >= steps.length) {
                    setProgress(0);
                    return 0;
                }
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(progressInterval);
    }, [currentStep]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-4">
            {/* Main Animation Circle */}
            <div className="relative w-20 h-20">
                {/* Spinning border */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    style={{
                        background: `conic-gradient(from 0deg, ${steps[currentStep]?.color || '#3B82F6'}, transparent 70%)`,
                        borderRadius: '50%'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner circle with icon */}
                <div className="absolute inset-2 rounded-full bg-background border border-border flex items-center justify-center">
                    <motion.div
                        key={currentStep}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {(() => {
                            const currentStepData = steps[currentStep];
                            if (!currentStepData) return null;
                            const IconComponent = currentStepData.icon;
                            return (
                                <IconComponent 
                                    className="w-6 h-6"
                                    style={{ color: currentStepData.color }}
                                />
                            );
                        })()}
                    </motion.div>
                </div>
            </div>

            {/* Status Text */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="text-sm font-medium text-foreground">
                    {steps[currentStep]?.label || "Processing"}...
                </div>
                <div className="text-xs text-muted-foreground">
                    AI Web Scraper
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-32 bg-muted/30 rounded-full h-1.5 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: steps[currentStep]?.color || '#3B82F6' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Data Points */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <motion.div
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span>847 leads found</span>
                </div>
                <div className="flex items-center gap-1">
                    <motion.div
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                    />
                    <span>423 verified</span>
                </div>
            </div>
        </div>
    );
}