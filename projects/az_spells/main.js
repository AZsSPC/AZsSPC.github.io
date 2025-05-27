const code = `
const fireball = () => {
    const a = [-6.5];
    const isActive = true; /*nonl*/

    const generateMessage = (name) => {
        const formatName = (rawName) => {
            return rawName.trim().toUpperCase();
        }; /*nonl*/

        const message = "Hello, " + formatName(name);
        return message; /*nonl*/
    }; /*nonl*/

    const calculate = () => {
        const baseValue = (param1, param2) => {
            return isActive ? 1 : 0;
        }; /*nonl*/

        const result = a[0] + baseValue();
        return result; /*nonl*/
    }; /*nonl*/
    

    console.log(generateMessage("Alice"), calculate());
}; /*nonl*/
`;

let uuid = 0
function extractFunctionsRecursively(code, label = 'main', params = [], level = 0, fid = 0) {
    const children = [];
    let i = 0;

    while (i < code.length) {
        const match = code.slice(i).match(/((?:const|let)\s+(\w+))\s*=\s*\(([^)]*)\)\s*=>\s*{/);
        if (!match) break;

        const name = match[2];
        const paramList = match[3] ? match[3].split(',').map(e => e.trim()) : [];

        const startIndex = i + match.index + match[0].length - 1; // index of first {
        let braceCount = 1;
        let j = startIndex + 1;

        while (j < code.length && braceCount > 0) {
            if (code[j] === '{') braceCount++;
            else if (code[j] === '}') braceCount--;
            j++;
        }

        // после закрывающей скобки идем дальше, захватывая возможные пробелы, перевод строки и ;
        while (j < code.length && /\s/.test(code[j])) j++;
        if (code[j] === ';') j++;

        const fullMatchEnd = j;
        const fnCode = code.slice(startIndex + 1, j - 1); // без внешних {}

        children.push(extractFunctionsRecursively(fnCode, name, paramList, level + 1, children.length));

        i = i + match.index;
        const before = code.slice(0, i + match[1].length);
        const after = code.slice(fullMatchEnd);
        code = `${before} = /*ssc-${children.length - 1}*/;${after}`;
    }

    return { label, code: code.trim(), params, children, uuid: uuid++, fid };
}

