import Ingredient from './ingredient.js'

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
		for (let key in Ingredient.list)console.log(key,Ingredient.list[key].hash)
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

		itemDiv = nel('div', ['item', 'ingredient'], '', { '--item-color': `#${ingredient.color.toString(16).padStart(6, '0')}` })
		itemDiv.setAttribute('data-hash', ingredient.hash)
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


		const influenceDiv = nel('div', ['item-influence-group'])

		let active_axises = 0
		const influences = ['x', 'y', 'z', 'w']
		const max_influence = influences.reduce((max, axis) =>
			Math.max(max, Math.abs(ingredient.position[axis] * ingredient.vector_weight[axis])), 0) / 50

		influences.forEach((axis) => {
			if (ingredient.vector_weight[axis] === 0)
				return

			active_axises++

			influenceDiv.appendChild(nel_nest(
				nel('div', ['item-influence', `item-influence-${axis}`], '', {
					'--influence-direction': (ingredient.position[axis] * ingredient.vector_weight[axis] < 0) ? -1 : 1,
					'--influence-percent': `${50 + Math.abs(ingredient.position[axis] * ingredient.vector_weight[axis] / max_influence || 0)}%`,
				}),
				nel('span', ['axis-pos'], `${ingredient.position[axis]}`),
				nel('span', ['axis-weight'], `${ingredient.vector_weight[axis]}`)
			)
			)
		})
		itemDiv.style.setProperty('--active-axises', active_axises)



		this.render_element_ingredients.appendChild(
			nel_nest(itemDiv,
				// nel('div', ['item-color'], '', { 'background': `#${ingredient.color.toString(16).padStart(6, '0')}` }),
				nel_nest(nel('div', ['item-data']),
					nel_nest(
						nel('span', ['item-title']),
						nel('span', ['item-name'], AZ.locale.get(ingredient.title)),
						nel('span', ['item-amount'], ingredient.amount)
					),
					nel('p', ['item-description'], AZ.locale.get(ingredient.description)),
					influenceDiv,
				),
				// nel('div', ['item-color'], '', { 'background': `#${ingredient.color.toString(16).padStart(6, '0')}` })
			)
		)
	}

	removeItemFromDOM(hash) {
		const itemDiv = this.render_element_ingredients.querySelector(`[data-hash="${hash}"]`)
		if (itemDiv) itemDiv.remove()
	}
}

const nel = (tag = 'div', classes = [], text = '', style_props = {}) => {
	const element = document.createElement(tag)

	if (classes)
		element.classList.add(...classes)

	if (text)
		element.textContent = text

	if (style_props)
		Object.keys(style_props).forEach(e => element.style.setProperty(e, style_props[e]))

	return element
}

const nel_nest = (parent, ...childs) => {
	childs.forEach(e => parent.appendChild(e))
	return parent
}
