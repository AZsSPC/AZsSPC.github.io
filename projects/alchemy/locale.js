export const locale = {
	localization: 'en',
	get: (str) =>
		str.split('.').reduce((current, key) => current?.[key], locale.languages[locale.localization]) ??
		(locale.localization === 'en' ? str : str.split('.').reduce((current, key) => current?.[key], locale.languages.en)),
	languages: {
		ru: {
			ingredient: {
				water: {title: 'Вода', description: 'Чистая и необходимая для жизни жидкость.'},
				herb: {title: 'Трава', description: 'Целебное растение с множеством полезных свойств.'},
				blood: {title: 'Кровь', description: 'Жидкость, циркулирующая в организме живых существ.'},
				wood: {title: 'Древесина', description: 'Прочный материал, используемый в строительстве и ремеслах.'},
			},
		},
		ua: {
			ingredient: {
				water: {title: 'Вода', description: 'Чиста і необхідна для життя рідина.'},
				herb: {title: 'Трава', description: 'Цілюща рослина з безліччю корисних властивостей.'},
				blood: {title: 'Кров', description: 'Рідина, що циркулює в організмі живих істот.'},
				wood: {title: 'Деревина', description: 'Міцний матеріал, що використовується в будівництві та ремеслах.'},
			},
		},
		en: {
			ingredient: {
				water: {title: 'Water', description: 'A clean, life-sustaining liquid.'},
				herb: {title: 'Herb', description: 'A medicinal plant with many beneficial properties.'},
				blood: {title: 'Blood', description: 'A fluid circulating in the bodies of living beings.'},
				wood: {title: 'Wood', description: 'A sturdy material used in construction and crafts.'},
				stone: {title: 'Stone', description: 'A solid, durable material from the earth.'},
				iron: {title: 'Iron', description: 'A strong metal commonly used for tools.'},
				gold: {title: 'Gold', description: 'A precious metal valued for its rarity.'},
				sand: {title: 'Sand', description: 'Fine grains often found on beaches and deserts.'},
				salt: {title: 'Salt', description: 'A mineral essential for cooking and preservation.'},
				fire: {title: 'Fire', description: 'An intense heat and light source.'},
				ice: {title: 'Ice', description: 'Solid water, cold and translucent.'},
				coal: {title: 'Coal', description: 'A combustible black rock used as fuel.'},
				clay: {title: 'Clay', description: 'A soft material used in pottery and construction.'},
				silver: {title: 'Silver', description: 'A shiny metal with high conductivity.'},
				honey: {title: 'Honey', description: 'A sweet liquid made by bees.'},
				ash: {title: 'Ash', description: 'Powdery residue left after burning.'},
				milk: {title: 'Milk', description: 'A nutritious liquid produced by mammals.'},
				oil: {title: 'Oil', description: 'A thick, viscous liquid used for fuel and cooking.'},
				poison: {title: 'Poison', description: 'A substance harmful to living organisms.'},
				gem: {title: 'Gem', description: 'A rare, valuable stone often used in jewelry.'},
			},
			receipt: {
				elixir_life: {title: 'Elixir of Life', description: 'A potion said to restore vitality and prolong life.'},
				mana_dust: {title: 'Mana Dust', description: 'A shimmering powder used to rejuvenate magical energy.'},
				fire_powder: {title: 'Fire Powder', description: 'A volatile substance that ignites upon contact with flame.'},
				venom_tincture: {title: 'Venom Tincture', description: 'A deadly concoction distilled from poisonous creatures.'},
				ice_crystals: {title: 'Ice Crystals', description: 'Chilled shards that freeze anything they touch.'},
				shadow_essence: {title: 'Shadow Essence', description: 'A dark liquid that shrouds its user in secrecy.'},
				silver_breeze: {title: 'Silver Breeze', description: 'A light mist that grants agility and speed.'},
				blood_amber: {title: 'Blood Amber', description: 'A rare gemstone infused with the essence of life force.'},
				wisdom_draught: {title: 'Wisdom Draught', description: 'A golden liquid that sharpens the mind.'},
				ethereal_flask: {title: 'Ethereal Flask', description: 'A bottle containing otherworldly energy.'},
			},

		},
	},
}