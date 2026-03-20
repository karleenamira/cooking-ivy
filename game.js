const STORAGE_KEY = "cooking-time-progress-v2";
const JELLY_GIFT_TARGET = 100000;
const EXPERIMENT_JELLYS = 0;
const EXPERIMENT_GRANT_VERSION = "reset-to-zero-v2";

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

const EASY_BONUS_RECIPE_DATA = [
  ["Peach Cream Toast", "toast", "Peach", "Cream", "Honey", "Mint"],
  ["Apple Cinnamon Toast", "toast", "Apple", "Cinnamon", "Maple", "Sugar"],
  ["Berry Jam Toast", "toast", "Berry", "Jam", "Butter", "Mint"],
  ["Banana Honey Toast", "toast", "Banana", "Honey", "Butter", "Sugar"],
  ["Tomato Cheese Toast", "toast", "Tomato", "Mozzarella", "Herbs", "Basil"],
  ["Corn Cup Salad", "salad", "Corn", "Cucumber", "Lime", "Parsley"],
  ["Mango Cucumber Cups", "salad", "Mango", "Cucumber", "Lime", "Mint"],
  ["Garden Pasta Cup", "salad", "Pasta", "Tomato", "Vinaigrette", "Parsley"],
  ["Melon Yogurt Cup", "salad", "Melon", "Yogurt", "Honey", "Granola"],
  ["Citrus Fruit Cups", "salad", "Orange", "Grapes", "Honey", "Mint"],
  ["Cheesy Egg Skillet", "skillet", "Egg", "Cheddar", "Butter", "Pepper"],
  ["Herb Egg Skillet", "skillet", "Egg", "Herbs", "Butter", "Pepper"],
  ["Sweet Corn Skillet", "skillet", "Corn", "Butter", "Cream", "Pepper"],
  ["Garlic Mushroom Skillet", "skillet", "Mushroom", "Garlic", "Butter", "Parsley"],
  ["Tomato Egg Skillet", "skillet", "Tomato", "Egg", "Butter", "Pepper"],
  ["Vanilla Smoothie Bowl", "bowl", "Vanilla Yogurt", "Banana", "Honey", "Granola"],
  ["Strawberry Smoothie Bowl", "bowl", "Strawberry Yogurt", "Berry", "Honey", "Granola"],
  ["Mango Smoothie Bowl", "bowl", "Mango Yogurt", "Mango", "Honey", "Coconut"],
  ["Peanut Banana Bowl", "bowl", "Banana", "Peanut Butter", "Honey", "Granola"],
  ["Blueberry Oat Bowl", "bowl", "Blueberry", "Oats", "Honey", "Cinnamon"],
  ["Warm Bean Dip", "dip", "White Beans", "Garlic", "Olive Oil", "Parsley"],
  ["Cheddar Corn Dip", "dip", "Cheddar", "Corn", "Milk", "Paprika"],
  ["Spinach Cheese Dip", "dip", "Spinach", "Cheese", "Cream", "Pepper"],
  ["Tomato Herb Dip", "dip", "Tomato", "Herbs", "Olive Oil", "Parmesan"],
  ["Sweet Pepper Dip", "dip", "Pepper", "Cheese", "Cream", "Paprika"],
  ["Mini Veggie Wraps", "wrap", "Veggie", "Cheese", "Sauce", "Herbs"],
  ["Chicken Snack Wraps", "wrap", "Chicken", "Lettuce", "Sauce", "Pepper"],
  ["Tuna Salad Wraps", "wrap", "Tuna", "Cucumber", "Mayo", "Herbs"],
  ["Turkey Cheese Wraps", "wrap", "Turkey", "Cheese", "Mustard", "Lettuce"],
  ["Crunchy Slaw Wraps", "wrap", "Slaw", "Carrot", "Dressing", "Sesame"],
  ["Mini Pancake Stack", "pancake", "Pancake", "Berry", "Syrup", "Sugar"],
  ["Lemon Pancake Stack", "pancake", "Pancake", "Lemon", "Syrup", "Sugar"],
  ["Chocolate Pancake Stack", "pancake", "Pancake", "Chocolate", "Syrup", "Sugar"],
  ["Maple Pancake Stack", "pancake", "Pancake", "Butter", "Maple", "Sugar"],
  ["Cherry Cream Toast", "toast", "Cherry", "Cream", "Honey", "Mint"],
  ["Pear Sugar Toast", "toast", "Pear", "Sugar", "Butter", "Cinnamon"],
  ["Coconut Fruit Cups", "salad", "Coconut", "Fruit", "Honey", "Mint"],
  ["Golden Oat Cups", "salad", "Oats", "Banana", "Honey", "Cinnamon"],
  ["Spinach Egg Skillet", "skillet", "Spinach", "Egg", "Butter", "Pepper"],
  ["Cheddar Tomato Skillet", "skillet", "Tomato", "Cheddar", "Butter", "Herbs"],
  ["Peach Yogurt Bowl", "bowl", "Peach Yogurt", "Peach", "Honey", "Granola"],
  ["Mocha Banana Bowl", "bowl", "Banana", "Chocolate", "Honey", "Cocoa"],
  ["Herb Cheese Dip", "dip", "Cheese", "Herbs", "Milk", "Pepper"],
  ["Roasted Pepper Dip", "dip", "Pepper", "Cheese", "Cream", "Paprika"],
  ["Ham Cheese Wraps", "wrap", "Ham", "Cheese", "Mustard", "Lettuce"],
  ["Apple Peanut Wraps", "wrap", "Apple", "Peanut Butter", "Honey", "Granola"],
  ["Berry Waffle Stack", "pancake", "Waffle", "Berry", "Syrup", "Sugar"],
  ["Honey Crepe Stack", "pancake", "Crepe", "Cream", "Honey", "Sugar"],
];

const MEDIUM_BONUS_RECIPE_DATA = [
  ["Roasted Pepper Pasta", "pasta", "Pepper", "Pasta", "Cream Sauce", "Parsley"],
  ["Lemon Herb Pasta", "pasta", "Lemon", "Pasta", "Butter Sauce", "Parmesan"],
  ["Creamy Spinach Pasta", "pasta", "Spinach", "Pasta", "Cream Sauce", "Parmesan"],
  ["Tomato Olive Pasta", "pasta", "Tomato", "Pasta", "Olive Sauce", "Basil"],
  ["Garlic Chicken Pasta", "pasta", "Chicken", "Pasta", "Garlic Sauce", "Parsley"],
  ["Sweet Corn Chowder", "soup", "Corn", "Potato", "Cream", "Chives"],
  ["Chicken Noodle Soup", "soup", "Chicken", "Noodles", "Broth", "Parsley"],
  ["Lemon Lentil Soup", "soup", "Lentils", "Lemon", "Broth", "Parsley"],
  ["Roasted Carrot Soup", "soup", "Carrot", "Cream", "Broth", "Pepper"],
  ["Broccoli Cheese Soup", "soup", "Broccoli", "Cheese", "Cream", "Pepper"],
  ["Teriyaki Rice Bowl", "rice", "Chicken", "Rice", "Teriyaki", "Sesame"],
  ["Sesame Veggie Bowl", "rice", "Vegetables", "Rice", "Sesame Sauce", "Scallions"],
  ["Curry Rice Bowl", "rice", "Chicken", "Rice", "Curry Sauce", "Parsley"],
  ["Sweet Chili Rice Bowl", "rice", "Chicken", "Rice", "Sweet Chili", "Sesame"],
  ["Garlic Butter Rice Bowl", "rice", "Shrimp", "Rice", "Butter Sauce", "Parsley"],
  ["Sheet Pan Fajitas", "traybake", "Chicken", "Peppers", "Seasoning", "Lime"],
  ["Herb Chicken Tray", "traybake", "Chicken", "Potatoes", "Herbs", "Pepper"],
  ["Sausage Veggie Tray", "traybake", "Sausage", "Vegetables", "Seasoning", "Parsley"],
  ["Maple Veggie Tray", "traybake", "Vegetables", "Sweet Potato", "Maple Glaze", "Pepper"],
  ["Honey Chicken Tray", "traybake", "Chicken", "Carrots", "Honey Glaze", "Parsley"],
  ["Street Taco Plate", "tacos", "Chicken", "Tortillas", "Salsa", "Cilantro"],
  ["Fish Taco Plate", "tacos", "Fish", "Tortillas", "Slaw", "Lime"],
  ["Bean Taco Plate", "tacos", "Beans", "Tortillas", "Salsa", "Cilantro"],
  ["Chipotle Taco Plate", "tacos", "Beef", "Tortillas", "Chipotle Sauce", "Lime"],
  ["Crunchy Taco Plate", "tacos", "Turkey", "Tortillas", "Cheese", "Lettuce"],
  ["Savory Udon Bowl", "noodle", "Udon", "Mushroom", "Soy Broth", "Scallions"],
  ["Sesame Noodle Bowl", "noodle", "Noodles", "Cucumber", "Sesame Sauce", "Sesame"],
  ["Spicy Garlic Noodles", "noodle", "Noodles", "Garlic", "Chili Sauce", "Scallions"],
  ["Coconut Curry Noodles", "noodle", "Noodles", "Vegetables", "Coconut Curry", "Lime"],
  ["Ginger Soy Noodles", "noodle", "Chicken", "Noodles", "Ginger Soy", "Scallions"],
  ["Cheesy Potato Bake", "bake", "Potato", "Cheese", "Cream", "Parsley"],
  ["Tomato Rice Bake", "bake", "Rice", "Tomato", "Cheese", "Basil"],
  ["Chicken Broccoli Bake", "bake", "Chicken", "Broccoli", "Cream", "Cheese"],
  ["Herb Veggie Bake", "bake", "Vegetables", "Rice", "Herb Sauce", "Parmesan"],
];

const HARD_BONUS_RECIPE_DATA = [
  ["Royal Berry Tart", "pastry", "Berries", "Custard", "Glaze", "Mint"],
  ["Pistachio Cream Tart", "pastry", "Pistachio", "Cream", "Glaze", "Sugar"],
  ["Lemon Meringue Tart", "pastry", "Lemon", "Cream", "Meringue", "Sugar"],
  ["Chocolate Silk Tart", "pastry", "Chocolate", "Cream", "Ganache", "Chocolate"],
  ["Peach Rose Tart", "pastry", "Peach", "Cream", "Honey", "Mint"],
  ["Festival Curry Feast", "curry", "Chicken", "Rice", "Curry Sauce", "Cilantro"],
  ["Golden Coconut Curry", "curry", "Shrimp", "Rice", "Coconut Curry", "Lime"],
  ["Spiced Veggie Curry", "curry", "Vegetables", "Rice", "Curry Sauce", "Parsley"],
  ["Butter Chicken Feast", "curry", "Chicken", "Rice", "Butter Curry", "Cilantro"],
  ["Midnight Beef Curry", "curry", "Beef", "Rice", "Dark Curry", "Sesame"],
  ["Braised Noodle Feast", "noodlefeast", "Beef", "Noodles", "Soy Sauce", "Scallions"],
  ["Garlic Shrimp Noodles", "noodlefeast", "Shrimp", "Noodles", "Garlic Sauce", "Parsley"],
  ["Chili Basil Noodles", "noodlefeast", "Chicken", "Noodles", "Chili Basil", "Mint"],
  ["Sesame Roast Noodles", "noodlefeast", "Duck", "Noodles", "Sesame Sauce", "Scallions"],
  ["Citrus Soy Noodles", "noodlefeast", "Salmon", "Noodles", "Citrus Soy", "Sesame"],
  ["Celebration Layer Cake", "layercake", "Vanilla", "Cream", "Frosting", "Sprinkles"],
  ["Midnight Cocoa Cake", "layercake", "Chocolate", "Cream", "Frosting", "Chocolate"],
  ["Strawberry Ribbon Cake", "layercake", "Strawberry", "Cream", "Frosting", "Berries"],
  ["Honey Citrus Cake", "layercake", "Citrus", "Cream", "Frosting", "Sugar"],
  ["Pistachio Velvet Cake", "layercake", "Pistachio", "Cream", "Frosting", "Pistachio"],
  ["Stuffed Pepper Bake", "stuffed", "Pepper", "Rice", "Tomato Sauce", "Parsley"],
  ["Stuffed Tomato Bake", "stuffed", "Tomato", "Rice", "Herb Sauce", "Parmesan"],
  ["Stuffed Squash Bake", "stuffed", "Squash", "Rice", "Butter Sauce", "Pepper"],
  ["Stuffed Mushroom Tray", "stuffed", "Mushroom", "Cheese", "Herb Sauce", "Parsley"],
  ["Stuffed Onion Roast", "stuffed", "Onion", "Rice", "Broth", "Parsley"],
  ["Grand Feast Platter", "feast", "Chicken", "Potatoes", "Pan Sauce", "Herbs"],
  ["Harvest Roast Platter", "feast", "Turkey", "Vegetables", "Gravy", "Parsley"],
  ["Glazed Roast Platter", "feast", "Beef", "Carrots", "Glaze", "Pepper"],
  ["Garden Feast Platter", "feast", "Vegetables", "Potatoes", "Herb Butter", "Parsley"],
  ["Maple Roast Platter", "feast", "Pork", "Sweet Potato", "Maple Glaze", "Pepper"],
  ["Deluxe Dumpling Board", "dumpling", "Pork", "Wrappers", "Sesame Sauce", "Scallions"],
  ["Seafood Dumpling Board", "dumpling", "Shrimp", "Wrappers", "Chili Sauce", "Cilantro"],
  ["Veggie Dumpling Board", "dumpling", "Vegetables", "Wrappers", "Soy Sauce", "Sesame"],
  ["Herb Dumpling Board", "dumpling", "Chicken", "Wrappers", "Herb Sauce", "Parsley"],
];

const EASY_EXPANSION_SERIES = [
  {
    template: "toast",
    course: "Toast Bites",
    mains: ["Apricot", "Plum", "Fig", "Kiwi", "Cherry", "Pear", "Apple", "Peach", "Berry", "Banana"],
    accents: ["Ricotta", "Cream", "Jam", "Mascarpone", "Butter", "Cinnamon", "Sugar", "Yogurt", "Honey", "Granola"],
    sauces: ["Honey", "Maple", "Butter", "Jam", "Vanilla", "Brown Sugar", "Berry Syrup", "Cinnamon Butter", "Caramel", "Cream"],
    garnishes: ["Mint", "Sugar", "Cinnamon", "Granola", "Coconut", "Berry", "Honey", "Seeds", "Oats", "Nut Crumble"],
  },
  {
    template: "salad",
    course: "Cup Salad",
    mains: ["Melon", "Orange", "Apple", "Pear", "Mango", "Berry", "Pineapple", "Grape", "Coconut", "Peach"],
    accents: ["Yogurt", "Cucumber", "Banana", "Granola", "Mint", "Kiwi", "Oats", "Apple", "Melon", "Cream"],
    sauces: ["Honey", "Lime", "Maple", "Berry Syrup", "Vanilla", "Citrus", "Agave", "Yogurt", "Sugar", "Mint Syrup"],
    garnishes: ["Mint", "Granola", "Cinnamon", "Coconut", "Berry", "Seeds", "Sugar", "Oats", "Honey", "Lime Zest"],
  },
  {
    template: "bowl",
    course: "Morning Bowl",
    mains: ["Vanilla Yogurt", "Strawberry Yogurt", "Mango Yogurt", "Banana", "Blueberry", "Peach Yogurt", "Cherry Yogurt", "Apple Yogurt", "Mocha Yogurt", "Lemon Yogurt"],
    accents: ["Banana", "Berry", "Mango", "Granola", "Peach", "Oats", "Coconut", "Apple", "Cherry", "Pear"],
    sauces: ["Honey", "Maple", "Vanilla", "Berry Syrup", "Caramel", "Agave", "Cream", "Cinnamon Honey", "Fruit Syrup", "Brown Sugar"],
    garnishes: ["Granola", "Coconut", "Oats", "Cinnamon", "Berry", "Mint", "Seeds", "Sugar", "Nut Crumble", "Honey"],
  },
  {
    template: "wrap",
    course: "Snack Wrap",
    mains: ["Veggie", "Chicken", "Turkey", "Ham", "Tuna", "Slaw", "Apple", "Egg", "Cheese", "Corn"],
    accents: ["Cheese", "Lettuce", "Mustard", "Cucumber", "Mayo", "Carrot", "Peppers", "Spinach", "Tomato", "Herbs"],
    sauces: ["Sauce", "Mustard", "Mayo", "Honey", "Dressing", "Butter", "Herb Spread", "Yogurt", "Sweet Chili", "Garlic Sauce"],
    garnishes: ["Herbs", "Pepper", "Sesame", "Lettuce", "Parsley", "Paprika", "Mint", "Cinnamon", "Honey", "Seeds"],
  },
];

