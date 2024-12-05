import {AmbientLight, DirectionalLight, Group, PerspectiveCamera, Scene, WebGLRenderer} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import {Ingredient} from './ingredient.js'
import {ReceiptBulb} from './receiptBulb.js'
import {Brew} from './brew.js'
import {Deadzone} from './deadzone.js'
import * as CameraRotator from './rotateCamera.js'
import {createAxisGroup} from './createAxisGroup.js'
import {Inventory} from './inventory.js'

//'https://unpkg.com/three@v0.160.0/examples/jsm/controls/OrbitControls.js';

const inventory = new Inventory(
	document.getElementById('ingredients'),
	document.getElementById('brews'),
	document.getElementById('hotbar'),
)
inventory.fillFromCreativeMode()

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
CameraRotator.connect(map_div, brew, camera)

const group_deadzones = new Group()
Deadzone.list.forEach(e => group_deadzones.add(e.mesh))
scene.add(group_deadzones)

const group_spheres = new Group()
ReceiptBulb.list.forEach(e => group_spheres.add(e.mesh))
scene.add(group_spheres)

const axesGroup = createAxisGroup()
scene.add(axesGroup)

scene.add(brew.getQueueMesh())
scene.add(brew.mesh)

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
	Deadzone.list.forEach(e => e.updateGeometry(brew))
	ReceiptBulb.list.forEach(e => e.updateGeometry(brew))
	renderer.render(scene, camera)
}

animate()
