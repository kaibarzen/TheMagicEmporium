import { describe, expect, it } from "bun:test";
import { emberAlpha, emberHeat, spawnEmber, stepEmber } from "./emberSystem";

describe("embers", () => {
	it("are born below the bottom edge", () => {
		// ARRANGE & ACT
		const ember = spawnEmber(400, 600, false);

		// ASSERT
		expect(ember.y).toBeGreaterThanOrEqual(600);
		expect(ember.x).toBeGreaterThanOrEqual(0);
		expect(ember.x).toBeLessThanOrEqual(400);
	});

	it("rise as they burn", () => {
		// ARRANGE
		const ember = spawnEmber(400, 600, false);
		const start = ember.y;

		// ACT
		stepEmber(ember, 0.5);

		// ASSERT
		expect(ember.y).toBeLessThan(start);
	});

	it("burn out once their lifespan is spent", () => {
		// ARRANGE
		const ember = spawnEmber(400, 600, false);

		// ACT
		const alive = stepEmber(ember, ember.lifespan);

		// ASSERT
		expect(alive).toBe(false);
	});

	it("are invisible at the moment they are born", () => {
		// ARRANGE
		const ember = spawnEmber(400, 600, false);

		// ACT
		const alpha = emberAlpha(ember);

		// ASSERT
		expect(alpha).toBe(0);
		expect(emberHeat(ember)).toBe(1);
	});
});
