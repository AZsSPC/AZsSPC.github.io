import {Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

export class Ingredient {
	constructor(vector_position = new Vector4(), vector_weight = new Vector4(), elements = {}, title = 'brew.unknown.title', lore = 'brew.unknown.lore', color = 0xffffff, amount = 1) {
		this.vector_position = vector_position
		this.vector_weight = vector_weight
		this.elements = elements
		this.title = title
		this.lore = lore
		this.color = color
		this.amount = amount
	}

	copy(amount = this.amount) {
		return new Ingredient(this.vector_position, this.vector_weight, this.elements, this.title, this.lore, this.color, amount)
	}

	static list = Object.freeze({
		water: (new Ingredient(new Vector4(0, 0, 0, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.water.title', 'ingredient.water.lore', 0x0000ff)),
		herb: (new Ingredient(new Vector4(-100, 0, 10, 0), new Vector4(10, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0x00ff00)),
		blood: (new Ingredient(new Vector4(10, 50, 10, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xff0000)),
		wood: (new Ingredient(new Vector4(-10, -80, 30, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910)),
		wood1: (new Ingredient(new Vector4(50, -8, -60, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910)),
		wood2: (new Ingredient(new Vector4(-20, 70, -5, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910)),
	})

}