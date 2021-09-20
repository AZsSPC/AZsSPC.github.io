/** Edit Panes's */ let ep, epf, epb_reformat, epb_download;

const AZR_NB = '[^\\s<>\\[\\]{}();:|\\\\/]', AZR_B = '[\\s<>\\[\\]{}();:|\\\\/]';
const synt_g = [
    {
        p: '(?<=\\bfunction) +[a-zA-Z0-9_]*?(?=\\()',
        r: 'magenta'
    },
    {
        p: '\\b[a-zA-Z0-9_]+?(?=\\()',
        r: 'yellow'
    },
    {
        p: '\\basd\\b',
        r: 'blue'
    },
    {
        p: '##const',
        r: 'orange'
    },
    {
        p: '(?<!class=)"(?!>).+?(?<!class=)"(?!>)|\'.+?\'',
        r: 'string'
    },
    {
        p: '//.*$|/\\*.*\\*/',
        r: 'comment'
    }
];
const synt_r = [
    {
        p: '^\\s*(?=let)',
        r: '    '
    }
];
const irer = [
    {
        p: '##const',
        r: '\\bthis\\b|\\bnew\\b|\\bconst\\b|\\blet\\b|\\bfunction\\b'
    }
];
let user_syntax = [];

/** initialization all edit_pane's for future */
function initEP(){
    for(let i in synt_g){
        let text = synt_g[i].p;
        for(let j in irer) text = text.replaceAll(irer[j].p, irer[j].r);
        synt_g[i].p = new RegExp(text, 'gm');
    }
    for(let i in synt_r){
        let text = synt_r[i].p;
        for(let j in irer) text = text.replaceAll(irer[j].p, irer[j].r);
        synt_r[i].p = new RegExp(text, 'gm');
    }
    ep = document.getElementById('ep');
    epf = document.getElementById('epf');
    epb_reformat = document.getElementById('edit_pane_refresh');
    epb_download = document.getElementById('edit_pane_download');

    ep.setAttribute('oninput', 'onEPI(); epb_reformat.setAttribute("changed","true")');
    epb_reformat.setAttribute('onclick', 'reformat()');
    epb_download.setAttribute('onclick', 'downloadThis()');
    onEPI(document.getElementById(epb_reformat.getAttribute('for')));
}

/** on [Edit Pane Input] detected */
function onEPI(){
    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    let text = ep.innerHTML.replaceAll(/<li>/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    synt_g.forEach(function (a){text = text.replaceAll(a.p, '<span class="' + a.r + '">$&</span>')});
    //user_syntax.forEach(function (a){text = text.replaceAll(a.p, a.replace)});
    epf.innerHTML = ('<li>' + text.replaceAll(/\n/gm, '</li><li>') + '</li>').substr(9);
}

/** reformat */
function reformat(){
    console.log('refresh');

    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    let text = ep.innerHTML.replaceAll(/<li>/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    synt_r.forEach(function (a){text = text.replaceAll(a.p, a.r)});
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

initEP();