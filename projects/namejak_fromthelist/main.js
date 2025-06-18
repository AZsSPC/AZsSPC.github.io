const rylak = [
    [
        ['Жопо', 'Пиздо', 'Дилдо', 'Рото', 'Хохло', 'Русо', 'Жидо', 'Спидо', 'Негро', 'Полу', 'Члено', 'Хуе', 'Глино', 'Нарко',],
        ['трах', 'ед', 'ёб', 'нах', 'чпок', 'срак', 'рак', 'мес', 'лиз',]
    ],
    [
        ['Рил', 'Пизд', 'Дилд', 'Рот', 'Хохл', 'Рус', 'Жид', 'Анл', 'Ермак',],
        ['ак',]
    ],
]
const metallhead = [
    [
        ['Жопо', 'Пиздо', 'Дилдо', 'Рото', 'Хохло', 'Русо', 'Жидо', 'Спидо', 'Негро', 'Полу', 'Члено', 'Хуе', 'Глино', 'Нарко',],
        ['трах', 'ед', 'ёб', 'нах', 'чпок', 'срак', 'рак', 'мес', 'лиз',]
    ],
    [
        ['Метал', 'Аут', 'Нарко', 'Аут', 'Аут', 'Аут',],
        ['ист',]
    ],
]

const main = document.createElement('main')

const display = document.createElement('div')
display.className = 'rylak_metallhead'
display.addEventListener('click', () => name_it())
main.appendChild(display)

document.body.appendChild(main)

function get_random_from_list(list) {
    let result = list[Math.random() * list.length | 0]
    if (!Array.isArray(result)) return result
    return `${get_random_from_list(result[0])}${get_random_from_list(result[1])}`
}

function name_it() {
    const totalSteps = 10;
    for (let i = 0; i < totalSteps; i++) {
        // Exponential delay to slow down towards the end
        const delay = 50 * Math.pow(1.3, i); // Adjust base (1.5) for more/less slowing
        setTimeout(() => {
            display.textContent = `${get_random_from_list(rylak)} ${get_random_from_list(metallhead)}`;
            display.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                display.style.animation = '';
            }, 100);
        }, delay);
    }
}

display.textContent = `Рилак Металист`;