import { memo } from "react";
import type { BlindLevel } from "@/store/types";

interface Props {
  label: string;
  level: BlindLevel | null;
}

export const BlindsDisplay = memo(function BlindsDisplay({ label, level }: Props) {
  if (!level) {
    return (
      <div className="flex flex-col items-center gap-2 min-w-[180px]">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-base text-muted-foreground">—</span>
      </div>
    );
  }

  if (level.isBreak) {
    return (
      <div className="flex flex-col items-center gap-2 min-w-[180px]">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-2xl font-semibold text-yellow-500">Break</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 min-w-[180px]">
      <span className="text-sm uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="text-4xl font-bold tabular-nums">
        {level.smallBlind.toLocaleString()} / {level.bigBlind.toLocaleString()}
      </div>
      {level.ante != null && (
        <span className="text-base text-muted-foreground">Ante: {level.ante.toLocaleString()}</span>
      )}
    </div>
  );
});
