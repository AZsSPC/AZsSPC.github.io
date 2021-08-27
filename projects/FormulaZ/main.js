let f_formulas = document.getElementById('f_r');
let f_buttons = document.getElementById('f_b');
let DATA;
let rel_url = 'https://azsspc.github.io/projects/FormulaZ/physic.faz';

function find(included_char){
    f_formulas.innerHTML = '';
    for(let i in DATA.formulas) if(DATA.formulas[i].code.includes(included_char) || included_char === '*'){
        let formula = DATA.formulas[i];
        let m_c = document.createElement('span');
        m_c.className = 'm_c';
        m_c.setAttribute('onclick', 'switchViewMode(this)');
        let m_h = document.createElement('span');
        m_h.className = 'm_h';
        m_h.innerHTML = '$$' + formula.code + '$$';
        let m_f = document.createElement('span');
        m_f.className = 'm_f';
        m_f.innerHTML = formula.lore;
        m_c.append(m_h);
        m_c.append(m_f);
        f_formulas.append(m_c);
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    f_formulas.hidden = false;
}

function switchViewMode(el){
    el.className = (el.className === 'm_c' ?'m_cb' :'m_c');
}

function reload_data(url = rel_url){
    rel_url = url;
    f_formulas.hidden = true;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function (){
        if(xhr.readyState !== 4) return;
        console.log(xhr.responseText)
        DATA = JSON.parse(xhr.responseText);
        f_buttons.innerHTML = '';

        for(let i =0;i<20;i++){
            let button = document.createElement('button');
            button.innerHTML = DATA.buttons[0].name;
            button.setAttribute('onclick', 'find(\'' + DATA.buttons[0].pattern + '\')');
            f_buttons.append(button);
            f_buttons.append(' ');
        }/*
        for(let i in DATA.buttons){
            let button = document.createElement('button');
            button.innerHTML = DATA.buttons[i].name;
            button.setAttribute('onclick', 'find(\'' + DATA.buttons[i].pattern + '\')');
            f_buttons.append(button);
            f_buttons.append(' ');
        }*/
        find('*')
    }
}

reload_data('https://azsspc.github.io/projects/FormulaZ/sets/physic.json');