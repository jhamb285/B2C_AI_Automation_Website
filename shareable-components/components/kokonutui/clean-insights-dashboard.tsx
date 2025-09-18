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
    Cell,
    CartesianGrid,
    LineChart,
    Line
} from "recharts";
import { 
    TrendingUp, 
    Phone, 
    DollarSign, 
    Clock,
    Eye,
    Activity,
    Users,
    Zap,
    Target,
    Bell,
    Calendar,
    MapPin,
    Star,
    Timer,
    Wifi,
    CheckCircle,
    AlertCircle,
    MessageSquare
} from "lucide-react";

const initialWeeklyData = [
    { day: "Mon", calls: 45, revenue: 2800, leads: 12, conversion: 68 },
    { day: "Tue", calls: 52, revenue: 3200, leads: 18, conversion: 72 },
    { day: "Wed", calls: 38, revenue: 2400, leads: 9, conversion: 65 },
    { day: "Thu", calls: 61, revenue: 3800, leads: 22, conversion: 78 },
    { day: "Fri", calls: 55, revenue: 3400, leads: 19, conversion: 74 },
    { day: "Sat", calls: 42, revenue: 2600, leads: 14, conversion: 69 },
    { day: "Sun", calls: 35, revenue: 2200, leads: 8, conversion: 62 }
];

const callSuccessData = [
    { name: 'Answered', value: 85, color: 'hsl(var(--chart-1))' },
    { name: 'Missed', value: 15, color: 'hsl(var(--chart-3))' }
];

const responseTimeData = [
    { hour: "9AM", time: 2.1 },
    { hour: "12PM", time: 1.8 },
    { hour: "3PM", time: 2.3 },
    { hour: "6PM", time: 1.9 }
];

const initialMetrics = [
    { icon: Phone, label: "Calls", value: "247", change: "+23%", color: "hsl(var(--chart-1))" },
    { icon: DollarSign, label: "Revenue", value: "$12.4K", change: "+35%", color: "hsl(var(--chart-2))" },
    { icon: Clock, label: "Response", value: "2.1s", change: "-67%", color: "hsl(var(--chart-1))" },
    { icon: Users, label: "Leads", value: "102", change: "+45%", color: "hsl(var(--chart-2))" },
    { icon: Target, label: "Convert", value: "71%", change: "+12%", color: "hsl(var(--chart-1))" },
    { icon: Activity, label: "Active", value: "94%", change: "+8%", color: "hsl(var(--chart-2))" }
];

const initialNotifications = [
    { icon: Bell, message: "New lead from HVAC inquiry", time: "2m ago", type: "success" },
    { icon: Calendar, message: "Service appointment booked", time: "5m ago", type: "info" },
    { icon: MessageSquare, message: "Customer feedback received", time: "8m ago", type: "success" }
];

const initialActivity = [
    { action: "Call answered", details: "Emergency plumbing - leak repair", location: "Dallas, TX", value: "$450", status: "completed" },
    { action: "Lead captured", details: "HVAC system maintenance", location: "Austin, TX", value: "$280", status: "pending" },
    { action: "Quote sent", details: "Roof inspection & repair", location: "Houston, TX", value: "$1,200", status: "pending" }
];

