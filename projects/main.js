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
		name: 'Alchemy',
		path: 'alchemy',
		lore: 'My interpretation of the alchemical games',
		enabled: true, weight: 0,
		tag: [TAG.WEB, TAG.GAME, TAG.FOR_ALL, TAG.MATH, TAG.SCIENCE],
	},
	{
		name: 'AZLang',
		path: 'az_lang',
		lore: '',
		enabled: false,
		tag: [TAG.WEB],
	},
	{
		name: 'azembly',
		path: 'azembly',
		lore: '',
		enabled: false,
		tag: [TAG.WEB, TAG.UTIL, TAG.REGEX, TAG.PROGRAMMING],
	},
	{
		name: 'block_schemes',
		path: 'block_schemes',
		lore: '',
		enabled: false,
		tag: [TAG.WEB],
	},
	{
		name: 'electrical_board',
		path: 'electrical_board',
		lore: '',
		enabled: false,
		tag: [TAG.WEB],
	},
	{
		name: 'Evo',
		path: 'evo',
		lore: 'Primitive evolution simulator developed in 6h [Updating]',
		enabled: true,
		tag: [TAG.WEB, TAG.GAME, TAG.SCIENCE],
	},
	{
		name: 'FormulaZ',
		path: 'formulaz',
		lore: 'A collection of formulas in physics, mathematics and other subjects with a convenient search',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.REGEX, TAG.MATH, TAG.PHYSIC, TAG.SCIENCE],
	},
	{
		name: 'history_line',
		path: 'history_line',
		lore: 'Just a line with branches, what being historical events',
		enabled: false,
		tag: [TAG.WEB, 'history', TAG.SCIENCE, TAG.FOR_ALL],
	},
	{
		name: 'Laplas Matrix Helper',
		path: 'laplas_matrix_helper',
		lore: 'This utility will allow you to avoid arithmetic errors, but you do all the actions yourself!\n(saves time, exports the solution in .TeX)',
		enabled: true, weight: -2,
		tag: [TAG.WEB, TAG.UTIL, TAG.TEX, TAG.MATH, TAG.SCIENCE],
	},
	{
		name: 'Layout Translator',
		path: 'layout_translator',
		lore: 'Insert mistyped russian or ukrainian text and receive the right version',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, 'translator', TAG.FOR_ALL],
	},
	{
		name: 'mathaz',
		path: 'mathaz',
		lore: '',
		enabled: false,
		tag: [TAG.WEB],
	},
	{
		name: 'Normal Markov Algorithm',
		path: 'normal_markov_algorithm',
		lore: 'Now you can use comfortable normal_markov_algorithm',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.PROGRAMMING, TAG.SCIENCE],
	},
	{
		name: 'Regexp Algorithm',
		path: 'regexp_algorithm',
		lore: 'Same as Normal Markov algorithm, but with RegExp!',
		enabled: true,
		tag: [TAG.WEB, TAG.UTIL, TAG.PROGRAMMING, TAG.REGEX, TAG.SCIENCE],
	},
	{
		name: 'Sapper',
		path: 'sapper',
		lore: 'Almost a classic sapper Game!',
		enabled: true,
		tag: [TAG.WEB, TAG.GAME, TAG.FOR_ALL],
	},
	{
		name: 'Score Table',
		path: 'score_table',
		lore: 'Just some editable score tables',
		enabled: true,
		tag: [TAG.WEB],
	},
	{
		name: 'Terr\'ize',
		path: 'seize_territory',
		lore: 'One-device multiplayer game',
		enabled: true,
		tag: [TAG.WEB, TAG.GAME],
	},
	{
		name: 'Tattoo Templater',
		path: 'tattoo_templater',
		lore: 'Helps you to convert any image to simple contour like monochrome tattoo template',
		enabled: true, weight: 3,
		tag: [TAG.WEB, TAG.UTIL, TAG.FOR_ALL],
	},
	{
		name: 'Turing Machine',
		path: 'turing_machine',
		lore: 'Now you can use comfortable turing_machine redactor',
		enabled: true, weight: 5,
		tag: [TAG.WEB, TAG.UTIL, TAG.PROGRAMMING, TAG.SCIENCE],
	},
	{
		name: 'web_syntax',
		path: 'web_syntax',
		lore: 'Just an online editor with highlighted syntax for different languages',
		enabled: false, weight: 2,
		tag: [TAG.WEB, TAG.UTIL, TAG.REGEX, TAG.PROGRAMMING],
	},
	{
		name: 'D&D Manager',
		path: 'dnd_manager',
		lore: 'This app will help you as game master or player in managing',
		enabled: false,
		tag: [TAG.WEB],
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
		tile.classList.add('plist_tile')
		tile.href = `/projects/${project.path}/`
		tile.innerHTML = `
		<p class="plist-title" translate="no">${project.name}</p>
		<p class="plist-lore">${project.lore.replaceAll('\n', '<br>')}</p>
		<p class="plist-tags">${
			project.tag.map((v) => `<button is="az-button" color="blue" onclick="displayProjects(['${v}'])">${v}</button>`).join('')
		}</p>`

		plist.append(tile)
	}
}

displayProjects()