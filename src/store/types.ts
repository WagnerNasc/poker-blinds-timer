export interface BlindLevel {
  id: string;
  level: number;
  smallBlind: number;
  bigBlind: number;
  ante?: number;
  duration: number; // seconds
  isBreak?: boolean;
}
