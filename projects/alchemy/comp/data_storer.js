import { Vector4 } from 'https://unpkg.com/three@v0.160.0/build/three.module.js'

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const SEPARATOR = ':'
const BASE = ALPHABET.length

export const floatToCompactString = (value) => {
	const buffer = new DataView(new ArrayBuffer(8))
	buffer.setFloat64(0, value, false)

	let bigIntValue = BigInt(0)
	for (let i = 0; i < 8; i++)
		bigIntValue = (bigIntValue << 8n) | BigInt(buffer.getUint8(i))

	let result = ''
	do {
		result = ALPHABET[Number(bigIntValue % BigInt(BASE))] + result
		bigIntValue /= BigInt(BASE)
	} while (bigIntValue > 0)

	return result
}

export const compactStringToFloat = (str) => {
	let bigIntValue = BigInt(0)
	for (const char of str)
		bigIntValue = bigIntValue * BigInt(BASE) + BigInt(ALPHABET.indexOf(char))

	const buffer = new DataView(new ArrayBuffer(8))
	for (let i = 7; i >= 0; i--) {
		buffer.setUint8(i, Number(bigIntValue & 0xFFn))
		bigIntValue >>= 8n
	}

	return buffer.getFloat64(0, false)
}

export const compactVector4 = (vector4 = new Vector4()) => {
	return [vector4.x, vector4.y, vector4.z, vector4.w].map(floatToCompactString).join(SEPARATOR)
}

export const expandVector4 = (compactString) => {
	const [x, y, z, w] = compactString.split(SEPARATOR).map(compactStringToFloat)
	return new Vector4(x, y, z, w)
}