import { describe, expect, it } from "bun:test";
import { EMBER_PALETTES } from "./emberPalettes";

describe("EMBER_PALETTES", () => {
	it("burns BRIGHT embers white-hot and cools them to red", () => {
		// ARRANGE
		const palette = EMBER_PALETTES.BRIGHT;

		// ACT
		const hot = palette.core({ heat: 1, hue: 0, age: 0 }, 1);
		const cold = palette.core({ heat: 0, hue: 0, age: 0 }, 1);

		// ASSERT
		expect(hot).toBe("rgba(255, 238, 180, 1)");
		expect(cold).toBe("rgba(190, 40, 15, 1)");
	});

	it("paints BLACK embers over the card instead of lighting it", () => {
		// ARRANGE & ACT
		const palette = EMBER_PALETTES.BLACK;

		// ASSERT
		expect(palette.coreBlend).toBe("source-over");
	});

	it("colours each WISPS ember by its own hue", () => {
		// ARRANGE
		const palette = EMBER_PALETTES.WISPS;

		// ACT
		const red = palette.core({ heat: 1, hue: 0, age: 0 }, 1);
		const blue = palette.core({ heat: 1, hue: 240, age: 0 }, 1);

		// ASSERT
		expect(red).not.toBe(blue);
	});

	it("turns a WISPS ember's hue as it ages", () => {
		// ARRANGE
		const palette = EMBER_PALETTES.WISPS;

		// ACT
		const young = palette.halo({ heat: 1, hue: 0, age: 0 }, 1);
		const old = palette.halo({ heat: 1, hue: 0, age: 2 }, 1);

		// ASSERT
		expect(young).not.toBe(old);
	});
});
