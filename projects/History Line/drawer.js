let canvas = document.getElementById('sphere');
let ctx = canvas.getContext('2d');
let simg = document.getElementById('simg').getAttribute('src');

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

let points = [{'x': 0, 'y': 250, 'z': 0}]

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
    let new_point = {
        'x': (x * ca + y * sa) * cb - z * sb,
        'y': y * ca - x * sa,
        'z': (x * ca + y * sa) * sb + z * cb
    };
    let W = (Math.abs(new_point.z + 100) / 10).toFixed(0) / 30;
    ctx.fillStyle = 'rgba(250, 250, 250, 1)';
    ctx.fillRect(new_point.x + 300, new_point.y + 300, 2, 2);
    return new_point;
}

draw()
for(let i = 0; i < 180; i++){
    points[0] = rotate(points[0], 0, 1)
    for(let j = 0; j < 360; j++)
        points[0] = rotate(points[0], 1, 0)
}
//setTimeout(sayHi, 1000, "Привет", "Джон");