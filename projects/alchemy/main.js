const GAME = document.getElementById('alchemy')

const Ingredient = class Ingredient {
    constructor(title, fg, bg, lore) {
        this.title = title
        this.fg = fg
        this.bg = bg
        this.lore = lore
    }

    static list = {}

    static init(id, title, fg, bg, lore) {
        Ingredient.list[id] = new Ingredient(title, fg, bg, lore)
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

//

/* FUNDAMENTAL */
Ingredient.init('water', 'Water', '#c3f1ff', '#2581b9', 'Water from the forest river')
Ingredient.init('cave_shrooms', 'Cave shooms', '#fabcaa', '#57524b', 'Shrooms wich grows near the caves')
/* CRAFTABLE */
Ingredient.init('shroom_poison', 'Shroom poison', '#16ff34', '#22573f', 'Poisonous shrooms boiled in water')

Recipe.init('shroom_poison', 1,
    new RecipeIngredient('water', 90, 150, 60, 70),
    new RecipeIngredient('cave_shrooms', 20, 80, 30, 40))
Recipe.init('shroom_soup', 1,
    new RecipeIngredient('cave_shrooms', 20, 80, 45, 55),
    new RecipeIngredient('water', 90, 150, 45, 55))

//

const inventory = (() => {
    const inv = document.createElement('table')
    inv.className = 'inventory'
    inv.slots = Ingredient.list
    inv.refresh = () => {
        inv.innerHTML = '<tr><td>Title</td><td>Lore</td><</tr>'
        for (let id in inv.slots) {
            const e = Ingredient.list[id]
            inv.innerHTML += `<span class="glyph" style="color:${e.fg};background:${e.bg}" title="${e.title}\n${e.lore}">${e.title}</span>`
        }
    }
    inv.refresh()
    return inv
})()

const Slot = class Slot extends HTMLDivElement {
    constructor() {
        super()
        this.className = 'slot'
        this.item = null
    }
}

//

//Object.keys(Ingredient.list).length * 2 - 2)
GAME.innerHTML = ''
GAME.append(inventory)
/*
let brew = new Brew()
brew.add(new BrewingIngredient('water', 100, 70))
brew.add(new BrewingIngredient('cave_shrooms', 50, 35))
console.log(brew.brew())
 */
