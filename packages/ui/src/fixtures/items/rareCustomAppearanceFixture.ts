import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import boundlessSpirit from "./BoundlessSpirit.jpg";

/** A rare item dressed up entirely through its appearance, beyond what its rarity would give it */
export const rareCustomAppearanceFixture = new AbstractItem();
rareCustomAppearanceFixture.name = "Rare Robes of the Ember Court";
rareCustomAppearanceFixture.rarity = Rarity.Rare;
rareCustomAppearanceFixture.base = Equipment.RoyalClothes;
rareCustomAppearanceFixture.currency = 500;
rareCustomAppearanceFixture.appearance = {
	background: { image: boundlessSpirit },
	header: { deco: "STARS" },
	corners: "ORNATE",
	effects: { tilt: "EXTREME", sparkles: "STRONG" },
};
rareCustomAppearanceFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.4 },
	{ modifier: tieredFuryFixture, float: 0.3 },
];
rareCustomAppearanceFixture.secondary = [
	{ modifier: tieredStealthFixture, float: 0.3 },
];
