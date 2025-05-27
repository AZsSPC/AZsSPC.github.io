AZ.locale.languages.en.page = {
	header: '<span>Theres <a is="az-link-button" onclick="displayProjects([])">all</a> my projects! (Which I want to introduce)</span>',
	tagnames: {
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
	},
	projects: {
		alchemy: {
			name: 'Alchemy',
			lore: 'Alchemical game in 4th dimensions\n\n(Inspired by Potion Craft)',
		},
		az_spells: {
			name: 'AZ Spells',
			lore: 'Visualizes JavaScript as animated spell circles\n\nDynamic magic system for TTRPGs',
		},
		evo: {
			name: 'Evo',
			lore: 'Primitive evolution simulator developed in 6h [Updating]',
		},
		history_line: {
			name: 'history_line',
			lore: 'Just a line with branches, what being historical events',
		},
		laplas_matrix_helper: {
			name: 'Laplas Matrix Helper',
			lore: 'This utility will allow you to avoid arithmetic errors, but you do all the actions yourself!\n(saves time, exports the solution in .TeX)',
		},
		layout_translator: {
			name: 'Layout Translator',
			lore: 'Insert mistyped russian or ukrainian text and receive the right version',
		},
		normal_markov_algorithm: {
			name: 'Normal Markov Algorithm',
			lore: 'Now you can use comfortable normal_markov_algorithm',
		},
		regexp_algorithm: {
			name: 'Regexp Algorithm',
			lore: 'Same as Normal Markov algorithm, but with RegExp!',
		},
		sapper: {
			name: 'Sapper',
			lore: 'Almost a classic sapper Game!',
		},
		score_table: {
			name: 'Score Table',
			lore: 'Just some editable score tables',
		},
		seize_territory: {
			name: 'Terr\'ize',
			lore: 'One-device multiplayer game',
		},
		tattoo_templater: {
			name: 'Tattoo Templater',
			lore: 'Helps you to convert any image to simple contour like monochrome tattoo template',
		},
		turing_machine: {
			name: 'Turing Machine',
			lore: 'Now you can use comfortable turing_machine redactor',
		},
		web_syntax: {
			name: 'web_syntax',
			lore: 'Just an online editor with highlighted syntax for different languages',
		},
		dnd_manager: {
			name: 'D&D Manager',
			lore: 'This app will help you as game master or player in managing',
		},
		formulaz: {
			name: 'FormulaZ',
			lore: 'A collection of formulas in physics, mathematics and other subjects with a convenient search',
		},
	},
}

AZ.locale.languages.ru.page = {
	header: '<span>Тут представлены <a is="az-link-button" onclick="displayProjects([])">все</a> мои проекты! (Которые я хочу показать)</span>',
	tagnames: {
		WEB: 'ВЕБ',
		ANDROID: 'Андроид',
		EXAMPLE: 'пример',
		PROGRAMMING: 'програмы',
		TEX: 'TeX',
		UTIL: 'утилиты',
		REGEX: 'RegEx',
		FOR_ALL: 'для всех',
		GAME: 'игра',
		MATH: 'математика',
		PHYSIC: 'физика',
		SCIENCE: 'наука',
	},
	projects: {
		alchemy: {
			name: 'Алхимия',
			lore: 'Алхимическая игра в 4 измерениях\n\n(Вдоновлено Potion Craft)',
		},
		evo: {
			name: 'Эво',
			lore: 'Примитвный эфолюционный симулятор написаный за 6 часов [В разработке]',
		},
		history_line: {
			name: 'Историческая линия',
			lore: 'Просто линии с ветками',
		},
		laplas_matrix_helper: {
			name: 'Помощник по медоту Лапласа',
			lore: 'Эта утилита позволит вам избежать арифметических ошибок, но все действия вы сделаете сами!\n(Экономит время, экспортирует решение в .TeX)',
		},
		layout_translator: {
			name: 'Переводчик раскладок',
			lore: 'Вставьте опечатку на русском или украинском языке и получите правильную версию',
		},
		normal_markov_algorithm: {
			name: 'Нормальный алгоритм Маркова',
			lore: 'Теперь можно легко и просто использовать Нормальный алгоритм Маркова',
		},
		regexp_algorithm: {
			name: 'Алгоритм регулярных выражений',
			lore: 'То же, что обычный алгоритм Маркова, но с RegExp!',
		},
		sapper: {
			name: 'Сапёр',
			lore: 'Почти классическая саперная игра!',
		},
		score_table: {
			name: 'Игровые таблицы',
			lore: 'Просто несколько редактируемых таблиц результатов',
		},
		seize_territory: {
			name: 'Захват територий',
			lore: 'Многопользовательская игра на одном устройстве',
		},
		tattoo_templater: {
			name: 'Шаблонизатор татуировок',
			lore: 'Помогает вам преобразовать любое изображение в простой контур, например монохромный шаблон татуировки',
		},
		turing_machine: {
			name: 'Машина Тьюринга',
			lore: 'Теперь вы можете использовать удобный редактор Машина Тьюринга',
		},
		web_syntax: {
			name: 'Веб синтаксер',
			lore: 'Просто онлайн-редактор с выделенным синтаксисом для разных языков',
		},
		dnd_manager: {
			name: 'D&D менеджер',
			lore: 'Это приложение поможет вам как мастеру игры или игроку в управлении',
		},
		formulaz: {
			name: 'Фурмулки',
			lore: 'Сборник формул по физике, математике и другим предметам с удобным поиском',
		},
	},
}

