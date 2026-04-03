# Poker Blinds Timer

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Visual timer to manage blind levels in poker games, with automatic level progression, current and next blinds display, and dark mode support.

## 🔑️ Key components

1. Timer

Handles the countdown for each level via the `useTimer` hook, automatically advancing to the next level when time runs out.

2. Store

Manages global state with [Zustand](https://zustand-demo.pmnd.rs/): level list, current index, time remaining, and volume settings.

3. UI

Three-column grid layout with an animated SVG progress ring, current and next blinds display, and a settings modal built with [Radix UI](https://www.radix-ui.com/).

| Component | Description |
|-----------|-------------|
| `TimerScreen` | Main screen with layout and orchestration |
| `ProgressRing` | Animated SVG ring showing level progress |
| `BlindsDisplay` | Shows small blind, big blind and ante |
| `Controls` | Play/pause, next level and settings buttons |
| `SettingsModal` | Edit levels and volume settings |

## 💨️ Running Project

```shell
npm install
npm run dev
```

## 🧗️ Authors

- [Wagner Nascimento](https://github.com/WagnerNasc)

## 📓️ License

This project is licensed under the [CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/)
