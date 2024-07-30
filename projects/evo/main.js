const
	game = document.getElementById('game'),
	game_ctx = game.getContext('2d'),
	iw = document.getElementById('w'),
	ib = document.getElementById('b'),
	DEFGENES = 12, MUTATE_COUNT = 3, MUTATE_CHANCE = 0.1,
	TYPE = {EMPTY: 0, VEG: 1, MEAT: 2, KIN: 3, CELL: 4, GARBAGE: 5, A: 6, B: 7},
	ROTATE = {U: 0, UR: 1, R: 2, DR: 3, D: 4, DL: 5, L: 6, UL: 7},
	ACTION = {NONE: 0, MOVE: 1, RIGHT: 2, LEFT: 3, EAT: 4, HIT: 5, A: 6, B: 7}//ACT - move, bite, eat, birth

let petri = [], width, cof, cell_rad, pul_rad, food_rad, bc, fc = 5, id_counter, lineW,
	target = {id: 1, type: 4}, fixer = false, steps

function setup() {
	steps = 0
	AZ.loop = false
	loop_change_view()
	width = parseInt(iw.value)
	bc = parseInt(ib.value)
	cof = 1000 / width | 0
	cell_rad = cof * 0.4 | 0
	food_rad = cof * 0.3 | 0
	lineW = cof >> 4 | 0
	pul_rad = cof >> 1
	petri = new Array(width * width)
	id_counter = 0
	for (let x = 0; x < width; x++) {
		petri[x] = []
		for (let y = 0; y < width; y++) {
			petri[x][y] = Math.random() < .3 ? new Cell(bc) : Math.random() < .3 ? TYPE.VEG : TYPE.EMPTY
		}
	}
	draw()
}

//action  < > ^ -
class Cell {
	constructor(braincells = 1, gen = 0, vis = null, dna = null) {
		this.id = id_counter++
		this.fixer = fixer
		this.bcs = braincells
		this.stp = 0   //witch bc actually working
		this.age = 0   //age
		this.gen = gen //generation
		this.way = Math.random() * 7 | 0 //look at
		this.dna = dna ?? this.randomDNA(this.bcs)

		//family
		this.kin = '#' + parseInt(this.dna.substr(0, 4), 8).toString(16)
		//age limit
		this.lima = parseInt(this.dna.substr(4, 3), 8).toString(10)
		//energy limit
		this.lime = parseInt(this.dna.substr(7, 3), 8)
		// divide if energy > than div
		this.div = parseInt(this.dna.substr(10, 3), 8)

		this.vis = Math.min(this.lime, vis ?? this.div - 1) //energy
		//this.prettyLog();
	}

	step(x, y) {
		if (this.vis < 1 || this.age > this.lima) {
			this.die(x, y)
			return
		}
		if (this.stp >= this.bcs) this.stp = 0

		let next_cell = this.next_from(x, y, this.way)
		let front = petri[next_cell[0]][next_cell[1]]
		let front_type = typeof front === 'object' ? front.kin === this.kin ? TYPE.KIN : TYPE.CELL : front
		let action = parseInt(this.dna.substr((DEFGENES + this.stp) * 8, 8).split('')[front_type])

		switch (action) {
			case ACTION.RIGHT:
				this.way = (this.way + 1) % 8
				this.vis--
				break
			case ACTION.LEFT:
				this.way = (this.way + 7) % 8
				this.vis--
				break
			case ACTION.MOVE:
				if (front_type === TYPE.EMPTY || front_type === TYPE.VEG || front_type === TYPE.MEAT) {
					petri[next_cell[0]][next_cell[1]] = this

					if (this.vis >= this.div) {
						this.vis = this.vis * 0.4 | 0
						petri[x][y] = new Cell(this.bcs, this.gen + 1, this.vis, this.mutateDNA(this.dna))
					} else {
						petri[x][y] = TYPE.EMPTY
						this.vis--
					}
				}
				break
			case ACTION.EAT:
				if (front_type === TYPE.VEG || front_type === TYPE.MEAT) {
					this.vis += 5
					petri[next_cell[0]][next_cell[1]] = this
					petri[x][y] = TYPE.EMPTY
				}
				break
			case ACTION.HIT:
				if (front_type === TYPE.KIN || front_type === TYPE.CELL) {
					petri[next_cell[0]][next_cell[1]].vis -= 10
					front.react(next_cell[0], next_cell[1])
					this.vis -= 3
				} else if (front_type === TYPE.VEG || front_type === TYPE.MEAT) {
					petri[next_cell[0]][next_cell[1]] = TYPE.EMPTY
				}
				break
			default:
			case ACTION.NONE:
				this.vis--
		}

		this.age++
		this.stp++
		this.fixer = fixer
	}

