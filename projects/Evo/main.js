const
    game = document.getElementById('game'),
    game_ctx = game.getContext("2d"),
    iw = document.getElementById('w'),
    ib = document.getElementById('b'),
    pb = document.getElementById('pause'),
    DEFGENES = 12, MUTATE_COUNT = 3, MUTATE_CHANCE = 0.3,
    TYPE = {EMPTY: 0, VEG: 1, MEAT: 2, KIN: 3, CELL: 4, GARBAGE: 5},
    ROTATE = {U: 0, UR: 1, R: 2, DR: 3, D: 4, DL: 5, L: 6, UL: 7},
    ACTION = {NONE: 0, ACT: 1, RIGHT: 2, LEFT: 3};//ACT - move, bite, eat, birth

let petri = [], width, cof, cell_rad, food_rad, timeout = 100, loop = false, bc, fc = 5, id_counter, lineW,
    target = {id: 1, type: 4}, fixer = false;

function setup() {
    loop = false;
    width = parseInt(iw.value);
    bc = parseInt(ib.value);
    cof = (1000 / width) | 0;
    cell_rad = (cof * 0.4) | 0;
    food_rad = (cof * 0.3) | 0;
    lineW = (cof / 25) | 0;
    petri = new Array(width * width);
    id_counter = 0;
    for (let x = 0; x < width; x++) {
        petri[x] = [];
        for (let y = 0; y < width; y++) {
            petri[x][y] = Math.random() < .3 ? new Cell(bc) : Math.random() < .3 ? TYPE.VEG : TYPE.EMPTY;
        }
    }
    draw()
}

//action  < > ^ -
class Cell {
    constructor(braincells = 1, gen = 0, vis = null, dna = null) {
        this.id = id_counter++;
        this.fixer = fixer;
        this.bcs = braincells;
        this.stp = 0;   //witch bc actually working
        this.age = 0;   //age
        this.gen = gen; //generation
        this.way = parseInt((Math.random() * 7) | 0); //look at
        this.dna = dna ?? this.randomDNA(this.bcs);

        //family
        this.kin = '#' + parseInt(this.dna.substr(0, 6), 4).toString(16);
        //age limit
        this.lima = parseInt(this.dna.substr(6, 6), 4).toString(10);
        //energy limit
        this.lime = parseInt(this.dna.substr(12, 4), 4);
        // divide if energy > than div
        this.div = parseInt(this.dna.substr(16, 4), 4);

        this.vis = Math.min(this.lime, vis ?? this.div - 1); //energy
    }

    step(x, y) {
        if (this.vis < 1 || this.age > this.lima) {
            this.die(x, y);
            return;
        }
        if (this.stp >= this.bcs) this.stp = 0;

        let next_cell = this.next_from(x, y, this.way);
        let front = petri[next_cell[0]][next_cell[1]];
        let front_type = typeof front === 'object' ? front.kin === this.kin ? TYPE.KIN : TYPE.CELL : front;
        let action = parseInt(this.dna.substr(55 + this.stp * 5, 5).split('')[front_type]);

        switch (action) {
            case ACTION.RIGHT:
                this.way = (this.way + 1) % 8;
                this.vis--;
                break;
            case ACTION.LEFT:
                this.way = (this.way + 7) % 8;
                this.vis--;
                break;
            case ACTION.ACT:
                switch (front_type) {
                    default:
                    case TYPE.EMPTY:
                        petri[next_cell[0]][next_cell[1]] = this;

                        if (this.vis >= this.div) {
                            this.vis = parseInt((this.vis * 0.4) | 0);
                            petri[x][y] = new Cell(this.bcs, this.gen + 1, this.vis, this.mutateDNA(this.dna));
                        } else {
                            petri[x][y] = TYPE.EMPTY;
                            this.vis--;
                        }
                        break;
                    case TYPE.KIN:
                    case TYPE.CELL:
                        petri[next_cell[0]][next_cell[1]].vis -= 10;
                        front.react(next_cell[0], next_cell[1]);
                        this.vis -= 3;
                        break;
                    case TYPE.VEG:
                    case TYPE.MEAT:
                        this.vis += 5;
                        petri[next_cell[0]][next_cell[1]] = this;
                        petri[x][y] = TYPE.EMPTY;
                        break;
                }
                break;
            default:
            case ACTION.NONE:
                this.vis--;
        }

        this.age++;
        this.stp++;
        this.fixer = fixer;
    }

    react(x, y) {
        if (this.vis < 1) this.die(x, y);
    }

    die(x, y) {
        petri[x][y] = TYPE.MEAT;
    }

    next_from(x, y, r) {
        let fx, fy
        switch (r) {
            default:
            case ROTATE.U:
                fx = x;
                fy = y - 1;
                break;
            case ROTATE.UR:
                fx = x + 1;
                fy = y - 1;
                break;
            case ROTATE.R:
                fx = x + 1;
                fy = y;
                break;
            case ROTATE.DR:
                fx = x + 1;
                fy = y + 1;
                break;
            case ROTATE.D:
                fx = x;
                fy = y + 1;
                break;
            case ROTATE.DL:
                fx = x - 1;
                fy = y + 1;
                break;
            case ROTATE.L:
                fx = x - 1;
                fy = y;
                break;
            case ROTATE.UL:
                fx = x - 1;
                fy = y - 1;
                break;
        }
        if (fx < 0) fx += width; else if (fx >= width) fx = fx % width;
        if (fy < 0) fy += width; else if (fy >= width) fy = fy % width;

        return [fx, fy];
    }