export default function CleanInsightsDashboard() {
    const [weeklyData, setWeeklyData] = useState(initialWeeklyData);
    const [metrics, setMetrics] = useState(initialMetrics);
    const [responseData, setResponseData] = useState(responseTimeData);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activity, setActivity] = useState(initialActivity);
    const [isLive, setIsLive] = useState(true);

    // Much faster updates every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // Update metrics with variations
            setMetrics(prev => prev.map(metric => {
                if (metric.label === "Calls") {
                    const newValue = 245 + Math.floor(Math.random() * 15);
                    return { ...metric, value: newValue.toString() };
                } else if (metric.label === "Revenue") {
                    const newValue = (12.0 + Math.random() * 1.0).toFixed(1);
                    return { ...metric, value: `$${newValue}K` };
                } else if (metric.label === "Response") {
                    const newValue = (1.8 + Math.random() * 0.6).toFixed(1);
                    return { ...metric, value: `${newValue}s` };
                } else if (metric.label === "Leads") {
                    const newValue = 98 + Math.floor(Math.random() * 12);
                    return { ...metric, value: newValue.toString() };
                } else if (metric.label === "Convert") {
                    const newValue = 68 + Math.floor(Math.random() * 8);
                    return { ...metric, value: `${newValue}%` };
                } else if (metric.label === "Active") {
                    const newValue = 91 + Math.floor(Math.random() * 6);
                    return { ...metric, value: `${newValue}%` };
                }
                return metric;
            }));

            // Update chart data
            setWeeklyData(prev => prev.map(item => ({
                ...item,
                calls: Math.max(30, item.calls + Math.floor(Math.random() * 8) - 4),
                revenue: Math.max(2000, item.revenue + Math.floor(Math.random() * 600) - 300),
                leads: Math.max(5, item.leads + Math.floor(Math.random() * 4) - 2),
                conversion: Math.max(50, item.conversion + Math.floor(Math.random() * 6) - 3)
            })));

            // Update response time data
            setResponseData(prev => prev.map(item => ({
                ...item,
                time: Math.max(1.2, 1.8 + Math.random() * 0.8)
            })));

            // Pulse live indicator
            setIsLive(false);
            setTimeout(() => setIsLive(true), 50);
        }, 2000); // Much faster - every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full p-2 space-y-2 flex flex-col">
            {/* Header with Status */}
            <div className="flex items-center justify-between">
                <motion.div 
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary"
                    animate={{
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Eye className="w-3 h-3" />
                    Live Analytics
                </motion.div>
                <motion.div 
                    className="flex items-center gap-1"
                    animate={{
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Wifi className="w-3 h-3 text-green-500" />
                    <span className="text-[9px] text-green-500 font-medium">Online</span>
                </motion.div>
            </div>

            {/* Top Metrics - 3x2 Grid */}
            <div className="grid grid-cols-3 gap-1.5">
                {metrics.map((metric, index) => (
                    <motion.div 
                        key={metric.label} 
                        className="p-1.5 rounded-md bg-card border border-border/50"
                        animate={{
                            borderColor: isLive ? ["hsl(var(--border))", metric.color, "hsl(var(--border))"] : "hsl(var(--border))",
                            scale: isLive ? [1, 1.02, 1] : 1
                        }}
                        transition={{ 
                            duration: 0.3, // Much faster
                            delay: index * 0.05
                        }}
                    >
                        <div className="flex items-center gap-1 mb-0.5">
                            <metric.icon className="w-2.5 h-2.5" style={{ color: metric.color }} />
                            <span className="text-[10px] font-medium" style={{ color: metric.color }}>
                                {metric.change}
                            </span>
                        </div>
                        <motion.div 
                            className="text-xs font-bold text-foreground"
                            key={metric.value}
                            initial={{ scale: 1.15, color: metric.color }}
                            animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                            transition={{ duration: 0.2 }}
                        >
                            {metric.value}
                        </motion.div>
                        <div className="text-[9px] text-muted-foreground leading-none">{metric.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-2 gap-2">
                {/* Weekly Calls Area Chart */}
                <motion.div 
                    className="h-20 p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? ["hsl(var(--border))", "hsl(var(--chart-1) / 0.4)", "hsl(var(--border))"] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3 h-3" style={{ color: "hsl(var(--chart-1))" }} />
                        <span className="text-[10px] font-medium text-foreground">Calls Trend</span>
                    </div>
                    <ResponsiveContainer width="100%" height={50}>
                        <AreaChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" />
                            <XAxis 
                                dataKey="day" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 8, fill: "hsl(var(--muted-foreground))" }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="calls" 
                                stroke="hsl(var(--chart-1))" 
                                strokeWidth={2}
                                fill="hsl(var(--chart-1) / 0.2)"
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Conversion Line Chart */}
                <motion.div 
                    className="h-20 p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? ["hsl(var(--border))", "hsl(var(--chart-2) / 0.4)", "hsl(var(--border))"] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-3 h-3" style={{ color: "hsl(var(--chart-2))" }} />
                        <span className="text-[10px] font-medium text-foreground">Conversion</span>
                    </div>
                    <ResponsiveContainer width="100%" height={50}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" />
                            <XAxis 
                                dataKey="day" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 8, fill: "hsl(var(--muted-foreground))" }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="conversion" 
                                stroke="hsl(var(--chart-2))" 
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-3 gap-2">
                {/* Revenue Bars */}
                <motion.div 
                    className="h-16 p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? ["hsl(var(--border))", "hsl(var(--chart-1) / 0.3)", "hsl(var(--border))"] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="text-[10px] font-medium text-foreground mb-1">Revenue</div>
                    <ResponsiveContainer width="100%" height={40}>
                        <BarChart data={weeklyData.slice(-4)}>
                            <Bar 
                                dataKey="revenue" 
                                fill="hsl(var(--chart-1) / 0.8)"
                                radius={[1, 1, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Success Rate Pie */}
                <motion.div 
                    className="h-16 p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? ["hsl(var(--border))", "hsl(var(--chart-2) / 0.3)", "hsl(var(--border))"] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <div className="text-[10px] font-medium text-foreground mb-1">Success</div>
                    <ResponsiveContainer width="100%" height={40}>
                        <PieChart>
                            <Pie
                                data={callSuccessData}
                                cx="50%"
                                cy="50%"
                                innerRadius={8}
                                outerRadius={16}
                                paddingAngle={1}
                                dataKey="value"
                            >
                                {callSuccessData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Response Time */}
                <motion.div 
                    className="h-16 p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? ["hsl(var(--border))", "hsl(var(--chart-1) / 0.3)", "hsl(var(--border))"] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <div className="text-[10px] font-medium text-foreground mb-1">Response</div>
                    <ResponsiveContainer width="100%" height={40}>
                        <LineChart data={responseData}>
                            <XAxis 
                                dataKey="hour" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 7, fill: "hsl(var(--muted-foreground))" }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="time" 
                                stroke="hsl(var(--chart-1))" 
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--chart-1))", r: 1.5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Notifications & Recent Activity */}
            <div className="grid grid-cols-2 gap-1.5">
                {/* Notifications */}
                <motion.div 
                    className="p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? [
                            "hsl(var(--border))", 
                            "hsl(var(--chart-2) / 0.3)", 
                            "hsl(var(--border))"
                        ] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-1 mb-1">
                        <Bell className="w-2.5 h-2.5 text-primary" />
                        <span className="text-[9px] font-medium text-foreground">Alerts</span>
                        <motion.div 
                            className="w-1 h-1 bg-red-500 rounded-full ml-auto"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                    <div className="space-y-1">
                        {notifications.slice(0, 2).map((notif, index) => (
                            <motion.div 
                                key={index}
                                className="text-[8px] text-muted-foreground leading-tight"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="flex items-center gap-1">
                                    <notif.icon className="w-2 h-2 text-green-500" />
                                    <span className="truncate">{notif.message}</span>
                                </div>
                                <div className="text-[7px] text-muted-foreground/60">{notif.time}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div 
                    className="p-2 rounded-lg bg-card border border-border/50"
                    animate={{
                        borderColor: isLive ? [
                            "hsl(var(--border))", 
                            "hsl(var(--chart-1) / 0.3)", 
                            "hsl(var(--border))"
                        ] : "hsl(var(--border))"
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <div className="flex items-center gap-1 mb-1">
                        <Activity className="w-2.5 h-2.5 text-primary" />
                        <span className="text-[9px] font-medium text-foreground">Activity</span>
                        <Timer className="w-2 h-2 text-blue-500 ml-auto" />
                    </div>
                    <div className="space-y-1">
                        {activity.slice(0, 2).map((item, index) => (
                            <motion.div 
                                key={index}
                                className="text-[8px] leading-tight"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.3 }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground font-medium truncate">{item.action}</span>
                                    <div className="flex items-center gap-1">
                                        {item.status === 'completed' ? 
                                            <CheckCircle className="w-1.5 h-1.5 text-green-500" /> : 
                                            <AlertCircle className="w-1.5 h-1.5 text-yellow-500" />
                                        }
                                        <span className="text-primary font-medium">{item.value}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-1.5 h-1.5 text-muted-foreground" />
                                    <span className="text-muted-foreground text-[7px] truncate">{item.location}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Live Status */}
            <div className="text-center">
                <motion.div 
                    className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"
                    animate={{
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <motion.div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "hsl(var(--chart-1))" }}
                        animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    ></motion.div>
                    Live Data • Updates every 2s
                </motion.div>
            </div>
        </div>
    );
}