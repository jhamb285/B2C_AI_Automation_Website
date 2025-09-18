"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Area, AreaChart, CartesianGrid, XAxis, Label, Pie, PieChart, Sector } from "recharts";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
} from "@/components/ui/chart";

const chartData = [
  { kpi: "Leads", before: 25, after: 85 },
  { kpi: "Response", before: 30, after: 90 },
  { kpi: "Email Rate", before: 35, after: 80 },
  { kpi: "ROI", before: 40, after: 95 },
  { kpi: "Satisfaction", before: 45, after: 88 },
  { kpi: "Velocity", before: 32, after: 92 },
];

const chartConfig = {
  before: {
    label: "Before AI",
    color: "#ef4444", // bright red
  },
  after: {
    label: "After AI",
    color: "#22c55e", // bright green
  },
} satisfies ChartConfig;

const areaChartData = [
  { month: "Jan", automated: 120, manual: 80 },
  { month: "Feb", automated: 180, manual: 75 },
  { month: "Mar", automated: 320, manual: 65 },
  { month: "Apr", automated: 280, manual: 70 },
  { month: "May", automated: 450, manual: 50 },
  { month: "Jun", automated: 380, manual: 55 },
  { month: "Jul", automated: 520, manual: 40 },
  { month: "Aug", automated: 480, manual: 45 },
  { month: "Sep", automated: 650, manual: 30 },
  { month: "Oct", automated: 720, manual: 25 },
];

const areaChartConfig = {
  automated: {
    label: "AI Automated",
    color: "#22c55e", // bright green
  },
  manual: {
    label: "Manual Process",
    color: "#ef4444", // bright red
  },
} satisfies ChartConfig;

const pieData = [
  { category: "AI Automated", value: 75, fill: "#16a34a" },
  { category: "Human Assisted", value: 20, fill: "#d97706" },
  { category: "Manual Only", value: 5, fill: "#dc2626" },
];

