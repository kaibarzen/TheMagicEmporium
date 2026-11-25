import { describe, expect, it } from "bun:test";
import { sparkleAmount } from "./sparkleDensity";

describe("sparkleAmount", () => {
	it("scales the sparkles with the number of modifiers", () => {
		// ARRANGE & ACT
		const short = sparkleAmount("MEDIUM", 2);
		const long = sparkleAmount("MEDIUM", 6);

		// ASSERT
		expect(long).toBe(short * 3);
	});

	it("sparkles more at each step up in intensity", () => {
		// ARRANGE & ACT
		const amounts = (["MILD", "MEDIUM", "STRONG", "EXTREME"] as const).map(
			(intensity) => sparkleAmount(intensity, 4),
		);

		// ASSERT
		expect([...amounts].sort((a, b) => a - b)).toEqual(amounts);
		expect(new Set(amounts).size).toBe(4);
	});

	it("still sparkles on a card without modifiers", () => {
		// ARRANGE & ACT
		const amount = sparkleAmount("MILD", 0);

		// ASSERT
		expect(amount).toBeGreaterThan(0);
	});
});
