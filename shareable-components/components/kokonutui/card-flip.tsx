"use client";

/**
 * @author: @dorian_baffier
 * @description: Card Flip
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from "@/lib/utils";
import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
    title?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
}

export default function CardFlip({
    title = "Design Systems",
    subtitle = "Explore the fundamentals",
    description = "Dive deep into the world of modern UI/UX design.",
    features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
}: CardFlipProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full max-w-[280px] h-[320px] group [perspective:2000px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className={cn(
                    "relative w-full h-full",
                    "[transform-style:preserve-3d]",
                    "transition-all duration-700",
                    isFlipped
                        ? "[transform:rotateY(180deg)]"
                        : "[transform:rotateY(0deg)]"
                )}
            >
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "[backface-visibility:hidden] [transform:rotateY(0deg)]",
                        "overflow-hidden rounded-2xl",
                        "bg-card dark:bg-card",
                        "border border-border",
                        "shadow-xs dark:shadow-lg",
                        "transition-all duration-700",
                        "group-hover:shadow-lg dark:group-hover:shadow-xl",
                        isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className="relative h-full overflow-hidden bg-gradient-to-b from-background to-muted/50">
                        <div className="absolute inset-0 flex items-start justify-center pt-24">
                            <div className="relative w-[200px] h-[100px] flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-semibold text-foreground leading-snug tracking-tighter transition-all duration-500 group-hover:translate-y-[-4px]">
                                    {title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 tracking-tight transition-all duration-500 group-hover:translate-y-[-4px] delay-[50ms]">
                                    {subtitle}
                                </p>
                            </div>
                            <div className="relative group/icon">
                                <div
                                    className={cn(
                                        "absolute inset-[-8px] rounded-lg transition-opacity duration-300",
                                        "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent"
                                    )}
                                />
                                <Repeat2 className="relative z-10 w-4 h-4 text-orange-500 transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:-rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className={cn(
                        "absolute inset-0 w-full h-full",
                        "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                        "p-6 rounded-2xl",
                        "bg-gradient-to-b from-card to-background",
                        "border border-border",
                        "shadow-xs dark:shadow-lg",
                        "flex flex-col",
                        "transition-all duration-700",
                        "group-hover:shadow-lg dark:group-hover:shadow-xl",
                        !isFlipped ? "opacity-0" : "opacity-100"
                    )}
                >
                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-foreground leading-snug tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px]">
                                {title}
                            </h3>
                            <p className="text-sm text-muted-foreground tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-2px] line-clamp-2">
                                {description}
                            </p>
                        </div>

                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500"
                                    style={{
                                        transform: isFlipped
                                            ? "translateX(0)"
                                            : "translateX(-10px)",
                                        opacity: isFlipped ? 1 : 0,
                                        transitionDelay: `${
                                            index * 100 + 200
                                        }ms`,
                                    }}
                                >
                                    <ArrowRight className="w-3 h-3 text-orange-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-border">
                        <div
                            className={cn(
                                "group/start relative",
                                "flex items-center justify-between",
                                "p-3 -m-3 rounded-xl",
                                "transition-all duration-300",
                                "bg-gradient-to-r from-muted/50 via-muted/50 to-muted/50",
                                "hover:from-orange-500/10 hover:from-0% hover:via-orange-500/5 hover:via-100% hover:to-transparent hover:to-100%",
                                "dark:hover:from-orange-500/20 dark:hover:from-0% dark:hover:via-orange-500/10 dark:hover:via-100% dark:hover:to-transparent dark:hover:to-100%",
                                "hover:scale-[1.02] hover:cursor-pointer"
                            )}
                        >
                            <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover/start:text-primary">
                                Start today
                            </span>
                            <div className="relative group/icon">
                                <div
                                    className={cn(
                                        "absolute inset-[-6px] rounded-lg transition-all duration-300",
                                        "bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent",
                                        "opacity-0 group-hover/start:opacity-100 scale-90 group-hover/start:scale-100"
                                    )}
                                />
                                <ArrowRight className="relative z-10 w-4 h-4 text-orange-500 transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}