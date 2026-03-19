# Cooking Ivy

Browser-based cooking game prototype built with plain HTML, CSS, and JavaScript.

## Local Development

### Option 1: Open it directly

Open [`C:\Users\kikym\OneDrive\Desktop\develop\cooking-ivy\index.html`](C:\Users\kikym\OneDrive\Desktop\develop\cooking-ivy\index.html) in your browser.

### Option 2: Run the included PowerShell dev server

This project now includes a small Windows-friendly static server, so you can run it locally even if Python or Node is not installed.

From the project folder, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\serve.ps1
```

Then open [http://localhost:8000](http://localhost:8000).

If you want a different port:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\serve.ps1 -Port 3000
```

### Option 3: Use VS Code Live Server

If you use VS Code, install the recommended `Live Server` extension for quick reloads.

## What changed

- The game name is now `Cooking Ivy`.
- Recipes now contain real ingredient lists and cooking methods.
- Kitchen points unlock harder recipes automatically.
- The timer has been removed.
- Recipes now run 4 to 8 mini-games depending on difficulty.
- The prototype now includes more mini-games: slicing, mixing, heating, portioning, seasoning, plating, dredging, frosting, and dough folding.
- A pink bunny mascot named `Ivy` guides the player.
- Completing a recipe now reveals the full real recipe on the results screen.

## Current recipe list

- Garlic Veggie Stir-Fry
- Chocolate Chip Cookies
- Fudgy Brownies
- Tomato Basil Soup
- Vanilla Celebration Cake
- Chicken Nuggets
- Spaghetti Carbonara
- Blueberry Muffins
- Sourdough Loaf
