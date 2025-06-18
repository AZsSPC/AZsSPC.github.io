(function () {
    const header = document.createElement('header');

    const div1 = document.createElement('div');
    const redLabel = document.createElement('label');
    redLabel.className = 'az-input-button';
    redLabel.setAttribute('color', 'red');
    redLabel.textContent = 'Red ';
    const redInput = document.createElement('input');
    redInput.id = 'kr';
    redInput.type = 'number';
    redInput.step = '.01';
    redLabel.appendChild(redInput);

    const greenLabel = document.createElement('label');
    greenLabel.className = 'az-input-button';
    greenLabel.setAttribute('color', 'green');
    greenLabel.textContent = 'Green ';
    const greenInput = document.createElement('input');
    greenInput.id = 'kg';
    greenInput.type = 'number';
    greenInput.step = '.01';
    greenLabel.appendChild(greenInput);

    const blueLabel = document.createElement('label');
    blueLabel.className = 'az-input-button';
    blueLabel.setAttribute('color', 'blue');
    blueLabel.textContent = 'Blue ';
    const blueInput = document.createElement('input');
    blueInput.id = 'kb';
    blueInput.type = 'number';
    blueInput.step = '.01';
    blueLabel.appendChild(blueInput);

    div1.appendChild(redLabel);
    div1.appendChild(greenLabel);
    div1.appendChild(blueLabel);

    const div2 = document.createElement('div');
    const sideLabel = document.createElement('label');
    sideLabel.className = 'az-input-button';
    sideLabel.setAttribute('color', 'magenta');
    sideLabel.textContent = 'Side ';
    const sideInput = document.createElement('input');
    sideInput.id = 'side';
    sideInput.type = 'number';
    sideInput.step = '.01';
    sideLabel.appendChild(sideInput);

    const cornerLabel = document.createElement('label');
    cornerLabel.className = 'az-input-button';
    cornerLabel.setAttribute('color', 'gold');
    cornerLabel.textContent = 'Corner ';
    const cornerInput = document.createElement('input');
    cornerInput.id = 'corner';
    cornerInput.type = 'number';
    cornerInput.step = '.01';
    cornerLabel.appendChild(cornerInput);

    const darkLabel = document.createElement('label');
    darkLabel.className = 'az-input-button';
    darkLabel.setAttribute('color', 'gray');
    darkLabel.textContent = 'Dark ';
    const darkInput = document.createElement('input');
    darkInput.id = 'dark';
    darkInput.type = 'number';
    darkInput.step = '.1';
    darkLabel.appendChild(darkInput);

    div2.appendChild(sideLabel);
    div2.appendChild(cornerLabel);
    div2.appendChild(darkLabel);

    const div3 = document.createElement('div');
    const bgLabel = document.createElement('label');
    bgLabel.className = 'az-input-button';
    bgLabel.setAttribute('color', 'purple');
    bgLabel.textContent = 'Background ';
    const bgInput = document.createElement('input');
    bgInput.id = 'cbg';
    bgInput.type = 'color';
    bgLabel.appendChild(bgInput);

    const fgLabel = document.createElement('label');
    fgLabel.className = 'az-input-button';
    fgLabel.setAttribute('color', 'purple');
    fgLabel.textContent = 'Foreground ';
    const fgInput = document.createElement('input');
    fgInput.id = 'cfg';
    fgInput.type = 'color';
    fgLabel.appendChild(fgInput);

    const resetButton = document.createElement('button');
    resetButton.className = 'az-button';
    resetButton.setAttribute('color', 'red');
    resetButton.textContent = 'Reset';
    resetButton.onclick = () => { setDefaults(); redrawImg(null); };

    const importLabel = document.createElement('label');
    importLabel.className = 'az-input-button';
    importLabel.setAttribute('color', 'blue');
    importLabel.textContent = 'Import ';
    const importInput = document.createElement('input');
    importInput.id = 'img';
    importInput.type = 'file';
    importInput.accept = 'image/*';
    importLabel.appendChild(importInput);

    div3.appendChild(bgLabel);
    div3.appendChild(fgLabel);
    div3.appendChild(resetButton);
    div3.appendChild(importLabel);

    header.appendChild(div1);
    header.appendChild(div2);
    header.appendChild(div3);

    const main = document.createElement('main');
    const imagesDiv = document.createElement('div');
    imagesDiv.id = 'images';

    const imgFrom = document.createElement('img');
    imgFrom.id = 'img_from';
    imgFrom.src = '';

    const relativeDiv = document.createElement('div');
    relativeDiv.className = 'relative';

    const imgBuf = document.createElement('img');
    imgBuf.id = 'img_buf';
    imgBuf.src = '';

    const imgTo = document.createElement('img');
    imgTo.id = 'img_to';
    imgTo.src = '';

    relativeDiv.appendChild(imgBuf);
    relativeDiv.appendChild(imgTo);
    imagesDiv.appendChild(imgFrom);
    imagesDiv.appendChild(relativeDiv);
    main.appendChild(imagesDiv);

    document.body.appendChild(header);
    document.body.appendChild(main);
})();

