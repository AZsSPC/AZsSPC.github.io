import 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
import {math} from 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/6.6.4/math.js'

const et_in = document.getElementById('in'),
	et_out = document.getElementById('text-out')

function compile() {
	let sentences = et_in.value.replaceAll(/[\t ]|^\n+|\n+$|"[^\n"]+"/gm, '').split(/\n+/g)
	let answers = math.evaluate(et_in.value).entries
	let out = ''
	for (let i in sentences) {
		let sentence = sentences[i],
			answer = answers[i],
			last_form = sentence.match(/(?<==)[^=]+$/gm) + '',
			variable = sentence.match(/^[a-zA-Z]+(_(\([a-zA-Z0-9\-]+\)|[a-zA-Z0-9]))?(?==)/) + '',
			is_ended = !!last_form.match(/^[0-9i]+$/gm)
		if (variable) out += '<li>\\(' + sentence + (is_ended ? '' : '=' + answer) + '\\)</li>'
	}
	et_out.innerHTML = out
	useMathJax()
}

/*
 x=2
 y=3
 z=x+y
 */