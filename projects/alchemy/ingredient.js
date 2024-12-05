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
		return new Ingredient(this.vector_position, this.vector_weight, this.elements, this.title, this.description, this.color, amount)
	}

	static list = Object.freeze({
		water: new Ingredient(new Vector4(0, 0, 0, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.water.title', 'ingredient.water.description', 0x0000ff),
		herb: new Ingredient(new Vector4(-100, 0, 10, 0), new Vector4(10, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.description', 0x00ff00),
		blood: new Ingredient(new Vector4(10, 50, 10, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.description', 0xff0000),
		wood: new Ingredient(new Vector4(-10, -80, 30, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.description', 0xa40910),
		wood1: new Ingredient(new Vector4(50, -8, -60, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.description', 0xa40910),
		wood2: new Ingredient(new Vector4(-20, 70, -5, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.description', 0xa40910),
	})
}