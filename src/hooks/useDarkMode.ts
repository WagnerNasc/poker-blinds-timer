import { useEffect } from "react";
import { useTimerStore } from "@/store";

export function useDarkMode() {
  const isDarkMode = useTimerStore((s) => s.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
}
