const STORAGE_KEY = "cooking-time-progress-v2";

const step = {
  slice(name, options = {}) {
    return {
      type: "slice",
      name,
      instruction:
        options.instruction ||
        "Swipe across the bright cut guides. The game now accepts wider, easier slicing motions.",
      goal: options.goal || 5,
      ingredientLabel: options.ingredientLabel || name,
      appearance: options.appearance || "vegetable",
      startColor: options.startColor || "#ffb36a",
      endColor: options.endColor || "#ff7f73",
      diagonal: Boolean(options.diagonal),
    };
  },
  mix(name, theme, goal = 100, instruction) {
    return {
      type: "mix",
      name,
      theme,
      goal,
      instruction:
        instruction || "Drag around the bowl until the mixture looks smooth and glossy.",
    };
  },
  heat(name, goal = 120, instruction) {
    return {
      type: "heat",
      name,
      goal,
      instruction:
        instruction || "Keep the heat inside the sweet spot until the cooking meter fills.",
    };
  },
  portion(name, fillLabel, goal = 8, instruction) {
    return {
      type: "portion",
      name,
      fillLabel,
      goal,
      instruction:
        instruction || `Tap each empty spot to portion the ${fillLabel.toLowerCase()} evenly.`,
    };
  },
  season(name, label, goal = 5, instruction) {
    return {
      type: "season",
      name,
      label,
      goal,
      instruction:
        instruction || `Tap the shaker until the ${label.toLowerCase()} lands in the heart zone.`,
    };
  },
  plate(name, label, goal = 6, instruction) {
    return {
      type: "plate",
      name,
      label,
      goal,
      instruction:
        instruction || `Tap the glowing spots in order to plate the ${label.toLowerCase()}.`,
    };
  },
  dredge(name, goal = 3, instruction) {
    return {
      type: "dredge",
      name,
      goal,
      instruction:
        instruction || "Drag each piece through flour, egg, and crumbs in the correct order.",
    };
  },
  pipe(name, goal = 14, instruction) {
    return {
      type: "pipe",
      name,
      goal,
      instruction:
        instruction || "Drag over each frosting point in order to decorate the cake.",
    };
  },
  knead(name, goal = 10, instruction) {
    return {
      type: "knead",
      name,
      goal,
      instruction:
        instruction || "Drag left and right and reverse direction to count each fold.",
    };
  },
};

