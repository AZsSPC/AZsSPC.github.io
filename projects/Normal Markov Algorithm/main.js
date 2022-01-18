let rules,
    abc,
    steps,
    Q = 0,
    width = 0,
    height = 0,
    timeout = 100,
    cell = 0,
    string = '',
    loop = true;
const
    TERMINATION = '!',
    STEP = '?',
    SPACE = ' ',
    ES = '',
    nullES = [ES, ES, ES, ES],
    popup_upload = document.getElementById('popup_upload'),
    line = document.getElementById('line'),
    nma_table = document.getElementById('nma_table');

function updateRules(arr) {
    for (let i = 0; i < 10; i++) {
        nma_table.innerHTML += '<li><span>asd</span> -> <span>asd1</span></li>';
    }
}

