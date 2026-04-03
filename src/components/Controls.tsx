import { memo, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useTimerStore } from "@/store";

interface Props {
  onOpenSettings: () => void;
}

export const Controls = memo(function Controls({ onOpenSettings }: Props) {
  const isRunning = useTimerStore((s) => s.isRunning);
  const volume = useTimerStore((s) => s.volume);
  const isDarkMode = useTimerStore((s) => s.isDarkMode);
  const toggleRunning = useTimerStore((s) => s.toggleRunning);
  const prevLevel = useTimerStore((s) => s.prevLevel);
  const nextLevel = useTimerStore((s) => s.nextLevel);
  const setVolume = useTimerStore((s) => s.setVolume);
  const toggleDarkMode = useTimerStore((s) => s.toggleDarkMode);

  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center">
      {/* Left column — volume */}
      <div className="flex items-center">
        <div className="relative flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setShowVolume((v) => !v)}>
            {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          {showVolume && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card border rounded-lg p-3 shadow-lg w-32">
              <Slider
                value={[volume]}
                max={1}
                step={0.05}
                onValueChange={([v]) => setVolume(v)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Center column — transport buttons */}
      <div className="flex items-center gap-3 -translate-x-2">
        <Button variant="ghost" size="icon" onClick={prevLevel}>
          <SkipBack className="h-5 w-5" />
        </Button>

        <button
          className="flex items-center justify-center rounded-full h-16 w-16 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={toggleRunning}
        >
          {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-0.5" />}
        </button>

        <Button variant="ghost" size="icon" onClick={nextLevel}>
          <SkipForward className="h-5 w-5" />
        </Button>

      </div>

      {/* Right column — settings gear */}
      <div className="flex justify-end">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onOpenSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
});
