/** Edit Panes's */ let ep, epf, epb_reformat, epb_download, epb_syntax;

const AZR_NB = '[^\\s<>\\[\\]{}();:|\\\\/]', AZR_B = '[\\s<>\\[\\]{}();:|\\\\/]';
let syntax = {color: [], reform: []};
let user_syntax = [];
const basic_syntax = {color: [{p: ".+", r: "red"}], reform: []};

/** initialization all edit_pane's for future */
function initEP(){
    setSyntax('TASM');
    ep = document.getElementById('ep');
    epf = document.getElementById('epf');
    epb_reformat = document.getElementById('edit_pane_refresh');
    epb_download = document.getElementById('edit_pane_download');
    epb_syntax = document.getElementById('edit_pane_syntax');

    ep.setAttribute('oninput', 'onEPI(); epb_reformat.setAttribute("changed","true")');
    epb_reformat.setAttribute('onclick', 'reformat()');
    epb_download.setAttribute('onclick', 'downloadThis()');
    epb_syntax.setAttribute('onclick', 'setSyntax("JS")');
    onEPI(document.getElementById(epb_reformat.getAttribute('for')));
}

/** on [Edit Pane Input] detected */
function onEPI(){
    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    let text = ep.innerHTML.replaceAll(/<li>/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    for(let i in syntax.color) text = text.replaceAll(syntax.color[i].p, '<span class="' + syntax.color[i].r + '">$&</span>');
    //user_syntax.forEach(function (a){text = text.replaceAll(a.p, a.replace)});
    epf.innerHTML = ('<li>' + text.replaceAll(/\n/gm, '</li><li>') + '</li>').substr(9);
}

/** reformat */
function reformat(){
    console.log('refresh');

    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    let text = ep.innerHTML.replaceAll(/<li>/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    syntax.reform.forEach(function (a){text = text.replaceAll(a.p, a.r)});
    ep.innerHTML = ('<li>' + text.replaceAll(/\n/gm, '</li><li>') + '</li>').substr(9);

    onEPI();
    epb_reformat.setAttribute("changed", "false")
}

//runOnKeys(function () {console.log('pressed')}, "KeyQ", "ControlLeft");
runOnKeys(function (){ reformat();}, "AltLeft", "ShiftLeft", "KeyF");
runOnKeys(function (){ downloadThis();}, "ControlLeft", "KeyD");

function downloadThis(){
    let filename = prompt("What do you want to name the file?");
    if(filename) createNDownload(filename, ep.innerText);
}

function setSyntax(syntax_name){
    let rf = new XMLHttpRequest();
    rf.open("GET", 'https://raw.githubusercontent.com/AZsSPC/AZsSPC.github.io/main/projects/Web%20Syntax/syntax/' + syntax_name + '.json', false);
    rf.onreadystatechange = function (){
        text = (rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ?rf.responseText :null;
        syntax = text ?JSON.parse(text) :basic_syntax;
        for(let i in syntax.color) syntax.color[i].p = new RegExp(syntax.color[i].p, 'gm');
        for(let i in syntax.reform) syntax.reform[i].p = new RegExp(syntax.reform[i].p, 'gm');
        console.log(syntax);
    }
    rf.send();
}

initEP();