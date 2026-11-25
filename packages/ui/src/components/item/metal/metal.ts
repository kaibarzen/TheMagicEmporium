import { Rarity } from "@tme/library/src/item/item.types";
import type { CSSProperties } from "react";

/**
 * The metal an item card is wrought from. It colours the card's structure
 * (frame, hairline, corners, rules, dividers, footer, clouds), while the
 * rarity colour stays an accent (label, pips, seal, glow).
 */
export interface Metal {
	/** Brightest highlight: kanji, gem cores */
	pale: string;
	/** Bright centre of the rules */
	hi: string;
	/** The metal itself: outlines, corner frets, diamonds */
	base: string;
	/** Darker shade the rules fade through */
	dim: string;
	/** Darkest shade: quiet divider lines */
	lo: string;
	/** Muted text set in the metal */
	text: string;
}

const IRON: Metal = {
	pale: "#d8d4cc",
	hi: "#b5b0a6",
	base: "#8b867c",
	dim: "#5c5850",
	lo: "#45423d",
	text: "#8e897f",
};

const BRONZE: Metal = {
	pale: "#f0cfae",
	hi: "#d9a477",
	base: "#b47a4c",
	dim: "#77492b",
	lo: "#553a28",
	text: "#a3836a",
};

const SILVER: Metal = {
	pale: "#f4f7fb",
	hi: "#dde3ea",
	base: "#aeb7c4",
	dim: "#6b7380",
	lo: "#474d57",
	text: "#9aa3b0",
};

const AMETHYST: Metal = {
	pale: "#eedcff",
	hi: "#cfa8f5",
	base: "#9f72d6",
	dim: "#5f3f8a",
	lo: "#433258",
	text: "#9a86b4",
};

const GOLD: Metal = {
	pale: "#f3dca0",
	hi: "#e8c87a",
	base: "#d4a64a",
	dim: "#8a6a2c",
	lo: "#5a4e32",
	text: "#a89468",
};

export const RARITY_METAL: Record<Rarity, Metal> = {
	[Rarity.Common]: IRON,
	[Rarity.Uncommon]: BRONZE,
	[Rarity.Rare]: SILVER,
	[Rarity.VeryRare]: AMETHYST,
	[Rarity.Legendary]: GOLD,
};

/** Glow that legendary cards smoulder with on top of their gold */
export const EMBER = "#ee7e3e";

/**
 * References to the metal custom properties, for inline SVG styles.
 * Presentation attributes cannot read custom properties reliably, so pass
 * these through `style` (`style={{ stroke: METAL.base }}`).
 */
export const METAL: Metal = {
	pale: "var(--metal-pale)",
	hi: "var(--metal-hi)",
	base: "var(--metal)",
	dim: "var(--metal-dim)",
	lo: "var(--metal-lo)",
	text: "var(--metal-text)",
};

/** Custom properties that make everything below wear the given metal. */
export const metalVars = (metal: Metal): CSSProperties => {
	return {
		"--metal-pale": metal.pale,
		"--metal-hi": metal.hi,
		"--metal": metal.base,
		"--metal-dim": metal.dim,
		"--metal-lo": metal.lo,
		"--metal-text": metal.text,
	} as CSSProperties;
};

/** Custom properties that make everything below wear the rarity's metal. */
export const metalStyle = (rarity: Rarity): CSSProperties => {
	return {
		...metalVars(RARITY_METAL[rarity]),
		"--ember": EMBER,
	} as CSSProperties;
};