const recipes = [
  {
    id: "stir-fry",
    name: "Garlic Veggie Stir-Fry",
    difficulty: "Easy",
    requiredPoints: 0,
    servings: "Serves 4",
    summary:
      "A quick noodle stir-fry with crisp vegetables and a glossy soy-garlic sauce.",
    ingredients: [
      "8 oz dried noodles",
      "1 tbsp neutral oil",
      "2 carrots, thinly sliced",
      "1 red bell pepper, thinly sliced",
      "2 cups broccoli florets",
      "2 cloves garlic, minced",
      "3 tbsp soy sauce",
      "1 tbsp honey or brown sugar",
      "1 tsp sesame oil",
    ],
    method: [
      "Cook the noodles according to the package directions and drain.",
      "Whisk the soy sauce, honey, and sesame oil together.",
      "Heat the oil in a skillet or wok over medium-high heat.",
      "Cook the carrots, pepper, and broccoli for 4 to 5 minutes until crisp-tender.",
      "Add the garlic and cook for 30 seconds.",
      "Add the noodles and sauce, then toss until glossy and hot.",
    ],
    baseReward: 70,
    steps: [
      step.slice("Slice the Vegetables", {
        goal: 4,
        ingredientLabel: "Carrot and Pepper Prep",
        startColor: "#ffbe7a",
        endColor: "#ff8a8a",
      }),
      step.mix("Whisk the Sauce", "soy", 80, "Circle the spoon until the sauce becomes smooth."),
      step.season("Shake in Garlic", "Garlic", 4, "Tap the shaker and land inside the pink heart zone."),
      step.heat("Finish the Stir-Fry", 100, "Keep the wok in the center band until the stir-fry is ready."),
    ],
  },
  {
    id: "cookies",
    name: "Chocolate Chip Cookies",
    difficulty: "Easy",
    requiredPoints: 0,
    servings: "Makes about 24 cookies",
    summary:
      "Classic chocolate chip cookies with soft centers, crisp edges, and lots of chocolate.",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp kosher salt",
      "1 cup unsalted butter, softened",
      "3/4 cup brown sugar",
      "1/2 cup granulated sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    method: [
      "Heat the oven to 350 F and line two baking sheets with parchment.",
      "Whisk the flour, baking soda, and salt together.",
      "Beat the butter and both sugars until fluffy.",
      "Beat in the eggs and vanilla.",
      "Mix in the dry ingredients, then fold in the chocolate chips.",
      "Scoop onto the trays and bake for 10 to 12 minutes until golden at the edges.",
    ],
    baseReward: 75,
    steps: [
      step.mix("Cream Butter and Sugar", "cookie-dough", 90, "Stir smooth circles until the dough turns fluffy."),
      step.season("Fold in the Chocolate Chips", "Chocolate Chips", 4, "Add the chocolate chips without overfilling the bowl."),
      step.portion("Scoop the Cookie Dough", "Dough", 10, "Tap each tray spot to portion the cookie dough."),
      step.heat("Bake the Cookies", 100, "Hold the oven in the sweet spot for chewy centers and crisp edges."),
    ],
  },
  {
    id: "brownies",
    name: "Fudgy Brownies",
    difficulty: "Easy",
    requiredPoints: 170,
    servings: "Makes 16 squares",
    summary:
      "Dense, chewy brownies with a shiny top and deep chocolate flavor.",
    ingredients: [
      "10 tbsp unsalted butter, melted",
      "1 1/4 cups granulated sugar",
      "3/4 cup unsweetened cocoa powder",
      "2 large eggs",
      "1 tsp vanilla extract",
      "1/2 cup all-purpose flour",
      "1/2 tsp kosher salt",
      "1/2 cup chopped dark chocolate",
    ],
    method: [
      "Heat the oven to 350 F and line an 8-inch square pan with parchment.",
      "Whisk the melted butter, sugar, and cocoa until smooth.",
      "Whisk in the eggs one at a time and add the vanilla.",
      "Fold in the flour, salt, and chopped chocolate just until combined.",
      "Spread the batter in the pan.",
      "Bake for 24 to 28 minutes, then cool before slicing.",
    ],
    baseReward: 88,
    steps: [
      step.heat("Melt the Butter", 90, "Keep the butter warm, not scorched."),
      step.mix("Whisk the Brownie Base", "chocolate", 85, "Whisk until the cocoa and sugar look glossy."),
      step.season("Add the Chopped Chocolate", "Chocolate", 4, "Tap in the chopped chocolate and hit the heart zone."),
      step.portion("Spread the Batter", "Batter", 8, "Fill every part of the pan with even brownie batter."),
      step.heat("Bake the Brownies", 100, "Keep the oven steady so the brownies stay fudgy in the center."),
    ],
  },
  {
    id: "tomato-soup",
    name: "Tomato Basil Soup",
    difficulty: "Medium",
    requiredPoints: 340,
    servings: "Serves 4",
    summary:
      "A smooth tomato soup with onion, garlic, cream, and fresh basil.",
    ingredients: [
      "2 tbsp olive oil",
      "1 yellow onion, diced",
      "3 cloves garlic, minced",
      "2 cans crushed tomatoes",
      "2 cups vegetable or chicken stock",
      "1 tsp sugar",
      "1/2 cup heavy cream",
      "1/4 cup basil leaves",
      "Salt and black pepper",
    ],
    method: [
      "Heat the oil in a pot over medium heat.",
      "Cook the onion for 6 to 8 minutes until soft and add the garlic for 30 seconds.",
      "Stir in the tomatoes, stock, and sugar.",
      "Simmer for 15 minutes.",
      "Blend until smooth, then stir in the cream and basil.",
      "Season with salt and pepper and serve hot.",
    ],
    baseReward: 110,
    steps: [
      step.slice("Dice the Onion", {
        goal: 4,
        ingredientLabel: "Onion Prep",
        startColor: "#f0d9a8",
        endColor: "#f6b1c3",
      }),
      step.slice("Slice the Basil", {
        goal: 4,
        ingredientLabel: "Basil Prep",
        startColor: "#9fd89f",
        endColor: "#79c98b",
      }),
      step.heat("Soften the Aromatics", 100, "Keep the pot warm enough to soften the onion without browning it."),
      step.season("Balance the Soup", "Seasoning", 5, "Shake in the seasoning until the flavor meter lands inside the heart."),
      step.mix("Blend the Soup", "tomato", 90, "Move in smooth circles until the soup turns silky."),
      step.plate("Serve the Bowls", "Soup", 6, "Tap the glowing bowl spots in order to serve the soup."),
    ],
  },
  {
    id: "cake",
    name: "Vanilla Celebration Cake",
    difficulty: "Medium",
    requiredPoints: 560,
    servings: "Serves 10",
    summary:
      "A soft vanilla layer cake with a smooth buttercream frosting and sweet finishing sprinkles.",
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "2 tsp baking powder",
      "1/2 tsp kosher salt",
      "3/4 cup unsalted butter, softened",
      "1 3/4 cups sugar",
      "4 large eggs",
      "1 tbsp vanilla extract",
      "1 cup milk",
      "3 cups powdered sugar",
      "2 tbsp cream or milk",
    ],
    method: [
      "Heat the oven to 350 F and grease two 8-inch cake pans.",
      "Whisk the flour, baking powder, and salt together.",
      "Beat the butter and sugar until pale and fluffy.",
      "Beat in the eggs and vanilla.",
      "Mix in the dry ingredients alternating with the milk.",
      "Divide the batter between the pans and bake for 28 to 32 minutes.",
      "Cool the cakes, then beat butter, powdered sugar, vanilla, and cream into frosting and decorate.",
    ],
    baseReward: 128,
    steps: [
      step.mix("Whisk the Dry Mix", "vanilla", 80, "Gently whisk the dry ingredients together."),
      step.mix("Make the Cake Batter", "vanilla", 95, "Blend until the batter looks smooth and fluffy."),
      step.portion("Fill the Cake Pans", "Batter", 8, "Fill both pans evenly so the layers rise the same."),
      step.heat("Bake the Cake Layers", 100, "Keep the oven stable for a soft crumb."),
      step.pipe("Pipe the Frosting Border", 12, "Drag over each frosting dot around the cake edge."),
      step.season("Add Rainbow Sprinkles", "Sprinkles", 5, "Tap the shaker until the sprinkle meter lands right in the heart zone."),
    ],
  },
  {
    id: "nuggets",
    name: "Chicken Nuggets",
    difficulty: "Medium",
    requiredPoints: 780,
    servings: "Serves 4",
    summary:
      "Crunchy homemade nuggets coated in flour, egg, and breadcrumbs.",
    ingredients: [
      "1 lb boneless skinless chicken breast",
      "1 cup all-purpose flour",
      "2 eggs, beaten",
      "1 1/2 cups breadcrumbs",
      "1 tsp paprika",
      "1 tsp garlic powder",
      "Salt and black pepper",
      "Oil for frying or baking spray for oven baking",
    ],
    method: [
      "Cut the chicken into bite-size pieces and season with salt, pepper, paprika, and garlic powder.",
      "Set up bowls with flour, beaten eggs, and breadcrumbs.",
      "Coat the chicken in flour, then egg, then breadcrumbs.",
      "Fry in 350 F oil for 4 to 5 minutes or bake at 425 F until cooked through.",
      "Cook until the chicken reaches 165 F inside.",
      "Serve hot with dipping sauce.",
    ],
    baseReward: 138,
    steps: [
      step.slice("Slice the Chicken", {
        goal: 4,
        ingredientLabel: "Chicken Prep",
        appearance: "chicken",
        startColor: "#ffd4ba",
        endColor: "#f0ad8c",
      }),
      step.season("Season the Chicken", "Spices", 5, "Tap until the spice mix lands inside the sweet heart zone."),
      step.dredge("Coat the Nuggets", 3, "Drag each piece through flour, egg, and breadcrumbs."),
      step.portion("Arrange on the Tray", "Nuggets", 8, "Fill each tray spot with one coated nugget."),
      step.heat("Cook the Nuggets", 100, "Keep the oil or oven temperature steady."),
      step.plate("Serve with Sauce", "Nuggets", 6, "Tap the serving spots in order for a neat plate."),
    ],
  },
  {
    id: "carbonara",
    name: "Spaghetti Carbonara",
    difficulty: "Hard",
    requiredPoints: 1080,
    servings: "Serves 4",
    summary:
      "A halal-friendly carbonara-style pasta with spaghetti, chicken, eggs, cheese, and black pepper.",
    ingredients: [
      "12 oz spaghetti",
      "2 boneless skinless chicken thighs or 1 chicken breast, diced small",
      "1 tbsp olive oil",
      "2 large eggs",
      "2 egg yolks",
      "1 cup finely grated Pecorino Romano",
      "1 tsp freshly ground black pepper",
      "Salt for the pasta water",
    ],
    method: [
      "Boil the spaghetti in salted water until al dente.",
      "Heat the olive oil in a skillet over medium heat and cook the chicken until browned and fully cooked.",
      "Whisk the eggs, yolks, Pecorino, and black pepper.",
      "Reserve some pasta water and drain the spaghetti.",
      "Toss the hot pasta with the cooked chicken and remove the pan from the heat.",
      "Stir in the egg mixture, loosening with pasta water until glossy and creamy.",
    ],
    baseReward: 165,
    steps: [
      step.heat("Boil the Pasta Water", 95, "Hold the burner in the sweet spot for rolling pasta water."),
      step.slice("Dice the Chicken", {
        goal: 5,
        ingredientLabel: "Chicken Prep",
        appearance: "chicken",
        startColor: "#ffd4ba",
        endColor: "#f0ad8c",
      }),
      step.heat("Cook the Chicken", 100, "Keep the pan hot enough to cook the chicken through without drying it out."),
      step.mix("Whisk the Egg Sauce", "carbonara", 95, "Whisk until the eggs and cheese turn smooth and creamy."),
      step.season("Rain in Pecorino", "Pecorino", 5, "Tap until the cheese lands right in the heart zone."),
      step.heat("Toss the Pasta Off Heat", 100, "Stay in the warm zone so the sauce coats the pasta without scrambling."),
      step.plate("Twirl the Pasta", "Carbonara", 7, "Tap the serving spots in order to build a clean nest of pasta."),
      step.season("Finish with Black Pepper", "Pepper", 5, "Tap the grinder until the pepper lands in the sweet spot."),
    ],
  },
  {
    id: "muffins",
    name: "Blueberry Muffins",
    difficulty: "Hard",
    requiredPoints: 1380,
    servings: "Makes 12 muffins",
    summary:
      "Tender blueberry muffins with a high rise and a little sugar on top.",
    ingredients: [
      "2 cups all-purpose flour",
      "3/4 cup sugar",
      "2 tsp baking powder",
      "1/2 tsp kosher salt",
      "1/2 cup unsalted butter, melted",
      "2 eggs",
      "3/4 cup milk",
      "1 tsp vanilla extract",
      "1 1/2 cups blueberries",
    ],
    method: [
      "Heat the oven to 375 F and line a 12-cup muffin tin.",
      "Whisk the flour, sugar, baking powder, and salt together.",
      "Whisk the butter, eggs, milk, and vanilla separately.",
      "Mix the wet ingredients into the dry ingredients and fold in the blueberries.",
      "Divide the batter among the muffin cups.",
      "Bake for 18 to 22 minutes until golden and springy.",
    ],
    baseReward: 170,
    steps: [
      step.mix("Whisk the Dry Ingredients", "muffin", 80, "Gently whisk the dry ingredients together."),
      step.mix("Whisk the Wet Ingredients", "vanilla", 80, "Blend the wet ingredients until smooth."),
      step.mix("Combine the Batter", "muffin", 90, "Stir until the batter is just combined."),
      step.season("Fold in the Blueberries", "Blueberries", 5, "Tap until the berry meter lands in the pink heart."),
      step.portion("Fill the Muffin Tin", "Batter", 12, "Fill each muffin cup with batter."),
      step.season("Add the Sugar Tops", "Sugar", 5, "Add just enough sugar for sparkling muffin tops."),
      step.heat("Bake the Muffins", 100, "Keep the oven steady so the muffins rise evenly."),
      step.plate("Cool and Serve", "Muffins", 6, "Tap the cooling rack spots in order to serve the muffins."),
    ],
  },
  {
    id: "sourdough",
    name: "Sourdough Loaf",
    difficulty: "Hard",
    requiredPoints: 1760,
    servings: "Makes 1 loaf",
    summary:
      "A classic sourdough loaf with an open crumb, crisp crust, and deep flavor.",
    ingredients: [
      "100 g active sourdough starter",
      "375 g warm water",
      "500 g bread flour",
      "10 g fine sea salt",
      "Rice flour or extra flour for dusting",
    ],
    method: [
      "Mix the starter and water, then add the flour and salt until no dry spots remain.",
      "Rest the dough for 30 minutes and perform a set of stretches and folds.",
      "Repeat folds every 30 minutes for about 2 hours.",
      "Let the dough rise until airy, then shape it into a round loaf.",
      "Proof in a floured banneton or bowl overnight in the refrigerator.",
      "Score the top and bake in a preheated Dutch oven at 450 F for 20 minutes covered and 20 to 25 minutes uncovered.",
    ],
    baseReward: 190,
    steps: [
      step.mix("Wake the Starter", "vanilla", 75, "Stir the starter and water until fully blended."),
      step.mix("Mix the Dough", "cookie-dough", 90, "Keep stirring until the flour disappears into the dough."),
      step.knead("Stretch and Fold Round 1", 8, "Drag left and right. Every reversal counts as a fold."),
      step.knead("Stretch and Fold Round 2", 8, "Keep building strength in the dough."),
      step.portion("Shape the Loaf", "Loaf", 6, "Fill each shaping point until the dough looks round and tight."),
      step.season("Dust with Flour", "Flour", 5, "Tap the flour shaker until the loaf is lightly dusted."),
      step.slice("Score the Loaf", {
        goal: 4,
        ingredientLabel: "Loaf Scoring",
        appearance: "loaf",
        startColor: "#e4c28e",
        endColor: "#ca965e",
        diagonal: true,
        instruction: "Make easy diagonal swipes across the glowing scoring guides.",
      }),
      step.heat("Bake the Bread", 105, "Keep the oven hot and steady for a strong oven spring."),
    ],
  },
];

