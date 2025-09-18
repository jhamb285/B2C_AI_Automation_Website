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
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Animated Counter Component
const AnimatedCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let isCancelled = false;
        const duration = 1500;
        const steps = 40;
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

// Revenue Chart Component
const RevenueChart = ({ visible }: { visible: boolean }) => {
    const [data, setData] = useState([
        { month: 'Jan', revenue: 0 },
        { month: 'Feb', revenue: 0 },
        { month: 'Mar', revenue: 0 },
        { month: 'Apr', revenue: 0 },
        { month: 'May', revenue: 0 },
    ]);

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setData([
                    { month: 'Jan', revenue: 12400 },
                    { month: 'Feb', revenue: 15800 },
                    { month: 'Mar', revenue: 18200 },
                    { month: 'Apr', revenue: 21500 },
                    { month: 'May', revenue: 24800 },
                ]);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setData([
                { month: 'Jan', revenue: 0 },
                { month: 'Feb', revenue: 0 },
                { month: 'Mar', revenue: 0 },
                { month: 'Apr', revenue: 0 },
                { month: 'May', revenue: 0 },
            ]);
        }
    }, [visible]);

    return (
        <div className="w-full h-20">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <AreaChart data={data} width={300} height={80} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone"
                        dataKey="revenue" 
                        stroke="#10b981"
                        fill="url(#revenueGradient)"
                        strokeWidth={2}
                        dot={false}
                        animationDuration={2000}
                        isAnimationActive={visible}
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    );
};

// Conversion Chart Component
const ConversionChart = ({ visible }: { visible: boolean }) => {
    const [data, setData] = useState([
        { stage: 'Leads', count: 0 },
        { stage: 'Qualified', count: 0 },
        { stage: 'Booked', count: 0 },
    ]);

    const chartConfig = {
        count: {
            label: "Count",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setData([
                    { stage: 'Leads', count: 847 },
                    { stage: 'Qualified', count: 423 },
                    { stage: 'Booked', count: 189 },
                ]);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setData([
                { stage: 'Leads', count: 0 },
                { stage: 'Qualified', count: 0 },
                { stage: 'Booked', count: 0 },
            ]);
        }
    }, [visible]);

    return (
        <div className="w-full h-16">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart data={data} width={300} height={64} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar 
                        dataKey="count" 
                        fill="#3b82f6"
                        radius={[2, 2, 0, 0]}
                        animationDuration={1800}
                        isAnimationActive={visible}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

// Satisfaction Pie Chart Component
const SatisfactionChart = ({ visible }: { visible: boolean }) => {
    const [data, setData] = useState([
        { name: 'Satisfied', value: 0, color: 'hsl(var(--chart-1))' },
        { name: 'Neutral', value: 0, color: 'hsl(var(--chart-3))' },
        { name: 'Unsatisfied', value: 100, color: 'hsl(var(--chart-4))' },
    ]);

    const chartConfig = {
        value: {
            label: "Satisfaction",
        },
    } satisfies ChartConfig;

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setData([
                    { name: 'Satisfied', value: 87, color: '#10b981' },
                    { name: 'Neutral', value: 10, color: '#f59e0b' },
                    { name: 'Unsatisfied', value: 3, color: '#ef4444' },
                ]);
            }, 1200);
            return () => clearTimeout(timer);
        } else {
            setData([
                { name: 'Satisfied', value: 0, color: '#10b981' },
                { name: 'Neutral', value: 0, color: '#f59e0b' },
                { name: 'Unsatisfied', value: 100, color: '#ef4444' },
            ]);
        }
    }, [visible]);

    return (
        <div className="w-16 h-16">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <PieChart width={64} height={64}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx={32}
                        cy={32}
                        innerRadius={12}
                        outerRadius={30}
                        startAngle={90}
                        endAngle={450}
                        animationDuration={2200}
                        isAnimationActive={visible}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    );
};

// Key Metrics Component
const KeyMetrics = ({ visible }: { visible: boolean }) => {
    const metrics = [
        { 
            label: 'Revenue', 
            value: 24800, 
            prefix: '$', 
            icon: DollarSign, 
            color: 'text-green-600',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/30'
        },
        { 
            label: 'Leads', 
            value: 847, 
            icon: Users, 
            color: 'text-blue-600',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30'
        },
        { 
            label: 'Conversion', 
            value: 22, 
            suffix: '%', 
            icon: Target, 
            color: 'text-purple-600',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30'
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`p-2 rounded-lg border ${metric.bgColor} ${metric.borderColor}`}
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

export default function AnalyticsDashboardAnimation() {
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => {
                const next = (prev + 1) % (totalSteps + 1); // +1 for reset pause
                return next;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [totalSteps]);

    return (
        <div className="w-full h-full flex flex-col justify-center space-y-2 p-2">
            {/* Header */}
            <motion.div 
                className="flex items-center gap-2 mb-2"
                animate={{ opacity: activeStep > 0 ? 1 : 0.5 }}
            >
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">Live Dashboard</span>
            </motion.div>

            {/* Revenue Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="space-y-1"
            >
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-foreground">Revenue Growth</span>
                </div>
                <RevenueChart visible={activeStep >= 1} />
            </motion.div>

            {/* Conversion Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="space-y-1"
            >
                <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="text-xs font-medium text-foreground">Lead Pipeline</span>
                </div>
                <ConversionChart visible={activeStep >= 2} />
            </motion.div>

            {/* Satisfaction Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
            >
                <SatisfactionChart visible={activeStep >= 3} />
                <div className="space-y-1">
                    <span className="text-xs font-medium text-foreground">Customer Rating</span>
                    <div className="text-sm font-bold text-green-600">
                        {activeStep >= 3 ? <AnimatedCounter target={87} suffix="%" /> : "0%"}
                    </div>
                </div>
            </motion.div>

            {/* Key Metrics Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={activeStep >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
                className="space-y-1"
            >
                <KeyMetrics visible={activeStep >= 4} />
            </motion.div>

            {/* Progress Indicator */}
            <motion.div 
                className="flex justify-center space-x-1 mt-1"
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
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </motion.div>
        </div>
    );
}