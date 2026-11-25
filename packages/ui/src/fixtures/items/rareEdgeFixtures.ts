import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import type { ItemAppearance } from "@tme/shared/src/types/itemAppearance";
import blood from "./edges/blood.png";
import darkIce from "./edges/darkIce.png";
import darkTentacles from "./edges/darkTentacles.png";
import destruction from "./edges/destruction.png";
import ice from "./edges/ice.png";
import mistRuins from "./edges/mistRuins.png";
import skulls from "./edges/skulls.png";
import tentacles from "./edges/tentacles.png";
import { rareShatteredFixture } from "./rareShatteredFixture";

/** The example edge strips generated with the background-edge ComfyUI workflows */
export const edgeImages = {
	blood,
	darkIce,
	darkTentacles,
	destruction,
	mistRuins,
	ice,
	skulls,
	tentacles,
};

/** The custom appearance rare item with a different background, renamed so seeded effects differ */
const withBackground = (
	background: ItemAppearance["background"],
	name: string,
): AbstractItem => {
	const item = new AbstractItem();
	item.name = name;
	item.rarity = rareShatteredFixture.rarity;
	item.base = rareShatteredFixture.base;
	item.currency = rareShatteredFixture.currency;
	item.appearance = {
		...rareShatteredFixture.appearance,
		background: {
			...rareShatteredFixture.appearance.background,
			blur: "PARTIAL",
			...background,
		},
	};
	item.primary = rareShatteredFixture.primary;
	item.secondary = rareShatteredFixture.secondary;
	item.tertiary = rareShatteredFixture.tertiary;
	return item;
};

/** Blood running down from the top edge */
export const rareBloodEdgeFixture = withBackground(
	{ top: { image: blood } },
	"Rare Robes of the Red Harvest",
);

/** A heap of skulls along the bottom edge */
export const rareSkullsEdgeFixture = withBackground(
	{ bottom: { image: skulls } },
	"Rare Robes of the Ossuary",
);

/** Bright ice breaking apart along the bottom edge */
export const rareIceEdgeFixture = withBackground(
	{ bottom: { image: ice } },
	"Rare Robes of the Thaw",
);

/** Dark ice breaking apart along the bottom edge */
export const rareDarkIceEdgeFixture = withBackground(
	{ bottom: { image: darkIce } },
	"Rare Robes of the Black Floe",
);

/** Bright purple octopus arms curling up from the bottom edge */
export const rareTentaclesEdgeFixture = withBackground(
	{ bottom: { image: tentacles } },
	"Rare Robes of the Reaching Deep",
);

/** Dark octopus arms curling up from the bottom edge */
export const rareDarkTentaclesEdgeFixture = withBackground(
	{ bottom: { image: darkTentacles } },
	"Rare Robes of the Drowned Choir",
);

/** Rubble and broken pillars along the bottom edge */
export const rareDestructionEdgeFixture = withBackground(
	{ bottom: { image: destruction } },
	"Rare Robes of the Fallen Keep",
);

/** Ruins sinking into violet mist along the bottom edge */
export const rareMistRuinsEdgeFixture = withBackground(
	{ bottom: { image: mistRuins } },
	"Rare Robes of the Hollow Deep",
);

/** Blood from the top and skulls along the bottom, both edges at once */
export const rareBloodAndSkullsEdgesFixture = withBackground(
	{ top: { image: blood }, bottom: { image: skulls, blur: "LIGHT" } },
	"Rare Robes of the Butcher King",
);

/** Blurred edges in front of parallax art, which drifts behind them */
export const rareParallaxEdgesFixture = withBackground(
	{
		blur: "PARALLAX",
		top: { image: blood, blur: "LIGHT" },
		bottom: { image: destruction, blur: "MEDIUM" },
	},
	"Rare Robes of the Cavern Mouth",
);

/**
 * Edges left on AUTO: redBloodSkull.jpg has a redBloodSkull.top.png and a
 * redBloodSkull.bottom.png next to it, so the card picks both up by itself
 */
export const rareAutoEdgesFixture = withBackground(
	{
		image: "modules/the-magic-emporium/backgrounds/redBloodSkull.jpg",
	},
	"Rare Robes of the Crimson Ossuary",
);
