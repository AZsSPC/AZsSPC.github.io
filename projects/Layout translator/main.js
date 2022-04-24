let et = document.getElementById("et"),
    eo = document.getElementById("out"),
    cb = document.getElementById("copy");

cb.addEventListener('click', function (event) {
    try {
        eo.focus();
        eo.select();
        console.log('Copying text command was ' + (document.execCommand('copy') ? 'successful' : 'unsuccessful'));
        et.focus();
    } catch (err) {
        console.log('Oops, unable to copy');
    }
});

let ru = '<keyMap>\n' +
    '<map iso="E00" to="ё"/>\n' +
    '<map iso="E01" to="1"/>\n' +
    '<map iso="E02" to="2"/>\n' +
    '<map iso="E03" to="3"/>\n' +
    '<map iso="E04" to="4"/>\n' +
    '<map iso="E05" to="5"/>\n' +
    '<map iso="E06" to="6"/>\n' +
    '<map iso="E07" to="7"/>\n' +
    '<map iso="E08" to="8"/>\n' +
    '<map iso="E09" to="9"/>\n' +
    '<map iso="E10" to="0"/>\n' +
    '<map iso="E11" to="-"/>\n' +
    '<map iso="E12" to="="/>\n' +
    '<map iso="D00" to="\u{09}"/>\n' +
    '<map iso="D01" to="й"/>\n' +
    '<map iso="D02" to="ц"/>\n' +
    '<map iso="D03" to="у"/>\n' +
    '<map iso="D04" to="к"/>\n' +
    '<map iso="D05" to="е"/>\n' +
    '<map iso="D06" to="н"/>\n' +
    '<map iso="D07" to="г"/>\n' +
    '<map iso="D08" to="ш"/>\n' +
    '<map iso="D09" to="щ"/>\n' +
    '<map iso="D10" to="з"/>\n' +
    '<map iso="D11" to="х"/>\n' +
    '<map iso="D12" to="ъ"/>\n' +
    '<map iso="C01" to="ф"/>\n' +
    '<map iso="C02" to="ы"/>\n' +
    '<map iso="C03" to="в"/>\n' +
    '<map iso="C04" to="а"/>\n' +
    '<map iso="C05" to="п"/>\n' +
    '<map iso="C06" to="р"/>\n' +
    '<map iso="C07" to="о"/>\n' +
    '<map iso="C08" to="л"/>\n' +
    '<map iso="C09" to="д"/>\n' +
    '<map iso="C10" to="ж"/>\n' +
    '<map iso="C11" to="э"/>\n' +
    '<map iso="C12" to="\\"/>\n' +
    '<map iso="C13" to="\u{0D}"/>\n' +
    '<map iso="B00" to="\\"/>\n' +
    '<map iso="B01" to="я"/>\n' +
    '<map iso="B02" to="ч"/>\n' +
    '<map iso="B03" to="с"/>\n' +
    '<map iso="B04" to="м"/>\n' +
    '<map iso="B05" to="и"/>\n' +
    '<map iso="B06" to="т"/>\n' +
    '<map iso="B07" to="ь"/>\n' +
    '<map iso="B08" to="б"/>\n' +
    '<map iso="B09" to="ю"/>\n' +
    '<map iso="B10" to="."/>\n' +
    '<map iso="A03" to=" "/>\n' +
    '</keyMap>\n' +
    '<keyMap modifiers="shift">\n' +
    '<map iso="E00" to="Ё"/>\n' +
    '<map iso="E01" to="!"/>\n' +
    '<map iso="E02" to="\u{22}"/>\n' +
    '<map iso="E03" to="№"/>\n' +
    '<map iso="E04" to=";"/>\n' +
    '<map iso="E05" to="%"/>\n' +
    '<map iso="E06" to=":"/>\n' +
    '<map iso="E07" to="?"/>\n' +
    '<map iso="E08" to="*"/>\n' +
    '<map iso="E09" to="("/>\n' +
    '<map iso="E10" to=")"/>\n' +
    '<map iso="E11" to="_"/>\n' +
    '<map iso="E12" to="+"/>\n' +
    '<map iso="D00" to="\u{09}"/>\n' +
    '<map iso="D01" to="Й"/>\n' +
    '<map iso="D02" to="Ц"/>\n' +
    '<map iso="D03" to="У"/>\n' +
    '<map iso="D04" to="К"/>\n' +
    '<map iso="D05" to="Е"/>\n' +
    '<map iso="D06" to="Н"/>\n' +
    '<map iso="D07" to="Г"/>\n' +
    '<map iso="D08" to="Ш"/>\n' +
    '<map iso="D09" to="Щ"/>\n' +
    '<map iso="D10" to="З"/>\n' +
    '<map iso="D11" to="Х"/>\n' +
    '<map iso="D12" to="Ъ"/>\n' +
    '<map iso="C01" to="Ф"/>\n' +
    '<map iso="C02" to="Ы"/>\n' +
    '<map iso="C03" to="В"/>\n' +
    '<map iso="C04" to="А"/>\n' +
    '<map iso="C05" to="П"/>\n' +
    '<map iso="C06" to="Р"/>\n' +
    '<map iso="C07" to="О"/>\n' +
    '<map iso="C08" to="Л"/>\n' +
    '<map iso="C09" to="Д"/>\n' +
    '<map iso="C10" to="Ж"/>\n' +
    '<map iso="C11" to="Э"/>\n' +
    '<map iso="C12" to="/"/>\n' +
    '<map iso="C13" to="\u{0D}"/>\n' +
    '<map iso="B00" to="/"/>\n' +
    '<map iso="B01" to="Я"/>\n' +
    '<map iso="B02" to="Ч"/>\n' +
    '<map iso="B03" to="С"/>\n' +
    '<map iso="B04" to="М"/>\n' +
    '<map iso="B05" to="И"/>\n' +
    '<map iso="B06" to="Т"/>\n' +
    '<map iso="B07" to="Ь"/>\n' +
    '<map iso="B08" to="Б"/>\n' +
    '<map iso="B09" to="Ю"/>\n' +
    '<map iso="B10" to=","/>\n' +
    '<map iso="A03" to=" "/>\n' +
    '</keyMap>';
