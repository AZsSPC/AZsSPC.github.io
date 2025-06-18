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
	new Symbol('gold', 'G', 10)
]

const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0)

let slots = [[], [], [], [], []]

function getRandomSymbol() {
	let random = Math.random() * totalWeight

	for (const symbol of symbols) {
		if (random < symbol.weight) return symbol
		random -= symbol.weight
	}
}

function fake() {
	document.querySelectorAll('.reel').forEach((reel, index) => {
		reel.innerHTML = ''
		Array(5).fill().map(() => getRandomSymbol()).forEach((symbol, i) => {
			slots[index][i] = symbol
			const div = document.createElement('div')
			div.style.setProperty('background-image', `url(./set/dota/${symbol.value}.jpg)`)
			reel.appendChild(div)
		})
	})
}

function spin() {
	document.querySelectorAll('.reel').forEach((reel, index) => {

		const randomSymbols = Array(5).fill().map(() => getRandomSymbol())
		const filler = Array(20 + 10 * index).fill().map(() => getRandomSymbol())

		const allSymbols = [...randomSymbols, ...filler, ...slots[index]]

		reel.style.transition = 'none'
		reel.style.transform = `translateY(calc(${(randomSymbols.length) * 75}px - 100%))`
		reel.innerHTML = ''
		allSymbols.forEach((symbol, i) => {
			if (i < 5) slots[index][i] = symbol
			const div = document.createElement('div')
			if (symbol.type === 'gold') div.textContent = `${(1 + (Math.random() * 4) | 0) * 2}`
			div.style.setProperty('background-image', `url(./set/dota/${symbol.value}.jpg)`)
			reel.appendChild(div)
		})

		// Плавное завершение анимации
		setTimeout(() => {
			reel.style.transition = `transform ${allSymbols.length * 50}ms cubic-bezier(0.6, 0, 0.4, 1)`
			reel.style.transform = `translateY(0)`
		}, 10)
	})
	console.log(...slots)
}

fake()