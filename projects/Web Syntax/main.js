/** Edit Panes's */ let eps, epb;
import '../../az';

const AZR_NB = '[^\\s<>\\[\\]{}();:|\\\\/]', AZR_B = '[\\s<>\\[\\]{}();:|\\\\/]';
const basic_syntax = [
    {
        'regex': new RegExp('\\basd\\b', 'gm'),
        'replace': '<span class="blue">$&</span>'
    },
    {
        'regex': new RegExp('\\bthis\\b', 'gm'),
        'replace': '<span class="orange">$&</span>'
    },
    {
        'regex': new RegExp('".+?"', 'gm'),
        'replace': '<span class="comment">$&</span>'
    }
];
let user_syntax = [];

/** initialization all edit_pane's for future */
function initEP(){
    eps = document.getElementsByClassName('edit_pane');
    epb = document.getElementsByClassName('edit_pane_refresh');
    for(let i = 0; i < epb.length; i++){
        epb[i].setAttribute('onclick', 'onEPI(document.getElementById(this.getAttribute("for"))); this.setAttribute("changed","false")');
        document.getElementById(epb[i].getAttribute('for')).setAttribute('oninput', 'epb[' + i + '].setAttribute("changed","true")');
        onEPI(document.getElementById(epb[i].getAttribute('for')));
    }
}

/** on [Edit Pane Input] detected */
function onEPI(ep){
    console.log('refresh');
    if(ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    let text = ep.innerHTML.replaceAll(/<li>/gm, '\n').replaceAll(/<.+?>/gm, '').replaceAll(/&nbsp;/gm, ' ');
    basic_syntax.forEach(function (a){text = text.replaceAll(a.regex, a.replace)});
    user_syntax.forEach(function (a){text = text.replaceAll(a.regex, a.replace)});
    ep.innerHTML = ('<li>' + text.replaceAll(/\n/gm, '</li><li>') + '</li>').substr(9);
}

//runOnKeys(function () {console.log('pressed')}, "KeyQ", "ControlLeft");
runOnKeys(function (){
    for(let i = 0; i < eps.length; i++) onEPI(eps[i]);
    for(let i = 0; i < epb.length; i++) epb[i].setAttribute("changed", "false");
}, "AltLeft", "ShiftLeft", "KeyF");

initEP();