let rules = [],
    steps,
    Q = 0,
    width = 0,
    height = 0,
    timeout = 100,
    string = '',
    loop = true, iterator = 0, run;
const
    TERMINATION = '->|',
    STEP = '-->',
    popup_upload = document.getElementById('popup_upload'),
    line = document.getElementById('line'),
    nma_table = document.getElementById('nma_table');

async function runNMA() {
    updateRules();
    loop = true;
    iterator = 0;
    string = line.innerText.replaceAll(/\s/g, ' ');
    run = check(rules, true);
    console.log('in')
    while (stepNMA() && loop) await new Promise(res => setTimeout(res, timeout));
    console.log('out')
}

function stepNMA() {
    if (iterator >= run.length) {
        return false;
    } else {
        let rule = run[iterator];
        let s = ' ' + string + ' ';
        if (s.includes(rule.from)) {
            console.log(iterator + 1)
            string = s.replace(rule.from, rule.to).replaceAll(/^\s+|\s+$/g, '');
            line.innerText = string;
            iterator = 0;
            if (rule.exit) return false;
        } else {
            iterator++;
        }
    }
    return true;
}

function updateRules(arr, clear = false) {
    if (!arr) {
        arr = [];
        nma_table.childNodes.forEach((a) => arr.push({
                exit: a.querySelector('.exit').innerText === TERMINATION,
                from: a.querySelector('.from').innerText.replaceAll(/\s/g, ' '),
                to: a.querySelector('.to').innerText.replaceAll(/\s/g, ' ')
            })
        )
    }

    rules = check(arr, clear);
    nma_table.innerHTML = '';
    for (const a of rules) addRule(a.from, a.exit, a.to);
}

function addEmptyRules(count = 1) {
    for (let i = 0; i < count; i++) addRule('', STEP, '');
}

function addRule(from, exit, to) {
    nma_table.innerHTML += '<li translate="no" draggable="true"><div>' +
        '<span class="from" contenteditable="true" onchange="updateRules()">' + from + '</span>' +
        '<span class="exit" onclick="switchExit(this)">' + exit + '</span>' +
        '<span class="to" contenteditable="true">' + to + '</span>' +
        '<span class="del" onclick="nma_table.removeChild(this.parentNode)">-</span>' +
        '</div></li>';
}

function switchExit(el) {
    let b = el.innerText !== TERMINATION;
    el.innerText = b ? TERMINATION : STEP;
    if (b) el.setAttribute('t', '');
    else el.removeAttribute('t');
}

function check(arr, clear = false) {
    let result = [];
    for (let s of arr) {
        let b = s.from !== '';
        for (let a of result) if (b && a.from === s.from) {
            b = false;
            break;
        }
        s.from = s.from.replaceAll(/\xA0/g, ' ');
        s.to = s.to.replaceAll(/\xA0/g, ' ');
        s.off = !b;
        if (!clear) result.push(s); else if (b) result.push(s);
    }
    return result;
}

(function makeRulesSortable() {
    let dragEl;

    function _onDragOver(evt) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        let t = evt.target;
        if (t && t !== dragEl && t.nodeName === 'LI') nma_table.insertBefore(dragEl, t.nextSibling || t);
    }

    function _onDragEnd(evt) {
        evt.preventDefault();
        dragEl.classList.remove('ghost');
        nma_table.removeEventListener('dragover', _onDragOver, false);
        nma_table.removeEventListener('dragend', _onDragEnd, false);
    }

    nma_table.addEventListener('dragstart', function (evt) {
        dragEl = evt.target;
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);
        nma_table.addEventListener('dragover', _onDragOver, false);
        nma_table.addEventListener('dragend', _onDragEnd, false);
        setTimeout(() => dragEl.classList.add('ghost'), 0);
    }, false);
})();

function exportNMA() {
    updateRules();
    let filename = prompt("Name this file?");
    if (filename) createNDownload(filename + '.json', JSON.stringify({line: string, rules: check(rules, true)}));
}

function importNMA() {
    switchDisplay(popup_upload, 'grid');
}

function uploadNMA(el) {
    fileUploaded(el, (t) => {
        let json = JSON.parse(t);
        line.innerText = json.line;
        updateRules(json.rules);
    }, (e) => {
    });
    switchDisplay(popup_upload, 'grid');
}

// Используем
updateRules();
addEmptyRules(15)