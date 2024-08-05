let SID = '1QORLosVgDEwWJExBCx6bNLCx2EE2X9oTM5X5-wKU-PY'
const LOTS = document.getElementById('lots')
const LOT = {ID: 'A', NAME: 'B', LORE: 'C', COUNT: 'D', PRICE: 'E', AVAILABLE: 'F', BUY: 'G', IMG: 'H', TAG: 'I'},
	SHOP = {ID: 'A', TITLE: 'B', ABOUT: 'C', DELIVERY: 'D', CONTACT: 'E', IMG: 'F'}


const using_sheet = async(name, query, fun) => {
	await fetch(`https://docs.google.com/spreadsheets/d/${SID}/gviz/tq?sheet=${name}&tq=${encodeURIComponent(query)}`)
	.then(res => res.text())
	.then(rep => fun(JSON.parse(rep.substring(47).slice(0, -2))['table']['rows']))
}
const parse_lots = (shop, delivery, rows) => {
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
}
const parse_shops = (rows) => {
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
}