let rules,
	abc,
	steps,
	Q            = 0,
	width        = 0,
	height       = 0,
	cell         = 0,
	string       = [],
	buf_string   = [],
	terminated   = 't!',
	step         = 's!',
	loop         = true,
	alphabet     = document.getElementById('alphabet'),
	line         = document.getElementById('line'),
	q_count      = document.getElementById('q_count'),
	turing_table = document.getElementById('turing_table');

function updateRules(){
	rules = new Array(height);
	for(let w = 0; w < width; w++){
		rules[w] = new Array(width);
		for(let h = 0; h < height; h++){
			let el = document.getElementById('me_i' + w + '_j' + abc.charAt(h));
			rules[w][abc.charAt(h)] = el == null ?'' :el.innerText;
		}
	}
	abc = [...new Set(' ' + alphabet.value.replaceAll(/\s/gm, ''))].sort().join('');
	alphabet.value = abc;
	width = q_count.value;
	height = abc.length;
	let mt = '';
	turing_table.innerHTML = '';
	for(let h = -1; h < height; h++){
		mt += '<tr>';
		for(let w = -1; w < width; w++){
			if(h < 0 && w < 0){ mt += '<td style="opacity: 0"></td>'; }
			else if(h < 0){ mt += '<td>q' + w + '</td>'; }
			else if(w < 0){ mt += '<td>' + abc.charAt(h) + '</td>'; }
			else{ mt += '<td id="me_i' + w + '_j' + abc.charAt(h) + '" contenteditable="true">' + (rules[w] == null ?'' :rules[w][abc.charAt(h)] ?? '') + '</td>'; }
		}
		mt += '</tr>';
	}
	turing_table.innerHTML = mt;
}

async function runMachine(){
	console.log('start');
	refreshString();
	updateRules();
	console.log(string);
	console.log(rules);

	Q = 0;
	steps = 0;
	loop = true;
	while(machineStep() !== terminated && loop) await new Promise(res => setTimeout(res, 100));

	loop = false;

	refreshString();
	drawLine();
	refreshString();
	console.log('end');
}

function machineStep(){
	steps++;
	let c = string[cell] ?? ' ';
	let r = /(.?)([<>.])(\d*)/.exec(rules[Q][c]);
	if(r == null || r[0] === '.'){
		drawLine();
		return terminated;
	}
	if(r[1] !== '' && abc.includes(r[1])){ putSymbol(cell, r[1]); }
	cell += r[2] === '<' ?-1 :r[2] === '>' ?1 :0;
	if(r[3] !== '' && parseInt(0 + r[3]) <= width){ Q = parseInt(0 + r[3]); }

	drawLine();
	return step;
}

function putSymbol(id, symbol){
	if(abc.includes(symbol) && symbol !== ' '){ string[id] = symbol; }
	else{ delete string[id]; }
	drawLine();
}

function putSymbolGUI(el){
	let symbol = (el.innerText + ' ').substr(0, 1);
	el.innerText = symbol;
	putSymbol(el.getAttribute('c'), symbol);
}

function drawLine(){
	line.innerHTML = '<span class="move_q" onclick="cell--;drawLine()">\<-</span>';
	let cof = document.body.clientWidth > 600 ?9 :4;
	for(let c = cell - cof; c < cell + cof + 1; c++) line.innerHTML += //
		'<span oninput="putSymbolGUI(this)" c="' + c + '"' + (c === cell ?' sel' :'') + ' contenteditable="true">' + (string[c] ?? '') + '</span>';
	line.innerHTML += '<span class="move_q" onclick="cell++;drawLine()">-\></span>';
}

function refreshString(){
	let arr = [];
	for(let e in string) arr[e] = string[e];
	string = arr;
}

function clearString(){
	string = [];
	cell = 0;
	loop = false;
	Q = 0;
	drawLine();
}

function copyString(){
	buf_string = [...(string ?? [])];
}

function pasteString(){
	string = [...(buf_string ?? [])];
	cell = 0;
	loop = false;
	Q = 0;
	drawLine();
}

drawLine();
