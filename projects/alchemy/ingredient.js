import {Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

export class Ingredient {
	constructor(vector_position = new Vector4(), vector_weight = new Vector4(), elements = {}, title = 'brew.unknown.title', description = 'brew.unknown.description', color = 0xffffff, amount = 1, hash = null) {
		this.vector_position = vector_position
		this.vector_weight = vector_weight
		this.elements = elements
		this.title = title
		this.description = description
		this.color = color
		this.amount = amount
		this.hash = hash || `x${this.vector_position.x}y${this.vector_position.y}z${this.vector_position.z}w${this.vector_position.w}`
			+ `x${this.vector_weight.x}y${this.vector_weight.y}z${this.vector_weight.z}w${this.vector_weight.w}`
			+ JSON.stringify(this.elements)
	}

	copy(amount = this.amount) {
		return new Ingredient(this.vector_position.clone(), this.vector_weight.clone(), {...this.elements}, this.title, this.description, this.color, amount)
	}

	take(amount = 1) {
		this.amount -= amount
		return new Ingredient(this.vector_position.clone(), this.vector_weight.clone(), {...this.elements}, this.title, this.description, this.color, amount)
	}

	static list = Object.freeze({
		water: new Ingredient(new Vector4(0, 0, 0, 0), new Vector4(1, 1, 1, 1), {}, 'ingredient.water.title', 'ingredient.water.description', 0x0000ff),
		herb: new Ingredient(new Vector4(-100, 0, 10, 0), new Vector4(10, 1, 1, 0), {}, 'ingredient.herb.title', 'ingredient.herb.description', 0x00ff00),
		blood: new Ingredient(new Vector4(10, 50, 10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.blood.title', 'ingredient.blood.description', 0xff0000),
		wood: new Ingredient(new Vector4(-10, -80, 30, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.wood.title', 'ingredient.wood.description', 0xa40910),
		stone: new Ingredient(new Vector4(20, 10, -5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.stone.title', 'ingredient.stone.description', 0x808080),
		iron: new Ingredient(new Vector4(-40, 20, 15, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.iron.title', 'ingredient.iron.description', 0xb0c4de),
		gold: new Ingredient(new Vector4(50, -50, 10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.gold.title', 'ingredient.gold.description', 0xffd700),
		sand: new Ingredient(new Vector4(0, -30, 5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.sand.title', 'ingredient.sand.description', 0xf4a460),
		salt: new Ingredient(new Vector4(15, -10, -20, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.salt.title', 'ingredient.salt.description', 0xffffff),
		fire: new Ingredient(new Vector4(-30, 50, 20, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.fire.title', 'ingredient.fire.description', 0xff4500),
		ice: new Ingredient(new Vector4(10, -50, 10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.ice.title', 'ingredient.ice.description', 0xadd8e6),
		coal: new Ingredient(new Vector4(-20, 40, -10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.coal.title', 'ingredient.coal.description', 0x36454f),
		clay: new Ingredient(new Vector4(-15, -20, 25, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.clay.title', 'ingredient.clay.description', 0x964b00),
		silver: new Ingredient(new Vector4(30, 10, -15, 10), new Vector4(1, 1, 1, 1), {}, 'ingredient.silver.title', 'ingredient.silver.description', 0xc0c0c0),
		honey: new Ingredient(new Vector4(0, -40, 30, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.honey.title', 'ingredient.honey.description', 0xffc30b),
		ash: new Ingredient(new Vector4(-25, 20, 5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.ash.title', 'ingredient.ash.description', 0x555555),
		milk: new Ingredient(new Vector4(10, -15, 15, 0), new Vector4(1, 1, 1, 1), {}, 'ingredient.milk.title', 'ingredient.milk.description', 0xffffe0),
		oil: new Ingredient(new Vector4(-30, -50, -10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.oil.title', 'ingredient.oil.description', 0x6a5acd),
		poison: new Ingredient(new Vector4(20, 30, 10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.poison.title', 'ingredient.poison.description', 0x228b22),
		gem: new Ingredient(new Vector4(-10, 40, -20, -10), new Vector4(1, 1, 1, 1), {}, 'ingredient.gem.title', 'ingredient.gem.description', 0x8a2be2),
	})

}