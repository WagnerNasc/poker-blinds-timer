import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BlindLevel } from "./types";
import { defaultBlinds } from "./defaults";

interface TimerState {
  blinds: BlindLevel[];
  currentLevelIndex: number;
  timeLeft: number;
  isRunning: boolean;
  volume: number;
  isDarkMode: boolean;

  // Actions
  setTimeLeft: (t: number) => void;
  toggleRunning: () => void;
  pause: () => void;
  nextLevel: () => void;
  prevLevel: () => void;
  setVolume: (v: number) => void;
  toggleDarkMode: () => void;
  updateBlinds: (blinds: BlindLevel[]) => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      blinds: defaultBlinds,
      currentLevelIndex: 0,
      timeLeft: defaultBlinds[0].duration,
      isRunning: false,
      volume: 0.7,
      isDarkMode: true,

      setTimeLeft: (t) => set({ timeLeft: t }),

      toggleRunning: () => set((s) => ({ isRunning: !s.isRunning })),

      pause: () => set({ isRunning: false }),

      nextLevel: () => {
        const { blinds, currentLevelIndex } = get();
        const next = Math.min(currentLevelIndex + 1, blinds.length - 1);
        set({ currentLevelIndex: next, timeLeft: blinds[next].duration, isRunning: get().isRunning });
      },

      prevLevel: () => {
        const { blinds, currentLevelIndex } = get();
        const prev = Math.max(currentLevelIndex - 1, 0);
        set({ currentLevelIndex: prev, timeLeft: blinds[prev].duration });
      },

      setVolume: (v) => set({ volume: v }),

      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),

      updateBlinds: (blinds) => {
        // Renumber levels (skip breaks)
        let levelNum = 0;
        const numbered = blinds.map((b) => {
          if (!b.isBreak) levelNum++;
          return { ...b, level: b.isBreak ? 0 : levelNum };
        });
        const idx = Math.min(get().currentLevelIndex, numbered.length - 1);
        set({ blinds: numbered, currentLevelIndex: idx, timeLeft: numbered[idx].duration, isRunning: false });
      },

      resetTimer: () => {
        const { blinds } = get();
        set({ currentLevelIndex: 0, timeLeft: blinds[0].duration, isRunning: false });
      },
    }),
    {
      name: "poker-blinds-timer",
      // Don't persist isRunning — always start paused on reload
      partialize: (s) => ({ ...s, isRunning: false }),
    }
  )
);
