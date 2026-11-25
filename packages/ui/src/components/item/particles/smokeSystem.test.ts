import { describe, expect, it } from "bun:test";
import { puffDensity, SMOKE_SHADES, spawnPuff, stepPuff } from "./smokeSystem";

describe("smoke", () => {
	it("is born below the bottom edge", () => {
		// ARRANGE & ACT
		const puff = spawnPuff(400, 600, false);

		// ASSERT
		expect(puff.y).toBeGreaterThan(600);
	});

	it("rises and spreads as it drifts", () => {
		// ARRANGE
		const puff = spawnPuff(400, 600, false);
		const startY = puff.y;
		const startRadius = puff.radius;

		// ACT
		stepPuff(puff, 1);

		// ASSERT
		expect(puff.y).toBeLessThan(startY);
		expect(puff.radius).toBeGreaterThan(startRadius);
	});

	it("is faintest at birth and thickest midway", () => {
		// ARRANGE
		const puff = spawnPuff(400, 600, false);
		const born = puffDensity(puff);

		// ACT
		puff.age = puff.lifespan / 2;
		const midway = puffDensity(puff);

		// ASSERT
		expect(born).toBe(0);
		expect(midway).toBe(1);
	});

	it("vanishes once its lifespan is spent", () => {
		// ARRANGE
		const puff = spawnPuff(400, 600, false);

		// ACT
		const alive = stepPuff(puff, puff.lifespan);

		// ASSERT
		expect(alive).toBe(false);
	});

	it("lays BLACK smoke on thicker than WHITE, so it shows on a dark card", () => {
		// ARRANGE & ACT
		const black = SMOKE_SHADES.BLACK.peakAlpha;
		const white = SMOKE_SHADES.WHITE.peakAlpha;

		// ASSERT
		expect(black).toBeGreaterThan(white);
	});
});
