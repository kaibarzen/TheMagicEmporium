import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import type {
	EmberStyle,
	ItemAppearance,
} from "@tme/shared/src/types/itemAppearance";
import { rareCustomAppearanceFixture } from "./rareCustomAppearanceFixture";

/**
 * The custom appearance rare item with its sparkles swapped for another
 * effect. The name changes with it, so the cards are told apart.
 */
const withEffect = (
	effects: ItemAppearance["effects"],
	name: string,
): AbstractItem => {
	const item = new AbstractItem();
	item.name = name;
	item.rarity = rareCustomAppearanceFixture.rarity;
	item.base = rareCustomAppearanceFixture.base;
	item.currency = rareCustomAppearanceFixture.currency;
	item.appearance = {
		...rareCustomAppearanceFixture.appearance,
		effects: {
			...rareCustomAppearanceFixture.appearance.effects,
			sparkles: "NONE",
			...effects,
		},
	};
	item.primary = rareCustomAppearanceFixture.primary;
	item.secondary = rareCustomAppearanceFixture.secondary;
	item.tertiary = rareCustomAppearanceFixture.tertiary;
	return item;
};

export const rareHoloFixture = withEffect(
	{ gleam: "HOLO" },
	"Rare Robes of the Prism Court",
);

const withEmbers = (style: EmberStyle, name: string): AbstractItem => {
	return withEffect({ embers: style }, name);
};

export const rareBrightEmbersFixture = withEmbers(
	"BRIGHT",
	"Rare Robes of the Ember Court",
);

export const rareFireEmbersFixture = withEmbers(
	"FIRE",
	"Rare Robes of the Blazing Court",
);

export const rareGoldenEmbersFixture = withEmbers(
	"GOLDEN",
	"Rare Robes of the Gilded Court",
);

export const rareBlackEmbersFixture = withEmbers(
	"BLACK",
	"Rare Robes of the Starless Court",
);

export const rareWispEmbersFixture = withEmbers(
	"WISPS",
	"Rare Robes of the Fae Court",
);

export const rareWhiteSmokeFixture = withEffect(
	{ smoke: "WHITE" },
	"Rare Robes of the Hollow Court",
);

export const rareBlackSmokeFixture = withEffect(
	{ smoke: "BLACK" },
	"Rare Robes of the Smothered Court",
);

export const rareWhiteFullSmokeFixture = withEffect(
	{ smoke: "WHITE_FULL" },
	"Rare Robes of the Misted Court",
);

export const rareBlackFullSmokeFixture = withEffect(
	{ smoke: "BLACK_FULL" },
	"Rare Robes of the Shrouded Court",
);