const ui = {
  playButton: document.querySelector("#playButton"),
  pointsTotal: document.querySelector("#pointsTotal"),
  unlockStatus: document.querySelector("#unlockStatus"),
  selectedRecipeName: document.querySelector("#selectedRecipeName"),
  unlockedCount: document.querySelector("#unlockedCount"),
  stepName: document.querySelector("#stepName"),
  scoreValue: document.querySelector("#scoreValue"),
  progressValue: document.querySelector("#progressValue"),
  progressBar: document.querySelector("#progressBar"),
  instructionText: document.querySelector("#instructionText"),
  recipeTitle: document.querySelector("#recipeTitle"),
  recipeMeta: document.querySelector("#recipeMeta"),
  recipeSummary: document.querySelector("#recipeSummary"),
  ingredientsList: document.querySelector("#ingredientsList"),
  methodList: document.querySelector("#methodList"),
  gameArena: document.querySelector("#gameArena"),
  recipeGrid: document.querySelector("#recipeGrid"),
  mascotLine: document.querySelector("#mascotLine"),
};

const state = {
  selectedRecipeId: recipes[0].id,
  totalPoints: 0,
  runScore: 0,
  activeRecipe: null,
  activeStepIndex: -1,
  stepRatings: [],
  cleanups: [],
  isPlaying: false,
  progress: { bestScores: {} },
  stepResolved: false,
};

init();

function init() {
  hydrateProgress();
  installMobileTapGuard();
  const firstUnlocked = recipes.find((recipe) => isUnlocked(recipe));
  if (firstUnlocked) {
    state.selectedRecipeId = firstUnlocked.id;
  }
  ui.playButton.addEventListener("click", handlePlayClick);
  renderRecipeGrid();
  renderSelectedRecipe();
  renderIdleArena();
  updateHeader();
  updateRunStatus();
}

function hydrateProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    state.totalPoints = Number(parsed.totalPoints) || 0;
    state.progress.bestScores = parsed.bestScores || {};
  } catch {
    state.totalPoints = 0;
    state.progress.bestScores = {};
  }
}

function persistProgress() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        totalPoints: state.totalPoints,
        bestScores: state.progress.bestScores,
      }),
    );
  } catch {
    // Ignore storage failures and keep the prototype playable.
  }
}

function installMobileTapGuard() {
  let lastTouchEnd = 0;
  const interactiveSelector =
    "button, a, input, textarea, select, summary, label, [role='button'], .primary-button, .secondary-button, .recipe-select, .tray-slot, .serve-point, .drag-piece";

  document.addEventListener(
    "touchend",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".page-shell")) {
        return;
      }
      if (target.closest(interactiveSelector)) {
        return;
      }

      const now = Date.now();
      if (now - lastTouchEnd < 320) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false },
  );
}

function handlePlayClick() {
  const recipe = getSelectedRecipe();
  if (!recipe || !isUnlocked(recipe) || state.isPlaying) {
    return;
  }
  startRecipe(recipe);
}

function startRecipe(recipe) {
  cleanupStep();
  state.isPlaying = true;
  state.activeRecipe = recipe;
  state.activeStepIndex = -1;
  state.runScore = 0;
  state.stepRatings = [];
  state.stepResolved = false;
  ui.playButton.disabled = true;
  updateRunStatus();
  runNextStep();
}

function runNextStep() {
  cleanupStep();
  state.stepResolved = false;
  state.activeStepIndex += 1;

  const currentStep = state.activeRecipe.steps[state.activeStepIndex];
  if (!currentStep) {
    finishRecipe();
    return;
  }

  ui.stepName.textContent = currentStep.name;
  ui.instructionText.textContent = currentStep.instruction;
  updateRecipeProgress(0);

  const completeStep = (quality) => {
    if (state.stepResolved) {
      return;
    }
    state.stepResolved = true;
    state.stepRatings[state.activeStepIndex] = clamp(quality, 0, 1);
    updateRecipeProgress(1);
    cleanupStep();
    window.setTimeout(runNextStep, 320);
  };

  renderStep(currentStep, completeStep);
}

