import {
	BufferGeometry, CylinderGeometry,
	DoubleSide, Float32BufferAttribute, Group,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshStandardMaterial, Quaternion,
	SphereGeometry,
	Vector3,
	Vector4,
} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import {Ingredient} from './ingredient.js'

export class Brew {
	constructor() {
		this.vector_position = new Vector4(0, 0, 0, 0)
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
			this.vector_position[axis] * this.vector_weight[axis] * this.amount +
			ingredient.vector_position[axis] * ingredient.vector_weight[axis] * ingredient.amount

		this.vector_position[axis] = weightedPosition / (this.amount * this.vector_weight[axis] + ingredient.amount * ingredient.vector_weight[axis]) || 0
	}

	put(ingredient) {
		['x', 'y', 'z', 'w'].forEach((axis) => this.recalculateVectorAxis(axis, ingredient))

		this.amount += ingredient.amount

		for (const [key, value] of Object.entries(ingredient.elements))
			this.elements[key] = (this.elements[key] || 0) + value

		const newRadius = this.vector_weight.x + this.vector_weight.y + this.vector_weight.z + this.vector_weight.w
		this.queue.push(new Vector4(this.vector_position.x, this.vector_position.y, this.vector_position.z, newRadius * 0.8))
		this.geometry = new SphereGeometry(newRadius)
		this.mesh.geometry.dispose()
		this.mesh.geometry = this.geometry
		this.mesh.position.set(this.vector_position.x, this.vector_position.y, this.vector_position.z)
	}

	take() {
		const result = new Ingredient(
			this.vector_position.clone(),
			this.vector_weight.clone(),
			{...this.elements},
			'ingredient.test.title',
			'ingredient.test.lore',
			0x555,
			this.amount,
		)

		// Reset properties
		this.vector_position.set(0, 0, 0, 0)
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

		const mergedGeometry = new BufferGeometry()

		let positions = []
		let normals = []
		let indices = []
		let indexOffset = 0

		for (let i = 1; i < this.queue.length; i++) {
			const start = this.queue[i - 1]
			const end = this.queue[i]

			const direction = new Vector3().subVectors(end, start)
			const length = direction.length()
			const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5)

			const cylinderGeometry = new CylinderGeometry(end.w, start.w, length, 25)

			const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize())
			cylinderGeometry.applyQuaternion(quaternion)

			cylinderGeometry.translate(midpoint.x, midpoint.y, midpoint.z)

			this.addGeometryData(cylinderGeometry, positions, normals, indices, indexOffset)
			indexOffset += cylinderGeometry.attributes.position.count

			const startSphereGeometry = new SphereGeometry(start.w, 12, 12)
			startSphereGeometry.translate(start.x, start.y, start.z)
			this.addGeometryData(startSphereGeometry, positions, normals, indices, indexOffset)
			indexOffset += startSphereGeometry.attributes.position.count
		}

		mergedGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
		mergedGeometry.setAttribute('normal', new Float32BufferAttribute(normals, 3))
		mergedGeometry.setIndex(indices)

		return new Mesh(mergedGeometry, material)
	}

	addGeometryData(geometry, positions, normals, indices, indexOffset) {
		const positionAttribute = geometry.attributes.position
		const normalAttribute = geometry.attributes.normal
		const indexAttribute = geometry.index

		for (let i = 0; i < positionAttribute.count; i++)
			positions.push(positionAttribute.getX(i), positionAttribute.getY(i), positionAttribute.getZ(i))

		for (let i = 0; i < normalAttribute.count; i++)
			normals.push(normalAttribute.getX(i), normalAttribute.getY(i), normalAttribute.getZ(i))

		for (let i = 0; i < indexAttribute.count; i++)
			indices.push(indexAttribute.getX(i) + indexOffset)
	}


}
