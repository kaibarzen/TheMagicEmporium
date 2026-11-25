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

/**
 * Ornaments on the card's four corners. BRACKET, STUD, FULL and ORNATE are
 * the fret corners from plainest to most elaborate; DIAMOND is a separate
 * design; NONE leaves the corners bare.
 */
export type CornerStyle =
	| "BRACKET"
	| "STUD"
	| "FULL"
	| "ORNATE"
	| "DIAMOND"
	| "NONE";

/** Animation that uncovers the card when it appears; NONE shows it straight away */
export type RevealStyle = "CIRCLE" | "NONE";

/** Light that plays across the card when the pointer enters it; NONE keeps the card unlit */
export type GleamStyle = "SWEEP" | "NONE";

/**
 * How the background art is treated.
 * - LIGHT softens the whole card evenly
 * - PARTIAL stays sharp behind the header and blurs progressively toward the modifiers
 * - FULL blurs the whole card evenly and strongly
 * - SHATTERED shows the art through broken glass
 * - PARALLAX is PARTIAL, drifting against the pointer as if seen through a window
 * - GLITCH splits the colour channels and jolts bands of the art sideways
 * - NONE keeps the art sharp everywhere
 */
export type BackgroundBlur =
	| "LIGHT"
	| "PARTIAL"
	| "FULL"
	| "SHATTERED"
	| "PARALLAX"
	| "GLITCH"
	| "NONE";

/** Strength of an effect, from barely there to over the top */
export type Intensity = "MILD" | "MEDIUM" | "STRONG" | "EXTREME";

export interface ItemAppearance {
	background?: {
		/** Defaults to NONE */
		image?: AppearanceImage;
		/** AUTO uses PARTIAL. Defaults to AUTO */
		blur?: "AUTO" | BackgroundBlur;
	};
	header?: {
		/** AUTO looks for a *.cutout.png next to the base item's icon. Defaults to AUTO */
		image?: "AUTO" | AppearanceImage;
		/** AUTO shows puffy clouds on rare and better cards and a bare line below. Defaults to AUTO */
		deco?: "AUTO" | HeaderDeco;
	};
	/** AUTO uses fret corners that grow more elaborate with rarity. Defaults to AUTO */
	corners?: "AUTO" | CornerStyle;
	effects?: {
		/** AUTO tilts very rare cards MEDIUM and legendary cards STRONG. Defaults to AUTO */
		tilt?: "AUTO" | "NONE" | Intensity;
		/**
		 * Sparkle density; the amount scales with the number of modifiers, so
		 * longer cards sparkle as densely as short ones. AUTO sparkles MEDIUM
		 * when every modifier rolled its highest breakpoint. Defaults to AUTO
		 */
		sparkles?: "AUTO" | "NONE" | Intensity;
		/** SWEEP sends one band of light across the card on hover. AUTO sweeps very rare and legendary cards. Defaults to AUTO */
		gleam?: "AUTO" | GleamStyle;
		/** CIRCLE opens the card in a widening circle. AUTO uses CIRCLE whenever the card sparkles. Defaults to AUTO */
		reveal?: "AUTO" | RevealStyle;
	};
}