const MEDIUM_EXPANSION_SERIES = [
  {
    template: "pasta",
    course: "Pasta Toss",
    mains: ["Roasted Pepper", "Lemon Herb", "Creamy Spinach", "Tomato Olive", "Garlic Chicken", "Mushroom", "Basil Cream", "Corn Butter", "Herb Tomato", "Parmesan Garlic", "Golden Veggie", "Citrus Chicken"],
    accents: ["Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta"],
    sauces: ["Cream Sauce", "Butter Sauce", "Cream Sauce", "Olive Sauce", "Garlic Sauce", "Brown Butter", "Cream Sauce", "Butter Sauce", "Tomato Sauce", "Parmesan Sauce", "Herb Sauce", "Lemon Sauce"],
    garnishes: ["Parsley", "Parmesan", "Parmesan", "Basil", "Parsley", "Pepper", "Basil", "Parsley", "Parmesan", "Pepper", "Parsley", "Lemon"],
  },
  {
    template: "soup",
    course: "Soup Pot",
    mains: ["Sweet Corn", "Chicken Noodle", "Lemon Lentil", "Roasted Carrot", "Broccoli Cheese", "Tomato Rice", "Creamy Potato", "Garlic Bean", "Herb Veggie", "Golden Pumpkin", "Coconut Curry", "Rustic Mushroom"],
    accents: ["Potato", "Noodles", "Lentils", "Cream", "Cheese", "Rice", "Cream", "Beans", "Vegetables", "Cream", "Broth", "Cream"],
    sauces: ["Cream", "Broth", "Broth", "Broth", "Cream", "Tomato Base", "Broth", "Garlic Broth", "Herb Broth", "Spice Broth", "Coconut Broth", "Brown Butter Broth"],
    garnishes: ["Chives", "Parsley", "Parsley", "Pepper", "Pepper", "Basil", "Parsley", "Herbs", "Pepper", "Cinnamon", "Lime", "Parsley"],
  },
  {
    template: "rice",
    course: "Rice Bowl",
    mains: ["Teriyaki Chicken", "Sesame Veggie", "Curry Chicken", "Sweet Chili Chicken", "Garlic Shrimp", "Soy Mushroom", "Lemon Herb", "Maple Chicken", "Pepper Beef", "Honey Garlic", "Coconut Veggie", "Crispy Tofu"],
    accents: ["Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice"],
    sauces: ["Teriyaki", "Sesame Sauce", "Curry Sauce", "Sweet Chili", "Butter Sauce", "Soy Sauce", "Lemon Sauce", "Maple Glaze", "Pepper Sauce", "Garlic Glaze", "Coconut Sauce", "Ginger Soy"],
    garnishes: ["Sesame", "Scallions", "Parsley", "Sesame", "Parsley", "Sesame", "Lemon", "Parsley", "Scallions", "Sesame", "Lime", "Scallions"],
  },
  {
    template: "pasta",
    course: "Pasta Bake",
    mains: ["Creamy Tomato", "Garlic Spinach", "Roasted Veggie", "Lemon Pepper", "Cheesy Herb", "Sweet Corn", "Mushroom Cream", "Pepper Parmesan", "Broccoli Garlic", "Herb Butter", "Sun-Dried Tomato", "Garden Basil"],
    accents: ["Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta", "Pasta"],
    sauces: ["Tomato Cream", "Garlic Cream", "Herb Sauce", "Lemon Sauce", "Cheese Sauce", "Butter Sauce", "Cream Sauce", "Parmesan Sauce", "Garlic Sauce", "Butter Herb", "Tomato Sauce", "Basil Sauce"],
    garnishes: ["Parsley", "Parmesan", "Basil", "Pepper", "Parmesan", "Parsley", "Pepper", "Parmesan", "Parsley", "Pepper", "Basil", "Parmesan"],
  },
  {
    template: "soup",
    course: "Comfort Soup",
    mains: ["Golden Chicken", "Herb Rice", "Roasted Tomato", "Creamy Mushroom", "Corn Potato", "Lemon Chicken", "Garlic Bean", "Broccoli Herb", "Carrot Ginger", "Spinach Rice", "Coconut Veggie", "Creamy Onion"],
    accents: ["Broth", "Rice", "Tomato", "Cream", "Potato", "Broth", "Beans", "Broccoli", "Carrot", "Rice", "Vegetables", "Onion"],
    sauces: ["Chicken Broth", "Herb Broth", "Tomato Broth", "Cream Broth", "Butter Broth", "Lemon Broth", "Garlic Broth", "Cheese Broth", "Ginger Broth", "Herb Broth", "Coconut Broth", "Cream Broth"],
    garnishes: ["Parsley", "Pepper", "Basil", "Pepper", "Chives", "Parsley", "Herbs", "Pepper", "Parsley", "Herbs", "Lime", "Pepper"],
  },
  {
    template: "traybake",
    course: "Tray Supper",
    mains: ["Garlic Chicken", "Honey Pepper", "Maple Veggie", "Lemon Herb", "Roasted Sausage", "Curry Veggie", "Butter Chicken", "Pepper Steak", "Citrus Salmon", "Sesame Tofu", "Golden Shrimp", "Herb Turkey"],
    accents: ["Potatoes", "Carrots", "Sweet Potato", "Vegetables", "Vegetables", "Potatoes", "Broccoli", "Peppers", "Potatoes", "Vegetables", "Corn", "Vegetables"],
    sauces: ["Garlic Butter", "Honey Glaze", "Maple Glaze", "Lemon Sauce", "Herb Oil", "Curry Spice", "Butter Glaze", "Pepper Glaze", "Citrus Sauce", "Sesame Sauce", "Garlic Sauce", "Herb Butter"],
    garnishes: ["Parsley", "Pepper", "Parsley", "Lemon", "Herbs", "Parsley", "Pepper", "Scallions", "Parsley", "Sesame", "Parsley", "Herbs"],
  },
  {
    template: "tacos",
    course: "Taco Night",
    mains: ["Garlic Chicken", "Lime Fish", "Chipotle Beef", "Sweet Corn", "Herb Turkey", "Crispy Tofu", "Honey Shrimp", "Pepper Veggie", "Sesame Chicken", "Maple Pork", "Roasted Bean", "Cilantro Beef"],
    accents: ["Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas", "Tortillas"],
    sauces: ["Garlic Sauce", "Lime Sauce", "Chipotle Sauce", "Corn Salsa", "Herb Sauce", "Sweet Chili", "Honey Lime", "Pepper Sauce", "Sesame Sauce", "Maple Chili", "Tomato Salsa", "Cilantro Sauce"],
    garnishes: ["Cilantro", "Lime", "Lettuce", "Cheese", "Parsley", "Sesame", "Lime", "Cilantro", "Sesame", "Lime", "Cilantro", "Cheese"],
  },
  {
    template: "noodle",
    course: "Noodle Bowl",
    mains: ["Garlic Sesame", "Lemon Chicken", "Spicy Mushroom", "Coconut Curry", "Herb Butter", "Pepper Shrimp", "Soy Ginger", "Sweet Chili", "Corn Cream", "Tomato Basil", "Maple Tofu", "Roasted Veggie"],
    accents: ["Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles", "Noodles"],
    sauces: ["Sesame Sauce", "Lemon Sauce", "Chili Sauce", "Coconut Curry", "Butter Sauce", "Pepper Sauce", "Ginger Soy", "Sweet Chili", "Cream Sauce", "Tomato Sauce", "Maple Soy", "Herb Sauce"],
    garnishes: ["Sesame", "Scallions", "Parsley", "Lime", "Pepper", "Parsley", "Scallions", "Sesame", "Chives", "Basil", "Sesame", "Parsley"],
  },
  {
    template: "bake",
    course: "Oven Bake",
    mains: ["Cheesy Broccoli", "Creamy Chicken", "Tomato Rice", "Herb Potato", "Garlic Mushroom", "Sweet Corn", "Lemon Veggie", "Butter Shrimp", "Spinach Cheese", "Pepper Pasta", "Maple Carrot", "Parmesan Herb"],
    accents: ["Broccoli", "Chicken", "Rice", "Potato", "Mushroom", "Corn", "Vegetables", "Shrimp", "Spinach", "Pasta", "Carrots", "Vegetables"],
    sauces: ["Cheese Sauce", "Cream Sauce", "Tomato Sauce", "Herb Cream", "Garlic Cream", "Butter Sauce", "Lemon Sauce", "Butter Sauce", "Cheese Sauce", "Pepper Sauce", "Maple Butter", "Parmesan Sauce"],
    garnishes: ["Parmesan", "Parsley", "Basil", "Pepper", "Parsley", "Chives", "Lemon", "Parsley", "Parmesan", "Pepper", "Parsley", "Parmesan"],
  },
];

const HARD_EXPANSION_SERIES = [
  {
    template: "pastry",
    course: "Tart",
    mains: ["Royal Berry", "Pistachio Cream", "Lemon Meringue", "Chocolate Silk", "Peach Rose", "Cherry Vanilla", "Golden Citrus", "Midnight Cocoa", "Apricot Cream", "Plum Honey"],
    accents: ["Custard", "Cream", "Cream", "Cream", "Cream", "Cream", "Custard", "Ganache", "Cream", "Custard"],
    sauces: ["Glaze", "Glaze", "Meringue", "Ganache", "Honey", "Berry Glaze", "Citrus Glaze", "Chocolate Glaze", "Apricot Glaze", "Honey Glaze"],
    garnishes: ["Mint", "Sugar", "Sugar", "Chocolate", "Mint", "Berry", "Sugar", "Chocolate", "Mint", "Sugar"],
  },
  {
    template: "curry",
    course: "Curry Feast",
    mains: ["Festival Chicken", "Golden Coconut", "Spiced Veggie", "Butter Chicken", "Midnight Beef", "Lime Shrimp", "Garlic Tofu", "Garden Lentil", "Sesame Chicken", "Maple Pork"],
    accents: ["Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice", "Rice"],
    sauces: ["Curry Sauce", "Coconut Curry", "Curry Sauce", "Butter Curry", "Dark Curry", "Lime Curry", "Garlic Curry", "Spice Curry", "Sesame Curry", "Maple Curry"],
    garnishes: ["Cilantro", "Lime", "Parsley", "Cilantro", "Sesame", "Mint", "Scallions", "Parsley", "Sesame", "Pepper"],
  },
  {
    template: "feast",
    course: "Roast Platter",
    mains: ["Grand Chicken", "Harvest Turkey", "Glazed Beef", "Garden Veggie", "Maple Pork", "Golden Lamb", "Citrus Salmon", "Herb Duck", "Pepper Steak", "Honey Turkey"],
    accents: ["Potatoes", "Vegetables", "Carrots", "Potatoes", "Sweet Potato", "Root Veggies", "Potatoes", "Vegetables", "Carrots", "Squash"],
    sauces: ["Pan Sauce", "Gravy", "Glaze", "Herb Butter", "Maple Glaze", "Garlic Gravy", "Citrus Glaze", "Brown Butter", "Pepper Sauce", "Honey Glaze"],
    garnishes: ["Herbs", "Parsley", "Pepper", "Parsley", "Pepper", "Mint", "Parsley", "Herbs", "Scallions", "Parsley"],
  },
];

function slugifyRecipeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function hashString(value) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function pickVariant(options, seed, offset = 0) {
  return options[(seed + offset) % options.length];
}

function getGeneratedStepPalette(seed) {
  const palettes = [
    { startColor: "#ffbe7a", endColor: "#ff8a8a" },
    { startColor: "#9fd89f", endColor: "#7ab6d6" },
    { startColor: "#ffd4ba", endColor: "#f0ad8c" },
    { startColor: "#ffc0c8", endColor: "#f2a15d" },
    { startColor: "#f0d9a8", endColor: "#79c98b" },
  ];
  return pickVariant(palettes, seed);
}

function makePrepStep(title, ingredientLabel, seed, goal = 4, appearance) {
  const palette = getGeneratedStepPalette(seed);
  return step.slice(title, {
    goal,
    ingredientLabel,
    appearance,
    startColor: palette.startColor,
    endColor: palette.endColor,
  });
}

function getGeneratedRecipeSummary(name, template, main, accent, sauce, garnish, seed) {
  const summaryByTemplate = {
    toast: [
      `${name} stacks crisp toast with ${main.toLowerCase()}, ${accent.toLowerCase()}, and a shiny ${sauce.toLowerCase()} finish.`,
      `Crunchy toast loaded with ${main.toLowerCase()}, soft ${accent.toLowerCase()}, and a quick ${sauce.toLowerCase()} drizzle.`,
      `${name} is a bright little toast plate with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()} on top.`,
    ],
    salad: [
      `${name} layers fresh ${main.toLowerCase()} with ${accent.toLowerCase()} and a light ${sauce.toLowerCase()} finish.`,
      `A cup-style salad recipe with chilled ${main.toLowerCase()}, neat ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} keeps things fresh with ${main.toLowerCase()}, ${accent.toLowerCase()}, and a bright ${sauce.toLowerCase()} spoon-over.`,
    ],
    skillet: [
      `${name} is a cozy skillet recipe with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `A warm pan dish where ${main.toLowerCase()} and ${accent.toLowerCase()} cook down into a savory finish.`,
      `${name} brings together skillet-cooked ${main.toLowerCase()}, soft ${accent.toLowerCase()}, and a last touch of ${garnish.toLowerCase()}.`,
    ],
    bowl: [
      `${name} builds a creamy bowl with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A layered bowl recipe featuring ${main.toLowerCase()}, ${accent.toLowerCase()}, and a sweet ${sauce.toLowerCase()} topping.`,
      `${name} is a spoonable bowl packed with ${main.toLowerCase()}, neat ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
    ],
    dip: [
      `${name} turns ${main.toLowerCase()} into a creamy dip with ${accent.toLowerCase()} and ${garnish.toLowerCase()}.`,
      `A warm sharing dip with ${main.toLowerCase()}, soft ${accent.toLowerCase()}, and a smooth finish.`,
      `${name} makes a silky dip with ${main.toLowerCase()}, ${accent.toLowerCase()}, and a light ${sauce.toLowerCase()} note.`,
    ],
    wrap: [
      `${name} tucks ${main.toLowerCase()} and ${accent.toLowerCase()} into soft wraps with ${sauce.toLowerCase()}.`,
      `A hand-held wrap recipe packed with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} rolls up savory ${main.toLowerCase()} with ${accent.toLowerCase()} and a quick ${sauce.toLowerCase()} layer.`,
    ],
    pancake: [
      `${name} stacks fluffy rounds with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A soft breakfast stack topped with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} keeps the pancakes tender and finishes them with ${accent.toLowerCase()} and ${sauce.toLowerCase()}.`,
    ],
    pasta: [
      `${name} coats pasta with ${sauce.toLowerCase()}, ${accent.toLowerCase()}, and a finish of ${garnish.toLowerCase()}.`,
      `A comforting pasta bowl built around ${main.toLowerCase()} with ${sauce.toLowerCase()} and ${accent.toLowerCase()}.`,
      `${name} is a saucy pasta recipe with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
    ],
    soup: [
      `${name} simmers ${main.toLowerCase()} with ${accent.toLowerCase()} in a cozy ${sauce.toLowerCase()} base.`,
      `A warm soup recipe that balances ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} makes a comforting pot of ${main.toLowerCase()} soup with a smooth ${sauce.toLowerCase()} finish.`,
    ],
    rice: [
      `${name} serves ${main.toLowerCase()} over ${accent.toLowerCase()} with ${sauce.toLowerCase()} and ${garnish.toLowerCase()}.`,
      `A rice bowl recipe with saucy ${main.toLowerCase()}, soft ${accent.toLowerCase()}, and a neat topping.`,
      `${name} pairs ${main.toLowerCase()} with ${accent.toLowerCase()} and a glossy ${sauce.toLowerCase()} spoon-over.`,
    ],
    traybake: [
      `${name} roasts ${main.toLowerCase()} with ${accent.toLowerCase()} and a shiny ${sauce.toLowerCase()} coat.`,
      `A sheet-pan style bake with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} spreads everything across a tray for crisp edges and a ${sauce.toLowerCase()} finish.`,
    ],
    tacos: [
      `${name} fills tacos with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A taco-night recipe built around ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} keeps the tacos savory with ${main.toLowerCase()}, ${accent.toLowerCase()}, and a fresh finish.`,
    ],
    noodle: [
      `${name} tosses noodles with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A slurpy noodle bowl recipe with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} builds glossy noodles with ${sauce.toLowerCase()} and a finishing touch of ${garnish.toLowerCase()}.`,
    ],
    bake: [
      `${name} layers a bubbling bake with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A hearty oven recipe built from ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} turns ${main.toLowerCase()} into a golden bake with ${sauce.toLowerCase()} and ${accent.toLowerCase()}.`,
    ],
    pastry: [
      `${name} is a bakery-style pastry with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A flaky pastry recipe filled with ${accent.toLowerCase()} and finished with ${garnish.toLowerCase()}.`,
      `${name} bakes up crisp pastry around ${main.toLowerCase()} with a sweet ${sauce.toLowerCase()} finish.`,
    ],
    curry: [
      `${name} cooks ${main.toLowerCase()} in a rich ${sauce.toLowerCase()} curry over ${accent.toLowerCase()}.`,
      `A warm curry plate with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} builds a bold curry with ${main.toLowerCase()} and a smooth ${sauce.toLowerCase()} base.`,
    ],
    noodlefeast: [
      `${name} piles noodles high with ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A bigger noodle dinner with saucy ${main.toLowerCase()}, springy ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} finishes every noodle with ${sauce.toLowerCase()} and a final touch of ${garnish.toLowerCase()}.`,
    ],
    layercake: [
      `${name} stacks soft cake layers with ${accent.toLowerCase()}, ${sauce.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `A celebration cake recipe with fluffy layers, smooth ${sauce.toLowerCase()}, and ${accent.toLowerCase()}.`,
      `${name} is a tall layered bake finished with ${garnish.toLowerCase()} and a soft ${sauce.toLowerCase()} edge.`,
    ],
    stuffed: [
      `${name} fills ${main.toLowerCase()} with ${accent.toLowerCase()}, then bakes it with ${sauce.toLowerCase()}.`,
      `A stuffed bake where ${main.toLowerCase()} holds a savory ${accent.toLowerCase()} center.`,
      `${name} turns ${main.toLowerCase()} into a filled oven dish with ${garnish.toLowerCase()} on top.`,
    ],
    feast: [
      `${name} builds a large platter of ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()}.`,
      `A feast-style spread with roasted ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${garnish.toLowerCase()}.`,
      `${name} serves a full platter with crisp edges, rich ${sauce.toLowerCase()}, and a final garnish.`,
    ],
    dumpling: [
      `${name} wraps ${main.toLowerCase()} and ${accent.toLowerCase()} into dumplings with ${sauce.toLowerCase()}.`,
      `A dumpling recipe with tidy folds, ${main.toLowerCase()} filling, and ${garnish.toLowerCase()}.`,
      `${name} keeps the filling savory and serves it with a smooth ${sauce.toLowerCase()} dip.`,
    ],
  };
  const options = summaryByTemplate[template] || [
    `${name} brings together ${main.toLowerCase()}, ${accent.toLowerCase()}, ${sauce.toLowerCase()}, and ${garnish.toLowerCase()}.`,
    `A fresh combination of ${main.toLowerCase()}, ${accent.toLowerCase()}, and ${sauce.toLowerCase()} finished with ${garnish.toLowerCase()}.`,
    `${name} balances ${main.toLowerCase()} with ${accent.toLowerCase()} and a touch of ${garnish.toLowerCase()}.`,
  ];
  return pickVariant(options, seed);
}

function getGeneratedRecipeIngredients(template, difficulty, main, accent, sauce, garnish, seed) {
  const pantryItem = difficulty === "Hard" ? "Butter or oil for cooking" : "Olive oil";
  const baseByTemplate = {
    toast: ["4 toast slices", main, accent, sauce, garnish, pantryItem, "Pinch of salt", "Small sweet finish"],
    salad: ["2 serving cups", main, accent, sauce, garnish, pantryItem, "Pinch of salt", "Fresh topping"],
    skillet: [main, accent, "2 tbsp butter", sauce, garnish, pantryItem, "Salt", "Black pepper"],
    bowl: [main, accent, sauce, garnish, "Crunchy topping", pantryItem, "Pinch of salt", "Sweet finish"],
    dip: [main, accent, sauce, garnish, "Milk or cream", pantryItem, "Pinch of salt", "Serving chips or veggies"],
    wrap: ["4 wraps", main, accent, sauce, garnish, pantryItem, "Pinch of salt", "Fresh crunch"],
    pancake: ["Pancake or crepe batter", main, accent, sauce, garnish, pantryItem, "Pinch of salt", "Sugar"],
    pasta: ["12 oz pasta", main, accent, sauce, garnish, pantryItem, "Salt", "Pepper"],
    soup: [main, accent, sauce, garnish, "Broth or stock", pantryItem, "Salt", "Pepper"],
    rice: ["3 cups cooked rice", main, accent, sauce, garnish, pantryItem, "Salt", "Pepper"],
    traybake: [main, accent, sauce, garnish, "Roasting oil", pantryItem, "Salt", "Pepper"],
    tacos: ["8 tortillas", main, accent, sauce, garnish, pantryItem, "Salt", "Pepper"],
    noodle: ["12 oz noodles", main, accent, sauce, garnish, pantryItem, "Salt", "Sesame or herbs"],
    bake: [main, accent, sauce, garnish, "Baking base", pantryItem, "Salt", "Pepper"],
    pastry: ["1 pastry base", main, accent, sauce, garnish, pantryItem, "Sugar", "Pinch of salt"],
    curry: [main, accent, sauce, garnish, "Spice base", pantryItem, "Salt", "Pepper"],
    noodlefeast: ["12 oz noodles", main, accent, sauce, garnish, pantryItem, "Salt", "Pepper"],
    layercake: ["Cake batter base", main, accent, sauce, garnish, pantryItem, "Sugar", "Vanilla"],
    stuffed: [main, accent, sauce, garnish, "Filling base", pantryItem, "Salt", "Pepper"],
    feast: [main, accent, sauce, garnish, "Roasting fat", pantryItem, "Salt", "Pepper"],
    dumpling: ["Dumpling wrappers", main, accent, sauce, garnish, pantryItem, "Salt", "Pepper"],
  };
  const extrasByDifficulty = {
    Easy: ["Honey drizzle", "Toasted seeds", "Extra butter", "Cinnamon dust", "Fresh citrus"],
    Medium: ["Crunchy topping", "Quick pickle", "Roasted garlic", "Chili flakes", "Herb oil"],
    Hard: ["Compound butter", "Crispy shallots", "Bright herb salad", "Spiced oil", "Toasted crumbs"],
  };
  const finishingTouches = ["Pinch of sea salt", "Fresh herbs", "Lemon zest", "Black pepper", "Sweet finish"];
  const base = [...(baseByTemplate[template] || [main, accent, sauce, garnish, pantryItem, "Salt", "Pepper", "Finishing touch"])];
  base[base.length - 1] = pickVariant(finishingTouches, seed, 1);
  base.push(pickVariant(extrasByDifficulty[difficulty], seed, 2));
  return base;
}