    rg() {
        return (Math.random() * 3.5) | 0;
    }

    prettyDNA() {
        return this.dna.replaceAll(/.{5}/g, '$& ')
    }

    mutateDNA(dna) {
        let new_dna = dna;
        for (let i = MUTATE_COUNT; i > 0; i++) if (Math.random() > MUTATE_CHANCE)
            new_dna = new_dna.replace(new RegExp('(?<=^.{' + (Math.random() * dna.length) | 0 + '}).'), this.rg());
        return new_dna;
    }

    randomDNA(braincells = 1) {
        if (braincells < 1) braincells = 1;
        let DNA = '';
        for (let i = (DEFGENES + braincells) * 5; i > 0; i--) DNA += this.rg();
        return DNA;
    }
}

function draw() {
    let tx = -1, ty = -1;
    game_ctx.clearRect(0, 0, 1000, 1000);
    game_ctx.font = food_rad + "px serif";
    for (let x = 0; x < width; x++) for (let y = 0; y < width; y++) switch (petri[x][y]) {
        case TYPE.EMPTY:
            continue;
        case TYPE.MEAT:
            game_ctx.fillStyle = 'crimson';
            game_ctx.beginPath();
            game_ctx.arc((x + 0.5) * cof, (y + 0.5) * cof, food_rad, 0, 7);
            game_ctx.fill();
            continue;
        case TYPE.VEG:
            game_ctx.fillStyle = 'green';
            game_ctx.beginPath();
            game_ctx.arc((x + 0.5) * cof, (y + 0.5) * cof, food_rad, 0, 7);
            game_ctx.fill();
            continue;
        default:
            game_ctx.lineWidth = 1;
            game_ctx.strokeStyle = 'black';
            let r = 0.78 * petri[x][y].way;
            let fx = (x + 0.5) * cof, fy = (y + 0.5) * cof;
            game_ctx.fillStyle = petri[x][y].kin;
            game_ctx.beginPath();
            game_ctx.arc(fx, fy, cell_rad, 0, 7);
            game_ctx.fill();
            game_ctx.stroke();
            game_ctx.fillStyle = 'black';
            game_ctx.beginPath();
            game_ctx.arc(fx, fy, cell_rad, 3.768 + r, 5.652 + r);
            game_ctx.fill();
            game_ctx.fillStyle = 'white';
            game_ctx.beginPath();
            game_ctx.arc(fx, fy, cell_rad, 3.925 + r, 5.495 + r);
            game_ctx.fill();
            //game.fillText(petri[x][y].vis + '/' + petri[x][y].div, x * cof, y * cof);
            if (target.type === TYPE.CELL && target.id === petri[x][y].id) {
                tx = x;
                ty = y;
            }
    }
    if (target.type !== TYPE.CELL) {
        tx = target.x;
        ty = target.y
    }
    game_ctx.lineWidth = lineW;
    game_ctx.strokeStyle = 'gold';
    game_ctx.beginPath();
    game_ctx.arc((tx + 0.5) * cof, (ty + 0.5) * cof, cof / 2, 0, 7);
    game_ctx.stroke();
}

function cycle() {
    fixer = !fixer;
    for (let i = fc; i > 0; i--) {
        let x = parseInt((Math.random() * width * 0.95) | 0),
            y = parseInt((Math.random() * width * 0.95) | 0);
        if (petri[x][y] === TYPE.EMPTY) petri[x][y] = TYPE.VEG;
    }

    for (let x = 0; x < width; x++) for (let y = 0; y < width; y++)
        if (typeof petri[x][y] === 'object' && petri[x][y].fixer !== fixer) petri[x][y].step(x, y);
    draw();
}

function look(x, y) {
    alert(x + ' ' + y + ' ' + petri[y][x]);
}

function run() {
    loop = true;

    (function loopF() {
        cycle();
        if (loop) setTimeout(loopF, timeout);
    })();
}

function d2h(d) {
    return (+d).toString(16);
}

function h2d(h) {
    return parseInt(h, 16);
}

function loop_click() {
    if (loop) {
        pb.innerText = '|>';
        pb.className = 'b-btn';
        loop = false;
    } else {
        pb.className = 'r-btn';
        pb.innerText = '||';
        run();
    }
}

function screen_clicked(e) {
    let rect = e.target.getBoundingClientRect(),
        x = ((e.clientX - rect.left) / game.offsetWidth * 1000 / cof - 0.5) | 0,
        y = ((e.clientY - rect.top) / game.offsetHeight * 1000 / cof - 0.5) | 0;
    target = typeof petri[x][y] === 'object' ? {id: petri[x][y].id, type: TYPE.CELL} : {x: x, y: y, type: -TYPE.CELL};
    draw();
}

runOnKeys(loop_click, "KeyP");
runOnKeys(cycle, "KeyS");
runOnKeys(setup, "KeyR");

game.addEventListener("click", screen_clicked);
setup();
/*
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += 10 * blobs[i].r / d;
      }
      set(x, y, sum>240&&sum<255?color(sum,sum,sum):color(0,0,0));
      * */