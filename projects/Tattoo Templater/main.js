let img_from = document.getElementById('img_from')
let img_buf = document.getElementById('img_buf')
let img_to = document.getElementById('img_to')
const tattoo_default = {
    side: 0.6, corner: 0.3, dark: 70,
    kr: 0.2126, kg: 0.7152, kb: 0.0722,
}
let tattoo = tattoo_default, color_fg = '#000', color_bg = '#d2bca7'


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
    img_buf.style.background = this.value
}
document.getElementById('cfg').oninput = function () {
    img_buf.style.background = this.value
}
document.getElementById('img').onchange = function () {
    if (this.files && this.files[0]) {
        let reader = new FileReader()
        reader.onload = (e) => img_from.src = e.target.result
        reader.readAsDataURL(this.files[0])
    }
}

redrawImg('./v2.jpg')

function redrawImg(url) {
    if (url != null) img_from.src = url
    img_buf.onload = function () {
        let can = document.createElement('canvas')
        let c = can.getContext('2d')
        let w = this.offsetWidth, h = this.offsetHeight
        can.width = w
        can.height = h
        c.drawImage(this, 0, 0)
        let idata = c.getImageData(0, 0, w, h)
        let pix = idata.data
        let gray = []

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