function finishRecipe() {
  cleanupStep();
  state.isPlaying = false;
  ui.playButton.disabled = false;
  ui.stepName.textContent = "Recipe Complete";

  const averageQuality =
    state.stepRatings.reduce((sum, value) => sum + value, 0) /
    Math.max(1, state.stepRatings.length);
  const stars = averageQuality >= 0.9 ? 3 : averageQuality >= 0.7 ? 2 : 1;
  const earnedPoints =
    state.activeRecipe.baseReward +
    Math.round(state.runScore * 0.2) +
    stars * 20 +
    state.activeRecipe.steps.length * 6;

  state.totalPoints += earnedPoints;
  state.progress.bestScores[state.activeRecipe.id] = Math.max(
    state.progress.bestScores[state.activeRecipe.id] || 0,
    state.runScore,
  );
  persistProgress();
  renderRecipeGrid();
  renderSelectedRecipe();
  updateHeader();
  updateRunStatus();
  showResults(stars, earnedPoints, averageQuality);
}

function renderStep(currentStep, completeStep) {
  if (currentStep.type === "slice") {
    renderSliceGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "mix") {
    renderMixGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "heat") {
    renderHeatGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "portion") {
    renderPortionGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "season") {
    renderSeasonGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "plate") {
    renderPlateGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "dredge") {
    renderDredgeGame(currentStep, completeStep);
    return;
  }
  if (currentStep.type === "pipe") {
    renderPipeGame(currentStep, completeStep);
    return;
  }
  renderKneadGame(currentStep, completeStep);
}

function renderSliceGame(currentStep, completeStep) {
  const guides = createGuidePositions(currentStep.goal, currentStep.diagonal);
  const segments = Array.from({ length: currentStep.goal + 1 }, (_, index) => {
    const left = (index / (currentStep.goal + 1)) * 100;
    const width = 100 / (currentStep.goal + 1);
    return `<div class="ingredient-segment" data-segment="${index}" style="left:${left}%;width:${width}%;"></div>`;
  }).join("");

  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">${currentStep.ingredientLabel}</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="slice-board">
        <div
          id="ingredientField"
          class="ingredient-field appearance-${currentStep.appearance}${currentStep.appearance === "loaf" ? " loaf" : ""}"
          style="--ingredient-start:${currentStep.startColor};--ingredient-end:${currentStep.endColor};"
        >
          ${segments}
          ${guides
            .map((guide, index) =>
              currentStep.diagonal
                ? `<div class="slice-guide diagonal" data-guide="${index}" style="left:${guide.x}%;top:${guide.y}%;transform:rotate(40deg);"></div>`
                : `<div class="slice-guide" data-guide="${index}" style="left:${guide.x}%;"></div>`,
            )
            .join("")}
        </div>
        <div id="knifeTrail" class="knife-trail"></div>
        <div class="mini-counter"><span id="sliceCount">0</span><span>/ ${currentStep.goal} cuts</span></div>
      </div>
    </div>
  `;

  const field = document.querySelector("#ingredientField");
  const knifeTrail = document.querySelector("#knifeTrail");
  const sliceCount = document.querySelector("#sliceCount");
  const guideEls = Array.from(document.querySelectorAll(".slice-guide"));
  const segmentEls = Array.from(document.querySelectorAll(".ingredient-segment"));
  let cuts = 0;
  let gesture = null;

  const ratio = () => cuts / currentStep.goal;

  const markCut = (guideIndex) => {
    const guide = guideEls[guideIndex];
    if (!guide || guide.classList.contains("done")) {
      return;
    }
    guide.classList.add("done");
    cuts += 1;
    sliceCount.textContent = String(cuts);
    addRunScore(34);
    const leftSegment = segmentEls[guideIndex];
    const rightSegment = segmentEls[guideIndex + 1];
    if (leftSegment) {
      leftSegment.classList.add(guideIndex % 2 === 0 ? "cut-left" : "cut-right");
    }
    if (rightSegment) {
      rightSegment.classList.add(guideIndex % 2 === 0 ? "cut-right" : "cut-left");
    }
    updateRecipeProgress(ratio());
    if (cuts >= currentStep.goal) {
      completeStep(ratio());
    }
  };

  const distancePointToSegment = (point, a, b) => {
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const lengthSq = abx * abx + aby * aby || 1;
    const t = clamp(((point.x - a.x) * abx + (point.y - a.y) * aby) / lengthSq, 0, 1);
    const projection = { x: a.x + abx * t, y: a.y + aby * t };
    return Math.hypot(point.x - projection.x, point.y - projection.y);
  };

  const evaluateGesture = (startPoint, endPoint) => {
    const rect = field.getBoundingClientRect();
    const start = { x: startPoint.x - rect.left, y: startPoint.y - rect.top };
    const end = { x: endPoint.x - rect.left, y: endPoint.y - rect.top };
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const swipeDistance = Math.hypot(dx, dy);

    if (!currentStep.diagonal) {
      if (swipeDistance < 24 || Math.abs(dy) < 16) {
        return;
      }
      const minX = Math.min(start.x, end.x) - 44;
      const maxX = Math.max(start.x, end.x) + 44;
      guides.forEach((guide, index) => {
        const guideEl = guideEls[index];
        const targetX = (guide.x / 100) * rect.width;
        if (!guideEl.classList.contains("done") && targetX >= minX && targetX <= maxX) {
          markCut(index);
        }
      });
      return;
    }

    if (swipeDistance < 28) {
      return;
    }
    guides.forEach((guide, index) => {
      const guideEl = guideEls[index];
      const point = {
        x: (guide.x / 100) * rect.width,
        y: (guide.y / 100) * rect.height,
      };
      if (!guideEl.classList.contains("done") && distancePointToSegment(point, start, end) < 42) {
        markCut(index);
      }
    });
  };

  const showKnifeTrail = (startPoint, endPoint) => {
    const arenaRect = ui.gameArena.getBoundingClientRect();
    const a = { x: startPoint.x - arenaRect.left, y: startPoint.y - arenaRect.top };
    const b = { x: endPoint.x - arenaRect.left, y: endPoint.y - arenaRect.top };
    const centerX = (a.x + b.x) / 2;
    const centerY = (a.y + b.y) / 2;
    knifeTrail.style.left = `${centerX - 42}px`;
    knifeTrail.style.top = `${centerY - 6}px`;
    knifeTrail.style.width = `${Math.min(120, Math.hypot(b.x - a.x, b.y - a.y))}px`;
    knifeTrail.style.opacity = "1";
    knifeTrail.style.transform = `rotate(${Math.atan2(b.y - a.y, b.x - a.x)}rad)`;
    window.setTimeout(() => {
      knifeTrail.style.opacity = "0";
    }, 140);
  };

  const pointerDown = (event) => {
    event.preventDefault();
    gesture = {
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      pointerId: event.pointerId,
    };
    field.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!gesture || event.pointerId !== gesture.pointerId) {
      return;
    }
    event.preventDefault();
    const rect = ui.gameArena.getBoundingClientRect();
    knifeTrail.style.left = `${event.clientX - rect.left - 36}px`;
    knifeTrail.style.top = `${event.clientY - rect.top - 6}px`;
    knifeTrail.style.width = "72px";
    knifeTrail.style.opacity = "0.55";
    knifeTrail.style.transform = "rotate(100deg)";
    evaluateGesture(
      { x: gesture.lastX, y: gesture.lastY },
      { x: event.clientX, y: event.clientY },
    );
    gesture.lastX = event.clientX;
    gesture.lastY = event.clientY;
  };

  const pointerUp = (event) => {
    if (!gesture || event.pointerId !== gesture.pointerId) {
      return;
    }
    event.preventDefault();
    const startPoint = { x: gesture.x, y: gesture.y };
    const endPoint = { x: event.clientX, y: event.clientY };
    showKnifeTrail(startPoint, endPoint);
    evaluateGesture(startPoint, endPoint);
    if (field.hasPointerCapture(event.pointerId)) {
      field.releasePointerCapture(event.pointerId);
    }
    gesture = null;
  };

  field.addEventListener("pointerdown", pointerDown);
  field.addEventListener("pointermove", pointerMove);
  field.addEventListener("pointerup", pointerUp);
  field.addEventListener("pointercancel", pointerUp);

  state.cleanups.push(() => field.removeEventListener("pointerdown", pointerDown));
  state.cleanups.push(() => field.removeEventListener("pointermove", pointerMove));
  state.cleanups.push(() => field.removeEventListener("pointerup", pointerUp));
  state.cleanups.push(() => field.removeEventListener("pointercancel", pointerUp));
}

function renderMixGame(currentStep, completeStep) {
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Mixing Bowl</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="mix-stage">
        <div id="mixBowl" class="mix-bowl">
          <div id="mixtureSurface" class="mixture-surface" style="--mix-gradient:${getMixGradient(currentStep.theme)};"></div>
          <div id="spoon" class="spoon"></div>
        </div>
        <div class="mini-counter"><span id="mixCount">0</span><span>/ ${currentStep.goal}</span></div>
      </div>
    </div>
  `;

  const bowl = document.querySelector("#mixBowl");
  const spoon = document.querySelector("#spoon");
  const surface = document.querySelector("#mixtureSurface");
  const mixCount = document.querySelector("#mixCount");
  let progress = 0;
  let active = false;
  let lastPoint = null;

  const ratio = () => progress / currentStep.goal;

  const sync = (point) => {
    const rect = bowl.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(point.y - centerY, point.x - centerX);
    spoon.style.transform = `rotate(${angle}rad)`;
    surface.style.transform = `rotate(${angle * 0.4}rad) scale(${1 + progress / 420})`;
  };

  const pointerDown = (event) => {
    active = true;
    lastPoint = { x: event.clientX, y: event.clientY };
    bowl.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!active) {
      return;
    }
    const current = { x: event.clientX, y: event.clientY };
    const distance = Math.hypot(current.x - lastPoint.x, current.y - lastPoint.y);
    lastPoint = current;
    progress = clamp(progress + distance / 4, 0, currentStep.goal);
    mixCount.textContent = String(Math.floor(progress));
    addRunScore(Math.floor(distance / 3));
    updateRecipeProgress(ratio());
    sync({
      x: event.clientX - bowl.getBoundingClientRect().left,
      y: event.clientY - bowl.getBoundingClientRect().top,
    });
    if (progress >= currentStep.goal) {
      completeStep(ratio());
    }
  };

  const pointerUp = (event) => {
    active = false;
    if (bowl.hasPointerCapture(event.pointerId)) {
      bowl.releasePointerCapture(event.pointerId);
    }
  };

  bowl.addEventListener("pointerdown", pointerDown);
  bowl.addEventListener("pointermove", pointerMove);
  bowl.addEventListener("pointerup", pointerUp);
  bowl.addEventListener("pointercancel", pointerUp);

  state.cleanups.push(() => bowl.removeEventListener("pointerdown", pointerDown));
  state.cleanups.push(() => bowl.removeEventListener("pointermove", pointerMove));
  state.cleanups.push(() => bowl.removeEventListener("pointerup", pointerUp));
  state.cleanups.push(() => bowl.removeEventListener("pointercancel", pointerUp));
}

