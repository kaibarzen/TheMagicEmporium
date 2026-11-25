import { describe, expect, it } from "bun:test";
import { Rarity } from "@tme/library/src/item/item.types";
import { EMBER, METAL, metalStyle, RARITY_METAL } from "./metal";

describe("metal", () => {
	it("gives every rarity step a different metal up to very rare", () => {
		// ARRANGE
		const ladder = [
			Rarity.Common,
			Rarity.Uncommon,
			Rarity.Rare,
			Rarity.VeryRare,
		];

		// ACT
		const bases = ladder.map((rarity: Rarity): string => {
			return RARITY_METAL[rarity].base;
		});

		// ASSERT
		expect(new Set(bases).size).toBe(ladder.length);
	});

	it("wears gold on legendary cards", () => {
		// ARRANGE & ACT
		const legendary = RARITY_METAL[Rarity.Legendary];

		// ASSERT
		expect(legendary.base).toBe("#d4a64a");
	});

	it("exposes the rarity's metal as custom properties", () => {
		// ARRANGE & ACT
		const style = metalStyle(Rarity.Rare) as Record<string, string>;

		// ASSERT
		expect(style["--metal"]).toBe(RARITY_METAL[Rarity.Rare].base);
		expect(style["--metal-pale"]).toBe(RARITY_METAL[Rarity.Rare].pale);
		expect(style["--ember"]).toBe(EMBER);
	});

	it("references the same custom properties it sets", () => {
		// ARRANGE
		const style = metalStyle(Rarity.Common) as Record<string, string>;

		// ACT
		const referenced = Object.values(METAL).map((value: string): string => {
			return value.slice("var(".length, -1);
		});

		// ASSERT
		for (const property of referenced) {
			expect(style[property]).toBeDefined();
		}
	});
});
