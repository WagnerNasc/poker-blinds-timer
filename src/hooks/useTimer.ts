import { useEffect, useRef, useCallback } from "react";
import { useTimerStore } from "@/store";

/**
 * Drift-free countdown timer.
 * Uses Date.now() to calculate elapsed time each tick,
 * avoiding cumulative drift from setInterval inaccuracy.
 */
export function useTimer() {
  const isRunning = useTimerStore((s) => s.isRunning);
  const timeLeft = useTimerStore((s) => s.timeLeft);
  const volume = useTimerStore((s) => s.volume);
  const currentLevelIndex = useTimerStore((s) => s.currentLevelIndex);
  const blindsLength = useTimerStore((s) => s.blinds.length);
  const setTimeLeft = useTimerStore((s) => s.setTimeLeft);
  const nextLevel = useTimerStore((s) => s.nextLevel);

  const startTimeRef = useRef<number>(0);
  const startValueRef = useRef<number>(0);
  const audioRef = useRef<AudioContext | null>(null);

  const playAlert = useCallback(() => {
    if (volume === 0) return;
    try {
      const ctx = audioRef.current ?? new AudioContext();
      audioRef.current = ctx;
      // Play a short beep sequence
      [0, 0.15, 0.3].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = volume * 0.8;
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.15);
      });
    } catch {
      // Audio not available
    }
  }, [volume]);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now();
    startValueRef.current = timeLeft;

    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = startValueRef.current - elapsed;

      if (remaining <= 0) {
        // Auto-advance if not on last level
        if (currentLevelIndex < blindsLength - 1) {
          playAlert();
          nextLevel();
        } else {
          setTimeLeft(0);
          useTimerStore.getState().pause();
        }
      } else {
        setTimeLeft(remaining);
      }
    }, 250); // Check 4x/sec for responsiveness

    return () => clearInterval(id);
  }, [isRunning, currentLevelIndex, blindsLength, setTimeLeft, nextLevel, playAlert, timeLeft]);
}