let en = '<keyMap>\n' +
    '<map iso="E00" to="`"/>\n' +
    '<map iso="E01" to="1"/>\n' +
    '<map iso="E02" to="2"/>\n' +
    '<map iso="E03" to="3"/>\n' +
    '<map iso="E04" to="4"/>\n' +
    '<map iso="E05" to="5"/>\n' +
    '<map iso="E06" to="6"/>\n' +
    '<map iso="E07" to="7"/>\n' +
    '<map iso="E08" to="8"/>\n' +
    '<map iso="E09" to="9"/>\n' +
    '<map iso="E10" to="0"/>\n' +
    '<map iso="E11" to="-" transform="no"/>\n' +
    '<map iso="E12" to="="/>\n' +
    '<map iso="D00" to="\u{09}"/>\n' +
    '<map iso="D01" to="q"/>\n' +
    '<map iso="D02" to="w"/>\n' +
    '<map iso="D03" to="e"/>\n' +
    '<map iso="D04" to="r"/>\n' +
    '<map iso="D05" to="t"/>\n' +
    '<map iso="D06" to="y"/>\n' +
    '<map iso="D07" to="u"/>\n' +
    '<map iso="D08" to="i"/>\n' +
    '<map iso="D09" to="o"/>\n' +
    '<map iso="D10" to="p"/>\n' +
    '<map iso="D11" to="["/>\n' +
    '<map iso="D12" to="]"/>\n' +
    '<map iso="C01" to="a"/>\n' +
    '<map iso="C02" to="s"/>\n' +
    '<map iso="C03" to="d"/>\n' +
    '<map iso="C04" to="f"/>\n' +
    '<map iso="C05" to="g"/>\n' +
    '<map iso="C06" to="h"/>\n' +
    '<map iso="C07" to="j"/>\n' +
    '<map iso="C08" to="k"/>\n' +
    '<map iso="C09" to="l"/>\n' +
    '<map iso="C10" to=";"/>\n' +
    '<map iso="C11" to="\'"/>\n' +
    '<map iso="C12" to="\\"/>\n' +
    '<map iso="C13" to="\u{0D}"/>\n' +
    '<map iso="B00" to="\\"/>\n' +
    '<map iso="B01" to="z"/>\n' +
    '<map iso="B02" to="x"/>\n' +
    '<map iso="B03" to="c"/>\n' +
    '<map iso="B04" to="v"/>\n' +
    '<map iso="B05" to="b"/>\n' +
    '<map iso="B06" to="n"/>\n' +
    '<map iso="B07" to="m"/>\n' +
    '<map iso="B08" to="," transform="no"/>\n' +
    '<map iso="B09" to="." transform="no"/>\n' +
    '<map iso="B10" to="/"/>\n' +
    '<map iso="A03" to=" "/>\n' +
    '</keyMap>\n' +
    '<keyMap modifiers="shift">\n' +
    '<map iso="E00" to="~" transform="no"/>\n' +
    '<map iso="E01" to="!"/>\n' +
    '<map iso="E02" to="@"/>\n' +
    '<map iso="E03" to="#"/>\n' +
    '<map iso="E04" to="$"/>\n' +
    '<map iso="E05" to="%"/>\n' +
    '<map iso="E06" to="^"/>\n' +
    '<map iso="E07" to="&"/>\n' +
    '<map iso="E08" to="*"/>\n' +
    '<map iso="E09" to="("/>\n' +
    '<map iso="E10" to=")"/>\n' +
    '<map iso="E11" to="_"/>\n' +
    '<map iso="E12" to="+"/>\n' +
    '<map iso="D00" to="\u{09}"/>\n' +
    '<map iso="D01" to="Q"/>\n' +
    '<map iso="D02" to="W"/>\n' +
    '<map iso="D03" to="E"/>\n' +
    '<map iso="D04" to="R"/>\n' +
    '<map iso="D05" to="T"/>\n' +
    '<map iso="D06" to="Y"/>\n' +
    '<map iso="D07" to="U"/>\n' +
    '<map iso="D08" to="I"/>\n' +
    '<map iso="D09" to="O"/>\n' +
    '<map iso="D10" to="P"/>\n' +
    '<map iso="D11" to="{"/>\n' +
    '<map iso="D12" to="}"/>\n' +
    '<map iso="C01" to="A"/>\n' +
    '<map iso="C02" to="S"/>\n' +
    '<map iso="C03" to="D"/>\n' +
    '<map iso="C04" to="F"/>\n' +
    '<map iso="C05" to="G"/>\n' +
    '<map iso="C06" to="H"/>\n' +
    '<map iso="C07" to="J"/>\n' +
    '<map iso="C08" to="K"/>\n' +
    '<map iso="C09" to="L"/>\n' +
    '<map iso="C10" to=":"/>\n' +
    '<map iso="C11" to="\u{22}"/>\n' +
    '<map iso="C12" to="|"/>\n' +
    '<map iso="C13" to="\u{0D}"/>\n' +
    '<map iso="B00" to="|"/>\n' +
    '<map iso="B01" to="Z"/>\n' +
    '<map iso="B02" to="X"/>\n' +
    '<map iso="B03" to="C"/>\n' +
    '<map iso="B04" to="V"/>\n' +
    '<map iso="B05" to="B"/>\n' +
    '<map iso="B06" to="N"/>\n' +
    '<map iso="B07" to="M"/>\n' +
    '<map iso="B08" to="<" transform="no"/>\n' +
    '<map iso="B09" to=">"/>\n' +
    '<map iso="B10" to="?"/>\n' +
    '<map iso="A03" to=" "/>\n' +
    '</keyMap>\n' +
    '</keyboard>';

