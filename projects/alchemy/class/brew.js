import { CylinderGeometry, DoubleSide, Group, Mesh, MeshStandardMaterial, SphereGeometry, Vector3, Vector4 } from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import Ingredient from './ingredient.js'
import ReceiptConditionsZoneBubble from './zone/ReceiptZoneBubble.js'
import Receipt from './receipt.js'

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
		this.receipt = new Receipt()
	}

	recalculateVectorAxis(axis, ingredient) {
		const amountA = this.amount
		const amountB = ingredient.amount
		const totalAmount = amountA + amountB

		const weightA = this.vector_weight[axis]
		const weightB = ingredient.vector_weight[axis]

		const posA = this.position[axis]
		const posB = ingredient.position[axis]

		const combinedWeight = weightA * amountA + weightB * amountB
		const newWeight = combinedWeight / totalAmount || 0
		this.vector_weight[axis] = newWeight

		const weightedPosition =
			posA * weightA * amountA +
			posB * weightB * amountB

		const totalWeightedAmount = weightA * amountA + weightB * amountB

		this.position[axis] = totalWeightedAmount
			? weightedPosition / totalWeightedAmount
			: 0
	}

	put(ingredient) {
		['x', 'y', 'z', 'w'].forEach((axis) => this.recalculateVectorAxis(axis, ingredient))

		this.receipt.action_put(ingredient)
		this.amount += ingredient.amount

		for (const [key, value] of Object.entries(ingredient.elements))
			this.elements[key] = (this.elements[key] || 0) + value

		const newRadius = this.calculatePercentageDifference(this.vector_weight)
		this.queue.push(new Vector4(this.position.x, this.position.y, this.position.z, newRadius))
		this.geometry = new SphereGeometry(newRadius)
		this.mesh.geometry.dispose()
		this.mesh.geometry = this.geometry
		this.mesh.position.set(this.position.x, this.position.y, this.position.z)

		//console.log('put', ingredient)
		//console.log('pos', this.position.clone(), 'weights', this.vector_weight.clone())
	}

	calculatePercentageDifference(v) {
		const vs = [v.x, v.y, v.z, v.w]
		return ((Math.max(...vs) - Math.min(...vs)) / vs.reduce((sum, value) => sum + value, 0)) * 10 || 0
	}

	take() {
		const receipt = this.receipt
		let result = new Ingredient(
			this.position.clone(),
			this.vector_weight.clone(),
			{ ...this.elements },
			'brew.default.title',
			'brew.default.description',
			0x555,
			this.amount,
		)


		for (const reciept_conditions of ReceiptConditionsZoneBubble.list) {
			const dx = (result.position.x - reciept_conditions.position.x) / reciept_conditions.radius;
			const dy = (result.position.y - reciept_conditions.position.y) / reciept_conditions.radius;
			const dz = (result.position.z - reciept_conditions.position.z) / reciept_conditions.radius;
			const dw = (result.position.w - reciept_conditions.position.w) / reciept_conditions.radiusW;

			const condition = dx ** 2 + dy ** 2 + dz ** 2 + dw ** 2 <= 1

			if (!condition) continue
			result = reciept_conditions.result.copy(this.amount)
		}

		// Reset properties
		this.position.set(0, 0, 0, 0)
		this.vector_weight.set(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []
		this.receipt = new Receipt()

		alert(AZ.locale.get('alerts.you_created')(AZ.locale.get(result.title)))

		return [result, receipt]
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
