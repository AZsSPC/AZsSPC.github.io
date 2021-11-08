let ep, epf, popup_upload, epb_reformat, epb_download, epb_upload, sssb;

let file_name = '';
let syntax = {
	"color":[
		{p:/"[^\n]+?"|'[^\n]+?'/gm, r:"string"},
		{p:/;[^\n"']*$/gm, r:"comment"},
		{p:/\[[^\n':]+]/gmi, r:"case"},
		{p:/\b[a-f0-9]+h\b|[\[\]+-]/gmi, r:"magenta"},
		{p:/\be?[abcd][xhls]\b/gmi, r:"blue"},
		{p:/(?<=^[ \t]{0,9})(\w+(?=:|[ \t]+(PROC|ENDP))|ret\b)/gmi, r:"void"},
		{p:/\.(stack|data|code|exit|model)|,|:|\./gm, r:"orange"},
		{p:/\b(main|end)\b|\.startup\b/gm, r:"main"},
		{p:/\b\d+\b/gm, r:"blue"},
		{p:/\b\w+(?=\s+d[bwdqt]\b)|\bd[bwdqt]\b|\b[bs]p\b/gmi, r:"yellow"},
		{p:/^[ \t]*\b(AAA|AAD|AAM|AAS|ADC|ADD|AND|CALL|NEAR|NEAR|FAR|FAR|CBW|CLC|CLD|CLI|CMC|CMP|CMPS|CWD|DAA|DAS|DEC|DIV|ESC|OPCODE|HTL|IDIV|IMUL|IN|ADX|INC|INT|INT|INT|JA|JAE|JB|JBE|JC|JCXZ|JE|JG|JGE|JL|JLE|JMP|SHORT|NEAR|FAR|FAR|JNA|JNAE|JNB|JNC|JNE|JNG|JNGE|JNL|JNLE|JNO|JNP|JNS|JNZ|JO|JP|JPE|JPO|JS|JZ|LAHF|LDS|LEA|LES|LODS|LOOP|MOV|MOVS|MUL|NEG|NOP|OR|OUT|DX|POP|POPF|PUSH|PUSHF|RCL|CL|RCR|CL|ROL|CL|ROR|CL|SAHF|SAL|CL|SAR|CL|SBB|SCAS|SHL|CL|SHR|CL|STC|STD|STI|STOS|SUB|TEST|WAIT|XCHGAX|AX|XLAT|XOR)\b/gmi, r:"func"}
	], "reform":[
		{p:/\n\s*(?=\b\w+:)/gmi, r:"\n\n"},
		{p:/^[ \t]*(?=\b(AAA|AAD|AAM|AAS|ADC|ADD|AND|CALL|NEAR|NEAR|FAR|FAR|CBW|CLC|CLD|CLI|CMC|CMP|CMPS|CWD|DAA|DAS|DEC|DIV|ESC|OPCODE|HTL|IDIV|IMUL|IN|ADX|INC|INT|INT|INT|JA|JAE|JB|JBE|JC|JCXZ|JE|JG|JGE|JL|JLE|JMP|SHORT|NEAR|FAR|FAR|JNA|JNAE|JNB|JNC|JNE|JNG|JNGE|JNL|JNLE|JNO|JNP|JNS|JNZ|JO|JP|JPE|JPO|JS|JZ|LAHF|LDS|LEA|LES|LODS|LOOP|MOV|MOVS|MUL|NEG|NOP|OR|OUT|DX|POP|POPF|PUSH|PUSHF|RCL|CL|RCR|CL|ROL|CL|ROR|CL|SAHF|SAL|CL|SAR|CL|SBB|SCAS|SHL|CL|SHR|CL|STC|STD|STI|STOS|SUB|TEST|WAIT|XCHGAX|AX|XLAT|XOR)\b)/gmi, r:"\t"},
		{p:/(?<=^[ \t]{0,9}\b(AAA|AAD|AAM|AAS|ADC|ADD|AND|CALL|NEAR|NEAR|FAR|FAR|CBW|CLC|CLD|CLI|CMC|CMP|CMPS|CWD|DAA|DAS|DEC|DIV|ESC|OPCODE|HTL|IDIV|IMUL|IN|ADX|INC|INT|INT|INT|JA|JAE|JB|JBE|JC|JCXZ|JE|JG|JGE|JL|JLE|JMP|SHORT|NEAR|FAR|FAR|JNA|JNAE|JNB|JNC|JNE|JNG|JNGE|JNL|JNLE|JNO|JNP|JNS|JNZ|JO|JP|JPE|JPO|JS|JZ|LAHF|LDS|LEA|LES|LODS|LOOP|MOV|MOVS|MUL|NEG|NOP|OR|OUT|DX|POP|POPF|PUSH|PUSHF|RCL|CL|RCR|CL|ROL|CL|ROR|CL|SAHF|SAL|CL|SAR|CL|SBB|SCAS|SHL|CL|SHR|CL|STC|STD|STI|STOS|SUB|TEST|WAIT|XCHGAX|AX|XLAT|XOR)\b)[ \t]*/gmi, r:"\t"},
		{p:/(?<=^[ \t]{0,9}\b(AAA|AAD|AAM|AAS|ADC|ADD|AND|CALL|NEAR|NEAR|FAR|FAR|CBW|CLC|CLD|CLI|CMC|CMP|CMPS|CWD|DAA|DAS|DEC|DIV|ESC|OPCODE|HTL|IDIV|IMUL|IN|ADX|INC|INT|INT|INT|JA|JAE|JB|JBE|JC|JCXZ|JE|JG|JGE|JL|JLE|JMP|SHORT|NEAR|FAR|FAR|JNA|JNAE|JNB|JNC|JNE|JNG|JNGE|JNL|JNLE|JNO|JNP|JNS|JNZ|JO|JP|JPE|JPO|JS|JZ|LAHF|LDS|LEA|LES|LODS|LOOP|MOV|MOVS|MUL|NEG|NOP|OR|OUT|DX|POP|POPF|PUSH|PUSHF|RCL|CL|RCR|CL|ROL|CL|ROR|CL|SAHF|SAL|CL|SAR|CL|SBB|SCAS|SHL|CL|SHR|CL|STC|STD|STI|STOS|SUB|TEST|WAIT|XCHGAX|AX|XLAT|XOR)\b[ \t]{0,9}.{0,99},)[ \t]*/gmi, r:""}
	]
};

/** initialization all edit_pane's for future */
function initEP(){
	ep = document.getElementById('ep');
	epf = document.getElementById('epf');
	popup_upload = document.getElementById('popup_upload');
	epb_reformat = document.getElementById('edit_pane_refresh');
	epb_download = document.getElementById('edit_pane_download');
	epb_upload = document.getElementById('edit_pane_upload');
	sssb = document.getElementById('sssb');

	ep.setAttribute('oninput', 'onEPI(); epb_reformat.setAttribute("changed","true")');
	epb_reformat.setAttribute('onclick', 'reformat()');
	epb_download.setAttribute('onclick', 'downloadThis()');
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

function fileUploaded(el){
	let file = el.files[0] ?? null;
	console.log(file);
	if(file){
		let reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function(evt){
			popup_upload.style.display = 'none';
			ep.innerHTML = evt.target.result;
			onEPI();
			file_name = file.name;
		}
		reader.onerror = function(evt){
			ep.innerText = 'error while read file';
			onEPI();
		}
	}
}

function switchVisible(el, v){ el.style.display = (el.style.display === v ?'none' :v) }

initEP();
