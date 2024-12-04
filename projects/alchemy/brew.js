import {BufferGeometry, Line, LineBasicMaterial, Vector3, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import {Ingredient} from './ingredient.js'

export class Brew {
	constructor() {
		this.vector_position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []
	}

	recalculateVectorAxis(axis, ingredient) {
		this.vector_weight[axis] = ((this.vector_weight[axis] * this.amount) + (ingredient.vector_weight[axis] * ingredient.amount))
			/ (this.amount + ingredient.amount) || 0

		this.vector_position[axis] = (this.vector_position[axis] * this.vector_weight[axis] * this.amount
				+ ingredient.vector_position[axis] * ingredient.vector_weight[axis] * ingredient.amount)
			/ (this.amount * this.vector_weight[axis] + ingredient.amount * ingredient.vector_weight[axis]) || 0
	}

	put(ingredient) {
		//console.log('')
		//console.log('~', this.amount, this.vector_position, this.vector_weight)
		//console.log('+', ingredient.amount, ingredient.vector_position, ingredient.vector_weight)

		this.recalculateVectorAxis('x', ingredient)
		this.recalculateVectorAxis('y', ingredient)
		this.recalculateVectorAxis('z', ingredient)
		this.recalculateVectorAxis('w', ingredient)

		this.amount += ingredient.amount

		Object.entries(ingredient.elements).forEach(([k, v]) => { this.elements[k] = (this.elements[k] || 0) + v })

		this.queue.push(new Vector3(this.vector_position.x, this.vector_position.y, this.vector_position.z))
		console.log('=', this.amount, this.vector_position, this.vector_weight)
	}

	take() {
		const result = new Ingredient(this.vector_position, this.vector_weight, this.elements, 'ingredient.test.title', 'ingredient.test.lore', 0x555, this.amount)
		this.vector_position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []
		return result
	}

	getQueueMesh() {
		const geometry = new BufferGeometry().setFromPoints(this.queue)
		const material = new LineBasicMaterial({color: 0x0000ff})
		return new Line(geometry, material)
	}
}