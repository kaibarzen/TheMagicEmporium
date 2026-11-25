import { Rarity } from "@tme/library/src/item/item.types";
import type { CSSProperties } from "react";
import { type Metal, metalVars, RARITY_METAL } from "../metal/metal";

export const RARITY_COLOR: Record<Rarity, string> = {
	[Rarity.Common]: "#9d9d9d",
	[Rarity.Uncommon]: "#4fc978",
	[Rarity.Rare]: "#5b9de8",
	[Rarity.VeryRare]: "#b88ce8",
	[Rarity.Legendary]: "#ee7e3e",
};

/** The two colours a card is themed with */
export interface CardColors {
	/** Label, pips, seal, glows and the legendary ember */
	accent: string;
	/** Frame, corners, rules, dividers, footer and clouds */
	metal: Metal;
}

/** The colours a card of the given rarity wears when nothing overrides them */
export const rarityColors = (rarity: Rarity): CardColors => {
	return {
		accent: RARITY_COLOR[rarity],
		metal: RARITY_METAL[rarity],
	};
};

/** Custom properties that make everything below wear the given colours */
export const colorStyle = (colors: CardColors): CSSProperties => {
	return {
		...metalVars(colors.metal),
		"--rarity-color": colors.accent,
		// The legendary ember burns in the accent, which is ember orange by default
		"--ember": colors.accent,
	} as CSSProperties;
};
