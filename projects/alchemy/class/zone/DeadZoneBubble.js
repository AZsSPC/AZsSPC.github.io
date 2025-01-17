import {DoubleSide, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import ZoneBubble from './ZoneBubble.js'
import EffectZoneBubble from './EffectZoneBubble'

export default class DeadZoneBubble extends EffectZoneBubble {
	constructor(position = new Vector4(), radius = 1, radiusW = 1, color = 0xffff00) {
		super(position, radius, radiusW, color, deadzone_collide)
	}
}

const deadzone_collide = (brew) => {
	brew.effect['deadzone_collide'] = (brew.effect['deadzone_collide'] ?? 0) + 1
}