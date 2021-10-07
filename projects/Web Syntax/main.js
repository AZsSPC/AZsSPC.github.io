/** Edit Panes's */ let ep, epf, csf, epb_reformat, epb_download, epb_syntax, sssb;

const AZR_NB = '[^\\s<>\\[\\]{}();:|\\\\/]', AZR_B = '[\\s<>\\[\\]{}();:|\\\\/]';
let syntax = {color: [], reform: []};
let user_syntax = [];
const basic_syntax = {color: [{p: ".+", r: "red"}], reform: []};
const syntax_list = ['JS', 'TASM'];

/** initialization all edit_pane's for future */
function initEP(){
    setSyntax(syntax_list[0]);
    ep = document.getElementById('ep');
    epf = document.getElementById('epf');
    csf = document.getElementById('csf');
    epb_reformat = document.getElementById('edit_pane_refresh');
    epb_download = document.getElementById('edit_pane_download');
    epb_syntax = document.getElementById('edit_pane_syntax');
    sssb = document.getElementById('sssb');

    csf.innerHTML = '';
    for(let i in syntax_list) csf.innerHTML += '<button onclick="setSyntax(\'' + syntax_list[i] + '\'); csf.style.display = \'none\'">' + syntax_list[i] + '</button>';
    ep.setAttribute('oninput', 'onEPI(); epb_reformat.setAttribute("changed","true")');
    epb_reformat.setAttribute('onclick', 'reformat()');
    epb_download.setAttribute('onclick', 'downloadThis()');
    epb_syntax.setAttribute('onclick', 'csf.style.display = \'block\'');

//runOnKeys(function () {console.log('pressed')}, "KeyQ", "ControlLeft");
    runOnKeys(function (){ reformat();}, "AltLeft", "ShiftLeft", "KeyF");
    runOnKeys(function (){ downloadThis();}, "ControlLeft", "KeyD");

    onEPI(document.getElementById(epb_reformat.getAttribute('for')));
}

/** on [Edit Pane Input] detected */
function onEPI(){
    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '<li>' + ep.innerText + '</li>';
    let text = ep.innerHTML.replaceAll(/<\/li>\s*/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    for(let i in syntax.color) text = text.replaceAll(syntax.color[i].p, '<span class="' + syntax.color[i].r + '">$&</span>');
    //user_syntax.forEach(function (a){text = text.replaceAll(a.p, a.replace)});
    epf.innerHTML = ('<li>' + text.replaceAll(/\n/gm, '</li><li>') + '</li>').substr(9);
}

/** reformat */
function reformat(){
    console.log('refresh');

    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '<li>' + ep.innerText + '</li>';
    let text = ep.innerHTML.replaceAll(/<\/li>\s*/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    syntax.reform.forEach(function (a){text = text.replaceAll(a.p, a.r)});
    ep.innerHTML = ('<li>' + text.replaceAll(/\n/gm, '</li><li>') + '</li>').substr(9);

    onEPI();
    epb_reformat.setAttribute("changed", "false")
}

function downloadThis(){
    let filename = prompt("What do you want to name the file?");
    if(filename) createNDownload(filename, ep.innerText);
}

function setSyntax(syntax_name){
    let rf = new XMLHttpRequest();
    rf.open("GET", 'https://raw.githubusercontent.com/AZsSPC/AZsSPC.github.io/main/projects/Web%20Syntax/syntax/json/' + syntax_name + '.json');
    rf.onreadystatechange = function (){
        let text = (rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ?rf.responseText :null;
        syntax = text ?JSON.parse(text) :basic_syntax;
        for(let i in syntax.color) syntax.color[i].p = new RegExp(syntax.color[i].p, syntax.color[i].f ?? 'gmi');
        for(let i in syntax.reform) syntax.reform[i].p = new RegExp(syntax.reform[i].p, syntax.reform[i].f ?? 'gmi');
        sssb.href = 'syntax/css/' + syntax_name + '.css';
        onEPI();
    }
    rf.send();
}

initEP();
