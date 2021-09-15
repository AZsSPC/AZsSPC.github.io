let line = document.getElementById('line');

const _EVENTS = [
    /*{
     "location": [{w:0-360deg,h:0-180deg}],         область, где произошло событие; указывается точками, по часовой стрелке
     "start": {y: 0, m: 0, d: 0, H: 0, M: 0, S: 0}, начало событи0я
     "end": {y: 0, m: 0, d: 0, H: 0, M: 0, S: 0},   конец событи0я
     "title": "Title",                              заголовок
     "lore_s": "short lore",                        краткое описание
     "lore": "full lore about event",               полное поисание
     "tags": []                                     теги; регистр игнорируется
     *   - тег
     P_* - человек, относящийся к событию
     N_* - страна, относящаяся к событию
     D_* - документ относящийся к событию
     E_* - другое событие, относящееся к данному

     }*/
    {
        location: [],
        start: {y: -10, m: 0, d: 0, H: 0, M: 0, S: 0},
        end: {y: 10, m: 0, d: 0, H: 0, M: 0, S: 0},
        title: "Title",
        lore_s: "short lore",
        lore: "full lore about event",
        tags: []
    },
    {
        location: [],
        start: {y: 18, m: 0, d: 0, H: 0, M: 0, S: 0},
        end: {y: 32, m: 0, d: 0, H: 0, M: 0, S: 0},
        title: "Title",
        lore_s: "short lore",
        lore: "full lore about event",
        tags: []
    },
    {
        location: [],
        start: {y: 8, m: 0, d: 0, H: 0, M: 0, S: 0},
        end: {y: 40, m: 0, d: 0, H: 0, M: 0, S: 0},
        title: "Title",
        lore_s: "short lore",
        lore: "full lore about event",
        tags: []
    },
    {
        location: [],
        start: {y: 11, m: 0, d: 0, H: 0, M: 0, S: 0},
        end: {y: 18, m: 0, d: 0, H: 0, M: 0, S: 0},
        title: "Title",
        lore_s: "short lore",
        lore: "full lore about event",
        tags: []
    },
    {
        location: [],
        start: {y: -50, m: 0, d: 0, H: 0, M: 0, S: 0},
        end: {y: 80, m: 0, d: 0, H: 0, M: 0, S: 0},
        title: "Title",
        lore_s: "short lore",
        lore: "full lore about event",
        tags: []
    }
];
let levels;

function isOverlaps(s1, e1, s2, e2){
    return s1 < e2 && s2 < e1;
}

let max_deep = 0;
const COF = 30;
let COFS = 2;

function draw(events, shake = false){

    let show_line = {s: 0, e: 0};
    for(let i in events){
        if(events[i].start.y < show_line.s) show_line.s = events[i].start.y;
        if(events[i].end.y > show_line.e) show_line.e = events[i].end.y;
    }
    if(shake || levels == null){
        levels = [];
        for(let i in events){
            let ev = events[i];
            let deep = 0;
            let torf = true;
            if(levels[deep] == null){
                levels.push([{'s': ev.start.y, 'e': ev.end.y, 'a': 1}]);
                torf = false;
            }else for(let j = -1; j < levels[deep].length; j++){
                if(levels[deep][j] != null && isOverlaps(ev.start.y, ev.end.y, levels[deep][j].s, levels[deep][j].e)){
                    deep++;
                    if(max_deep < deep) max_deep = deep;
                    j = -1;
                }
                if(levels[deep] == null){
                    levels.push([{'s': ev.start.y, 'e': ev.end.y, 'a': 2}]);
                    torf = false;
                    break;
                }
            }
            if(torf) levels[deep].push({'s': ev.start.y, 'e': ev.end.y, 'a': 3});
            events[i].level = deep;
        }
    }

    console.log(levels)
    let length = Math.abs(show_line.s) + Math.abs(show_line.e);
    let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    group.classList.add('h-line');
    group.innerHTML += '<path d="M-9999 0 l99999 0"/>';
    line.append(group);

    for(let i in events){
        let ev = events[i];
        let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        group.setAttribute('onclick', 'alert("' + ev.title + ' (' + ev.start.y + '-' + ev.end.y + ')' + '\\n' + ev.lore + '")');
        let color = getRandomBrightColor();
        group.setAttribute('stroke', color);
        let s = ev.start.y * COF / COFS;
        let l = ev.end.y * COF / COFS;
        let ph = ev.level * COF + COF;

        group.innerHTML += '<text class="event-line-t" x="' + (s + 5) + '" y="' + (ph - 6) + '" class="small" fill="' + color + '">' + ev.title + '</text>';
        group.innerHTML += '<path class="event-line-s" d="M' + s + ' 0 l0 ' + ph + '"/>';
        group.innerHTML += '<path class="event-line-s" d="M' + l + ' 0 l0 ' + ph + '"/>';
        group.innerHTML += '<path class="event-line" d="M' + (s) + ' ' + ph + ' l' + (l - s) + ' 0"/>';

        line.append(group);
    }
    return events;
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

draw(_EVENTS, true);