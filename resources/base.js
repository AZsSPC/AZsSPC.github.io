const AZ = {
	loop: {
		value: false, timeout: 200,
		run: async function () {
			console.log('run is not implemented');
		},
		change_view: function (b = AZ.loop.value) {
			let btn = document.querySelector('.az-run-button')
			if (b) {
				btn.innerText = '||'
				btn.setAttribute('color', 'red')
			} else {
				btn.innerText = '|>'
				btn.setAttribute('color', 'blue')
			}
		},
		click: function (old_state = AZ.loop.value) {
			AZ.loop.value = old_state
			if (AZ.loop.value) {
				AZ.loop.value = false
				AZ.loop.change_view()
				return
			}

			console.info('RUN started')
			AZ.loop.value = true
			AZ.loop.change_view()
			AZ.loop.run().then(() => {
				AZ.loop.value = false
				console.info('RUN stopped')
				AZ.loop.change_view()
			})
		}
	},
	locale: {
		localization: (new URLSearchParams(location.search).get("lang") || navigator.language || navigator.userLanguage).split('-')[0],
		languages: {
			ru: { nav: { main: 'главная', readme: 'детали', source: 'код', author: 'об авторе', projects: 'проекты' } },
			ua: { nav: { main: 'головна', readme: 'деталі', source: 'код', author: 'автор', projects: 'проєкти' } },
			en: { nav: { main: 'main', readme: 'readme', source: 'source', author: 'author', projects: 'projects' } }
		},
		get: str => {
			const keys = str.split('.');
			return (
				keys.reduce((obj, key) => obj?.[key], AZ.locale.languages[AZ.locale.localization])
				|| (AZ.locale.localization !== 'en' && keys.reduce((obj, key) => obj?.[key], AZ.locale.languages.en))
				|| str
			);
		}
	},
	getReplaceHref: async function (regex = /^.+(github.io)/, replace = 'https://github.com/azsspc/azsspc.github.io/blob/main') {
		return location.href.replace(regex, replace);
	},
	on_text_from_cloud_loaded: function (file, func) {
		let rf = new XMLHttpRequest()
		rf.open('GET', file, false)
		rf.onreadystatechange = func((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ? rf.responseText : null)
		rf.send()
	},
	onKeysAction: function (func, ...codes) {
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
	},
	useMathJax: function () {
		MathJax.Hub.Queue(['Typeset', MathJax.Hub])
	},
	switchDisplay: function (element, v) {
		element.style.display = (element.style.display === v ? 'none' : v)
	},
	copyToClipboard: function (text) {
		navigator.clipboard.writeText(text).then(function () {
			console.log(`Async: Copying to clipboard was successful! [${text}]`)
		}, function (err) {
			console.error('Async: Could not copy text: ', err)
		})
	},
	downloadTextAsFile: function (filename = 'AZsSPC.file', text = 'Hello World!') {
		let element = document.createElement('a')
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
		element.setAttribute('download', filename)
		console.log(filename)
		element.style.display = 'none'
		document.body.appendChild(element)
		element.click()
		document.body.removeChild(element)
	},
	onFileUploaded: function (el, funcDone, funcError) {
		let file = el.files[0] ?? null
		if (file) {
			let reader = new FileReader()
			reader.readAsText(file, 'UTF-8')
			reader.onload = (e) => funcDone(e.target.result)
			reader.onerror = (e) => funcError(e)
		}
	},
	setCookie: function (name, value, options = {}) {
		options = { path: '/', ...options }
		if (options.expires instanceof Date) options.expires = options.expires.toUTCString()
		let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
		for (let optionKey in options) {
			updatedCookie += '; ' + optionKey
			if (options[optionKey] !== true)
				updatedCookie += '=' + options[optionKey]
		}
		document.cookie = updatedCookie
	},
	getCookie: function (name) {
		let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'))
		return matches ? decodeURIComponent(matches[1]) : undefined
	},
	deleteCookie: function (name) {
		AZ.setCookie(name, '', { 'max-age': -1 })
	},
	takeshot: function (element, func) {
		html2canvas(element).then((canvas) => func(canvas))
	},
	downloadShot: function (element, filename) {
		html2canvas(element).then((c) => {
			let link = document.createElement('a')
			link.setAttribute('download', filename + '.png')
			link.setAttribute('href', c.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
			link.click()
		})
	},
	page: function (link) {
		window.location.href = link
	},
	reformatAZ: function () {
		document.getElementsByTagName('main')[0].innerHTML = document.getElementsByTagName('main')[0].innerHTML.replaceAll('#AZsSPC',
			'<span title="" translate="no">AZsSPC</span>')
			.replace('#projects', '<a href="https://azsspc.github.io/projects">projects</a>')
	}
};

function display_nav() {
	const nav = document.createElement('nav');

	// Create the checkbox and label
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = 'navhider';
	checkbox.hidden = true;

	const label = document.createElement('label');
	label.id = 'hsl';
	label.htmlFor = 'navhider';
	label.textContent = '|||';
	label.addEventListener('click', function () {
		AZ.setCookie('NAVH', document.getElementById('navhider').checked)
	});

	// Top navigation
	const topDiv = document.createElement('div');
	topDiv.id = 'az-nav-subfield-top';

	topDiv.innerHTML = `
    <a class="az-link-button" color="red" href="/">${AZ.locale.get('nav.main')}</a>
    <a class="az-link-button" color="green" id="az-link-button-readme" href="${AZ.getReplaceHref()}/README.md">${AZ.locale.get('nav.readme')}</a>
    <a class="az-link-button" color="blue" id="az-link-button-source" href="${AZ.getReplaceHref()}">${AZ.locale.get('nav.source')}</a>
  `;

	// Bottom navigation
	const bottomDiv = document.createElement('div');
	bottomDiv.id = 'az-nav-subfield-list';

	bottomDiv.innerHTML = `
    <a class="az-link-button" color="gold" href="/contacts/">${AZ.locale.get('nav.author')}</a>
    <a class="az-link-button" color="green" href="/projects/">${AZ.locale.get('nav.projects')}</a>
  `;

	// Assemble the nav
	nav.appendChild(checkbox);
	nav.appendChild(label);
	nav.appendChild(topDiv);
	nav.appendChild(bottomDiv);

	// Add to body
	document.body.appendChild(nav);
}

display_nav();
/*

${includes.html2canvas ? '<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>' : ''}
${includes.MathJax ? '<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>' : ''}
 */