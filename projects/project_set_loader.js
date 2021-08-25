const SETTINGS = [
    {
        'name': 'Web Syntax',
        'path': 'Web Syntax',
        'lore': 'asdgsdads da',
        'enabled': false
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    },
    {
        'name': 'Formulaz!',
        'path': 'FormulaZ',
        'lore': 'as das da',
        'enabled': true
    }
];
const TILE = '<p class="fw">#name</p><p>asd</p><p class="comment">click to go to project</p>';
let plist = document.getElementById('project_list')
for(let i in SETTINGS){
    let a = SETTINGS[i];
    if(a.enabled){
        let tile = document.createElement('div');
        tile.className = 'plist_tile';
        tile.style.background = 'url("https://AZsSPC.github.io/projects/' + a.path + '/icon.png") no-repeat';
        tile.style.backgroundSize = '100px 100px'
        tile.innerHTML = TILE.replace(/#name/gm, a.name).replace(/#lore/gm, a.lore);
        plist.append(tile);
    }
}