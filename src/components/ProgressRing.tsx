import { memo } from "react";

interface Props {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
}

/**
 * SVG circular progress ring.
 * progress=1 means full circle, progress=0 means empty.
 * Uses CSS transition for smooth animation between ticks.
 */
export const ProgressRing = memo(function ProgressRing({ progress, size = 380, strokeWidth = 8 }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="absolute -rotate-90">
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/30"
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-primary transition-[stroke-dashoffset] duration-500 ease-linear"
      />
    </svg>
  );
});
