const players = 3;
const gc = 43;
const Q_space = -1;
const Q_wall = -2;
const Q_hint = -3;
const gc_h = (gc / 2).toFixed();
const gc_h_ = (gc / 2 - 1).toFixed();
const start_pos = [
    [906, 942],
    [132, 942, 1680],
    [132, 168, 1716, 1680],
    [476, 153, 942, 1701, 1336],
    [519, 150, 555, 1329, 1698, 1293],
    [519, 146, 334, 942, 1538, 1694, 1293],
    [132, 150, 168, 942, 1716, 1698, 1680, 906]
];
const fm = [-1, -gc, 1, gc];

let querry;
let game;
let tiles = [];

function setup(){
    querry = 0;
    game = document.getElementById('game')
    sep(game, 'background', gmc(querry));

    for(let x = 0; x < gc ** 2; x++){
        let tile = document.createElement('span');
        tile.setAttribute('onclick', 'step(this)');
        tiles.push(tile);
        game.append(tile);
    }
    for(let p = 0; p < players; p++) step(tiles[(start_pos[players - 2][p]).toFixed()], true);
}

function step(el, ignore = false){
    if(!ignore){
        if(gmq(el.innerText) === querry){
            console.log('y')
            return;
        }
        if(gmq(el.innerText) !== Q_hint){
            console.log('a')
            return;
        }
    }
    el.innerText = gms(querry);
    sep(el, 'background', gmc(querry));
    sep(game, 'background', gmc(querry + 1));
    if(++querry >= players) querry = 0;

    for(let x = 0; x < gc ** 2; x++) if(gmq(tiles[x].innerText) === Q_hint) set(x, Q_space)
    for(let x = 0; x < gc ** 2; x++) if(gmq(tiles[x].innerText) === querry) for(let i = 0; i < 4; i++){
        let pos = x + fm[i];
        if(pos >= 0 && gmq(tiles[pos].innerText) === Q_space) set(pos, Q_hint)
    }

}

function set(id, q){
    tiles[id].innerText = gms(q);
    sep(tiles[id], 'background', gmc(q));
}

function sep(el, p, v){
    el.style.setProperty(p, v);
}

function gmc(id = 0){
    if(id === players) id = 0;
    switch(id){
        default:
            return '#ffffff';
        case Q_space:
            return '';
        case Q_wall:
            return '#000000';
        case Q_hint:
            return 'rgba(255,255,255,0.3)';
        case 0:
            return '#db3c52';
        case 1:
            return '#4763ea';
        case 2:
            return '#149200';
        case 3:
            return '#9a1cde';
        case 4:
            return '#00b5cd';
        case 5:
            return '#e88d00';
        case 6:
            return '#cd4ead';
        case 7:
            return '#8daf13';
    }
}

function gms(id = 0){
    if(id === players) id = 0;
    switch(id){
        default:
            return '?';
        case Q_space:
            return '';
        case Q_wall:
            return '#';
        case Q_hint:
            return '+';
        case 0:
            return '0';
        case 1:
            return '1';
        case 2:
            return '2';
        case 3:
            return '3';
        case 4:
            return '4';
        case 5:
            return '5';
        case 6:
            return '6';
        case 7:
            return '7';
    }
}

function gmq(id = '?'){
    switch(id){
        default:
            return Q_wall;
        case '#':
            return Q_wall;
        case '+':
            return Q_hint;
        case '':
            return Q_space;
        case '0':
            return 0;
        case '1':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
    }
}

setup();
