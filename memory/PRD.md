# Futuristic Hub - PRD

## Original Problem Statement
"make me a code for my website make it very fancy and animatic so it has 5 button or menu that 1,for opening a link (cloud.multifocus.com → corrected to cloud.multigroup.my.id) and the other make a game to play cuz maybe the viewer is bored"

## Architecture
- **Frontend**: React 19 + Tailwind CSS + framer-motion + react-tsparticles + shadcn/ui
- **Backend**: FastAPI (default boilerplate - not used; pure frontend app)
- **Theme**: Dark futuristic neon (Electric & Neon archetype)

## User Persona
- General website visitor seeking a fun, interactive landing page with cloud access and entertainment

## Core Requirements (Static)
1. 5 interactive buttons/menu items on a single landing page
2. One button opens https://cloud.multigroup.my.id (MultiDrive)
3. Modal with "Powered by MultiNet" message before redirect
4. Multiple playable games to entertain bored viewers
5. Fancy, animated, neon/futuristic aesthetic

## Implemented Features (Feb 2026)
- ✅ Bento Grid layout with 5 cards (1 hero + 4 games)
- ✅ MultiDrive hero card → opens modal → kinetic "Powered by MultiNet" animation → redirects to cloud.multigroup.my.id
- ✅ Memory Match game (puzzle - 4x4 emoji card matching)
- ✅ Neon Snake game (arcade - arrow key controls, glowing neon snake)
- ✅ Whack-A-Node game (reflex - 30 second timer, 3x3 grid)
- ✅ Dice Roller game (casual - 2 dice with rolling animation + history)
- ✅ Interactive particle background (react-tsparticles) - mouse repulse + connecting lines
- ✅ Background music toggle (floating button top-right)
- ✅ Framer-motion animations: card hover glow, staggered entrance, kinetic typography
- ✅ Fonts: Unbounded (headings) + JetBrains Mono (body)
- ✅ Neon color palette: cyan #05D9E8, hot pink #FF2A6D, laser green #01FFC3, cyber yellow #F2E94E
- ✅ data-testid attributes on all interactive elements

## Tech Stack
- framer-motion ^12.40.0
- react-tsparticles ^2.12.2
- tsparticles-slim ^2.12.0
- lucide-react (icons)
- shadcn/ui Dialog component

## Prioritized Backlog
### P0 (Done)
- All 5 cards/buttons functional
- All 4 games playable
- MultiDrive redirect working

### P1 (Future)
- Add more games (Tic-tac-toe, Rock-Paper-Scissors, Reaction timer)
- Add leaderboards (would need backend persistence)
- Mobile touch controls for Snake game (currently arrow keys only)

### P2 (Future)
- User profiles & saved high scores
- Social sharing buttons
- More immersive 3D effects (Three.js)
- Custom soundtrack selection
