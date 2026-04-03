import type { BlindLevel } from "./types";

const DURATION = 60;

export const defaultSettings = {
  volume: 0.7,
};

export const defaultBlinds: BlindLevel[] = [
  { id: "1",  level: 1,  smallBlind: 25,   bigBlind: 50,    ante: 0, duration: DURATION },
  { id: "2",  level: 2,  smallBlind: 50,   bigBlind: 100,   ante: 0, duration: DURATION },
  { id: "3",  level: 3,  smallBlind: 75,   bigBlind: 150,   ante: 0, duration: DURATION },
  { id: "4",  level: 4,  smallBlind: 100,  bigBlind: 200,   ante: 0, duration: DURATION },
  { id: "5",  level: 5,  smallBlind: 150,  bigBlind: 300,   ante: 0, duration: DURATION },
  { id: "6",  level: 6,  smallBlind: 200,  bigBlind: 400,   ante: 0, duration: DURATION },
  { id: "7",  level: 7,  smallBlind: 300,  bigBlind: 600,   ante: 0, duration: DURATION },
  { id: "8",  level: 8,  smallBlind: 400,  bigBlind: 800,   ante: 0, duration: DURATION },
  { id: "9",  level: 9,  smallBlind: 500,  bigBlind: 1000,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 1000, bigBlind: 2000,  ante: 0, duration: DURATION },
];
