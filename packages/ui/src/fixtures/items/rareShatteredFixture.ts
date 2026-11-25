import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import boundlessSpirit from "./BoundlessSpirit.jpg";

/** The custom appearance rare item, with its background art seen through broken glass */
export const rareShatteredFixture = new AbstractItem();
rareShatteredFixture.name = "Rare Robes of the Ember Court";
rareShatteredFixture.rarity = Rarity.Rare;
rareShatteredFixture.base = Equipment.RoyalClothes;
rareShatteredFixture.currency = 500;
rareShatteredFixture.appearance = {
	background: { image: boundlessSpirit, blur: "SHATTERED" },
	header: { deco: "STARS" },
	corners: "ORNATE",
	effects: { tilt: "EXTREME", sparkles: "STRONG" },
};
rareShatteredFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.4 },
	{ modifier: tieredFuryFixture, float: 0.3 },
];
rareShatteredFixture.secondary = [
	{ modifier: tieredStealthFixture, float: 0.3 },
];
