import {AmbientLight, DirectionalLight, Group, PerspectiveCamera, Scene, WebGLRenderer} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import {ReceiptBulb} from './receiptBulb.js'
import {Brew} from './brew.js'
import {Deadzone} from './deadzone.js'
import * as CameraRotator from './rotateCamera.js'
import {createAxisGroup} from './createAxisGroup.js'
import {Inventory} from './inventory.js'
import {rotateCamera} from './rotateCamera.js'

//'https://unpkg.com/three@v0.160.0/examples/jsm/controls/OrbitControls.js';

const brew = new Brew()
const inventory = new Inventory(
	brew,
	document.getElementById('ingredients'),
	document.getElementById('brews'),
	document.getElementById('hotbar'),
)
inventory.fillFromCreativeMode()

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

//scene.add(brew.getQueueMesh())
scene.add(brew.mesh)

const light = new AmbientLight(0xffffff, 2)
scene.add(light)

const directionalLight = new DirectionalLight(0xffffff, 5)
directionalLight.position.set(35, 50, 75)
scene.add(directionalLight)

let oldcord = brew.vector_position.clone()
let old = oldcord

let decrementer = 0

function animate() {
	const {width: nvw, height: nvh} = map_div.getBoundingClientRect()

	if (vw !== nvw || vh !== nvh) {
		[vw, vh] = [nvw, nvh]
		renderer.setSize(vw, vh)
		camera.aspect = vw / vh
		camera.clearViewOffset()
	}

	if (oldcord.toArray().toString() !== brew.vector_position.clone().toArray().toString()) {
		old = oldcord
		oldcord = brew.vector_position.clone()
		decrementer = 1
	}

	if (decrementer > 0) {
		decrementer -= 0.03
		if (decrementer < 0) decrementer = 0
		rotateCamera(brew, camera, 0, 0, decrementer, old)
	}

	requestAnimationFrame(animate)
	axesGroup.position.set(
		(brew.vector_position.x + decrementer * (old.x - brew.vector_position.x)),
		(brew.vector_position.y + decrementer * (old.y - brew.vector_position.y)),
		(brew.vector_position.z + decrementer * (old.z - brew.vector_position.z)),
	)
	Deadzone.list.forEach(e => e.updateGeometry(brew, decrementer, old))
	ReceiptBulb.list.forEach(e => e.updateGeometry(brew, decrementer, old))
	renderer.render(scene, camera)
}

animate()
