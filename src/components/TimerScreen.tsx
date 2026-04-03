import { useState } from "react";
import { useTimerStore } from "@/store";
import { useTimer } from "@/hooks/useTimer";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ProgressRing } from "./ProgressRing";
import { BlindsDisplay } from "./BlindsDisplay";
import { Controls } from "./Controls";
import { SettingsModal } from "./SettingsModal";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function TimerScreen() {
  useTimer();
  useDarkMode();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const blinds = useTimerStore((s) => s.blinds);
  const currentLevelIndex = useTimerStore((s) => s.currentLevelIndex);
  const timeLeft = useTimerStore((s) => s.timeLeft);

  const current = blinds[currentLevelIndex];
  const next = currentLevelIndex < blinds.length - 1 ? blinds[currentLevelIndex + 1] : null;
  const progress = current ? timeLeft / current.duration : 0;

  const levelLabel = current?.isBreak ? "Break" : `Level ${current?.level}`;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 gap-8 select-none">
      {/* Main content: 3-column grid so timer stays centered on screen */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-16">
        {/* Left — Current Blinds */}
        <div className="flex justify-center md:justify-end">
          <BlindsDisplay label="Current Blinds" level={current} />
        </div>

        {/* Center — Timer + Ring + Controls stacked */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>
            <ProgressRing progress={progress} />
            <div className="flex flex-col items-center z-10">
              <span className="text-base uppercase tracking-wider text-muted-foreground mb-2">
                {levelLabel}
              </span>
              <span className="text-8xl font-bold tabular-nums tracking-tight">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <Controls onOpenSettings={() => setSettingsOpen(true)} />
        </div>

        {/* Right — Next Blinds */}
        <div className="flex justify-center md:justify-start">
          <BlindsDisplay label="Next Level" level={next} />
        </div>
      </div>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
