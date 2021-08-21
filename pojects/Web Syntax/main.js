/** Edit Panes's */ let eps, epb;

/** initialization all edit_pane's for future */
function initEP() {
    eps = document.getElementsByClassName('edit_pane');
    epb = document.getElementsByClassName('edit_pane_refresh');
    for (let i = 0; i < epb.length; i++) {
        epb[i].setAttribute('onclick', 'onEPI(document.getElementById(this.getAttribute("for"))); this.setAttribute("changed","false")');
        document.getElementById(epb[i].getAttribute('for')).setAttribute('oninput', 'epb[' + i + '].setAttribute("changed","true")');
        onEPI(document.getElementById(epb[i].getAttribute('for')));
    }
}

/** on [Edit Pane Input] detected */
function onEPI(ep) {
    if (ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    ep.innerHTML = ('<li>' + ep.innerHTML.replaceAll(/<li>/gm, '\n').replaceAll(/<.+?>/gm, '')
            .replaceAll(/\bfasdg\b/gm, '<span class="blue">$&</span>')
            .replaceAll(/\basd\b/gm, '<span class="red">$&</span>')
            //.replaceAll(/\b(\w)*?b(\w)*?\b/gm, '<span class="green">$&</span>')
            .replaceAll(/\n/gm, '</li><li>')
        + '</li>').substr(9);
}

function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function (event) {
        pressed.add(event.code);
        //console.log(pressed)
        for (let code of codes) if (!pressed.has(code)) return;
        pressed.clear();
        func();
    });

    document.addEventListener('keyup', function (event) {
        pressed.delete(event.code);
    });

}

//runOnKeys(function () { console.log('pressed')}, "KeyQ", "ControlLeft");
runOnKeys(function () {
    console.log('refresh')
    for (let i = 0; i < eps.length; i++) onEPI(eps[i])
    for (let i = 0; i < epb.length; i++) epb[i].setAttribute("changed", "false");
}, "AltLeft", "ShiftLeft", "KeyF");

initEP();