function getGeneratedRecipeMethod(template, difficulty, main, accent, sauce, garnish, seed) {
  const methodsByTemplate = {
    toast: [
      [`Prep the ${main.toLowerCase()} and warm the toast base.`, `Layer the ${accent.toLowerCase()} over the toast.`, `Toast until the edges feel crisp and ready.`, `Finish with ${sauce.toLowerCase()} and ${garnish.toLowerCase()} before serving.`],
      [`Slice and ready the ${main.toLowerCase()} topping.`, `Toast the bread until golden at the edges.`, `Add the ${accent.toLowerCase()} in even little layers.`, `Spoon over ${sauce.toLowerCase()} and finish with ${garnish.toLowerCase()}.`],
    ],
    salad: [
      [`Prep the ${main.toLowerCase()} and ${accent.toLowerCase()} for layering.`, `Build the cups in tidy fresh layers.`, `Spoon over the ${sauce.toLowerCase()} carefully.`, `Finish with ${garnish.toLowerCase()} and serve right away.`],
      [`Chill the serving cups and prep the ${main.toLowerCase()}.`, `Layer in the ${accent.toLowerCase()} so the colors stay neat.`, `Drizzle the ${sauce.toLowerCase()} across the top.`, `Add ${garnish.toLowerCase()} and serve while fresh.`],
    ],
  };
  const genericMethods = [
    `Prep the ${main.toLowerCase()} and ${accent.toLowerCase()} for the recipe base.`,
    `Build the dish in stages with ${sauce.toLowerCase()} added at the right moment.`,
    `Cook carefully until the texture feels right for a ${difficulty.toLowerCase()} recipe.`,
    `Finish with ${garnish.toLowerCase()} before serving.`,
  ];
  const options = methodsByTemplate[template] || [genericMethods, [...genericMethods].reverse()];
  return pickVariant(options, seed);
}

function remixGeneratedSteps(steps, seed) {
  const remixed = steps.map((currentStep, index) => {
    const renamed = {
      ...currentStep,
      name: `${pickVariant(["Carefully", "Quickly", "Neatly", "Gently"], seed, index)} ${currentStep.name}`,
    };
    if (typeof renamed.goal === "number" && renamed.goal >= 4 && renamed.goal <= 10) {
      renamed.goal = Math.max(4, Math.min(12, renamed.goal + ((seed + index) % 2)));
    }
    return renamed;
  });

  if (remixed.length > 3 && seed % 2 === 1) {
    [remixed[1], remixed[2]] = [remixed[2], remixed[1]];
  }
  if (remixed.length > 5 && seed % 3 === 0) {
    [remixed[remixed.length - 2], remixed[remixed.length - 1]] = [remixed[remixed.length - 1], remixed[remixed.length - 2]];
  }
  return remixed;
}

function getGeneratedRecipeSteps(template, difficulty, main, accent, sauce, garnish, seed) {
  if (difficulty === "Easy") {
    const easyStepsByTemplate = {
      toast: [
        step.portion(`Layer the ${accent}`, accent, 6, `Portion the ${accent.toLowerCase()} evenly onto each toast.`),
        step.season(`Brush with ${sauce}`, sauce, 4, `Add a light ${sauce.toLowerCase()} finish in the heart zone.`),
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed),
        step.heat(`Toast the ${main} Bites`, 96, "Keep the heat steady for golden edges."),
      ],
      salad: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 1),
        step.portion(`Layer the ${accent}`, accent, 6, `Portion the ${accent.toLowerCase()} neatly into the cups.`),
        step.mix(`Toss the ${main} Base`, "vanilla", 80, "Mix gently so the layers stay fresh and tidy."),
        step.season(`Finish with ${sauce}`, sauce, 4, `Add the ${sauce.toLowerCase()} right into the sweet spot.`),
      ],
      skillet: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 2),
        step.heat(`Warm the ${accent} Skillet`, 92, "Keep the skillet warm and gentle."),
        step.mix(`Stir the ${main}`, "carbonara", 80, "Stir until everything looks smooth and cozy."),
        step.season(`Finish with ${garnish}`, garnish, 4, `Add a little ${garnish.toLowerCase()} finish in the heart zone.`),
      ],
      bowl: [
        step.mix(`Blend the ${main} Base`, "vanilla", 82, "Mix until the bowl base turns creamy and smooth."),
        step.portion(`Top with ${accent}`, accent, 6, `Portion the ${accent.toLowerCase()} evenly on top.`),
        step.season(`Drizzle the ${sauce}`, sauce, 4, `Add a sweet ${sauce.toLowerCase()} finish in the center zone.`),
        step.portion(`Add the ${garnish}`, garnish, 6, `Finish the bowl with neat ${garnish.toLowerCase()} layers.`),
      ],
      dip: [
        step.mix(`Whisk the ${main} Base`, "carbonara", 82, "Whisk until the dip base turns smooth."),
        step.heat(`Warm the ${accent} Dip`, 92, "Keep the dip warm without splitting it."),
        step.season(`Add the ${garnish}`, garnish, 4, `Season the dip right into the heart zone.`),
        step.mix(`Finish the ${main} Dip`, "carbonara", 84, "Stir until the dip turns glossy."),
      ],
      wrap: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 3),
        step.portion(`Fill the Wraps`, accent, 6, `Portion the ${accent.toLowerCase()} evenly into each wrap.`),
        step.season(`Add the ${sauce}`, sauce, 4, `Add the ${sauce.toLowerCase()} right into the center zone.`),
        step.knead(`Roll the Wraps`, 8, "Roll the wraps into neat bundles."),
      ],
      pancake: [
        step.mix(`Whisk the ${main} Batter`, "vanilla", 84, "Whisk until the batter turns smooth."),
        step.portion(`Pour the ${main}`, "Batter", 8, "Portion the batter into even rounds."),
        step.heat(`Cook the ${main} Stack`, 96, "Keep the pan in the sweet spot for golden pancakes."),
        step.season(`Finish with ${sauce}`, sauce, 4, `Add the ${sauce.toLowerCase()} finish right into the heart zone.`),
      ],
    };
    return remixGeneratedSteps(easyStepsByTemplate[template], seed);
  }

  if (difficulty === "Medium") {
    const mediumStepsByTemplate = {
      pasta: [
        step.heat(`Boil the ${accent}`, 96, "Cook until tender and springy."),
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed),
        step.mix(`Whisk the ${sauce}`, "carbonara", 88, "Whisk until the sauce turns smooth."),
        step.season(`Add the ${garnish}`, garnish, 5, `Season the pasta with ${garnish.toLowerCase()} in the heart zone.`),
        step.mix(`Toss the ${accent}`, "carbonara", 90, "Coat every bite evenly in sauce."),
        step.plate(`Serve the ${accent}`, accent, 6, "Plate the pasta in neat warm bowls."),
      ],
      soup: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 1),
        step.heat(`Soften the ${main}`, 94, "Cook the aromatics until tender."),
        step.mix(`Stir the ${sauce}`, "tomato", 86, "Mix until the pot looks glossy and rich."),
        step.heat(`Simmer the ${main}`, 100, "Keep the soup at a gentle simmer."),
        step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish into the heart zone.`),
        step.plate(`Serve the Soup`, "Soup", 6, "Serve the soup in neat warm bowls."),
      ],
      rice: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 2),
        step.mix(`Whisk the ${sauce}`, "soy", 86, "Whisk until the sauce turns smooth."),
        step.heat(`Cook the ${main}`, 98, "Keep the skillet hot enough to cook everything through."),
        step.portion(`Fill the ${accent} Bowls`, accent, 8, `Portion the ${accent.toLowerCase()} evenly into bowls.`),
        step.season(`Add the ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish right into the heart zone.`),
        step.plate(`Serve the Bowls`, "Bowls", 6, "Arrange the bowls neatly for serving."),
      ],
      traybake: [
        makePrepStep(`Prep the ${accent}`, `${accent} Prep`, seed + 3),
        step.season(`Season the ${main}`, "Seasoning", 5, "Season the tray ingredients in the sweet spot."),
        step.portion(`Arrange on the Tray`, accent, 8, "Spread everything evenly across the tray."),
        step.heat(`Roast the ${main}`, 100, "Roast until the edges turn golden."),
        step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish after roasting.`),
        step.plate(`Serve the Tray`, "Roast", 6, "Plate the roasted pieces neatly."),
      ],
      tacos: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 4),
        step.heat(`Cook the ${main}`, 98, "Cook until the filling turns savory and hot."),
        step.season(`Add the ${sauce}`, sauce, 5, `Season the filling right into the heart zone.`),
        step.portion(`Fill the ${accent}`, accent, 8, `Portion the filling evenly into the ${accent.toLowerCase()}.`),
        step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish on top.`),
        step.plate(`Serve the Tacos`, "Tacos", 6, "Arrange the tacos neatly on the plate."),
      ],
      noodle: [
        step.heat(`Boil the ${main}`, 96, "Cook the noodles until springy."),
        step.mix(`Whisk the ${sauce}`, "soy", 88, "Whisk until the sauce turns silky."),
        makePrepStep(`Prep the ${accent}`, `${accent} Prep`, seed + 5),
        step.mix(`Toss the Noodles`, "soy", 90, "Coat the noodles evenly in sauce."),
        step.season(`Add the ${garnish}`, garnish, 5, `Season the bowl with ${garnish.toLowerCase()} in the sweet spot.`),
        step.plate(`Serve the Noodles`, "Noodles", 6, "Twirl the noodles neatly into bowls."),
      ],
      bake: [
        makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 6),
        step.mix(`Whisk the ${sauce}`, "carbonara", 86, "Whisk until the bake sauce turns smooth."),
        step.portion(`Fill the Bake Dish`, accent, 8, "Spread the bake evenly into the dish."),
        step.season(`Add the ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} topping into the heart zone.`),
        step.heat(`Bake the ${main}`, 100, "Bake until the top turns golden and bubbly."),
        step.plate(`Serve the Bake`, "Bake", 6, "Serve the bake in tidy portions."),
      ],
    };
    return remixGeneratedSteps(mediumStepsByTemplate[template], seed);
  }

  const hardStepsByTemplate = {
    pastry: [
      step.mix(`Whisk the ${accent}`, "vanilla", 88, "Whisk until the filling turns smooth."),
      step.portion(`Fill the Pastry`, accent, 8, "Spread the filling evenly over the crust."),
      makePrepStep(`Prep the ${main}`, `${main} Prep`, seed, 5),
      step.knead(`Shape the Pastry`, 10, "Fold and shape the pastry into a neat finish."),
      step.heat(`Bake the ${main} Tart`, 102, "Bake until the crust turns deep golden."),
      step.mix(`Make the ${sauce}`, "vanilla", 84, "Whisk until the topping turns glossy."),
      step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish in the sweet spot.`),
      step.plate(`Serve the Tart`, "Tart", 7, "Plate the tart in tidy slices."),
    ],
    curry: [
      makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 1, 5),
      step.heat(`Cook the ${main}`, 98, "Cook until the base turns savory and hot."),
      step.mix(`Whisk the ${sauce}`, "soy", 88, "Whisk until the curry turns smooth."),
      step.season(`Add the ${garnish}`, garnish, 5, `Season the curry in the center zone.`),
      step.heat(`Simmer the Curry`, 102, "Keep the curry bubbling gently."),
      step.portion(`Fill the ${accent} Plates`, accent, 8, "Portion the rice evenly into plates."),
      step.plate(`Serve the Curry`, "Curry", 7, "Arrange the curry neatly over the rice."),
      step.season(`Finish with ${garnish}`, garnish, 5, `Add a final ${garnish.toLowerCase()} finish.`),
    ],
    noodlefeast: [
      makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 2, 5),
      step.heat(`Cook the ${main}`, 100, "Cook until the main topping turns glossy and hot."),
      step.heat(`Boil the ${accent}`, 96, "Cook the noodles until springy."),
      step.mix(`Whisk the ${sauce}`, "soy", 90, "Whisk until the sauce turns smooth."),
      step.season(`Add the ${garnish}`, garnish, 5, `Season the bowl with ${garnish.toLowerCase()}.`),
      step.mix(`Toss the Noodles`, "soy", 90, "Coat every noodle in sauce."),
      step.plate(`Build the Noodle Bowl`, "Noodles", 7, "Arrange the noodles and toppings neatly."),
      step.season(`Finish the Bowl`, garnish, 5, `Add a final topping in the sweet spot.`),
    ],
    layercake: [
      step.mix(`Whisk the ${main} Batter`, "vanilla", 92, "Whisk until the batter turns fluffy."),
      step.portion(`Fill the Cake Pans`, "Batter", 8, "Portion the batter evenly into the pans."),
      step.heat(`Bake the Cake Layers`, 102, "Bake until the layers spring back softly."),
      step.mix(`Whisk the ${sauce}`, "vanilla", 88, "Whisk until the frosting turns smooth."),
      step.season(`Add the ${garnish}`, garnish, 5, `Add a cute ${garnish.toLowerCase()} touch.`),
      step.pipe(`Pipe the ${sauce}`, 12, "Pipe a neat decorative border."),
      step.plate(`Present the Cake`, "Cake", 7, "Set the cake neatly on the stand."),
      step.season(`Finish the Cake`, garnish, 5, `Add a final finish in the heart zone.`),
    ],
    stuffed: [
      makePrepStep(`Prep the ${main}`, `${main} Prep`, seed + 3, 5),
      step.mix(`Make the ${accent} Filling`, "carbonara", 88, "Mix until the filling comes together."),
      step.portion(`Fill the ${main}`, accent, 8, `Portion the filling evenly into each ${main.toLowerCase()}.`),
      step.knead(`Shape the Tops`, 10, "Tuck the tops neatly into place."),
      step.season(`Add the ${sauce}`, sauce, 5, `Season the stuffed vegetables in the heart zone.`),
      step.heat(`Bake the ${main}`, 102, "Bake until everything turns tender."),
      step.plate(`Serve the Bake`, "Stuffed Bake", 7, "Plate the stuffed pieces neatly."),
      step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish.`),
    ],
    feast: [
      makePrepStep(`Prep the ${accent}`, `${accent} Prep`, seed + 4, 5),
      step.season(`Season the ${main}`, "Seasoning", 5, "Season the roast components in the sweet spot."),
      step.portion(`Arrange the Platter`, accent, 8, "Spread the platter ingredients evenly."),
      step.heat(`Roast the ${main}`, 102, "Roast until the platter turns golden and hot."),
      step.mix(`Whisk the ${sauce}`, "soy", 84, "Whisk until the sauce turns glossy."),
      makePrepStep(`Carve the ${main}`, `${main} Carving`, seed + 5, 4, "chicken"),
      step.plate(`Build the Feast`, "Feast", 7, "Arrange the feast neatly across the platter."),
      step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish in the heart zone.`),
    ],
    dumpling: [
      step.mix(`Make the ${main} Filling`, "soy", 88, "Mix until the filling turns cohesive."),
      step.portion(`Fill the ${accent}`, accent, 10, `Portion the filling evenly into each ${accent.toLowerCase()}.`),
      step.knead(`Seal the Dumplings`, 10, "Fold and seal the dumplings in tidy motions."),
      step.heat(`Steam the Dumplings`, 98, "Steam until the dumplings cook through."),
      step.heat(`Crisp the Bottoms`, 96, "Finish until the bottoms turn golden."),
      step.mix(`Whisk the ${sauce}`, "soy", 82, "Whisk until the dipping sauce smooths out."),
      step.plate(`Arrange the Board`, "Dumplings", 7, "Arrange the dumplings neatly on the board."),
      step.season(`Finish with ${garnish}`, garnish, 5, `Add the ${garnish.toLowerCase()} finish.`),
    ],
  };
  return remixGeneratedSteps(hardStepsByTemplate[template], seed);
}

function createGeneratedRecipe([name, template, main, accent, sauce, garnish], difficulty, index) {
  const difficultyConfig = {
    Easy: { pointsStart: 360, pointStep: 55, rewardStart: 94, rewardStep: 4, servings: "Serves 2" },
    Medium: { pointsStart: 5200, pointStep: 140, rewardStart: 250, rewardStep: 7, servings: "Serves 4" },
    Hard: { pointsStart: 21020, pointStep: 180, rewardStart: 906, rewardStep: 10, servings: "Serves 6" },
  };
  const config = difficultyConfig[difficulty];
  const seed = hashString(`${name}-${difficulty}-${template}-${main}-${accent}-${sauce}-${garnish}`);
  return {
    id: slugifyRecipeName(name),
    name,
    difficulty,
    requiredPoints: config.pointsStart + index * config.pointStep,
    servings: config.servings,
    summary: getGeneratedRecipeSummary(name, template, main, accent, sauce, garnish, seed),
    ingredients: getGeneratedRecipeIngredients(template, difficulty, main, accent, sauce, garnish, seed),
    method: getGeneratedRecipeMethod(template, difficulty, main, accent, sauce, garnish, seed),
    baseReward: config.rewardStart + index * config.rewardStep,
    steps: getGeneratedRecipeSteps(template, difficulty, main, accent, sauce, garnish, seed),
  };
}

function generateSeriesRecipes(seriesList, difficulty) {
  const recipes = [];
  let recipeIndex = 0;
  seriesList.forEach((series) => {
    series.mains.forEach((main, index) => {
      const accent = series.accents[index % series.accents.length];
      const sauce = series.sauces[index % series.sauces.length];
      const garnish = series.garnishes[index % series.garnishes.length];
      const name = `${main} ${series.course}`;
      recipes.push(
        createGeneratedRecipe(
          [name, series.template, main, accent, sauce, garnish],
          difficulty,
          recipeIndex
        )
      );
      recipeIndex += 1;
    });
  });
  return recipes;
}

