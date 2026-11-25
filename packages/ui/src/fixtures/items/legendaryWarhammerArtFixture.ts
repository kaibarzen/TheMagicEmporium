import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { uniqueWrathfulFixture } from "../modifiers/unique/uniqueWrathful";

/** Warhammers have a cut-out (melee/martial/warhammer.cutout.png), so the card shows item art */
export const legendaryWarhammerArtFixture = new AbstractItem();
legendaryWarhammerArtFixture.name = "Legendary Thunderfall Maul";
legendaryWarhammerArtFixture.rarity = Rarity.Legendary;
legendaryWarhammerArtFixture.base = Equipment.Warhammer;
legendaryWarhammerArtFixture.currency = 7800;
legendaryWarhammerArtFixture.primary = [
	{ modifier: uniqueWrathfulFixture, float: 0.85 },
	{ modifier: tieredFuryFixture, float: 0.7 },
];
