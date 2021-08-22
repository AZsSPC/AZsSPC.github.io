function onTextFromCloudLoaded(file, func){
    let rf = new XMLHttpRequest();
    rf.open("GET", file, false);
    rf.onreadystatechange = func((rf.readyState === 4 && (rf.status === 200 || rf.status == null)) ?rf.responseText :'');
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
    document.addEventListener('keyup', function (event){pressed.delete(event.code)});
}