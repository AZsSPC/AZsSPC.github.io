import {Ingredient} from './ingredient.js'
import {DoubleSide, Mesh, MeshStandardMaterial, SphereGeometry, Vector2} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

export class ReceiptBulb {
	constructor(result = new Ingredient(), vector_radius = new Vector2()) {
		this.result = result
		this.vector_radius = vector_radius
		this.material = new MeshStandardMaterial({
			color: this.result.color,
			roughness: 1,
			metalness: 0,
			opacity: 0.3,
			side: DoubleSide,
			transparent: true,
		})
		this.geometry = new SphereGeometry(this.vector_radius.x)
		this.mesh = new Mesh(this.geometry, this.material)
		this.to_render = false
	}

	static list = Object.freeze([
		new ReceiptBulb(Ingredient.list.water, new Vector2(7, 1)),
		new ReceiptBulb(Ingredient.list.herb, new Vector2(10, 1)),
		new ReceiptBulb(Ingredient.list.blood, new Vector2(10, 1)),
		new ReceiptBulb(Ingredient.list.wood, new Vector2(2, 1)),
		new ReceiptBulb(Ingredient.list.wood1, new Vector2(3, 1)),
		new ReceiptBulb(Ingredient.list.wood2, new Vector2(3, 1)),
	])

	updateGeometry(brew) {
		if (Math.abs(this.result.vector_position.w - brew.vector_position.w) > this.vector_radius.y) {
			this.to_render = false
			return
		}

		this.to_render = true
		this.geometry.parameters.radius = this.vector_radius.x * (1 - Math.abs(this.result.vector_position.w - brew.vector_position.w) / this.vector_radius.y)
		this.mesh.position.set(this.result.vector_position.x, this.result.vector_position.y, this.result.vector_position.z)
	}
}