function generateBonusRecipes() {
  return [
    ...EASY_BONUS_RECIPE_DATA.map((recipe, index) => createGeneratedRecipe(recipe, "Easy", index)),
    ...MEDIUM_BONUS_RECIPE_DATA.map((recipe, index) => createGeneratedRecipe(recipe, "Medium", index)),
    ...HARD_BONUS_RECIPE_DATA.map((recipe, index) => createGeneratedRecipe(recipe, "Hard", index)),
    ...generateSeriesRecipes(EASY_EXPANSION_SERIES, "Easy"),
    ...generateSeriesRecipes(MEDIUM_EXPANSION_SERIES, "Medium"),
    ...generateSeriesRecipes(HARD_EXPANSION_SERIES, "Hard"),
  ];
}

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
    id: "grilled-cheese",
    name: "Golden Grilled Cheese",
    difficulty: "Easy",
    requiredPoints: 90,
    servings: "Serves 2",
    summary:
      "Crispy buttery bread with gooey melted cheese in the middle.",
    ingredients: [
      "4 slices sandwich bread",
      "2 tbsp softened butter",
      "4 slices cheddar or American cheese",
      "Pinch of salt",
    ],
    method: [
      "Butter the outside of each bread slice.",
      "Layer the cheese between the slices.",
      "Cook in a skillet over medium heat until golden on the first side.",
      "Flip and cook until the second side is golden and the cheese has melted.",
    ],
    baseReward: 82,
    steps: [
      step.portion("Build the Sandwiches", "Cheese", 6, "Layer the cheese evenly between the bread slices."),
      step.season("Butter the Bread", "Butter", 4, "Add just enough butter for a golden crust."),
      step.heat("Toast Side One", 95, "Keep the skillet in the sweet spot for even browning."),
      step.heat("Toast Side Two", 95, "Finish the sandwich until the cheese turns melty."),
    ],
  },
  {
    id: "fruit-parfait",
    name: "Berry Yogurt Parfait",
    difficulty: "Easy",
    requiredPoints: 130,
    servings: "Serves 2",
    summary:
      "Layered yogurt cups with berries, honey, and crunchy granola.",
    ingredients: [
      "2 cups vanilla yogurt",
      "1 cup mixed berries",
      "1/2 cup granola",
      "2 tsp honey",
    ],
    method: [
      "Slice any larger berries.",
      "Layer yogurt, berries, and granola into glasses.",
      "Repeat the layers until the cups are full.",
      "Finish with honey before serving.",
    ],
    baseReward: 84,
    steps: [
      step.slice("Slice the Berries", {
        goal: 4,
        ingredientLabel: "Berry Prep",
        startColor: "#ffc0c8",
        endColor: "#f06d93",
      }),
      step.portion("Layer the Yogurt", "Yogurt", 6, "Portion the yogurt evenly into each glass."),
      step.portion("Add the Granola", "Granola", 6, "Build neat crunchy layers."),
      step.season("Drizzle the Honey", "Honey", 4, "Add a sweet drizzle right into the heart zone."),
    ],
  },
  {
    id: "scrambled-eggs",
    name: "Soft Scrambled Eggs",
    difficulty: "Easy",
    requiredPoints: 210,
    servings: "Serves 2",
    summary:
      "Creamy scrambled eggs finished with butter and pepper.",
    ingredients: [
      "4 eggs",
      "1 tbsp butter",
      "2 tbsp milk or cream",
      "Salt and black pepper",
    ],
    method: [
      "Whisk the eggs with milk and a pinch of salt.",
      "Melt the butter in a skillet over low-medium heat.",
      "Cook the eggs slowly, stirring often until softly set.",
      "Finish with pepper and serve immediately.",
    ],
    baseReward: 86,
    steps: [
      step.mix("Whisk the Eggs", "carbonara", 78, "Whisk until the eggs look smooth and pale."),
      step.heat("Melt the Butter", 88, "Warm the pan gently so the butter stays sweet."),
      step.heat("Cook the Eggs", 94, "Keep the eggs soft and creamy."),
      step.season("Finish with Pepper", "Pepper", 4, "Add a light pepper finish in the heart zone."),
    ],
  },
  {
    id: "queso-dip",
    name: "Cheesy Queso Dip",
    difficulty: "Easy",
    requiredPoints: 250,
    servings: "Serves 4",
    summary:
      "Warm melty cheese dip with a little spice for chips or veggies.",
    ingredients: [
      "2 cups shredded cheddar",
      "1 cup milk",
      "1 tsp cornstarch",
      "1 tbsp diced jalapeno",
      "Pinch of paprika",
    ],
    method: [
      "Whisk the milk and cornstarch together.",
      "Warm the mixture in a saucepan.",
      "Stir in the cheese until melted and smooth.",
      "Finish with jalapeno and paprika before serving.",
    ],
    baseReward: 90,
    steps: [
      step.mix("Whisk the Base", "carbonara", 80, "Whisk until the milk base is smooth."),
      step.heat("Warm the Saucepan", 90, "Heat gently so the queso stays silky."),
      step.season("Add the Jalapeno", "Jalapeno", 4, "Add a tiny spicy pop right in the sweet spot."),
      step.mix("Stir the Queso", "carbonara", 86, "Stir until the dip turns glossy and smooth."),
    ],
  },
  {
    id: "mini-pizzas",
    name: "Mini Pizza Toasts",
    difficulty: "Easy",
    requiredPoints: 300,
    servings: "Serves 4",
    summary:
      "Tiny pizza toasts with sauce, cheese, and a quick bubbly finish.",
    ingredients: [
      "8 bread rounds or toast slices",
      "1/2 cup marinara",
      "1 cup mozzarella",
      "1 tsp dried herbs",
    ],
    method: [
      "Spread the bread with marinara.",
      "Top each piece with mozzarella.",
      "Season lightly with herbs.",
      "Bake or toast until bubbly and golden at the edges.",
    ],
    baseReward: 92,
    steps: [
      step.portion("Spread the Sauce", "Sauce", 8, "Portion the sauce evenly across each toast."),
      step.season("Add the Herbs", "Herbs", 4, "Season the toasts lightly right into the heart zone."),
      step.portion("Top with Cheese", "Cheese", 8, "Add enough cheese to each toast."),
      step.heat("Bake the Toasts", 98, "Keep the oven in the sweet spot for bubbly cheese."),
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
  {
    id: "pancakes",
    name: "Berry Buttermilk Pancakes",
    difficulty: "Medium",
    requiredPoints: 2140,
    servings: "Serves 4",
    summary:
      "Fluffy buttermilk pancakes with juicy berries and a golden finish.",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1 tsp baking soda",
      "1/2 tsp kosher salt",
      "2 cups buttermilk",
      "2 eggs",
      "4 tbsp melted butter",
      "1 cup mixed berries",
    ],
    method: [
      "Whisk the dry ingredients together.",
      "Whisk the buttermilk, eggs, and butter in a separate bowl.",
      "Mix the wet ingredients into the dry ingredients just until combined.",
      "Fold in the berries.",
      "Cook scoops of batter on a buttered griddle until bubbles form, then flip.",
      "Serve warm with butter and syrup.",
    ],
    baseReward: 205,
    steps: [
      step.mix("Whisk the Dry Mix", "vanilla", 80, "Whisk the dry ingredients until evenly combined."),
      step.mix("Whisk the Wet Mix", "vanilla", 80, "Blend the buttermilk mixture until smooth."),
      step.mix("Make the Pancake Batter", "vanilla", 90, "Mix gently so the batter stays fluffy."),
      step.season("Fold in the Berries", "Berries", 5, "Add the berries without overworking the batter."),
      step.portion("Pour the Pancakes", "Batter", 8, "Portion even rounds of pancake batter onto the griddle."),
      step.heat("Cook the Pancakes", 100, "Keep the pan in the sweet spot for golden pancakes."),
    ],
  },
  {
    id: "fried-rice",
    name: "Egg Fried Rice",
    difficulty: "Medium",
    requiredPoints: 2400,
    servings: "Serves 4",
    summary:
      "Savory fried rice with egg, scallions, peas, and soy sauce.",
    ingredients: [
      "3 cups cold cooked rice",
      "2 eggs",
      "2 tbsp neutral oil",
      "3 scallions, sliced",
      "1 cup peas and carrots",
      "2 tbsp soy sauce",
      "1 tsp sesame oil",
      "Salt and white pepper",
    ],
    method: [
      "Beat the eggs and slice the scallions.",
      "Heat oil in a wok or skillet over medium-high heat.",
      "Scramble the eggs lightly and remove them to a plate.",
      "Cook the vegetables briefly, then add the rice and break up any clumps.",
      "Stir in the soy sauce, sesame oil, and scrambled eggs.",
      "Finish with scallions and serve hot.",
    ],
    baseReward: 212,
    steps: [
      step.slice("Slice the Scallions", {
        goal: 4,
        ingredientLabel: "Scallion Prep",
        startColor: "#a9ddb0",
        endColor: "#7ac88e",
      }),
      step.mix("Beat the Eggs", "carbonara", 78, "Whisk until the eggs are smooth and streak-free."),
      step.heat("Scramble the Eggs", 92, "Keep the eggs soft and tender."),
      step.portion("Add the Rice", "Rice", 8, "Portion the rice evenly into the hot wok."),
      step.season("Splash in the Soy Sauce", "Soy Sauce", 5, "Season the rice without overdoing it."),
      step.heat("Finish the Fried Rice", 100, "Keep everything hot enough to stay fluffy and savory."),
    ],
  },
  {
    id: "mac-cheese",
    name: "Creamy Mac and Cheese",
    difficulty: "Medium",
    requiredPoints: 2660,
    servings: "Serves 6",
    summary:
      "Comforting macaroni coated in a creamy stovetop cheese sauce.",
    ingredients: [
      "12 oz elbow macaroni",
      "3 tbsp butter",
      "3 tbsp flour",
      "2 1/2 cups milk",
      "2 cups shredded cheddar",
      "1/2 cup grated parmesan",
      "1 tsp mustard",
      "Salt and black pepper",
    ],
    method: [
      "Boil the macaroni in salted water until just tender.",
      "Melt the butter in a saucepan and stir in the flour to make a roux.",
      "Whisk in the milk until smooth and thickened.",
      "Stir in the cheddar, parmesan, and mustard until melted.",
      "Fold in the cooked macaroni.",
      "Season to taste and serve warm.",
    ],
    baseReward: 220,
    steps: [
      step.heat("Boil the Pasta", 96, "Hold the pasta water at a lively boil."),
      step.heat("Cook the Roux", 88, "Warm the butter and flour without browning it."),
      step.mix("Whisk the Cheese Sauce", "carbonara", 92, "Whisk until the sauce is silky and lump-free."),
      step.season("Melt in the Cheese", "Cheese", 5, "Add the cheese until the flavor meter lands in the heart."),
      step.mix("Fold in the Macaroni", "carbonara", 88, "Stir until every noodle is coated."),
      step.plate("Serve the Bowls", "Mac and Cheese", 6, "Plate the mac and cheese in tidy bowls."),
    ],
  },
  {
    id: "quesadillas",
    name: "Cheesy Chicken Quesadillas",
    difficulty: "Medium",
    requiredPoints: 2920,
    servings: "Serves 4",
    summary:
      "Golden tortillas filled with seasoned chicken and melted cheese.",
    ingredients: [
      "2 cups cooked chicken, shredded",
      "1 1/2 cups shredded cheese",
      "4 large flour tortillas",
      "1 tbsp taco seasoning",
      "2 tbsp butter or oil",
      "Salsa and sour cream for serving",
    ],
    method: [
      "Season the shredded chicken with taco seasoning.",
      "Scatter chicken and cheese over half of each tortilla and fold closed.",
      "Heat a skillet over medium heat with butter or oil.",
      "Cook the quesadillas until golden on both sides and the cheese is melted.",
      "Rest briefly, then slice into wedges.",
      "Serve with salsa and sour cream.",
    ],
    baseReward: 228,
    steps: [
      step.season("Season the Chicken", "Taco Spice", 5, "Add enough seasoning for a savory filling."),
      step.portion("Fill the Tortillas", "Filling", 8, "Portion the filling evenly across the tortillas."),
      step.heat("Toast Side One", 96, "Cook the first side until golden and crisp."),
      step.heat("Toast Side Two", 96, "Flip and finish the quesadillas without burning them."),
      step.slice("Cut the Wedges", {
        goal: 4,
        ingredientLabel: "Quesadilla Slices",
        startColor: "#f5d08e",
        endColor: "#dfa05b",
      }),
      step.plate("Serve with Salsa", "Quesadillas", 6, "Plate the wedges neatly for serving."),
    ],
  },
  {
    id: "meatballs",
    name: "Turkey Meatballs",
    difficulty: "Medium",
    requiredPoints: 3180,
    servings: "Serves 4",
    summary:
      "Tender turkey meatballs simmered in a simple tomato sauce.",
    ingredients: [
      "1 lb ground turkey",
      "1 egg",
      "1/2 cup breadcrumbs",
      "1/4 cup grated parmesan",
      "2 cloves garlic, minced",
      "1 jar tomato sauce",
      "2 tbsp olive oil",
      "Salt and black pepper",
    ],
    method: [
      "Mix the turkey, egg, breadcrumbs, parmesan, garlic, salt, and pepper.",
      "Shape the mixture into meatballs.",
      "Brown the meatballs in olive oil over medium heat.",
      "Add the tomato sauce and simmer until the meatballs are cooked through.",
      "Turn the meatballs in the sauce to coat them well.",
      "Serve warm over pasta or with bread.",
    ],
    baseReward: 236,
    steps: [
      step.mix("Mix the Meatball Base", "cookie-dough", 88, "Mix just until the turkey mixture comes together."),
      step.portion("Shape the Meatballs", "Meatballs", 8, "Portion even meatballs for uniform cooking."),
      step.heat("Brown the Meatballs", 96, "Sear the meatballs gently until lightly golden."),
      step.mix("Stir the Tomato Sauce", "tomato", 82, "Keep the sauce smooth as the meatballs simmer."),
      step.heat("Simmer Until Cooked", 100, "Hold a gentle simmer so the meatballs stay tender."),
      step.plate("Serve the Meatballs", "Meatballs", 6, "Plate the meatballs with plenty of sauce."),
    ],
  },
  {
    id: "alfredo-bake",
    name: "Broccoli Alfredo Bake",
    difficulty: "Medium",
    requiredPoints: 3440,
    servings: "Serves 6",
    summary:
      "A creamy pasta bake with broccoli, parmesan, and bubbling cheese.",
    ingredients: [
      "12 oz penne",
      "3 cups broccoli florets",
      "2 tbsp butter",
      "2 tbsp flour",
      "2 cups milk",
      "1 cup grated parmesan",
      "1 cup shredded mozzarella",
      "Salt and black pepper",
    ],
    method: [
      "Cook the pasta until just shy of al dente and blanch the broccoli.",
      "Make a quick white sauce with butter, flour, and milk.",
      "Stir in the parmesan until melted.",
      "Combine the sauce with the pasta and broccoli.",
      "Transfer to a baking dish and top with mozzarella.",
      "Bake until bubbling and golden.",
    ],
    baseReward: 245,
    steps: [
      step.slice("Cut the Broccoli", {
        goal: 4,
        ingredientLabel: "Broccoli Prep",
        startColor: "#9fd89f",
        endColor: "#6fc37a",
      }),
      step.heat("Boil the Pasta", 96, "Cook the penne until just tender."),
      step.mix("Whisk the Alfredo Sauce", "carbonara", 92, "Whisk until the sauce turns creamy."),
      step.season("Add the Parmesan", "Parmesan", 5, "Season the sauce with cheese right into the heart zone."),
      step.portion("Fill the Baking Dish", "Pasta", 8, "Spread the pasta bake evenly in the dish."),
      step.heat("Bake Until Bubbly", 100, "Bake until the top is golden and melty."),
    ],
  },
  {
    id: "ramen",
    name: "Miso Chicken Ramen",
    difficulty: "Hard",
    requiredPoints: 3740,
    servings: "Serves 4",
    summary:
      "A cozy ramen bowl with chicken, noodles, miso broth, and toppings.",
    ingredients: [
      "8 cups chicken stock",
      "2 tbsp white miso",
      "1 tbsp soy sauce",
      "12 oz ramen noodles",
      "2 chicken breasts, sliced",
      "2 soft-boiled eggs",
      "2 scallions, sliced",
      "1 cup mushrooms, sliced",
      "1 tsp sesame oil",
    ],
    method: [
      "Slice the chicken, scallions, and mushrooms.",
      "Bring the stock to a simmer and whisk in the miso and soy sauce.",
      "Cook the chicken and mushrooms until tender.",
      "Boil the noodles separately until springy.",
      "Divide the noodles into bowls and ladle over the broth.",
      "Top with chicken, eggs, scallions, and sesame oil.",
    ],
    baseReward: 258,
    steps: [
      step.slice("Slice the Chicken", {
        goal: 5,
        ingredientLabel: "Chicken Prep",
        appearance: "chicken",
        startColor: "#ffd4ba",
        endColor: "#f0ad8c",
      }),
      step.slice("Slice the Scallions", {
        goal: 4,
        ingredientLabel: "Scallion Prep",
        startColor: "#a9ddb0",
        endColor: "#7ac88e",
      }),
      step.mix("Whisk the Miso Broth", "soy", 88, "Whisk until the miso dissolves into the broth."),
      step.heat("Cook the Chicken", 98, "Keep the pan hot enough to cook the chicken through."),
      step.heat("Boil the Noodles", 96, "Boil the noodles until tender but springy."),
      step.season("Finish with Sesame Oil", "Sesame Oil", 5, "Add just enough sesame oil for aroma."),
      step.portion("Build the Bowls", "Noodles", 8, "Portion the noodles evenly into serving bowls."),
      step.plate("Top and Serve", "Ramen", 7, "Finish the ramen bowls in the right order."),
    ],
  },
  {
    id: "lasagna",
    name: "Skillet Lasagna",
    difficulty: "Hard",
    requiredPoints: 4060,
    servings: "Serves 6",
    summary:
      "All the comfort of lasagna with rich meat sauce and creamy cheese layers.",
    ingredients: [
      "1 lb ground beef or turkey",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 jar marinara sauce",
      "8 lasagna noodles, broken up",
      "1 cup ricotta",
      "1 1/2 cups shredded mozzarella",
      "1/4 cup grated parmesan",
      "2 tbsp olive oil",
    ],
    method: [
      "Cook the onion and garlic in olive oil until softened.",
      "Brown the meat and stir in the marinara sauce.",
      "Add water and broken lasagna noodles and simmer until tender.",
      "Dollop ricotta over the skillet.",
      "Top with mozzarella and parmesan.",
      "Cover until the cheese melts, then serve hot.",
    ],
    baseReward: 270,
    steps: [
      step.slice("Dice the Onion", {
        goal: 4,
        ingredientLabel: "Onion Prep",
        startColor: "#f0d9a8",
        endColor: "#f6b1c3",
      }),
      step.heat("Brown the Meat", 98, "Cook the meat until browned without drying it out."),
      step.mix("Stir the Sauce", "tomato", 88, "Stir until the sauce and meat come together."),
      step.portion("Layer in the Ricotta", "Ricotta", 8, "Portion the ricotta evenly across the skillet."),
      step.season("Top with Parmesan", "Parmesan", 5, "Finish the top with a balanced shower of cheese."),
      step.heat("Melt the Cheese", 100, "Keep the skillet hot enough to melt the cheese into the sauce."),
      step.plate("Serve the Squares", "Lasagna", 7, "Plate the lasagna carefully for tidy servings."),
      step.season("Finish with Pepper", "Pepper", 5, "Add a final touch of pepper in the sweet spot."),
    ],
  },
  {
    id: "donuts",
    name: "Strawberry Glazed Donuts",
    difficulty: "Hard",
    requiredPoints: 4380,
    servings: "Makes 12 donuts",
    summary:
      "Soft baked donuts with a glossy pink strawberry glaze.",
    ingredients: [
      "2 cups all-purpose flour",
      "1/2 cup sugar",
      "2 tsp baking powder",
      "1/2 tsp kosher salt",
      "3/4 cup milk",
      "2 eggs",
      "4 tbsp melted butter",
      "1 cup powdered sugar",
      "2 tbsp strawberry puree",
    ],
    method: [
      "Whisk the flour, sugar, baking powder, and salt together.",
      "Whisk the milk, eggs, and melted butter separately.",
      "Mix the wet and dry ingredients into a smooth batter.",
      "Pipe the batter into a greased donut pan.",
      "Bake until puffed and springy.",
      "Whisk the glaze and dip the cooled donuts.",
    ],
    baseReward: 282,
    steps: [
      step.mix("Whisk the Dry Ingredients", "vanilla", 82, "Whisk the dry mix until evenly combined."),
      step.mix("Whisk the Donut Batter", "vanilla", 92, "Blend until the batter looks smooth."),
      step.pipe("Pipe the Donut Batter", 12, "Pipe the batter neatly into each donut ring."),
      step.heat("Bake the Donuts", 100, "Bake until the donuts are lightly golden."),
      step.mix("Whisk the Strawberry Glaze", "muffin", 86, "Whisk until the glaze turns glossy and pink."),
      step.season("Dip in Extra Topping", "Sprinkles", 5, "Add a cute finishing sprinkle."),
      step.plate("Set the Donuts", "Donuts", 7, "Place the donuts neatly on the cooling rack."),
      step.pipe("Decorate the Tops", 12, "Trace the glaze accents over each donut top."),
    ],
  },
  {
    id: "enchiladas",
    name: "Green Chicken Enchiladas",
    difficulty: "Hard",
    requiredPoints: 4700,
    servings: "Serves 6",
    summary:
      "Rolled tortillas filled with chicken and cheese under salsa verde.",
    ingredients: [
      "3 cups cooked shredded chicken",
      "2 cups shredded Monterey Jack",
      "10 corn tortillas",
      "2 cups salsa verde",
      "1/2 cup sour cream",
      "1 tbsp oil",
      "1/4 cup chopped cilantro",
    ],
    method: [
      "Mix the chicken with some cheese and a little salsa verde.",
      "Warm the tortillas until flexible.",
      "Fill and roll the tortillas into a baking dish.",
      "Pour over the remaining salsa verde and top with cheese.",
      "Bake until bubbly and hot.",
      "Finish with sour cream and cilantro before serving.",
    ],
    baseReward: 294,
    steps: [
      step.mix("Mix the Filling", "soy", 84, "Stir the chicken filling until evenly coated."),
      step.portion("Fill the Tortillas", "Filling", 10, "Portion the filling evenly into each tortilla."),
      step.portion("Arrange in the Dish", "Enchiladas", 8, "Place the rolled enchiladas snugly in the pan."),
      step.season("Top with Cheese", "Cheese", 5, "Sprinkle just enough cheese for a bubbly finish."),
      step.heat("Bake the Enchiladas", 100, "Bake until the sauce is bubbling around the edges."),
      step.slice("Chop the Cilantro", {
        goal: 4,
        ingredientLabel: "Cilantro Prep",
        startColor: "#9fd89f",
        endColor: "#72bf7a",
      }),
      step.plate("Serve the Enchiladas", "Enchiladas", 7, "Plate the enchiladas in tidy portions."),
      step.season("Finish with Salsa Verde", "Salsa Verde", 5, "Add a bright finishing spoonful right in the sweet spot."),
    ],
  },
  {
    id: "gnocchi",
    name: "Brown Butter Gnocchi",
    difficulty: "Hard",
    requiredPoints: 5020,
    servings: "Serves 4",
    summary:
      "Pillowy gnocchi tossed with nutty brown butter and sage.",
    ingredients: [
      "1 lb shelf-stable gnocchi",
      "6 tbsp butter",
      "10 sage leaves",
      "1/4 cup grated parmesan",
      "Salt and black pepper",
      "Lemon wedges for serving",
    ],
    method: [
      "Bring a pot of salted water to a boil.",
      "Cook the gnocchi until they float, then drain.",
      "Brown the butter with the sage leaves in a skillet.",
      "Toss the gnocchi in the brown butter.",
      "Finish with parmesan and pepper.",
      "Serve immediately with lemon.",
    ],
    baseReward: 306,
    steps: [
      step.heat("Boil the Gnocchi", 96, "Cook the gnocchi just until they float."),
      step.heat("Brown the Butter", 94, "Keep the butter golden and nutty, not burnt."),
      step.slice("Slice the Sage", {
        goal: 4,
        ingredientLabel: "Sage Prep",
        startColor: "#a9d3a0",
        endColor: "#7cb06f",
      }),
      step.mix("Toss the Gnocchi", "carbonara", 86, "Coat the gnocchi evenly in the butter sauce."),
      step.season("Add the Parmesan", "Parmesan", 5, "Finish with a balanced shower of cheese."),
      step.plate("Serve the Gnocchi", "Gnocchi", 7, "Plate the gnocchi in neat buttery mounds."),
      step.season("Finish with Pepper", "Pepper", 5, "Grind in a final touch of pepper."),
      step.heat("Keep It Warm", 90, "Hold the pan in a gentle warm zone before serving."),
    ],
  },
  {
    id: "dumplings",
    name: "Pork Chive Dumplings",
    difficulty: "Hard",
    requiredPoints: 5340,
    servings: "Makes about 24 dumplings",
    summary:
      "Juicy dumplings with pork, chives, and a crisp pan-fried bottom.",
    ingredients: [
      "24 dumpling wrappers",
      "1 lb ground pork",
      "1 cup chopped chives",
      "1 tbsp soy sauce",
      "1 tsp sesame oil",
      "1 tsp grated ginger",
      "2 tbsp neutral oil",
      "1/2 cup water",
    ],
    method: [
      "Mix the pork, chives, soy sauce, sesame oil, and ginger.",
      "Fill the wrappers and seal the dumplings.",
      "Heat oil in a skillet and add the dumplings.",
      "Pour in water and cover to steam until cooked through.",
      "Uncover and cook until the bottoms are crisp.",
      "Serve with dipping sauce.",
    ],
    baseReward: 318,
    steps: [
      step.slice("Chop the Chives", {
        goal: 4,
        ingredientLabel: "Chive Prep",
        startColor: "#a7db9b",
        endColor: "#77bf73",
      }),
      step.mix("Mix the Filling", "soy", 88, "Stir until the dumpling filling looks cohesive."),
      step.portion("Fill the Wrappers", "Filling", 10, "Portion even filling into each wrapper."),
      step.knead("Seal the Dumplings", 10, "Fold and press rhythmically to seal the dumplings."),
      step.heat("Steam the Dumplings", 98, "Keep the skillet hot enough to steam without drying out."),
      step.heat("Crisp the Bottoms", 96, "Finish the bottoms until golden and crisp."),
      step.plate("Serve the Dumplings", "Dumplings", 7, "Arrange the dumplings neatly on the plate."),
      step.season("Finish with Sesame Oil", "Sesame Oil", 5, "Add a final touch of sesame aroma."),
    ],
  },
  {
    id: "paella",
    name: "Chicken and Pea Paella",
    difficulty: "Hard",
    requiredPoints: 5660,
    servings: "Serves 6",
    summary:
      "A saffron-style rice skillet with chicken, peas, and savory stock.",
    ingredients: [
      "1 1/2 cups short-grain rice",
      "1 lb chicken thighs, diced",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tsp paprika",
      "3 cups chicken stock",
      "1 cup peas",
      "2 tbsp olive oil",
    ],
    method: [
      "Cook the onion and garlic in olive oil until softened.",
      "Brown the chicken and season with paprika.",
      "Stir in the rice until coated in the oil.",
      "Pour in the stock and simmer without stirring too much.",
      "Add the peas near the end of cooking.",
      "Rest briefly before serving.",
    ],
    baseReward: 330,
    steps: [
      step.slice("Dice the Onion", {
        goal: 4,
        ingredientLabel: "Onion Prep",
        startColor: "#f0d9a8",
        endColor: "#f6b1c3",
      }),
      step.slice("Dice the Chicken", {
        goal: 5,
        ingredientLabel: "Chicken Prep",
        appearance: "chicken",
        startColor: "#ffd4ba",
        endColor: "#f0ad8c",
      }),
      step.heat("Brown the Chicken", 98, "Cook the chicken until lightly golden."),
      step.season("Add the Paprika", "Paprika", 5, "Season the pan with a balanced shake of paprika."),
      step.mix("Coat the Rice", "soy", 84, "Stir until every grain is glossy."),
      step.heat("Simmer the Paella", 102, "Keep the rice at a steady simmer to absorb the stock."),
      step.season("Add the Peas", "Peas", 5, "Add the peas at the right moment for bright color."),
      step.plate("Serve the Skillet Rice", "Paella", 7, "Plate the paella in tidy scoops."),
    ],
  },
  {
    id: "tiramisu",
    name: "Berry Tiramisu Cups",
    difficulty: "Hard",
    requiredPoints: 5980,
    servings: "Serves 6",
    summary:
      "Individual tiramisu-inspired cups layered with mascarpone and berries.",
    ingredients: [
      "8 oz mascarpone",
      "1 cup heavy cream",
      "1/3 cup sugar",
      "1 tsp vanilla extract",
      "18 ladyfingers",
      "1 cup berry puree or jam",
      "1 cup mixed berries",
    ],
    method: [
      "Whip the cream with sugar and vanilla until soft peaks form.",
      "Fold in the mascarpone until smooth.",
      "Dip the ladyfingers lightly in the berry puree.",
      "Layer the cream mixture and ladyfingers in cups.",
      "Top with more berries.",
      "Chill before serving.",
    ],
    baseReward: 342,
    steps: [
      step.mix("Whip the Cream", "vanilla", 92, "Whisk until the cream turns light and fluffy."),
      step.mix("Fold in the Mascarpone", "vanilla", 88, "Mix just until smooth and creamy."),
      step.portion("Layer the Ladyfingers", "Ladyfingers", 8, "Build even layers in each cup."),
      step.portion("Add the Cream Layer", "Cream", 8, "Portion the cream evenly over the layers."),
      step.season("Top with Berries", "Berries", 5, "Add a bright berry finish in the sweet spot."),
      step.pipe("Decorate the Tops", 12, "Pipe soft cream swirls onto each dessert cup."),
      step.plate("Chill and Serve", "Dessert Cups", 7, "Set the cups into a neat serving arrangement."),
      step.season("Finish with Sugar", "Sugar", 5, "Add the final dusting without overdoing it."),
    ],
  },
  {
    id: "pot-pie",
    name: "Chicken Pot Pie",
    difficulty: "Hard",
    requiredPoints: 6300,
    servings: "Serves 6",
    summary:
      "A creamy chicken and vegetable filling sealed under a flaky crust.",
    ingredients: [
      "2 cups cooked chicken, diced",
      "1 cup carrots, diced",
      "1 cup peas",
      "1/2 onion, diced",
      "3 tbsp butter",
      "3 tbsp flour",
      "2 cups chicken stock",
      "1/2 cup milk",
      "1 sheet pie dough",
    ],
    method: [
      "Cook the onion and carrots in butter until softened.",
      "Stir in the flour, then whisk in the stock and milk.",
      "Simmer until thickened, then fold in the chicken and peas.",
      "Transfer the filling to a pie dish.",
      "Top with the dough and cut vents in the crust.",
      "Bake until the crust is golden and the filling bubbles.",
    ],
    baseReward: 354,
    steps: [
      step.slice("Dice the Onion and Carrots", {
        goal: 5,
        ingredientLabel: "Vegetable Prep",
        startColor: "#ffbe7a",
        endColor: "#ff8a8a",
      }),
      step.heat("Cook the Filling Base", 96, "Soften the vegetables without browning them too much."),
      step.mix("Whisk the Gravy", "carbonara", 90, "Whisk until the filling turns thick and silky."),
      step.season("Add the Peas", "Peas", 5, "Add the peas right into the heart zone."),
      step.portion("Fill the Pie Dish", "Filling", 8, "Spread the filling evenly into the dish."),
      step.knead("Lay the Crust", 10, "Stretch and fit the pie crust over the filling."),
      step.slice("Cut Steam Vents", {
        goal: 4,
        ingredientLabel: "Crust Vents",
        startColor: "#efd39e",
        endColor: "#d8a56a",
      }),
      step.heat("Bake the Pot Pie", 102, "Bake until the crust turns golden and crisp."),
    ],
  },
  {
    id: "falafel",
    name: "Herby Falafel Wraps",
    difficulty: "Hard",
    requiredPoints: 6620,
    servings: "Serves 4",
    summary:
      "Crisp falafel tucked into warm wraps with herbs and sauce.",
    ingredients: [
      "2 cups soaked chickpeas",
      "1/2 onion",
      "1 cup parsley and cilantro",
      "2 cloves garlic",
      "1 tsp cumin",
      "1 tsp coriander",
      "4 flatbreads",
      "Oil for frying",
    ],
    method: [
      "Blend the chickpeas with onion, herbs, garlic, and spices.",
      "Chill briefly, then shape into small patties or balls.",
      "Fry until crisp and deep golden.",
      "Warm the flatbreads.",
      "Fill the wraps with falafel and toppings.",
      "Serve immediately.",
    ],
    baseReward: 366,
    steps: [
      step.slice("Chop the Herbs", {
        goal: 5,
        ingredientLabel: "Herb Prep",
        startColor: "#9fd89f",
        endColor: "#6fbc73",
      }),
      step.mix("Blend the Falafel Base", "soy", 88, "Mix until the falafel base holds together."),
      step.season("Add the Spices", "Spices", 5, "Season the mixture until the meter lands in the heart."),
      step.portion("Shape the Falafel", "Falafel", 8, "Portion the falafel into even rounds."),
      step.heat("Fry the Falafel", 100, "Keep the oil steady so the outside turns crisp."),
      step.heat("Warm the Flatbreads", 90, "Warm the wraps without drying them out."),
      step.plate("Build the Wraps", "Wraps", 7, "Assemble the wraps in a neat order."),
      step.season("Finish with Sauce", "Sauce", 5, "Add the finishing sauce right into the sweet spot."),
    ],
  },
  {
    id: "risotto",
    name: "Mushroom Risotto",
    difficulty: "Hard",
    requiredPoints: 6940,
    servings: "Serves 4",
    summary:
      "Creamy risotto with mushrooms, parmesan, and a silky finish.",
    ingredients: [
      "1 1/2 cups arborio rice",
      "8 oz mushrooms, sliced",
      "1 shallot, diced",
      "4 cups warm stock",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "1/2 cup grated parmesan",
      "Salt and black pepper",
    ],
    method: [
      "Cook the shallot and mushrooms in butter and olive oil.",
      "Add the rice and stir until glossy.",
      "Add the warm stock a ladle at a time, stirring often.",
      "Cook until the rice is tender and creamy.",
      "Stir in parmesan and a final knob of butter.",
      "Serve right away.",
    ],
    baseReward: 378,
    steps: [
      step.slice("Slice the Mushrooms", {
        goal: 5,
        ingredientLabel: "Mushroom Prep",
        startColor: "#dbc09c",
        endColor: "#b8906a",
      }),
      step.slice("Dice the Shallot", {
        goal: 4,
        ingredientLabel: "Shallot Prep",
        startColor: "#f0d9a8",
        endColor: "#f2b7ca",
      }),
      step.heat("Cook the Mushrooms", 96, "Saute the mushrooms until tender and browned."),
      step.mix("Toast the Rice", "carbonara", 82, "Stir until the rice grains turn glossy."),
      step.heat("Add the Stock Slowly", 102, "Keep the risotto at a gentle simmer."),
      step.mix("Stir Until Creamy", "carbonara", 94, "Keep stirring until the risotto turns silky."),
      step.season("Finish with Parmesan", "Parmesan", 5, "Stir in the parmesan right in the sweet spot."),
      step.plate("Serve the Risotto", "Risotto", 7, "Plate the risotto while it is still loose and creamy."),
    ],
  },
  {
    id: "baklava",
    name: "Honey Pistachio Baklava",
    difficulty: "Hard",
    requiredPoints: 7260,
    servings: "Makes 16 pieces",
    summary:
      "Crisp layers of pastry filled with pistachios and soaked in honey syrup.",
    ingredients: [
      "1 package phyllo dough",
      "2 cups chopped pistachios",
      "1 tsp cinnamon",
      "3/4 cup melted butter",
      "3/4 cup honey",
      "1/2 cup sugar",
      "1/2 cup water",
    ],
    method: [
      "Mix the pistachios with cinnamon.",
      "Layer sheets of phyllo with melted butter in a baking pan.",
      "Scatter in the nut filling between layers.",
      "Cut the pastry into diamonds before baking.",
      "Bake until deeply golden and crisp.",
      "Pour over the warm honey syrup and let it soak in.",
    ],
    baseReward: 390,
    steps: [
      step.mix("Mix the Nut Filling", "cookie-dough", 82, "Mix the pistachios and cinnamon evenly."),
      step.portion("Layer the Phyllo", "Phyllo", 8, "Lay the pastry sheets evenly in the pan."),
      step.season("Brush with Butter", "Butter", 5, "Add enough butter to keep the layers crisp."),
      step.slice("Cut the Diamonds", {
        goal: 5,
        ingredientLabel: "Baklava Cuts",
        startColor: "#efd39e",
        endColor: "#d8a56a",
        diagonal: true,
      }),
      step.heat("Bake the Baklava", 102, "Bake until the pastry turns deep golden."),
      step.mix("Whisk the Honey Syrup", "soy", 82, "Stir the syrup until the sugar dissolves."),
      step.season("Pour the Syrup", "Honey Syrup", 5, "Add the syrup right into the heart zone."),
      step.plate("Arrange the Pieces", "Baklava", 7, "Plate the baklava in neat rows."),
    ],
  },
  {
    id: "bibimbap",
    name: "Colorful Bibimbap",
    difficulty: "Hard",
    requiredPoints: 7580,
    servings: "Serves 4",
    summary:
      "Warm rice bowls topped with vegetables, beef, and a spicy sauce.",
    ingredients: [
      "3 cups cooked rice",
      "8 oz beef, sliced thin",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "2 cups spinach",
      "4 eggs",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 tbsp gochujang sauce",
    ],
    method: [
      "Slice the beef and vegetables.",
      "Cook each vegetable separately until tender.",
      "Cook the beef with soy sauce and sesame oil.",
      "Fry the eggs sunny-side up.",
      "Fill bowls with rice and arrange the toppings over the top.",
      "Serve with spicy sauce for mixing.",
    ],
    baseReward: 402,
    steps: [
      step.slice("Slice the Vegetables", {
        goal: 5,
        ingredientLabel: "Vegetable Prep",
        startColor: "#ffbe7a",
        endColor: "#79c98b",
      }),
      step.slice("Slice the Beef", {
        goal: 5,
        ingredientLabel: "Beef Prep",
        appearance: "chicken",
        startColor: "#d99d94",
        endColor: "#b96d68",
      }),
      step.heat("Cook the Vegetables", 96, "Cook the vegetables until tender but bright."),
      step.heat("Cook the Beef", 98, "Keep the beef hot enough to sear quickly."),
      step.heat("Fry the Eggs", 94, "Cook the eggs until the whites are set."),
      step.portion("Fill the Rice Bowls", "Rice", 8, "Portion the rice evenly into each bowl."),
      step.plate("Arrange the Toppings", "Bibimbap", 7, "Build the toppings in a neat colorful pattern."),
      step.season("Add the Sauce", "Gochujang", 5, "Finish with the right amount of spicy sauce."),
    ],
  },
  {
    id: "croissants",
    name: "Chocolate Croissants",
    difficulty: "Hard",
    requiredPoints: 7900,
    servings: "Makes 8 pastries",
    summary:
      "Flaky pastries wrapped around dark chocolate and baked until crisp.",
    ingredients: [
      "1 sheet puff pastry or croissant dough",
      "8 pieces dark chocolate",
      "1 egg",
      "1 tbsp water",
      "Powdered sugar for dusting",
    ],
    method: [
      "Roll the dough slightly and cut into rectangles or triangles.",
      "Place chocolate near one edge of each piece.",
      "Roll the dough around the chocolate.",
      "Brush with egg wash.",
      "Bake until puffed and deeply golden.",
      "Dust lightly with powdered sugar before serving.",
    ],
    baseReward: 414,
    steps: [
      step.slice("Cut the Dough", {
        goal: 4,
        ingredientLabel: "Pastry Cuts",
        startColor: "#f3dfb6",
        endColor: "#d8a56a",
      }),
      step.portion("Add the Chocolate", "Chocolate", 8, "Place one chocolate piece into each pastry."),
      step.knead("Roll the Croissants", 10, "Roll and tuck the dough to seal the pastries."),
      step.mix("Whisk the Egg Wash", "carbonara", 78, "Whisk the egg wash until smooth."),
      step.season("Brush the Tops", "Egg Wash", 5, "Add just enough egg wash for shine."),
      step.heat("Bake the Croissants", 102, "Bake until the layers puff and turn golden."),
      step.season("Dust with Sugar", "Sugar", 5, "Finish with a delicate dusting of sugar."),
      step.plate("Serve the Pastries", "Croissants", 7, "Arrange the pastries neatly for serving."),
    ],
  },
  {
    id: "kimchi-fried-rice",
    name: "Kimchi Fried Rice",
    difficulty: "Hard",
    requiredPoints: 10780,
    servings: "Serves 4",
    summary:
      "Bold fried rice with kimchi, egg, and a savory spicy finish.",
    ingredients: [
      "3 cups cold cooked rice",
      "1 cup chopped kimchi",
      "2 eggs",
      "2 scallions, sliced",
      "2 tbsp gochujang",
      "1 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 tbsp neutral oil",
    ],
    method: [
      "Slice the scallions and chop the kimchi.",
      "Scramble the eggs lightly in a hot pan.",
      "Cook the kimchi briefly until fragrant.",
      "Add the rice and break up any clumps.",
      "Stir in the sauces and eggs.",
      "Finish with scallions and serve hot.",
    ],
    baseReward: 522,
    steps: [
      step.slice("Slice the Scallions", { goal: 4, ingredientLabel: "Scallion Prep", startColor: "#a9ddb0", endColor: "#7ac88e" }),
      step.mix("Beat the Eggs", "carbonara", 78, "Whisk the eggs until smooth."),
      step.heat("Cook the Kimchi", 94, "Keep the pan hot enough to wake up the kimchi."),
      step.portion("Add the Rice", "Rice", 8, "Portion the rice evenly into the pan."),
      step.season("Add the Sauce", "Sauce", 5, "Season the rice right into the sweet spot."),
      step.heat("Finish the Fried Rice", 100, "Keep everything hot enough to stay fluffy."),
      step.plate("Serve the Bowls", "Kimchi Fried Rice", 7, "Serve the rice in neat bowls."),
      step.season("Top with Scallions", "Scallions", 5, "Add a bright scallion finish."),
    ],
  },
  {
    id: "lemon-bars",
    name: "Sunny Lemon Bars",
    difficulty: "Hard",
    requiredPoints: 11100,
    servings: "Makes 16 bars",
    summary:
      "Buttery shortbread topped with a bright lemon custard.",
    ingredients: [
      "1 1/2 cups flour",
      "1/2 cup powdered sugar",
      "3/4 cup butter",
      "3 eggs",
      "1 cup sugar",
      "1/2 cup lemon juice",
      "1 tbsp lemon zest",
      "Powdered sugar for dusting",
    ],
    method: [
      "Mix the shortbread base and press it into a pan.",
      "Bake the crust until just set.",
      "Whisk the eggs, sugar, lemon juice, and zest.",
      "Pour the filling over the warm crust.",
      "Bake until the center is barely set.",
      "Cool, dust with sugar, and cut into bars.",
    ],
    baseReward: 534,
    steps: [
      step.mix("Mix the Shortbread", "cookie-dough", 88, "Mix until the dough looks sandy and rich."),
      step.portion("Press into the Pan", "Shortbread", 8, "Spread the crust evenly into the pan."),
      step.heat("Bake the Crust", 96, "Bake until the crust is lightly golden."),
      step.mix("Whisk the Lemon Filling", "vanilla", 92, "Whisk until the filling is smooth and glossy."),
      step.season("Add the Lemon Zest", "Lemon Zest", 5, "Add the zest right into the heart zone."),
      step.heat("Bake the Bars", 100, "Bake until the lemon layer is softly set."),
      step.slice("Cut the Bars", { goal: 4, ingredientLabel: "Bar Cuts", startColor: "#f7e58e", endColor: "#f2c45b" }),
      step.season("Dust with Sugar", "Sugar", 5, "Finish with a soft sugary dusting."),
    ],
  },
  {
    id: "baked-ziti",
    name: "Cheesy Baked Ziti",
    difficulty: "Hard",
    requiredPoints: 11420,
    servings: "Serves 6",
    summary:
      "Tender ziti layered with tomato sauce and bubbling cheese.",
    ingredients: [
      "12 oz ziti",
      "1 jar marinara sauce",
      "1 cup ricotta",
      "2 cups mozzarella",
      "1/4 cup parmesan",
      "2 tbsp olive oil",
      "Salt",
      "Fresh basil",
    ],
    method: [
      "Boil the pasta until just shy of tender.",
      "Stir the pasta with marinara.",
      "Layer with ricotta and mozzarella in a baking dish.",
      "Top with more sauce and cheese.",
      "Bake until bubbly and golden.",
      "Finish with basil before serving.",
    ],
    baseReward: 546,
    steps: [
      step.heat("Boil the Ziti", 96, "Cook the pasta until nearly tender."),
      step.mix("Stir the Sauce", "tomato", 86, "Coat the ziti evenly in sauce."),
      step.portion("Layer the Ricotta", "Ricotta", 8, "Portion ricotta evenly through the dish."),
      step.season("Top with Mozzarella", "Cheese", 5, "Add just enough cheese for a bubbly top."),
      step.heat("Bake the Ziti", 100, "Bake until the edges bubble."),
      step.slice("Slice the Basil", { goal: 4, ingredientLabel: "Basil Prep", startColor: "#9fd89f", endColor: "#79c98b" }),
      step.plate("Serve the Ziti", "Baked Ziti", 7, "Serve the ziti in neat portions."),
      step.season("Finish with Parmesan", "Parmesan", 5, "Add the final shower of parmesan."),
    ],
  },
  {
    id: "satay-skewers",
    name: "Chicken Satay Skewers",
    difficulty: "Hard",
    requiredPoints: 11740,
    servings: "Serves 4",
    summary:
      "Tender chicken skewers with a creamy peanut sauce.",
    ingredients: [
      "1 1/2 lb chicken thighs",
      "1 tbsp soy sauce",
      "1 tbsp brown sugar",
      "1 tsp turmeric",
      "1 cup peanut sauce",
      "Skewers",
      "Oil",
      "Lime wedges",
    ],
    method: [
      "Slice the chicken into strips.",
      "Season the chicken with soy sauce, sugar, and turmeric.",
      "Thread the chicken onto skewers.",
      "Cook until charred and cooked through.",
      "Warm the peanut sauce.",
      "Serve with lime wedges.",
    ],
    baseReward: 558,
    steps: [
      step.slice("Slice the Chicken", { goal: 5, ingredientLabel: "Chicken Prep", appearance: "chicken", startColor: "#ffd4ba", endColor: "#f0ad8c" }),
      step.season("Season the Chicken", "Spices", 5, "Season the satay right into the center zone."),
      step.portion("Thread the Skewers", "Chicken", 8, "Build even satay skewers."),
      step.heat("Grill the Satay", 100, "Keep the grill hot enough to char the edges."),
      step.mix("Warm the Peanut Sauce", "soy", 82, "Stir until the sauce loosens and turns glossy."),
      step.plate("Arrange the Skewers", "Satay", 7, "Set the skewers neatly on the plate."),
      step.season("Finish with Lime", "Lime", 5, "Add a bright citrus finish."),
      step.heat("Keep the Sauce Warm", 88, "Hold the sauce warm without scorching it."),
    ],
  },
  {
    id: "pumpkin-soup",
    name: "Creamy Pumpkin Soup",
    difficulty: "Hard",
    requiredPoints: 12060,
    servings: "Serves 4",
    summary:
      "Velvety pumpkin soup with onion, cream, and warm spices.",
    ingredients: [
      "4 cups pumpkin puree",
      "1 onion, diced",
      "2 cloves garlic",
      "3 cups stock",
      "1/2 cup cream",
      "1 tsp cinnamon",
      "1 tbsp butter",
      "Salt and pepper",
    ],
    method: [
      "Cook the onion and garlic in butter until soft.",
      "Stir in the pumpkin and stock.",
      "Simmer until the flavors blend.",
      "Blend until smooth.",
      "Stir in the cream and seasoning.",
      "Serve warm.",
    ],
    baseReward: 570,
    steps: [
      step.slice("Dice the Onion", { goal: 4, ingredientLabel: "Onion Prep", startColor: "#f0d9a8", endColor: "#f6b1c3" }),
      step.heat("Soften the Onion", 94, "Cook until the onion turns soft and sweet."),
      step.mix("Stir the Pumpkin Base", "vanilla", 86, "Blend the soup base until silky."),
      step.heat("Simmer the Soup", 100, "Keep the soup at a gentle simmer."),
      step.season("Add Warm Spices", "Spices", 5, "Season the soup right into the heart zone."),
      step.mix("Swirl in the Cream", "vanilla", 82, "Stir until the soup looks smooth and rich."),
      step.plate("Serve the Bowls", "Pumpkin Soup", 7, "Serve the soup in neat warm bowls."),
      step.season("Finish with Pepper", "Pepper", 5, "Add a final touch of pepper."),
    ],
  },
  {
    id: "churros",
    name: "Cinnamon Sugar Churros",
    difficulty: "Hard",
    requiredPoints: 12380,
    servings: "Makes 14 churros",
    summary:
      "Crisp churros rolled in cinnamon sugar and served warm.",
    ingredients: [
      "1 cup water",
      "1/2 cup butter",
      "1 cup flour",
      "3 eggs",
      "Oil for frying",
      "1/2 cup sugar",
      "1 tsp cinnamon",
      "Chocolate sauce",
    ],
    method: [
      "Cook the water and butter together, then stir in the flour.",
      "Beat in the eggs until the dough turns glossy.",
      "Pipe long ribbons into hot oil.",
      "Fry until golden and crisp.",
      "Roll in cinnamon sugar.",
      "Serve with chocolate sauce.",
    ],
    baseReward: 582,
    steps: [
      step.heat("Cook the Dough Base", 92, "Cook until the dough pulls from the pan."),
      step.mix("Beat in the Eggs", "vanilla", 92, "Mix until the dough looks smooth and shiny."),
      step.pipe("Pipe the Churros", 12, "Pipe long even churros into the oil."),
      step.heat("Fry the Churros", 100, "Keep the oil steady for crisp churros."),
      step.season("Roll in Cinnamon Sugar", "Sugar", 5, "Coat the churros right into the sweet spot."),
      step.plate("Arrange the Churros", "Churros", 7, "Stack the churros neatly for serving."),
      step.mix("Stir the Chocolate Sauce", "chocolate", 82, "Warm the sauce until glossy."),
      step.season("Finish the Plate", "Chocolate", 5, "Add a tidy finishing drizzle."),
    ],
  },
  {
    id: "pesto-pasta",
    name: "Basil Pesto Pasta",
    difficulty: "Hard",
    requiredPoints: 12700,
    servings: "Serves 4",
    summary:
      "Bright pesto tossed with pasta and parmesan.",
    ingredients: [
      "12 oz pasta",
      "2 cups basil",
      "1/3 cup parmesan",
      "1/4 cup olive oil",
      "2 tbsp nuts",
      "1 clove garlic",
      "Salt",
      "Lemon zest",
    ],
    method: [
      "Boil the pasta until al dente.",
      "Slice the basil and garlic.",
      "Blend the pesto ingredients until smooth.",
      "Toss the pesto with the pasta.",
      "Finish with parmesan and lemon zest.",
      "Serve warm.",
    ],
    baseReward: 594,
    steps: [
      step.heat("Boil the Pasta", 96, "Cook the pasta until tender and springy."),
      step.slice("Slice the Basil", { goal: 4, ingredientLabel: "Basil Prep", startColor: "#9fd89f", endColor: "#79c98b" }),
      step.mix("Blend the Pesto", "soy", 88, "Mix until the pesto turns smooth and glossy."),
      step.mix("Toss the Pasta", "soy", 86, "Coat the pasta evenly in pesto."),
      step.season("Add the Parmesan", "Parmesan", 5, "Add a balanced shower of cheese."),
      step.season("Finish with Lemon", "Lemon Zest", 5, "Add a bright citrus finish."),
      step.plate("Serve the Pasta", "Pesto Pasta", 7, "Twirl the pasta neatly into bowls."),
      step.heat("Keep It Warm", 88, "Hold the pasta warm before serving."),
    ],
  },
  {
    id: "chicken-parmesan",
    name: "Chicken Parmesan",
    difficulty: "Hard",
    requiredPoints: 13020,
    servings: "Serves 4",
    summary:
      "Breaded chicken baked with tomato sauce and melted cheese.",
    ingredients: [
      "2 chicken breasts",
      "1 cup flour",
      "2 eggs",
      "1 1/2 cups breadcrumbs",
      "1 cup marinara",
      "1 cup mozzarella",
      "1/4 cup parmesan",
      "Oil",
    ],
    method: [
      "Slice the chicken into cutlets.",
      "Coat the chicken in flour, egg, and breadcrumbs.",
      "Brown the cutlets until crisp.",
      "Top with marinara and cheese.",
      "Bake until the cheese melts and the chicken cooks through.",
      "Serve hot.",
    ],
    baseReward: 606,
    steps: [
      step.slice("Slice the Chicken", { goal: 5, ingredientLabel: "Chicken Cutlets", appearance: "chicken", startColor: "#ffd4ba", endColor: "#f0ad8c" }),
      step.dredge("Bread the Chicken", 3, "Drag the chicken through flour, egg, and crumbs."),
      step.heat("Brown the Cutlets", 98, "Keep the pan hot enough to crisp the coating."),
      step.portion("Top with Marinara", "Sauce", 8, "Portion sauce evenly over the cutlets."),
      step.season("Add the Cheese", "Cheese", 5, "Add enough cheese for a melty finish."),
      step.heat("Bake the Chicken", 100, "Bake until the chicken is hot and cooked through."),
      step.plate("Serve the Cutlets", "Chicken Parmesan", 7, "Plate the chicken neatly."),
      step.season("Finish with Parmesan", "Parmesan", 5, "Add a final shower of parmesan."),
    ],
  },
  {
    id: "banana-bread",
    name: "Walnut Banana Bread",
    difficulty: "Hard",
    requiredPoints: 13340,
    servings: "Makes 1 loaf",
    summary:
      "Moist banana bread with crunchy walnuts and a tender crumb.",
    ingredients: [
      "3 ripe bananas",
      "2 cups flour",
      "3/4 cup sugar",
      "2 eggs",
      "1/2 cup melted butter",
      "1 tsp baking soda",
      "1/2 cup walnuts",
      "1 tsp cinnamon",
    ],
    method: [
      "Mash the bananas.",
      "Whisk the wet ingredients together.",
      "Mix in the dry ingredients and walnuts.",
      "Spread the batter into a loaf pan.",
      "Bake until deeply golden.",
      "Cool before slicing.",
    ],
    baseReward: 618,
    steps: [
      step.mix("Mash the Bananas", "vanilla", 84, "Mash until the bananas turn soft and smooth."),
      step.mix("Whisk the Batter", "cookie-dough", 90, "Mix until the batter comes together."),
      step.season("Fold in the Walnuts", "Walnuts", 5, "Add the nuts without overmixing."),
      step.portion("Fill the Loaf Pan", "Batter", 8, "Spread the batter evenly into the pan."),
      step.heat("Bake the Bread", 102, "Bake until the loaf turns golden and set."),
      step.slice("Slice the Loaf", { goal: 4, ingredientLabel: "Banana Bread Slices", appearance: "loaf", startColor: "#e4c28e", endColor: "#ca965e" }),
      step.plate("Serve the Slices", "Banana Bread", 7, "Plate the slices neatly."),
      step.season("Finish with Cinnamon", "Cinnamon", 5, "Add a tiny warm-spice finish."),
    ],
  },
  {
    id: "beef-bulgogi-bowls",
    name: "Beef Bulgogi Bowls",
    difficulty: "Hard",
    requiredPoints: 13660,
    servings: "Serves 4",
    summary:
      "Sweet-savory beef bowls with rice and sesame flavor.",
    ingredients: [
      "1 lb thin-sliced beef",
      "3 cups cooked rice",
      "2 tbsp soy sauce",
      "1 tbsp brown sugar",
      "1 tsp sesame oil",
      "2 scallions",
      "2 cloves garlic",
      "Sesame seeds",
    ],
    method: [
      "Slice the scallions and garlic.",
      "Mix the bulgogi sauce.",
      "Season the beef and let it coat well.",
      "Cook the beef quickly over high heat.",
      "Portion rice into bowls.",
      "Top with beef and garnish.",
    ],
    baseReward: 630,
    steps: [
      step.slice("Slice the Scallions", { goal: 4, ingredientLabel: "Scallion Prep", startColor: "#a9ddb0", endColor: "#7ac88e" }),
      step.mix("Mix the Bulgogi Sauce", "soy", 88, "Whisk until the sauce turns glossy."),
      step.season("Coat the Beef", "Sauce", 5, "Season the beef right into the sweet spot."),
      step.heat("Cook the Beef", 100, "Sear the beef quickly without drying it out."),
      step.portion("Fill the Rice Bowls", "Rice", 8, "Portion the rice evenly into bowls."),
      step.plate("Top with Beef", "Bulgogi Bowls", 7, "Build the bowls neatly."),
      step.season("Finish with Sesame", "Sesame", 5, "Add a light sesame finish."),
      step.heat("Keep the Bowls Warm", 88, "Hold the bowls warm before serving."),
    ],
  },
  {
    id: "apple-crisp",
    name: "Brown Sugar Apple Crisp",
    difficulty: "Hard",
    requiredPoints: 13980,
    servings: "Serves 8",
    summary:
      "Tender apples under a buttery oat crumble.",
    ingredients: [
      "6 apples",
      "1/2 cup sugar",
      "1 tsp cinnamon",
      "1 cup oats",
      "3/4 cup flour",
      "1/2 cup brown sugar",
      "6 tbsp butter",
      "Pinch of salt",
    ],
    method: [
      "Slice the apples and toss them with sugar and cinnamon.",
      "Mix the oat crumble topping.",
      "Fill the baking dish with apples.",
      "Scatter over the crumble.",
      "Bake until bubbling and golden.",
      "Cool slightly before serving.",
    ],
    baseReward: 642,
    steps: [
      step.slice("Slice the Apples", { goal: 5, ingredientLabel: "Apple Prep", startColor: "#ffd6a3", endColor: "#f2a15d" }),
      step.mix("Mix the Apple Filling", "vanilla", 84, "Coat the apples evenly in sugar and spice."),
      step.mix("Make the Crumble", "cookie-dough", 90, "Mix until the topping turns sandy and clumpy."),
      step.portion("Fill the Dish", "Apples", 8, "Spread the apples evenly into the dish."),
      step.season("Top with Crumble", "Crumble", 5, "Cover the apples with an even crumble layer."),
      step.heat("Bake the Crisp", 102, "Bake until the topping turns golden."),
      step.plate("Serve the Crisp", "Apple Crisp", 7, "Serve the crisp in warm bowls."),
      step.season("Finish with Cinnamon", "Cinnamon", 5, "Add a final warm-spice finish."),
    ],
  },
  {
    id: "tuna-mayo-onigiri",
    name: "Tuna Mayo Onigiri",
    difficulty: "Hard",
    requiredPoints: 14300,
    servings: "Makes 8 onigiri",
    summary:
      "Cute rice triangles filled with creamy tuna mayo.",
    ingredients: [
      "3 cups cooked rice",
      "1 can tuna",
      "3 tbsp mayo",
      "1 tsp soy sauce",
      "Nori sheets",
      "Salt",
      "2 scallions",
      "Sesame seeds",
    ],
    method: [
      "Mix the tuna with mayo and soy sauce.",
      "Slice the scallions.",
      "Season the rice lightly.",
      "Portion rice and add tuna filling.",
      "Shape into triangles.",
      "Wrap with nori and serve.",
    ],
    baseReward: 654,
    steps: [
      step.mix("Mix the Tuna Filling", "carbonara", 82, "Mix until the filling turns creamy."),
      step.slice("Slice the Scallions", { goal: 4, ingredientLabel: "Scallion Prep", startColor: "#a9ddb0", endColor: "#7ac88e" }),
      step.season("Season the Rice", "Salt", 5, "Season the rice lightly right into the center zone."),
      step.portion("Add the Filling", "Rice", 8, "Portion rice and filling evenly."),
      step.knead("Shape the Onigiri", 10, "Fold and press the rice into tidy triangles."),
      step.portion("Wrap with Nori", "Nori", 8, "Wrap each rice triangle neatly."),
      step.plate("Arrange the Onigiri", "Onigiri", 7, "Set the onigiri into a clean pattern."),
      step.season("Finish with Sesame", "Sesame", 5, "Add a light sesame finish."),
    ],
  },
  {
    id: "veggie-samosas",
    name: "Spiced Veggie Samosas",
    difficulty: "Hard",
    requiredPoints: 14620,
    servings: "Makes 12 samosas",
    summary:
      "Crisp pastries filled with spiced potato and peas.",
    ingredients: [
      "2 potatoes",
      "1/2 cup peas",
      "1 tsp cumin",
      "1 tsp garam masala",
      "Samosa wrappers",
      "Oil for frying",
      "Salt",
      "Cilantro",
    ],
    method: [
      "Cook and mash the potatoes lightly.",
      "Season the potatoes with peas and spices.",
      "Fill the wrappers.",
      "Fold into triangles and seal.",
      "Fry until crisp and golden.",
      "Serve warm.",
    ],
    baseReward: 666,
    steps: [
      step.heat("Cook the Potatoes", 96, "Cook until the potatoes turn tender."),
      step.mix("Mix the Filling", "vanilla", 84, "Stir the filling until the spices coat evenly."),
      step.season("Add the Spices", "Spices", 5, "Season the filling right into the heart zone."),
      step.portion("Fill the Wrappers", "Filling", 8, "Portion the filling evenly."),
      step.knead("Fold the Samosas", 10, "Fold and seal the samosas neatly."),
      step.heat("Fry the Samosas", 100, "Fry until the pastry turns crisp and golden."),
      step.plate("Serve the Samosas", "Samosas", 7, "Arrange the samosas neatly."),
      step.slice("Chop the Cilantro", { goal: 4, ingredientLabel: "Cilantro Prep", startColor: "#9fd89f", endColor: "#72bf7a" }),
    ],
  },
  {
    id: "sticky-toffee-pudding",
    name: "Sticky Toffee Pudding",
    difficulty: "Hard",
    requiredPoints: 14940,
    servings: "Serves 8",
    summary:
      "Soft date cake soaked with warm toffee sauce.",
    ingredients: [
      "1 cup chopped dates",
      "1 tsp baking soda",
      "1 cup flour",
      "1/2 cup brown sugar",
      "2 eggs",
      "1/2 cup butter",
      "1 cup cream",
      "1/2 cup dark sugar",
    ],
    method: [
      "Soften the dates in hot water and baking soda.",
      "Mix the cake batter.",
      "Portion into a baking dish.",
      "Bake until springy.",
      "Cook the toffee sauce.",
      "Pour over the cake and serve warm.",
    ],
    baseReward: 678,
    steps: [
      step.heat("Soften the Dates", 88, "Warm the dates until they soften."),
      step.mix("Mix the Cake Batter", "cookie-dough", 90, "Mix until the batter is smooth."),
      step.portion("Fill the Dish", "Batter", 8, "Spread the batter evenly into the dish."),
      step.heat("Bake the Pudding", 100, "Bake until the sponge is just set."),
      step.mix("Cook the Toffee Sauce", "chocolate", 86, "Stir until the sauce turns glossy."),
      step.season("Pour the Sauce", "Toffee Sauce", 5, "Pour the sauce right into the sweet spot."),
      step.slice("Cut the Squares", { goal: 4, ingredientLabel: "Pudding Cuts", startColor: "#e5bb84", endColor: "#b9774e" }),
      step.plate("Serve the Pudding", "Sticky Toffee Pudding", 7, "Plate the pudding neatly."),
    ],
  },
  {
    id: "teriyaki-meatballs",
    name: "Teriyaki Meatballs",
    difficulty: "Hard",
    requiredPoints: 15260,
    servings: "Serves 4",
    summary:
      "Tender meatballs glazed in a shiny teriyaki sauce.",
    ingredients: [
      "1 lb ground chicken",
      "1 egg",
      "1/2 cup breadcrumbs",
      "1/4 cup soy sauce",
      "2 tbsp sugar",
      "1 tsp ginger",
      "2 scallions",
      "1 tbsp sesame seeds",
    ],
    method: [
      "Mix and shape the meatballs.",
      "Brown them lightly in a pan.",
      "Whisk the teriyaki sauce.",
      "Simmer the meatballs in the sauce.",
      "Top with scallions and sesame.",
      "Serve warm.",
    ],
    baseReward: 690,
    steps: [
      step.mix("Mix the Meatballs", "cookie-dough", 88, "Mix until the meatball base just comes together."),
      step.portion("Shape the Meatballs", "Meatballs", 8, "Portion even meatballs."),
      step.heat("Brown the Meatballs", 96, "Brown the meatballs gently."),
      step.mix("Whisk the Teriyaki Sauce", "soy", 88, "Whisk until the sauce turns shiny."),
      step.heat("Glaze the Meatballs", 100, "Simmer until the glaze clings to the meatballs."),
      step.slice("Slice the Scallions", { goal: 4, ingredientLabel: "Scallion Prep", startColor: "#a9ddb0", endColor: "#7ac88e" }),
      step.plate("Serve the Meatballs", "Teriyaki Meatballs", 7, "Arrange the meatballs neatly."),
      step.season("Finish with Sesame", "Sesame", 5, "Add a final sesame finish."),
    ],
  },
  {
    id: "spinach-ricotta-shells",
    name: "Spinach Ricotta Shells",
    difficulty: "Hard",
    requiredPoints: 15580,
    servings: "Serves 6",
    summary:
      "Pasta shells stuffed with ricotta and spinach in tomato sauce.",
    ingredients: [
      "20 jumbo shells",
      "1 cup ricotta",
      "2 cups spinach",
      "1 egg",
      "1 jar marinara",
      "1 cup mozzarella",
      "1/4 cup parmesan",
      "Salt and pepper",
    ],
    method: [
      "Boil the shells until flexible.",
      "Slice the spinach and mix the filling.",
      "Stuff the shells.",
      "Arrange them over sauce in a baking dish.",
      "Top with cheese.",
      "Bake until bubbling.",
    ],
    baseReward: 702,
    steps: [
      step.heat("Boil the Shells", 96, "Cook the shells until flexible but not torn."),
      step.slice("Slice the Spinach", { goal: 4, ingredientLabel: "Spinach Prep", startColor: "#9fd89f", endColor: "#72bf7a" }),
      step.mix("Mix the Ricotta Filling", "carbonara", 86, "Mix until the filling turns creamy and even."),
      step.portion("Stuff the Shells", "Filling", 10, "Fill each shell evenly."),
      step.portion("Arrange in the Dish", "Shells", 8, "Set the shells neatly into the sauce."),
      step.season("Top with Cheese", "Cheese", 5, "Add enough cheese for a bubbly top."),
      step.heat("Bake the Shells", 100, "Bake until the sauce bubbles around the edges."),
      step.plate("Serve the Shells", "Stuffed Shells", 7, "Plate the shells neatly."),
    ],
  },
  {
    id: "mango-sago-cups",
    name: "Mango Sago Cups",
    difficulty: "Hard",
    requiredPoints: 15900,
    servings: "Serves 6",
    summary:
      "Chilled mango dessert cups with creamy sago pearls.",
    ingredients: [
      "2 ripe mangoes",
      "1/2 cup sago pearls",
      "1 cup coconut milk",
      "1/2 cup cream",
      "1/4 cup sugar",
      "Ice",
      "Mint leaves",
      "Lime zest",
    ],
    method: [
      "Cook the sago until translucent.",
      "Slice the mangoes.",
      "Mix the coconut cream base.",
      "Portion the sago and mango into cups.",
      "Top with the cream mixture.",
      "Chill and serve.",
    ],
    baseReward: 714,
    steps: [
      step.heat("Cook the Sago", 94, "Cook until the pearls turn translucent."),
      step.slice("Slice the Mango", { goal: 5, ingredientLabel: "Mango Prep", startColor: "#ffcb8e", endColor: "#ff9b78" }),
      step.mix("Mix the Cream Base", "vanilla", 84, "Mix until the coconut cream base is smooth."),
      step.portion("Fill the Cups", "Sago", 8, "Portion the sago evenly into the cups."),
      step.portion("Top with Mango", "Mango", 8, "Add the mango evenly across the cups."),
      step.season("Finish with Lime", "Lime Zest", 5, "Add a bright citrus finish."),
      step.plate("Chill and Serve", "Dessert Cups", 7, "Arrange the cups neatly."),
      step.season("Finish with Mint", "Mint", 5, "Add a tiny mint finish."),
    ],
  },
  {
    id: "lamb-kofta",
    name: "Lamb Kofta Skewers",
    difficulty: "Hard",
    requiredPoints: 16220,
    servings: "Serves 4",
    summary:
      "Spiced lamb kofta skewers with herbs and a charred finish.",
    ingredients: [
      "1 lb ground lamb",
      "1/2 onion",
      "1/4 cup parsley",
      "1 tsp cumin",
      "1 tsp coriander",
      "1 egg",
      "Skewers",
      "Yogurt sauce",
    ],
    method: [
      "Dice the onion and herbs.",
      "Mix the lamb with onion, herbs, spices, and egg.",
      "Shape around skewers.",
      "Cook until charred and cooked through.",
      "Serve with yogurt sauce.",
      "Enjoy warm.",
    ],
    baseReward: 726,
    steps: [
      step.slice("Dice the Onion", { goal: 4, ingredientLabel: "Onion Prep", startColor: "#f0d9a8", endColor: "#f6b1c3" }),
      step.slice("Chop the Herbs", { goal: 4, ingredientLabel: "Herb Prep", startColor: "#9fd89f", endColor: "#72bf7a" }),
      step.mix("Mix the Kofta Base", "soy", 88, "Mix until the lamb mixture feels cohesive."),
      step.season("Add the Spices", "Spices", 5, "Season the kofta right into the center zone."),
      step.portion("Shape the Skewers", "Kofta", 8, "Shape even kofta along the skewers."),
      step.heat("Cook the Kofta", 100, "Cook until the outside chars lightly."),
      step.plate("Serve the Skewers", "Kofta", 7, "Arrange the kofta neatly."),
      step.season("Finish with Sauce", "Yogurt Sauce", 5, "Add a cool finishing drizzle."),
    ],
  },
  {
    id: "breakfast-burritos",
    name: "Breakfast Burritos",
    difficulty: "Hard",
    requiredPoints: 16540,
    servings: "Serves 4",
    summary:
      "Warm burritos packed with eggs, potatoes, and cheese.",
    ingredients: [
      "4 tortillas",
      "4 eggs",
      "2 potatoes",
      "1 cup cheese",
      "1/2 onion",
      "1 tbsp butter",
      "Hot sauce",
      "Salt and pepper",
    ],
    method: [
      "Dice the potatoes and onion.",
      "Cook the potatoes until tender and golden.",
      "Scramble the eggs softly.",
      "Fill the tortillas with eggs, potatoes, and cheese.",
      "Roll the burritos closed.",
      "Toast lightly and serve.",
    ],
    baseReward: 738,
    steps: [
      step.slice("Dice the Potatoes", { goal: 5, ingredientLabel: "Potato Prep", startColor: "#f1d4a2", endColor: "#d9a46c" }),
      step.slice("Dice the Onion", { goal: 4, ingredientLabel: "Onion Prep", startColor: "#f0d9a8", endColor: "#f6b1c3" }),
      step.heat("Cook the Potatoes", 98, "Cook the potatoes until golden and tender."),
      step.mix("Beat the Eggs", "carbonara", 78, "Whisk until the eggs are smooth."),
      step.heat("Scramble the Eggs", 92, "Cook the eggs softly."),
      step.portion("Fill the Burritos", "Filling", 8, "Portion the filling evenly."),
      step.knead("Roll the Burritos", 10, "Roll the burritos into tidy bundles."),
      step.plate("Serve the Burritos", "Breakfast Burritos", 7, "Plate the burritos neatly."),
    ],
  },
  {
    id: "creme-brulee-toast",
    name: "Creme Brulee Toast",
    difficulty: "Hard",
    requiredPoints: 16860,
    servings: "Serves 4",
    summary:
      "Thick toast with creamy custard and a crackly sugar top.",
    ingredients: [
      "4 thick bread slices",
      "3 eggs",
      "1 cup cream",
      "1/4 cup sugar",
      "1 tsp vanilla",
      "Butter",
      "Extra sugar",
      "Berries",
    ],
    method: [
      "Whisk the custard.",
      "Dip the bread in the custard.",
      "Cook the toast in butter until golden.",
      "Sprinkle sugar over the tops.",
      "Caramelize the sugar.",
      "Serve with berries.",
    ],
    baseReward: 750,
    steps: [
      step.mix("Whisk the Custard", "vanilla", 90, "Whisk until the custard is smooth."),
      step.portion("Dip the Bread", "Bread", 8, "Coat each slice evenly."),
      step.heat("Toast the Bread", 98, "Cook until the bread turns golden."),
      step.season("Top with Sugar", "Sugar", 5, "Add an even sugary layer."),
      step.heat("Caramelize the Top", 100, "Keep the sugar in the sweet spot for a crackly top."),
      step.plate("Serve the Toast", "Creme Brulee Toast", 7, "Arrange the toast neatly."),
      step.season("Finish with Berries", "Berries", 5, "Add a bright berry finish."),
      step.heat("Keep It Warm", 88, "Hold the toast warm before serving."),
    ],
  },
  {
    id: "shakshuka",
    name: "Shakshuka Skillet",
    difficulty: "Hard",
    requiredPoints: 17180,
    servings: "Serves 4",
    summary:
      "Eggs gently cooked in a spiced tomato and pepper sauce.",
    ingredients: [
      "1 onion",
      "1 red pepper",
      "2 cloves garlic",
      "1 can tomatoes",
      "4 eggs",
      "1 tsp paprika",
      "1 tsp cumin",
      "Parsley",
    ],
    method: [
      "Dice the onion and pepper.",
      "Cook the vegetables until soft.",
      "Stir in tomatoes and spices.",
      "Simmer until thickened.",
      "Add eggs and cook until just set.",
      "Finish with herbs.",
    ],
    baseReward: 762,
    steps: [
      step.slice("Dice the Onion and Pepper", { goal: 5, ingredientLabel: "Vegetable Prep", startColor: "#ffbe7a", endColor: "#ff8a8a" }),
      step.heat("Cook the Vegetables", 96, "Cook until the vegetables soften."),
      step.mix("Stir the Tomato Base", "tomato", 88, "Mix until the sauce turns glossy."),
      step.season("Add the Spices", "Spices", 5, "Season the skillet right into the heart zone."),
      step.heat("Simmer the Sauce", 100, "Keep the sauce bubbling gently."),
      step.portion("Add the Eggs", "Eggs", 8, "Place the eggs evenly into the skillet."),
      step.heat("Set the Eggs", 94, "Cook until the whites set softly."),
      step.slice("Chop the Parsley", { goal: 4, ingredientLabel: "Parsley Prep", startColor: "#9fd89f", endColor: "#72bf7a" }),
    ],
  },
  {
    id: "peanut-noodles",
    name: "Spicy Peanut Noodles",
    difficulty: "Hard",
    requiredPoints: 17500,
    servings: "Serves 4",
    summary:
      "Chewy noodles coated in a creamy spicy peanut sauce.",
    ingredients: [
      "12 oz noodles",
      "1/2 cup peanut butter",
      "2 tbsp soy sauce",
      "1 tbsp chili sauce",
      "1 tbsp sesame oil",
      "2 scallions",
      "1 cucumber",
      "Sesame seeds",
    ],
    method: [
      "Boil the noodles.",
      "Whisk the peanut sauce.",
      "Slice the scallions and cucumber.",
      "Toss the noodles in the sauce.",
      "Top with vegetables and sesame.",
      "Serve warm or room temperature.",
    ],
    baseReward: 774,
    steps: [
      step.heat("Boil the Noodles", 96, "Cook the noodles until springy."),
      step.mix("Whisk the Peanut Sauce", "soy", 90, "Whisk until the sauce turns smooth."),
      step.slice("Slice the Toppings", { goal: 4, ingredientLabel: "Topping Prep", startColor: "#9fd89f", endColor: "#7ab6d6" }),
      step.mix("Toss the Noodles", "soy", 88, "Coat every noodle in sauce."),
      step.season("Add the Chili", "Chili", 5, "Season the noodles with a spicy finish."),
      step.plate("Serve the Noodles", "Peanut Noodles", 7, "Twirl the noodles neatly into bowls."),
      step.season("Finish with Sesame", "Sesame", 5, "Add a final sesame sprinkle."),
      step.heat("Keep It Warm", 88, "Hold the noodles warm before serving."),
    ],
  },
  {
    id: "carrot-cake",
    name: "Classic Carrot Cake",
    difficulty: "Hard",
    requiredPoints: 17820,
    servings: "Serves 10",
    summary:
      "Moist carrot cake with cream cheese frosting and warm spice.",
    ingredients: [
      "2 cups flour",
      "1 1/2 cups sugar",
      "2 cups grated carrots",
      "4 eggs",
      "1 cup oil",
      "1 tsp cinnamon",
      "8 oz cream cheese",
      "Powdered sugar",
    ],
    method: [
      "Grate the carrots.",
      "Mix the cake batter.",
      "Portion into cake pans.",
      "Bake until springy.",
      "Whisk the frosting until smooth.",
      "Decorate and serve.",
    ],
    baseReward: 786,
    steps: [
      step.slice("Grate the Carrots", { goal: 5, ingredientLabel: "Carrot Prep", startColor: "#ffbe7a", endColor: "#ff8a8a" }),
      step.mix("Mix the Batter", "cookie-dough", 92, "Mix until the batter turns smooth and rich."),
      step.season("Add the Cinnamon", "Cinnamon", 5, "Season the batter with warm spice."),
      step.portion("Fill the Cake Pans", "Batter", 8, "Portion the batter evenly."),
      step.heat("Bake the Layers", 102, "Bake until the layers spring back."),
      step.mix("Whisk the Frosting", "vanilla", 88, "Whisk until the frosting is smooth."),
      step.pipe("Pipe the Frosting", 12, "Pipe a cute frosting border."),
      step.plate("Serve the Cake", "Carrot Cake", 7, "Present the cake neatly."),
    ],
  },
  {
    id: "beef-empanadas",
    name: "Beef Empanadas",
    difficulty: "Hard",
    requiredPoints: 18140,
    servings: "Makes 12 empanadas",
    summary:
      "Golden hand pies filled with savory seasoned beef.",
    ingredients: [
      "1 lb ground beef",
      "1 onion",
      "2 cloves garlic",
      "Empanada dough",
      "1 tsp paprika",
      "1 egg",
      "Olives",
      "Oil",
    ],
    method: [
      "Cook the onion, garlic, and beef.",
      "Season the filling and let it cool.",
      "Portion filling into dough rounds.",
      "Fold and crimp closed.",
      "Brush with egg wash.",
      "Bake until deeply golden.",
    ],
    baseReward: 798,
    steps: [
      step.slice("Dice the Onion", { goal: 4, ingredientLabel: "Onion Prep", startColor: "#f0d9a8", endColor: "#f6b1c3" }),
      step.heat("Cook the Filling", 98, "Cook until the beef turns savory and browned."),
      step.season("Add the Paprika", "Paprika", 5, "Season the filling right into the center zone."),
      step.portion("Fill the Dough", "Filling", 8, "Portion the filling evenly into each round."),
      step.knead("Crimp the Empanadas", 10, "Seal the edges into tidy crimps."),
      step.mix("Whisk the Egg Wash", "carbonara", 78, "Whisk until the egg wash is smooth."),
      step.season("Brush the Tops", "Egg Wash", 5, "Brush enough egg wash for shine."),
      step.heat("Bake the Empanadas", 102, "Bake until the pastry turns golden."),
    ],
  },
  {
    id: "sweet-sour-chicken",
    name: "Sweet and Sour Chicken",
    difficulty: "Hard",
    requiredPoints: 18460,
    servings: "Serves 4",
    summary:
      "Crisp chicken tossed in a glossy sweet and sour sauce.",
    ingredients: [
      "1 lb chicken breast",
      "1 red pepper",
      "1 onion",
      "1/2 cup sweet and sour sauce",
      "1 cup flour",
      "2 eggs",
      "1 cup breadcrumbs",
      "Oil",
    ],
    method: [
      "Dice the chicken and vegetables.",
      "Bread the chicken.",
      "Cook the chicken until crisp.",
      "Cook the vegetables briefly.",
      "Toss everything with the sauce.",
      "Serve hot.",
    ],
    baseReward: 810,
    steps: [
      step.slice("Dice the Chicken", { goal: 5, ingredientLabel: "Chicken Prep", appearance: "chicken", startColor: "#ffd4ba", endColor: "#f0ad8c" }),
      step.slice("Dice the Vegetables", { goal: 4, ingredientLabel: "Pepper and Onion Prep", startColor: "#ffbe7a", endColor: "#ff8a8a" }),
      step.dredge("Bread the Chicken", 3, "Drag the chicken through flour, egg, and crumbs."),
      step.heat("Cook the Chicken", 100, "Keep the oil hot enough for crisp chicken."),
      step.heat("Cook the Vegetables", 94, "Cook the vegetables until just tender."),
      step.mix("Toss with Sauce", "tomato", 88, "Coat everything evenly in the glossy sauce."),
      step.plate("Serve the Chicken", "Sweet and Sour Chicken", 7, "Plate the chicken neatly."),
      step.season("Finish the Sauce", "Sauce", 5, "Add the final sweet-sour finish."),
    ],
  },
  {
    id: "tres-leches-cake",
    name: "Tres Leches Cake",
    difficulty: "Hard",
    requiredPoints: 18780,
    servings: "Serves 10",
    summary:
      "Soft sponge cake soaked in a rich three-milk mixture.",
    ingredients: [
      "1 sponge cake layer",
      "1 cup milk",
      "1 cup evaporated milk",
      "1 cup condensed milk",
      "1 cup cream",
      "2 tbsp sugar",
      "Strawberries",
      "Vanilla",
    ],
    method: [
      "Whisk the milk soak together.",
      "Poke the cake all over.",
      "Pour over the milk mixture.",
      "Whip the cream topping.",
      "Spread or pipe the cream on top.",
      "Decorate with berries.",
    ],
    baseReward: 822,
    steps: [
      step.mix("Whisk the Milk Soak", "vanilla", 88, "Whisk until the milk mixture blends together."),
      step.slice("Score the Cake Top", { goal: 4, ingredientLabel: "Cake Prep", appearance: "loaf", startColor: "#f0d7ad", endColor: "#d9a46c" }),
      step.portion("Pour the Milk Soak", "Milk", 8, "Pour the soak evenly across the cake."),
      step.mix("Whip the Cream", "vanilla", 90, "Whisk until the topping turns fluffy."),
      step.pipe("Decorate the Top", 12, "Pipe soft clouds of cream across the cake."),
      step.slice("Slice the Strawberries", { goal: 4, ingredientLabel: "Strawberry Prep", startColor: "#ffc0c8", endColor: "#f06d93" }),
      step.plate("Serve the Cake", "Tres Leches Cake", 7, "Serve the cake in tidy slices."),
      step.season("Finish with Vanilla", "Vanilla", 5, "Add a sweet finishing touch."),
    ],
  },
  {
    id: "miso-salmon-rice",
    name: "Miso Salmon Rice Bowls",
    difficulty: "Hard",
    requiredPoints: 19100,
    servings: "Serves 4",
    summary:
      "Miso glazed salmon served over fluffy rice with vegetables.",
    ingredients: [
      "4 salmon fillets",
      "3 cups cooked rice",
      "2 tbsp miso",
      "1 tbsp soy sauce",
      "1 tbsp honey",
      "1 cucumber",
      "2 scallions",
      "Sesame seeds",
    ],
    method: [
      "Whisk the miso glaze.",
      "Slice the vegetables.",
      "Coat the salmon with glaze.",
      "Bake or pan-cook the salmon.",
      "Portion rice into bowls.",
      "Top and serve.",
    ],
    baseReward: 834,
    steps: [
      step.mix("Whisk the Miso Glaze", "soy", 88, "Whisk until the glaze turns smooth."),
      step.slice("Slice the Vegetables", { goal: 4, ingredientLabel: "Vegetable Prep", startColor: "#9fd89f", endColor: "#7ab6d6" }),
      step.season("Coat the Salmon", "Miso Glaze", 5, "Coat the salmon evenly."),
      step.heat("Cook the Salmon", 100, "Cook until the salmon flakes and glows."),
      step.portion("Fill the Rice Bowls", "Rice", 8, "Portion the rice evenly into bowls."),
      step.plate("Top with Salmon", "Salmon Bowls", 7, "Arrange the salmon neatly over the rice."),
      step.season("Finish with Sesame", "Sesame", 5, "Add a final sesame finish."),
      step.heat("Keep the Bowls Warm", 88, "Hold the bowls warm before serving."),
    ],
  },
  {
    id: "garlic-naan",
    name: "Garlic Butter Naan",
    difficulty: "Hard",
    requiredPoints: 19420,
    servings: "Makes 8 naan",
    summary:
      "Soft skillet naan brushed with garlic butter.",
    ingredients: [
      "2 cups flour",
      "3/4 cup yogurt",
      "1 tsp yeast",
      "1 tsp sugar",
      "2 tbsp butter",
      "2 cloves garlic",
      "Parsley",
      "Salt",
    ],
    method: [
      "Mix the dough until soft.",
      "Rest and portion the dough.",
      "Stretch each naan round.",
      "Cook on a hot skillet until puffed.",
      "Brush with garlic butter.",
      "Serve warm.",
    ],
    baseReward: 846,
    steps: [
      step.mix("Mix the Dough", "cookie-dough", 90, "Mix until the dough comes together."),
      step.knead("Knead the Dough", 10, "Stretch and fold until the dough turns smooth."),
      step.portion("Portion the Naan", "Dough", 8, "Divide the dough into even rounds."),
      step.knead("Stretch the Naan", 10, "Pull each piece into a soft oval."),
      step.heat("Cook the Naan", 100, "Cook until the bread puffs and spots appear."),
      step.slice("Mince the Garlic", { goal: 4, ingredientLabel: "Garlic Prep", startColor: "#f4e4b6", endColor: "#e7c27a" }),
      step.season("Brush with Butter", "Butter", 5, "Brush on just enough garlic butter."),
      step.plate("Serve the Naan", "Naan", 7, "Stack the naan neatly."),
    ],
  },
  {
    id: "tomato-galette",
    name: "Tomato Basil Galette",
    difficulty: "Hard",
    requiredPoints: 19740,
    servings: "Serves 6",
    summary:
      "Rustic pastry layered with tomatoes, basil, and cheese.",
    ingredients: [
      "1 pie crust",
      "3 tomatoes",
      "1/2 cup ricotta",
      "1/4 cup parmesan",
      "Basil leaves",
      "1 egg",
      "Olive oil",
      "Salt and pepper",
    ],
    method: [
      "Slice the tomatoes and basil.",
      "Spread ricotta over the pastry center.",
      "Layer over the tomatoes.",
      "Fold the edges inward.",
      "Brush with egg wash and bake.",
      "Finish with basil and serve.",
    ],
    baseReward: 858,
    steps: [
      step.slice("Slice the Tomatoes", { goal: 5, ingredientLabel: "Tomato Prep", startColor: "#ffc0c8", endColor: "#f06d93" }),
      step.slice("Slice the Basil", { goal: 4, ingredientLabel: "Basil Prep", startColor: "#9fd89f", endColor: "#79c98b" }),
      step.portion("Spread the Ricotta", "Ricotta", 8, "Spread the ricotta evenly over the pastry."),
      step.portion("Layer the Tomatoes", "Tomatoes", 8, "Arrange the tomatoes evenly."),
      step.knead("Fold the Galette", 10, "Fold the edges into a neat rustic border."),
      step.mix("Whisk the Egg Wash", "carbonara", 78, "Whisk until the egg wash is smooth."),
      step.heat("Bake the Galette", 102, "Bake until the crust turns deep golden."),
      step.plate("Serve the Galette", "Galette", 7, "Serve the galette in tidy slices."),
    ],
  },
  {
    id: "matcha-roll-cake",
    name: "Matcha Roll Cake",
    difficulty: "Hard",
    requiredPoints: 20060,
    servings: "Serves 8",
    summary:
      "Soft sponge roll with whipped cream and a gentle matcha flavor.",
    ingredients: [
      "4 eggs",
      "3/4 cup sugar",
      "3/4 cup flour",
      "1 tbsp matcha",
      "1 cup cream",
      "2 tbsp powdered sugar",
      "Vanilla",
      "Berries",
    ],
    method: [
      "Whisk the sponge batter.",
      "Spread into a thin tray and bake.",
      "Whip the cream filling.",
      "Roll the sponge while warm.",
      "Fill and reroll once cool.",
      "Decorate and serve.",
    ],
    baseReward: 870,
    steps: [
      step.mix("Whisk the Sponge Batter", "muffin", 92, "Whisk until the batter turns light and airy."),
      step.season("Add the Matcha", "Matcha", 5, "Add the matcha right into the sweet spot."),
      step.portion("Spread on the Tray", "Batter", 8, "Spread the batter evenly into a thin layer."),
      step.heat("Bake the Sponge", 100, "Bake until the sponge springs back softly."),
      step.mix("Whip the Cream", "vanilla", 90, "Whisk until the cream turns fluffy."),
      step.knead("Roll the Cake", 10, "Roll the sponge into a neat spiral."),
      step.pipe("Decorate the Top", 12, "Pipe a soft cream border over the top."),
      step.plate("Serve the Slices", "Roll Cake", 7, "Serve the slices neatly."),
    ],
  },
  {
    id: "katsu-curry",
    name: "Katsu Curry Plate",
    difficulty: "Hard",
    requiredPoints: 20380,
    servings: "Serves 4",
    summary:
      "Crispy cutlets served with warm curry sauce and rice.",
    ingredients: [
      "2 chicken cutlets",
      "1 cup flour",
      "2 eggs",
      "1 1/2 cups breadcrumbs",
      "2 cups curry sauce",
      "3 cups cooked rice",
      "1 carrot",
      "1 onion",
    ],
    method: [
      "Slice the vegetables for the curry.",
      "Bread the cutlets.",
      "Cook until crisp and cooked through.",
      "Warm the curry sauce.",
      "Slice the cutlets.",
      "Serve with rice and sauce.",
    ],
    baseReward: 882,
    steps: [
      step.slice("Slice the Vegetables", { goal: 4, ingredientLabel: "Curry Vegetable Prep", startColor: "#ffbe7a", endColor: "#f0d9a8" }),
      step.dredge("Bread the Cutlets", 3, "Drag the cutlets through flour, egg, and crumbs."),
      step.heat("Cook the Katsu", 100, "Keep the oil hot enough for crisp cutlets."),
      step.mix("Warm the Curry Sauce", "tomato", 84, "Stir until the sauce is smooth and hot."),
      step.slice("Slice the Cutlets", { goal: 4, ingredientLabel: "Katsu Slices", appearance: "chicken", startColor: "#ffd4ba", endColor: "#f0ad8c" }),
      step.portion("Fill the Rice Plates", "Rice", 8, "Portion the rice evenly into plates."),
      step.plate("Arrange the Curry Plate", "Katsu Curry", 7, "Arrange the katsu and rice neatly."),
      step.season("Finish with Sauce", "Curry Sauce", 5, "Add the final curry sauce finish."),
    ],
  },
  {
    id: "mediterranean-orzo",
    name: "Mediterranean Orzo Salad",
    difficulty: "Hard",
    requiredPoints: 20700,
    servings: "Serves 4",
    summary:
      "Bright orzo salad with herbs, vegetables, and lemon dressing.",
    ingredients: [
      "1 1/2 cups orzo",
      "1 cucumber",
      "1 cup cherry tomatoes",
      "1/4 red onion",
      "1/2 cup feta",
      "2 tbsp olive oil",
      "1 lemon",
      "Parsley",
    ],
    method: [
      "Boil the orzo until tender.",
      "Slice the vegetables and herbs.",
      "Whisk the lemon dressing.",
      "Toss everything together.",
      "Finish with feta.",
      "Serve chilled or room temperature.",
    ],
    baseReward: 894,
    steps: [
      step.heat("Boil the Orzo", 96, "Cook the orzo until tender."),
      step.slice("Slice the Vegetables", { goal: 5, ingredientLabel: "Salad Prep", startColor: "#9fd89f", endColor: "#ff9c8a" }),
      step.slice("Chop the Parsley", { goal: 4, ingredientLabel: "Parsley Prep", startColor: "#9fd89f", endColor: "#72bf7a" }),
      step.mix("Whisk the Dressing", "vanilla", 82, "Whisk until the dressing blends smoothly."),
      step.mix("Toss the Salad", "vanilla", 86, "Coat the orzo and vegetables evenly."),
      step.season("Add the Feta", "Feta", 5, "Add just enough feta for balance."),
      step.plate("Serve the Salad", "Orzo Salad", 7, "Spoon the salad neatly into bowls."),
      step.season("Finish with Lemon", "Lemon", 5, "Add a bright citrus finish."),
    ],
  },
  ...generateBonusRecipes(),
];

