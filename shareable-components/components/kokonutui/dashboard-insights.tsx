"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    BarChart3, 
    TrendingUp, 
    Users, 
    Phone, 
    Clock,
    DollarSign,
    Activity,
    Eye
} from "lucide-react";

interface MetricCard {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
    color: string;
}

const metrics: MetricCard[] = [
    {
        icon: Phone,
        label: "Calls Today",
        value: "247",
        change: "+23%",
        trend: "up",
        color: "#10B981"
    },
    {
        icon: DollarSign,
        label: "Revenue",
        value: "$12.4K",
        change: "+35%",
        trend: "up", 
        color: "#3B82F6"
    },
    {
        icon: Clock,
        label: "Avg Response",
        value: "2.1s",
        change: "-67%",
        trend: "up",
        color: "#8B5CF6"
    },
    {
        icon: Users,
        label: "New Leads",
        value: "18",
        change: "+45%",
        trend: "up",
        color: "#F59E0B"
    }
];

export default function DashboardInsights() {
    const [animatedValues, setAnimatedValues] = useState(
        metrics.map(m => ({ ...m, animatedValue: "0" }))
    );
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            
            // Animate values
            metrics.forEach((metric, index) => {
                setTimeout(() => {
                    setAnimatedValues(prev => 
                        prev.map((item, i) => 
                            i === index ? { ...item, animatedValue: metric.value } : item
                        )
                    );
                }, index * 300);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm space-y-4"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <motion.div
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-2"
                        animate={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        <Eye className="w-4 h-4" />
                        Live Dashboard
                    </motion.div>
                    <div className="text-xs text-muted-foreground">
                        Real-time business insights
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {animatedValues.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div 
                                    className="p-1.5 rounded-md"
                                    style={{ backgroundColor: `${metric.color}20` }}
                                >
                                    <metric.icon 
                                        className="w-3 h-3" 
                                        style={{ color: metric.color }}
                                    />
                                </div>
                                <motion.div
                                    className="flex items-center gap-1"
                                    animate={metric.trend === "up" ? {
                                        y: [-1, 1, -1]
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <TrendingUp 
                                        className="w-2.5 h-2.5" 
                                        style={{ color: metric.color }}
                                    />
                                    <span 
                                        className="text-xs font-medium"
                                        style={{ color: metric.color }}
                                    >
                                        {metric.change}
                                    </span>
                                </motion.div>
                            </div>
                            
                            <div>
                                <motion.div 
                                    className="text-lg font-bold text-foreground"
                                    key={metric.animatedValue}
                                    initial={{ scale: 1.2, opacity: 0.8 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {metric.animatedValue}
                                </motion.div>
                                <div className="text-xs text-muted-foreground">
                                    {metric.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Live Indicator */}
                <motion.div 
                    className="flex items-center justify-center gap-2 mt-4 p-2 rounded-lg bg-primary/10"
                    animate={{
                        backgroundColor: ["hsl(var(--primary) / 0.1)", "hsl(var(--primary) / 0.2)", "hsl(var(--primary) / 0.1)"]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <span className="text-xs font-medium text-primary">
                        Updating live
                    </span>
                </motion.div>

                {/* Mini Chart Simulation */}
                <div className="mt-4 p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-foreground">Today's Activity</span>
                    </div>
                    <div className="flex items-end gap-1 h-8">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="bg-primary/60 rounded-sm flex-1"
                                initial={{ height: 0 }}
                                animate={{ 
                                    height: `${20 + Math.sin(i) * 15 + 10}px`
                                }}
                                transition={{
                                    delay: i * 0.1,
                                    duration: 0.6,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}