function renderHeatGame(currentStep, completeStep) {
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Heat Control</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="heat-stage">
        <div class="pan">
          <div class="pan-rim"></div>
          <div class="pan-core">
            <div id="steam" class="steam"></div>
          </div>
        </div>
        <div class="heat-ui">
          <div class="heat-meter">
            <div class="heat-zone"></div>
            <div id="heatNeedle" class="heat-needle"></div>
          </div>
          <div class="heat-buttons">
            <button id="coolButton" class="secondary-button">Cool Down</button>
            <button id="heatButton" class="primary-button">Turn Up Heat</button>
          </div>
          <div class="mini-counter"><span id="heatCount">0</span><span>/ ${currentStep.goal}</span></div>
        </div>
      </div>
    </div>
  `;

  const heatNeedle = document.querySelector("#heatNeedle");
  const steam = document.querySelector("#steam");
  const heatCount = document.querySelector("#heatCount");
  const heatButton = document.querySelector("#heatButton");
  const coolButton = document.querySelector("#coolButton");
  let heatLevel = 56;
  let stability = 0;

  const ratio = () => stability / currentStep.goal;

  const sync = () => {
    heatNeedle.style.top = `${210 - heatLevel * 1.8}px`;
    const inTarget = heatLevel >= 44 && heatLevel <= 68;
    steam.style.opacity = inTarget ? "0.92" : "0.25";
    steam.style.transform = `scale(${0.92 + heatLevel / 120})`;
  };

  const heatUp = () => {
    heatLevel = clamp(heatLevel + 9, 0, 100);
    sync();
  };

  const coolDown = () => {
    heatLevel = clamp(heatLevel - 9, 0, 100);
    sync();
  };

  const interval = window.setInterval(() => {
    heatLevel = clamp(heatLevel + (Math.random() * 8 - 4), 0, 100);
    const inTarget = heatLevel >= 44 && heatLevel <= 68;
    stability = clamp(stability + (inTarget ? 5 : -3), 0, currentStep.goal);
    heatCount.textContent = String(Math.round(stability));
    addRunScore(inTarget ? 8 : -3);
    updateRecipeProgress(ratio());
    sync();
    if (stability >= currentStep.goal) {
      completeStep(ratio());
    }
  }, 200);

  heatButton.addEventListener("click", heatUp);
  coolButton.addEventListener("click", coolDown);

  state.cleanups.push(() => window.clearInterval(interval));
  state.cleanups.push(() => heatButton.removeEventListener("click", heatUp));
  state.cleanups.push(() => coolButton.removeEventListener("click", coolDown));
  sync();
}

function renderPortionGame(currentStep, completeStep) {
  const isDough = /dough/i.test(currentStep.fillLabel);
  const isBatter = /batter/i.test(currentStep.fillLabel);
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Portion Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="portion-stage">
        <div id="trayGrid" class="tray-grid">
          ${Array.from(
            { length: currentStep.goal },
            (_, index) => `
              <button class="tray-slot${isDough ? " tray-slot-dough" : ""}${isBatter ? " tray-slot-batter" : ""}" data-slot="${index}" type="button">
                <span class="tray-slot-art${isDough ? " dough-art" : ""}${isBatter ? " batter-art" : ""}" aria-hidden="true"></span>
                <span class="tray-slot-label">${currentStep.fillLabel}</span>
              </button>`,
          ).join("")}
        </div>
        <div class="mini-counter"><span id="portionCount">0</span><span>/ ${currentStep.goal} filled</span></div>
      </div>
    </div>
  `;

  const trayGrid = document.querySelector("#trayGrid");
  const portionCount = document.querySelector("#portionCount");
  let filled = 0;

  const ratio = () => filled / currentStep.goal;

  const handleClick = (event) => {
    const slot = event.target.closest(".tray-slot");
    if (!slot || slot.classList.contains("filled")) {
      return;
    }
    slot.classList.add("filled");
    const label = slot.querySelector(".tray-slot-label");
    if (label) {
      label.textContent = "Filled";
    }
    filled += 1;
    portionCount.textContent = String(filled);
    addRunScore(22);
    updateRecipeProgress(ratio());
    if (filled >= currentStep.goal) {
      completeStep(ratio());
    }
  };

  trayGrid.addEventListener("click", handleClick);
  state.cleanups.push(() => trayGrid.removeEventListener("click", handleClick));
}

