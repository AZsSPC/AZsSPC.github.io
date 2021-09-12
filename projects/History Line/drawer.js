let line = document.getElementById('line');

const _EVENTS = [
    /*{
     "location": [{w:0-360deg,h:0-180deg}],     область, где произошло событие; указывается точками, по часовой стрелке
     "year_start": 0,                           начало событи0я
     "year_end": 2,                             конец событи0я
     "title": "Title",                          заголовок
     "lore_short": "short lore",                краткое описание
     "lore": "full lore about event",           полное поисание
     "tags": []                                 теги; регистр игнорируется
     *   - тег
     P_* - человек, относящийся к событию
     N_* - страна, относящаяся к событию
     D_* - документ относящийся к событию
     E_* - другое событие, относящееся к данному

     }*/
    {
        "location": [],
        "year_start": 0,
        "year_end": 20,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 30,
        "year_end": 80,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 10,
        "year_end": 50,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 4,
        "year_end": 11,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 12,
        "year_end": 30,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 60,
        "year_end": 100,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }, {
        "location": [],
        "year_start": 50,
        "year_end": 60,
        "title": "Title",
        "lore_short": "short lore",
        "lore": "full lore about event",
        "tags": []
    }
];
let levels;

function isOverlaps(s1, e1, s2, e2){
    return s1 < e2 && s2 < e1;
}

function draw(events){
    levels = [];
    let bys = 0;
    let bye = 0;
    for(let i in events){
        let ev = events[i];
        if(ev.year_start < bys) bys = ev.year_start;
        if(ev.year_end > bye) bye = ev.year_end;
        let deep = 0;
        let torf = true;
        if(levels[deep] == null){
            levels.push([{'s': ev.year_start, 'e': ev.year_end, 'a': 1}]);
            torf = false;
        }else for(let j = -1; j < levels[deep].length; j++){
            if(levels[deep][j] != null) if(isOverlaps(ev.year_start, ev.year_end, levels[deep][j].s, levels[deep][j].e)){
                deep++;
                j = -1;
            }
            if(levels[deep] == null){
                levels.push([{'s': ev.year_start, 'e': ev.year_end, 'a': 2}]);
                torf = false;
                break;
            }
        }
        if(torf) levels[deep].push({'s': ev.year_start, 'e': ev.year_end, 'a': 3});
        events[i].level = deep;

    }

    console.log(levels)
    let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    group.classList.add('h-line');
    group.innerHTML += '<path d="M-9999 0 l99999 0"/>';
    line.append(group);
    for(let i in events){
        let ev = events[i];
        let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        group.setAttribute('onclick', 'alert("' + ev.title + ' (' + ev.year_start + '-' + ev.year_end + ')' + '\\n' + ev.lore + '")')
        let color = getRandomBrightColor();
        group.setAttribute('stroke', color)
        let s = ev.year_start * 10;
        let l = ev.year_end * 10;
        let ph = (ev.level + 1) * 32;

        group.innerHTML += '<text class="event-line-t" x="' + (s + 5) + '" y="' + (ph - 6) + '" class="small" fill="' + color + '">' + ev.title + '</text>';
        group.innerHTML += '<path class="event-line-s" d="M' + s + ' 0 l0 ' + ph + '"/>';
        group.innerHTML += '<path class="event-line-s" d="M' + l + ' 0 l0 ' + ph + '"/>';
        group.innerHTML += '<path class="event-line" d="M' + (s - 2) + ' ' + ph + ' l' + (l - s + 4) + ' 0"/>';

        line.append(group);
    }
}

function getRandomBrightColor(){
    let color;
    do{
        color = getRandomColor();
    }while(Math.round((parseInt(color[0]) * 0.3) + (parseInt(color[1]) * 0.6) + (parseInt(color[2]) * 0.1)) < 80)
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
}

function getRandomColor(){
    return [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
}

draw(_EVENTS);