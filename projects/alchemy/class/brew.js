import { CylinderGeometry, DoubleSide, Group, Mesh, MeshStandardMaterial, SphereGeometry, Vector3, Vector4 } from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import Ingredient from './ingredient.js'

export default class Brew {
	constructor() {
		this.position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []
		this.material = new MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0.7,
			metalness: 0.7,
			opacity: 0.7,
			transparent: true,
		})
		this.geometry = new SphereGeometry(5)
		this.mesh = new Mesh(this.geometry, this.material)
	}

	recalculateVectorAxis(axis, ingredient) {
		const totalAmount = this.amount + ingredient.amount
		const combinedWeight =
			this.vector_weight[axis] * this.amount +
			ingredient.vector_weight[axis] * ingredient.amount

		this.vector_weight[axis] = combinedWeight / totalAmount || 0

		const weightedPosition =
			this.position[axis] * this.vector_weight[axis] * this.amount +
			ingredient.position[axis] * ingredient.vector_weight[axis] * ingredient.amount

		this.position[axis] = weightedPosition / (this.amount * this.vector_weight[axis] + ingredient.amount * ingredient.vector_weight[axis]) || 0
	}

	put(ingredient) {
		['x', 'y', 'z', 'w'].forEach((axis) => this.recalculateVectorAxis(axis, ingredient))

		this.amount += ingredient.amount

		for (const [key, value] of Object.entries(ingredient.elements))
			this.elements[key] = (this.elements[key] || 0) + value

		const newRadius = this.calculatePercentageDifference(this.vector_weight)
		this.queue.push(new Vector4(this.position.x, this.position.y, this.position.z, newRadius))
		this.geometry = new SphereGeometry(newRadius)
		this.mesh.geometry.dispose()
		this.mesh.geometry = this.geometry
		this.mesh.position.set(this.position.x, this.position.y, this.position.z)

		console.log('put', ingredient)
		console.log('pos', this.position.clone(), 'weights', this.vector_weight.clone())
	}

	calculatePercentageDifference(v) {
		const vs = [v.x, v.y, v.z, v.w]
		return ((Math.max(...vs) - Math.min(...vs)) / vs.reduce((sum, value) => sum + value, 0)) * 10 || 0
	}

	take() {
		const result = new Ingredient(
			this.position.clone(),
			this.vector_weight.clone(),
			{ ...this.elements },
			'ingredient.test.title',
			'ingredient.test.description',
			0x555,
			this.amount,
		)

		// Reset properties
		this.position.set(0, 0, 0, 0)
		this.vector_weight.set(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []

		return result
	}

	getQueueMesh() {
		const material = new MeshStandardMaterial({
			color: 0xaa7755,
			roughness: 0.5,
			metalness: 0.5,
			transparent: true,
			opacity: 0.2,
			side: DoubleSide,
		})

		const group = new Group()

		for (let i = 1; i < this.queue.length; i++) {
			const start = this.queue[i - 1]
			const end = this.queue[i]

			// Add sphere at the start point
			const startSphere = new Mesh(new SphereGeometry(start.w, 12, 12), material)
			startSphere.position.set(start.x, start.y, start.z)
			group.add(startSphere)

			// Add tube connecting start and end
			const direction = new Vector3().subVectors(end, start)
			const length = direction.length()

			const tubeGeometry = new CylinderGeometry(1, 1, length, 6)
			const tube = new Mesh(tubeGeometry, material)

			// Align the tube to the direction and position it
			tube.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize())
			tube.position.copy(start).add(direction.multiplyScalar(0.5))

			group.add(tube)
		}

		// Add the last sphere for the final point
		const lastPoint = this.queue[this.queue.length - 1]
		const endSphere = new Mesh(new SphereGeometry(lastPoint.w, 12, 12), material)
		endSphere.position.set(lastPoint.x, lastPoint.y, lastPoint.z)
		group.add(endSphere)

		return group
	}
}
