import {BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial, SphereGeometry, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

export default class ZoneBubble {
	constructor(position = new Vector4(), radius = 1, radiusW = 1, color = 0x333333) {
		this.position = position
		this.radius = radius
		this.radiusW = radiusW

		this.to_render = false
		this.color = color
		this.material = new MeshStandardMaterial({
			color: this.color,
			roughness: 1,
			metalness: 0,
			opacity: 0.3,
			side: DoubleSide,
			transparent: true,
		})
		this.geometry = new SphereGeometry(this.radius)
		this.mesh = new Mesh(this.geometry, this.material)
	}

	updateGeometry(brew, old = brew.position, delta = 0) {
		const distance = Math.abs(this.position.w - (brew.position.w + delta * (old.w - brew.position.w)))

		if (distance > this.radiusW) {
			this.to_render = false
			this.mesh.visible = false
			return
		}

		this.to_render = true
		this.mesh.visible = true

		const newRadius = this.radius * (1 - distance / this.radiusW)

		if (this.geometry.parameters.radius !== newRadius) {
			this.geometry.dispose()
			this.geometry = new SphereGeometry(newRadius)
			this.mesh.geometry = this.geometry
		}

		this.mesh.position.set(
			this.position.x,
			this.position.y,
			this.position.z,
		)
	}

	isBrewTouching(brew, old = brew.position, delta = 0) {

	}
}