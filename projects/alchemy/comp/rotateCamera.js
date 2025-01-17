import {Vector3, Vector4} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

let isDragging = false
let previousMousePosition = {x: 0, y: 0}
let verticalAngle = 0

export function rotateCamera(brew, camera, deltaX = 0, deltaY = 0, old = brew.position, delta = 0) {
	const rotationSpeed = 0.005

	if (deltaX === 0 && deltaY === 0) {
		const cameraPosition = new Vector3(
			camera.position.x - (brew.position.x + delta * (old.x - brew.position.x)),
			camera.position.y - (brew.position.y + delta * (old.y - brew.position.y)),
			camera.position.z - (brew.position.z + delta * (old.z - brew.position.z)),
		)

		camera.position.set(
			cameraPosition.x + (brew.position.x + delta * (old.x - brew.position.x)),
			cameraPosition.y + (brew.position.y + delta * (old.y - brew.position.y)),
			cameraPosition.z + (brew.position.z + delta * (old.z - brew.position.z)),
		)

		camera.lookAt(
			(brew.position.x + delta * (old.x - brew.position.x)),
			(brew.position.y + delta * (old.y - brew.position.y)),
			(brew.position.z + delta * (old.z - brew.position.z)),
		)

		return
	}

	const cameraPosition = new Vector3(
		camera.position.x - (brew.position.x + delta * (old.x - brew.position.x)),
		camera.position.y - (brew.position.y + delta * (old.y - brew.position.y)),
		camera.position.z - (brew.position.z + delta * (old.z - brew.position.z)),
	)

	cameraPosition.applyAxisAngle(new Vector3(0, 1, 0), -deltaX * rotationSpeed)

	const horizontalAxis = new Vector3()
		.crossVectors(cameraPosition.clone().normalize(), new Vector3(0, 1, 0))
		.normalize()

	const newVerticalAngle = verticalAngle + deltaY * rotationSpeed

	if (newVerticalAngle > -Math.PI / 2 + 0.1 && newVerticalAngle < Math.PI / 2 - 0.1) {
		cameraPosition.applyAxisAngle(horizontalAxis, deltaY * rotationSpeed)
		verticalAngle = newVerticalAngle
	}

	camera.position.set(
		cameraPosition.x + (brew.position.x + delta * (old.x - brew.position.x)),
		cameraPosition.y + (brew.position.y + delta * (old.y - brew.position.y)),
		cameraPosition.z + (brew.position.z + delta * (old.z - brew.position.z)),
	)

	camera.lookAt(
		(brew.position.x + delta * (old.x - brew.position.x)),
		(brew.position.y + delta * (old.y - brew.position.y)),
		(brew.position.z + delta * (old.z - brew.position.z)),
	)

}


export function connect(element, brew, camera) {
	camera.position.z = 200

	element.addEventListener('mousedown', (event) => {
		isDragging = true
		previousMousePosition.x = event.clientX
		previousMousePosition.y = event.clientY
		event.preventDefault()
	})
	/*
	 const zoomSpeed = 10

	 element.addEventListener('mousewheel', (event) => {
	 const zoomDirection = event.deltaY > 0 ? 1 : -1

	 camera.position.z += zoomDirection * zoomSpeed
	 camera.position.z = Math.max(0, Math.min(300, camera.position.z))
	 rotateCamera(brew, camera)
	 event.preventDefault()
	 })
	 */
	window.addEventListener('mousemove', (event) => {
		if (!isDragging) return
		rotateCamera(brew, camera, event.clientX - previousMousePosition.x, event.clientY - previousMousePosition.y)
		previousMousePosition.x = event.clientX
		previousMousePosition.y = event.clientY
	})

	window.addEventListener('mouseup', () => { isDragging = false })

	rotateCamera(brew, camera, -90, 90)
}