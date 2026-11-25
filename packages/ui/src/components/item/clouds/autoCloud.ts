import { Rarity } from "@tme/library/src/item/item.types";
import { type CloudVariant, DEFAULT_CLOUD_VARIANT } from "./CloudDecoration";

/** Cloud design each rarity gets when the appearance leaves the header deco on AUTO; null for a bare line */
const RARITY_CLOUD: Record<Rarity, CloudVariant | null> = {
	[Rarity.Common]: null,
	[Rarity.Uncommon]: null,
	[Rarity.Rare]: DEFAULT_CLOUD_VARIANT,
	[Rarity.VeryRare]: DEFAULT_CLOUD_VARIANT,
	[Rarity.Legendary]: DEFAULT_CLOUD_VARIANT,
};

export const autoCloud = (rarity: Rarity): CloudVariant | null => {
	return RARITY_CLOUD[rarity];
};
