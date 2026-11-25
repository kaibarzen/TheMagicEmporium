import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueBloodthirstyFixture } from "../modifiers/unique/uniqueBloodthirsty";

export const legendarySkulltakerFixture = new AbstractItem();
legendarySkulltakerFixture.name = "Legendary Skulltaker";
legendarySkulltakerFixture.rarity = Rarity.Legendary;
legendarySkulltakerFixture.base = Equipment.Handaxe;
legendarySkulltakerFixture.currency = 3200;
legendarySkulltakerFixture.primary = [
	{ modifier: uniqueBloodthirstyFixture, float: 0.5 },
	{ modifier: tieredFuryFixture, float: 0.7 },
];
legendarySkulltakerFixture.secondary = [
	{ modifier: tieredStealthFixture, float: 0.4 },
];
legendarySkulltakerFixture.tertiary = [
	{ modifier: linearFortitudeFixture, float: 0.6 },
];
