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

let main = document.querySelector('main')

function draw() {
    let str_b = ''
    for (let t_id of Object.keys(tables)) {
        let t = tables[t_id]
        str_b += '<table class="group" id="' + t_id + '"><caption>' +
            '<button class="r-btn" onclick="delete_table(\'' + t_id + '\')">del</button>' + t.name +
            '<button class="g-btn" onclick="new_score(\'' + t_id + '\')">add</button>' + '</caption>'
        for (let s_id of Object.keys(t.scores)) {
            let s = t.scores[s_id]
            str_b +=
                '<tr title="' + t_id + '" class="numintr"' + (s.col ? (' style="--borc:' + s.col + '"') : '') + '>' +
                '<td><label for="' + t_id + '-' + s_id + '">' + s.name + '</label></td>' +
                '<td class="inp_num">' +
                '<label for="' + t_id + '-' + s_id + '" ' +
                'max="' + s.max + '" min="' + s.min + '" val="' + s.val + '">' +
                '<input onchange="tables.' + t_id + '.scores.' + s_id + '.val=((this.value*100)|0)/100" ' +
                'type="number" id="' + t_id + '-' + s_id + '" max="' + s.max + '" min="' + s.min + '" value="' + s.val + '">' +
                '</label></td></tr>'
        }
        str_b += '<tr class="cetr"><td colspan="2" contenteditable="PLAINTEXT-ONLY" oninput="tables.' + t_id + '.comment=this.innerText">' + t.comment + '</td></tr></table>'
        //n.oninput = () => n.parentElement.setAttribute('value', n.value)
    }
    main.innerHTML = str_b
}

function delete_table(t_name) {
    if (confirm('Delete table [' + t_name + ']?')) {
        delete tables[t_name]
        draw()
    }
}

function new_score(t_name) {
    let name = prompt('Name the score')
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

draw()