function layout_parse(from, filename = null) {
    let basic = from.match(/(?<=<keyMap>).+?(?=<\/keyMap>)/gs)[0].split('\n');
    let shifted = from.match(/(?<=<keyMap modifiers="shift">).+?(?=<\/keyMap>)/gs)[0].split('\n');
    let reg_to = /(?<=to=").+?(?=")/gm;
    let charset = {}
    for (const i in basic) if (basic[i] !== '') {
        let a = basic[i].match(reg_to), b = shifted[i].match(reg_to)
        charset[basic[i].match(/(?<=iso=").+?(?=")/gm)[0]] = [a ? a[0] : null, b ? b[0] : null]
    }
    if (filename == null) filename = prompt("Name this file?");
    if (filename) createNDownload(filename + '.json', JSON.stringify(charset));
}

function get_layout(from) {
    onTextFromCloudLoaded()


    return charset;
}

let translate_map;

function set_tm(from_u = 'en', to_u = 'ru') {
    translate_map = []
    const from = get_layout(from_u)
    const to = get_layout(to_u)
    for (const [iso, [a, b]] of Object.entries(from))
        translate_map = [...translate_map, [a, to[iso][0]], [b, to[iso][1]]]
    console.log(translate_map)
}

set_tm()

function ttt(text) {
    let translated = text
    for (const a of translate_map)
        translated = translated.replaceAll(a[0], a[1])
    eo.innerHTML = translated;
}
