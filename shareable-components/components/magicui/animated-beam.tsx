"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useId, useRef, useState } from "react";

type AnyHtmlRef<T extends HTMLElement> =
  | React.RefObject<T>
  | React.MutableRefObject<T | null>;

export interface AnimatedBeamProps {
  className?: string;
  containerRef: AnyHtmlRef<HTMLDivElement>;
  fromRef: AnyHtmlRef<HTMLDivElement>;
  toRef: AnyHtmlRef<HTMLDivElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const updatePath = () => {
    if (containerRef.current && fromRef.current && toRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      const controlPointX = (startX + endX) / 2;
      const controlPointY = (startY + endY) / 2 - curvature;

      const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
      setPathD(d);
    }
  };

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth * 3}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="8 32"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-44;0"
          dur={`${duration * 2}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur={`${duration * 1.5}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient
          className={cn("transform-gpu", {
            "[&>*]:rotate-180": reverse,
          })}
          id={id}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
    </svg>
  );
};