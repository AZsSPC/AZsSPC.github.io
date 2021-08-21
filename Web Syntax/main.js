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
    console.log(ep.innerHTML)
    if (ep.innerHTML.indexOf('<li>') !== 0) ep.innerHTML = '</li><li>' + ep.innerText;
    ep.innerHTML = ('<li>' + ep.innerHTML.replaceAll(/<li>/gim, '\n').replaceAll(/<.+?>/gim, '')
            .replaceAll(/\bfasdg\b/gim, '<span class="blue">$&</span>')
            .replaceAll(/\basd\b/gim, '<span class="red">$&</span>')
            .replaceAll(/\b(\w)*?b(\w)*?\b/gim, '<span class="green">$&</span>')
            .replaceAll(/\n/gim, '</li><li>')
        + '</li>').substr(9);
    console.log(ep.innerHTML)
}

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
