let et = document.getElementById("et");
let eo = document.getElementById("out");
let cb = document.getElementById("copy");

console.log("b");

function ttt(text){
    let translated = text
    .replaceAll('q', 'й').replaceAll('Q', 'Й')
    .replaceAll('w', 'ц').replaceAll('W', 'Ц')
    .replaceAll('e', 'у').replaceAll('E', 'У')
    .replaceAll('r', 'к').replaceAll('R', 'К')
    .replaceAll('t', 'е').replaceAll('T', 'Е')
    .replaceAll('y', 'н').replaceAll('Y', 'Н')
    .replaceAll('u', 'г').replaceAll('U', 'Г')
    .replaceAll('i', 'ш').replaceAll('I', 'Ш')
    .replaceAll('o', 'щ').replaceAll('O', 'Щ')
    .replaceAll('p', 'з').replaceAll('P', 'З')
    .replaceAll('[', 'х').replaceAll('{', 'Х')
    .replaceAll(']', 'ъ').replaceAll('}', 'Ъ')
    .replaceAll('a', 'ф').replaceAll('A', 'Ф')
    .replaceAll('s', 'ы').replaceAll('S', 'Ы')
    .replaceAll('d', 'в').replaceAll('D', 'В')
    .replaceAll('f', 'а').replaceAll('F', 'А')
    .replaceAll('g', 'п').replaceAll('G', 'П')
    .replaceAll('h', 'р').replaceAll('H', 'Р')
    .replaceAll('j', 'о').replaceAll('J', 'О')
    .replaceAll('k', 'л').replaceAll('K', 'Л')
    .replaceAll('l', 'д').replaceAll('L', 'Д')
    .replaceAll(';', 'ж').replaceAll(':', 'Ж')
    .replaceAll("'", 'э').replaceAll('"', 'Э')
    .replaceAll('z', 'я').replaceAll('Z', 'Я')
    .replaceAll('x', 'ч').replaceAll('X', 'Ч')
    .replaceAll('c', 'с').replaceAll('C', 'С')
    .replaceAll('v', 'м').replaceAll('V', 'М')
    .replaceAll('b', 'и').replaceAll('B', 'И')
    .replaceAll('n', 'т').replaceAll('N', 'Т')
    .replaceAll('m', 'ь').replaceAll('M', 'Ь')
    .replaceAll(',', 'б').replaceAll('<', 'Б')
    .replaceAll('.', 'ю').replaceAll('>', 'Ю')
    .replaceAll('/', '.').replaceAll('?', ',')
    .replaceAll('&', '?');

    console.log(translated);
    eo.innerHTML = translated;
}

cb.addEventListener('click', function (event){
    try{
        eo.focus();
        eo.select();
        console.log('Copying text command was ' + (document.execCommand('copy') ?'successful' :'unsuccessful'));
        et.focus();
    }catch(err){
        console.log('Oops, unable to copy');
    }
});