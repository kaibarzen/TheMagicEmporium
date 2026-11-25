/** Embers rise through the whole card, so they grow with it like the sparkles */
const EMBERS_PER_MODIFIER = 8;

/** Smoke only gathers along the bottom edge, so every card gets the same amount */
export const SMOKE_AMOUNT = 22;

/** Number of embers for a card with `modifierCount` modifiers; an empty card counts as one modifier */
export const emberAmount = (modifierCount: number): number => {
	return EMBERS_PER_MODIFIER * Math.max(1, modifierCount);
};
