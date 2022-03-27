let tables = {
    test1: {
        name: 'Test 1',
        comment: '',
        scores: {
            money: {name: 'money', min: 0, max: 999, val: 50, col: 'gold'},
            xp: {name: 'xp', min: 0, max: 999, val: 1, col: 'magenta'}
        }
    },
    test2: {
        name: 'Test 2',
        comment: '',
        scores: {
            money: {name: 'Coins', min: 0, max: 999, val: 500, col: 'gold'},
            xp: {name: 'XP', min: 0, max: 999, val: 13, col: 'magenta'},
            mana: {name: 'Mana pul', min: 0, max: 99, val: 63, col: 'aqua'},
        }
    }
}

let tables_display = document.getElementById('tables'),
    constructor = document.getElementById('constructor')

constructor.addEventListener("submit", (event) => {
    event.preventDefault();
    window.history.back();
}, true);

function draw() {
    let str_b = ''
    for (let t_id of Object.keys(tables)) {
        let t = tables[t_id]
        let comment = ''
        str_b += '<table class="group" id="' + t_id + '"><caption>' +
            '<button class="r-btn" onclick="delete_table(\'' + t_id + '\')">del</button>' + t.name +
            '<button class="g-btn" onclick="new_score(\'' + t_id + '\')">add</button>' + '</caption>'
        for (let s_id of Object.keys(t.scores)) {
            let s = t.scores[s_id]
            comment += '[' + s.name + ':' + s_id + '] '
            str_b +=
                '<tr title="' + t_id + '" class="numintr"' + (s.col ? (' style="--borc:' + s.col + '"') : '') + '>' +
                '<td><label for="' + t_id + '-' + s_id + '">&nbsp;' + s.name + '&nbsp;' +
                '<button class="r-btn" onclick="delete_score(\'' + t_id + '\',\'' + s_id + '\')">-</button></label></td>' +
                '<td class="inp_num">' +
                '<label for="' + t_id + '-' + s_id + '" ' +
                'max="' + s.max + '" min="' + s.min + '" val="' + s.val + '">' +
                '<input onchange="tables.' + t_id + '.scores.' + s_id + '.val=((this.value*100)|0)/100" ' +
                'type="number" id="' + t_id + '-' + s_id + '" max="' + s.max + '" min="' + s.min + '" value="' + s.val + '">' +
                '</label></td></tr>'
        }
        str_b += '<tr class="cetr"><td colspan="2" contenteditable="PLAINTEXT-ONLY" ' +
            'oninput="tables.' + t_id + '.comment=this.innerText" afterc="' + comment + '">' + t.comment + '</td></tr></table>'
        //n.oninput = () => n.parentElement.setAttribute('value', n.value)
    }
    tables_display.innerHTML = str_b
}

function delete_table(t_name, conf = confirm('Delete table [' + t_name + ']?')) {
    if (conf) {
        delete tables[t_name]
        draw()
    }
}

function delete_score(t_name, s_name, conf = confirm('Delete score [' + s_name + ']?')) {
    if (conf) {
        delete tables[t_name].scores[s_name]
        draw()
    }
}

function new_score(t_name, name = prompt('Name the score')) {
    if (name) {
        let id = prompt('Give id to [' + name + ']\n\nallowed: [a-zA-Z_]')
        if (id) {
            let min = prompt('Min int value') | 0
            let max = prompt('Max int value') | 0
            let val = prompt('Current int value') | 0
            tables[t_name].scores[id] = {name: name, min: min, max: max, val: val, col: 'green'}
            draw()
        }
    }
}

function new_table(name = prompt('Name the table')) {
    if (name) {
        tables[name] = {name: name, comment: '', scores: {}}
        draw()
    }
}

function new_score_template() {
    constructor.innerHTML =
        '<input type="text" id="c_name" name="c_name" oninput="nextElementSibling.value=value" pattern=".+" placeholder="name">' +
        '<input type="text" id="c_id" name="" pattern="[a-z_]+" title="required a-z and _" placeholder="id">' +
        '<label for="c_min">&nbsp;Min:</label><input type="number" id="c_min" name="c_min" value="0">' +
        '<label for="c_max">&nbsp;Max:</label><input type="number" id="c_max" name="c_max" value="100">' +
        '<label for="c_val">&nbsp;Value:</label><input type="number" id="c_val" name="c_val" value="0">' +
        '<label for="c_c">color<input type="color" id="c_c" name="c_c" oninput="parentNode.style.background=value"></label>' +
        '<button onclick="create_score_template()">save score template</button>'
    constructor.style.display = 'grid'
}

function create_score_template() {
    constructor.style.display = 'none'
}

draw()