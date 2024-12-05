import {BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

export class Deadzone {
	constructor(states, connections) {
		this.states = states
		this.connections = connections
		this.material = new MeshStandardMaterial({
			color: 0xffffff,
			roughness: 1,
			metalness: 0,
			opacity: 0.2,
			side: DoubleSide,
			transparent: true,
		})
		this.geometry = new BufferGeometry()
		this.mesh = new Mesh(this.geometry, this.material)
		this.to_render = true
	}

	updateGeometry(brew, delta = 0, old) {
		const vertices = this.states.flatMap(v => this.findVertex(v, brew.vector_position.w + delta * (old.w - brew.vector_position.w)))
		if (vertices === undefined) return
		const faces = this.connections.flatMap(face => face)
		this.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
		this.geometry.setIndex(faces)
		this.geometry.computeVertexNormals()
	}

	findVertex(arrays, d4) {
		this.to_render = true
		const n = arrays.length - 1
		if (d4 <= arrays[0][3]) return arrays[0].slice(0, 3)
		if (d4 >= arrays[n][3]) return arrays[n].slice(0, 3)

		for (let i = 0; i < n; i++) {
			const [v1, v2] = [arrays[i], arrays[i + 1]]
			if (d4 < v1[3] || d4 >= v2[3]) continue
			const weight = (d4 - v1[3]) / (v2[3] - v1[3])
			return v1.map((v, j) => v * (1 - weight) + v2[j] * weight).slice(0, 3)
		}

		this.to_render = false
		return undefined
	}

	static list = /*Object.freeze*/([
		new Deadzone([
			[[50, 0, 0, -20], [50, 10, 20, 0], [40, -6, 5, 20]],
			[[50, 50, 50, -20], [30, 60, 60, 0], [30, 10, 40, 20]],
			[[0, 0, 0, -20], [10, 10, 10, 0], [23, 7, 5, 20]],
			[[50, 50, -20, -20], [60, 40, 10, 0], [-20, 10, -10, 20]],
		], [[0, 1, 2], [0, 2, 3], [0, 1, 3], [1, 2, 3]]),

		new Deadzone([
			[[0, -50, -50, 0], [-23, -30, -10, 0.5]],
			[[-50, 0, 0, 0.5], [10, -6, -5, 1]],
			[[-50, -50, 0, 0], [-40, -20, -10, 0.8]],
			[[-50, 0, -50, 0.2], [-10, 20, -40, 1]],
		], [[0, 1, 2], [0, 2, 3], [0, 1, 3], [1, 2, 3]]),
	])
}