import Ingredient from './ingredient.js'
import { use_locale } from '../comp/locale.js'

use_locale()

export default class Inventory {
	constructor(brew, render_element_ingredients, render_element_brews, render_element_hotbar) {
		this.brew = brew
		this.render_element_ingredients = render_element_ingredients
		this.render_element_brews = render_element_brews
		this.render_element_hotbar = render_element_hotbar
		this.items = {}
	}

	fillFromCreativeMode() {
		for (let key in Ingredient.list)
			this.addItem(Ingredient.list[key].copy(999999))
	}

	addItem(ingredient) {
		if (this.items[ingredient.hash]) {
			this.items[ingredient.hash].amount += ingredient.amount
			this.renderItem(this.items[ingredient.hash])
			return
		}

		console.log('rewrited')
		const is_new = !(this.items[ingredient.hash]?.amount)
		const is_unnamed = ingredient.title === 'brew.unknown.title' || ingredient.title === 'brew.default.title'

		if (is_new && is_unnamed) {
			const new_name = prompt('Name your new brew', 'brew.default.title')
			ingredient.title = new_name
			ingredient.description = 'brew.default.description'
		}

		this.items[ingredient.hash] = ingredient
		this.renderItem(ingredient)
	}

	removeItem(hash) {
		delete this.items[hash]
		this.removeItemFromDOM(hash)
	}

	updateItemAmount(hash) {
		const ingredient = this.items[hash]
		if (!ingredient) return
		this.renderItem(ingredient)
	}

	renderItem(ingredient) {
		let itemDiv = this.render_element_ingredients.querySelector(`[data-hash="${ingredient.hash}"]`)

		if (itemDiv) {
			itemDiv.querySelector('.item-amount').textContent = ingredient.amount
			return
		}

		itemDiv = document.createElement('div')
		itemDiv.classList.add('item', 'ingredient')
		itemDiv.setAttribute('data-hash', ingredient.hash)
		/*
		 const colorDiv = document.createElement('div')
		 colorDiv.classList.add('item-color')
		 colorDiv.style.backgroundColor = `#${ingredient.color.toString(16).padStart(6, '0')}`
		 itemDiv.appendChild(colorDiv)
		 */
		const titleDiv = document.createElement('span')
		titleDiv.classList.add('item-title')

		const eAmount = document.createElement('span')
		eAmount.classList.add('item-name')
		eAmount.textContent = AZ.locale.get(ingredient.title)
		titleDiv.appendChild(eAmount)

		const eTitle = document.createElement('span')
		eTitle.classList.add('item-amount')
		eTitle.textContent = ingredient.amount
		titleDiv.appendChild(eTitle)

		itemDiv.appendChild(titleDiv)

		const colorDiv = document.createElement('div')
		colorDiv.classList.add('item-color')
		colorDiv.style.setProperty('background', `#${ingredient.color.toString(16).padStart(6, '0')}`)
		itemDiv.appendChild(colorDiv)

		const descriptionDiv = document.createElement('p')
		descriptionDiv.classList.add('item-description')
		descriptionDiv.textContent = AZ.locale.get(ingredient.description)
		itemDiv.appendChild(descriptionDiv)
		/*
		 const amountDiv = document.createElement('div')
		 amountDiv.classList.add('item-amount')
		 amountDiv.textContent = `Amount: ${ingredient.amount}`
		 itemDiv.appendChild(amountDiv)
		 */
		const influenceDiv = document.createElement('div')
		influenceDiv.classList.add('item-influence-group')
		const influences = ['x', 'y', 'z', 'w']

		const max_influence = influences.reduce((max, axis) =>
			Math.max(max, Math.abs(ingredient.position[axis] * ingredient.vector_weight[axis])), 0) / 50

		let active_axises = 0

		influences.forEach((axis) => {
			if (ingredient.vector_weight[axis] === 0)
				return

			active_axises++

			const axisDiv = document.createElement('span')
			axisDiv.classList.add('item-influence', `item-influence-${axis}`)

			if (ingredient.position[axis] * ingredient.vector_weight[axis] < 0)
				axisDiv.style.setProperty('--influence-direction', -1)

			axisDiv.style.setProperty('--influence-percent',
				`${50 + Math.abs(ingredient.position[axis] * ingredient.vector_weight[axis] / max_influence || 0)}%`,
			)
			axisDiv.textContent = `${ingredient.position[axis]} \\ ${ingredient.vector_weight[axis]}`
			influenceDiv.appendChild(axisDiv)
		})
		itemDiv.style.setProperty('--active-axises', active_axises)
		itemDiv.appendChild(influenceDiv)

		const putButton = document.createElement('div')
		putButton.classList.add('item-put')

		itemDiv.addEventListener('click', () => {
			const amount = prompt(`Insert amount of [${AZ.locale.get(ingredient.title)}] (0;${ingredient.amount}]`, Math.min(1, ingredient.amount))

			if (+amount != amount) {
				alert(`"${amount}" of it is not a number`)
				return
			} else if (amount <= 0 || amount > ingredient.amount) {
				alert(`${amount} is not in bound (0;${ingredient.amount}]`)
				return
			}

			this.brew.put(ingredient.take(+amount))
			this.updateItemAmount(ingredient.hash)
		})
		itemDiv.appendChild(putButton)

		this.render_element_ingredients.appendChild(itemDiv)

	}

	removeItemFromDOM(hash) {
		const itemDiv = this.render_element_ingredients.querySelector(`[data-hash="${hash}"]`)
		if (itemDiv) itemDiv.remove()
	}
}
