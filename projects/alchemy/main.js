import {
	AmbientLight,
	BufferGeometry, ConeGeometry, CylinderGeometry, DirectionalLight,
	DoubleSide,
	Float32BufferAttribute, Group, Line, LineBasicMaterial,
	Mesh,
	MeshStandardMaterial,
	PerspectiveCamera, Scene,
	SphereGeometry,
	Vector2,
	Vector3,
	Vector4, WebGLRenderer,
} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

//'https://unpkg.com/three@v0.160.0/examples/jsm/controls/OrbitControls.js';

class Ingredient {
	constructor(vector_position = new Vector4(), vector_weight = new Vector4(), elements = {}, title = 'brew.unknown.title', lore = 'brew.unknown.lore', color = 0xffffff, amount = 1) {
		this.vector_position = vector_position
		this.vector_weight = vector_weight
		this.elements = elements
		this.title = title
		this.lore = lore
		this.color = color
		this.amount = amount
	}

	copy(amount = this.amount) {
		return new Ingredient(this.vector_position, this.vector_weight, this.elements, this.title, this.lore, this.color, amount)
	}

	static list = Object.freeze({
		water: (new Ingredient(new Vector4(0, 0, 0, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.water.title', 'ingredient.water.lore', 0x0000ff)),
		herb: (new Ingredient(new Vector4(-100, 0, 10, 0), new Vector4(10, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0x00ff00)),
		blood: (new Ingredient(new Vector4(10, 50, 10, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xff0000)),
		wood: (new Ingredient(new Vector4(-10, -80, 30, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910)),
		wood1: (new Ingredient(new Vector4(50, -8, -60, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910)),
		wood2: (new Ingredient(new Vector4(-20, 70, -5, 0), new Vector4(1, 1, 1, 0),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910)),
	})

}

class ReceiptBulb {
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

	updateGeometry() {
		if (Math.abs(this.result.vector_position.w - brew.vector_position.w) > this.vector_radius.y) {
			this.to_render = false
			return
		}

		this.to_render = true
		this.geometry.parameters.radius = this.vector_radius.x * (1 - Math.abs(this.result.vector_position.w - brew.vector_position.w) / this.vector_radius.y)
		this.mesh.position.set(this.result.vector_position.x, this.result.vector_position.y, this.result.vector_position.z)
		groupsphere.add(this.mesh)
	}
}

// Helper function to normalize weight components
class Brew {
	constructor() {
		this.vector_position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []
	}

	recalculateVectorAxis(axis, ingredient) {
		this.vector_weight[axis] = ((this.vector_weight[axis] * this.amount) + (ingredient.vector_weight[axis] * ingredient.amount))
			/ (this.amount + ingredient.amount) || 0

		this.vector_position[axis] = (this.vector_position[axis] * this.vector_weight[axis] * this.amount
				+ ingredient.vector_position[axis] * ingredient.vector_weight[axis] * ingredient.amount)
			/ (this.amount * this.vector_weight[axis] + ingredient.amount * ingredient.vector_weight[axis]) || 0
	}

	put(ingredient) {
		//console.log('')
		//console.log('~', this.amount, this.vector_position, this.vector_weight)
		//console.log('+', ingredient.amount, ingredient.vector_position, ingredient.vector_weight)

		this.recalculateVectorAxis('x', ingredient)
		this.recalculateVectorAxis('y', ingredient)
		this.recalculateVectorAxis('z', ingredient)
		this.recalculateVectorAxis('w', ingredient)

		this.amount += ingredient.amount

		Object.entries(ingredient.elements).forEach(([k, v]) => { this.elements[k] = (this.elements[k] || 0) + v })

		this.queue.push(new Vector3(this.vector_position.x, this.vector_position.y, this.vector_position.z))
		console.log('=', this.amount, this.vector_position, this.vector_weight)
	}


	take() {
		const result = new Ingredient(this.vector_position, this.vector_weight, this.elements, 'ingredient.test.title', 'ingredient.test.lore', 0x555, this.amount)
		this.vector_position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		this.queue = []
		return result
	}
}

class Deadzone {
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

	updateGeometry() {
		const vertices = this.states.flatMap(v => this.findVertex(v, brew.vector_position.w))
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
			[[50, 0, 0, 0], [50, 10, 20, 0.5], [40, -6, 5, 1]],
			[[50, 50, 50, 0], [30, 60, 60, 0.5], [30, 10, 40, 1]],
			[[0, 0, 0, 0], [10, 10, 10, 0.5], [23, 7, 5, 1]],
			[[50, 50, -20, 0], [60, 40, 10, 0.5], [-20, 10, -10, 1]],
		], [[0, 1, 2], [0, 2, 3], [0, 1, 3], [1, 2, 3]]),

		new Deadzone([
			[[0, -50, -50, 0], [-23, -30, -10, 0.5]],
			[[-50, 0, 0, 0.5], [10, -6, -5, 1]],
			[[-50, -50, 0, 0], [-40, -20, -10, 0.8]],
			[[-50, 0, -50, 0.2], [-10, 20, -40, 1]],
		], [[0, 1, 2], [0, 2, 3], [0, 1, 3], [1, 2, 3]]),
	])
}

const brew = new Brew()
brew.put(Ingredient.list.herb.copy(1))
brew.put(Ingredient.list.water.copy(1))
brew.put(Ingredient.list.blood.copy(1))
brew.put(Ingredient.list.wood.copy(1))
//brew.take()

const map_div = document.getElementById('map')
let {width: vw, height: vh} = map_div.getBoundingClientRect()

const scene = new Scene()

const renderer = new WebGLRenderer()
renderer.setSize(vw, vh)
map_div.appendChild(renderer.domElement)

let camera = new PerspectiveCamera(75, vw / vh, 0.1, 1000)
camera.position.z = 200

const group = new Group()
scene.add(group)
const groupsphere = new Group()
scene.add(groupsphere)
const axesGroup = createAxesGroup() // Создаём группу
scene.add(axesGroup) // Добавляем в сцену

ReceiptBulb.list.forEach(e => groupsphere.add(e.mesh))
Deadzone.list.forEach(e => group.add(e.mesh))

const geometry = new BufferGeometry().setFromPoints(brew.queue)
const material = new LineBasicMaterial({color: 0x0000ff})
const line = new Line(geometry, material)
scene.add(line)

const light = new AmbientLight(0xffffff, 2)
scene.add(light)

const directionalLight = new DirectionalLight(0xffffff, 5)
directionalLight.position.set(35, 50, 75)
scene.add(directionalLight)


function animate() {
	const {width: nvw, height: nvh} = map_div.getBoundingClientRect()

	if (vw !== nvw || vh !== nvh) {
		[vw, vh] = [nvw, nvh]
		renderer.setSize(vw, vh)
		camera.aspect = vw / vh
		camera.clearViewOffset()
	}

	requestAnimationFrame(animate)
	axesGroup.position.set(...brew.vector_position)
	Deadzone.list.forEach(e => e.updateGeometry())
	ReceiptBulb.list.forEach(e => e.updateGeometry())
	renderer.render(scene, camera)
}

function createAxesGroup() {
	const group = new Group()

	const radius = 1
	//const radiusf = 3
	const height = 10
	//const heightf = 1
	const offset = 10
	const offset1 = offset + height / 2
	//const offset2 = -offset - heightf / 2
	const radialSegments = 6
	const coneGeometry = new CylinderGeometry(radius, radius, height, radialSegments)
	//const coneGeometry2 = new CylinderGeometry(radiusf, radiusf, heightf, radialSegments)

	const coneX = new Mesh(coneGeometry, new MeshStandardMaterial({color: 0xff0000, opacity: 0.5, transparent: true}))
	coneX.position.set(offset1, 0, 0)
	coneX.rotation.set(0, 0, -Math.PI / 2)
	group.add(coneX)
	/*
	 const coneXF = new Mesh(coneGeometry2, coneX.material)
	 coneXF.position.set(offset2, 0, 0)
	 coneXF.rotation.set(0, 0, -Math.PI / 2)
	 group.add(coneXF)
	 */
	const coneY = new Mesh(coneGeometry, new MeshStandardMaterial({color: 0x00ff00, opacity: 0.5, transparent: true}))
	coneY.position.set(0, offset1, 0)
	group.add(coneY)
	/*
	 const coneYF = new Mesh(coneGeometry2, coneY.material)
	 coneYF.position.set(0, offset2, 0)
	 group.add(coneYF)
	 */
	const coneZ = new Mesh(coneGeometry, new MeshStandardMaterial({color: 0x0000ff, opacity: 0.5, transparent: true}))
	coneZ.position.set(0, 0, offset1)
	coneZ.rotation.set(Math.PI / 2, 0, 0)
	group.add(coneZ)
	/*
	 const coneZF = new Mesh(coneGeometry2, coneZ.material)
	 coneZF.position.set(0, 0, offset2)
	 coneZF.rotation.set(Math.PI / 2, 0, 0)
	 group.add(coneZF)
	 */

	return group
}

animate()
rotateCamera(0, 0)

let isDragging = false
let previousMousePosition = {x: 0, y: 0}

function rotateCamera(deltaX, deltaY) {
	const rotationSpeed = 0.005

	const cameraPosition = new Vector3(camera.position.x - brew.vector_position.x, camera.position.y - brew.vector_position.y, camera.position.z - brew.vector_position.z)

	cameraPosition.applyAxisAngle(new Vector3(0, 1, 0), -deltaX * rotationSpeed)

	const horizontalAxis = new Vector3().crossVectors(cameraPosition.clone().normalize(), new Vector3(0, 1, 0)).normalize()

	cameraPosition.applyAxisAngle(horizontalAxis, deltaY * rotationSpeed)

	const upDirection = cameraPosition.clone().normalize().y

	if (upDirection > 0.99 || upDirection < -0.99) cameraPosition.applyAxisAngle(horizontalAxis, deltaY * rotationSpeed)

	camera.position.set(
		cameraPosition.x + brew.vector_position.x,
		cameraPosition.y + brew.vector_position.y,
		cameraPosition.z + brew.vector_position.z,
	)

	camera.lookAt(brew.vector_position.x, brew.vector_position.y, brew.vector_position.z)
}


map_div.addEventListener('mousedown', (event) => {
	isDragging = true
	previousMousePosition.x = event.clientX
	previousMousePosition.y = event.clientY
})

window.addEventListener('mousemove', (event) => {
	if (!isDragging) return
	rotateCamera(event.clientX - previousMousePosition.x, event.clientY - previousMousePosition.y)
	previousMousePosition.x = event.clientX
	previousMousePosition.y = event.clientY
})

window.addEventListener('mouseup', () => { isDragging = false})