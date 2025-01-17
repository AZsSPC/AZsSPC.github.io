import {CylinderGeometry, Group, Mesh, MeshStandardMaterial} from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

export default function createAxisGroup() {
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