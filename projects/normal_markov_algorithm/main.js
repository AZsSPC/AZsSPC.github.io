(function () {
	const header = document.createElement('header');

	const div1 = document.createElement('div');
	const clearButton = document.createElement('button');
	clearButton.className = 'az-button';
	clearButton.setAttribute('color', 'red');
	clearButton.textContent = 'Clear';
	clearButton.onclick = () => updateRules([], true);

	const cleanupButton = document.createElement('button');
	cleanupButton.className = 'az-button';
	cleanupButton.textContent = 'Cleanup';
	cleanupButton.onclick = () => updateRules(null, true);

	const runButton = document.createElement('button');
	runButton.className = 'az-button az-run-button';
	runButton.addEventListener('click', () => AZ.loop.click());

	const exportButton = document.createElement('button');
	exportButton.className = 'az-button';
	exportButton.textContent = 'Export';
	exportButton.onclick = exportNMA;

	const importButton = document.createElement('button');
	importButton.className = 'az-button';
	importButton.textContent = 'Import';
	importButton.onclick = importNMA;

	const plusOneButton = document.createElement('button');
	plusOneButton.className = 'az-button';
	plusOneButton.setAttribute('color', 'gold');
	plusOneButton.textContent = '+1';
	plusOneButton.onclick = () => addEmptyRules(1);

	const plusTenButton = document.createElement('button');
	plusTenButton.className = 'az-button';
	plusTenButton.setAttribute('color', 'gold');
	plusTenButton.textContent = '+10';
	plusTenButton.onclick = () => addEmptyRules(10);

	div1.appendChild(clearButton);
	div1.appendChild(cleanupButton);
	div1.appendChild(runButton);
	div1.appendChild(exportButton);
	div1.appendChild(importButton);
	div1.appendChild(plusOneButton);
	div1.appendChild(plusTenButton);

	const div2 = document.createElement('div');
	const speedLabel = document.createElement('label');
	speedLabel.className = 'az-input-button';
	speedLabel.setAttribute('color', 'purple');
	speedLabel.textContent = 'Delay between steps ';
	const speedInput = document.createElement('input');
	speedInput.type = 'range';
	speedInput.id = 'speed';
	speedInput.min = '0';
	speedInput.max = '500';
	speedInput.value = '200';
	speedInput.onchange = () => { AZ.timeout = speedInput.value; };
	speedLabel.appendChild(speedInput);

	const columnsLabel = document.createElement('label');
	columnsLabel.className = 'az-input-button';
	columnsLabel.setAttribute('color', 'purple');
	columnsLabel.textContent = 'Columns ';
	const columnsInput = document.createElement('input');
	columnsInput.type = 'range';
	columnsInput.id = 'columns';
	columnsInput.min = '1';
	columnsInput.max = '8';
	columnsInput.value = '1';
	columnsInput.onchange = () => {
		nma_table.setAttribute('style', `-webkit-columns:${columnsInput.value};-moz-columns:${columnsInput.value};columns:${columnsInput.value};`);
	};
	columnsLabel.appendChild(columnsInput);

	div2.appendChild(speedLabel);
	div2.appendChild(columnsLabel);

	const lineDiv = document.createElement('div');
	lineDiv.id = 'line';
	lineDiv.setAttribute('translate', 'no');
	lineDiv.setAttribute('contenteditable', 'true');
	lineDiv.textContent = 'Hello, world!';

	header.appendChild(div1);
	header.appendChild(div2);
	header.appendChild(lineDiv);

	const main = document.createElement('main');
	const nmaTable = document.createElement('ol');
	nmaTable.id = 'nma_table';

	const popupForm = document.createElement('form');
	popupForm.id = 'popup_upload';
	popupForm.style.display = 'none';
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.onchange = () => uploadNMA(fileInput);
	const formDiv = document.createElement('div');
	formDiv.innerHTML = 'Drop files<br><br>or<br><br>Click here';
	popupForm.appendChild(fileInput);
	popupForm.appendChild(formDiv);

	main.appendChild(nmaTable);
	main.appendChild(popupForm);

	document.body.appendChild(header);
	document.body.appendChild(main);
})();

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

AZ.loop.run = async function () {
	updateRules()
	AZ.loop.value = true
	iterator = 0
	string = line.innerText.replaceAll(/\s/g, ' ')
	runable = check(rules, true)
	console.log('in')
	while (AZ.loop.value) {
		if (iterator >= runable.length) {
			AZ.loop.value = false
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
					AZ.loop.value = false
				}
				await new Promise(res => setTimeout(res, AZ.timeout))
			} else {
				iterator++
			}
		}
	}
	AZ.loop.value = false
	AZ.loop.change_view()
	console.log('out')
}

function updateRules(arr, clear = false) {
	AZ.loop.value = false
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
	if (filename) AZ.downloadTextAsFile(filename + '.json', JSON.stringify({ line: string, rules: check(rules, true) }))
}

function importNMA() {
	AZ.switchDisplay(popup_upload, 'grid')
}

function uploadNMA(el) {
	AZ.onFileUploaded(el, (t) => {
		let json = JSON.parse(t)
		line.innerText = json.line
		updateRules(json.rules)
	}, (e) => {
	})
	AZ.switchDisplay(popup_upload, 'grid')
}

// Используем
updateRules()
addEmptyRules(5)

AZ.loop.change_view(false)