const ui = {
  loadingScreen: document.querySelector("#loadingScreen"),
  startScreenButton: document.querySelector("#startScreenButton"),
  playButton: document.querySelector("#playButton"),
  pointsTotal: document.querySelector("#pointsTotal"),
  unlockStatus: document.querySelector("#unlockStatus"),
  giftCard: document.querySelector("#giftCard"),
  giftStatus: document.querySelector("#giftStatus"),
  ipungHelpButton: document.querySelector("#ipungHelpButton"),
  selectedRecipeName: document.querySelector("#selectedRecipeName"),
  selectedRecipeNameHero: document.querySelector("#selectedRecipeNameHero"),
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
  experimentGrantVersion: "",
  currentStepHelper: null,
  stepResolved: false,
};

init();

function init() {
  hydrateProgress();
  grantExperimentJellys();
  installMobileTapGuard();
  const firstUnlocked = getOrderedRecipes().find((recipe) => isUnlocked(recipe));
  if (firstUnlocked) {
    state.selectedRecipeId = firstUnlocked.id;
  }
  ui.playButton.addEventListener("click", handlePlayClick);
  ui.ipungHelpButton.addEventListener("click", handleIpungHelpClick);
  if (ui.startScreenButton) {
    ui.startScreenButton.addEventListener("click", hideLoadingScreen);
  }
  renderRecipeGrid();
  renderSelectedRecipe();
  renderIdleArena();
  updateHeader();
  updateRunStatus();
}

