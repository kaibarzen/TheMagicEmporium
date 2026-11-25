import type { Metal } from "../metal/metal";

/**
 * The cultivation realm a modifier section belongs to. Each step up wears a
 * brighter metal on its header, so the card reads as a progression.
 */
export enum SectionTier {
	/** 凡 fán: primary modifiers */
	Mortal = "mortal",
	/** 灵 líng: secondary modifiers */
	Spirit = "spirit",
	/** 仙 xiān: tertiary modifiers */
	Immortal = "immortal",
}

export interface TierLabel {
	kanji: string;
	title: string;
}

export const TIER_LABEL: Record<SectionTier, TierLabel> = {
	[SectionTier.Mortal]: { kanji: "凡", title: "FAN" },
	[SectionTier.Spirit]: { kanji: "灵", title: "LING" },
	[SectionTier.Immortal]: { kanji: "仙", title: "XIAN" },
};

/** Muted bronze: earthly, unpolished */
const MORTAL_BRONZE: Metal = {
	pale: "#d6bc9f",
	hi: "#b08c69",
	base: "#8f6c4c",
	dim: "#5b4431",
	lo: "#433428",
	text: "#8a7562",
};

/** Silver with a cool jade cast */
const SPIRIT_JADE: Metal = {
	pale: "#e4f5ec",
	hi: "#bcdccb",
	base: "#8cbca6",
	dim: "#4f7666",
	lo: "#3a5248",
	text: "#8ea99c",
};

/** Bright, almost white-hot gold */
const IMMORTAL_GOLD: Metal = {
	pale: "#fff1c4",
	hi: "#f7d886",
	base: "#ebbc52",
	dim: "#9c7832",
	lo: "#614d27",
	text: "#bb9f60",
};

/** The metal each tier's section header is wrought from, independent of the card's rarity metal. */
export const TIER_METAL: Record<SectionTier, Metal> = {
	[SectionTier.Mortal]: MORTAL_BRONZE,
	[SectionTier.Spirit]: SPIRIT_JADE,
	[SectionTier.Immortal]: IMMORTAL_GOLD,
};