	react(x, y) {
		if (this.vis < 1) this.die(x, y)
	}

	die(x, y) {
		petri[x][y] = TYPE.MEAT
	}

	next_from(x, y, r) {
		let fx, fy
		switch (r) {
			default:
			case ROTATE.U:
				fx = x
				fy = y - 1
				break
			case ROTATE.UR:
				fx = x + 1
				fy = y - 1
				break
			case ROTATE.R:
				fx = x + 1
				fy = y
				break
			case ROTATE.DR:
				fx = x + 1
				fy = y + 1
				break
			case ROTATE.D:
				fx = x
				fy = y + 1
				break
			case ROTATE.DL:
				fx = x - 1
				fy = y + 1
				break
			case ROTATE.L:
				fx = x - 1
				fy = y
				break
			case ROTATE.UL:
				fx = x - 1
				fy = y - 1
				break
		}
		if (fx < 0) fx += width
		else if (fx >= width) fx = fx % width
		if (fy < 0) fy += width
		else if (fy >= width) fy = fy % width

		return [fx, fy]
	}

	rg() {
		return Math.random() * 8 | 0
	}

	prettyLog() {
		let f = 'color:'
		let t = this.dna.match(/(\d{4})(\d{3})(\d{3})(\d{3})(\d{3})(\d+)/)
		let a = this.vis / this.lime, b = this.age / this.lima, c = this.vis / this.div
		console.log('%c        val\t|\tmax\t| val/max'
			+ '\n%cenergy: %c' + this.vis + '\t|\t' + this.lime + '\t| ' + (a * 100 | 0) + '%%'
			+ '\n%c   age: %c' + this.age + '\t|\t' + this.lima + '\t| ' + (b * 100 | 0) + '%%'
			+ '\n%c   div: %c' + this.vis + '\t|\t' + this.div + '\t| ' + (c * 100 | 0) + '%%'
			+ '\n%creduct: %c' + t[5]
			+ '\n%c breed: %c' + this.gen
			+ '\n%c    id: %c' + this.id
			+ '\n%c  %c kin: %c' + this.kin.substr(1) + ' : ' + this.dna.substr(0, 4)
			//{EMPTY: 0, VEG: 1, MEAT: 2, KIN: 3, CELL: 4, GARBAGE: 5, A: 6, B: 7},
			+ '\n\n%c    | %c   %c | %c   %c | %c   %c | CEL | %c   %c |  ?  |  ? %c'
			+ t[6].replaceAll(/(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/g, '\n$1 | $2 | $3 | $4 | $5 | $6 | $7 | $8')
			.replaceAll(0, '   ')
			.replaceAll(1, 'MOV')
			.replaceAll(2, ' > ')
			.replaceAll(3, ' < ')
			.replaceAll(4, 'EAT')
			.replaceAll(5, 'BIT')
			.replaceAll(6, '   ')
			.replaceAll(7, '   ')
			+ '\n\n%c' + this.dna,

			f + '#888',
			'', f + (a < 0.3 ? 'coral' : a < 0.7 ? 'gold' : 'limegreen'),
			'', f + (b > 0.3 ? 'coral' : b > 0.7 ? 'gold' : 'limegreen'),
			'', f + (c < 0.3 ? 'coral' : c < 0.7 ? 'gold' : 'limegreen'),
			'', f + '#888',
			'', f + '#888',
			'', f + '#888',
			'background:' + this.kin, '', f + 'gold',
			f + '#888', 'background:green',
			f + '#888', 'background:crimson',
			f + '#888', 'background:' + this.kin,
			f + '#888', 'background:gold',
			f + '#888',
			f + '#a7d',
			f + '#888'
		)
	}

	mutateDNA(dna) {
		let new_dna = dna
		for (let i = MUTATE_COUNT; i > 0; i--) if (Math.random() > MUTATE_CHANCE)
			new_dna = new_dna.replace(new RegExp('(?<=^.{' + (Math.random() * dna.length | 0) + '}).'), this.rg())
		return new_dna
	}

	randomDNA(braincells = 1) {
		if (braincells < 1) braincells = 1
		let DNA = ''
		for (let i = (DEFGENES + braincells) * 8; i > 0; i--) DNA += this.rg()
		return DNA
	}
}

function draw() {
	if (AZ.timeout < 10 && steps % 10 !== 0) return
	let tx = -1, ty = -1
	game_ctx.clearRect(0, 0, 1000, 1000)
	game_ctx.font = food_rad + 'px serif'
	for (let x = 0; x < width; x++) for (let y = 0; y < width; y++) switch (petri[x][y]) {
		case TYPE.EMPTY:
			continue
		case TYPE.MEAT:
			game_ctx.fillStyle = 'crimson'
			game_ctx.beginPath()
			game_ctx.arc((x + 0.5) * cof, (y + 0.5) * cof, food_rad, 0, 7)
			game_ctx.fill()
			continue
		case TYPE.VEG:
			game_ctx.fillStyle = 'green'
			game_ctx.beginPath()
			game_ctx.arc((x + 0.5) * cof, (y + 0.5) * cof, food_rad, 0, 7)
			game_ctx.fill()
			continue
		default:
			game_ctx.lineWidth = 1
			game_ctx.strokeStyle = 'black'
			let r = 0.78 * petri[x][y].way
			let fx = (x + 0.5) * cof, fy = (y + 0.5) * cof
			game_ctx.fillStyle = petri[x][y].kin
			game_ctx.beginPath()
			game_ctx.arc(fx, fy, cell_rad, 0, 7)
			game_ctx.fill()
			game_ctx.stroke()
			game_ctx.fillStyle = 'black'
			game_ctx.beginPath()
			game_ctx.arc(fx, fy, cell_rad, 3.768 + r, 5.652 + r)
			game_ctx.fill()
			game_ctx.fillStyle = 'white'
			game_ctx.beginPath()
			game_ctx.arc(fx, fy, cell_rad, 3.925 + r, 5.495 + r)
			game_ctx.fill()
			//game.fillText(petri[x][y].vis + '/' + petri[x][y].div, x * cof, y * cof);
			if (target.type === TYPE.CELL && target.id === petri[x][y].id) {
				tx = x
				ty = y
			}
	}
	if (target.type !== TYPE.CELL) {
		tx = target.x
		ty = target.y
	}
	game_ctx.lineWidth = lineW
	game_ctx.strokeStyle = 'gold'
	game_ctx.beginPath()
	game_ctx.arc((tx + 0.5) * cof, (ty + 0.5) * cof, pul_rad, 0, 7)
	game_ctx.stroke()
}

function cycle() {
	fixer = !fixer
	for (let i = fc; i > 0; i--) {
		let x = Math.random() * width | 0, y = Math.random() * width | 0
		if (petri[x][y] === TYPE.EMPTY) petri[x][y] = TYPE.VEG
	}

	for (let x = 0; x < width; x++) for (let y = 0; y < width; y++)
		if (typeof petri[x][y] === 'object' && petri[x][y].fixer !== fixer) petri[x][y].step(x, y)
	draw()
	steps++
	return true
}

function look(x, y) {
	alert(x + ' ' + y + ' ' + petri[y][x])
}

AZ.run = async function () {
	AZ.loop = true
	while (AZ.loop && cycle()) await new Promise(res => setTimeout(res, AZ.timeout))
	loop_change_view()
}

function d2h(d) {
	return (+d).toString(16)
}

function h2d(h) {
	return parseInt(h, 16)
}

function screen_clicked(e) {
	let rect = e.target.getBoundingClientRect(),
		x = (e.clientX - rect.left) / game.offsetWidth * 1000 / cof | 0,
		y = (e.clientY - rect.top) / game.offsetHeight * 1000 / cof | 0
	target = typeof petri[x][y] === 'object' ? {id: petri[x][y].id, type: TYPE.CELL} : {x: x, y: y, type: -TYPE.CELL}
	draw()
	if (typeof petri[x][y] === 'object') petri[x][y].prettyLog()
}

on_keys_action(loop_click, 'KeyP')
on_keys_action(cycle, 'KeyS')
on_keys_action(setup, 'KeyR')

game.addEventListener('click', e => {
	screen_clicked(e)
	e.preventDefault()
})

loop_change_view(false)
setup()