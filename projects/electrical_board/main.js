import Wire from './wire.js'
import Block from './block.js'
import Dot from './dot.js'

const WIDTH = 800, HEIGHT = 800,
    WIDTH_HALF = WIDTH / 2, HEIGHT_HALF = HEIGHT / 2,
    svg_map = document.getElementById('map')

let percent_zoom = 0.5, scalar_zoom = 1, corrector = 1,
    currentX = 0, currentY = 0,
    touch_position = [0, 0]

function goAtPoint(x = currentX, y = currentY) {
    let w = x - WIDTH_HALF * scalar_zoom | 0,
        h = y - HEIGHT_HALF * scalar_zoom | 0
    /*
        svg_map.style.setProperty('--map-x-offset', -w * scalar_zoom)
        svg_map.style.setProperty('--map-y-offset', -h * scalar_zoom)
        svg_map.style.setProperty('--map-z-offset', (100 / scalar_zoom) + 'px')
     */
    svg_map.setAttribute('viewBox', w + ' ' + h + ' ' + (WIDTH * scalar_zoom | 0) + ' ' + (HEIGHT * scalar_zoom | 0))
}

function goDrag(x = 0, y = 0) {
    currentX += (touch_position[0] - x) * corrector
    currentY += (touch_position[1] - y) * corrector
    goAtPoint()
    touch_position = [x, y]
}

function setPos(x = currentX, y = currentY) {
    goAtPoint(currentX = x, currentY = y)
}

function addZoom(zoom = 0) {
    setZoom(percent_zoom + percent_zoom / zoom / 10)
}

function setZoom(zoom = 0) {
    percent_zoom = Math.max(0.05, Math.min(1, zoom))
    scalar_zoom = Math.max(0.2, Math.min(3, percent_zoom * 3))
    corrector = scalar_zoom * Math.max(WIDTH / svg_map.scrollWidth, HEIGHT / svg_map.scrollHeight)
    console.log(percent_zoom, '|', scalar_zoom)
    goAtPoint()
}

window.addEventListener('load', function () {
    document.body.addEventListener('touchstart',
        (e) => touch_position = [e.changedTouches[0].pageX, e.changedTouches[0].pageY], false)
    document.body.addEventListener('touchmove',
        (e) => goDrag(e.changedTouches[0].pageX, e.changedTouches[0].pageY), false)
}, false)

function initMouseEvents() {
    svg_map.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        touch_position = [e.clientX, e.clientY]
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        goDrag(e.clientX, e.clientY)
    }

    function closeDragElement() {
        document.onmouseup = document.onmousemove = null
    }

    if ('onwheel' in document) svg_map.addEventListener("wheel", onWheel)
    else if ('onmousewheel' in document) svg_map.addEventListener("mousewheel", onWheel)
    else svg_map.addEventListener("MozMousePixelScroll", onWheel)

    function onWheel(e) {
        addZoom(Math.max(-1, Math.min(1, e.deltaY)))
        goAtPoint()
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
    }
}

function editText(el) {
    el.innerHTML = ''
    let dy = 1
    for (let line of prompt('new text').split('  '))
        if (line !== '') {
            el.innerHTML += '<tspan x="0" dy="' + dy + 'rem">' + line + '</tspan>'
            dy = 1
        } else dy++
}

initMouseEvents()
goAtPoint()
setZoom(0.3)
window.addEventListener('resize', (e) => addZoom(), true)