const TAG = {
	WEB: [AZ.locale.get('page.tagnames.WEB'), 'green'],
	ANDROID: [AZ.locale.get('page.tagnames.ANDROID'), 'green'],
	EXAMPLE: [AZ.locale.get('page.tagnames.EXAMPLE'), 'magenta'],
	PROGRAMMING: [AZ.locale.get('page.tagnames.PROGRAMMING')],
	TEX: [AZ.locale.get('page.tagnames.TEX')],
	UTIL: [AZ.locale.get('page.tagnames.UTIL'), 'magenta'],
	REGEX: [AZ.locale.get('page.tagnames.REGEX')],
	FOR_ALL: [AZ.locale.get('page.tagnames.FOR_ALL')],
	GAME: [AZ.locale.get('page.tagnames.GAME'), 'red'],
	MATH: [AZ.locale.get('page.tagnames.MATH')],
	PHYSIC: [AZ.locale.get('page.tagnames.PHYSIC')],
	SCIENCE: [AZ.locale.get('page.tagnames.SCIENCE')],
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
	new Project(AZ.locale.get('page.projects.alchemy.name'), 'alchemy', true, 0,
		AZ.locale.get('page.projects.alchemy.lore'),
		['WEB', 'GAME', 'FOR_ALL', 'MATH', 'STAR']),

	new Project(AZ.locale.get('page.projects.evo.name'), 'evo', true, 0,
		AZ.locale.get('page.projects.evo.lore'),
		['WEB', 'GAME', 'SCIENCE']),

	new Project(AZ.locale.get('page.projects.history_line.name'), 'history_line', false, 0,
		AZ.locale.get('page.projects.history_line.lore'),
		['WEB', 'history', 'SCIENCE', 'FOR_ALL']),

	new Project(AZ.locale.get('page.projects.laplas_matrix_helper.name'), 'laplas_matrix_helper', true, -2,
		AZ.locale.get('page.projects.laplas_matrix_helper.lore'),
		['WEB', 'UTIL', 'TEX', 'MATH', 'SCIENCE']),

	new Project(AZ.locale.get('page.projects.layout_translator.name'), 'layout_translator', true, 0,
		AZ.locale.get('page.projects.layout_translator.lore'),
		['WEB', 'UTIL', 'translator', 'FOR_ALL']),

	new Project(AZ.locale.get('page.projects.normal_markov_algorithm.name'), 'normal_markov_algorithm', true, 0,
		AZ.locale.get('page.projects.normal_markov_algorithm.lore'),
		['WEB', 'UTIL', 'PROGRAMMING', 'SCIENCE']),

	new Project(AZ.locale.get('page.projects.regexp_algorithm.name'), 'regexp_algorithm', true, 0,
		AZ.locale.get('page.projects.regexp_algorithm.lore'),
		['WEB', 'UTIL', 'PROGRAMMING', 'REGEX', 'SCIENCE']),

	new Project(AZ.locale.get('page.projects.sapper.name'), 'sapper', true, 0,
		AZ.locale.get('page.projects.sapper.lore'),
		['WEB', 'GAME', 'FOR_ALL']),

	new Project(AZ.locale.get('page.projects.score_table.name'), 'score_table', true, 0,
		AZ.locale.get('page.projects.score_table.lore'),
		['WEB']),

	new Project(AZ.locale.get('page.projects.seize_territory.name'), 'seize_territory', true, 0,
		AZ.locale.get('page.projects.seize_territory.lore'),
		['WEB', 'GAME']),

	new Project(AZ.locale.get('page.projects.tattoo_templater.name'), 'tattoo_templater', true, 3,
		AZ.locale.get('page.projects.tattoo_templater.lore'),
		['WEB', 'UTIL', 'FOR_ALL']),

	new Project(AZ.locale.get('page.projects.turing_machine.name'), 'turing_machine', true, 5,
		AZ.locale.get('page.projects.turing_machine.lore'),
		['WEB', 'UTIL', 'PROGRAMMING', 'SCIENCE']),

	new Project(AZ.locale.get('page.projects.web_syntax.name'), 'web_syntax', false, 2,
		AZ.locale.get('page.projects.web_syntax.lore'),
		['WEB', 'UTIL', 'REGEX', 'PROGRAMMING']),

	new Project(AZ.locale.get('page.projects.dnd_manager.name'), 'dnd_manager', false, 0,
		AZ.locale.get('page.projects.dnd_manager.lore'),
		['WEB']),

	//BROKEN OR UNDER DEV

	new Project(AZ.locale.get('page.projects.formulaz.name'), 'formulaz', false, 0,
		AZ.locale.get('page.projects.formulaz.lore'),
		['WEB', 'UTIL', 'REGEX', 'MATH', 'PHYSIC', 'SCIENCE']),

	new Project('mathaz', 'mathaz', false, 0, '', ['WEB']),
	new Project('AZLang', 'az_lang', false, 0, '', ['WEB']),
	new Project('azembly', 'azembly', false, 0, '', ['WEB', 'UTIL', 'REGEX', 'PROGRAMMING']),
	new Project('block_schemes', 'block_schemes', false, 0, '', ['WEB']),
	new Project('electrical_board', 'electrical_board', false, 0, '', ['WEB']),
]

const sw = { 'green': 9, 'magenta': 8, 'purple': 7, 'red': 6, 'blue': 1, 'gray': -1, 'gold': -2 }

Object.keys(TAG).forEach(e => TAG[e] = TAG[e] ? [TAG[e][0], TAG[e][1] ?? 'blue'] : [e, 'gray'])
PROJECTS.forEach(project => project.tag = project.tag.sort((a, b) => {
	const delta = (sw[TAG[b]?.[1] ?? 'blue'] ?? sw.gray) - (sw[TAG[a]?.[1] ?? 'blue'] ?? sw.gray)
	if (delta !== 0) return delta
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

document.querySelector('header').innerHTML = AZ.locale.get('page.header')
displayProjects()