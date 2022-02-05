const
    game = document.getElementById('game').getContext("2d"),
    iw = document.getElementById('w'),
    ib = document.getElementById('b'),
    TYPE = {EMPTY: 0, VEG: 1, MEAT: 2, FRIEND: 3, ENEMY: 4},
    ROTATE = {U: 0, UR: 1, R: 2, DR: 3, D: 4, DL: 5, L: 6, UL: 7},
    ACTION = {NONE: 0, ACT: 1, RIGHT: 2, LEFT: 3};//ACT - move, bite, eat, birth

let petri = [], width, cof = 1, cell_rad = 1, food_rad = 1, timeout = 100, loop = false, bc, fc = 5;

function setup() {
    width = parseInt(iw.value);
    bc = parseInt(ib.value);
    cof = (1000 / width).toFixed();
    cell_rad = (cof * 0.42).toFixed();
    food_rad = (cof * 0.32).toFixed();
    petri = new Array(width * width);
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
        this.bcs = braincells;
        this.stp = 0;   //witch bc actually working
        this.age = 0;   //age
        this.gen = gen; //generation
        this.way = parseInt((Math.random() * 7).toFixed()); //look at
        this.dna = dna ?? this.randomDNA(this.bcs);

        //family
        this.kin = '#' + parseInt(this.dna.substr(0, 2) + this.dna.substr(5, 2) + this.dna.substr(10, 2), 4).toString(16);
        //age limit
        this.lima = parseInt(this.dna.substr(4, 2) + this.dna.substr(7, 3) + this.dna.substr(14, 1), 4).toString(10);
        //energy limit
        this.lime = parseInt(this.dna.substr(0, 4), 4);
        // divide if energy > than div
        this.div = parseInt(this.dna.substr(10, 4), 4);

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
        let front_type = typeof front === 'object' ? front.kin === this.kin ? TYPE.FRIEND : TYPE.ENEMY : front;
        let action = parseInt(this.dna.substr(55 + this.stp * 5, 5).split('')[front_type]);

        switch (action) {
            case ACTION.RIGHT:
                this.way = (this.way + 1) % 8;
                break;
            case ACTION.LEFT:
                this.way = (this.way + 7) % 8;
                break;
            case ACTION.ACT:
                switch (front_type) {
                    default:
                    case TYPE.EMPTY:
                        petri[next_cell[0]][next_cell[1]] = this;

                        if (this.vis >= this.div) {
                            this.vis = parseInt((this.vis * 0.4).toFixed());
                            petri[x][y] = new Cell(this.bcs, this.gen + 1, this.vis, this.mutateDNA(this.dna));
                        } else petri[x][y] = TYPE.EMPTY;
                        break;
                    case TYPE.FRIEND:
                    case TYPE.ENEMY:
                        petri[next_cell[0]][next_cell[1]].vis -= 10;
                        front.react(next_cell[0], next_cell[1]);
                        break;
                    case TYPE.VEG:
                    case TYPE.MEAT:
                        this.vis += 6;
                        petri[next_cell[0]][next_cell[1]] = this;
                        petri[x][y] = TYPE.EMPTY;
                        break;
                }
                break;
            default:
            case ACTION.NONE:
        }

        this.age++;
        this.vis--;
        this.stp++;
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
        return (Math.random() * 3.5).toFixed();
    }

    prettyDNA() {
        return this.dna.replaceAll(/.{5}/g, '$& ')
    }

    mutateDNA(dna) {
        return Math.random() > 0.5 ? dna : dna.replace(new RegExp('(?<=^.{' + (Math.random() * dna.length).toFixed() + '}).'), this.rg());
    }

    randomDNA(braincells = 1) {
        if (braincells < 1) braincells = 1;
        let DNA = '';
        for (let i = (11 + braincells) * 5; i > 0; i--) DNA += this.rg();
        return DNA;
    }
}

function draw() {
    game.clearRect(0, 0, 1000, 1000);
    game.font = food_rad + "px serif";
    game.lineWidth = 3;
    for (let x = 0; x < width; x++) for (let y = 0; y < width; y++) switch (petri[x][y]) {
        case TYPE.EMPTY:
            continue;
        case TYPE.MEAT:
            game.fillStyle = 'crimson';
            game.beginPath();
            game.arc((x + 0.5) * cof, (y + 0.5) * cof, food_rad, 0, 7);
            game.fill();
            continue;
        case TYPE.VEG:
            game.fillStyle = 'green';
            game.beginPath();
            game.arc((x + 0.5) * cof, (y + 0.5) * cof, food_rad, 0, 7);
            game.fill();
            continue;
        default:
            let r = 0.78 * petri[x][y].way;
            let fx = (x + 0.5) * cof, fy = (y + 0.5) * cof;
            game.fillStyle = petri[x][y].kin;
            game.beginPath();
            game.arc(fx, fy, cell_rad, 0, 7);
            game.fill();
            game.stroke();
            game.fillStyle = 'black';
            game.beginPath();
            game.arc(fx, fy, cell_rad, Math.PI * 1.2 + r, Math.PI * 1.8 + r);
            game.fill();
            game.fillStyle = 'white';
            game.beginPath();
            game.arc(fx, fy, cell_rad, Math.PI * 1.25 + r, Math.PI * 1.75 + r);
            game.fill();
        //game.fillText(petri[x][y].vis + '/' + petri[x][y].div, x * cof, y * cof);
    }

}

function cycle() {
    for (let i = fc; i > 0; i--) {
        let x = parseInt((Math.random() * width * 0.95).toFixed()),
            y = parseInt((Math.random() * width * 0.95).toFixed());
        if (petri[x][y] === TYPE.EMPTY) petri[x][y] = TYPE.VEG;
    }

    for (let x = 0; x < width; x++) for (let y = 0; y < width; y++)
        if (typeof petri[x][y] === 'object') petri[x][y].step(x, y);
    draw();
    return true;
}

function look(x, y) {
    alert(x + ' ' + y + ' ' + petri[y][x]);
}

async function run() {
    loop = true;
    while (cycle() && loop) await new Promise(res => setTimeout(res, timeout));
}

function d2h(d) {
    return (+d).toString(16);
}

function h2d(h) {
    return parseInt(h, 16);
}

setup();
