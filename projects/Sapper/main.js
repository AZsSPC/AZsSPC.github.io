const players = 2;
let q = 0;
let game = document.getElementById('game');
for(let x = 0; x < 63 * 32; x++){
    let tile = document.createElement('span');
    tile.setAttribute('onclick', 'step(this)');
    tile.innerText = '+';
    game.append(tile);
}

function step(el){
    el.innerText = gms(q);
    sep(el, 'background', gmc(q));
    sep(el, 'color', 'white');
    sep(game, 'border', 'dotted 5px #' + gmc(q + 1));
    if(++q >= players) q = 0;
}

function sep(el, p, v){
    el.style.setProperty(p, v);
}

function gmc(id = 0){
    id = id % players;
    switch(id){
        default:
            return '#ff6f85';
        case  1:
            return '#95f';
        case  2:
            return '#9af';
        case  3:
            return '#9a0';
        case  4:
            return '#f0a';
        case  5:
            return '#ff5';
        case  6:
            return '#b0a';
        case  7:
            return '#84e';
    }
}

function gms(id = 0){
    id = id % players;
    switch(id){
        default:
            return '0';
        case  1:
            return '1';
        case  2:
            return '2';
        case  3:
            return '3';
        case  4:
            return '4';
        case  5:
            return '5';
        case  6:
            return '6';
        case  7:
            return '7';
    }
}