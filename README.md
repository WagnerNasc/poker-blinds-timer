# Poker Blinds Timer

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Timer visual para gerenciar os níveis de blinds em partidas de poker, com progressão automática de níveis, exibição dos blinds atual e próximo, e suporte a dark mode.

## 🔑️ Key componentsgit add README.md

1. Timer

Controla a contagem regressiva de cada nível via hook `useTimer`, avançando automaticamente para o próximo nível ao zerar o tempo.

2. Store

Gerencia o estado global com [Zustand](https://zustand-demo.pmnd.rs/): lista de níveis, índice atual, tempo restante e configurações de volume.

3. UI

Layout em grid de 3 colunas com anel de progresso animado (SVG), exibição dos blinds atual e próximo, e modal de configurações com [Radix UI](https://www.radix-ui.com/).

| Componente | Descrição |
|------------|-----------|
| `TimerScreen` | Tela principal com layout e orquestração |
| `ProgressRing` | Anel SVG animado com progresso do nível |
| `BlindsDisplay` | Exibe small blind, big blind e ante |
| `Controls` | Botões de play/pause, avançar e configurações |
| `SettingsModal` | Edição dos níveis e configurações de volume |

## 💨️ Running Project

```shell
npm install
npm run dev
```

## 🧗️ Authors

- [Wagner Nascimento](https://github.com/WagnerNasc)

## 📓️ License

This project is licensed under the [CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/)
