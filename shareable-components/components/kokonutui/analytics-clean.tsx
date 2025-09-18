"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    TrendingUp,
    Users,
    DollarSign,
    Target,
    Activity
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let isCancelled = false;
        const duration = 1200;
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
    
    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Clean Revenue Trend
const RevenueTrend = ({ visible }: { visible: boolean }) => {
    return (
        <div className="w-full h-16 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 64">
                <defs>
                    <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                
                {/* Background grid */}
                <g opacity="0.1">
                    {[16, 32, 48].map(y => (
                        <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="currentColor" strokeWidth="0.5" />
                    ))}
                </g>
                
                {/* Revenue area */}
                <motion.path
                    d="M0,50 Q50,40 100,25 T200,15 L200,64 L0,64 Z"
                    fill="url(#revenueGradient)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Revenue line */}
                <motion.path
                    d="M0,50 Q50,40 100,25 T200,15"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Data points */}
                {visible && [
                    { x: 40, y: 42 },
                    { x: 80, y: 35 },
                    { x: 120, y: 28 },
                    { x: 160, y: 20 },
                    { x: 190, y: 15 }
                ].map((point, i) => (
                    <motion.circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="#10b981"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.3 }}
                    />
                ))}
            </svg>
        </div>
    );
};

// Clean Funnel Chart
const FunnelChart = ({ visible }: { visible: boolean }) => {
    const stages = [
        { name: 'Leads', value: 847, width: 100, color: '#3b82f6' },
        { name: 'Qualified', value: 423, width: 70, color: '#06b6d4' },
        { name: 'Closed', value: 189, width: 40, color: '#10b981' }
    ];

    return (
        <div className="w-full h-20 flex flex-col justify-center space-y-1">
            {stages.map((stage, index) => (
                <div key={stage.name} className="flex items-center gap-3">
                    <div className="w-16 text-xs text-muted-foreground text-right">
                        {stage.name}
                    </div>
                    <div className="flex-1 relative">
                        <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: stage.color }}
                                initial={{ width: 0 }}
                                animate={visible ? { width: `${stage.width}%` } : { width: 0 }}
                                transition={{ 
                                    duration: 1.2, 
                                    delay: index * 0.3,
                                    ease: "easeOut"
                                }}
                            />
                        </div>
                        <motion.div
                            className="absolute right-2 top-0 h-4 flex items-center"
                            initial={{ opacity: 0 }}
                            animate={visible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.8 + index * 0.3 }}
                        >
                            <span className="text-xs font-medium text-foreground">
                                {visible && <AnimatedCounter target={stage.value} />}
                            </span>
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Clean Progress Ring
const ProgressRing = ({ visible, percentage = 87 }: { visible: boolean; percentage?: number }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                {/* Background circle */}
                <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-muted/20"
                />
                
                {/* Progress circle */}
                <motion.circle
                    cx="32"
                    cy="32"
                    r={radius}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={visible ? { strokeDashoffset } : { strokeDashoffset: circumference }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ strokeDasharray: circumference }}
                />
            </svg>
            
            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                    className="text-sm font-bold text-green-600"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                >
                    {visible && <AnimatedCounter target={percentage} suffix="%" />}
                </motion.span>
            </div>
        </div>
    );
};

// Key Metrics Cards
const MetricsCards = ({ visible }: { visible: boolean }) => {
    const metrics = [
        { label: 'Revenue', value: 24800, prefix: '$', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-500/10' },
        { label: 'Leads', value: 847, icon: Users, color: 'text-blue-600', bg: 'bg-blue-500/10' },
        { label: 'Rate', value: 22, suffix: '%', icon: Target, color: 'text-purple-600', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-2 rounded-lg ${metric.bg} border border-border/30`}
                >
                    <div className="flex items-center gap-1 mb-1">
                        <metric.icon className={`w-3 h-3 ${metric.color}`} />
                        <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <div className={`text-sm font-bold ${metric.color}`}>
                        {visible ? (
                            <AnimatedCounter 
                                target={metric.value} 
                                prefix={metric.prefix} 
                                suffix={metric.suffix}
                            />
                        ) : (
                            `${metric.prefix || ''}0${metric.suffix || ''}`
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default function AnalyticsClean() {
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => {
                if (prev >= totalSteps) {
                    return 0; // Reset to beginning
                }
                return prev + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [totalSteps]);

    return (
        <div className="w-full h-full flex flex-col justify-center space-y-3 p-3">
            {/* Header */}
            <motion.div 
                className="flex items-center gap-2 mb-1"
                animate={{ opacity: activeStep > 0 ? 1 : 0.5 }}
            >
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">Live Dashboard</span>
            </motion.div>

            {/* Revenue Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-foreground">Revenue Growth</span>
                </div>
                <RevenueTrend visible={activeStep >= 1} />
            </motion.div>

            {/* Pipeline Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="text-xs font-medium text-foreground">Sales Funnel</span>
                </div>
                <FunnelChart visible={activeStep >= 2} />
            </motion.div>

            {/* Satisfaction Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-foreground">Satisfaction</span>
                </div>
                <div className="flex justify-center">
                    <ProgressRing visible={activeStep >= 3} />
                </div>
            </motion.div>

            {/* Metrics Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-purple-500" />
                    <span className="text-xs font-medium text-foreground">Key Metrics</span>
                </div>
                <MetricsCards visible={activeStep >= 4} />
            </motion.div>

            {/* Progress Dots */}
            <motion.div 
                className="flex justify-center space-x-1 mt-2"
                animate={{ opacity: activeStep > 0 ? 1 : 0.3 }}
            >
                {[1, 2, 3, 4].map((step) => (
                    <motion.div
                        key={step}
                        className={`w-1.5 h-1.5 rounded-full ${
                            activeStep >= step ? 'bg-green-500' : 'bg-muted'
                        }`}
                        animate={{
                            scale: activeStep >= step ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                ))}
            </motion.div>
        </div>
    );
}