function hideLoadingScreen() {
  if (!ui.loadingScreen) {
    return;
  }
  ui.loadingScreen.classList.add("hidden");
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
    state.experimentGrantVersion = parsed.experimentGrantVersion || "";
  } catch {
    state.totalPoints = 0;
    state.progress.bestScores = {};
    state.experimentGrantVersion = "";
  }
}

function grantExperimentJellys() {
  if (state.experimentGrantVersion !== EXPERIMENT_GRANT_VERSION) {
    state.totalPoints = EXPERIMENT_JELLYS;
    state.experimentGrantVersion = EXPERIMENT_GRANT_VERSION;
    persistProgress();
  }
}

function persistProgress() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        totalPoints: state.totalPoints,
        bestScores: state.progress.bestScores,
        experimentGrantVersion: state.experimentGrantVersion,
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

function handleIpungHelpClick() {
  if (!state.currentStepHelper || !state.isPlaying || state.totalPoints < JELLY_GIFT_TARGET) {
    return;
  }
  state.currentStepHelper();
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
    state.currentStepHelper = null;
    state.stepRatings[state.activeStepIndex] = clamp(quality, 0, 1);
    updateRecipeProgress(1);
    cleanupStep();
    window.setTimeout(runNextStep, 320);
  };

  state.currentStepHelper = () => {
    ui.instructionText.textContent = `Ipung helped with ${currentStep.name}. You can keep cooking from here.`;
    addRunScore(18);
    completeStep(0.92);
  };

  renderStep(currentStep, completeStep);
  updateHeader();
}

