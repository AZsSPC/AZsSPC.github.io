const TAG = {
	WEB: 'WEB',
	ANDROID: 'Android',
	EXAMPLE: 'example',
	PROGRAMMING: 'programming',
	TEX: 'TeX',
	UTIL: 'util',
	REGEX: 'RegEx',
	FOR_ALL: 'for all',
	GAME: 'game',
	MATH: 'math',
	PHYSIC: 'physic',
	SCIENCE: 'science',
}
const PROJECTS = [
	{
		name: 'alchemy',
		path: 'alchemy',
		lore: 'My interpretation of the alchemical games',
		enabled: true, weight: -1,
		tag: [TAG.WEB, TAG.GAME, TAG.FOR_ALL]
	},
	{
		name: 'az_lang',
		path: 'az_lang',
		lore: '',
		enabled: false,
		tag: [TAG.WEB]
	},
	{
		name: 'azembly',
		path: 'azembly',
		lore: '',
		enabled: false,
		tag: [TAG.WEB, TAG.UTIL, TAG.REGEX, TAG.PROGRAMMING]
	},
	{
		name: 'block_schemes',
		path: 'block_schemes',
		lore: '',
		enabled: false,
		tag: [TAG.WEB]
	},
	{
		name: 'electrical_board',
		path: 'electrical_board',
		lore: '',
		enabled: false,
		tag: [TAG.WEB]
	},
	{
		name: 'evo',
		path: 'evo',
		lore: 'Primitive evolution simulator developed in 6h',
		enabled: true,
		tag: [TAG.WEB, TAG.GAME, TAG.SCIENCE]
	},
	{
		name: 'formulaz',
		path: 'formulaz',
		lore: 'A collection of formulas in physics, mathematics and other subjects with a convenient search',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.REGEX, TAG.MATH, TAG.PHYSIC, TAG.SCIENCE]
	},
	{
		name: 'history_line',
		path: 'history_line',
		lore: 'Just a line with branches, what being historical events',
		enabled: false,
		tag: [TAG.WEB, 'history', TAG.SCIENCE, TAG.FOR_ALL]
	},
	{
		name: 'laplas_matrix_helper',
		path: 'laplas_matrix_helper',
		lore: 'This utility will allow you to avoid arithmetic errors, but you do all the actions yourself!\n(saves time, exports the solution in .TeX)',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.TEX, TAG.MATH]
	},
	{
		name: 'layout_translator',
		path: 'layout_translator',
		lore: 'Insert mistyped russian or ukrainian text and receive the right version',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, 'translator', TAG.FOR_ALL]
	},
	{
		name: 'mathaz',
		path: 'mathaz',
		lore: '',
		enabled: false,
		tag: [TAG.WEB]
	},
	{
		name: 'normal_markov_algorithm',
		path: 'normal_markov_algorithm',
		lore: 'Now you can use comfortable normal_markov_algorithm',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.PROGRAMMING]
	},
	{
		name: 'regexp_algorithm',
		path: 'regexp_algorithm',
		lore: 'Same as Normal Markov algorithm, but with RegExp!',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.PROGRAMMING, TAG.REGEX]
	},
	{
		name: 'sapper',
		path: 'sapper',
		lore: 'Almost a classic sapper Game!',
		enabled: true,
		tag: [TAG.WEB, TAG.GAME, TAG.FOR_ALL]
	},
	{
		name: 'score_table',
		path: 'score_table',
		lore: '',
		enabled: true,
		tag: [TAG.WEB]
	},
	{
		name: 'Terr\'ize',
		path: 'seize_territory',
		lore: 'One-device multiplayer game',
		enabled: true,
		tag: [TAG.WEB, TAG.GAME]
	},
	{
		name: 'tattoo_templater',
		path: 'tattoo_templater',
		lore: '',
		enabled: true, weight: 3,
		tag: [TAG.WEB, TAG.UTIL, TAG.FOR_ALL]
	},
	{
		name: 'turing_machine',
		path: 'turing_machine',
		lore: 'Now you can use comfortable turing_machine redactor',
		enabled: true, weight: 5,
		tag: [TAG.WEB, TAG.UTIL, TAG.PROGRAMMING]
	},
	{
		name: 'web_syntax',
		path: 'web_syntax',
		lore: 'Just an online editor with highlighted syntax for different languages',
		enabled: false, weight: 2,
		tag: [TAG.WEB, TAG.UTIL, TAG.REGEX, TAG.PROGRAMMING]
	},
]

let plist = document.getElementById('project_list')

function displayProjects(tags = []) {
	plist.innerHTML = ''
	for (const project of PROJECTS
	.filter(e => e.enabled && tags.every(i => e.tag.includes(i)))
	.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
		) {
		const tile = document.createElement('a')
		tile.classList.add('plist_tile', 'not_a_text')
		tile.href = `/projects/${project.path}/`
		tile.innerHTML = `
		<p class="plist-title" translate="no">${project.name}</p>
		<p class="plist-lore">${project.lore.replaceAll('\n', '<br>')}</p>
		<p class="plist-tags" onclick="return false">${
			project.tag.map((v) => `<button is="az-button" onclick="displayProjects(['${v}'])">${v}</button>`).join('')
		}</p>`

		plist.append(tile)
	}
}

displayProjects()