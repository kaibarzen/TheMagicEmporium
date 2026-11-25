import { describe, expect, it } from "bun:test";
import { Rarity } from "@tme/library/src/item/item.types";
import { tiltsOnHover } from "./tilt";

describe("tiltsOnHover", () => {
	it("tilts very rare and legendary cards", () => {
		// ARRANGE & ACT
		const tilting = [Rarity.VeryRare, Rarity.Legendary].map(tiltsOnHover);

		// ASSERT
		expect(tilting).toEqual([true, true]);
	});

	it("keeps common through rare cards still", () => {
		// ARRANGE & ACT
		const tilting = [Rarity.Common, Rarity.Uncommon, Rarity.Rare].map(
			tiltsOnHover,
		);

		// ASSERT
		expect(tilting).toEqual([false, false, false]);
	});
});
