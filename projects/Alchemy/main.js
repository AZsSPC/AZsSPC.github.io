const Ingredient = class Ingredient {
    constructor(title, glyph, fg, bg, lore) {
        this.title = title
        this.glyph = glyph
        this.fg = fg
        this.bg = bg
        this.lore = lore
    }

    get display_glyph() {
        return `<span class="glyph" style="color:${this.fg};background:${this.bg}">${this.glyph}</span>`
    }

    static list = {}

    static init(id, title, glyph, fg, bg, lore) {
        Ingredient.list[id] = new Ingredient(title, glyph, fg, bg, lore)
        return id
    }
}

const RecipeIngredient = class RecipeIngredient {
    constructor(id, tmin, tmax, amin, amax) {
        this.id = id
        this.tmin = tmin
        this.tmax = tmax
        this.amin = amin
        this.amax = amax
    }

    check(t, c) {
        return this.tmin <= t && this.tmax >= t && this.amin <= c && this.amax >= c
    }
}

const BrewingIngredient = class BrewingIngredient {
    constructor(id, temperature, amount) {
        this.id = id
        this.temperature = temperature
        this.amount = amount
    }
}

const Recipe = class Recipe {
    constructor(id, actual_product_percent, ...recipe_ingredients) {
        this.product = id
        this.ingredients = []
        recipe_ingredients.forEach(e => this.ingredients.push(e))
    }

    static list = []

    static init(id, actual_product_percent, ...recipe_ingredients) {
        Recipe.list.push(new Recipe(id, actual_product_percent, ...recipe_ingredients))
    }
}

const Brew = class Brew {
    constructor() {
        this.full_amount = 0
        this.ingredients = []
    }

    add(brewing_ingredient) {
        this.ingredients.push(brewing_ingredient)
    }

    is_suitable_recipe(recipe) {
        for (let i in recipe.ingredients) {
            const a = this.ingredients[i], b = this.ingredients[i]
            if (a.id !== b.id &&
                b.tmin <= a.temperature <= b.tmax &&
                b.amin <= a.amount / this.full_amount <= b.amax
            ) return false
        }
        return true
    }

    brew() {
        this.full_amount = 0
        this.ingredients.forEach(e => this.full_amount += e.amount)
        for (const recipe of Recipe.list)
            if (this.ingredients.length === this.ingredients.length)
                if (this.is_suitable_recipe(recipe))
                    return recipe
        return false
    }
}

const init_ingredients_and_recipes = () => {
    /* FUNDAMENTAL */
    Ingredient.init("water", "Water", "W", "#8998af", "#000000", "Water from the forest river")
    Ingredient.init("cave_shrooms", "Cave shooms", "T", "#fabcaa", "#000000", "Shrooms wich grows near the caves")
    /* CRAFTABLE */
    Ingredient.init("shroom_poison", "Shroom poison", "U", "#16ff34", "#000000", "Poisonous shrooms boiled in water")

    Recipe.init("shroom_poison", 1,
        new RecipeIngredient("water", 90, 150, 60, 70),
        new RecipeIngredient("cave_shrooms", 20, 80, 30, 40))
    Recipe.init("shroom_soup", 1,
        new RecipeIngredient("cave_shrooms", 20, 80, 45, 55),
        new RecipeIngredient("water", 90, 150, 45, 55))
}

//

init_ingredients_and_recipes()

const GAME = document.getElementById("alchemy")
GAME.innerHTML = ""

let brew = new Brew()
brew.add(new BrewingIngredient('water', 100, 70))
brew.add(new BrewingIngredient('cave_shrooms', 50, 35))
console.log(brew.brew())