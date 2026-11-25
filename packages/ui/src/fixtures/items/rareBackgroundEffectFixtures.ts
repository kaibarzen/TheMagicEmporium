import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import type { BackgroundBlur } from "@tme/shared/src/types/itemAppearance";
import { rareShatteredFixture } from "./rareShatteredFixture";

/**
 * The custom appearance rare item with a different background treatment.
 * The name changes with it, so seeded effects lay out differently.
 */
const withBackground = (blur: BackgroundBlur, name: string): AbstractItem => {
	const item = new AbstractItem();
	item.name = name;
	item.rarity = rareShatteredFixture.rarity;
	item.base = rareShatteredFixture.base;
	item.currency = rareShatteredFixture.currency;
	item.appearance = {
		...rareShatteredFixture.appearance,
		background: { ...rareShatteredFixture.appearance.background, blur },
	};
	item.primary = rareShatteredFixture.primary;
	item.secondary = rareShatteredFixture.secondary;
	item.tertiary = rareShatteredFixture.tertiary;
	return item;
};

export const rareParallaxFixture = withBackground(
	"PARALLAX",
	"Rare Robes of the Deep Window",
);

export const rareGlitchFixture = withBackground(
	"GLITCH",
	"Rare Robes of the Void Court",
);
