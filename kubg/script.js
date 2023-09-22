const domen = 'file:///D:/Users/User/Downloads/kubg'

const l_pages = {
	"":"Головна",
	"expert_systems":"Експертні системи",
	"neural_networks":"Нейронні мережі",
	"semantic_web":"Semantic Web (Семантичний Веб)",
	"semantic_wiki":"Semantic Wiki",
	"machine_learning":"Машинне навчання (machine learning)",
	"deep_learning":"Глибинне навчання (deep learning)",
	"intelligent_search":"Інтелектуальні пошукові системи",
	"multiagent_systems":"Мультиагентні системи (multiagent systems)",
	"recommendation_systems":"Рекомендаційні системи",
	"text_mining":"Розпізнавання тексту (text mining)",
	"data_mining":"Інтелектуальний аналіз даних (data mining)"
}

const e_pages = document.getElementById('pages');

const setup_pages = () => {
	e_pages.innerHTML = '';
	for(let [k,v] of Object.entries(l_pages))
	e_pages.innerHTML+=`<li><a href="${domen}${k?'/'+k:''}/index.html">${v}</a></li>`
	//TODO: remove /index.html
}