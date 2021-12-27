const game  = document.getElementById('game'),
	  BOMB  = -2,
	  FLAG  = -3,
	  EMPTY = -1,
	  iw    = document.getElementById('w'),
	  ih    = document.getElementById('h'),
	  ib    = document.getElementById('b');
let tiles = [],
	width,
	height,
	bomb_percentage,
	bntp;

function setup(){
	width = parseInt(iw.value);
	height = parseInt(ih.value);
	bomb_percentage = parseInt(ib.value) / 100;
	bntp = true;
	document.documentElement.style.setProperty('--gc', width + '');
	tiles = new Array(width * height);
	game.innerHTML = '';
	for(let x = 0; x < width * height; x++){
		tiles[x] = {
			v:0,
			c:true,
			f:false
		};
		let tile = document.createElement('span');
		tile.setAttribute('onclick', 'find(' + x + ')');
		tile.setAttribute('oncontextmenu', 'mark(' + x + ');return false');
		game.append(tile);
	}
}

function placeBombs(taboo){
	let bombs_left = (width * height * bomb_percentage).toFixed();
	let tarr = getAround(taboo);
	while(bombs_left > 0){
		let r = parseInt((Math.random() * (width * height - 1)).toFixed());
		let carr = [...tarr, ...getAround(r)];
		if(tiles[r].v === 0 && r !== taboo && carr.length === [...new Set(carr)].length){
			tiles[r].v = BOMB;
			bombs_left--;
		}
	}
	for(let x = 0; x < width * height; x++) if(tiles[x].v !== BOMB){
		let b = 0;
		getAround(x).forEach((pos) => {if(tiles[pos].v === BOMB) b++});
		tiles[x].v = b;
	}
	bntp = false;
}

function gmc(id = 0){
	switch(id){
	default:
		return '#797979';
	case 0:
		return '#C7C7C7';
	case 1:
		return '#2F4DE7';
	case 2:
		return '#1EC205';
	case 3:
		return '#DE1C59';
	case 4:
		return '#8D0DE0';
	case 5:
		return '#E88D00';
	case 6:
		return '#CD4EAD';
	case 7:
		return '#8DAF13';
	case 8:
		return '#007D02';
	case BOMB:
		return 'linear-gradient(45deg, red, #ffc800)';
	case FLAG:
		return 'linear-gradient(45deg, white, #ffad33)';
	}
}

function gms(id = 0){
	switch(id){
	default:
		return id + '';
	case 0:
		return '';
	case BOMB:
		return '*';
	case FLAG:
		return '?';
	}
}

function set(id){
	let el = game.children[id];
	tiles[id].c = false;
	el.innerText = gms(tiles[id].v);
	el.style.setProperty('background', gmc(tiles[id].v));
	el.removeAttribute('onclick');
	if(tiles[id].v === BOMB){
		setTimeout(() => {
			alert('You lose');
			setup();
		}, 10);
		return false;
	}
	return true;
}

function mark(id){
	if(tiles[id].c){
		let el = game.children[id];
		tiles[id].f = !tiles[id].f;
		el.innerText = tiles[id].f ?gms(FLAG) :'';
		el.style.setProperty('background', gmc(tiles[id].f ?FLAG :EMPTY));
	}
}

function find(id){
	if(bntp) placeBombs(id);
	if(tiles[id].c && !tiles[id].f && set(id)) if(tiles[id].v === 0) for(let pos of getAround(id)) setTimeout(() => find(pos), 0);
}

function getAround(num){
	let nh = getH(num),
		nw = num % width;
	let a = [//
		(nh === getH(num - 1)) ?num - 1 :-1, //
		(nh === getH(num + 1)) ?num + 1 :-1, //
		(nw === (num - width) % width) ?num - width :-1, //
		(nw === (num + width) % width) ?num + width :-1, //
		(nw === (num - width - 1) % width + 1 && nh === getH(num - width - 1) + 1) ?num - width - 1 :-1, //
		(nw === (num - width + 1) % width - 1 && nh === getH(num - width + 1) + 1) ?num - width + 1 :-1, //
		(nw === (num + width - 1) % width + 1 && nh === getH(num + width - 1) - 1) ?num + width - 1 :-1, //
		(nw === (num + width + 1) % width - 1 && nh === getH(num + width + 1) - 1) ?num + width + 1 :-1 //

	];
	for(let i = 0; i < a.length; i++) if(a[i] < 0 || a[i] >= width * height) a.splice(i--, 1);
	//a.forEach((e) => game.children[e].setAttribute('style', 'border-color:red!important'));
	return a;
}

function getH(num){
	return parseInt(('' + (num / width)).replaceAll(/\..*/g, ''));
}

setup();