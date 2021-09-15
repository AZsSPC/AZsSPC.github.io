const players = 2;

let q = 0;
let game = document.getElementById('game');
sep(game, 'background', gmc(q));

for(let x = 0; x < 39 ** 2; x++){
    let tile = document.createElement('span');
    tile.setAttribute('onclick', 'step(this)');
    game.append(tile);
}

function step(el){
    if(el.innerText){

        return;
    }
    el.innerText = gms(q);
    sep(el, 'background', gmc(q));
    sep(el, 'color', 'white');
    sep(game, 'background', gmc(q + 1));
    if(++q >= players) q = 0;
}

function sep(el, p, v){
    el.style.setProperty(p, v);
}

function gmc(id = 0){
    id = id % players;
    switch(id){
        default:
            return '#db3c52';
        case  1:
            return '#4763ea';
        case  2:
            return '#149200';
        case  3:
            return '#c11cde';
        case  4:
            return '#00b5cd';
        case  5:
            return '#e88d00';
        case  6:
            return '#9e9e9e';
        case  7:
            return '#000000';
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