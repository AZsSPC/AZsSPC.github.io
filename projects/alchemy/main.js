import {AmbientLight, DirectionalLight, Group, PerspectiveCamera, Scene, Vector3, Vector4, WebGLRenderer} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

import ZoneBubble from './class/zone/ZoneBubble.js'
import ReceiptZoneBubble from './class/zone/ReceiptZoneBubble.js'
import Ingredient from './class/ingredient.js'
import Brew from './class/brew.js'
import Inventory from './class/inventory.js'

import * as CameraRotator from './comp/rotateCamera.js'
import createAxisGroup from './comp/createAxisGroup.js'

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

const group_spheres = new Group()
ReceiptZoneBubble.list.forEach(e => group_spheres.add(e.mesh))
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

let oldcord = brew.position.clone()
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

	if (oldcord.toArray().toString() !== brew.position.clone().toArray().toString()) {
		old = oldcord
		oldcord = brew.position.clone()
		decrementer = 1
	}

	if (decrementer > 0) {
		decrementer -= 0.03
		if (decrementer < 0) decrementer = 0
		CameraRotator.rotateCamera(brew, camera, 0, 0, old, decrementer)
	}

	requestAnimationFrame(animate)
	axesGroup.position.set(
		(brew.position.x + decrementer * (old.x - brew.position.x)),
		(brew.position.y + decrementer * (old.y - brew.position.y)),
		(brew.position.z + decrementer * (old.z - brew.position.z)),
	)
	ReceiptZoneBubble.list.forEach(e => e.updateGeometry(brew, old, decrementer))
	renderer.render(scene, camera)
}

ReceiptZoneBubble.list.forEach(e => console.log(e.on_touch))
animate()
/*
 const newg = new Vector4(22312312312364.68461635469841, 446.1235000000346, 123.1000000000002, 123623346.43623456)
 let ccc = compactVector4(newg)
 console.log(newg, ccc, expandVector4(ccc))
 */