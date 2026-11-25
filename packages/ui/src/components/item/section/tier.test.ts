import { describe, expect, it } from "bun:test";
import { SectionTier, TIER_METAL } from "./tier";

describe("tier", () => {
	it("gives every tier a different metal", () => {
		// ARRANGE
		const tiers = Object.values(SectionTier);

		// ACT
		const bases = tiers.map((tier: SectionTier): string => {
			return TIER_METAL[tier].base;
		});

		// ASSERT
		expect(new Set(bases).size).toBe(tiers.length);
	});
});
