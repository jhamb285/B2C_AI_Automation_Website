"use client";

/**
 * @author: @kokonutui
 * @description: Apple Activity Card
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityData {
    label: string;
    value: number;
    color: string;
    size: number;
    current: number;
    target: number;
    unit: string;
}

interface CircleProgressProps {
    data: ActivityData;
    index: number;
}

const activities: ActivityData[] = [
    {
        label: "REVENUE",
        value: 85,
        color: "#FF2D55",
        size: 200,
        current: 42,
        target: 50,
        unit: "K",
    },
    {
        label: "CALLS",
        value: 92,
        color: "#A3F900",
        size: 160,
        current: 276,
        target: 300,
        unit: "ANS",
    },
    {
        label: "SATISFACTION",
        value: 88,
        color: "#04C7DD",
        size: 120,
        current: 4.4,
        target: 5.0,
        unit: "★",
    },
];

const CircleProgress = ({ data, index }: CircleProgressProps) => {
    const strokeWidth = 16;
    const radius = (data.size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = ((100 - data.value) / 100) * circumference;

    const gradientId = `gradient-${data.label.toLowerCase()}`;
    const gradientUrl = `url(#${gradientId})`;

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
        >
            <div className="relative">
                <svg
                    width={data.size}
                    height={data.size}
                    viewBox={`0 0 ${data.size} ${data.size}`}
                    className="transform -rotate-90"
                    aria-label={`${data.label} Activity Progress - ${data.value}%`}
                >
                    <title>{`${data.label} Activity Progress - ${data.value}%`}</title>

                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                style={{
                                    stopColor: data.color,
                                    stopOpacity: 1,
                                }}
                            />
                            <stop
                                offset="100%"
                                style={{
                                    stopColor: data.color,
                                    stopOpacity: 0.7,
                                }}
                            />
                        </linearGradient>
                    </defs>

                    <circle
                        cx={data.size / 2}
                        cy={data.size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-muted/20"
                    />

                    <motion.circle
                        cx={data.size / 2}
                        cy={data.size / 2}
                        r={radius}
                        fill="none"
                        stroke={gradientUrl}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: progress }}
                        transition={{
                            duration: 1.8,
                            delay: index * 0.2,
                            ease: "easeInOut",
                        }}
                        strokeLinecap="round"
                        style={{
                            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))",
                        }}
                    />
                </svg>
            </div>
        </motion.div>
    );
};

const DetailedActivityInfo = () => {
    return (
        <motion.div
            className="flex flex-col gap-4 ml-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            {activities.map((activity) => (
                <motion.div key={activity.label} className="flex flex-col">
                    <span className="text-xs font-medium text-muted-foreground">
                        {activity.label}
                    </span>
                    <span
                        className="text-lg font-semibold"
                        style={{ color: activity.color }}
                    >
                        {activity.current}/{activity.target}
                        <span className="text-sm ml-1 text-muted-foreground">
                            {activity.unit}
                        </span>
                    </span>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default function AppleActivityCard({
    title = "Business Metrics",
    className,
}: {
    title?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative w-full mx-auto p-4 rounded-xl",
                "text-foreground",
                className
            )}
        >
            <div className="flex flex-col items-center gap-6">
                <motion.h3
                    className="text-lg font-medium text-foreground"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h3>

                <div className="flex items-center">
                    <div className="relative w-[160px] h-[160px]">
                        {activities.map((activity, index) => (
                            <CircleProgress
                                key={activity.label}
                                data={activity}
                                index={index}
                            />
                        ))}
                    </div>
                    <DetailedActivityInfo />
                </div>
            </div>
        </div>
    );
}