import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import type { AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import type { ItemAppearance } from "@tme/shared/src/types/itemAppearance";
import { linearFortitudeFixture } from "../modifiers/linear/linearFortitude";
import { tieredFuryFixture } from "../modifiers/tiered/tieredFury";
import { tieredStealthFixture } from "../modifiers/tiered/tieredStealth";
import { uniqueVenomousFixture } from "../modifiers/unique/uniqueVenomous";
import boundlessSpirit from "./BoundlessSpirit.jpg";

/**
 * The general rare item every ItemDisplay appearance story builds on. Royal
 * clothes have a cut-out, so the header shows item art; the background art is
 * the only appearance setting, everything else stays on AUTO.
 */
export const baseRareFixture = new AbstractItem();
baseRareFixture.name = "Rare Robes of the Ember Court";
baseRareFixture.rarity = Rarity.Rare;
baseRareFixture.base = Equipment.RoyalClothes;
baseRareFixture.currency = 500;
baseRareFixture.appearance = {
	background: { image: boundlessSpirit },
};
baseRareFixture.primary = [
	{ modifier: uniqueVenomousFixture, float: 0.4 },
	{ modifier: tieredFuryFixture, float: 0.3 },
];
baseRareFixture.secondary = [{ modifier: tieredStealthFixture, float: 0.3 }];
baseRareFixture.tertiary = [{ modifier: linearFortitudeFixture, float: 0.5 }];

/**
 * A copy of the base rare item with the given appearance laid over its own,
 * group by group. A different name lays seeded effects (shattered glass,
 * glitch bands) out differently.
 */
export const withAppearance = (
	appearance: ItemAppearance,
	name: string = baseRareFixture.name,
): AbstractItem => {
	const base = baseRareFixture.appearance;
	const item = new AbstractItem();
	item.name = name;
	item.rarity = baseRareFixture.rarity;
	item.base = baseRareFixture.base;
	item.currency = baseRareFixture.currency;
	item.appearance = {
		colors: { ...base.colors, ...appearance.colors },
		background: { ...base.background, ...appearance.background },
		header: { ...base.header, ...appearance.header },
		corners: appearance.corners ?? base.corners,
		effects: { ...base.effects, ...appearance.effects },
	};
	item.primary = baseRareFixture.primary;
	item.secondary = baseRareFixture.secondary;
	item.tertiary = baseRareFixture.tertiary;
	return item;
};

/** The same modifiers, each rolled at its highest breakpoint */
const maxRolls = (applied: AppliedModifier[]): AppliedModifier[] => {
	return applied.map((rolled): AppliedModifier => {
		return { modifier: rolled.modifier, float: 1 };
	});
};

/** The base rare item with every modifier rolled at its highest breakpoint */
export const baseRarePerfectFixture = withAppearance({});
baseRarePerfectFixture.primary = maxRolls(baseRareFixture.primary);
baseRarePerfectFixture.secondary = maxRolls(baseRareFixture.secondary);
baseRarePerfectFixture.tertiary = maxRolls(baseRareFixture.tertiary);
