const gc = 21;
const BOMB = -1;
const FLAG = -2;
const EMPTY = 0;
let game= document.getElementById('game');
let tiles = [];
let search = [-1, 1, gc - 1, gc + 1, -1 - gc, 1 - gc, gc, -gc, 0];

function setup(){
	tiles = new Array(gc ** 2);
	game.innerText = '';
	for(let x = 0; x < gc ** 2; x++){
		let tile = document.createElement('span');
		tile.setAttribute('onclick', 'find(' + x + ')');
		tile.setAttribute('oncontextmenu', 'mark(' + x + ');return false');
		tiles[x] = {
			v:EMPTY,
			c:false
		};
		game.append(tile);
	}
	let bombs_left = (gc ** 2 * .218).toFixed();
	while(bombs_left > 0){
		console.log(bombs_left)
		let r = (Math.random() * (gc ** 2)).toFixed();
		if(tiles[r].v === EMPTY){
			tiles[r].v = BOMB;
			bombs_left--
		}
	}
	for(let x = 0; x < gc ** 2; x++) if(tiles[x].v !== BOMB){
		let b = 0;
		for(let i = 0; i < 8; i++){
			let pos = x + search[i];
			if(pos >= 0 && pos < gc ** 2 && tiles[pos].v === BOMB){
				b++;
			}
		}
		tiles[x].v = b;
	}
}

function gmc(id = 0){
	switch(id){
	default:
		return '#797979';
	case 0:
		return '#B2B2B2';
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
		return '#000000';
	case FLAG:
		return '#FFFFFF';
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
	tiles[id].c = true;
	el.innerText = gms(tiles[id].v);
	el.style.setProperty('background', gmc(tiles[id].v));
	el.removeAttribute('onclick');
	if(tiles[id].v === BOMB){ alert('You lose'); }
}

function mark(id){
	let el = game.children[id];
	el.innerText = gms(FLAG);
	el.style.setProperty('background', gmc(FLAG));
}

function find(id){
	if(!tiles[id].c){
		set(id);
		if(tiles[id].v === EMPTY){
			for(let i = 0; i < 9; i++){
				let pos = id + search[i];
				if(pos >= 0 && pos < gc ** 2 && !tiles[pos].c){ setTimeout(() => find(pos), 0); }
			}
		}
	}
}

setup();