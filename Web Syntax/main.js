/** Edit Panes's */ let eps, epb;

/** initialization all edit_pane's for future */
function initEP() {
    eps = document.getElementsByClassName('edit_pane');
    epb = document.getElementsByClassName('edit_pane_refresher');
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
           // .replaceAll(/\b(\w)*?b(\w)*?\b/gm, '<span class="green">$&</span>')
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
    console.log('pressed')
    for (let i = 0; i < eps.length; i++) onEPI(eps[i])
}, "AltLeft", "ShiftLeft", "KeyF");
/*
function saveRangePosition(ep) {
    let range = window.getSelection().getRangeAt(0);
    let sC = range.startContainer;

    let A = [];
    while (sC !== ep) {
        A.push(getNodeIndex(sC));
        sC = sC.parentNode
    }
    console.log(A)
        return {"sC": A, "sO": range.startOffset};
}

function restoreRangePosition(ep, rp) {
    ep.focus();
    let sel = window.getSelection(), range = sel.getRangeAt(0);
    let sC = ep, C = rp.sC, x = C.length;
    while (x--) sC = sC.childNodes[C[x]];
    console.log(rp)
    range.setStart(sC, rp.sO);
    range.setEnd(sC, rp.sO);
    sel.removeAllRanges();
    sel.addRange(range)
}

function getNodeIndex(n) {
    let i = 0;
    while (n = n.previousSibling) i++;
    return i
}
*/
initEP();
