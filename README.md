# Goodness Arcade 🕹️✨

> A personal mini game arcade, built from scratch as a 13th birthday gift — for my little sister, Goodness.

**Live:** [https://goodness-arcade.vercel.app/arcade](#)

---

## About

Goodness Arcade is a small, self-contained arcade of five original mini-games, wrapped in a dark, premium, mobile-first interface. No accounts, no backend, no ads — just an app that opens straight into an arcade built for one person.

It's installable as a PWA, works fully offline once loaded, and keeps every high score right on the device.

---

## 🎮 The Games

| | Game | What it is |
|---|---|---|
| ⭐ | **Catch the Stars** | Drag your basket to catch falling stars — dodge the bombs, chain combos for a multiplier. |
| 🏎️ | **Mini Racing** | Steer and dodge oncoming traffic. One crash ends the run — the longer you survive, the higher you score. |
| 🦋 | **Butterfly Collector** | Tap butterflies before they flutter off. Rare ones are worth more, and it only gets faster. |
| 🎈 | **Balloon Pop** | Pop balloons before they drift away. Chain pops without missing to build your multiplier. |
| 🧠 | **Brain Quest** | Casual trivia across general knowledge, science, and math — every correct answer teaches you why. |

More games get added over time — the arcade is built to grow.

---

## ✨ Features

- Splash → Arcade → Game Intro → Countdown → Play → Result, for every game
- Per-game high scores and play counts, saved locally
- Quit/pause with a confirmation prompt mid-game
- Installable as a PWA — works fully offline after first load
- Dark, restrained visual system with a distinct color identity per game
- Fully responsive, mobile-first, touch **and** keyboard controls where it makes sense
- Respects `prefers-reduced-motion`

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion** — animation
- **React Router** — navigation
- **vite-plugin-pwa** — offline support & installability
- Canvas 2D (Mini Racing) for a smooth, DOM-free render loop

No backend. No database. No accounts. Everything lives in the browser.

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

## 📱 Installing as an App

Once it's running (dev or deployed):

- **Desktop (Chrome/Edge):** click the install icon in the address bar
- **Android:** menu → *Add to Home Screen*
- **iPhone:** Share button → *Add to Home Screen*

Once installed, it opens full-screen with no browser chrome — just the arcade.

---

## 📁 Project Structure

```text
src/
  components/
    ui/          # generic building blocks — Button, Card, Modal, etc.
    arcade/      # Home screen pieces — GameCard, ArcadeGrid, Greeting
    game-shell/  # shared intro → countdown → play → result flow
  games/
    catch-stars/
    mini-racing/
    butterfly-collector/
    balloon-pop/
    brain-quest/
  data/          # the game registry every screen reads from
  hooks/
  lib/
  types/
  pages/
```

Every game lives in its own folder with its own logic, types, and components — the registry in `data/gameRegistry.ts` is the single source of truth the whole app reads from, so adding a sixth game never means touching the ones already there.

---

## ❤️ Credits

Built specially for Goodness, by her big brother, Job.

Happy birthday. 🎂
