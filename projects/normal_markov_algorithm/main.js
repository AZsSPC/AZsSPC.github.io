let rules = [],
	steps,
	Q = 0,
	width = 0,
	height = 0,
	string = '', iterator = 0, runable
const
	TERMINATION = '->|',
	STEP = '-->',
	popup_upload = document.getElementById('popup_upload'),
	line = document.getElementById('line'),
	nma_table = document.getElementById('nma_table')

AZ.run = async function () {
	updateRules()
	AZ.loop = true
	iterator = 0
	string = line.innerText.replaceAll(/\s/g, ' ')
	runable = check(rules, true)
	console.log('in')
	while (AZ.loop) {
		if (iterator >= runable.length) {
			AZ.loop = false
		} else {
			let rule = runable[iterator]
			let s = ' ' + string + ' '
			if (s.includes(rule.from)) {
				console.log(iterator + 1)
				string = s.replace(rule.from, rule.to).replaceAll(/^\s+|\s+$/g, '')
				line.innerText = string
				markQuery(iterator)
				iterator = 0
				if (rule.exit) {
					AZ.loop = false
				}
				await new Promise(res => setTimeout(res, AZ.timeout))
			} else {
				iterator++
			}
		}
	}
	AZ.loop = false
	loop_change_view()
	console.log('out')
}

function updateRules(arr, clear = false) {
	AZ.loop = false
	if (!arr) {
		arr = []
		nma_table.childNodes.forEach((a) => arr.push({
			exit: a.querySelector('.exit').innerText === TERMINATION,
			from: a.querySelector('.from').innerText.replaceAll(/\s/g, ' '),
			to: a.querySelector('.to').innerText.replaceAll(/\s/g, ' ')
		}))
	}
	rules = check(arr, clear)
	nma_table.innerHTML = ''
	for (const a of rules) addRule(a.from, a.to, a.exit, a.off)
}

function markQuery(i) {
	setTimeout(() => {
		document.querySelectorAll('[query]').forEach((e) => e.removeAttribute('query'))
		nma_table.querySelectorAll('li:not([off])')[i].setAttribute('query', '')
	}, 0)
}

function addEmptyRules(count = 1) {
	for (let i = 0; i < count; i++) addRule()
}

function addRule(from = '', to = '', exit = false, off = false) {
	nma_table.innerHTML += '<li translate="no" draggable="true"' + (off ? ' off' : '') + '><div>' +
		'<span class="from" contenteditable="true" onchange="updateRules()">' + from + '</span>' +
		'<span class="exit" onclick="switchExit(this)"' + (exit ? ' t' : '') + '>' + (exit ? TERMINATION : STEP) + '</span>' +
		'<span class="to" contenteditable="true">' + to + '</span>' +
		'<span class="del" onclick="nma_table.removeChild(this.parentNode)">-</span>' +
		'</div></li>'
}

function switchExit(el) {
	let term = el.innerText === STEP
	el.innerText = term ? TERMINATION : STEP
	if (term) el.setAttribute('t', '')
	else el.removeAttribute('t')
}

function check(arr, clear = false) {
	let result = []
	for (let s of arr) {
		let b = s.from !== ''
		for (let a of result) if (b && a.from === s.from) {
			b = false
			break
		}
		s.from = s.from.replaceAll(/\xA0/g, ' ')
		s.to = s.to.replaceAll(/\xA0/g, ' ')
		s.off = !b
		if (!clear) result.push(s)
		else if (b) result.push(s)
	}
	return result
}

(function makeRulesSortable() {
	let dragEl

	function _onDragOver(evt) {
		evt.preventDefault()
		evt.dataTransfer.dropEffect = 'move'
		let t = evt.target
		if (t && t !== dragEl && t.nodeName === 'LI') nma_table.insertBefore(dragEl, t.nextSibling || t)
	}

	function _onDragEnd(evt) {
		evt.preventDefault()
		dragEl.classList.remove('ghost')
		nma_table.removeEventListener('dragover', _onDragOver, false)
		nma_table.removeEventListener('dragend', _onDragEnd, false)
	}

	nma_table.addEventListener('dragstart', function (evt) {
		dragEl = evt.target
		evt.dataTransfer.effectAllowed = 'move'
		evt.dataTransfer.setData('Text', dragEl.textContent)
		nma_table.addEventListener('dragover', _onDragOver, false)
		nma_table.addEventListener('dragend', _onDragEnd, false)
		setTimeout(() => dragEl.classList.add('ghost'), 0)
	}, false)
})()

function exportNMA() {
	updateRules()
	let filename = prompt('Name this file?')
	if (filename) create_file_and_download(filename + '.json', JSON.stringify({line: string, rules: check(rules, true)}))
}

function importNMA() {
	switchDisplay(popup_upload, 'grid')
}

function uploadNMA(el) {
	on_file_uploaded(el, (t) => {
		let json = JSON.parse(t)
		line.innerText = json.line
		updateRules(json.rules)
	}, (e) => {
	})
	switchDisplay(popup_upload, 'grid')
}

// Используем
updateRules()
addEmptyRules(15)

loop_change_view(false)