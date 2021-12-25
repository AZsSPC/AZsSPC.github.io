const SETTINGS = [{
	name:'Web Syntax',
	path:'Web Syntax',
	lore:'Just an online editor with highlighted syntax for different languages.',
	enabled:true,
	tag:['web', 'regex', 'programming']
}, {
	name:'Formulaz!',
	path:'FormulaZ',
	lore:'A collection of formulas in physics, mathematics and other subjects with a convenient search',
	enabled:true,
	tag:['web', 'regex', 'programming']
}, {
	name:'History Line',
	path:'History Line',
	lore:'Just a line with branches, what being historical events',
	enabled:true,
	tag:['web', 'history', 'science']
}, {
	name:'Terr\'ize!',
	path:'Seize Territory',
	lore:'One-device multiplayer game',
	enabled:true,
	tag:['web', 'game']
}, {
	name:'Ghbdtn translator',
	path:'Ghbdtn translator',
	lore:'Translate "Djn nfrjq ntrcn" to normal\n\n(For russian)',
	enabled:true,
	tag:['web', 'util', 'translator']
}, {
	name:'Matrix Helper',
	path:'Matrix Laplas Helper',
	lore:'This utility will allow you to avoid arithmetic errors, but you do all the actions yourself!\n(saves time, exports the solution in .TeX)',
	enabled:true,
	tag:['web', 'util', 'TeX', 'math']
}, {
	name:'Azembly',
	path:'Azembly',
	lore:'Azembly',
	enabled:true,
	tag:['web', 'util']
}, {
	name:'Turing Machine',
	path:'Turing Machine',
	lore:'Now you can use comfortable Turing Machine redactor',
	enabled:true,
	tag:['web', 'util']
}];
const TILE = '<p translate="no">#name</p><p>#lore</p><p>#tag</p>';
let plist = document.getElementById('project_list')
for(let i in SETTINGS){
	let a = SETTINGS[i];
	if(a.enabled){
		let tile = document.createElement('a');
		tile.className = 'plist_tile not_a_text';
		tile.href = 'https://AZsSPC.github.io/projects/' + a.path;
		tile.innerHTML = TILE
		.replace(/#name/gm, a.name)
		.replace(/#lore/gm, a.lore)
		.replace(/#alt/gm, a.name)
		.replace(/#tag/gm, getTags(a.tag))
		//.replace(/#img/gm, 'https://AZsSPC.github.io/projects/' + a.path + '/faz_ic.png"')
		.replaceAll('\n', '<br>');
		plist.append(tile);
	}
}

function getTags(tags = []){
	let sb = '';
	for(let i in tags) sb += '<button>' + tags[i] + '</button>';
	return sb;
}