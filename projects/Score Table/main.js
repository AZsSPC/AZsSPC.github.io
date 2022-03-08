let tables = {
    test1: {
        name: 'Test 1',
        scores: {
            money: {name: 'money', min: 0, max: 999, val: 50, col: 'gold'},
            xp: {name: 'xp', min: 0, max: 999, val: 1, col: 'magenta'}
        }
    },
    test2: {
        name: 'Test 2',
        scores: {
            money: {name: 'Coins', min: 0, max: 999, val: 500, col: 'gold'},
            xp: {name: 'XP', min: 0, max: 999, val: 13, col: 'magenta'},
            mana: {name: 'Mana pul', min: 0, max: 99, val: 63, col: 'aqua'}
        }
    }
}

let main = document.querySelector('main')
let str_b = ''
for (let t_id of Object.keys(tables)) {
    let t = tables[t_id]
    str_b += '<table class="group" id="' + t_id + '">' +
        '<caption>' + t.name + '</caption>'
    for (let a_id of Object.keys(t.scores)) {
        let a = t.scores[a_id]
        str_b +=
            '<tr><td><label for="' + t_id + '-' + a_id + '">' + a.name + '</label></td>' +
            '<td class="inp_num">' +
            '<label style="border-color:' + a.col + '" for="' + t_id + '-' + a_id + '" max="' + a.max + '" min="' + a.min + '" val="' + a.val + '">' +
            '<input type="number" id="' + t_id + '-' + a_id + '" max="' + a.max + '" min="' + a.min + '" value="' + a.val + '">' +
            '</label></td></tr>'
    }
    str_b += '</table>'
    //n.oninput = () => n.parentElement.setAttribute('value', n.value)
}
main.innerHTML = str_b