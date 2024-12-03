import * as THREE from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import {Vector2, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

class Ingredient {
	constructor(vector_position = new Vector4(), vector_weight = new Vector4(), vector_radius = new Vector2(), elements = {}, title = 'brew.unknown.title', lore = 'brew.unknown.lore', color = 0xffffff, amount = 1) {
		this.vector_position = vector_position
		this.vector_weight = vector_weight
		this.vector_radius = vector_radius
		this.elements = elements
		this.title = title
		this.lore = lore
		this.color = color
		this.amount = amount
	}

	static list = Object.freeze({
		water: new Ingredient(new Vector4(0, 0, 0, 0), new Vector4(1, 1, 1, 0), new Vector2(7, 1),
			{}, 'ingredient.water.title', 'ingredient.water.lore', 0x0000ff),
		herb: new Ingredient(new Vector4(-100, 0, 10, 0), new Vector4(1, 1, 1, 0), new Vector2(10, 1),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0x00ff00),
		blood: new Ingredient(new Vector4(10, 50, 10, 0), new Vector4(1, 1, 1, 0), new Vector2(10, 1),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xff0000),
		wood: new Ingredient(new Vector4(-10, -80, 30, 0), new Vector4(1, 1, 1, 0), new Vector2(2, 1),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910),
		wood1: new Ingredient(new Vector4(50, -8, -60, 0), new Vector4(1, 1, 1, 0), new Vector2(3, 1),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910),
		wood2: new Ingredient(new Vector4(-20, 70, -5, 0), new Vector4(1, 1, 1, 0), new Vector2(3, 1),
			{}, 'ingredient.herb.title', 'ingredient.herb.lore', 0xa40910),
	})

	copy(amount = this.amount) {
		return new Ingredient(this.vector_position, this.vector_weight, this.vector_radius, this.elements, this.title, this.lore, this.color, amount)
	}
}

class Brew {
	constructor() {
		this.vector_position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
	}

	put(ingredient) {
		const total_weight = new THREE.Vector4(
			this.vector_weight.x * this.amount + ingredient.vector_weight.x * ingredient.amount,
			this.vector_weight.y * this.amount + ingredient.vector_weight.y * ingredient.amount,
			this.vector_weight.z * this.amount + ingredient.vector_weight.z * ingredient.amount,
			this.vector_weight.w * this.amount + ingredient.vector_weight.w * ingredient.amount,
		)

		const combined_amount = this.amount + ingredient.amount
		const normalized_weight = new THREE.Vector4(
			total_weight.x / combined_amount,
			total_weight.y / combined_amount,
			total_weight.z / combined_amount,
			total_weight.w / combined_amount,
		)

		this.vector_position.x += (ingredient.vector_position.x - this.vector_position.x) * normalized_weight.x
		this.vector_position.y += (ingredient.vector_position.y - this.vector_position.y) * normalized_weight.y
		this.vector_position.z += (ingredient.vector_position.z - this.vector_position.z) * normalized_weight.z
		this.vector_position.w += (ingredient.vector_position.w - this.vector_position.w) * normalized_weight.w

		this.vector_weight = normalized_weight
		this.amount = combined_amount

		Object.entries(ingredient.elements).forEach(([k, v]) => { this.elements[k] = (this.elements[k] || 0) + v })
	}

	take() {
		const result = new Ingredient(this.vector_position, this.vector_weight, new Vector2(), this.elements, 'ingredient.test.title', 'ingredient.test.lore', 0x555, this.amount)
		this.vector_position = new Vector4(0, 0, 0, 0)
		this.vector_weight = new Vector4(0, 0, 0, 0)
		this.amount = 0
		this.elements = {}
		return result
	}
}

class Deadzone {
	constructor(states, connections) {
		this.states = states
		this.connections = connections
		this.material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			roughness: 0,
			metalness: 0,
			opacity: 0.5,
			side: THREE.DoubleSide,
			transparent: true,
		})
		this.geometry = new THREE.BufferGeometry()
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.updateGeometry(0)
	}

	updateGeometry(w_slider) {
		const vertices = this.states.flatMap(v => this.findVertex(v, w_slider))
		const faces = this.connections.flatMap(face => face)
		this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
		this.geometry.setIndex(faces)
		this.geometry.computeVertexNormals()
	}

	findVertex(arrays, d4) {
		const n = arrays.length - 1
		if (d4 <= arrays[0][3]) return arrays[0].slice(0, 3)
		if (d4 >= arrays[n][3]) return arrays[n].slice(0, 3)

		for (let i = 0; i < n; i++) {
			const [v1, v2] = [arrays[i], arrays[i + 1]]
			if (d4 < v1[3] || d4 >= v2[3]) continue
			const weight = (d4 - v1[3]) / (v2[3] - v1[3])
			return v1.map((v, j) => v * (1 - weight) + v2[j] * weight).slice(0, 3)
		}
		return [0, 0, 0]
	}

}

const brew = new Brew()
brew.put(Ingredient.list.herb.copy(9))
brew.put(Ingredient.list.wood.copy(5))
brew.put(Ingredient.list.blood.copy(2))
//brew.take()

const map_div = document.getElementById('map')
let {width: vw, height: vh} = map_div.getBoundingClientRect()

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(vw, vh)
map_div.appendChild(renderer.domElement)

let camera = new THREE.PerspectiveCamera(75, vw / vh, 0.1, 1000)
camera.position.z = 200

const group = new THREE.Group()
scene.add(group)
const groupsphere = new THREE.Group()
scene.add(groupsphere)

const createIngredientSpheres = () => {
	// Remove previous ingredients
	//groupsphere.children.forEach(child => child instanceof THREE.Mesh && groupsphere.remove(child))
	groupsphere.clear()

	Object.entries(Ingredient.list).forEach(([k, v]) => {
		if (Math.abs(v.vector_position.w - brew.vector_position.w) > v.vector_radius.y) return

		const geometry = new THREE.SphereGeometry(v.vector_radius.x * (1 - Math.abs(v.vector_position.w - brew.vector_position.w) / v.vector_radius.y))
		const material = new THREE.MeshStandardMaterial({color: v.color, roughness: 0.7, metalness: 0.2})
		const sphere = new THREE.Mesh(geometry, material)
		sphere.position.set(v.vector_position.x, v.vector_position.y, v.vector_position.z)
		groupsphere.add(sphere)
	})
}

const deadzones = [
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
]

deadzones.forEach(e => group.add(e.mesh))

const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(35, 50, 75)
scene.add(directionalLight)


let rotationAngle = 0
let f = false

/*
 scene.add(new THREE.Mesh(new THREE.SphereGeometry(150,20,20), new THREE.MeshStandardMaterial(
 {color: 0xffffff, roughness: 0.7, metalness: 0.2, opacity: 0.2, transparent: true},
 )))
 */

function animate() {
	const {width: nvw, height: nvh} = map_div.getBoundingClientRect()

	if (vw !== nvw || vh !== nvh) {
		[vw, vh] = [nvw, nvh]
		renderer.setSize(vw, vh)
		camera.aspect = vw / vh
		camera.clearViewOffset()
	}

	requestAnimationFrame(animate)

	rotationAngle += 0.01

	group.rotation.y = rotationAngle
	groupsphere.rotation.y = rotationAngle

	createIngredientSpheres()
	deadzones.forEach(e => e.updateGeometry(brew.vector_position.w))

	renderer.render(scene, camera)
}

animate()
