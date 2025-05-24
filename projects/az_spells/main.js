const code = `
const a = [5];const b = false,true;
const asdasd = (123,123,1) =>{
    const message = "Hello,\` " + name;
    return message;}
const calc = ()=> {
    let result = a + b;
    return result;}
console.log(greet("Alice"), calc());
`;

const svg = document.getElementById('circleSvg');
const NS = svg.namespaceURI;
const centerX = svg.clientWidth / 2;
const centerY = svg.clientHeight / 2;

const RING_RADIUS = 250;
const FONT_SIZE = 16;
const RAD_STEP = 28;
const KEYWORDS = [
    'const', 'let', 'var',
    '()', '=>',
    'break', 'case', 'catch', 'class', 'const', 'let', 'extends', 'throw',
    'true', 'false', 'default', 'var', 'super', 'try', 'null', 'do',
    'function', 'import', 'debugger', 'else', 'async', 'export', 'finally',
    'for', 'await', 'if', 'new', 'switch', 'return', 'while', 'with', 'continue',
];

const functionBlocks = [...code.matchAll(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{[\s\S]*?}/g)].map(m => m[0]);
const globalCode = code.replace(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{[\s\S]*?}/g, '').trim();

const allBlocks = [
    { label: 'main', code: globalCode },
    ...functionBlocks.map((fn, i) => ({ label: `fn-${i + 1}`, code: fn }))
];

