# CDO — Custom Drink Order (Frontend Prototype V1)

Interactive single-page frontend prototype for a custom drink shop. Built to run directly on GitHub Pages with no backend.

## What works
- Top 5 community recipe dashboard (Today / This week / All time)
- View recipe detail, Order Original, Remix
- Size + base + ingredient selector
- Real-time 100% formula balancing
- Reorder production sequence (buttons + drag/drop)
- Ice and mix style controls
- Real-time layered drink visual
- Flavor profile, balance score and price estimate
- Formula ID + production-oriented summary
- Public/private recipe toggle
- Save recipes to LocalStorage
- Saved recipe library
- Public local recipes feed back into the simulated leaderboard
- Shareable formula URL
- Undo / redo / reset
- Responsive mobile layout
- PWA cache/service worker
- Optional lightweight UI sound

## Important prototype limitation
GitHub Pages is static hosting. This prototype stores user-created recipes in that browser's LocalStorage. A real shared Top 5 leaderboard across all customers requires a backend/database later (for example Supabase/Firebase/API).

## Deploy to GitHub Pages
Upload all files in this folder to the root of a repository and enable **Settings → Pages → Deploy from branch** (main / root), or use your existing GitHub Pages workflow.

No npm install or build step is required.


## V3 changes
- Photoreal generated assets in Hero and Top 5 cards
- Top 5 cards redesigned as image-first menu cards
- Ingredient percentages no longer auto-normalize
- Total formula must equal exactly 100% before continuing/finishing
- Under/over status explains the exact remaining/excess percentage
- Percentage controls changed to minus / direct numeric / plus for easier use
