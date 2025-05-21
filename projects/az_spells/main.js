const code = `const a = 5 "asda.sd";const b = (s) => { return [10, 20, 30]; };
const sum = a + b;const message = "Total \`asd\` is: " + sum;`;

const replacements = { 'const': '©' ,' ':''};

const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.font = '16px monospace';
ctx.fillStyle = '#0f0';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const charWidth = 16;
const minRadius = 80;
const layerSpacing = 30;

// Preprocess code lines
const lines = code.split('\n')
    .map(line => {
        for (const [key, val] of Object.entries(replacements)) {
            line = line.replaceAll(key, val);
        }
        return line.trim();
    })
    .filter(Boolean);

// Symbol renderer
function drawSymbol(char) {
    ctx.beginPath();
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 1;

    switch (char) {
        case ':': drawLine(0, 4, 0, 14); drawLine(0, -16, 0, -6); break;
        case ';': drawLine(0, -16, 0, 14); break;
        case ',': drawLine(0, 4, 0, 14); break;
        case '.': drawLine(-5, 14, 0, 6); drawLine(5, 14, 0, 6); break;
        case '"': drawLine(-3, -16, -3, -4); drawLine(3, -16, 3, -4); break;
        case "'": drawLine(0, -16, 0, -4); break;
        case '`': drawLine(-5, -16, 0, -8); drawLine(5, -16, 0, -8); break;
        case '=': drawLine(-3, -16, -3, 14); drawLine(3, -16, 3, 14); break;

        case '©': ctx.moveTo(4, -10); ctx.lineTo(-4, 8); ctx.lineTo(4, 8); ctx.lineTo(-4, -10); ctx.lineTo(4, -10); break;

        case '(': case ')':
            ctx.arc(char === ')' ? -8 : 8, -1, 15,
                char === ')' ? -Math.PI / 2 : Math.PI / 2,
                char === ')' ? Math.PI / 2 : 3 * Math.PI / 2
            ); break;

        case '{': case '}':
            const dir = char === '}' ? -1 : 1;
            ctx.moveTo(dir * 6 - 3, -16); ctx.lineTo(0 - 3, -1); ctx.lineTo(dir * 6 - 3, 14);
            ctx.moveTo(dir * 6 + 3, -16); ctx.lineTo(0 + 3, -1); ctx.lineTo(dir * 6 + 3, 14); break;

        case '[': case ']':
            const dir1 = char === ']' ? -1 : 1;
            ctx.moveTo(dir1 * 6, -16); ctx.lineTo(0, -1); ctx.lineTo(dir1 * 6, 14); break;

        case '<': case '>':
            const dir2 = char === '>' ? -1 : 1;
            ctx.moveTo(dir2 * 6, -10); ctx.lineTo(3, -1); ctx.lineTo(dir2 * 6, 8); ctx.lineTo(dir2 * 6, -12); break;

        default:
            ctx.fillText(char, 0, 0); return;
    }
    ctx.stroke();
}

function drawGuideCircle(radius) {
    ctx.beginPath();
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 1;
    ctx.arc(0, 0, radius + 16, 0, Math.PI * 2);
    ctx.stroke();
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
// Drawing
let radius = minRadius;

lines.forEach(line => {
    const chars = [...line];
    
    // Calculate the radius needed to fit the line
    const arcLength = chars.length * charWidth;
    const requiredRadius = arcLength / (2 * Math.PI);
    radius = Math.max(radius, requiredRadius + 16); // Ensure no overlap

    const angleStep = (2 * Math.PI) / chars.length;
    let angle = 0;

    chars.forEach(char => {
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(0, -radius);
        drawSymbol(char);
        ctx.restore();
        angle += angleStep;
    });

    drawGuideCircle(radius- layerSpacing); // optional visual aid
    radius += layerSpacing; // bump up for next line
});

drawGuideCircle(radius - layerSpacing)
