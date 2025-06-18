(function () {
	const header = document.createElement('header');
	const fieldset = document.createElement('fieldset');

	const fromLabel = document.createElement('label');
	fromLabel.setAttribute('for', 'from');
	fromLabel.textContent = 'From: ';

	const fromSelect = document.createElement('select');
	fromSelect.id = 'from';
	fromSelect.onchange = () => set_tm(fromSelect.value, toSelect.value);
	['en', 'ru', 'fr'].forEach(lang => {
		const option = document.createElement('option');
		option.value = lang;
		option.textContent = lang;
		if (lang === 'en') option.selected = true;
		fromSelect.appendChild(option);
	});

	const toLabel = document.createElement('label');
	toLabel.setAttribute('for', 'to');
	toLabel.textContent = 'To: ';

	const toSelect = document.createElement('select');
	toSelect.id = 'to';
	toSelect.onchange = () => set_tm(fromSelect.value, toSelect.value);
	['en', 'ru', 'fr'].forEach(lang => {
		const option = document.createElement('option');
		option.value = lang;
		option.textContent = lang;
		if (lang === 'ru') option.selected = true;
		toSelect.appendChild(option);
	});

	const copyButton = document.createElement('button');
	copyButton.className = 'az-button';
	copyButton.id = 'copy';
	copyButton.textContent = 'copy translated';

	fieldset.appendChild(fromLabel);
	fieldset.appendChild(fromSelect);
	fieldset.appendChild(toLabel);
	fieldset.appendChild(toSelect);
	fieldset.appendChild(copyButton);
	header.appendChild(fieldset);

	const main = document.createElement('main');

	const inputLabel = document.createElement('label');
	inputLabel.setAttribute('for', 'text-in');
	const textIn = document.createElement('textarea');
	textIn.id = 'text-in';
	textIn.oninput = () => ttt(textIn.value);
	inputLabel.appendChild(textIn);

	const arrows = document.createElement('span');
	arrows.id = 'arrows';
	arrows.className = 'unselectable';
	arrows.textContent = '↓ ↓ ↓';

	const outputLabel = document.createElement('label');
	outputLabel.setAttribute('for', 'text-out');
	const textOut = document.createElement('span');
	textOut.id = 'text-out';
	outputLabel.appendChild(textOut);

	main.appendChild(inputLabel);
	main.appendChild(arrows);
	main.appendChild(outputLabel);

	document.body.appendChild(header);
	document.body.appendChild(main);
})();

let et = document.getElementById('text-in'),
	eo = document.getElementById('text-out'),
	cb = document.getElementById('copy'),
	sf = document.getElementById('from'),
	st = document.getElementById('to'),
	translate_map,
	allowed = ['en', 'ru', 'fr']

cb.addEventListener('click', () => AZ.copyToClipboard(eo.innerText))

function get_layout(from) {
	let ret = undefined
	let rf = new XMLHttpRequest()
	rf.open('GET', 'langs/' + from + '.json', false)
	rf.onreadystatechange = () => ret = ((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ? rf.responseText : null)
	rf.send()
	for (let i = 0; ret === undefined && i < 10; i++) setTimeout(() => console.log(i), 100)
	return JSON.parse(ret)
}

function set_tm(from_u = 'en', to_u = 'ru') {
	translate_map = []
	const from = get_layout(from_u)
	const to = get_layout(to_u)
	for (const [iso, [a, b]] of Object.entries(from)) {
		translate_map[a] = to[iso][0]
		translate_map[b] = to[iso][1]
	}
	ttt(et.value)
}

function ttt(text) {
	let translated = ''
	for (const s of text)
		translated += translate_map[s] ?? s
	eo.innerText = translated
}

function setsel() {
	let f = ''
	for (const l of allowed)
		f += '<option value="' + l + '">' + l + '</option>'
	sf.innerHTML = f
	st.innerHTML = f
	document.querySelector('#from :nth-child(1)').setAttribute('selected', '')
	document.querySelector('#to :nth-child(2)').setAttribute('selected', '')
}

setsel()
set_tm()