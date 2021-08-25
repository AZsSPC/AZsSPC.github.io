let f_d = document.getElementById('f_d');
let f_r = document.getElementById('f_r');
let f_b = document.getElementById('f_b');

console.log("2")

function find(included_char){
    let arr = (f_d.textContent || f_d.innerText).split(/\n+/);
    f_r.innerHTML = '';
    for(let i = 0; i < arr.length; i++) if(arr[i].includes(included_char)){
        let innerMJ = arr[i].split(/==+/, 2);
        let m_c = document.createElement('span');
        m_c.className = 'm_c';
        m_c.setAttribute('onclick', 'switchViewMode(this)');
        let m_h = document.createElement('span');
        m_h.className = 'm_h';
        m_h.innerHTML = '$$' + innerMJ[0] + '$$';
        let m_f = document.createElement('span');
        m_f.className = 'm_f';
        m_f.innerHTML = '$$' + innerMJ[1] + '$$';
        m_c.append(m_h);
        m_c.append(m_f);
        f_r.append(m_c);
    }
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    f_r.hidden = false;
}

function switchViewMode(el){
    el.className = (el.className === 'm_c' ?'m_cb' :'m_c');
}

function reload_data(url = 'https://azsspc.github.io/projects/FormulaZ/physic.faz'){
    f_r.hidden = true;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function (){
        if(xhr.readyState !== 4) return;
        let ret_data = (xhr.responseText).split(/\n*azdatasplit\n*/);
        f_d.innerHTML = ret_data[0];
        let buttons = ret_data[1].split(/\n+/);
        f_b.innerHTML = '';
        for(let i = 0; i < buttons.length; i++){
            if(buttons[i].length < 3) continue;
            let bd = buttons[i].split(/==+/);
            let button = document.createElement('button');
            button.innerHTML = bd[0];
            button.setAttribute('onclick', 'find(\'' + bd[1] + '\')');
            f_b.append(button);
            f_b.append(' ');
        }
    }
}

reload_data('https://azsspc.github.io/projects/FormulaZ/physic.faz');