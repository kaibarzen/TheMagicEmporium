import { describe, expect, it } from "bun:test";
import { placeCardTop, type VerticalLayout } from "./placement";

const layout = (overrides: Partial<VerticalLayout>): VerticalLayout => {
	return {
		anchorY: 500,
		viewportHeight: 1000,
		margin: 10,
		above: 0,
		card: 200,
		below: 0,
		...overrides,
	};
};

describe("placeCardTop", () => {
	it("centres the card on the cursor when there is room", () => {
		// ARRANGE & ACT
		const top = placeCardTop(layout({ anchorY: 500, card: 200 }));

		// ASSERT
		expect(top).toBe(400);
	});

	it("moves the card down so the header art above it fits on screen", () => {
		// ARRANGE & ACT
		const top = placeCardTop(layout({ anchorY: 150, above: 300, card: 200 }));

		// ASSERT
		expect(top).toBe(310);
	});

	it("keeps the card above the bottom edge near the bottom of the screen", () => {
		// ARRANGE & ACT
		const top = placeCardTop(layout({ anchorY: 980, card: 200 }));

		// ASSERT
		expect(top).toBe(790);
	});

	it("lets the header art run off the top rather than push the card off screen", () => {
		// ARRANGE & ACT
		const top = placeCardTop(layout({ anchorY: 100, above: 300, card: 800 }));

		// ASSERT
		expect(top).toBe(10);
	});

	it("starts a card taller than the screen at the top so its name reads first", () => {
		// ARRANGE & ACT
		const top = placeCardTop(layout({ anchorY: 900, card: 1400 }));

		// ASSERT
		expect(top).toBe(10);
	});
});
