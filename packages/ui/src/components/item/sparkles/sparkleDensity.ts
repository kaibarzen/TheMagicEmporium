import type { Intensity } from "@tme/shared/src/types/itemAppearance";

/** Sparkles per modifier at each intensity; the card grows with its modifiers, so this keeps the density even */
const SPARKLES_PER_MODIFIER: Record<Intensity, number> = {
	MILD: 3,
	MEDIUM: 6,
	STRONG: 10,
	EXTREME: 16,
};

/** Number of sparkles for a card with `modifierCount` modifiers; an empty card sparkles like one with a single modifier */
export const sparkleAmount = (
	intensity: Intensity,
	modifierCount: number,
): number => {
	return SPARKLES_PER_MODIFIER[intensity] * Math.max(1, modifierCount);
};
