import type { BlindLevel } from "./types";

const DURATION = 900;

export const defaultSettings = {
  volume: 0.7,
};

export const defaultBlinds: BlindLevel[] = [
  { id: "1",  level: 1,  smallBlind: 1,    bigBlind: 2,    ante: 0, duration: DURATION },
  { id: "2",  level: 2,  smallBlind: 2,    bigBlind: 4,    ante: 0, duration: DURATION },
  { id: "3",  level: 3,  smallBlind: 5,    bigBlind: 10,   ante: 0, duration: DURATION },
  { id: "4",  level: 4,  smallBlind: 10,   bigBlind: 20,   ante: 0, duration: DURATION },
  { id: "5",  level: 5,  smallBlind: 15,   bigBlind: 30,   ante: 0, duration: DURATION },
  { id: "6",  level: 6,  smallBlind: 20,   bigBlind: 40,   ante: 0, duration: DURATION },
  { id: "7",  level: 7,  smallBlind: 25,   bigBlind: 50,   ante: 0, duration: DURATION },
  { id: "8",  level: 8,  smallBlind: 50,   bigBlind: 100,  ante: 0, duration: DURATION },
  { id: "9",  level: 9,  smallBlind: 75,   bigBlind: 150,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 100,  bigBlind: 200,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 150,  bigBlind: 300,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 200,  bigBlind: 400,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 300,  bigBlind: 600,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 400,  bigBlind: 800,  ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 500,  bigBlind: 1000, ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 600,  bigBlind: 1200, ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 800,  bigBlind: 1600, ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 1000, bigBlind: 2000, ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 1500, bigBlind: 3000, ante: 0, duration: DURATION },
  { id: "10", level: 10, smallBlind: 2000, bigBlind: 4000, ante: 0, duration: DURATION },
];
