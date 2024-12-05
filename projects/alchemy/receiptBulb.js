import {Ingredient} from './ingredient.js'
import {DoubleSide, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

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
		new ReceiptBulb(new Ingredient(new Vector4(10, 20, 0, 5), new Vector4(2, 2, 1, 0), {},
			'receipt.elixir_life.title', 'receipt.elixir_life.description', 0x4caf50), new Vector2(5, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(-15, 5, -10, 0), new Vector4(1, 3, 2, 0), {},
			'receipt.mana_dust.title', 'receipt.mana_dust.description', 0x2196f3), new Vector2(6, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(20, 10, 5, 0), new Vector4(1, 2, 1, 0), {},
			'receipt.fire_powder.title', 'receipt.fire_powder.description', 0xff5722), new Vector2(4, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(-10, -20, 10, 0), new Vector4(2, 1, 3, 0), {},
			'receipt.venom_tincture.title', 'receipt.venom_tincture.description', 0x9c27b0), new Vector2(7, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(0, -15, -5, 5), new Vector4(3, 2, 1, 0), {},
			'receipt.ice_crystals.title', 'receipt.ice_crystals.description', 0x03a9f4), new Vector2(3, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(25, 5, 0, 10), new Vector4(2, 2, 2, 0), {},
			'receipt.shadow_essence.title', 'receipt.shadow_essence.description', 0x212121), new Vector2(5, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(-5, 15, -15, 5), new Vector4(1, 1, 1, 0), {},
			'receipt.silver_breeze.title', 'receipt.silver_breeze.description', 0xc0c0c0), new Vector2(6, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(30, -10, 5, -5), new Vector4(2, 3, 1, 0), {},
			'receipt.blood_amber.title', 'receipt.blood_amber.description', 0xd50000), new Vector2(4, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(0, 25, -20, 10), new Vector4(1, 2, 1, 0), {},
			'receipt.wisdom_draught.title', 'receipt.wisdom_draught.description', 0x673ab7), new Vector2(7, 1)),
		new ReceiptBulb(new Ingredient(new Vector4(-20, -5, 10, -5), new Vector4(3, 1, 2, 0), {},
			'receipt.ethereal_flask.title', 'receipt.ethereal_flask.description', 0x00e5ff), new Vector2(5, 1)),
	])

	updateGeometry(brew, delta = 0, old) {
		const distance = Math.abs(this.result.vector_position.w - (brew.vector_position.w + delta * (old.w - brew.vector_position.w)))

		if (distance > this.vector_radius.y) {
			this.to_render = false
			return
		}

		this.to_render = true

		const newRadius = this.vector_radius.x * (1 - distance / this.vector_radius.y)

		if (this.geometry.parameters.radius !== newRadius) {
			this.geometry.dispose()
			this.geometry = new SphereGeometry(newRadius)
			this.mesh.geometry = this.geometry
		}

		this.mesh.position.set(
			this.result.vector_position.x,
			this.result.vector_position.y,
			this.result.vector_position.z,
		)
	}

}