function finishRecipe() {
  cleanupStep();
  state.isPlaying = false;
  state.currentStepHelper = null;
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

function getPortionVisualProfile(currentStep) {
  const source = `${currentStep.name} ${currentStep.fillLabel}`.toLowerCase();
  const ingredientPatterns = [
    { key: "dough", pattern: /dough|naan|loaf|bread/ },
    { key: "batter", pattern: /batter|milk soak/ },
    { key: "rice", pattern: /rice|sago/ },
    { key: "noodles", pattern: /noodles|pasta|shells|enchiladas/ },
    { key: "cheese", pattern: /cheese|ricotta|cream|yogurt/ },
    { key: "fruit", pattern: /mango|apples|tomatoes/ },
    { key: "chocolate", pattern: /chocolate|granola|shortbread|ladyfingers/ },
    { key: "protein", pattern: /meatballs|kofta|falafel|chicken|nuggets|eggs/ },
    { key: "sauce", pattern: /sauce|marinara|curry/ },
    { key: "leaf", pattern: /phyllo|nori|wrappers/ },
  ];

  const ingredientClass =
    ingredientPatterns.find(({ pattern }) => pattern.test(source))?.key ?? "filling";

  let hash = 0;
  for (const char of source) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  const hue = hash % 360;
  const accent = `hsl(${hue} 72% 78%)`;
  const accentDeep = `hsl(${hue} 54% 56%)`;
  const card = `hsl(${(hue + 18) % 360} 70% 96%)`;
  const cardShadow = `hsl(${hue} 45% 35% / 0.14)`;

  return {
    ingredientClass,
    style: `--portion-card:${card};--portion-accent:${accent};--portion-accent-deep:${accentDeep};--portion-shadow:${cardShadow};`,
  };
}

function renderPortionGame(currentStep, completeStep) {
  const portionVisual = getPortionVisualProfile(currentStep);
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Portion Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="portion-stage" style="${portionVisual.style}">
        <div id="trayGrid" class="tray-grid">
          ${Array.from(
            { length: currentStep.goal },
            (_, index) => `
              <button class="tray-slot tray-slot-${portionVisual.ingredientClass}" data-slot="${index}" type="button">
                <span class="tray-slot-art ${portionVisual.ingredientClass}-art" aria-hidden="true"></span>
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

function getSeasonVisualProfile(currentStep) {
  const source = `${currentStep.name} ${currentStep.label}`.toLowerCase();
  const seasoningPatterns = [
    { key: "herb", pattern: /herb|parsley|basil|oregano|mint/ },
    { key: "salt", pattern: /salt|sea salt/ },
    { key: "sugar", pattern: /sugar|cinnamon|sweet/ },
    { key: "pepper", pattern: /pepper|spice|taco|masala|curry|paprika/ },
    { key: "cheese", pattern: /cheese|parmesan/ },
    { key: "cocoa", pattern: /cocoa|chocolate|coffee/ },
    { key: "citrus", pattern: /lemon|lime|zest/ },
  ];

  const seasoningClass =
    seasoningPatterns.find(({ pattern }) => pattern.test(source))?.key ?? "savory";

  let hash = 0;
  for (const char of source) {
    hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  }

  const hue = (hash % 360 + 360) % 360;
  const bowl = `hsl(${hue} 76% 92%)`;
  const bowlDeep = `hsl(${(hue + 12) % 360} 58% 74%)`;
  const fill = `hsl(${(hue + 6) % 360} 76% 66%)`;
  const fillDeep = `hsl(${(hue + 6) % 360} 62% 48%)`;
  const zone = `hsl(${(hue + 18) % 360} 68% 58% / 0.88)`;

  return {
    seasoningClass,
    style: `--season-bowl:${bowl};--season-bowl-deep:${bowlDeep};--season-fill:${fill};--season-fill-deep:${fillDeep};--season-zone:${zone};`,
  };
}

function renderSeasonGame(currentStep, completeStep) {
  const seasonVisual = getSeasonVisualProfile(currentStep);
  ui.gameArena.innerHTML = `
    <div class="minigame">
      <div class="minigame-head">
        <p class="arena-label">Seasoning Station</p>
        <h3>${currentStep.name}</h3>
        <p>${currentStep.instruction}</p>
      </div>
      <div class="season-stage" style="${seasonVisual.style}">
        <div class="season-character">
          <div class="season-bowl season-bowl-${seasonVisual.seasoningClass}"></div>
          <div id="sprinkleCloud" class="sprinkle-cloud sprinkle-cloud-${seasonVisual.seasoningClass}"></div>
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
              <span class="result-pill">Earned: ${earnedPoints} jellys</span>
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
  ui.recipeGrid.innerHTML = getOrderedRecipes()
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
          <p class="small-meta">Unlock at ${recipe.requiredPoints} jellys${bestScore ? ` • Best ${bestScore}` : ""}</p>
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
  ui.recipeMeta.textContent = `${recipe.difficulty} • ${recipe.servings} • Unlock at ${recipe.requiredPoints} jellys`;
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
    : `You can preview it now and unlock play at ${recipe.requiredPoints} jellys.`;
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
  const orderedRecipes = getOrderedRecipes();
  const unlockedCount = orderedRecipes.filter((recipe) => isUnlocked(recipe)).length;
  const nextRecipe = orderedRecipes.find((recipe) => !isUnlocked(recipe));
  const selectedRecipe = getSelectedRecipe();
  const giftUnlocked = state.totalPoints >= JELLY_GIFT_TARGET;

  ui.pointsTotal.textContent = `${state.totalPoints} jellys`;
  ui.selectedRecipeName.textContent = selectedRecipe.name;
  ui.selectedRecipeNameHero.textContent = selectedRecipe.name;
  ui.unlockedCount.textContent = `${unlockedCount} / ${recipes.length}`;
  ui.unlockStatus.textContent = nextRecipe
    ? `${Math.max(0, nextRecipe.requiredPoints - state.totalPoints)} more jellys unlock ${nextRecipe.name}.`
    : "Every recipe is unlocked.";
  ui.giftCard.classList.toggle("hidden", !giftUnlocked);
  ui.ipungHelpButton.classList.toggle("hidden", !giftUnlocked);
  ui.giftStatus.textContent = giftUnlocked
    ? "your cute gift is unlocked! her name is ipung! she is a navy elephant that can help you with the cooking and baking!! thank you for grinding and using the website!!"
    : "Reach 100,000 jellys to meet your navy elephant gift.";
  ui.ipungHelpButton.disabled = !giftUnlocked || !state.isPlaying || !state.currentStepHelper;

  ui.playButton.disabled = state.isPlaying || !isUnlocked(selectedRecipe);
  ui.playButton.textContent = isUnlocked(selectedRecipe)
    ? "Cook Selected Recipe"
    : `Locked Until ${selectedRecipe.requiredPoints} jellys`;
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

function getOrderedRecipes() {
  const difficultyRank = { Easy: 0, Medium: 1, Hard: 2 };
  return [...recipes].sort((a, b) => {
    const rankDelta = difficultyRank[a.difficulty] - difficultyRank[b.difficulty];
    if (rankDelta !== 0) {
      return rankDelta;
    }
    if (a.requiredPoints !== b.requiredPoints) {
      return a.requiredPoints - b.requiredPoints;
    }
    return a.name.localeCompare(b.name);
  });
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
        <div class="mascot-bowl"></div>
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
    return `Ivy says: you can read ${recipe.name} now, then unlock the mini-games later at ${recipe.requiredPoints} jellys.`;
  }
  if (recipe.difficulty === "Hard") {
    return `Ivy says: ${recipe.name} is a long kitchen run, so pace yourself and stack jellys carefully.`;
  }
  if (recipe.difficulty === "Medium") {
    return `Ivy says: ${recipe.name} has more mini-games now, so each step matters more.`;
  }
  return `Ivy says: ${recipe.name} is a sweet starting point for building jellys.`;
}

function getResultMessage(stars, averageQuality) {
  if (stars === 3) {
    return "Ivy approves. That was clean, cute, and very well cooked.";
  }
  if (stars === 2) {
    return `Nice work. This run landed at ${Math.round(averageQuality * 100)}% quality, so there is still room to polish the technique.`;
  }
  return "You still finished the recipe. Replay it to smooth out the steps and collect more jellys.";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
