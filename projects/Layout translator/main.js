let et = document.getElementById("et"),
    eo = document.getElementById("out"),
    cb = document.getElementById("copy"),
    sf = document.getElementById("from"),
    st = document.getElementById("to"),
    translate_map,
    allowed = ['en', 'ru', 'fr'];

cb.addEventListener('click', function (event) {
    try {
        eo.focus();
        eo.select();
        console.log('Copying text command was ' + (document.execCommand('copy') ? 'successful' : 'unsuccessful'));
        et.focus();
    } catch (err) {
        console.log('Oops, unable to copy');
    }
});

function layout_parse(from, filename = null) {
    let basic = from.match(/(?<=<keyMap>).+?(?=<\/keyMap>)/gs)[0].split('\n');
    let shifted = from.match(/(?<=<keyMap modifiers="shift">).+?(?=<\/keyMap>)/gs)[0].split('\n');
    let reg_to = /(?<=to=").+?(?=")/gm;
    let charset = {}
    for (const i in basic) if (basic[i] !== '') {
        let a = basic[i].match(reg_to), b = shifted[i].match(reg_to)
        charset[basic[i].match(/(?<=iso=").+?(?=")/gm)[0]] = [a ? a[0] : null, b ? b[0] : null]
    }
    if (filename == null) filename = prompt("Name this file?");
    if (filename) createNDownload(filename + '.json', JSON.stringify(charset));
}

function get_layout(from) {
    let ret = undefined;
    let rf = new XMLHttpRequest();
    rf.open("GET", 'https://AZsSPC.github.io/projects/Layout%20translator/langs/qwerty/' + from + '.json', false);
    rf.onreadystatechange = () => ret = ((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ? rf.responseText : null);
    rf.send();
    for (let i = 0; ret == undefined && i < 10; i++) setTimeout(() => console.log(i), 100)
    return JSON.parse(ret)
}

function set_tm(from_u = 'en', to_u = 'fr') {
    translate_map = []
    const from = get_layout(from_u)
    const to = get_layout(to_u)
    for (const [iso, [a, b]] of Object.entries(from)) {
        translate_map[a] = to[iso][0]
        translate_map [b] = to[iso][1]
    }
    ttt(et.value)
}

function ttt(text) {
    let translated = ''
    for (const s of text)
        translated += translate_map[s]
    eo.innerHTML = translated;
}

function setsel() {
    let f = ''
    for (const l of allowed)
        f += '<option value="' + l + '">' + l + '</option>'
    sf.innerHTML = f
    st.innerHTML = f
    document.querySelector("#from :nth-child(1)").setAttribute('selected', '')
    document.querySelector("#to :nth-child(2)").setAttribute('selected', '')
}

setsel()
set_tm('en', 'ru')