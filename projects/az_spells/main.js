const code = `
const a = [5];
const b = 10;
const asdasd = (123,123,1) =>{
    const message = "Hello,\` " + name;    return message;}
const calc = ()=> {
    let result = a + b;    return result;}
console.log(greet("Alice"), calc());
`;

const svg = document.getElementById('circleSvg');
const NS = svg.namespaceURI;
const centerX = svg.clientWidth / 2;
const centerY = svg.clientHeight / 2;

const RING_RADIUS = 250;
const FONT_SIZE = 16;
const RAD_STEP = 28;
const KEYWORDS = ['const', 'let', 'var', '()', '=>'];

const functionBlocks = [...code.matchAll(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{[\s\S]*?}/g)].map(m => m[0]);
const globalCode = code.replace(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{[\s\S]*?}/g, '').trim();

const allBlocks = [
    { label: 'main', code: globalCode },
    ...functionBlocks.map((fn, i) => ({ label: `fn-${i + 1}`, code: fn }))
];

const tokenizeLine = line =>
    line.match(/(\(\)|\[\]|=>|==|===|!=|!==|<=|>=|&&|\|\||[{}():;,.`+\-*/=<>\[\]]|\w+)/g) || [];

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

const drawSymbol = (char, group) => {
    const symbols = {
        // characters
        ':': 'M-5,-14 L0,-6 L5,-14 M-5,14 L0,6 M5,14 L0,6',
        ';': 'M-5,-14 L0,-6 L5,-14 M0,4 L0,14',
        ',': 'M0,4 L0,14',
        '.': 'M-5,14 L0,6 M5,14 L0,6',
        '"': 'M-3,-14 L-3,-4 M3,-14 L3,-4',
        "'": 'M0,-14 L0,-4',
        '`': 'M-5,-14 L0,-6 L5,-14',
        '=': 'M-3,-14 L-3,14 M3,-14 L3,14',
        // braces
        '(': 'M4,-14 L-2,0 L4,14',
        ')': 'M-4,-14 L2,0 L-4,14',
        '{': 'M4,-14 L-2,0 L4,14 M-2,-8 L4,0 L-2,8',
        '}': 'M-4,-14 L2,0 L-4,14 M2,8 L-4,0 L2,-8',
        '[': 'M4,-14 L-2,0 L4,14 M-2,-8 L6,-8 M-2,8 L6,8',
        ']': 'M-4,-14 L2,0 L-4,14 M2,-8 L-6,-8 M2,8 L-6,8',
        '<': 'M6,-8 L3,0 L6,8 L6,-8',
        '>': 'M-6,-8 L3,0 L-6,8 L-6,-8',
        // keywords
        'const': 'M4,-10 L-4,8 L4,8 L-4,-10 L4,-10 M-8,0 L8,0',
        'let': 'M4,-10 L-4,8 L4,8 L-4,-10 L4,-10',
        // ligatures
        '()': 'M0,-8 Q-8,-8 -8,0 Q-8,8 0,8 Q8,8 8,0 Q8,-8 0,-8',
        // '()': 'M0,-8 L-6,-6 L-8,0 L-6,6 L0,8 L6,6 L8,0 L6,-6 L0,-8',
        '=>': 'M-4,-14 L2,0 L-4,14 M0,3 L-8,3 M0,-3 L-8,-3',

        // TODO: add curvature and adjustment to prev or next token
        //'()=>': 'M0,-8 L-6,-6 L-8,0 L-6,6 L0,8 L6,6 L8,0 L6,-6 L0,-8 M-4,-14 L2,0 L-4,14 M0,3 L-8,3 M0,-3 L-8,-3',
    };

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

            const step = FONT_SIZE * RAD_STEP * 2 / radius;
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

    const baseRadius = Math.max(...radneed.map((r, i) => r - i * RAD_STEP));
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
