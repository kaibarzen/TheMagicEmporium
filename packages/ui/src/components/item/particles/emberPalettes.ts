import type { EmberStyle } from "@tme/shared/src/types/itemAppearance";

/** What a palette needs to know about an ember to colour it */
export interface EmberShade {
	/** Heat left, 1 when born and 0 when it burns out */
	heat: number;
	/** The ember's own hue (0..360), for palettes that colour each ember differently */
	hue: number;
	/** Seconds since the ember was born */
	age: number;
}

/** How one style of ember is coloured */
export interface EmberPalette {
	/** Colour of the ember's bright core at the given opacity */
	core: (shade: EmberShade, alpha: number) => string;
	/** Colour of the soft glow around it at the given opacity */
	halo: (shade: EmberShade, alpha: number) => string;
	/** "lighter" adds light to the card; "source-over" paints over it, for dark embers */
	coreBlend: GlobalCompositeOperation;
	/** Opacity of the glow relative to the core */
	haloStrength: number;
	/** Core size relative to a BRIGHT ember */
	coreScale: number;
	/** Glow radius as a multiple of the core radius */
	haloSpread: number;
}

type Rgb = [number, number, number];

const mix = (a: Rgb, b: Rgb, t: number): string => {
	return a.map((value, i) => Math.round(value + (b[i] - value) * t)).join(", ");
};

/** Colour for the heat left: `hot` at birth, `warm` halfway, `cool` as it burns out */
const ramp = (
	hot: Rgb,
	warm: Rgb,
	cool: Rgb,
): ((shade: EmberShade, alpha: number) => string) => {
	return (shade: EmberShade, alpha: number): string => {
		const rgb =
			shade.heat > 0.5
				? mix(warm, hot, (shade.heat - 0.5) * 2)
				: mix(cool, warm, shade.heat * 2);
		return `rgba(${rgb}, ${alpha})`;
	};
};

const glowing = (hot: Rgb, warm: Rgb, cool: Rgb): EmberPalette => {
	const colour = ramp(hot, warm, cool);
	return {
		core: colour,
		halo: colour,
		coreBlend: "lighter",
		haloStrength: 0.6,
		coreScale: 1,
		haloSpread: 5,
	};
};

/** Degrees a rainbow ember's hue turns each second */
const HUE_DRIFT = 40;

const rainbowHue = (shade: EmberShade): number => {
	return (shade.hue + shade.age * HUE_DRIFT) % 360;
};

export const EMBER_PALETTES: Record<EmberStyle, EmberPalette> = {
	BRIGHT: glowing([255, 238, 180], [255, 140, 40], [190, 40, 15]),
	FIRE: glowing([255, 205, 140], [255, 70, 20], [160, 10, 5]),
	GOLDEN: glowing([255, 252, 225], [255, 205, 95], [195, 130, 35]),
	BLACK: {
		core: ramp([6, 2, 14], [2, 0, 6], [0, 0, 0]),
		halo: ramp([195, 160, 255], [120, 60, 255], [45, 12, 130]),
		coreBlend: "source-over",
		haloStrength: 0.75,
		coreScale: 1.7,
		haloSpread: 2.4,
	},
	WISPS: {
		core: (shade: EmberShade, alpha: number): string => {
			return `hsla(${rainbowHue(shade)}, 100%, ${72 + shade.heat * 18}%, ${alpha})`;
		},
		halo: (shade: EmberShade, alpha: number): string => {
			return `hsla(${rainbowHue(shade)}, 100%, 60%, ${alpha})`;
		},
		coreBlend: "lighter",
		haloStrength: 0.75,
		coreScale: 1,
		haloSpread: 6,
	},
};
