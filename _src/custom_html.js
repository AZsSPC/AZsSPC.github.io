class AzLinkButton extends HTMLAnchorElement {
	constructor() {
		super()
		this.classList.add('az-link-button')
	}
}

window.customElements.define('az-link-button', AzLinkButton, {extends: 'a'})


class AzButton extends HTMLButtonElement {
	constructor() {
		super()
		this.classList.add('az-button')
	}
}

window.customElements.define('az-button', AzButton, {extends: 'button'})


class AzRunButton extends AzButton {
	constructor() {
		super()
		this.setAttribute('onclick', 'loop_click()')
		this.setAttribute('color', 'blue')
		this.innerText = '|>'
	}
}

window.customElements.define('az-run-button', AzRunButton, {extends: 'button'})

class AzInputButton extends HTMLLabelElement {
	constructor() {
		super()
		this.classList.add('az-input-button')
	}

	connectedCallback() {
		console.log(this.getAttribute('for'))
	}
}

window.customElements.define('az-input-button', AzInputButton, {extends: 'label'})