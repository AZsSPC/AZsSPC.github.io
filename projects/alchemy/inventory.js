import {Ingredient} from './ingredient.js'

export class Inventory {
	constructor(render_element_ingredients, render_element_brews, render_element_hotbar) {
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
		this.items[ingredient.hash] = ingredient
		this.renderItem(ingredient)
	}

	removeItem(hash) {
		delete this.items[hash]
		this.removeItemFromDOM(hash)
	}

	updateItemAmount(hash, newAmount) {
		const ingredient = this.items[hash]
		if (!ingredient) return

		ingredient.amount = newAmount
		this.renderItem(ingredient)
	}

	renderItem(ingredient) {
		let itemDiv = this.render_element_ingredients.querySelector(`[data-hash="${ingredient.hash}"]`)

		if (itemDiv) {
			itemDiv.querySelector('.item-amount').textContent = `Amount: ${ingredient.amount}`
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
		const titleDiv = document.createElement('div')
		titleDiv.classList.add('item-title')
		titleDiv.textContent = `x${ingredient.amount} ${ingredient.title}`
		titleDiv.style.setProperty('--item-color', `#${ingredient.color.toString(16).padStart(6, '0')}`)
		itemDiv.appendChild(titleDiv)

		const descriptionDiv = document.createElement('div')
		descriptionDiv.classList.add('item-description')
		descriptionDiv.textContent = ingredient.description
		itemDiv.appendChild(descriptionDiv)
		/*
		 const amountDiv = document.createElement('div')
		 amountDiv.classList.add('item-amount')
		 amountDiv.textContent = `Amount: ${ingredient.amount}`
		 itemDiv.appendChild(amountDiv)
		 */
		const influenceDiv = document.createElement('div')
		influenceDiv.classList.add('item-influence')
		const influences = ['x', 'y', 'z', 'w']

		const max_influence = influences.reduce((max, axis) =>
			Math.max(max, Math.abs(ingredient.vector_position[axis] * ingredient.vector_weight[axis])), 0) / 50

		influences.forEach((axis) => {
			if (ingredient.vector_position[axis] * ingredient.vector_weight[axis] === 0) return
			const axisDiv = document.createElement('div')
			axisDiv.classList.add('item-influence', `item-influence-${axis}`)
			if (ingredient.vector_position[axis] * ingredient.vector_weight[axis] < 0) axisDiv.style.setProperty('--influence-direction', -1)
			axisDiv.style.setProperty('--influence-percent', `${50 + Math.abs(ingredient.vector_position[axis] * ingredient.vector_weight[axis] / max_influence || 0)}%`)
			axisDiv.textContent = `${ingredient.vector_position[axis]} ~${ingredient.vector_weight[axis]}`
			influenceDiv.appendChild(axisDiv)
		})
		itemDiv.appendChild(influenceDiv)

		this.render_element_ingredients.appendChild(itemDiv)

	}

	removeItemFromDOM(hash) {
		const itemDiv = this.render_element_ingredients.querySelector(`[data-hash="${hash}"]`)
		if (itemDiv) itemDiv.remove()
	}
}