const tokenizeLine = line =>
    line.match(/(\(\)|\[\]|=>|==|===|!=|!==|<=|>=|&&|\|\||[{}():;,."'`+\-*/=<>\[\]]|\w+)/g) || [];

const drawGuideCircle = (radius, group) => {
    const c = document.createElementNS(NS, 'circle');
    Object.entries({
        r: radius,
        cx: 0, cy: 0,
        stroke: '#0f0',
        'stroke-width': 1,
        fill: 'none'
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
    '=': 'M-40,-100 L-40,100 M40,-100 L40,100',
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

    // ligatures
    '()': ('M0,-50 Q-90,-50 -90,0 Q-90,50 0,50 Q90,50 90,0 Q90,-50 0,-50'),
    '=>': ('M-40,-100 L25,0 L-40,100 M0,25 L-80,25 M0,-25 L-80,-25'),
    'break': ('M0,-50 L-50,50 L50,50 Z'),
    'case': ('M50,-30 L-50,-30 L-50,30 L50,30'),
    'catch': ('M0,-50 L0,50 M0,50 L30,30'),
    'class': ('M-25,-50 L25,-50 L25,50 L-25,50 Z'),
    'const': ('M40,-40 L-40,40 L40,40 L-40,-40 L40,-40 M-80,0 L80,0'),
    'let': ('M40,-40 L-40,40 L40,40 L-40,-40 L40,-40'),
    'extends': ('M-40,-30 L40,0 L-40,30'),
    'throw': ('M0,-50 L-40,50 L40,50 Z'),
    'true': ('M-30,10 L-10,30 L30,-30'),
    'false': ('M-30,-30 L30,30 M30,-30 L-30,30'),
    'default': ('M40,-30 L-40,-30 L-40,30 L40,30 M-40,0 L40,0'),
    'var': ('M-30,50 L0,-50 L30,50'),
    'super': ('M0,-40 L-40,0 L0,40 L40,0 Z'),
    'try': ('M-10,-50 L-10,50 M10,-50 L10,50 M-30,-30 L0,-30'),
    'null': ('M-30,-30 L-30,30 M-10,-30 L-10,30 M10,-30 L10,30 M30,-30 L30,30'),
    'do': ('M30,-50 Q-30,-50 -30,0 Q-30,50 30,50'),
    'function': ('M-30,0 Q-30,-40 0,-40 Q30,-40 30,0 Q30,40 0,40 Q-30,40 -30,0'),
    'import': ('M-40,-30 L20,0 L-40,30'),
    'debugger': ('M-20,-20 L20,20 M20,-20 L-20,20'),
    'else': ('M-30,-30 L30,-30 M-30,0 L30,0 M-30,30 L30,30'),
    'async': ('M-30,-40 Q0,40 30,-40 Q0,20 -30,-40'),
    'export': ('M-40,30 L20,0 L-40,-30'),
    'finally': ('M-20,-50 L-20,50 L20,50'),
    'for': ('M0,-50 Q-40,-20 -40,0 Q-40,20 0,50'),
    'await': ('M-20,-50 L0,-10 L20,-50 M-20,50 L0,10 L20,50'),
    'if': ('M-10,-50 L-10,50 M10,-50 L10,50'),
    'new': ('M-20,50 L-20,-50 L20,50 L20,-50'),
    'switch': ('M-30,20 Q-50,0 -30,-20 Q-10,-30 10,-20 Q30,0 10,20 Q-10,30 -30,20'),
    'return': ('M30,-30 L-30,0 L30,30'),
    'while': ('M-30,50 Q-50,0 -30,-50 Q-10,-50 0,-25 Q10,-50 30,-50 Q50,0 30,50 Q10,50 0,25 Q-10,50 -30,50'),
    'with': (''),
    'continue': ('M-30,30 Q-50,0 -30,-30 Q-10,-40 10,-30 Q30,0 10,30 Q-10,40 -30,30'),

    // TODO: add curvature and adjustment to prev or next token
    //'()=>': 'M0,-8 L-6,-6 L-8,0 L-6,6 L0,8 L6,6 L8,0 L6,-6 L0,-8 M-4,-14 L2,0 L-4,14 M0,3 L-8,3 M0,-3 L-8,-3',
};

Object.keys(symbols).forEach(e => { symbols[e] = convertPath(symbols[e]) })

const drawSymbol = (char, group) => {

    const path = symbols[char];
    if (path) {
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', path);
        p.setAttribute('stroke', '#0ff');
        p.setAttribute('stroke-width', 1);
        p.setAttribute('fill', 'none');
        group.appendChild(p);
    } else {
        const t = document.createElementNS(NS, 'text');
        Object.entries({
            x: 0, y: 0,
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            fill: '#ff0'
        }).forEach(([k, v]) => t.setAttribute(k, v));
        t.textContent = char;
        group.appendChild(t);
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

    const totalUnits = tokenData.reduce((sum, t) => sum + t.length, 0);
    const anglePerUnit = 360 / totalUnits;
    let currentAngle = 0;

    tokenData.forEach(({ token, isKeyword, length }) => {
        const tokenAngle = length * anglePerUnit;
        console.log(token, length, currentAngle, tokenAngle)

        if (isKeyword) {
            // Center the keyword symbol in its segment
            const angle = currentAngle + tokenAngle / 2;
            const g = document.createElementNS(NS, 'g');
            g.classList = 'token'
            g.setAttribute('transform', `rotate(${angle}) translate(0,-${radius})`);
            console.log('+')
            drawSymbol(token, g);
            group.appendChild(g);
        } else {
            // Spread characters across the tokenAngle
            const word = document.createElementNS(NS, 'g');
            word.classList = 'word-token'
            word.setAttribute('word', token)

            const step = FONT_SIZE * 50 / radius;
            let angle = currentAngle + (tokenAngle - token.length * step + step) / 2;

            [...token].forEach((char, i) => {
                const g = document.createElementNS(NS, 'g');

                const rq = isNaN(char) ? (char === char.toLowerCase()
                    ? 1         // is default
                    : 0.985     // is uppercase
                ) : 0.975;      // is number

                g.setAttribute('transform', `rotate(${angle}) translate(0,-${radius * rq})`);
                drawSymbol(char, g);
                word.appendChild(g);
                angle += step;
            });
            group.appendChild(word);
        }

        currentAngle += tokenAngle;
    });
}

allBlocks.forEach((block, i, arr) => {
    const angle = (i / arr.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * RING_RADIUS;
    const y = centerY + Math.sin(angle) * RING_RADIUS;

    const g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', `translate(${x},${y})`);
    svg.appendChild(g);

    const lines = block.code.split('\n').map(l => l.trim()).filter(Boolean);

    const radneed = lines.map(line =>
        tokenizeLine(line).reduce((sum, token) =>
            sum + (KEYWORDS.includes(token) ? 1 : token.length) * FONT_SIZE, 0
        ) / (2 * Math.PI)
    );

    const baseRadius = Math.max(RAD_STEP * 2, Math.max(...radneed.map((r, i) => r - i * RAD_STEP)));
    const radii = radneed.map((_, i) => baseRadius + i * RAD_STEP);

    drawGuideCircle(baseRadius - RAD_STEP / 2, g);

    lines.forEach((line, j) => {
        const tokens = tokenizeLine(line);
        if (!tokens.length) return;

        const ring = document.createElementNS(NS, 'g');
        ring.classList = `ring ring-${i}-${j}`
        drawTokenCircle(ring, tokens, radii[j]);
        drawGuideCircle(radii[j] + RAD_STEP / 2, g);
        g.appendChild(ring);
    });
});
