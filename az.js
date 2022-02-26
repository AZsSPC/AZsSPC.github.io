let loop = true, timeout = 200;

function loop_change(b = loop) {
    let btn = document.getElementById('run_button');
    if (b) {
        btn.innerText = '|>';
        btn.className = 'b-btn';
    } else {
        btn.innerText = '||';
        btn.className = 'r-btn';
    }
}

function loop_click() {
    loop_change(loop);
    if (loop) loop = false;
    else run().then(r => console.log('stopped'));
}

//can not be used
function onTextFromCloudLoaded(file, func) {
    let rf = new XMLHttpRequest();
    rf.open("GET", file, false);
    rf.onreadystatechange = func((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ? rf.responseText : null);
    rf.send();
}

function runOnKeys(func, ...codes) {
    let pressed = new Set();
    document.addEventListener('keydown', function (event) {
        pressed.add(event.code);
        for (let code of codes) if (!pressed.has(code)) return;
        pressed.clear();
        func();
    });
    document.addEventListener('keyup', function (event) {
        pressed.delete(event.code)
    });
}

function reformatAZ() {
    document.getElementsByTagName('main')[0].innerHTML = document.getElementsByTagName('main')[0].innerHTML.replaceAll('#AZsSPC',
        '<span title="" translate="no">AZsSPC</span>')
        .replace('#projects', '<a href="https://azsspc.github.io/projects">projects</a>');
}

function header() {
    document.write(//&lt;/&gt;
        '<input type="checkbox" id="navhider" hidden>'
        + '<nav><fieldset id="nfs1">'
        + ' <a href="https://azsspc.github.io/contacts" class="g-btn not_a_text">author</a>'
        + ' <a id="nav-btn-readme" href="' + (window.location.href.replace(/^.+(github.io)/,
            'https://github.com/azsspc/azsspc.github.io/blob/main')) + '/README.md" class="b-btn not_a_text">readme</a>'
        + ' <a id="nav-btn-source" href="' + (window.location.href.replace(/^.+(github.io)/,
            'https://github.com/azsspc/azsspc.github.io/blob/main')) + '" class="b-btn not_a_text">source</a>'
        + '</fieldset><fieldset id="nfs2">'
        + ' <a href="https://azsspc.github.io/projects" class="m-btn not_a_text">projects</a>'
        + ' <a href="https://azsspc.github.io/projects" class="m-btn not_a_text">projects</a>'
        + ' <a href="https://azsspc.github.io/projects" class="m-btn not_a_text">projects</a>'
        + '</fieldset></nav>'
        + '<label id="hsl" for="navhider" onclick="navhider()">|||</label> ');
}

/*
function header() {
    document.write('<input type="checkbox" id="navhider" hidden ' + (getCookie('NAVH') ? 'checked' : '') + ' onchange="navhider()">'
        + '<header>' + '<img id="icon" src="https://azsspc.github.io/img/icon.png" onclick="window.location.href=\'https://azsspc.github.io\'"/>'
        + '<input type="checkbox" id="nav-burger-cb" hidden><label for="nav-burger-cb" id="nav-burger-labe">===</label> '
        + '<nav>'
        + ' <a href="' + (window.location.href.replace(/^.+(github.io)/, 'https://github.com/azsspc/azsspc.github.io/blob/main')) + '/README.md" class="b-btn not_a_text">?</a>'
        + ' <a href="' + (window.location.href.replace(/^.+(github.io)/, 'https://github.com/azsspc/azsspc.github.io/blob/main')) + '" class="b-btn not_a_text">&lt;/&gt;</a>'
        + ' <a href="https://azsspc.github.io/projects" class="m-btn not_a_text">projects</a>'
        + ' <a href="https://azsspc.github.io/contacts" class="not_a_text">@_</a>'
        + '</nav>'
        + '<label id="hsl" for="navhider"></label>'
        + '</header> ');
}*/

function settings() {
    document.write('<meta charset="utf-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
        + '<link rel="icon" href="https://azsspc.github.io/img/fic.png">'
        + '<link rel="stylesheet" href="https://azsspc.github.io/main.css">'
        + '<link rel="stylesheet" href="main.css">');
}

function createNDownload(filename = 'AZsSPC.file', text = 'Hello World!') {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    console.log(filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function fileUploaded(el, funcDone, funcError) {
    let file = el.files[0] ?? null;
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (e) => funcDone(e.target.result);
        reader.onerror = (e) => funcError(e);
    }
}

//Cookie - https://learn.javascript.ru/cookie
function navhider() {
    setCookie('NAVH', document.getElementById('navhider').checked)
}

function setCookie(name, value, options = {}) {
    options = {path: '/', ...options};
    if (options.expires instanceof Date) options.expires = options.expires.toUTCString();
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        if (options[optionKey] !== true) updatedCookie += "=" + options[optionKey];
    }
    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {'max-age': -1})
}

// <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
function useMathJax() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub])
}

function switchDisplay(el, v) {
    el.style.display = (el.style.display === v ? 'none' : v)
}

function takeshot(el, func) {
    html2canvas(el).then((canvas) => func(canvas))
}