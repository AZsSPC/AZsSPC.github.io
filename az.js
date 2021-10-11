//can not be used
function onTextFromCloudLoaded(file, func){
    let rf = new XMLHttpRequest();
    rf.open("GET", file, false);
    rf.onreadystatechange = func((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ?rf.responseText :null);
    rf.send();
}

function runOnKeys(func, ...codes){
    let pressed = new Set();
    document.addEventListener('keydown', function (event){
        pressed.add(event.code);
        for(let code of codes) if(!pressed.has(code)) return;
        pressed.clear();
        func();
    });
    document.addEventListener('keyup', function (event){
        pressed.delete(event.code)
    });
}

function reformatAZ(){
    document.getElementsByTagName('main')[0].innerHTML =
        document.getElementsByTagName('main')[0].innerHTML
        .replaceAll('#AZsSPC', '<span title="" translate="no">AZsSPC</span>')
        .replace('#projects', '<a href="https://azsspc.github.io/projects">projects</a>')
    ;
}

function header(){
    document.write(
        '<input type="checkbox" id="navhider" hidden ' + (document.cookie.includes('NAVH') ?'checked' :'') + '>\n' +
        '<header>\n' +
        '<img id="icon" src="https://azsspc.github.io/img/icon.png" onclick="window.location.href=\'https://azsspc.github.io\'"/>\n' +
        '<nav>\n' +
        '<button onclick="window.location.href=\'' + (window.location.href.replace(/^.+(github.io)/, 'https://github.com/azsspc/azsspc.github.io/blob/main')) + '\'" class="b-btn">&lt;/&gt;</button>\n' +
        '<button onclick="window.location.href=\'https://azsspc.github.io/projects\'" class="m-btn">projects</button>\n' +
        '<button onclick="window.location.href=\'https://azsspc.github.io/contacts\'">@</button>\n' +
        /*'<button onclick="window.location.href=\'https://azsspc.github.io/info\'" translate="no">i</button>\n' +*/
        '</nav>\n' +
        '<label id="hsl" for="navhider" onclick="navhider()"></label>\n' +
        '</header>\n'
    );
}

function settings(){
    document.write(
        '<meta charset="utf-8">\n' +
        '<meta name="viewport" content="width=device-width,initial-scale=1"/>\n' +
        '<link rel="icon" href="https://azsspc.github.io/img/fic.png">\n' +
        '<link rel="stylesheet" href="https://azsspc.github.io/main.css">\n' +
        '<link rel="stylesheet" href="main.css">\n'
    );
}

function createNDownload(filename = 'AZsSPC.file', text = 'Hello World!'){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function navhider(){
    let nh = document.getElementById('navhider');
    console.log(nh);
    document.cookie = nh.checked ?'NAVH' :'';
}
