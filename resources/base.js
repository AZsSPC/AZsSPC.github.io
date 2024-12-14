function $AZ() {
	this.loop = false
	this.timeout = 200
}

$AZ.prototype.run = async function () {
	console.log('run is not override')
}

$AZ.prototype.get_replace_href = function (regex = /^.+(github.io)/, replace = 'https://github.com/azsspc/azsspc.github.io/blob/main') {
	return window.location.href.replace(regex, replace)
}

const AZ = new $AZ()

function loop_change_view(b = AZ.loop) {
	let btn = document.querySelector('[is=az-run-button]')
	if (b) {
		btn.innerText = '||'
		btn.setAttribute('color', 'red')
	} else {
		btn.innerText = '|>'
		btn.setAttribute('color', 'blue')
	}
}

function loop_click(old_state = AZ.loop) {
	AZ.loop = old_state
	if (AZ.loop) {
		AZ.loop = false
		loop_change_view()
	} else {
		AZ.loop = true
		loop_change_view()
		console.info('RUN started')
		AZ.run().then(() => {
			AZ.loop = false
			console.info('RUN stopped')
			loop_change_view()
		})
	}
}

//can not be used
function on_text_from_cloud_loaded(file, func) {
	let rf = new XMLHttpRequest()
	rf.open('GET', file, false)
	rf.onreadystatechange = func((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ? rf.responseText : null)
	rf.send()
}

function on_keys_action(func, ...codes) {
	let pressed = new Set()
	document.addEventListener('keydown', function (event) {
		pressed.add(event.code)
		for (let code of codes) if (!pressed.has(code)) return
		pressed.clear()
		func()
	})
	document.addEventListener('keyup', function (event) {
		pressed.delete(event.code)
	})
}

function reformatAZ() {
	document.getElementsByTagName('main')[0].innerHTML = document.getElementsByTagName('main')[0].innerHTML.replaceAll('#AZsSPC',
		'<span title="" translate="no">AZsSPC</span>')
		.replace('#projects', '<a href="https://azsspc.github.io/projects">projects</a>')
}

function nav() {//&lt;/&gt;
	document.write(`<nav>
<input type="checkbox" id="navhider" hidden/>
<label id="hsl" for="navhider" onclick="navhider()">|||</label> 
<div id="az-nav-subfield-top">
	<a is="az-link-button" color="red" href="/">main</a>
	<a is="az-link-button" color="green" id="az-link-button-readme" href="${AZ.get_replace_href()}/README.md">readme</a>
	<a is="az-link-button" color="blue" id="az-link-button-source"	href="${AZ.get_replace_href()}">source</a>
</div>

<div id="az-nav-subfield-list">
 <a is="az-link-button" color="gold" href="/contacts/">author</a>
 <a is="az-link-button" color="green" href="/projects/">projects</a>
</div>
</nav>
`)
}

function copy_to_clipboard(text) {
	navigator.clipboard.writeText(text).then(function () {
		console.log(`Async: Copying to clipboard was successful! [${text}]`)
	}, function (err) {
		console.error('Async: Could not copy text: ', err)
	})
}

/*
 function header() {
 document.write('<input type="checkbox" id="navhider" hidden ' + (getCookie('NAVH') ? 'checked' : '') + ' onchange="navhider()">'
 + '<header>' + '<img id="icon" src="https://azsspc.github.io/img/icon.png" onclick="window.location.href=\'https://azsspc.github.io\'"/>'
 + '<input type="checkbox" id="nav-burger-cb" hidden><label for="nav-burger-cb" id="nav-burger-labe">===</label> '
 + '<nav>'
 + ' <a href="' + (window.location.href.replace(/^.+(github.io)/, 'https://github.com/azsspc/azsspc.github.io/blob/main')) + '/README.md" class="b-btn not_a_text">?</a>'
 + ' <a href="' + (window.location.href.replace(/^.+(github.io)/, 'https://github.com/azsspc/azsspc.github.io/blob/main')) + '" class="b-btn not_a_text">&lt;/&gt;</a>'
 + ' <a href="https://azsspc.github.io/projects" class="m-btn not_a_text">projects</a>'
 + ' <a href="https://azsspc.github.io/contacts" class="not_a_text">@_</a>'
 + '</nav>'
 + '<label id="hsl" for="navhider"></label>'
 + '</header> ');
 }*/

function settings(settings = {}) {
	document.write(`
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="icon" href="/resources/img/fic.png">
<link rel="stylesheet" href="/resources/css/main.css">
<link rel="stylesheet" href="main.css">
${settings.html2canvas ? '<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>' : ''}
${settings.MathJax ? '<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>' : ''}
`,
	)
}

function create_file_and_download(filename = 'AZsSPC.file', text = 'Hello World!') {
	let element = document.createElement('a')
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
	element.setAttribute('download', filename)
	console.log(filename)
	element.style.display = 'none'
	document.body.appendChild(element)
	element.click()
	document.body.removeChild(element)
}

function on_file_uploaded(el, funcDone, funcError) {
	let file = el.files[0] ?? null
	if (file) {
		let reader = new FileReader()
		reader.readAsText(file, 'UTF-8')
		reader.onload = (e) => funcDone(e.target.result)
		reader.onerror = (e) => funcError(e)
	}
}

//Cookie - https://learn.javascript.ru/cookie
function navhider() {
	setCookie('NAVH', document.getElementById('navhider').checked)
}

function setCookie(name, value, options = {}) {
	options = {path: '/', ...options}
	if (options.expires instanceof Date) options.expires = options.expires.toUTCString()
	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey
		if (options[optionKey] !== true) updatedCookie += '=' + options[optionKey]
	}
	document.cookie = updatedCookie
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'))
	return matches ? decodeURIComponent(matches[1]) : undefined
}

function deleteCookie(name) {
	setCookie(name, '', {'max-age': -1})
}

function useMathJax() {
	MathJax.Hub.Queue(['Typeset', MathJax.Hub])
}

function switchDisplay(element, v) {
	element.style.display = (element.style.display === v ? 'none' : v)
}

function takeshot(element, func) {
	html2canvas(element).then((canvas) => func(canvas))
}

function takeshot_and_download(element, filename) {
	html2canvas(element).then((c) => {
		let link = document.createElement('a')
		link.setAttribute('download', filename + '.png')
		link.setAttribute('href', c.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
		link.click()
	})
}

function page(link) {
	window.location.href = link
}