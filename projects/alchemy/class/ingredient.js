import { Vector4 } from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import { compactVector4 } from '../comp/data_storer.js'

export default class Ingredient {
	constructor(position = new Vector4(), vector_weight = new Vector4(), elements = {}, title = 'brew.unknown.title', description = 'brew.unknown.description', color = 0xffffff, amount = 1, hash = null) {
		this.position = position
		this.vector_weight = vector_weight
		this.elements = elements
		this.title = title
		this.description = description
		this.color = color
		this.amount = amount
		this.hash = hash || compactVector4(this.position) + ';' + compactVector4(this.vector_weight) //+ ';' + JSON.stringify(this.elements)
		//console.log(this.hash)
	}

	copy(amount = this.amount) {
		return new Ingredient(this.position.clone(), this.vector_weight.clone(), { ...this.elements }, this.title, this.description, this.color, amount)
	}

	take(amount = 1) {
		this.amount -= amount
		return new Ingredient(this.position.clone(), this.vector_weight.clone(), { ...this.elements }, this.title, this.description, this.color, amount)
	}

	static list = Object.freeze({
		water: new Ingredient(new Vector4(0, 0, 0, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.water.title', 'ingredient.water.description', 0x0000ff),
		gold: new Ingredient(new Vector4(50, -50, 10, -3), new Vector4(1, 1, 1, 1), {}, 'ingredient.gold.title', 'ingredient.gold.description', 0xffd700),
		silver: new Ingredient(new Vector4(30, 10, -15, 3), new Vector4(1, 1, 1, 1), {}, 'ingredient.silver.title', 'ingredient.silver.description', 0xc0c0c0),
		herb: new Ingredient(new Vector4(-100, 0, 10, 2), new Vector4(10, 1, 1, 1), {}, 'ingredient.herb.title', 'ingredient.herb.description', 0x00ff00),
		blood: new Ingredient(new Vector4(10, 50, 10, -1), new Vector4(1, 1, 1, 1), {}, 'ingredient.blood.title', 'ingredient.blood.description', 0xff0000),
		wood: new Ingredient(new Vector4(-10, -80, 30, 3), new Vector4(1, 1, 1, 1), {}, 'ingredient.wood.title', 'ingredient.wood.description', 0xa40910),
		stone: new Ingredient(new Vector4(20, 10, -5, -2), new Vector4(1, 1, 1, 1), {}, 'ingredient.stone.title', 'ingredient.stone.description', 0x808080),
		iron: new Ingredient(new Vector4(-40, 20, 15, 4), new Vector4(1, 1, 1, 1), {}, 'ingredient.iron.title', 'ingredient.iron.description', 0xb0c4de),
		sand: new Ingredient(new Vector4(0, -30, 5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.sand.title', 'ingredient.sand.description', 0xf4a460),
		salt: new Ingredient(new Vector4(15, -10, -20, 2), new Vector4(1, 1, 1, 1), {}, 'ingredient.salt.title', 'ingredient.salt.description', 0xffffff),
		fire: new Ingredient(new Vector4(-30, 50, 20, -4), new Vector4(1, 1, 1, 1), {}, 'ingredient.fire.title', 'ingredient.fire.description', 0xff4500),
		ice: new Ingredient(new Vector4(10, -50, 10, 1), new Vector4(1, 1, 1, 1), {}, 'ingredient.ice.title', 'ingredient.ice.description', 0xadd8e6),
		coal: new Ingredient(new Vector4(-20, 40, -10, -1), new Vector4(1, 1, 1, 1), {}, 'ingredient.coal.title', 'ingredient.coal.description', 0x36454f),
		clay: new Ingredient(new Vector4(-15, -20, 25, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.clay.title', 'ingredient.clay.description', 0x964b00),
		honey: new Ingredient(new Vector4(0, -40, 30, -2), new Vector4(1, 1, 1, 1), {}, 'ingredient.honey.title', 'ingredient.honey.description', 0xffc30b),
		ash: new Ingredient(new Vector4(-25, 20, 5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.ash.title', 'ingredient.ash.description', 0x555555),
		milk: new Ingredient(new Vector4(10, -15, 15, 4), new Vector4(1, 1, 1, 1), {}, 'ingredient.milk.title', 'ingredient.milk.description', 0xffffe0),
		oil: new Ingredient(new Vector4(-30, -50, -10, -5), new Vector4(1, 1, 1, 1), {}, 'ingredient.oil.title', 'ingredient.oil.description', 0x6a5acd),
		poison: new Ingredient(new Vector4(20, 30, 10, 2), new Vector4(1, 1, 1, 1), {}, 'ingredient.poison.title', 'ingredient.poison.description', 0x228b22),
		gem: new Ingredient(new Vector4(-10, 40, -20, 1), new Vector4(1, 1, 1, 1), {}, 'ingredient.gem.title', 'ingredient.gem.description', 0x8a2be2),
		diamond: new Ingredient(new Vector4(25, -30, 10, 2), new Vector4(1, 1, 1, 1), {}, 'ingredient.diamond.title', 'ingredient.diamond.description', 0x0088ff),
		emerald: new Ingredient(new Vector4(40, 20, 5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.emerald.title', 'ingredient.emerald.description', 0x50c878),
		cloud: new Ingredient(new Vector4(-50, 10, 30, 3), new Vector4(1, 1, 1, 1), {}, 'ingredient.cloud.title', 'ingredient.cloud.description', 0xd3d3d3),
		ice_crystal: new Ingredient(new Vector4(60, -40, -5, -2), new Vector4(1, 1, 1, 1), {}, 'ingredient.ice_crystal.title', 'ingredient.ice_crystal.description', 0x7fc7ff),
		dragon_blood: new Ingredient(new Vector4(-30, 40, 25, 1), new Vector4(1, 1, 1, 1), {}, 'ingredient.dragon_blood.title', 'ingredient.dragon_blood.description', 0x9b111e),
		obsidian: new Ingredient(new Vector4(10, 20, 5, -3), new Vector4(1, 1, 1, 1), {}, 'ingredient.obsidian.title', 'ingredient.obsidian.description', 0x1c1c1c),
		moonstone: new Ingredient(new Vector4(15, -10, -50, 2), new Vector4(1, 1, 1, 1), {}, 'ingredient.moonstone.title', 'ingredient.moonstone.description', 0x8d8f8d),
		quicksilver: new Ingredient(new Vector4(-20, -40, 10, 1), new Vector4(1, 1, 1, 1), {}, 'ingredient.quicksilver.title', 'ingredient.quicksilver.description', 0xaaaaaa),
		pearls: new Ingredient(new Vector4(25, 35, -10, 4), new Vector4(1, 1, 1, 1), {}, 'ingredient.pearls.title', 'ingredient.pearls.description', 0xf8f8ff),
		phoenix_feather: new Ingredient(new Vector4(-10, 60, 5, -4), new Vector4(1, 1, 1, 1), {}, 'ingredient.phoenix_feather.title', 'ingredient.phoenix_feather.description', 0xff5733),
		ruby: new Ingredient(new Vector4(50, -20, 15, 2), new Vector4(1, 1, 1, 1), {}, 'ingredient.ruby.title', 'ingredient.ruby.description', 0xd50032),
		magma: new Ingredient(new Vector4(-45, -10, -5, 3), new Vector4(1, 1, 1, 1), {}, 'ingredient.magma.title', 'ingredient.magma.description', 0xff6f00),
		nightshade: new Ingredient(new Vector4(35, -5, 25, 1), new Vector4(1, 1, 1, 1), {}, 'ingredient.nightshade.title', 'ingredient.nightshade.description', 0x800080),
		amber: new Ingredient(new Vector4(0, -25, 20, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.amber.title', 'ingredient.amber.description', 0xffbf00),
		obsidian_shard: new Ingredient(new Vector4(10, -60, 5, 2), new Vector4(1, 1, 1, 1), {}, 'ingredient.obsidian_shard.title', 'ingredient.obsidian_shard.description', 0x3a3a3a),
		star_dust: new Ingredient(new Vector4(20, -80, 50, 4), new Vector4(1, 1, 1, 1), {}, 'ingredient.star_dust.title', 'ingredient.star_dust.description', 0x9bfffc),
		galaxy_essence: new Ingredient(new Vector4(45, -40, -30, -1), new Vector4(1, 1, 1, 1), {}, 'ingredient.galaxy_essence.title', 'ingredient.galaxy_essence.description', 0x7a00b6),

		// receipt ingredients
		electrum: new Ingredient(new Vector4(40, -20, -2.5, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.electrum.title', 'ingredient.electrum.description', 0xdcd200),
		moon_tears: new Ingredient(new Vector4(-10, 30, -10, 2), new Vector4(2, 2, 1, 0), {}, 'ingredient.moon_tears.title', 'ingredient.moon_tears.description', 0xaaaaff),
		soul_stone: new Ingredient(new Vector4(5, 5, 0, 5), new Vector4(3, 1, 2, 0), {}, 'ingredient.soul_stone.title', 'ingredient.soul_stone.description', 0x551a8b),
		light_essence: new Ingredient(new Vector4(40, 20, 10, 1), new Vector4(2, 3, 1, 0), {}, 'ingredient.light_essence.title', 'ingredient.light_essence.description', 0xfffdd0),
		ash_velvet: new Ingredient(new Vector4(-30, -10, 20, -3), new Vector4(1, 1, 3, 0), {}, 'ingredient.ash_velvet.title', 'ingredient.ash_velvet.description', 0x7e7e7e),
		blood_crystal: new Ingredient(new Vector4(15, 25, -5, 0), new Vector4(2, 2, 1, 0), {}, 'ingredient.blood_crystal.title', 'ingredient.blood_crystal.description', 0xaa0033),
		mist_heart: new Ingredient(new Vector4(-5, -25, 15, 1), new Vector4(2, 1, 2, 0), {}, 'ingredient.mist_heart.title', 'ingredient.mist_heart.description', 0xb0e0e6),
		dragon_core: new Ingredient(new Vector4(10, 0, 25, -2), new Vector4(3, 2, 1, 0), {}, 'ingredient.dragon_core.title', 'ingredient.dragon_core.description', 0xc71585),
		ethereal_ink: new Ingredient(new Vector4(0, 40, -10, 3), new Vector4(2, 2, 1, 0), {}, 'ingredient.ethereal_ink.title', 'ingredient.ethereal_ink.description', 0x333366),
		starlight_dust: new Ingredient(new Vector4(35, -15, 0, 2), new Vector4(1, 2, 1, 0), {}, 'ingredient.starlight_dust.title', 'ingredient.starlight_dust.description', 0xe0ffff),
		hollow_shard: new Ingredient(new Vector4(-20, 10, -15, 4), new Vector4(2, 2, 2, 0), {}, 'ingredient.hollow_shard.title', 'ingredient.hollow_shard.description', 0x6b8e23),
		liquid_sun: new Ingredient(new Vector4(25, 20, 5, -1), new Vector4(3, 1, 1, 0), {}, 'ingredient.liquid_sun.title', 'ingredient.liquid_sun.description', 0xffd700),
		frozen_thorn: new Ingredient(new Vector4(5, -10, -25, 3), new Vector4(2, 2, 2, 0), {}, 'ingredient.frozen_thorn.title', 'ingredient.frozen_thorn.description', 0xadd8e6),
		molten_heart: new Ingredient(new Vector4(-40, -30, 20, 5), new Vector4(3, 1, 2, 0), {}, 'ingredient.molten_heart.title', 'ingredient.molten_heart.description', 0xff4500),
		echo_crystal: new Ingredient(new Vector4(30, 30, -5, 1), new Vector4(2, 2, 2, 0), {}, 'ingredient.echo_crystal.title', 'ingredient.echo_crystal.description', 0x7fffd4),
		whisper_root: new Ingredient(new Vector4(0, -5, -20, 2), new Vector4(2, 1, 2, 0), {}, 'ingredient.whisper_root.title', 'ingredient.whisper_root.description', 0x556b2f),
		alchemical_glass: new Ingredient(new Vector4(-10, -40, 5, 0), new Vector4(2, 2, 1, 0), {}, 'ingredient.alchemical_glass.title', 'ingredient.alchemical_glass.description', 0xffe4b5),
		venom_crystal: new Ingredient(new Vector4(20, 10, -25, 3), new Vector4(3, 1, 2, 0), {}, 'ingredient.venom_crystal.title', 'ingredient.venom_crystal.description', 0x8b008b),
		infinity_orb: new Ingredient(new Vector4(10, 10, 10, 0), new Vector4(2, 2, 2, 0), {}, 'ingredient.infinity_orb.title', 'ingredient.infinity_orb.description', 0x9370db),
		celestial_bloom: new Ingredient(new Vector4(-25, 5, 30, 2), new Vector4(2, 2, 1, 0), {}, 'ingredient.celestial_bloom.title', 'ingredient.celestial_bloom.description', 0xba55d3),
		aether_spark: new Ingredient(new Vector4(40, -25, -5, 3), new Vector4(1, 2, 2, 0), {}, 'ingredient.aether_spark.title', 'ingredient.aether_spark.description', 0x00ffff),
		siren_tear: new Ingredient(new Vector4(5, 10, -5, 1), new Vector4(1, 2, 1, 0), {}, 'ingredient.siren_tear.title', 'ingredient.siren_tear.description', 0x6ec6ff),
		fairy_dust: new Ingredient(new Vector4(0, -10, 15, 0), new Vector4(2, 1, 2, 0), {}, 'ingredient.fairy_dust.title', 'ingredient.fairy_dust.description', 0xffe0f0),
		shadow_essence_plus: new Ingredient(new Vector4(-10, 5, 5, -1), new Vector4(1, 1, 1, 0), {}, 'ingredient.shadow_essence_plus.title', 'ingredient.shadow_essence_plus.description', 0x111111),
		dragon_heart: new Ingredient(new Vector4(-25, 30, 15, 3), new Vector4(2, 2, 2, 0), {}, 'ingredient.dragon_heart.title', 'ingredient.dragon_heart.description', 0x8b0000),
		moonlight: new Ingredient(new Vector4(10, -5, -15, 2), new Vector4(1, 1, 1, 0), {}, 'ingredient.moonlight.title', 'ingredient.moonlight.description', 0xe6e6fa),
		lightning_spark: new Ingredient(new Vector4(15, 0, 5, 3), new Vector4(1, 2, 1, 0), {}, 'ingredient.lightning_spark.title', 'ingredient.lightning_spark.description', 0xddddff),
		phoenix_tears: new Ingredient(new Vector4(-5, 10, 10, -2), new Vector4(2, 2, 2, 0), {}, 'ingredient.phoenix_tears.title', 'ingredient.phoenix_tears.description', 0xff9999),
		sea_breath: new Ingredient(new Vector4(0, -20, 5, 2), new Vector4(2, 1, 1, 0), {}, 'ingredient.sea_breath.title', 'ingredient.sea_breath.description', 0x66ccff),
		sleep_dust: new Ingredient(new Vector4(-5, 15, -10, 0), new Vector4(1, 1, 1, 0), {}, 'ingredient.sleep_dust.title', 'ingredient.sleep_dust.description', 0xd8bfd8),
		forest_heart: new Ingredient(new Vector4(10, 10, -5, 1), new Vector4(1, 1, 1, 0), {}, 'ingredient.forest_heart.title', 'ingredient.forest_heart.description', 0x228b22),
		time_crystal: new Ingredient(new Vector4(20, 0, -10, 3), new Vector4(2, 2, 1, 0), {}, 'ingredient.time_crystal.title', 'ingredient.time_crystal.description', 0xcccccc),
		elixir_wisdom: new Ingredient(new Vector4(15, 10, -5, 2), new Vector4(1, 2, 1, 0), {}, 'ingredient.elixir_wisdom.title', 'ingredient.elixir_wisdom.description', 0x90caf9),
		magma_core: new Ingredient(new Vector4(-15, -5, 5, 0), new Vector4(2, 1, 1, 0), {}, 'ingredient.magma_core.title', 'ingredient.magma_core.description', 0xff3c00),
		frostbite: new Ingredient(new Vector4(25, -10, 5, 2), new Vector4(1, 1, 1, 0), {}, 'ingredient.frostbite.title', 'ingredient.frostbite.description', 0x99ccff),
		lucid_orb: new Ingredient(new Vector4(0, 30, -10, 3), new Vector4(2, 2, 2, 0), {}, 'ingredient.lucid_orb.title', 'ingredient.lucid_orb.description', 0xafeeee),
		poison_bloom: new Ingredient(new Vector4(-30, 0, 10, -1), new Vector4(1, 1, 1, 0), {}, 'ingredient.poison_bloom.title', 'ingredient.poison_bloom.description', 0x556b2f),
		ember_soul: new Ingredient(new Vector4(20, -20, -10, 2), new Vector4(2, 1, 2, 0), {}, 'ingredient.ember_soul.title', 'ingredient.ember_soul.description', 0xff7043),
		spectral_silk: new Ingredient(new Vector4(-5, 25, -5, 2), new Vector4(1, 2, 1, 0), {}, 'ingredient.spectral_silk.title', 'ingredient.spectral_silk.description', 0xc0c0ff),
		golden_blood: new Ingredient(new Vector4(10, -30, 15, 3), new Vector4(1, 2, 2, 0), {}, 'ingredient.golden_blood.title', 'ingredient.golden_blood.description', 0xffcc00),
		liquid_void: new Ingredient(new Vector4(-10, 10, 5, 1), new Vector4(2, 2, 1, 0), {}, 'ingredient.liquid_void.title', 'ingredient.liquid_void.description', 0x2e2e2e),
		dragons_breath: new Ingredient(new Vector4(30, -50, 20, 5), new Vector4(3, 2, 2, 0), {}, 'ingredient.dragons_breath.title', 'ingredient.dragons_breath.description', 0xff6347),
		infinity_core: new Ingredient(new Vector4(-40, 20, -10, 2), new Vector4(2, 2, 3, 0), {}, 'ingredient.infinity_core.title', 'ingredient.infinity_core.description', 0x4a148c),
		sun_drop: new Ingredient(new Vector4(10, 60, -15, 3), new Vector4(3, 1, 1, 0), {}, 'ingredient.sun_drop.title', 'ingredient.sun_drop.description', 0xffc107),
		eldritch_resin: new Ingredient(new Vector4(-25, -30, 30, 2), new Vector4(2, 3, 2, 0), {}, 'ingredient.eldritch_resin.title', 'ingredient.eldritch_resin.description', 0x6d4c41),
		shimmer_silk: new Ingredient(new Vector4(5, 35, -25, 1), new Vector4(1, 2, 2, 0), {}, 'ingredient.shimmer_silk.title', 'ingredient.shimmer_silk.description', 0xf8f8ff),
		volcanic_core: new Ingredient(new Vector4(15, -15, 40, 5), new Vector4(3, 2, 2, 0), {}, 'ingredient.volcanic_core.title', 'ingredient.volcanic_core.description', 0xff6f00),
		witchs_eye: new Ingredient(new Vector4(-5, -40, 25, 2), new Vector4(1, 1, 2, 0), {}, 'ingredient.witchs_eye.title', 'ingredient.witchs_eye.description', 0x800080),
		celestial_echo: new Ingredient(new Vector4(45, 10, -35, 4), new Vector4(3, 2, 3, 0), {}, 'ingredient.celestial_echo.title', 'ingredient.celestial_echo.description', 0x7fc7ff),
		minds_elixir: new Ingredient(new Vector4(-15, 50, 10, 3), new Vector4(2, 3, 2, 0), {}, 'ingredient.minds_elixir.title', 'ingredient.minds_elixir.description', 0x00bcd4),
		spectral_residue: new Ingredient(new Vector4(0, -60, -10, 1), new Vector4(1, 2, 1, 0), {}, 'ingredient.spectral_residue.title', 'ingredient.spectral_residue.description', 0xaaaaaa),
		magnetic_core: new Ingredient(new Vector4(10, 45, -5, 2), new Vector4(2, 1, 2, 0), {}, 'ingredient.magnetic_core.title', 'ingredient.magnetic_core.description', 0xb0c4de),
		gilded_venom: new Ingredient(new Vector4(20, -10, 15, 3), new Vector4(2, 2, 2, 0), {}, 'ingredient.gilded_venom.title', 'ingredient.gilded_venom.description', 0xffd700),
		ancient_dust: new Ingredient(new Vector4(-30, 15, 25, 4), new Vector4(3, 1, 3, 0), {}, 'ingredient.ancient_dust.title', 'ingredient.ancient_dust.description', 0xa1887f),
		void_ink: new Ingredient(new Vector4(35, -25, 10, 3), new Vector4(2, 3, 1, 0), {}, 'ingredient.void_ink.title', 'ingredient.void_ink.description', 0x1b1b2f),
		ocean_tear: new Ingredient(new Vector4(5, -20, 40, 2), new Vector4(2, 2, 2, 0), {}, 'ingredient.ocean_tear.title', 'ingredient.ocean_tear.description', 0x2196f3),
		moonfire_glass: new Ingredient(new Vector4(-10, 5, -30, 2), new Vector4(3, 2, 2, 0), {}, 'ingredient.moonfire_glass.title', 'ingredient.moonfire_glass.description', 0x9fa8da),
		luminous_honey: new Ingredient(new Vector4(50, 30, 0, 3), new Vector4(2, 2, 1, 0), {}, 'ingredient.luminous_honey.title', 'ingredient.luminous_honey.description', 0xffe082),
		stellar_essence: new Ingredient(new Vector4(0, 10, 60, 4), new Vector4(3, 2, 1, 0), {}, 'ingredient.stellar_essence.title', 'ingredient.stellar_essence.description', 0x9bfffc),
		radiant_bone: new Ingredient(new Vector4(-50, -20, 15, 5), new Vector4(2, 3, 2, 0), {}, 'ingredient.radiant_bone.title', 'ingredient.radiant_bone.description', 0xffffe0),
	})

}