export interface VerticalLayout {
	/** Viewport y the card centres on, usually the cursor */
	anchorY: number;
	viewportHeight: number;
	/** Space kept free at the top and bottom of the viewport */
	margin: number;
	/** Height of everything above the card, such as header art */
	above: number;
	/** Height of the card itself: name and modifiers */
	card: number;
	/** Height of everything below the card */
	below: number;
}

const clamp = (value: number, min: number, max: number): number => {
	return Math.min(Math.max(value, min), max);
};

/**
 * The viewport y for the card's top edge, placed so it reads best. The card
 * centres on the anchor, moves just far enough to show the art and anything
 * else around it when they fit, and always stays on screen itself. A card
 * taller than the viewport starts at the top, so its name comes first.
 */
export const placeCardTop = (layout: VerticalLayout): number => {
	const top = layout.margin;
	const bottom = layout.viewportHeight - layout.margin;
	let cardTop = layout.anchorY - layout.card / 2;

	// Show the surroundings too, if everything fits
	const minWithSurroundings = top + layout.above;
	const maxWithSurroundings = bottom - layout.card - layout.below;
	if (minWithSurroundings <= maxWithSurroundings) {
		cardTop = clamp(cardTop, minWithSurroundings, maxWithSurroundings);
	}

	// The card itself always stays on screen, top edge first
	const maxCardTop = bottom - layout.card;
	if (maxCardTop < top) {
		return top;
	}
	return clamp(cardTop, top, maxCardTop);
};
