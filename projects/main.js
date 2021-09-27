const SETTINGS = [
    {
        name: 'Web Syntax',
        path: 'Web Syntax',
        lore: 'Just an online editor with highlighted syntax that anyone can change.',
        enabled: true,
        tag: ['web', 'regex', 'programming']
    },
    {
        name: 'Formulaz!',
        path: 'FormulaZ',
        lore: 'A collection of formulas in physics, mathematics and other subjects with a convenient search',
        enabled: true,
        tag: ['web', 'regex', 'programming']
    },
    {
        name: 'History Line',
        path: 'History Line',
        lore: 'Just a line with branches, what being historical events',
        enabled: true,
        tag: ['web', 'regex', 'programming']
    },
    {
        name: 'Terr\'ize!',
        path: 'Seize Territory',
        lore: 'One-device multiplayer game',
        enabled: true,
        tag: ['web', 'regex', 'programming']
    }
];
const TILE = '<p translate="no">#name</p><p>#lore</p><p>#tag</p>';
let plist = document.getElementById('project_list')
for(let i in SETTINGS){
    let a = SETTINGS[i];
    if(a.enabled){
        let tile = document.createElement('div');
        tile.className = 'plist_tile';
        tile.setAttribute('onclick', 'window.location.href=\'https://AZsSPC.github.io/projects/' + a.path + '\'');
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