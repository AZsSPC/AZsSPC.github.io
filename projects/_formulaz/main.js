let f_formulas = document.getElementById('f_r')
let f_buttons = document.getElementById('f_b')
let DATA = {formulas: [], buttons: []}
let rel_url = 'https://azsspc.github.io/projects/formulaz/sets/physic.json'

function find(included_char) {
	console.log(included_char)
	f_formulas.innerHTML = ''
	f_formulas.hidden = true
	let counter = 0
	let inc = included_char === '*'
	for (const formula of DATA.formulas) if (inc || formula.code.includes(included_char)) {
		counter++
		let m_c = document.createElement('span')
		m_c.className = 'm_c'
		m_c.setAttribute('onclick', () => {switchViewMode(this)})
		let m_h = document.createElement('span')
		m_h.className = 'm_h'
		m_h.innerHTML = '$$' + formula.code + '$$'
		let m_f = document.createElement('span')
		m_f.className = 'm_f'
		m_f.innerHTML = formula.lore
		m_c.append(m_h)
		m_c.append(m_f)
		f_formulas.append(m_c)
	}
	useMathJax()
	f_formulas.hidden = false
}

function switchViewMode(el) {
	el.className = (el.className === 'm_c' ? 'm_cb' : 'm_c')
}

function reload_data(url = rel_url) {
	rel_url = url
	f_formulas.hidden = true
	let xhr = new XMLHttpRequest()
	xhr.open('GET', url, true)
	xhr.send()
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return
		DATA = JSON.parse(xhr.responseText)
		f_buttons.innerHTML = '<input placeholder="Find..." id="find_labe" onchange="console.log(this.value);find(this.value);" oninput="if(this.value.length>2) find(this.value)" type="text">'
		for (let b of DATA.buttons) f_buttons.innerHTML += ' <button is="az-button" color="gold" onclick="find(\'' + b.pattern + '\')">' + b.name + '</button>'

		find('*')
	}
}

reload_data()
