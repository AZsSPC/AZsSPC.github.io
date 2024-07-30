let a = document.getElementById('a')
let t = document.getElementById('text')
const regex = /'([^']|\\')*?(?<!\\)(\\\\)*'|"([^"]|\\"'")*?(?<!\\)(\\\\)*"|\w+|\/([^\/]|\\\/)+?(?<!\\)(\\\\)*\/[gim]*|\/\/.*(?=\n)|[!=\/\-+*<>]=|&&|=>|\|\||[=\-+\/\\,.(){}\[\]:?!&|;@\n]/g
const COMMAND = {
	log: 'log',
	ask: 'ask'
}

function load_new_script(script = 'alert("empty script")') {
	a.innerHTML = ''
	let i = document.createElement('iframe')
	i.src = 'data:text/html,' + encodeURIComponent('<script>' + script + '</script>')
	a.append(i)
}

let flags = {
	dbl: 0, // (
	fbl: 0, // {
	rbl: 0, // [
	inline_func: false,
	previous: false,
	previous_type: false
}
const TYPE = {
	string: 'str',
	number: 'num',
	function: 'fun',
	variable: 'var'
}

function parse_azlang(azcode) {
	let jscode = ''
	let azarr = azcode.match(regex)

	function update(v, t = false) {
		if (t) {
			flags.previous_type = t
		} else if (v.match(/^[a-z]/i)) {
			flags.previous_type = TYPE.string
		} else if (v.match(/^\d+(\.\d+)?$/)) {
			flags.previous_type = TYPE.number
		} else {
			flags.previous_type = TYPE.variable
		}

		flags.previous = v
	}

	function parse_piece(i) {
		let piece = azarr[i]
		switch (piece) {
			case 'switch':
			case 'if':
				flags.inline_func = true
				flags.dbl++
				update(piece, TYPE.function)
				return piece + '('
			case 'log':
				flags.inline_func = true
				flags.dbl++
				update(piece, TYPE.function)
				return 'console.log('
			case 'ask':
				flags.inline_func = true
				flags.dbl++
				update(piece, TYPE.function)
				return 'prompt('
			case 'say':
				flags.inline_func = true
				flags.dbl++
				update(piece, TYPE.function)
				return 'alert('
			//case 'echo': return 'alert'
			case 'init':
				update(piece, TYPE.function)
				return 'let '
			case '{':
				if (flags.inline_func) {
					flags.inline_func = false
					update(piece)
					return '){\n'
				}
				update(piece, TYPE.function)
				return '{\n'
			case '}':
				update(piece, TYPE.function)
				return '\n}\n\n'
			case '(':
				flags.dbl++
				update(piece, TYPE.function)
				return '{\n'
			case ')':
				flags.dbl > 0 ? flags.dbl-- : flags.dbl++
				update(piece, TYPE.function)
				return '\n}\n\n'
			case ';':
				update(piece, TYPE.function)
				return '\nbreak;'
			case '\n':
				if (flags.inline_func) {
					flags.inline_func = false
					update(piece)
					return ')\n'
				}
				update(piece, TYPE.function)
				return '\n'
			default:
				let prev = flags.previous_type


				if ((prev === TYPE.variable || prev === TYPE.string) && (!piece.match(/^[a-z]/i) || !piece.match(/^\d+(\.\d+)?$/))) {
					update(piece)
					return '+' + piece
				}
				update(piece)
				return piece

			case 'case':
			case 'else':
			case 'default':
				update(piece, TYPE.function)
				return piece
		}
	}

	for (let i in azarr) jscode += parse_piece(i)

	console.log(azcode)
	console.log(jscode)
	return jscode
}

t.addEventListener('keydown', function (e) {
	e.preventDefault()
})