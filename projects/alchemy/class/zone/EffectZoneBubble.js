import {DoubleSide, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import ZoneBubble from './ZoneBubble.js'

export default class EffectZoneBubble extends ZoneBubble {
	constructor(position = new Vector4(), radius = 1, radiusW = 1, color = 0xffff00,
	            on_touch = (brew) => {console.log(this, 'collided with brew')}) {
		super(position, radius, radiusW, color)
		this.on_touch = on_touch
	}

	detectCollisionWithBrew(brew, old = brew.position, delta = 0) {
		const pos = new Vector4(
			(brew.position.x + delta * (old.x - brew.position.x)),
			(brew.position.y + delta * (old.y - brew.position.y)),
			(brew.position.z + delta * (old.z - brew.position.z)),
			(brew.position.w + delta * (old.w - brew.position.w)),
		)
	}
}