function renderSeasonGame(currentStep, completeStep) {
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Seasoning Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="season-stage">
        <div class="season-character">
          <div class="season-bowl"></div>
          <div id="sprinkleCloud" class="sprinkle-cloud"></div>
        </div>
        <div class="season-ui">
          <div class="season-meter">
            <div class="season-zone"></div>
            <div id="seasonFill" class="season-fill"></div>
          </div>
          <button id="seasonButton" class="primary-button">Shake ${currentStep.label}</button>
          <div class="mini-counter"><span id="seasonCount">0</span><span>/ ${currentStep.goal} perfect shakes</span></div>
        </div>
      </div>
    </div>
  `;

  const seasonButton = document.querySelector("#seasonButton");
  const seasonFill = document.querySelector("#seasonFill");
  const sprinkleCloud = document.querySelector("#sprinkleCloud");
  const seasonCount = document.querySelector("#seasonCount");
  let level = 12;
  let perfects = 0;

  const ratio = () => perfects / currentStep.goal;

  const sync = () => {
    seasonFill.style.height = `${level}%`;
  };

  const drift = window.setInterval(() => {
    level = clamp(level - 1.4, 0, 100);
    sync();
  }, 90);

  const handleShake = () => {
    level = clamp(level + 15, 0, 100);
    sprinkleCloud.classList.add("active");
    window.setTimeout(() => sprinkleCloud.classList.remove("active"), 160);
    if (level >= 42 && level <= 62) {
      perfects += 1;
      seasonCount.textContent = String(perfects);
      addRunScore(26);
      updateRecipeProgress(ratio());
      level = 10;
      if (perfects >= currentStep.goal) {
        completeStep(ratio());
        return;
      }
    } else {
      addRunScore(4);
    }
    sync();
  };

  seasonButton.addEventListener("click", handleShake);
  state.cleanups.push(() => window.clearInterval(drift));
  state.cleanups.push(() => seasonButton.removeEventListener("click", handleShake));
  sync();
}

function renderPlateGame(currentStep, completeStep) {
  const points = Array.from({ length: currentStep.goal }, (_, index) => {
    const angle = (Math.PI * 2 * index) / currentStep.goal - Math.PI / 2;
    const radius = 34;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    };
  });

  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Plating Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="plate-stage">
        <div id="servePlate" class="serve-plate">
          ${points.map((point, index) => `<button class="serve-point${index === 0 ? " active" : ""}" data-point="${index}" type="button" style="left:${point.x}%;top:${point.y}%;">${index + 1}</button>`).join("")}
        </div>
        <div class="mini-counter"><span id="plateCount">0</span><span>/ ${currentStep.goal} placed</span></div>
      </div>
    </div>
  `;

  const servePlate = document.querySelector("#servePlate");
  const plateCount = document.querySelector("#plateCount");
  const pointsEls = Array.from(document.querySelectorAll(".serve-point"));
  let nextPoint = 0;

  const ratio = () => nextPoint / currentStep.goal;

  const handleClick = (event) => {
    const target = event.target.closest(".serve-point");
    if (!target || Number(target.dataset.point) !== nextPoint) {
      return;
    }
    target.classList.remove("active");
    target.classList.add("done");
    nextPoint += 1;
    plateCount.textContent = String(nextPoint);
    addRunScore(20);
    updateRecipeProgress(ratio());
    if (pointsEls[nextPoint]) {
      pointsEls[nextPoint].classList.add("active");
    }
    if (nextPoint >= currentStep.goal) {
      completeStep(ratio());
    }
  };

  servePlate.addEventListener("click", handleClick);
  state.cleanups.push(() => servePlate.removeEventListener("click", handleClick));
}

function renderDredgeGame(currentStep, completeStep) {
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Coating Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="dredge-stage">
        <div class="dredge-lane">
          <div class="dredge-station" data-stage="1">
            <p class="detail-label">Flour</p>
            <div class="dredge-fill flour"></div>
          </div>
          <div class="dredge-station" data-stage="2">
            <p class="detail-label">Egg</p>
            <div class="dredge-fill egg"></div>
          </div>
          <div class="dredge-station" data-stage="3">
            <p class="detail-label">Breadcrumbs</p>
            <div class="dredge-fill crumbs"></div>
          </div>
        </div>
        <div id="dragTray" class="drag-tray">
          ${Array.from({ length: currentStep.goal }, (_, index) => `<div class="drag-piece" data-piece="${index}" data-stage="0" style="left:${24 + index * 104}px;top:44px;">${index + 1}</div>`).join("")}
        </div>
        <div class="mini-counter"><span id="dredgeCount">0</span><span>/ ${currentStep.goal} breaded</span></div>
      </div>
    </div>
  `;

  const tray = document.querySelector("#dragTray");
  const stations = Array.from(document.querySelectorAll(".dredge-station"));
  const pieces = Array.from(document.querySelectorAll(".drag-piece"));
  const dredgeCount = document.querySelector("#dredgeCount");
  let completed = 0;
  let active = null;

  const ratio = () => completed / currentStep.goal;

  const pointerDown = (event) => {
    const piece = event.target.closest(".drag-piece");
    if (!piece || Number(piece.dataset.stage) >= 3) {
      return;
    }
    const rect = piece.getBoundingClientRect();
    active = {
      piece,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    piece.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!active || event.pointerId !== active.pointerId) {
      return;
    }
    const trayRect = tray.getBoundingClientRect();
    active.piece.style.left = `${event.clientX - trayRect.left - active.offsetX}px`;
    active.piece.style.top = `${event.clientY - trayRect.top - active.offsetY}px`;
  };

  const pointerUp = (event) => {
    if (!active || event.pointerId !== active.pointerId) {
      return;
    }

    const nextStage = Number(active.piece.dataset.stage) + 1;
    const hitStation = stations.find((station) => {
      const rect = station.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    });

    if (hitStation && Number(hitStation.dataset.stage) === nextStage) {
      active.piece.dataset.stage = String(nextStage);
      active.piece.className = `drag-piece stage-${nextStage}`;
      addRunScore(24);
      if (nextStage === 3) {
        completed += 1;
        dredgeCount.textContent = String(completed);
        active.piece.textContent = "Done";
        updateRecipeProgress(ratio());
        if (completed >= currentStep.goal) {
          completeStep(ratio());
        }
      }
    }

    const index = Number(active.piece.dataset.piece);
    active.piece.style.left = `${24 + index * 104}px`;
    active.piece.style.top = "44px";
    if (active.piece.hasPointerCapture(event.pointerId)) {
      active.piece.releasePointerCapture(event.pointerId);
    }
    active = null;
  };

  pieces.forEach((piece) => {
    piece.addEventListener("pointerdown", pointerDown);
    piece.addEventListener("pointermove", pointerMove);
    piece.addEventListener("pointerup", pointerUp);
    piece.addEventListener("pointercancel", pointerUp);
    state.cleanups.push(() => piece.removeEventListener("pointerdown", pointerDown));
    state.cleanups.push(() => piece.removeEventListener("pointermove", pointerMove));
    state.cleanups.push(() => piece.removeEventListener("pointerup", pointerUp));
    state.cleanups.push(() => piece.removeEventListener("pointercancel", pointerUp));
  });
}

function renderPipeGame(currentStep, completeStep) {
  const points = Array.from({ length: currentStep.goal }, (_, index) => {
    const angle = (Math.PI * 2 * index) / currentStep.goal - Math.PI / 2;
    const radius = 34;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    };
  });

  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Decorating Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="pipe-stage">
        <div id="cakeBoard" class="cake-board">
          <div class="cake-body"></div>
          ${points.map((point, index) => `<div class="pipe-point" data-point="${index}" style="left:${point.x}%;top:${point.y}%;"></div>`).join("")}
          <div id="pipingBag" class="piping-bag"></div>
        </div>
        <div class="mini-counter"><span id="pipeCount">0</span><span>/ ${currentStep.goal} frosting points</span></div>
      </div>
    </div>
  `;

  const cakeBoard = document.querySelector("#cakeBoard");
  const pipingBag = document.querySelector("#pipingBag");
  const pipeCount = document.querySelector("#pipeCount");
  const pointEls = Array.from(document.querySelectorAll(".pipe-point"));
  let nextPoint = 0;
  let active = false;

  const ratio = () => nextPoint / currentStep.goal;

  const moveBag = (event) => {
    const rect = cakeBoard.getBoundingClientRect();
    pipingBag.style.left = `${event.clientX - rect.left - 30}px`;
    pipingBag.style.top = `${event.clientY - rect.top - 10}px`;
    pipingBag.style.transform = "rotate(-30deg)";
  };

  const pointerDown = (event) => {
    active = true;
    cakeBoard.setPointerCapture(event.pointerId);
    pipingBag.style.opacity = "1";
    moveBag(event);
  };

  const pointerMove = (event) => {
    if (!active) {
      return;
    }
    moveBag(event);
    const rect = cakeBoard.getBoundingClientRect();
    const target = pointEls[nextPoint];
    if (!target) {
      return;
    }
    const pointRect = target.getBoundingClientRect();
    const px = pointRect.left - rect.left + pointRect.width / 2;
    const py = pointRect.top - rect.top + pointRect.height / 2;
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;
    if (Math.hypot(px - cursorX, py - cursorY) < 28) {
      target.classList.add("done");
      nextPoint += 1;
      pipeCount.textContent = String(nextPoint);
      addRunScore(22);
      updateRecipeProgress(ratio());
      if (nextPoint >= currentStep.goal) {
        completeStep(ratio());
      }
    }
  };

  const pointerUp = (event) => {
    active = false;
    pipingBag.style.opacity = "0";
    if (cakeBoard.hasPointerCapture(event.pointerId)) {
      cakeBoard.releasePointerCapture(event.pointerId);
    }
  };

  cakeBoard.addEventListener("pointerdown", pointerDown);
  cakeBoard.addEventListener("pointermove", pointerMove);
  cakeBoard.addEventListener("pointerup", pointerUp);
  cakeBoard.addEventListener("pointercancel", pointerUp);

  state.cleanups.push(() => cakeBoard.removeEventListener("pointerdown", pointerDown));
  state.cleanups.push(() => cakeBoard.removeEventListener("pointermove", pointerMove));
  state.cleanups.push(() => cakeBoard.removeEventListener("pointerup", pointerUp));
  state.cleanups.push(() => cakeBoard.removeEventListener("pointercancel", pointerUp));
}

