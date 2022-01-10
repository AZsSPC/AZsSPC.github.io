let rules,
	abc,
	abcRegExp,
	steps,
	q_dis,
	Q          = 0,
	width      = 0,
	height     = 0,
	timeout    = 100,
	cell       = 0,
	string     = [],
	buf_string = [],
	loop       = true;
const
	terminated   = 't!',
	step         = 's!',
	SPACE        = ' ',
	ES           = '',
	nullES       = [ES, ES, ES, ES],
	popup_upload = document.getElementById('popup_upload'),
	alphabet     = document.getElementById('alphabet'),
	line         = document.getElementById('line'),
	q_count      = document.getElementById('q_count'),
	turing_table = document.getElementById('turing_table');

function updateRules(arr){
	rules = [];
	if(!arr){
		for(let w = 0; w < width; w++){
			rules[w] = {};
			for(let h = 0; h < height; h++){
				let el = document.getElementById('me_i' + w + '_j' + abc.charAt(h));
				rules[w][abc.charAt(h)] = el == null ?ES :el.innerText;
			}
		}
		setABC(alphabet.value);
	}
	else{
		rules = arr;
		q_count.value = arr.length;
	}
	width = q_count.value;
	height = abc.length;
	let mt = ES;
	turing_table.innerHTML = ES;
	for(let h = -1; h < height; h++){
		mt += '<tr>';
		for(let w = -1; w < width; w++){
			if(h >= 0 && w >= 0) mt += '<td contenteditable="true" id="me_i' + w + '_j' + abc.charAt(h) + '" >' + transcriptRule(w, abc.charAt(h),
				this)[0] + '</td>';
			else if(w < 0 && h < 0) mt += '<td id="q_display"></td>';
			else if(h < 0) mt += '<td>q' + w + '</td>';
			else mt += '<td>' + abc.charAt(h) + '</td>';
		}
		mt += '</tr>';
	}
	turing_table.innerHTML = mt;
	q_dis = document.getElementById('q_display');
}

function setABC(t){
	abc = [...new Set(' ' + t.replaceAll(/\s/g, ''))].sort().join('');
	alphabet.value = abc;
	abcRegExp = new RegExp('([' + abc + ']?)([<>.!])(\\d*)');
}

function setRule(q, c){
	rules[q][c] = transcriptRule(q, c)[0];
	document.getElementById('me_i' + q + '_j' + c).innerText = transcriptRule(q, c)[0];
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
	while(machineStep() !== terminated && loop) await new Promise(res => setTimeout(res, timeout));
	loop = false;

	refreshString();
	drawLine();
	refreshString();
	console.log('end');
}

function transcriptRule(q, c){
	if(!rules[q] || !rules[q][c]) return [c + '.' + q, c + '', '.', q];

	let r = abcRegExp.exec(rules[q][c]) ?? nullES;
	if(r === nullES){
		markTermination(q, c);
		return [rules[q][c], c + '', '!', q];
	}

	if(r[1] === ES) r[1] = c + '';
	if(r[2] === ES) r[2] = '.';
	if(r[3] === ES || parseInt('0' + r[3]) >= width) r[3] = q;
	r[0] = r[1] + r[2] + r[3];
	return r;
}

function markTermination(q, c){setTimeout(() => document.getElementById('me_i' + q + '_j' + c).setAttribute('terminated', ''), 0)}

function markQuery(q, c){
	setTimeout(() => {
		document.querySelectorAll('[query]').forEach((e) => e.removeAttribute('query'));
		document.getElementById('me_i' + q + '_j' + c).setAttribute('query', '');
	}, 0)
}

function machineStep(){
	steps++;
	let c = string[cell] ?? SPACE;
	let r = transcriptRule(Q, c);
	putSymbol(cell, r[1]);
	cell += r[2] === '<' ?-1 :r[2] === '>' ?1 :0;
	Q = parseInt(0 + r[3]);
	q_dis.innerText = 'Q:' + Q;
	markQuery(Q, c);
	drawLine();
	return r[2] === '!' ?terminated :step;
}

function putSymbol(id, symbol){
	if(abc.includes(symbol) && symbol !== SPACE) string[id] = symbol;
	else delete string[id];
	drawLine();
}

function putSymbolGUI(el){
	let symbol = (el.innerText + SPACE).substr(0, 1);
	el.innerText = symbol;
	putSymbol(el.getAttribute('c'), symbol);
}

function drawLine(){
	line.innerHTML = '<span class="move_q" onclick="cell--;drawLine()">\<-</span>';
	let cof = document.body.clientWidth > 600 ?9 :4;
	for(let c = cell - cof; c < cell + cof + 1; c++) line.innerHTML += //
		'<span oninput="putSymbolGUI(this)" c="' + c + '"' + (c === cell ?' sel' :ES) + ' contenteditable="true">' + (string[c] ?? ES) + '</span>';
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

function exportTM(){
	updateRules();
	let filename = prompt("Name this file?");
	if(filename) createNDownload(filename + '.json', JSON.stringify({
		abc:abc,
		rules:rules
	}));
}

function importTM(){
	switchDisplay(popup_upload, 'grid');
}

function uploadTM(el){
	fileUploaded(el, (t) => {
		let json = JSON.parse(t);
		setABC(json.abc);
		updateRules(json.rules);
	}, (e) => {});
	switchDisplay(popup_upload, 'grid');
}

updateRules();
drawLine();
