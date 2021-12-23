let rules, width = 0, height = 0, abc, quarry = 0, string = [];
let alphabet = document.getElementById('alphabet'), line = document.getElementById('line'), q_count = document.getElementById('q_count'), turing_table = document.getElementById('turing_table');

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
			if(h < 0 && w < 0) mt += '<td style="opacity: 0"></td>'; else if(h < 0) mt += '<td>q' + w + '</td>'; else if(w < 0) mt += '<td>' + abc.charAt(h) + '</td>';
			//
			else mt += '<td id="me_i' + w + '_j' + abc.charAt(h) + '" contenteditable="true">' + (rules[w] == null ?'' :rules[w][abc.charAt(h)] ?? '') + '</td>';
		}
		mt += '</tr>';
	}
	turing_table.innerHTML = mt;
}

function runMachine(){
	string[-3] = 'g'
	string[2] = 'W'
	drawLine();
}

function drawLine(){
	line.innerHTML = '';
	for(let q = quarry - 9; q < quarry + 10; q++) line.innerHTML += '<span q="' + q + '"' + (q === quarry ?' sel' :'') + ' contenteditable="true">' + ((string[q] ?? '') === '' ?'&nbsp;' :string[q]) + '</span>';
}