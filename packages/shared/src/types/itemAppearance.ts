/**
 * Visual customisation of a magic item card, stored on the item's flags.
 * Every field is optional: a missing field takes its documented default,
 * where "AUTO" derives the value from the item itself (rarity, modifiers, base icon).
 */

/** "NONE" hides the image, anything else is an image URL */
export type AppearanceImage = "NONE" | (string & {});

/**
 * Cloud design on the golden line under the header art; only visible when the
 * header has an image. NONE leaves the line bare.
 */
export type HeaderDeco =
	| "PUFFY"
	| "RUYI"
	| "BAND"
	| "WIND"
	| "DIAMONDS"
	| "STARS"
	| "NONE";

/** How far the card tips toward the cursor on hover */
export type TiltMode = "NONE" | "LIGHT" | "HEAVY";

export interface ItemAppearance {
	background?: {
		/** Defaults to NONE */
		image?: AppearanceImage;
	};
	header?: {
		/** AUTO looks for a *.cutout.png next to the base item's icon. Defaults to AUTO */
		image?: "AUTO" | AppearanceImage;
		/** AUTO shows puffy clouds on rare and better cards and a bare line below. Defaults to AUTO */
		deco?: "AUTO" | HeaderDeco;
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