const pieChartConfig = {
  automated: {
    label: "AI Automated",
    color: "#16a34a",
  },
  assisted: {
    label: "Human Assisted", 
    color: "#d97706",
  },
  manual: {
    label: "Manual Only",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export default function AnalyticsClean() {
    const id = "pie-interactive";
    const [activeCategory, setActiveCategory] = React.useState(pieData[0].category);
    const [currentMetricIndex, setCurrentMetricIndex] = React.useState(0);
    
    const activeIndex = React.useMemo(
        () => pieData.findIndex((item) => item.category === activeCategory),
        [activeCategory]
    );

    // Additional metrics data
    const metrics = [
        { label: "Lead Conversion", value: "87%", trend: "+23%", period: "vs last month" },
        { label: "Response Time", value: "2.3s", trend: "-65%", period: "avg response" },
        { label: "ROI Growth", value: "340%", trend: "+180%", period: "this quarter" },
        { label: "Active Workflows", value: "1,247", trend: "+45", period: "running now" },
    ];

    // Cycle through metrics
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMetricIndex(prev => (prev + 1) % metrics.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col p-0">
            {/* Live Metrics Header */}
            <motion.div 
                className="h-[15%] flex items-center justify-center"
                key={currentMetricIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <motion.div 
                        className="text-lg font-bold text-primary"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {metrics[currentMetricIndex].value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground">
                        {metrics[currentMetricIndex].label}
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                        {metrics[currentMetricIndex].trend} {metrics[currentMetricIndex].period}
                    </div>
                </div>
            </motion.div>
            
            {/* Charts Layout */}
            <div className="flex-1 flex flex-col">
                {/* Radar Chart - Reduced Height */}
                <div className="h-[42%]">
                    <Card className="border-none bg-transparent shadow-none h-full flex flex-col relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg"
                            animate={{ 
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <CardContent className="pb-0 flex-1 p-0 relative z-10">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square h-full max-h-[210px]"
                            >
                                <RadarChart
                                    data={chartData}
                                    margin={{
                                        top: 35,
                                        right: 35,
                                        bottom: 35,
                                        left: 35,
                                    }}
                                >
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <PolarAngleAxis
                                        dataKey="kpi"
                                        tick={({ x, y, textAnchor, value, index, ...props }) => {
                                            const data = chartData[index];
                                            
                                            return (
                                                <text
                                                    x={x}
                                                    y={index === 0 ? y - 10 : y}
                                                    textAnchor={textAnchor}
                                                    fontSize={10}
                                                    fontWeight={500}
                                                    {...props}
                                                >
                                                    <tspan className="fill-red-500">{data.before}</tspan>
                                                    <tspan className="fill-muted-foreground">/</tspan>
                                                    <tspan className="fill-green-500">{data.after}</tspan>
                                                    <tspan
                                                        x={x}
                                                        dy={"0.8rem"}
                                                        fontSize={9}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {data.kpi}
                                                    </tspan>
                                                </text>
                                            );
                                        }}
                                    />
                                    <PolarGrid />
                                    <Radar
                                        dataKey="before"
                                        stroke="#ef4444"
                                        fill="#ef4444"
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                    <Radar 
                                        dataKey="after" 
                                        stroke="#22c55e"
                                        fill="#22c55e" 
                                        fillOpacity={0.4}
                                        strokeWidth={3}
                                    />
                                </RadarChart>
                            </ChartContainer>
                        </CardContent>
                        <div className="text-center px-1 py-0">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.02, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="flex items-center justify-center gap-1 text-xs font-medium text-green-600"
                            >
                                Avg KPI boost: 247% <TrendingUp className="h-3 w-3" />
                            </motion.div>
                            <div className="text-xs text-muted-foreground">
                                AI vs Manual Performance
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom Row: Area Chart + Pie Chart Side by Side */}
                <div className="h-[43%] grid grid-cols-2 gap-1">
                    {/* Area Chart */}
                    <Card className="border-none bg-transparent shadow-none h-full flex flex-col relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-lg"
                            animate={{ 
                                opacity: [0.1, 0.4, 0.1],
                                x: [0, 2, 0]
                            }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <CardContent className="pb-0 p-0 flex-1 relative z-10">
                            <ChartContainer 
                                config={areaChartConfig}
                                className="h-full w-full max-h-[130px]"
                            >
                                <AreaChart
                                    accessibilityLayer
                                    data={areaChartData}
                                    margin={{
                                        left: 10,
                                        right: 10,
                                        top: 5,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="2 2" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={6}
                                        fontSize={8}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area
                                        dataKey="manual"
                                        type="natural"
                                        fill="url(#manualGradient)"
                                        fillOpacity={0.6}
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        stackId="a"
                                    />
                                    <Area
                                        dataKey="automated"
                                        type="natural"
                                        fill="url(#automatedGradient)"
                                        fillOpacity={0.8}
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        stackId="a"
                                    />
                                    <defs>
                                        <linearGradient id="manualGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="automatedGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                        <div className="text-center px-1 py-0">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.03, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="flex items-center justify-center gap-1 text-xs font-medium text-green-600"
                            >
                                Tasks automated: +340% <TrendingUp className="h-3 w-3" />
                            </motion.div>
                            <div className="text-xs text-muted-foreground">
                                Monthly Growth Trend
                            </div>
                        </div>
                    </Card>

                    {/* Pie Chart */}
                    <Card data-chart={id} className="border-none bg-transparent shadow-none h-full flex flex-col relative overflow-hidden">
                        <ChartStyle id={id} config={pieChartConfig} />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-lg"
                            animate={{ 
                                opacity: [0.2, 0.5, 0.2],
                                rotate: [0, 1, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <CardContent className="flex flex-1 justify-center pb-0 p-0 relative z-10">
                            <ChartContainer
                                id={id}
                                config={pieChartConfig}
                                className="mx-auto aspect-square w-full h-full max-h-[130px]"
                            >
                                <PieChart
                                    margin={{
                                        top: 5,
                                        right: 25,
                                        bottom: 10,
                                        left: 25,
                                    }}
                                >
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="category"
                                        innerRadius={25}
                                        outerRadius={45}
                                        strokeWidth={2}
                                        activeIndex={activeIndex}
                                        activeShape={({ outerRadius = 0, ...props }) => (
                                            <g>
                                                <Sector {...props} outerRadius={outerRadius + 5} />
                                                <Sector
                                                    {...props}
                                                    outerRadius={outerRadius + 10}
                                                    innerRadius={outerRadius + 7}
                                                />
                                            </g>
                                        )}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-lg font-bold"
                                                            >
                                                                {pieData[activeIndex].value}%
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 16}
                                                                className="fill-muted-foreground text-xs"
                                                            >
                                                                {pieData[activeIndex].category.split(' ')[0]}
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <div className="text-center px-1 py-0">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.03, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="flex items-center justify-center gap-1 text-xs font-medium text-green-600"
                            >
                                Fully automated: 75% <Activity className="h-3 w-3" />
                            </motion.div>
                            <div className="text-xs text-muted-foreground">
                                Process Distribution
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}