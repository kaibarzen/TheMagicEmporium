import { Rarity } from "@tme/library/src/item/item.types";
import type {
	GleamStyle,
	Intensity,
} from "@tme/shared/src/types/itemAppearance";

/** How each rarity tilts when the appearance leaves tilt on AUTO */
const RARITY_TILT: Record<Rarity, Intensity | "NONE"> = {
	[Rarity.Common]: "NONE",
	[Rarity.Uncommon]: "NONE",
	[Rarity.Rare]: "NONE",
	[Rarity.VeryRare]: "MEDIUM",
	[Rarity.Legendary]: "STRONG",
};

export const autoTilt = (rarity: Rarity): Intensity | "NONE" => {
	return RARITY_TILT[rarity];
};

/** Which rarities catch a light sweep on hover when the appearance leaves gleam on AUTO */
const RARITY_GLEAM: Record<Rarity, GleamStyle> = {
	[Rarity.Common]: "NONE",
	[Rarity.Uncommon]: "NONE",
	[Rarity.Rare]: "NONE",
	[Rarity.VeryRare]: "SWEEP",
	[Rarity.Legendary]: "SWEEP",
};

export const autoGleam = (rarity: Rarity): GleamStyle => {
	return RARITY_GLEAM[rarity];
};

/** How long the light takes to sweep across the card once (ms) */
export const SWEEP_DURATION = 1100;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
