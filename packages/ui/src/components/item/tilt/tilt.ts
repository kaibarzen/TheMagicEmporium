import { Rarity } from "@tme/library/src/item/item.types";
import type { Intensity } from "@tme/shared/src/types/itemAppearance";

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

/** How long the light takes to sweep across the card once (ms) */
export const SWEEP_DURATION = 1100;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
