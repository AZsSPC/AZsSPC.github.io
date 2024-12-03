const TAG = {
	WEB: ['WEB', 'green'],
	ANDROID: ['Android', 'green'],
	EXAMPLE: ['example', 'magenta'],
	PROGRAMMING: ['programming'],
	TEX: ['TeX'],
	UTIL: ['util', 'magenta'],
	REGEX: ['RegEx'],
	FOR_ALL: ['for all'],
	GAME: ['game', 'red'],
	MATH: ['math'],
	PHYSIC: ['physic'],
	SCIENCE: ['science'],
	CROWN: ['***', 'gold'],
	STAR: ['*', 'gold'],
}


class Project {
	constructor(name = 'Test', path = 'test', enabled = false, weight = 0, lore = '', tag = []) {
		this.name = name
		this.path = path
		this.lore = lore
		this.enabled = enabled
		this.weight = weight
		this.tag = tag
	}
}

const PROJECTS = [
	new Project('Alchemy', 'alchemy', true, 0,
		'Alchemical game in 4th dimensions\n\n(Inspired by PotionCraft)',
		['WEB', 'GAME', 'FOR_ALL', 'MATH', 'STAR']),

	new Project('Evo', 'evo', true, 0,
		'Primitive evolution simulator developed in 6h [Updating]',
		['WEB', 'GAME', 'SCIENCE']),

	new Project('history_line', 'history_line', false, 0,
		'Just a line with branches, what being historical events',
		['WEB', 'history', 'SCIENCE', 'FOR_ALL']),

	new Project('Laplas Matrix Helper', 'laplas_matrix_helper', true, -2,
		'This utility will allow you to avoid arithmetic errors, but you do all the actions yourself!\n(saves time, exports the solution in .TeX)',
		['WEB', 'UTIL', 'TEX', 'MATH', 'SCIENCE']),

	new Project('Layout Translator', 'layout_translator', true, 0,
		'Insert mistyped russian or ukrainian text and receive the right version',
		['WEB', 'UTIL', 'translator', 'FOR_ALL']),

	new Project('Normal Markov Algorithm', 'normal_markov_algorithm', true, 0,
		'Now you can use comfortable normal_markov_algorithm',
		['WEB', 'UTIL', 'PROGRAMMING', 'SCIENCE']),

	new Project('Regexp Algorithm', 'regexp_algorithm', true, 0,
		'Same as Normal Markov algorithm, but with RegExp!',
		['WEB', 'UTIL', 'PROGRAMMING', 'REGEX', 'SCIENCE']),

	new Project('Sapper', 'sapper', true, 0,
		'Almost a classic sapper Game!',
		['WEB', 'GAME', 'FOR_ALL']),

	new Project('Score Table', 'score_table', true, 0,
		'Just some editable score tables',
		['WEB']),

	new Project('Terr\'ize', 'seize_territory', true, 0,
		'One-device multiplayer game',
		['WEB', 'GAME']),

	new Project('Tattoo Templater', 'tattoo_templater', true, 3,
		'Helps you to convert any image to simple contour like monochrome tattoo template',
		['WEB', 'UTIL', 'FOR_ALL']),

	new Project('Turing Machine', 'turing_machine', true, 5,
		'Now you can use comfortable turing_machine redactor',
		['WEB', 'UTIL', 'PROGRAMMING', 'SCIENCE']),

	new Project('web_syntax', 'web_syntax', false, 2,
		'Just an online editor with highlighted syntax for different languages',
		['WEB', 'UTIL', 'REGEX', 'PROGRAMMING']),

	new Project('D&D Manager', 'dnd_manager', false, 0,
		'This app will help you as game master or player in managing',
		['WEB']),

//BROKEN OR UNDER DEV

	new Project('FormulaZ', 'formulaz', false, 0,
		'A collection of formulas in physics, mathematics and other subjects with a convenient search',
		['WEB', 'UTIL', 'REGEX', 'MATH', 'PHYSIC', 'SCIENCE']),

	new Project('mathaz', 'mathaz', false, 0, '', ['WEB']),
	new Project('AZLang', 'az_lang', false, 0, '', ['WEB']),
	new Project('azembly', 'azembly', false, 0, '', ['WEB', 'UTIL', 'REGEX', 'PROGRAMMING']),
	new Project('block_schemes', 'block_schemes', false, 0, '', ['WEB']),
	new Project('electrical_board', 'electrical_board', false, 0, '', ['WEB']),
]

const sw = {'green': 9, 'magenta': 8, 'purple': 7, 'red': 6, 'blue': 1, 'gray': -1, 'gold': -2}

Object.keys(TAG).forEach(e => TAG[e] = TAG[e] ? [TAG[e][0], TAG[e][1] ?? 'blue'] : [e, 'gray'])
PROJECTS.forEach(project => project.tag = project.tag.sort((a, b) => {
	const weightA = sw[TAG[a]?.[1] ?? 'blue'] ?? sw.gray
	const weightB = sw[TAG[b]?.[1] ?? 'blue'] ?? sw.gray
	if (weightA !== weightB) return weightB - weightA
	return a[0].localeCompare(b[0])
}))

function displayProjects(tags = []) {
	const plist = document.getElementById('project_list')
	plist.innerHTML = ''

	PROJECTS.filter(
		project => project.enabled && (tags.length === 0 || tags.every(tag => project.tag.includes(tag))),
	)
		.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
		.forEach(project => {
			const tile = document.createElement('a')
			tile.className = 'plist_tile'
			if (project.tag.includes('CROWN') || project.tag.includes('STAR')) tile.classList.add('gold')
			tile.href = `/projects/${project.path}/`
			tile.innerHTML = `
				<p class="plist-title" translate="no">${project.name}</p>
				<p class="plist-lore">${project.lore.replaceAll('\n', '<br>')}</p>
				<p class="plist-tags">
			${project.tag.map(tag => {
				const [text, color] = TAG[tag] ?? [tag, 'gray']
				return `<button is="az-button" color="${color}" onclick="displayProjects(['${tag}']);return false;">${text}</button>`
			}).join('')}
				</p>`
			plist.appendChild(tile)
		})
}

displayProjects()