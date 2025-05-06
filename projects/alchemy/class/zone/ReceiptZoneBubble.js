import Ingredient from '../ingredient.js'
import { DoubleSide, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector4 } from 'https://unpkg.com/three@v0.160.0/build/three.module.js'
import EffectZoneBubble from './EffectZoneBubble.js'
import Brew from '../brew.js'

export default class ReceiptConditionsZoneBubble extends EffectZoneBubble {
	constructor(result = new Ingredient(), radius = 1, radiusW = 1, position = result.position) {
		super(position, radius, radiusW, result.color, (brew) => { /*console.log(this)*/ })
		this.result = result
		this.on_touch()
	}

	static fastBrewCords(...ingredients) {
		const brewInstance = new Brew()
		ingredients.forEach(ingredient => brewInstance.put(ingredient))
		//console.log(brewInstance, brewInstance.position)
		return brewInstance.position
	}

	static list = Object.freeze([
		new ReceiptConditionsZoneBubble(Ingredient.list.electrum.copy(1), 5, 1,
			this.fastBrewCords(
				Ingredient.list.gold.copy(1),
				Ingredient.list.silver.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.moon_tears.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.moonstone.copy(1),
				Ingredient.list.silver.copy(1),
				Ingredient.list.water.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.soul_stone.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.obsidian.copy(1),
				Ingredient.list.ash.copy(1),
				Ingredient.list.blood.copy(1),
				Ingredient.list.dragon_blood.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.light_essence.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.honey.copy(1),
				Ingredient.list.milk.copy(1),
				Ingredient.list.pearls.copy(1),
				Ingredient.list.gem.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.ash_velvet.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.clay.copy(1),
				Ingredient.list.ash.copy(1),
				Ingredient.list.ice.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.blood_crystal.copy(), 7, 1,
			this.fastBrewCords(
				Ingredient.list.blood.copy(1),
				Ingredient.list.ruby.copy(1),
				Ingredient.list.coal.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.mist_heart.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.cloud.copy(1),
				Ingredient.list.water.copy(1),
				Ingredient.list.ice_crystal.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.dragon_core.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.dragon_blood.copy(1),
				Ingredient.list.ruby.copy(1),
				Ingredient.list.fire.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.ethereal_ink.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.coal.copy(1),
				Ingredient.list.nightshade.copy(1),
				Ingredient.list.ice.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.starlight_dust.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.star_dust.copy(1),
				Ingredient.list.gem.copy(1),
				Ingredient.list.moonstone.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.hollow_shard.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.obsidian_shard.copy(1),
				Ingredient.list.poison.copy(1),
				Ingredient.list.wood.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.liquid_sun.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.honey.copy(1),
				Ingredient.list.gold.copy(1),
				Ingredient.list.amber.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.frozen_thorn.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.ice.copy(1),
				Ingredient.list.nightshade.copy(1),
				Ingredient.list.herb.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.molten_heart.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.magma.copy(1),
				Ingredient.list.coal.copy(1),
				Ingredient.list.blood.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.echo_crystal.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.ice_crystal.copy(1),
				Ingredient.list.star_dust.copy(1),
				Ingredient.list.quicksilver.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.whisper_root.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.herb.copy(1),
				Ingredient.list.wood.copy(1),
				Ingredient.list.ash.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.alchemical_glass.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.sand.copy(1),
				Ingredient.list.salt.copy(1),
				Ingredient.list.clay.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.venom_crystal.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.poison.copy(1),
				Ingredient.list.ruby.copy(1),
				Ingredient.list.ice.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.infinity_orb.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.galaxy_essence.copy(1),
				Ingredient.list.star_dust.copy(1),
				Ingredient.list.gem.copy(1),
				Ingredient.list.ice_crystal.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.celestial_bloom.copy(), 7, 1,
			this.fastBrewCords(
				Ingredient.list.herb.copy(1),
				Ingredient.list.honey.copy(1),
				Ingredient.list.pearls.copy(1),
				Ingredient.list.moonstone.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.aether_spark.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.galaxy_essence.copy(1),
				Ingredient.list.oil.copy(1),
				Ingredient.list.electrum.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.siren_tear.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.water.copy(1),
				Ingredient.list.pearls.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.fairy_dust.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.honey.copy(1),
				Ingredient.list.star_dust.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.shadow_essence_plus.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.coal.copy(1),
				Ingredient.list.ash.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.dragon_heart.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.fire.copy(1),
				Ingredient.list.dragon_blood.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.moonlight.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.moonstone.copy(1),
				Ingredient.list.water.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.lightning_spark.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.silver.copy(1),
				Ingredient.list.ice_crystal.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.phoenix_tears.copy(),
			5, 1,
			this.fastBrewCords(
				Ingredient.list.ash.copy(1),
				Ingredient.list.phoenix_feather.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.sea_breath.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.salt.copy(1),
				Ingredient.list.water.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.sleep_dust.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.moonstone.copy(1),
				Ingredient.list.honey.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.forest_heart.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.herb.copy(1),
				Ingredient.list.wood.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.time_crystal.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.sand.copy(1),
				Ingredient.list.gem.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.elixir_wisdom.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.silver.copy(1),
				Ingredient.list.salt.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(
			Ingredient.list.magma_core.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.fire.copy(1),
				Ingredient.list.magma.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(
			Ingredient.list.frostbite.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.ice.copy(1),
				Ingredient.list.obsidian.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.lucid_orb.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.star_dust.copy(1),
				Ingredient.list.galaxy_essence.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.poison_bloom.copy(), 4, 1,
			this.fastBrewCords(
				Ingredient.list.nightshade.copy(1),
				Ingredient.list.poison.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.ember_soul.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.fire.copy(1),
				Ingredient.list.phoenix_feather.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.spectral_silk.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.ice_crystal.copy(1),
				Ingredient.list.cloud.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.golden_blood.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.blood.copy(1),
				Ingredient.list.gold.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.liquid_void.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.obsidian.copy(1),
				Ingredient.list.oil.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.dragons_breath.copy(), 8, 1,
			this.fastBrewCords(
				Ingredient.list.dragon_blood.copy(5),
				Ingredient.list.fire.copy(3),
				Ingredient.list.coal.copy(2),
				Ingredient.list.gold.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.infinity_core.copy(), 10, 1,
			this.fastBrewCords(
				Ingredient.list.star_dust.copy(6),
				Ingredient.list.obsidian.copy(3),
				Ingredient.list.silver.copy(2),
				Ingredient.list.ice_crystal.copy(4),
				Ingredient.list.quicksilver.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.sun_drop.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.honey.copy(3),
				Ingredient.list.gold.copy(2),
				Ingredient.list.fire.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.eldritch_resin.copy(), 7, 1,
			this.fastBrewCords(
				Ingredient.list.clay.copy(4),
				Ingredient.list.herb.copy(3),
				Ingredient.list.oil.copy(2),
				Ingredient.list.nightshade.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.shimmer_silk.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.pearls.copy(2),
				Ingredient.list.silver.copy(3),
				Ingredient.list.water.copy(5),
				Ingredient.list.honey.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.volcanic_core.copy(), 9, 1,
			this.fastBrewCords(
				Ingredient.list.magma.copy(4),
				Ingredient.list.coal.copy(2),
				Ingredient.list.obsidian.copy(2),
				Ingredient.list.gold.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.witchs_eye.copy(), 7, 1,
			this.fastBrewCords(
				Ingredient.list.nightshade.copy(6),
				Ingredient.list.blood.copy(2),
				Ingredient.list.ash.copy(2),
				Ingredient.list.gem.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.celestial_echo.copy(), 10, 1,
			this.fastBrewCords(
				Ingredient.list.star_dust.copy(10),
				Ingredient.list.moonstone.copy(3),
				Ingredient.list.ice.copy(2),
				Ingredient.list.silver.copy(1),
				Ingredient.list.pearls.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.minds_elixir.copy(), 8, 1,
			this.fastBrewCords(
				Ingredient.list.wisdom_draught?.copy?.(1) || new Ingredient(),
				Ingredient.list.herb.copy(4),
				Ingredient.list.milk.copy(3),
				Ingredient.list.honey.copy(2)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.spectral_residue.copy(), 9, 1,
			this.fastBrewCords(
				Ingredient.list.ash.copy(2),
				Ingredient.list.moonstone.copy(3),
				Ingredient.list.cloud.copy(2),
				Ingredient.list.ice.copy(3)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.magnetic_core.copy(), 8, 1,
			this.fastBrewCords(
				Ingredient.list.iron.copy(5),
				Ingredient.list.stone.copy(3),
				Ingredient.list.obsidian.copy(1),
				Ingredient.list.electrum.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.gilded_venom.copy(), 7, 1,
			this.fastBrewCords(
				Ingredient.list.poison.copy(4),
				Ingredient.list.gold.copy(2),
				Ingredient.list.blood.copy(2),
				Ingredient.list.herb.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.ancient_dust.copy(), 9, 1,
			this.fastBrewCords(
				Ingredient.list.clay.copy(5),
				Ingredient.list.stone.copy(3),
				Ingredient.list.ash.copy(2),
				Ingredient.list.sand.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.void_ink.copy(), 8, 1,
			this.fastBrewCords(
				Ingredient.list.shadow_essence?.copy?.(1) || new Ingredient(),
				Ingredient.list.obsidian.copy(4),
				Ingredient.list.coal.copy(3),
				Ingredient.list.poison.copy(2)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.ocean_tear.copy(), 6, 1,
			this.fastBrewCords(
				Ingredient.list.water.copy(5),
				Ingredient.list.ice.copy(2),
				Ingredient.list.pearl?.copy?.(1) || Ingredient.list.pearls.copy(1),
				Ingredient.list.salt.copy(2)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.moonfire_glass.copy(), 9, 1,
			this.fastBrewCords(
				Ingredient.list.moonstone.copy(3),
				Ingredient.list.fire.copy(2),
				Ingredient.list.ice.copy(3),
				Ingredient.list.gem.copy(1),
				Ingredient.list.sand.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.luminous_honey.copy(), 5, 1,
			this.fastBrewCords(
				Ingredient.list.honey.copy(6),
				Ingredient.list.light?.copy?.(1) || Ingredient.list.star_dust.copy(1),
				Ingredient.list.gold.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.stellar_essence.copy(), 10, 1,
			this.fastBrewCords(
				Ingredient.list.galaxy_essence.copy(5),
				Ingredient.list.star_dust.copy(3),
				Ingredient.list.ice_crystal.copy(1),
				Ingredient.list.diamond.copy(1)
			)
		),
		new ReceiptConditionsZoneBubble(Ingredient.list.radiant_bone.copy(), 9, 1,
			this.fastBrewCords(
				Ingredient.list.milk.copy(4),
				Ingredient.list.ash.copy(2),
				Ingredient.list.silver.copy(2),
				Ingredient.list.clay.copy(2)
			)
		)
	])
}