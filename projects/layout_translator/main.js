let et = document.getElementById('text-in'),
	eo = document.getElementById('text-out'),
	cb = document.getElementById('copy'),
	sf = document.getElementById('from'),
	st = document.getElementById('to'),
	translate_map,
	allowed = ['en', 'ru', 'fr']

cb.addEventListener('click', () => copy_to_clipboard(eo.innerText))

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