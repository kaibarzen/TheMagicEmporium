/**
 * Visual customisation of a magic item card, stored on the item's flags.
 * Every field is optional: a missing field behaves like "AUTO", which derives
 * the value from the item itself (rarity, modifiers, base icon).
 */

/** "AUTO" derives the image, "NONE" hides it, anything else is an image URL */
export type AppearanceImage = "AUTO" | "NONE" | (string & {});

/** Decoration under the header art; only visible when the header has an image */
export type HeaderDeco = "CLOUDS" | "NONE";

/** How far the card tips toward the cursor on hover */
export type TiltMode = "NONE" | "LIGHT" | "HEAVY";

export interface ItemAppearance {
	background?: {
		/** AUTO takes the background from the item's modifiers. Defaults to AUTO */
		image?: AppearanceImage;
	};
	header?: {
		/** AUTO looks for a *.cutout.png next to the base item's icon. Defaults to AUTO */
		image?: AppearanceImage;
		/** Defaults to CLOUDS */
		deco?: HeaderDeco;
	};
	effects?: {
		/** AUTO tilts very rare cards lightly and legendary cards heavily. Defaults to AUTO */
		tilt?: "AUTO" | TiltMode;
		/** Number of sparkles. AUTO sparkles when every modifier rolled its highest breakpoint. Defaults to AUTO */
		sparkles?: "AUTO" | "NONE" | number;
		/** Iris reveal when the card appears. AUTO reveals whenever the card sparkles. Defaults to AUTO */
		reveal?: "AUTO" | boolean;
	};
}
