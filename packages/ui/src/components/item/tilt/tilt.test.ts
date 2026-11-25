import { describe, expect, it } from "bun:test";
import { Rarity } from "@tme/library/src/item/item.types";
import { autoTilt } from "./tilt";

describe("autoTilt", () => {
	it("tilts very rare cards lightly and legendary cards heavily", () => {
		// ARRANGE & ACT
		const tilting = [Rarity.VeryRare, Rarity.Legendary].map(autoTilt);

		// ASSERT
		expect(tilting).toEqual(["LIGHT", "HEAVY"]);
	});

	it("keeps common through rare cards still", () => {
		// ARRANGE & ACT
		const tilting = [Rarity.Common, Rarity.Uncommon, Rarity.Rare].map(autoTilt);

		// ASSERT
		expect(tilting).toEqual(["NONE", "NONE", "NONE"]);
	});
});
