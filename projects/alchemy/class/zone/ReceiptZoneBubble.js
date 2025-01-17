import Ingredient from '../ingredient.js'
import {DoubleSide, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import EffectZoneBubble from './EffectZoneBubble.js'

export default class ReceiptZoneBubble extends EffectZoneBubble {
	constructor(position = new Vector4(), radius = 1, radiusW = 1, result = new Ingredient()) {
		super(position, radius, radiusW, result.color, (brew) => {console.log(this)})
		this.result = result
		this.on_touch()
	}

	static list = Object.freeze([
		new ReceiptZoneBubble(new Vector4(10, 20, 0, 5), 5, 1,
			new Ingredient(new Vector4(10, 20, 0, 5), new Vector4(2, 2, 1, 0), {},
				'receipt.elixir_life.title', 'receipt.elixir_life.description', 0x4caf50)),
		new ReceiptZoneBubble(new Vector4(-15, 5, -10, 0), 6, 1,
			new Ingredient(new Vector4(-15, 5, -10, 0), new Vector4(1, 3, 2, 0), {},
				'receipt.mana_dust.title', 'receipt.mana_dust.description', 0x2196f3)),
		new ReceiptZoneBubble(new Vector4(20, 10, 5, 0), 4, 1,
			new Ingredient(new Vector4(20, 10, 5, 0), new Vector4(1, 2, 1, 0), {},
				'receipt.fire_powder.title', 'receipt.fire_powder.description', 0xff5722)),
		new ReceiptZoneBubble(new Vector4(-10, -20, 10, 0), 7, 1,
			new Ingredient(new Vector4(-10, -20, 10, 0), new Vector4(2, 1, 3, 0), {},
				'receipt.venom_tincture.title', 'receipt.venom_tincture.description', 0x9c27b0)),
		new ReceiptZoneBubble(new Vector4(0, -15, -5, 5), 3, 1,
			new Ingredient(new Vector4(0, -15, -5, 5), new Vector4(3, 2, 1, 0), {},
				'receipt.ice_crystals.title', 'receipt.ice_crystals.description', 0x03a9f4)),
		new ReceiptZoneBubble(new Vector4(25, 5, 0, 10), 5, 1,
			new Ingredient(new Vector4(25, 5, 0, 10), new Vector4(2, 2, 2, 0), {},
				'receipt.shadow_essence.title', 'receipt.shadow_essence.description', 0x212121)),
		new ReceiptZoneBubble(new Vector4(-5, 15, -15, 5), 6, 1,
			new Ingredient(new Vector4(-5, 15, -15, 5), new Vector4(1, 1, 1, 0), {},
				'receipt.silver_breeze.title', 'receipt.silver_breeze.description', 0xc0c0c0)),
		new ReceiptZoneBubble(new Vector4(30, -10, 5, -5), 4, 1,
			new Ingredient(new Vector4(30, -10, 5, -5), new Vector4(2, 3, 1, 0), {},
				'receipt.blood_amber.title', 'receipt.blood_amber.description', 0xd50000)),
		new ReceiptZoneBubble(new Vector4(0, 25, -20, 10), 10, 1,
			new Ingredient(new Vector4(0, 25, -20, 10), new Vector4(1, 2, 1, 0), {},
				'receipt.wisdom_draught.title', 'receipt.wisdom_draught.description', 0x673ab7)),
		new ReceiptZoneBubble(new Vector4(-20, -5, 10, -5), 5, 1,
			new Ingredient(new Vector4(-20, -5, 10, -5), new Vector4(3, 1, 2, 0), {},
				'receipt.ethereal_flask.title', 'receipt.ethereal_flask.description', 0x00e5ff)),
	])
}