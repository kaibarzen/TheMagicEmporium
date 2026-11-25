import { Rarity } from "@tme/library/src/item/item.types";

/** Rarities whose cards tilt toward the cursor and catch a light sweep on hover */
const TILT_RARITIES: ReadonlySet<Rarity> = new Set([
	Rarity.VeryRare,
	Rarity.Legendary,
]);

export const tiltsOnHover = (rarity: Rarity): boolean => {
	return TILT_RARITIES.has(rarity);
};

/** How long the light takes to sweep across the card once (ms) */
export const SWEEP_DURATION = 1100;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
