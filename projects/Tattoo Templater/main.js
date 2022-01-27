let img_buf = document.getElementById('t1');
let img = document.getElementById('t2');
const side = 0.6, corner = 0.3, dark = 70;
const kr = 0.2126, kg = 0.7152, kb = 0.0722;
redrawImg('./v2.jpg');

function getPixel(url, x, y) {
    img.src = url;
    let c = document.createElement('canvas').getContext('2d');
    c.drawImage(img, 0, 0);
    return c.getImageData(x, y, 1, 1).data;
}


function redrawImg(url) {
    img_buf.src = url;
    img.onload = function () {
        let can = document.createElement('canvas');
        let c = can.getContext('2d');
        let w = img.offsetWidth, h = img.offsetHeight;
        can.width = w;
        can.height = h;
        c.drawImage(img, 0, 0);
        let idata = c.getImageData(0, 0, w, h);
        let pix = idata.data;
        let gray = [];


        for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i += 4)
            gray[i] = sc(kr * gc(pix[i]) + kg * gc(pix[i + 1]) + kb * gc(pix[i + 2]));
        for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++) {
            pix[i + 3] = gray[i] < dark ? 255 : sobel(
                gray[i - 4 - w * 4], gray[i - w * 4], gray[i + 4 - w * 4],
                gray[i - 4], gray[i], gray[i + 4],
                gray[i - 4 + w * 4], gray[i + w * 4], gray[i + 4 + w * 4],
            );
            pix[i] = pix[i + 1] = pix[i + 2] = 0;
            i += 4;
        }

        c.putImageData(idata, 0, 0);
        img.onload = () => console.log('done');
        img.src = can.toDataURL();
    };
    img.src = url;
}

function gc(v) {
    return (v /= 255) < 0 ? v / 13 : (v + 0.05) ** 2.4;
}

function sc(v) {
    return (v < 0 ? 13 * v : (v ** (1 / 2))) * 255;
}


function sobel(a, b, c, d, e, f, g, h, i) {
    // if (a < dark || b < dark || c < dark || d < dark || e < dark || f < dark || g < dark || h < dark || i < dark) return 0;
    let q =
        Math.abs(corner * c + side * f + corner * i - corner * a - side * d - corner * g)
        + Math.abs(corner * g + side * h + corner * i - corner * a - side * b - corner * c);
    return q < dark ? 0 : q * 20;
}


