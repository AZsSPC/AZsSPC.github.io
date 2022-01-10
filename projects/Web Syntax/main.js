let ep, epf, popup_syntax, popup_upload, epb_reformat, epb_download, epb_syntax, epb_upload, sssb;

let file_name = '';
//let user_elements = [];
let syntax = {color:[], reform:[]};
//let user_syntax = {color:[], reform:[]};
const basic_syntax = {color:[{p:".+", r:"red", f:"gmi"}], reform:[]};
const syntax_list = ['JS', 'TASM'];

/** initialization all edit_pane's for future */
function initEP(){
	setSyntax(syntax_list[0]);
	ep = document.getElementById('ep');
	epf = document.getElementById('epf');
	popup_syntax = document.getElementById('popup_syntax');
	popup_upload = document.getElementById('popup_upload');
	epb_reformat = document.getElementById('edit_pane_refresh');
	epb_download = document.getElementById('edit_pane_download');
	epb_upload = document.getElementById('edit_pane_upload');
	epb_syntax = document.getElementById('edit_pane_syntax');
	sssb = document.getElementById('sssb');

	popup_syntax.innerHTML = '';
	for(let i in syntax_list) popup_syntax.innerHTML += '<button onclick="setSyntax(\'' + syntax_list[i] + '\'); popup_syntax.style.display = \'none\'">' + syntax_list[i] + '</button>';
	ep.setAttribute('oninput', 'onEPI(); epb_reformat.setAttribute("changed","true")');
	epb_reformat.setAttribute('onclick', 'reformat()');
	epb_download.setAttribute('onclick', 'downloadThis()');
	epb_syntax.setAttribute('onclick', 'switchVisible(popup_syntax,\'block\')');
	epb_upload.setAttribute('onclick', 'switchVisible(popup_upload,\'grid\')');

//runOnKeys(function () {console.log('pressed')}, "KeyQ", "ControlLeft");
	runOnKeys(function(){ reformat();}, "AltLeft", "ShiftLeft", "KeyF");
	runOnKeys(function(){ downloadThis();}, "ControlLeft", "KeyD");

	onEPI();
}

/** on [Edit Pane Input] detected */
function onEPI(){
	let text = ep.innerText;
	for(let i in syntax.color) text = text.replaceAll(syntax.color[i].p, '<span class="' + syntax.color[i].r + '">$&</span>');
	//for(let i in user_syntax.color) text = text.replaceAll(user_syntax.color[i].p, '<span class="' + user_syntax.color[i].r + '">$&</span>');
	epf.innerHTML = ('<li>' + text.replaceAll(/\n|&#10;/g, ' &nbsp;</li><li>') + ' &nbsp;</li>');
	console.log('light');
}

/** reformat */
function reformat(){
	//user_syntax = {color:[], reform:[]};
	let text = ep.innerText;
	//initUserElement(text);
	//for(let i in syntax.userel) user_syntax;
	syntax.reform.forEach(function(a){ text = text.replaceAll(a.p, a.r) });
	//ep.innerHTML = ('<li>' + text.replaceAll(/\n|&#10;/g, '</li><li>') + '</li>');
	ep.innerHTML = text;
	epb_reformat.setAttribute("changed", "false");
	console.log('refresh');
	onEPI();
}

function downloadThis(){
	let filename = prompt("What do you want to name the file?", file_name);
	if(filename) createNDownload(filename, ep.innerText);
}

/*
 function initUserElement(text){
 user_elements = [];
 for(let i in syntax.userel) user_elements.append({p:text.match(syntax.userel[i].p), r:syntax.userel[i].r});
 }
 */

function setSyntax(syntax_name){
	let rf = new XMLHttpRequest();
	rf.open("GET", 'https://raw.githubusercontent.com/AZsSPC/AZsSPC.github.io/main/projects/Web%20Syntax/syntax/' + syntax_name + '/s.json');
	rf.onreadystatechange = function(){
		let text = (rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ?rf.responseText :null;
		syntax = text ?JSON.parse(text) :basic_syntax;
		for(let i in syntax.color) syntax.color[i].p = new RegExp(syntax.color[i].p, syntax.color[i].f ?? 'gm');
		for(let i in syntax.reform) syntax.reform[i].p = new RegExp(syntax.reform[i].p, syntax.reform[i].f ?? 'gm');
		//for(let i in syntax.userel) syntax.userel[i].p = new RegExp(syntax.userel[i].p, syntax.userel[i].f ?? 'gm');
		sssb.href = 'syntax/' + syntax_name + '/s.css';
		onEPI();
	}
	rf.send();
}

function fileUploaded(el){
	let file = el.files[0] ?? null;
	console.log(file);
	if(file){
		let reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function(evt){
			popup_upload.style.display = 'none';
			ep.innerHTML =  evt.target.result;
			onEPI();
			file_name = file.name;
		}
		reader.onerror = function(evt){
			ep.innerText = 'error while read file';
			onEPI();
		}
	}
}

initEP();