function renderKneadGame(currentStep, completeStep) {
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Bread Bench</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="knead-stage">
        <div class="knead-bench">
          <div class="fold-guide"></div>
          <div id="dough" class="dough"></div>
        </div>
        <div class="mini-counter"><span id="kneadCount">0</span><span>/ ${currentStep.goal} folds</span></div>
      </div>
    </div>
  `;

  const dough = document.querySelector("#dough");
  const kneadCount = document.querySelector("#kneadCount");
  let folds = 0;
  let active = false;
  let lastX = 0;
  let direction = 0;
  let travel = 0;

  const ratio = () => folds / currentStep.goal;

  const pointerDown = (event) => {
    active = true;
    lastX = event.clientX;
    direction = 0;
    travel = 0;
    dough.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (!active) {
      return;
    }
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    if (Math.abs(dx) < 2) {
      return;
    }
    const nextDirection = Math.sign(dx);
    travel += Math.abs(dx);
    dough.style.transform = `translate(-50%, -50%) scaleX(${1 + Math.abs(dx) / 80}) rotate(${dx / 30}deg)`;
    if (direction !== 0 && nextDirection !== direction && travel > 70) {
      folds += 1;
      kneadCount.textContent = String(folds);
      addRunScore(24);
      updateRecipeProgress(ratio());
      travel = 0;
      if (folds >= currentStep.goal) {
        completeStep(ratio());
      }
    }
    direction = nextDirection;
  };

  const pointerUp = (event) => {
    active = false;
    dough.style.transform = "translate(-50%, -50%)";
    if (dough.hasPointerCapture(event.pointerId)) {
      dough.releasePointerCapture(event.pointerId);
    }
  };

  dough.addEventListener("pointerdown", pointerDown);
  dough.addEventListener("pointermove", pointerMove);
  dough.addEventListener("pointerup", pointerUp);
  dough.addEventListener("pointercancel", pointerUp);

  state.cleanups.push(() => dough.removeEventListener("pointerdown", pointerDown));
  state.cleanups.push(() => dough.removeEventListener("pointermove", pointerMove));
  state.cleanups.push(() => dough.removeEventListener("pointerup", pointerUp));
  state.cleanups.push(() => dough.removeEventListener("pointercancel", pointerUp));
}

function showResults(stars, earnedPoints, averageQuality) {
  const recipe = state.activeRecipe;
  ui.gameArena.innerHTML = `
    <div class="results-card">
      <div class="results-plate">
        <div class="results-top">
          ${getMascotMarkup()}
          <div class="results-copy">
            <p class="arena-label">Service Complete</p>
            <h3>${recipe.name}</h3>
            <div class="result-stars" aria-label="Star rating">
              ${[0, 1, 2].map((index) => `<span class="star${index < stars ? " active" : ""}">★</span>`).join("")}
            </div>
            <p class="result-note">${getResultMessage(stars, averageQuality)}</p>
            <div class="result-stats">
              <span class="result-pill">Run Score: ${state.runScore}</span>
              <span class="result-pill">Earned: ${earnedPoints} pts</span>
              <span class="result-pill">${recipe.steps.length} mini-games cleared</span>
            </div>
          </div>
        </div>
      </div>
      <div class="recipe-reveal">
        <div class="recipe-reveal-head">
          <p class="card-label">Real Recipe</p>
          <h4>${recipe.name}</h4>
          <p class="recipe-meta">${recipe.difficulty} • ${recipe.servings}</p>
        </div>
        <div class="recipe-reveal-columns">
          <div>
            <p class="detail-label">Ingredients</p>
            <ul class="detail-list">${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div>
            <p class="detail-label">Method</p>
            <ol class="detail-list ordered">${recipe.method.map((item) => `<li>${item}</li>`).join("")}</ol>
          </div>
        </div>
      </div>
    </div>
  `;

  ui.instructionText.textContent =
    "Recipe complete. Read the full recipe here, then select another dish to keep unlocking more.";
}

function renderRecipeGrid() {
  ui.recipeGrid.innerHTML = recipes
    .map((recipe) => {
      const unlocked = isUnlocked(recipe);
      const selected = recipe.id === state.selectedRecipeId;
      const bestScore = state.progress.bestScores[recipe.id] || 0;
      return `
        <article class="recipe-card${selected ? " selected" : ""}${unlocked ? "" : " locked"}">
          <div class="recipe-card-top">
            <div>
              <p class="card-label">${recipe.servings}</p>
              <p class="recipe-card-title">${recipe.name}</p>
            </div>
            <span class="badge ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
          </div>
          <p>${recipe.summary}</p>
          <p class="small-meta">Unlock at ${recipe.requiredPoints} pts${bestScore ? ` • Best ${bestScore}` : ""}</p>
          <div class="recipe-card-footer">
            <span class="badge">${recipe.steps.length} mini-games</span>
            <button class="recipe-select" data-recipe-id="${recipe.id}" type="button">
              ${selected ? "Selected" : unlocked ? "Select" : "Preview"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  Array.from(ui.recipeGrid.querySelectorAll(".recipe-select")).forEach((button) => {
    button.disabled = state.isPlaying;
    button.addEventListener("click", () => {
      if (state.isPlaying) {
        return;
      }
      state.selectedRecipeId = button.dataset.recipeId;
      renderRecipeGrid();
      renderSelectedRecipe();
      renderIdleArena();
      updateHeader();
    });
  });
}

function renderSelectedRecipe() {
  const recipe = getSelectedRecipe();
  ui.recipeTitle.textContent = recipe.name;
  ui.recipeMeta.textContent = `${recipe.difficulty} • ${recipe.servings} • Unlock at ${recipe.requiredPoints} pts`;
  ui.recipeSummary.textContent = recipe.summary;
  ui.ingredientsList.innerHTML = recipe.ingredients.map((item) => `<li>${item}</li>`).join("");
  ui.methodList.innerHTML = recipe.method.map((item) => `<li>${item}</li>`).join("");
  ui.mascotLine.textContent = getMascotLine(recipe);
}

function renderIdleArena() {
  if (state.isPlaying) {
    return;
  }
  const recipe = getSelectedRecipe();
  const lockCopy = isUnlocked(recipe)
    ? "This recipe is ready to play."
    : `You can preview it now and unlock play at ${recipe.requiredPoints} kitchen points.`;
  ui.gameArena.innerHTML = `
    <div class="stage-copy">
      ${getMascotMarkup()}
      <p class="arena-label">Kitchen Station</p>
      <h3>${recipe.name}</h3>
      <p>${recipe.summary} ${lockCopy}</p>
      <div class="step-preview">
        ${recipe.steps.map((item) => `<span class="step-chip">${item.name}</span>`).join("")}
      </div>
    </div>
  `;
}

function updateHeader() {
  const unlockedCount = recipes.filter((recipe) => isUnlocked(recipe)).length;
  const nextRecipe = recipes.find((recipe) => !isUnlocked(recipe));
  const selectedRecipe = getSelectedRecipe();

  ui.pointsTotal.textContent = `${state.totalPoints} pts`;
  ui.selectedRecipeName.textContent = selectedRecipe.name;
  ui.unlockedCount.textContent = `${unlockedCount} / ${recipes.length}`;
  ui.unlockStatus.textContent = nextRecipe
    ? `${Math.max(0, nextRecipe.requiredPoints - state.totalPoints)} more points unlock ${nextRecipe.name}.`
    : "Every recipe is unlocked.";

  ui.playButton.disabled = state.isPlaying || !isUnlocked(selectedRecipe);
  ui.playButton.textContent = isUnlocked(selectedRecipe)
    ? "Cook Selected Recipe"
    : `Locked Until ${selectedRecipe.requiredPoints} pts`;
}

function updateRunStatus() {
  ui.scoreValue.textContent = String(state.runScore);
  if (!state.isPlaying) {
    ui.stepName.textContent = "Choose a recipe";
    ui.instructionText.textContent =
      "Pick a recipe in the cookbook, then press Cook Selected Recipe.";
    updateRecipeProgress(0);
  }
}

function updateRecipeProgress(stepFraction) {
  const totalSteps = state.activeRecipe ? state.activeRecipe.steps.length : 1;
  const completedSteps = Math.max(0, state.activeStepIndex);
  const progress = state.isPlaying
    ? ((completedSteps + stepFraction) / totalSteps) * 100
    : 0;
  ui.progressValue.textContent = `${Math.round(progress)}%`;
  ui.progressBar.style.width = `${progress}%`;
}

function addRunScore(delta) {
  state.runScore = Math.max(0, state.runScore + delta);
  ui.scoreValue.textContent = String(state.runScore);
}

function cleanupStep() {
  while (state.cleanups.length) {
    const cleanup = state.cleanups.pop();
    cleanup();
  }
}

function getSelectedRecipe() {
  return getRecipeById(state.selectedRecipeId);
}

function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

function isUnlocked(recipe) {
  return state.totalPoints >= recipe.requiredPoints;
}

function createGuidePositions(goal, diagonal) {
  return Array.from({ length: goal }, (_, index) => {
    if (!diagonal) {
      return { x: ((index + 1) / (goal + 1)) * 100, y: 50 };
    }
    return { x: 24 + index * 15, y: 30 + index * 10 };
  });
}

function getMixGradient(theme) {
  if (theme === "chocolate") {
    return "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 28%), conic-gradient(from 90deg, #5b3440, #85505f, #69404d, #5b3440)";
  }
  if (theme === "tomato") {
    return "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 28%), conic-gradient(from 90deg, #f38c8d, #ffb0a8, #ef7d7f, #f38c8d)";
  }
  if (theme === "soy") {
    return "radial-gradient(circle at top, rgba(255,255,255,0.16), transparent 28%), conic-gradient(from 90deg, #9f6e57, #c48e74, #a9735b, #9f6e57)";
  }
  if (theme === "carbonara") {
    return "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 28%), conic-gradient(from 90deg, #f7ddb0, #fff0cb, #efcf9a, #f7ddb0)";
  }
  if (theme === "muffin") {
    return "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 28%), conic-gradient(from 90deg, #c8b6ea, #e0cdf9, #cfaef1, #c8b6ea)";
  }
  if (theme === "cookie-dough") {
    return "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 28%), conic-gradient(from 90deg, #dbb18f, #f0cfaa, #d8ab87, #dbb18f)";
  }
  return "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 28%), conic-gradient(from 90deg, #f4d5d8, #ffe7eb, #efc1cb, #f4d5d8)";
}

function getMascotMarkup() {
  return `
    <div class="mascot-inline">
      <div class="mascot mascot-small">
        <div class="mascot-ear mascot-ear-left"></div>
        <div class="mascot-ear mascot-ear-right"></div>
        <div class="mascot-bow"></div>
        <div class="mascot-face">
          <span class="mascot-eye mascot-eye-left"></span>
          <span class="mascot-eye mascot-eye-right"></span>
          <span class="mascot-nose"></span>
          <span class="mascot-mouth"></span>
          <span class="mascot-blush mascot-blush-left"></span>
          <span class="mascot-blush mascot-blush-right"></span>
        </div>
        <div class="mascot-body"></div>
        <div class="mascot-arm mascot-arm-left"></div>
        <div class="mascot-arm mascot-arm-right"></div>
        <div class="mascot-tail"></div>
        <div class="mascot-whisk"></div>
      </div>
    </div>
  `;
}

function getMascotLine(recipe) {
  if (!isUnlocked(recipe)) {
    return `Ivy says: you can read ${recipe.name} now, then unlock the mini-games later at ${recipe.requiredPoints} points.`;
  }
  if (recipe.difficulty === "Hard") {
    return `Ivy says: ${recipe.name} is a long kitchen run, so pace yourself and stack points carefully.`;
  }
  if (recipe.difficulty === "Medium") {
    return `Ivy says: ${recipe.name} has more mini-games now, so each step matters more.`;
  }
  return `Ivy says: ${recipe.name} is a sweet starting point for building kitchen points.`;
}

function getResultMessage(stars, averageQuality) {
  if (stars === 3) {
    return "Ivy approves. That was clean, cute, and very well cooked.";
  }
  if (stars === 2) {
    return `Nice work. This run landed at ${Math.round(averageQuality * 100)}% quality, so there is still room to polish the technique.`;
  }
  return "You still finished the recipe. Replay it to smooth out the steps and collect more kitchen points.";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
