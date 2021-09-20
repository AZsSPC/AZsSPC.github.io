const gc = 21;
const BOMB = -1;
const FLAG = -2;
const EMPTY = 0;
let game;
let tiles = [];
let search = [-1, 1, gc - 1, gc + 1, -1 - gc, 1 - gc, gc, -gc, 0];

function setup(){
    game = document.getElementById('game');
    tiles = new Array(gc ** 2);
    for(let x = 0; x < gc ** 2; x++){
        let tile = document.createElement('span');
        tile.setAttribute('onclick', 'find(' + x + ')');
        tiles[x] = {v: (Math.random() * 100 < 10 ?BOMB :EMPTY), c: false};
        game.append(tile);
    }
    for(let x = 0; x < gc ** 2; x++)
        if(tiles[x].v !== BOMB){
            let b = 0;
            for(let i = 0; i < 8; i++){
                let pos = x + search[i];
                if(pos >= 0 && pos < gc ** 2 && tiles[pos].v === BOMB) b++;
            }
            tiles[x].v = b;
        }
}

function gmc(id = 0){
    switch(id){
        default:
            return '#797979';
        case 0:
            return '#d7d7d7';
        case 1:
            return '#2f4de7';
        case 2:
            return '#1ec205';
        case 3:
            return '#de1c59';
        case 4:
            return '#8d0de0';
        case 5:
            return '#e88d00';
        case 6:
            return '#cd4ead';
        case 7:
            return '#8daf13';
        case 8:
            return '#007d02';
        case BOMB:
            return '#000000';
        case FLAG:
            return '#af8989';
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
    el.setAttribute('onclick', '');
}

function find(id){
    for(let i = 0; i < 9; i++){
        let pos = id + search[i];
        if(pos >= 0 && pos < gc ** 2 && tiles[pos].v !== BOMB){
            if(tiles[pos].v !== EMPTY && !tiles[pos].c) set(pos);
            if(tiles[pos].v === EMPTY) find(pos);
        }
    }
}

setup();