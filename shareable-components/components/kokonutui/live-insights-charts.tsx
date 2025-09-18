"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    AreaChart, 
    Area, 
    ResponsiveContainer, 
    XAxis, 
    YAxis,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { 
    TrendingUp, 
    Phone, 
    DollarSign, 
    Clock,
    Eye,
    Activity
} from "lucide-react";

interface MetricData {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
    change: string;
    color: string;
    data: any[];
}

const generateTimeSeriesData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        calls: Math.floor(Math.random() * 50) + 180,
        revenue: Math.floor(Math.random() * 3000) + 8000,
        response: Math.random() * 2 + 1,
    }));
};

const pieData = [
    { name: 'Answered', value: 85, color: '#10B981' },
    { name: 'Missed', value: 15, color: '#EF4444' },
];

export default function LiveInsightsCharts() {
    const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData());
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentMetrics, setCurrentMetrics] = useState([
        { icon: Phone, label: "Calls", value: "247", change: "+23%", color: "#10B981" },
        { icon: DollarSign, label: "Revenue", value: "$12.4K", change: "+35%", color: "#3B82F6" },
        { icon: Clock, label: "Avg Response", value: "2.1s", change: "-67%", color: "#8B5CF6" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            
            // Update metrics with slight variations
            setCurrentMetrics(prev => prev.map(metric => ({
                ...metric,
                value: metric.label === "Calls" ? 
                    String(245 + Math.floor(Math.random() * 10)) :
                    metric.label === "Revenue" ? 
                    `$${(12.2 + Math.random() * 0.6).toFixed(1)}K` :
                    `${(2.0 + Math.random() * 0.4).toFixed(1)}s`
            })));
            
            // Update chart data
            setTimeSeriesData(generateTimeSeriesData());
            
            setTimeout(() => setIsAnimating(false), 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col p-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                {/* Header */}
                <div className="text-center">
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
                        Live Analytics Dashboard
                    </motion.div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2">
                    {currentMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            className="p-2 rounded-lg bg-card/60 border border-border/30"
                            animate={isAnimating ? {
                                scale: [1, 1.05, 1],
                                backgroundColor: ["hsl(var(--card))", "hsl(var(--muted))", "hsl(var(--card))"]
                            } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-1 mb-1">
                                <div 
                                    className="p-1 rounded"
                                    style={{ backgroundColor: `${metric.color}20` }}
                                >
                                    <metric.icon 
                                        className="w-3 h-3" 
                                        style={{ color: metric.color }}
                                    />
                                </div>
                                <span 
                                    className="text-xs font-medium"
                                    style={{ color: metric.color }}
                                >
                                    {metric.change}
                                </span>
                            </div>
                            <div className="text-sm font-bold text-foreground">
                                {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Chart */}
                <motion.div 
                    className="h-20 p-2 rounded-lg bg-card/40 border border-border/30"
                    animate={isAnimating ? {
                        borderColor: ["hsl(var(--border))", "hsl(var(--primary) / 0.3)", "hsl(var(--border))"]
                    } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-foreground">Weekly Calls</span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeSeriesData}>
                            <Area 
                                type="monotone" 
                                dataKey="calls" 
                                stroke="hsl(var(--primary))" 
                                strokeWidth={2}
                                fill="hsl(var(--primary) / 0.1)"
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Bottom Charts Row */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Bar Chart */}
                    <motion.div 
                        className="h-16 p-2 rounded-lg bg-card/40 border border-border/30"
                        animate={isAnimating ? {
                            borderColor: ["hsl(var(--border))", "hsl(var(--primary) / 0.3)", "hsl(var(--border))"]
                        } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="text-xs font-medium text-foreground mb-1">Daily Revenue</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={timeSeriesData.slice(-4)}>
                                <Bar 
                                    dataKey="revenue" 
                                    fill="hsl(var(--primary) / 0.7)"
                                    radius={[2, 2, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Pie Chart */}
                    <motion.div 
                        className="h-16 p-2 rounded-lg bg-card/40 border border-border/30"
                        animate={isAnimating ? {
                            borderColor: ["hsl(var(--border))", "hsl(var(--primary) / 0.3)", "hsl(var(--border))"]
                        } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="text-xs font-medium text-foreground mb-1">Call Success</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={8}
                                    outerRadius={20}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Live Status */}
                <motion.div 
                    className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primary/10"
                    animate={{
                        backgroundColor: [
                            "hsl(var(--primary) / 0.1)", 
                            "hsl(var(--primary) / 0.2)", 
                            "hsl(var(--primary) / 0.1)"
                        ]
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
                        Live Data
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}