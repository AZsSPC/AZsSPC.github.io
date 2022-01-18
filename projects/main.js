const TILE = '<p translate="no">#name</p><p>#lore</p><p class="tags" onclick="return false">#tag</p>',
    WEB = 'WEB',
    ANDROID = 'Android',
    EXAMPLE = 'example',
    PROGRAMMING = 'programming',
    TEX = 'TeX',
    UTIL = 'util',
    REGEX = 'RegEx',
    FOR_ALL = 'for all',
    GAME = 'game',
    MATH = 'math',
    PHYSIC = 'physic',
    SCIENCE = 'science',
    PROJECTS = [//
        {
            name: 'Web Syntax',
            path: 'Web Syntax',
            lore: 'Just an online editor with highlighted syntax for different languages',
            enabled: true,
            tag: [WEB, UTIL, REGEX, PROGRAMMING]
        }, {
            name: 'Ghbdtn translator',
            path: 'Ghbdtn translator',
            lore: 'Translate "Djn nfrjq ntrcn" to normal\n\n(For russians)',
            enabled: true,
            tag: [WEB, UTIL, 'translator', FOR_ALL]
        }, {
            name: 'Normal Markov Algorithm',
            path: 'Normal Markov Algorithm',
            lore: 'Now you can use comfortable Normal Markov Algorithm',
            enabled: true,
            tag: [WEB, UTIL, PROGRAMMING]
        }, {
            name: 'Turing Machine',
            path: 'Turing Machine',
            lore: 'Now you can use comfortable Turing Machine redactor',
            enabled: true,
            tag: [WEB, UTIL, PROGRAMMING]
        }, {
            name: 'Formulaz!',
            path: 'FormulaZ',
            lore: 'A collection of formulas in physics, mathematics and other subjects with a convenient search',
            enabled: true,
            tag: [WEB, UTIL, REGEX, MATH, PHYSIC, SCIENCE]
        }, {
            name: 'Sapper',
            path: 'Sapper',
            lore: 'Almost a classic Sapper Game!',
            enabled: true,
            tag: [WEB, GAME, FOR_ALL]
        }, {
            name: 'Matrix Helper',
            path: 'Matrix Laplas Helper',
            lore: 'This utility will allow you to avoid arithmetic errors, but you do all the actions yourself!\n(saves time, exports the solution in .TeX)',
            enabled: true,
            tag: [WEB, UTIL, TEX, MATH]
        }, {
            name: 'Azembly',
            path: 'Azembly',
            lore: 'Azembly',
            enabled: true,
            tag: [WEB, UTIL, REGEX, PROGRAMMING]
        }, {
            name: 'History Line',
            path: 'History Line',
            lore: 'Just a line with branches, what being historical events',
            enabled: true,
            tag: [WEB, 'history', SCIENCE, FOR_ALL]
        }, {
            name: 'Terr\'ize!',
            path: 'Seize Territory',
            lore: 'One-device multiplayer game',
            enabled: true,
            tag: [WEB, GAME]
        }],
    TILES_PER_LIST = 24;
let plist = document.getElementById('project_list');

function displayProjects(page = 0, tags = []) {
    console.log(page, tags)
    plist.innerHTML = '';
    let counter = 1 - page * TILES_PER_LIST;
    for (let a of PROJECTS) if (a.enabled && [...new Set([...tags, ...a.tag])].length === a.tag.length) {
        if (counter > 0) {
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
        if (counter++ >= TILES_PER_LIST) break;
    }
    if (page > 0) {
        let pp = document.createElement('button');
        pp.innerText = '<- Go to the previous page';
        pp.onclick = function () {
            displayProjects(page - 1, tags)
        };
        plist.append(pp);
    } else plist.append(document.createElement('div'));
    if (counter++ >= TILES_PER_LIST) {
        let np = document.createElement('button');
        np.innerText = 'Go to the next page ->';
        np.onclick = function () {
            displayProjects(page + 1, tags)
        };
        plist.append(np);
    }
}

function getDisplayTag(tag_name) {
    return '<button onclick="displayProjects(0,[\'' + tag_name + '\'])">' + tag_name + '</button>';/*
	switch(tag_name){
	default:
		return '<button onclick="displayProjects(0,[\'' + tag_name + '\'])">' + tag_name + '</button>';
	case WEB:
		return getImgTag(tag_name, 'https://lh3.googleusercontent.com/proxy/2N1F5EyrhmN19s3cdTxsrd_IZVoAPnqWGMBQy_tzydVC122rYTe3hstPnCYPIFFiBTdBYQ91NYk-3vdUK7oCY98o8mIySZUNz3uRexNH9JqZV1U3_qLVf-K0wR5v2-ndPuE6FX38BQ');
		//case GAME:		return getImgTag(tag_name, 'https://ps.w.org/customizing/assets/icon-256x256.png?rev=2157706');
	case ANDROID:
		return getImgTag(tag_name, 'https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/OS_Android.png');
	case TEX:
		return getImgTag(tag_name, 'https://cdn-icons-png.flaticon.com/128/5105/5105744.png');
		//case REGEX:		return getImgTag(tag_name, 'https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/github-artemanufrij-regextester-icon.png');
		//case PROGRAMMING:		return getImgTag(tag_name, 'https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/OS_Android.png');
	}*/
}

function getImgTag(tag_name, img_src) {
    return '<span tag="' + tag_name + '" onclick="displayProjects(0,[\'' + tag_name + '\'])"><img alt="' + tag_name + '" src="' + img_src + '"></span>';
}

function getTags(tags = []) {
    let sb = '';
    for (let i in tags) sb += getDisplayTag(tags[i]);
    return sb;
}

displayProjects(0, [])