const functionTree = extractFunctionsRecursively(code.replace(/[ \t\n]+(?=[^\n]*\/\*nonl\*\/$)/gm, '').replace(/\/\*nonl\*\//g, ''));

const svg = document.getElementById('circleSvg');
const NS = svg.namespaceURI;
const centerX = svg.clientWidth / 2;
const centerY = svg.clientHeight / 2;

const RING_RADIUS = 250;
const FONT_SIZE = 16;
const RAD_STEP = 28;
const MIN_DISTANCE = RAD_STEP;
//const COLORS = { ring: '#0f0', main: '#f0f', text: '#ff0', keyword: '#0ff', connect: '#f00' }
const COLORS = { ring: '#ff0', main: '#ff0', text: '#ff0', keyword: '#ff0', connect: '#ff0' }

const KEYWORDS = [
    ...Array.from({ length: 10 }, (_, i) => `/*ssc-${i}*/`),
    '()', '=>',
    'break', 'case', 'catch', 'class', 'const', 'let', 'extends', 'throw',
    'true', 'false', 'default', 'var', 'super', 'try', 'null', 'do',
    'function', 'import', 'debugger', 'else', 'async', 'export', 'finally',
    'for', 'await', 'if', 'new', 'switch', 'return', 'while', 'with', 'continue',
];

const tokenizeLine = line =>
    line.match(/(\/\*ssc-\w+?\*\/|\(\)|\[\]|=>|==|===|!=|!==|<=|>=|&&|\|\||[{}():;,."'`+\-*\/=<>\[\]]|\w+)/g) || [];

const drawGuideCircle = (radius, group, fill = false) => {
    const c = document.createElementNS(NS, 'circle');
    Object.entries({
        r: radius,
        fill: fill ? COLORS.main : 'none',
        cx: 0, cy: 0,
        stroke: COLORS.ring,
        'stroke-width': 1
    }).forEach(([k, v]) => c.setAttribute(k, v));
    group.appendChild(c);
};

const convertPath = (path) => path.replace(/([-\d.]+),([-\d.]+)/g, (_, x, y) =>
    `${(+x / 200 * FONT_SIZE).toFixed(1)},${(+y / 200 * RAD_STEP).toFixed(1)}`);

const symbols = {
    // characters
    ':': 'M-60,-100 L0,-40 L60,-100 M-60,100 L0,40 L60,100',
    ';': 'M-60,-100 L0,-40 L60,-100 M0,40 L0,100',
    ',': 'M0,40 L0,100',
    '.': 'M-60,100 L0,40 L60,100',
    '"': 'M-40,-100 L-40,-30 M40,-100 L40,-30',
    "'": 'M0,-100 L0,-30',
    '`': 'M-60,-100 L0,-40 L60,-100',
    '=': 'M-30,-100 L-30,100 M30,-100 L30,100',

    // braces
    '(': 'M50,-100 L-25,0 L50,100',
    ')': 'M-50,-100 L25,0 L-50,100',
    '{': 'M50,-100 L-25,0 L50,100 M-25,-50 L50,0 L-25,50',
    '}': 'M-50,-100 L25,0 L-50,100 M25,50 L-50,0 L25,-50',
    '[': 'M50,-100 L-25,0 L50,100 M0,-50 L-60,-50 M0,50 L-60,50',
    ']': 'M-50,-100 L25,0 L-50,100 M0,-50 L60,-50 M0,50 L60,50',
    '<': 'M30,-50 L40,0 L75,50 L75,-50',
    '>': 'M-30,-50 L40,0 L-75,50 L-75,-50',

    // keywords
    'true': 'M-60,10 L-10,40 L70,-50 M75,70 L-75,70',
    'false': 'M-50,-40 L50,40 M50,-40 L-50,40 M75,70 L-75,70',

    'break': 'M0,-50 L-50,50 L50,50 Z',
    'case': 'M50,-30 L-50,-30 L-50,30 L50,30',
    'catch': 'M0,-50 L0,50 M0,50 L30,30',
    'class': 'M-25,-50 L25,-50 L25,50 L-25,50 Z',
    'const': 'M40,-40 L-40,40 L40,40 L-40,-40 L40,-40 M-80,0 L80,0',
    'let': 'M40,-40 L-40,40 L40,40 L-40,-40 L40,-40',
    'extends': 'M-40,-30 L40,0 L-40,30',
    'throw': 'M0,-50 L-40,50 L40,50 Z',
    'default': 'M40,-30 L-40,-30 L-40,30 L40,30 M-40,0 L40,0',
    'var': 'M-30,50 L0,-50 L30,50',
    'super': 'M0,-40 L-40,0 L0,40 L40,0 Z',
    'try': 'M-10,-50 L-10,50 M10,-50 L10,50 M-30,-30 L0,-30',
    'null': 'M-30,-30 L-30,30 M-10,-30 L-10,30 M10,-30 L10,30 M30,-30 L30,30',
    'do': 'M30,-50 Q-30,-50 -30,0 Q-30,50 30,50',
    'function': 'M-30,0 Q-30,-40 0,-40 Q30,-40 30,0 Q30,40 0,40 Q-30,40 -30,0',
    'import': 'M-40,-30 L20,0 L-40,30',
    'debugger': 'M-20,-20 L20,20 M20,-20 L-20,20',
    'else': 'M-30,-30 L30,-30 M-30,0 L30,0 M-30,30 L30,30',
    'async': 'M-30,-40 Q0,40 30,-40 Q0,20 -30,-40',
    'export': 'M-40,30 L20,0 L-40,-30',
    'finally': 'M-20,-50 L-20,50 L20,50',
    'for': 'M0,-50 Q-40,-20 -40,0 Q-40,20 0,50',
    'await': 'M-20,-50 L0,-10 L20,-50 M-20,50 L0,10 L20,50',
    'if': 'M-10,-50 L-10,50 M10,-50 L10,50',
    'new': 'M-20,50 L-20,-50 L20,50 L20,-50',
    'switch': 'M-30,20 Q-50,0 -30,-20 Q-10,-30 10,-20 Q30,0 10,20 Q-10,30 -30,20',
    'return': 'M30,-30 L-30,0 L30,30',
    'while': 'M-30,50 Q-50,0 -30,-50 Q-10,-50 0,-25 Q10,-50 30,-50 Q50,0 30,50 Q10,50 0,25 Q-10,50 -30,50',
    'with': '',
    'continue': 'M-30,30 Q-50,0 -30,-30 Q-10,-40 10,-30 Q30,0 10,30 Q-10,40 -30,30',

    // ligatures
    '()': 'M0,-50 Q-90,-50 -90,0 Q-90,50 0,50 Q90,50 90,0 Q90,-50 0,-50',
    '=>': 'M-40,-100 L25,0 L-40,100 M0,25 L-80,25 M0,-25 L-80,-25',
    '/*ssc-0*/': 'M0,100 L100,60 L100,-60 L0,-100 L-100,-60 L-100,60 L0,100',
    '/*ssc-1*/': 'M0,100 L100,60 L100,-60 L0,-100 L-100,-60 L-100,60 L0,100 L0,0',
    '/*ssc-2*/': 'M0,100 L100,60 L100,-60 L0,-100 L-100,-60 L-100,60 L0,100 L0,-100',
    '/*ssc-3*/': 'M0,100 L100,60 L100,-60 L0,-100 L-100,-60 L-100,60 L0,100 L0,-100 M-100,0 L100,0',
    '/*ssc-4*/': 'M0,100 L100,60 L100,-60 L0,-100 L-100,-60 L-100,60 L0,100',

    // TODO: add curvature and adjustment to prev or next token
    //'()=>': 'M0,-8 L-6,-6 L-8,0 L-6,6 L0,8 L6,6 L8,0 L6,-6 L0,-8 M-4,-14 L2,0 L-4,14 M0,3 L-8,3 M0,-3 L-8,-3',
};

Object.keys(symbols).forEach(e => { symbols[e] = convertPath(symbols[e]) })

const drawSymbol = (char) => {
    if (symbols[char]) {
        const p = document.createElementNS(NS, 'path');
        Object.entries({
            d: symbols[char],
            stroke: COLORS.keyword,
            'stroke-width': 1,
            fill: 'none'
        }).forEach(([k, v]) => p.setAttribute(k, v));
        return p;
    } else {
        const t = document.createElementNS(NS, 'text');
        Object.entries({
            x: 0, y: 0,
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            fill: COLORS.text
        }).forEach(([k, v]) => t.setAttribute(k, v));
        t.textContent = char;
        return t;
    }
};

const isLowerCase = (s) => s === s.toLowerCase() && s !== s.toUpperCase();

function drawTokenCircle(group, tokens, radius) {
    // Step 1: Compute token visual lengths
    const tokenData = tokens.map(token => ({
        token,
        isKeyword: KEYWORDS.includes(token),
        length: KEYWORDS.includes(token) ? 1 : token.length
    }));

    const step = FONT_SIZE * 50 / radius;
    const gap = (360 - tokenData.reduce((sum, t) => sum + t.length, 0) * step) / tokens.length;
    let counter = 0;

    tokenData.forEach(({ token, isKeyword, length }, i) => {
        if (isKeyword) {
            // Center the keyword symbol in its segment
            const angle = gap * i + counter * step;
            const g = drawSymbol(token);
            g.classList = 'token'
            g.setAttribute('transform', `rotate(${angle}) translate(0,-${radius})`);
            group.appendChild(g);
            counter++
        } else {
            // Spread characters across the tokenAngle
            const word = document.createElementNS(NS, 'g');
            word.classList = 'word-token';
            word.setAttribute('word', token);


            [...token].forEach((char, j) => {
                let angle = gap * i + counter * step;
                const g = drawSymbol(char);

                const rq = isNaN(char) ? (char === char.toLowerCase()
                    ? 1         // is default
                    : 0.985     // is uppercase
                ) : 0.975;      // is number

                g.setAttribute('transform', `rotate(${angle}) translate(0,-${radius * rq})`);

                word.appendChild(g);
                counter++
            });
            group.appendChild(word);
        }
    });
}

function renderCodeTree(node, svg, depth = 0) {
    const g = document.createElementNS(NS, 'g');
    g.classList = `spell-circle`;
    g.id = `circle-${node.label}-${node.uuid}`;
    // g.setAttribute('transform', `translate(${x},${y})`);
    svg.appendChild(g);

    const lines = node.code.split('\n').map(l => l.trim()).filter(Boolean);
    if (node.params.length !== 0) lines.unshift(';' + node.params.join(','))

    const radneed = lines.map(line =>
        tokenizeLine(line).reduce((sum, token) =>
            sum + (KEYWORDS.includes(token) ? 1 : token.length) * FONT_SIZE, 0
        ) / (2 * Math.PI)
    );

    const baseRadius = Math.max(FONT_SIZE * 2, Math.max(...radneed.map((r, i) => r - i * RAD_STEP)));
    const radii = radneed.map((_, i) => baseRadius + i * RAD_STEP);
    node.r = radii[radii.length - 1] + RAD_STEP / 2
    if (node.params.length === 0) drawGuideCircle(baseRadius - RAD_STEP / 2, g);
    if (node.label === 'main') drawGuideCircle(FONT_SIZE / 2, g, true);

    if (depth > 0) {
        const t = drawSymbol(`/*ssc-${node.fid}*/`);
        Object.entries({
            x: 0, y: 0,
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
        }).forEach(([k, v]) => t.setAttribute(k, v));
        t.classList = `ssc-${node.fid}`
        g.appendChild(t);
    }

    lines.forEach((line, j) => {
        const tokens = tokenizeLine(line);
        if (!tokens.length) return;

        const ring = document.createElementNS(NS, 'g');
        ring.classList = `ring ${node.label}-${j}`;
        drawTokenCircle(ring, tokens, radii[j]);
        drawGuideCircle(radii[j] + RAD_STEP / 2, g);
        g.appendChild(ring);
    });

    // Рекурсивный вызов для потомков
    node.children.forEach((child, i) => {
        renderCodeTree(child, svg, depth + 1);
    });
}

console.log(functionTree)
renderCodeTree(functionTree, svg);


const circles = [...svg.querySelectorAll('.spell-circle')];
const circleMap = {};
circles.forEach(el => { circleMap[el.id] = el; });

const placedCircles = [];
const placedLines = [];

function setPosition(el, x, y) {
    el.setAttribute('transform', `translate(${x}, ${y})`);
    el.dataset.x = x;
    el.dataset.y = y;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function circlesIntersect(x, y, r) {
    for (const c of placedCircles) {
        if (dist(x, y, c.x, c.y) < r + c.r + MIN_DISTANCE) {
            return true;
        }
    }
    return false;
}

// Проверка пересечения отрезков
function linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    function ccw(ax, ay, bx, by, cx, cy) {
        return (cy - ay) * (bx - ax) > (by - ay) * (cx - ax);
    }
    return ccw(x1, y1, x3, y3, x4, y4) !== ccw(x2, y2, x3, y3, x4, y4) &&
        ccw(x1, y1, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x4, y4);
}

// Проверяем, можно ли поместить линию без пересечения с уже нарисованными линиями
function canPlaceLine(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distLen = Math.sqrt(dx * dx + dy * dy);
    if (distLen === 0) return false;

    const nx = dx / distLen;
    const ny = dy / distLen;

    const startX = x1 + nx * r1;
    const startY = y1 + ny * r1;
    const endX = x2 - nx * r2;
    const endY = y2 - ny * r2;

    for (const line of placedLines) {
        if (linesIntersect(startX, startY, endX, endY, line.x1, line.y1, line.x2, line.y2)) {
            return false;
        }
    }

    return { startX, startY, endX, endY };
}

// Поиск позиции для ребенка вокруг родителя, без пересечений кругов и линий
function findPositionAround(parentX, parentY, parentR, childR) {
    let distance = parentR + childR + MIN_DISTANCE;
    const angleStep = Math.PI / 24; // маленький шаг угла для точного поиска

    while (distance < 2000) { // ограничение по максимальному расстоянию
        for (let angle = 0; angle < 2 * Math.PI; angle += angleStep) {
            const x = parentX + distance * Math.cos(angle);
            const y = parentY + distance * Math.sin(angle);

            if (circlesIntersect(x, y, childR)) continue;

            const lineCheck = canPlaceLine(parentX, parentY, parentR, x, y, childR);
            if (lineCheck) {
                return { x, y, ...lineCheck };
            }
        }
        distance += 10; // если не нашли подходящее место — увеличиваем радиус поиска
    }

    // Фоллбэк — просто рядом
    return { x: parentX + distance, y: parentY, startX: parentX + parentR, startY: parentY, endX: parentX + distance - childR, endY: parentY };
}

function layoutChildren(parentX, parentY, children, parentRadius) {
    children.forEach(child => {
        const radius = Math.max(child.r, 20);

        const pos = findPositionAround(parentX, parentY, parentRadius, radius);

        const el = circleMap[`circle-${child.label}-${child.uuid}`];
        if (el) setPosition(el, pos.x, pos.y);

        placedCircles.push({ x: pos.x, y: pos.y, r: radius });

        // Рисуем линию
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', pos.startX);
        line.setAttribute('y1', pos.startY);
        line.setAttribute('x2', pos.endX);
        line.setAttribute('y2', pos.endY);
        line.setAttribute('stroke', COLORS.connect);
        line.setAttribute('stroke-width', FONT_SIZE);
        svg.insertBefore(line, svg.firstChild);

        placedLines.push({
            x1: pos.startX,
            y1: pos.startY,
            x2: pos.endX,
            y2: pos.endY
        });

        if (child.children?.length) {
            layoutChildren(pos.x, pos.y, child.children, radius);
        }
    });
}

function layoutTree(node, x = 500, y = 500) {
    const el = circleMap[`circle-${node.label}-${node.uuid}`];
    if (el) setPosition(el, x, y);

    placedCircles.push({ x, y, r: node.r });

    if (node.children?.length) {
        layoutChildren(x, y, node.children, node.r);
    }
}

function fitViewBox(padding = 50) {
    if (placedCircles.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    // Учитываем все круги
    placedCircles.forEach(({ x, y, r }) => {
        if (x - r < minX) minX = x - r;
        if (y - r < minY) minY = y - r;
        if (x + r > maxX) maxX = x + r;
        if (y + r > maxY) maxY = y + r;
    });

    // Учитываем все линии
    placedLines.forEach(({ x1, y1, x2, y2 }) => {
        if (x1 < minX) minX = x1;
        if (y1 < minY) minY = y1;
        if (x2 < minX) minX = x2;
        if (y2 < minY) minY = y2;

        if (x1 > maxX) maxX = x1;
        if (y1 > maxY) maxY = y1;
        if (x2 > maxX) maxX = x2;
        if (y2 > maxY) maxY = y2;
    });

    // Размер области с паддингом
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    // Чтобы получить квадрат, берем max из ширины и высоты
    const size = Math.max(width, height);

    // Центрируем viewBox относительно фигуры
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    svg.setAttribute('viewBox', `${cx - size / 2} ${cy - size / 2} ${size} ${size}`);
}

// Вызови после раскладки:
layoutTree(functionTree);
fitViewBox(50);
