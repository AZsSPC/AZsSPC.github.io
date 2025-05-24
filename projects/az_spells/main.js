const code = `
const a = [5];const b = 10;aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
const asdasd = (123,123,1) =>{
    const message = "Hello,\` " + name;    return message;}

const calc = () => {
    let result = a + b;    return result;}

console.log(greet("Alice"), calc());
`;

const svg = document.getElementById('circleSvg');
const NS = svg.namespaceURI;
const centerX = svg.clientWidth / 2;
const centerY = svg.clientHeight / 2;

const functionRegex = /const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{[\s\S]*?}/g;

const functionBlocks = [...code.matchAll(functionRegex)].map(m => m[0]);
const globalCode = code.replace(functionRegex, '').trim();
const allBlocks = [{ label: 'main', code: globalCode }, ...functionBlocks.map((fn, i) => ({ label: `fn-${i + 1}`, code: fn }))];

function tokenizeLine(line) {
    return line.match(/(\w+|=>|==|===|!=|!==|<=|>=|&&|\|\||[{}():;,.`+\-*/=<>[\]])/g) || [];
}

function drawTokenCircle(group, tokens, radius) {
    const allChars = tokens.flatMap(t => [...t]);
    const angleStep = 360 / allChars.length;
    let charIndex = 0;

    tokens.forEach(token => {
        [...token].forEach(char => {
            const angle = charIndex * angleStep;
            const g = document.createElementNS(NS, 'g');
            g.setAttribute('transform', `rotate(${angle}) translate(0,-${radius})`);
            drawSymbol(char, g);
            group.appendChild(g);
            charIndex++;
        });
    });
}

function drawGuideCircle(radius, group) {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', radius);
    c.setAttribute('cx', 0);
    c.setAttribute('cy', 0);
    c.setAttribute('stroke', '#0f0');
    c.setAttribute('stroke-width', 1);
    c.setAttribute('fill', 'none');
    group.appendChild(c);
}

function drawSymbol(char, group) {
    let path = '';
    switch (char) {
        case ':': path = 'M-5,-14 L0,-6 L5,-14 M-5,14 L0,6 M5,14 L0,6'; break;
        case ';': path = 'M-5,-14 L0,-6 L5,-14 M0,4 L0,14'; break;
        case ',': path = 'M0,4 L0,14'; break;
        case '.': path = 'M-5,14 L0,6 M5,14 L0,6'; break;
        case '"': path = 'M-3,-14 L-3,-4 M3,-14 L3,-4'; break;
        case "'": path = 'M0,-14 L0,-4'; break;
        case '`': path = 'M-5,-14 L0,-6 L5,-14'; break;
        case '=': path = 'M-3,-14 L-3,14 M3,-14 L3,14'; break;

        case '©': path = 'M4,-10 L-4,8 L4,8 L-4,-10 L4,-10'; break;

        case '(': path = `M4,-14 L-2,0 L4,14`; break;
        case ')': path = `M-4,-14 L2,0 L-4,14`; break;

        case '{': path = `M4,-14 L-2,0 L4,14 M-2,-8 L4,0 L-2,8`; break;
        case '}': path = `M-4,-14 L2,0 L-4,14 M2,8 L-4,0 L2,-8`; break;

        case '[': path = `M4,-14 L-2,0 L4,14 M-2,-8 L6,-8 M-2,8 L6,8`; break;
        case ']': path = `M-4,-14 L2,0 L-4,14 M2,-8 L-6,-8 M2,8 L-6,8`; break;

        case '<': path = `M6,-8 L3,0 L6,8 L6,-8`; break;
        case '>': path = `M-6,-8 L3,0 L-6,8 L-6,-8`; break;

        default: {
            const t = document.createElementNS(NS, 'text');
            t.setAttribute('x', 0);
            t.setAttribute('y', 0);
            t.setAttribute('text-anchor', 'middle');
            t.setAttribute('dominant-baseline', 'middle');
            t.setAttribute('fill', '#ff0');
            t.textContent = char;
            group.appendChild(t);
            return;
        }
    }

    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', path);
    p.setAttribute('stroke', '#0ff');
    p.setAttribute('stroke-width', 1);
    p.setAttribute('fill', 'none');
    group.appendChild(p);
}

allBlocks.forEach((block, i) => {
    const g = document.createElementNS(NS, 'g');
    const angle = (i / allBlocks.length) * 2 * Math.PI;
    const r = 250;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    g.setAttribute('transform', `translate(${x},${y})`);
    svg.appendChild(g);

    let layerR = 50;
    block.code.split('\n').map(l => l.trim()).filter(Boolean).forEach(line => {
        const tokens = tokenizeLine(line);
        if (!tokens.length) return;

        const ring = document.createElementNS(NS, 'g');
        drawTokenCircle(ring, tokens, layerR);
        drawGuideCircle(layerR - 14, g);
        g.appendChild(ring);
        layerR += 28;
    });

    drawGuideCircle(layerR - 14, g);
});
