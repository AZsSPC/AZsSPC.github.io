AZ.locale.languages.en.page = {
	header: '<span>Welcome to AZsSPC <a class="az-link-button" color="red" href="/">main</a> page</span>',
	sections: `
<section>
	<p>I'm developer & gamer, so on this site I'll post my tiny code <a class="az-link-button" color="magenta" href="/projects/">projects</a> or something related with games </p>
	<p><a class="az-link-button" color="blue" href="https://github.com/azsspc/azsspc.github.io/blob/main/">source</a>
	 - is the link to <a class="az-link-button" color="gray" href="https://github.com/AZsSPC">GitHub</a> subpage of current page</p>
	<p>Information about myself you can see at <a class="az-link-button" color="gold" href="/contacts/">author</a> page</p>
</section>
<section>
	<p>The purpose of this page is to tell you some meanings and useful information for using the site</p>
	<p>First explanation: buttons, links and anchors look like <a class="az-link-button">this</a></p>
</section>`,
}

AZ.locale.languages.ru.page = {
	header: '<span>Добро пожаловать на <a class="az-link-button" color="red" href="/">главную</a> страницу AZsSPC</span>',
	sections: `
<section>
	<p>Я разработчик и геймер, и на этом сайте я размещаю программные <a class="az-link-button" color="magenta" href="/projects/">проекты</a> и что-то связанное с играми</p>
	<p><a class="az-link-button" color="blue" href="https://github.com/azsspc/azsspc.github.io/blob/main/">код</a>
	 - ссылки на <a class="az-link-button" color="gray" href="https://github.com/AZsSPC">GitHub</a> подстраницы каждого отдельного проекта или страницы</p>
	<p>Информацию обо мне можно найти на странице <a class="az-link-button" color="gold" href="/contacts/">об авторе</a></p>
</section>
<section>
	<p>Цель этой страницы - донести полезную информацию о сайте и объяснить как им пользоваться</p>
	<p>Самое главное: кнопки, ссылки и "якоря" выглядят <a class="az-link-button">так</a></p>
</section>`,
}
/*
 AZ.locale.languages.ua.page = {
 header: 'Добро пожаловать на <a class="az-link-button" color="red" href="/">главную</a> страницу AZsSPC',
 sections: `
 <section>
 <p>Я разработчик и геймер, и на этом сайте я размещаю программные <a class="az-link-button" color="magenta" href="/projects/">проекты</a> и что-то связанное с играми</p>
 <p><a class="az-link-button" color="blue" href="https://github.com/azsspc/azsspc.github.io/blob/main/">код</a>
 - ссылки на <a class="az-link-button" color="gray" href="https://github.com/AZsSPC">GitHub</a> подстраницы каждого отдельного проекта или страницы</p>
 <p>Информацию обо мне можно найти на странице <a class="az-link-button" color="gold" href="/contacts/">об авторе</a></p>
 </section>
 <section>
 <p>Цель этой страницы - донести полезную информацию о сайте и объяснить как им пользоваться</p>
 <p>Самое главное: кнопки, ссылки и "якоря" выглядят <a class="az-link-button">так</a></p>
 </section>`,
 }
 */
document.querySelector('header').innerHTML = AZ.locale.get('page.header')
document.querySelector('main').innerHTML = AZ.locale.get('page.sections')
AZ.reformatAZ()