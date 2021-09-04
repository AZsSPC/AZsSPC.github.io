let canvas = document.getElementById('sphere');
let ctx = canvas.getContext('2d');

function draw() {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
    console.log('asdasd')
}

let points = [{'x': 50, 'y': 0, 'z': 0}]

function rotate(point, rW, rH) {
    rH -= 90;
    let x = point.x;
    let y = point.y;
    let z = point.z;
    let sa = Math.sin(rH);
    let sb = Math.sin(rW);
    let ca = Math.cos(rH);
    let cb = Math.cos(rW);
    return {'x': x * cb + z * sb, 'y': y * ca - z * sa, 'z': (y * sa + z * ca) * cb - x * sb};
}

console.log(rotate({'x': 1, 'y': 0, 'z': 0}, 0, 90))
draw()