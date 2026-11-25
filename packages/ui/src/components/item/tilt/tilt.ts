import { Rarity } from "@tme/library/src/item/item.types";
import type { TiltMode } from "@tme/shared/src/types/itemAppearance";

/** How each rarity tilts when the appearance leaves tilt on AUTO */
const RARITY_TILT: Record<Rarity, TiltMode> = {
	[Rarity.Common]: "NONE",
	[Rarity.Uncommon]: "NONE",
	[Rarity.Rare]: "NONE",
	[Rarity.VeryRare]: "LIGHT",
	[Rarity.Legendary]: "HEAVY",
};

export const autoTilt = (rarity: Rarity): TiltMode => {
	return RARITY_TILT[rarity];
};

/** How long the light takes to sweep across the card once (ms) */
export const SWEEP_DURATION = 1100;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
