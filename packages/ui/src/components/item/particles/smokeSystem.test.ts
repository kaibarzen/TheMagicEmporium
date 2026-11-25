import { describe, expect, it } from "bun:test";
import {
	isFullSmoke,
	puffDensity,
	SMOKE_SHADES,
	spawnDriftingPuff,
	spawnRisingPuff,
	stepPuff,
} from "./smokeSystem";

describe("smoke", () => {
	it("is born below the bottom edge", () => {
		// ARRANGE & ACT
		const puff = spawnRisingPuff(400, 600, false);

		// ASSERT
		expect(puff.y).toBeGreaterThan(600);
	});

	it("rises and spreads as it drifts", () => {
		// ARRANGE
		const puff = spawnRisingPuff(400, 600, false);
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
		const puff = spawnRisingPuff(400, 600, false);
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
		const puff = spawnRisingPuff(400, 600, false);

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

	it("drifts in anywhere on the card when it covers the whole card", () => {
		// ARRANGE & ACT
		const puffs = Array.from({ length: 50 }, () =>
			spawnDriftingPuff(400, 600, false),
		);

		// ASSERT
		for (const puff of puffs) {
			expect(puff.y).toBeGreaterThanOrEqual(0);
			expect(puff.y).toBeLessThanOrEqual(600);
		}
	});

	it("drifts up more lazily than rising smoke", () => {
		// ARRANGE & ACT
		const drifting = spawnDriftingPuff(400, 600, false);
		const rising = spawnRisingPuff(400, 600, false);

		// ASSERT
		expect(Math.abs(drifting.vy)).toBeLessThan(Math.abs(rising.vy));
	});

	it("thins full-card smoke so the header art still shows through", () => {
		// ARRANGE & ACT
		const full = SMOKE_SHADES.BLACK_FULL.peakAlpha;
		const rising = SMOKE_SHADES.BLACK.peakAlpha;

		// ASSERT
		expect(full).toBeLessThan(rising);
	});

	it("tells full-card smoke apart from rising smoke", () => {
		// ARRANGE & ACT
		const full = isFullSmoke("WHITE_FULL");
		const rising = isFullSmoke("WHITE");

		// ASSERT
		expect(full).toBe(true);
		expect(rising).toBe(false);
	});
});
