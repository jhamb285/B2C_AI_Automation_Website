"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CleanLoadingAnimation() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="relative w-16 h-16">
                {/* Background circle */}
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    style={{ transform: "rotate(-90deg)" }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                        opacity="0.2"
                    />
                    
                    {/* Progress circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={{ 
                            strokeDashoffset: 2 * Math.PI * 40 - (progress / 100) * 2 * Math.PI * 40 
                        }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        style={{
                            filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.3))"
                        }}
                    />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-3 h-3 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
                
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary mt-8">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    );
}