let img_from = document.getElementById('img_from')
let img_buf = document.getElementById('img_buf')
let img_to = document.getElementById('img_to')
const tattoo_default = {
    side: 0.6, corner: 0.3, dark: 70,
    kr: 0.2126, kg: 0.7152, kb: 0.0722,
}
let tattoo, color_fg, color_bg

function setDefaults() {
    color_fg = '#000'
    color_bg = '#d2bca7'
    tattoo = tattoo_default
    for (let k of Object.keys(tattoo)) {
        const e = document.getElementById(k)
        e.value = tattoo_default[k]
        e.oninput = function () {
            tattoo[k] = this.value
            redrawImg(null)
        }
    }

    document.getElementById('cbg').value = color_bg
    document.getElementById('cbg').oninput = function () {
        img_to.style.background = this.value
    }
    document.getElementById('cfg').oninput = function () {
        img_to.style.background = this.value
    }
    document.getElementById('img').onchange = function () {
        if (this.files && this.files[0]) {
            let reader = new FileReader()
            reader.onload = (e) => {
                redrawImg(e.target.result)
            }
            reader.readAsDataURL(this.files[0])
        }
    }
}

setDefaults()
redrawImg('./v2.jpg')

function redrawImg(url) {
    if (url != null) img_from.src = url
    img_buf.onload = function () {
        let can = document.createElement('canvas'),
            c = can.getContext('2d'),
            w = can.width = this.naturalWidth,
            h = can.height = this.naturalHeight,
            gray = []
        c.drawImage(this, 0, 0)
        let idata = c.getImageData(0, 0, w, h)
        let pix = idata.data

        for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i += 4)
            gray[i] = sc(
                tattoo.kr * gc(pix[i])
                + tattoo.kg * gc(pix[i + 1])
                + tattoo.kb * gc(pix[i + 2])
            )
        for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++) {
            pix[i + 3] = gray[i] < tattoo.dark ? 255 : sobel(
                gray[i - 4 - w * 4], gray[i - w * 4], gray[i + 4 - w * 4],
                gray[i - 4], gray[i], gray[i + 4],
                gray[i - 4 + w * 4], gray[i + w * 4], gray[i + 4 + w * 4],
            )
            pix[i] = pix[i + 1] = pix[i + 2] = 0
            i += 4
        }

        c.putImageData(idata, 0, 0)
        this.onload = () => console.log('done')
        this.src = can.toDataURL()
        img_to.src = this.src
    }
    img_buf.src = img_from.src
}

function gc(v) {
    return (v /= 255) < 0 ? v / 13 : (v + 0.05) ** 2.4
}

function sc(v) {
    return (v < 0 ? 13 * v : (v ** (1 / 2))) * 255
}

function sobel(a, b, c, d, e, f, g, h, i) {
    const q = Math.abs(
        tattoo.corner * c
        + tattoo.side * f
        + tattoo.corner * i
        - tattoo.corner * a
        - tattoo.side * d
        - tattoo.corner * g
    ) + Math.abs(
        tattoo.corner * g
        + tattoo.side * h
        + tattoo.corner * i
        - tattoo.corner * a
        - tattoo.side * b
        - tattoo.corner * c
    )
    return q < tattoo.dark ? 0 : q * 20
}


