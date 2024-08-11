/*
{
    name: '__template',
    path: '__template',
    lore: '__template',
    enabled: true,
    tag: [WEB, ]
},
*/


class Symbol {
	constructor(type, value, weight) {
		this.type = type
		this.value = value
		this.weight = weight
	}
}

const symbols = [
	new Symbol('common', 'A', 20),
	new Symbol('common', 'B', 15),
	new Symbol('common', 'C', 10),
	new Symbol('common', 'D', 5),
	new Symbol('rare', 'R1', 7),
	new Symbol('rare', 'R2', 5),
	new Symbol('rare', 'R3', 3),
	new Symbol('rare', 'R4', 2),
	new Symbol('wild', 'W1', 1),
	new Symbol('wild', 'W2', 1),
	new Symbol('gold', 'G', 1)
]

let slots = [[], [], [], [], []]

function getRandomSymbol() {
	const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0)
	let random = Math.random() * totalWeight

	for (const symbol of symbols) {
		if (random < symbol.weight) {
			return symbol
		}
		random -= symbol.weight
	}
}

function fake() {
	document.querySelectorAll('.reel').forEach((reel, index) => {
		reel.innerHTML = ''
		Array(3).fill().map(() => getRandomSymbol()).forEach((symbol, i) => {
			slots[index][i] = symbol
			const div = document.createElement('div')
			div.textContent = symbol.value
			reel.appendChild(div)
		})
	})
}

function spin() {
	document.querySelectorAll('.reel').forEach((reel, index) => {

		const randomSymbols = Array(3).fill().map(() => getRandomSymbol())
		const filler = Array(30 + 6 * index).fill().map(() => getRandomSymbol())

		const allSymbols = [...randomSymbols, ...filler, ...slots[index]]

		reel.style.transition = 'none'
		reel.style.transform = `translateY(calc(-100% + ${randomSymbols.length * 100}px))`
		reel.innerHTML = ''
		allSymbols.forEach((symbol, i) => {
			if (i < 3) slots[index][i] = symbol
			const div = document.createElement('div')
			div.textContent = symbol.value
			reel.appendChild(div)
		})

		// Плавное завершение анимации
		setTimeout(() => {
			reel.style.transition = `transform ${allSymbols.length * 50}ms ease-in-out`
			reel.style.transform = `translateY(0)`
		}, 10)
	})
	console.log(...slots)
}

fake()