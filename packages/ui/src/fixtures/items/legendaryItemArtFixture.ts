import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { uniqueBloodthirstyFixture } from "../modifiers/unique/uniqueBloodthirsty";

/** Royal clothes have a cut-out (clothes/royal.cutout.png), so the card shows item art */
export const legendaryItemArtFixture = new AbstractItem();
legendaryItemArtFixture.appearance = { background: { image: "NONE" } };
legendaryItemArtFixture.name = "Legendary Regalia of the Jade Throne";
legendaryItemArtFixture.rarity = Rarity.Legendary;
legendaryItemArtFixture.base = Equipment.RoyalClothes;
legendaryItemArtFixture.currency = 9500;
legendaryItemArtFixture.primary = [
	{ modifier: uniqueBloodthirstyFixture, float: 0.8 },
];
legendaryItemArtFixture.tertiary = [
	{ modifier: linearFortitudeFixture, float: 0.9 },
];
