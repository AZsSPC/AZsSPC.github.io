let ir_w = document.getElementById('ir_w');
let ir_h = document.getElementById('ir_h');
let canvas = document.getElementById('sphere');
let simg = document.getElementById('simg');
let sc = document.getElementById('sc').getContext('2d');
let ctx = canvas.getContext('2d');
let pw = 0, ph = 0;
ir_w.setAttribute('oninput', 'spt(0)');
ir_h.setAttribute('oninput', 'spt(1)');
let points = [{'x': 0, 'y': 125, 'z': 0}]
let p_m;
simg.setAttribute('crossOrigin', '');
sc.drawImage(simg, 0, 0, 144, 72);

draw();

function draw(){

    ctx.fillStyle = 'rgb(57,57,57)';
    ctx.fillRect(0, 300, 600, 5);
    ctx.fillRect(300, 0, 5, 600);
    /*
     ctx.fillStyle = 'rgb(200, 0, 0)';
     ctx.fillRect(10, 10, 50, 50);

     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
     ctx.fillRect(30, 30, 50, 50);
     console.log('asdasd')*/
}

function rotate(point, rW, rH){
    // rH -= 90;
    rW = rW * Math.PI / 180;
    rH = rH * Math.PI / 180;
    let x = point.x;
    let y = point.y;
    let z = point.z;
    let sa = Math.sin(rH);
    let ca = Math.cos(rH);
    let sb = Math.sin(rW);
    let cb = Math.cos(rW);
    return {
        'x': (x * ca + y * sa) * cb - z * sb,
        'y': y * ca - x * sa,
        'z': (x * ca + y * sa) * sb + z * cb
    };
}

function get_simg_pix(x, y, z){
    if(x < 0) x += 144;
    x = x % 144;
    if(y < 0) y += 72;
    y = y % 72;
    let data = sc.getImageData(x, y, 1, 1).data;
    let f = (z / 2 + 50) / 125;
    return {'r': data[0] * f, 'g': data[1] * f, 'b': data[2] * f};
}

//points[0] = rotate(points[0], 0, 0);

function spt(k){
    if(k === 0) pw = ir_w.value * 1; else ph = ir_h.value * 1;
    d();
}

function d(){
    for(let hd = 0; hd < 72; hd++) for(let wd = 0; wd < 72; wd++){
        p_m = rotate(points[0], wd * 2.5, hd * 2.5);
        let c = get_simg_pix(144 - wd + pw, 72 - hd + ph, p_m.z);
        ctx.fillStyle = 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', 1)';
        ctx.fillRect(p_m.x + 300 - 3, p_m.y + 300 - 3, 6, 6);
    }
}

d();
//setTimeout(sayHi, 1000, "Привет", "Джон");
/*
 setTimeout(function run(){
 d();
 pw += 5;
 setTimeout(run, 100);
 }, 100);*/
