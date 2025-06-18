(function () {
	const header = document.createElement('header');

	const widthLabel = document.createElement('label');
	widthLabel.className = 'az-input-button';
	widthLabel.setAttribute('color', 'purple');
	widthLabel.textContent = 'Width ';
	const widthInput = document.createElement('input');
	widthInput.id = 'w';
	widthInput.type = 'number';
	widthInput.min = '10';
	widthInput.max = '100';
	widthInput.step = '1';
	widthInput.value = '20';
	widthLabel.appendChild(widthInput);

	const heightLabel = document.createElement('label');
	heightLabel.className = 'az-input-button';
	heightLabel.setAttribute('color', 'purple');
	heightLabel.textContent = 'Height ';
	const heightInput = document.createElement('input');
	heightInput.id = 'h';
	heightInput.type = 'number';
	heightInput.min = '10';
	heightInput.max = '100';
	heightInput.step = '1';
	heightInput.value = '20';
	heightLabel.appendChild(heightInput);

	const bombsLabel = document.createElement('label');
	bombsLabel.className = 'az-input-button';
	bombsLabel.textContent = 'Bombs percentage ';
	const bombsInput = document.createElement('input');
	bombsInput.id = 'b';
	bombsInput.type = 'number';
	bombsInput.min = '5';
	bombsInput.max = '60';
	bombsInput.step = '1';
	bombsInput.value = '21.8';
	bombsLabel.appendChild(bombsInput);

	const setButton = document.createElement('button');
	setButton.className = 'az-button';
	setButton.setAttribute('color', 'gold');
	setButton.textContent = 'SET';
	setButton.onclick = setup;

	header.appendChild(widthLabel);
	header.appendChild(heightLabel);
	header.appendChild(bombsLabel);
	header.appendChild(setButton);

	const main = document.createElement('main');
	const gameDiv = document.createElement('div');
	gameDiv.id = 'game';
	gameDiv.className = 'unselectable';
	main.appendChild(gameDiv);

	document.body.appendChild(header);
	document.body.appendChild(main);
})();

const game = document.getElementById('game'),
	BOMB = -2,
	FLAG = -3,
	EMPTY = -1,
	iw = document.getElementById('w'),
	ih = document.getElementById('h'),
	ib = document.getElementById('b')
let tiles = [],
	width,
	height,
	bomb_percentage,
	bntp

function setup() {
	width = parseInt(iw.value)
	height = parseInt(ih.value)
	bomb_percentage = parseInt(ib.value) / 100
	bntp = true
	document.documentElement.style.setProperty('--gc', width + '')
	tiles = new Array(width * height)
	game.innerHTML = ''
	for (let x = 0; x < width * height; x++) {
		tiles[x] = { v: 0, c: true, f: false }
		let tile = document.createElement('span')
		tile.addEventListener('click', (e) => { find(x); e.preventDefault(); return false })
		tile.addEventListener('contextmenu', (e) => { mark(x); e.preventDefault(); return false })
		game.append(tile)
	}
}

function placeBombs(taboo) {
	let bombs_left = (width * height * bomb_percentage).toFixed()
	let tarr = getAround(taboo)
	while (bombs_left > 0) {
		let r = parseInt((Math.random() * (width * height - 1)).toFixed())
		let carr = [...tarr, ...getAround(r)]
		if (tiles[r].v === 0 && r !== taboo && carr.length === [...new Set(carr)].length) {
			tiles[r].v = BOMB
			bombs_left--
		}
	}
	for (let x = 0; x < width * height; x++) if (tiles[x].v !== BOMB)
		tiles[x].v = getAround(x).reduce((n, id) => tiles[id].v === BOMB ? n + 1 : n, 0)

	bntp = false
}

function gmc(id = 0) {
	if (id === 0) return '#C7C7C7'
	if (id === 1) return '#2F4DE7'
	if (id === 2) return '#1EC205'
	if (id === 3) return '#DE1C59'
	if (id === 4) return '#8D0DE0'
	if (id === 5) return '#E88D00'
	if (id === 6) return '#CD4EAD'
	if (id === 7) return '#8DAF13'
	if (id === 8) return '#007D02'
	if (id === BOMB) return 'linear-gradient(45deg, red, #ffc800)'
	if (id === FLAG) return 'linear-gradient(45deg, white, #ffad33)'

	return '#797979'
}

function gms(id = 0) {
	if (id === 0) return ''
	if (id === BOMB) return '*'
	if (id === FLAG) return '?'

	return id + ''
}

function set(id) {
	let el = game.children[id]
	tiles[id].c = false
	el.innerText = gms(tiles[id].v)
	el.style.setProperty('background', gmc(tiles[id].v))
	el.removeEventListener('click', null)
	if (tiles[id].v === BOMB) {
		lose()

		return false
	}
	return true
}

function lose() {
	for (let id = 0; id < width * height; id++) {
		const el = game.children[id]
		el.removeEventListener('click', null)
		el.removeEventListener('contextmenu', null)
		if (tiles[id].v === BOMB) {
			tiles[id].f = !tiles[id].f
			el.innerText = tiles[id].f ? gms(BOMB) : ''
			el.style.setProperty('background', gmc(tiles[id].f ? BOMB : EMPTY))
		}
	}
	setTimeout(() => alert('You lose'), 1)
}

function mark(id) {
	if (!tiles[id].c) return

	let el = game.children[id]
	tiles[id].f = !tiles[id].f
	el.innerText = tiles[id].f ? gms(FLAG) : ''
	el.style.setProperty('background', gmc(tiles[id].f ? FLAG : EMPTY))
}

function find(id) {
	if (bntp) placeBombs(id)
	if (!(tiles[id].c && !tiles[id].f && set(id) && tiles[id].v === 0))
		return

	for (let pos of getAround(id))
		setTimeout(() => find(pos), 0)
}

function getAround(num) {
	let nh = getH(num),
		nw = num % width
	let a = [//
		(nh === getH(num - 1)) ? num - 1 : -1, //
		(nh === getH(num + 1)) ? num + 1 : -1, //
		(nw === (num - width) % width) ? num - width : -1, //
		(nw === (num + width) % width) ? num + width : -1, //
		(nw === (num - width - 1) % width + 1 && nh === getH(num - width - 1) + 1) ? num - width - 1 : -1, //
		(nw === (num - width + 1) % width - 1 && nh === getH(num - width + 1) + 1) ? num - width + 1 : -1, //
		(nw === (num + width - 1) % width + 1 && nh === getH(num + width - 1) - 1) ? num + width - 1 : -1, //
		(nw === (num + width + 1) % width - 1 && nh === getH(num + width + 1) - 1) ? num + width + 1 : -1 //

	]
	for (let i = 0; i < a.length; i++) if (a[i] < 0 || a[i] >= width * height) a.splice(i--, 1)
	//a.forEach((e) => game.children[e].setAttribute('style', 'border-color:red!important'));
	return a
}

function getH(num) {
	return parseInt(('' + (num / width)).replaceAll(/\..*/g, ''))
}

setup()