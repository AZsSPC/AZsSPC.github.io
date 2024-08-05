const SID = '1qXio0gYYChtw9uaM90_DjnRyMXCtFEr2kAtqW-nCQ-o'
const LOTS = document.getElementById('lots')
const LOT = {ID: 'A', NAME: 'B', LORE: 'C', COUNT: 'D', PRICE: 'E', AVAILABLE: 'F', BUY: 'G', IMG: 'H', TAG: 'I'},
	SHOP = {ID: 'A', TITLE: 'B', ABOUT: 'C', DELIVERY: 'D', CONTACT: 'E', IMG: 'F'}
/**
 * returns table
 * */
const using_sheet = async(name, query, fun) => {
		await fetch(`https://docs.google.com/spreadsheets/d/${SID}/gviz/tq?sheet=${name}&tq=${encodeURIComponent(query)}`)
		.then(res => res.text())
		.then(rep => fun(JSON.parse(rep.substring(47).slice(0, -2))['table']['rows']))
	},
	parse_lots = (shop, delivery, rows) => {
		let lots = []
		for (let row of rows) try {
			lots.push({
				ID: row.c[0].v.trim(),
				NAME: row.c[1].v.trim(),
				LORE: row.c[2].v.trim(),
				COUNT: row.c[3].v,
				PRICE: row.c[4].v,
				AVAILABLE: row.c[5].v === -1 ?'много' :row.c[5].v,
				BUY: row.c[6].v,
				IMG: (row.c[7] ?? {v: 'img/null.png'}).v.trim().split(/\s+/gm),
				TAG: row.c[8].v ?? '',
				SHOP: shop,
				DELIVERY: delivery,
			})
		} catch (ignored) {
			console.log(ignored)
		}
		return lots
	},
	parse_shops = (rows) => {
		let shops = []
		for (let row of rows) try {
			shops.push({
				ID: row.c[0].v.trim(),
				TITLE: row.c[1].v.trim(),
				ABOUT: row.c[2].v.trim(),
				DELIVERY: row.c[3].v == 0 ?'самовывоз' :row.c[3].v == 1 ?'на варпе' :'достака',
				CONTACT: row.c[4].v.trim(),
				IMG: row.c[5].v.trim()
			})
		} catch (ignored) {
		}
		return shops
	},
	lot = (link, active, img, title, lore, cost, stored, shop, type, sellorbuy) => `
<a class="lot" href="${link}">
<input type="checkbox" ${active ?'checked' :''}>
<div>
<div class="img"><img src="${img}"></div>
<span class="title">${title}</span>
<span class="lore">${lore}</span>
<span class="cost">${cost}</span>
<span class="stored">${stored}</span>
<span class="shop">${shop}</span>
<span class="type">${type}</span>
<button class="sellorbuy">${sellorbuy}</button>
</div>
</a>`
/*
* limit [n]
* offset [n]
* where ${LOT.[id]}=[s]
* where ${LOT.TAG} like "%[tag]%"
*/

using_sheet('SHOPLIST', `select * limit 20`, async rows => {
	let shops = parse_shops(rows)
	console.log(shops)
	let data = []
	for (let shop of shops) {
		if (shops.length >= 20) break
		await using_sheet(shop.ID, `select * limit 20`, rows => {
			console.log(rows)
			let lots = parse_lots(shop.ID, shop.DELIVERY, rows)
			data.push(...lots)
		})
	}
	LOTS.innerHTML = ''
	for (let d of data) LOTS.innerHTML += lot('', true, d.IMG, d.NAME, d.LORE, d.PRICE, d.AVAILABLE, d.SHOP, d.BUY, d.DELIVERY)
})
