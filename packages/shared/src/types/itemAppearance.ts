/**
 * Visual customisation of a magic item card, stored on the item's flags.
 * Every field is optional: a missing field takes its documented default,
 * where "AUTO" derives the value from the item itself (rarity, modifiers, base icon).
 */

/** "NONE" hides the image, anything else is an image URL */
export type AppearanceImage = "NONE" | (string & {});

/** A CSS colour such as "#3fd0c9" */
export type AppearanceColor = string & {};

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

/**
 * Light that plays across the card under the pointer.
 * - SWEEP sends one band of light across the card when the pointer enters
 * - HOLO lays a rainbow foil over the art that shifts as the pointer moves
 * - NONE keeps the card unlit
 */
export type GleamStyle = "SWEEP" | "HOLO" | "NONE";

/**
 * Smoke behind the text. The colour comes in two spreads: the plain style
 * curls up from the bottom edge, the _FULL style drifts over the whole card.
 * - WHITE is a pale, ghostly violet-grey
 * - BLACK is a thick, near-black haze
 */
export type SmokeStyle = "WHITE" | "BLACK" | "WHITE_FULL" | "BLACK_FULL";

/**
 * Colour of the embers that rise from the bottom edge, flicker and burn out.
 * - BRIGHT burns white-hot to orange to a dull red, like embers off a campfire
 * - FIRE burns a deeper, angrier red
 * - GOLDEN glitters pale gold to amber
 * - BLACK drifts up as void-black specks in a cold violet glow
 * - WISPS glow in every colour, each one slowly shifting hue
 */
export type EmberStyle = "BRIGHT" | "FIRE" | "GOLDEN" | "BLACK" | "WISPS";

/**
 * How the background art is treated.
 * - LIGHT softens the whole card evenly
 * - PARTIAL stays sharp behind the header and blurs progressively toward the modifiers
 * - FULL blurs the whole card evenly and strongly
 * - SHATTERED shows the art through broken glass
 * - PARALLAX is PARTIAL, drifting against the pointer as if seen through a window
 * - GLITCH splits the colour channels and jolts bands of the art sideways
 * - WOBBLE is PARTIAL, warping and breathing like something alive
 * - NONE keeps the art sharp everywhere
 */
export type BackgroundBlur =
	| "LIGHT"
	| "PARTIAL"
	| "FULL"
	| "SHATTERED"
	| "PARALLAX"
	| "GLITCH"
	| "WOBBLE"
	| "NONE";

/**
 * How an edge image is softened.
 * - LIGHT takes the edge off it, barely softer than sharp
 * - MEDIUM softens it noticeably, as if slightly out of focus
 * - NONE keeps it sharp
 */
export type EdgeBlur = "LIGHT" | "MEDIUM" | "NONE";

/**
 * An image pinned to the top or bottom edge of the card, in front of the
 * background art. It spans the card's width and keeps its own proportions,
 * so a strip looks the same on short and tall cards. Its inner side fades
 * out on its own, and it stays put while the art behind it moves.
 */
export interface BackgroundEdge {
	/**
	 * AUTO looks for a *.top.png or *.bottom.png next to the background image
	 * (`cave.jpg` → `cave.top.png`) and shows it if it exists; without a
	 * background image there is nothing to look for. NONE turns the edge off.
	 * Defaults to AUTO
	 */
	image?: "AUTO" | AppearanceImage;
	/** AUTO softens the image LIGHT. Defaults to AUTO */
	blur?: "AUTO" | EdgeBlur;
}

/** Strength of an effect, from barely there to over the top */
export type Intensity = "MILD" | "MEDIUM" | "STRONG" | "EXTREME";

export interface ItemAppearance {
	colors?: {
		/**
		 * Accent for the rarity label, pips, seal, glows and the legendary
		 * ember. AUTO uses the rarity colour. Defaults to AUTO
		 */
		accent?: "AUTO" | AppearanceColor;
		/**
		 * Metal of the frame, corners, rules, dividers, footer and clouds; its
		 * lighter and darker shades are mixed from this one colour. AUTO uses
		 * the rarity's metal (iron, bronze, silver, amethyst, gold). Defaults to AUTO
		 */
		metal?: "AUTO" | AppearanceColor;
	};
	background?: {
		/** Defaults to NONE */
		image?: AppearanceImage;
		/** AUTO uses PARTIAL. Defaults to AUTO */
		blur?: "AUTO" | BackgroundBlur;
		/** Image along the top edge, such as a cave ceiling or hanging roots */
		top?: BackgroundEdge;
		/** Image along the bottom edge, such as rubble, mist or a dark ground */
		bottom?: BackgroundEdge;
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
		/** AUTO sweeps very rare and legendary cards. Defaults to AUTO */
		gleam?: "AUTO" | GleamStyle;
		/** AUTO shows no smoke for now. Defaults to AUTO */
		smoke?: "AUTO" | "NONE" | SmokeStyle;
		/** AUTO shows no embers for now. Defaults to AUTO */
		embers?: "AUTO" | "NONE" | EmberStyle;
		/** CIRCLE opens the card in a widening circle. AUTO uses CIRCLE whenever the card sparkles. Defaults to AUTO */
		reveal?: "AUTO" | RevealStyle;
	};
}
