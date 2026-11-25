import { Rarity } from "@tme/library/src/item/item.types";

/** How elaborate the corner ornaments are, from a bare bracket up to ornate. */
export enum CornerDetail {
	/** Only the outer L bracket */
	Bracket = "bracket",
	/** Bracket with a square stud on the corner */
	Stud = "stud",
	/** The complete ornament */
	Full = "full",
	/** Complete ornament with extra flourishes and an ember glow */
	Ornate = "ornate",
}

export const RARITY_CORNER_DETAIL: Record<Rarity, CornerDetail> = {
	[Rarity.Common]: CornerDetail.Bracket,
	[Rarity.Uncommon]: CornerDetail.Stud,
	[Rarity.Rare]: CornerDetail.Full,
	[Rarity.VeryRare]: CornerDetail.Full,
	[Rarity.Legendary]: CornerDetail.Ornate,
};
