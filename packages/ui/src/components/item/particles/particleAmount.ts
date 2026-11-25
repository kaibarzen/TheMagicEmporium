/** Embers rise through the whole card, so they grow with it like the sparkles */
const EMBERS_PER_MODIFIER = 8;

/** Rising smoke only gathers along the bottom edge, so every card gets the same amount */
export const SMOKE_AMOUNT = 22;

/** Full-card smoke fills the whole card, so it grows with it like the embers */
const FULL_SMOKE_PER_MODIFIER = 12;

/** Number of embers for a card with `modifierCount` modifiers; an empty card counts as one modifier */
export const emberAmount = (modifierCount: number): number => {
	return EMBERS_PER_MODIFIER * Math.max(1, modifierCount);
};

/** Number of puffs for full-card smoke on a card with `modifierCount` modifiers; an empty card counts as one modifier */
export const fullSmokeAmount = (modifierCount: number): number => {
	return FULL_SMOKE_PER_MODIFIER * Math.max(1, modifierCount);
};
