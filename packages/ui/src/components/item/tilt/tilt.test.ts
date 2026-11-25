import { describe, expect, it } from "bun:test";
import { Rarity } from "@tme/library/src/item/item.types";
import { autoGleam, autoTilt } from "./tilt";

describe("autoTilt", () => {
	it("tilts very rare cards moderately and legendary cards strongly", () => {
		// ARRANGE & ACT
		const tilting = [Rarity.VeryRare, Rarity.Legendary].map(autoTilt);

		// ASSERT
		expect(tilting).toEqual(["MEDIUM", "STRONG"]);
	});

	it("keeps common through rare cards still", () => {
		// ARRANGE & ACT
		const tilting = [Rarity.Common, Rarity.Uncommon, Rarity.Rare].map(autoTilt);

		// ASSERT
		expect(tilting).toEqual(["NONE", "NONE", "NONE"]);
	});
});

describe("autoGleam", () => {
	it("sweeps light across very rare and legendary cards", () => {
		// ARRANGE & ACT
		const gleams = [Rarity.VeryRare, Rarity.Legendary].map(autoGleam);

		// ASSERT
		expect(gleams).toEqual(["SWEEP", "SWEEP"]);
	});

	it("keeps common through rare cards unlit", () => {
		// ARRANGE & ACT
		const gleams = [Rarity.Common, Rarity.Uncommon, Rarity.Rare].map(autoGleam);

		// ASSERT
		expect(gleams).toEqual(["NONE", "NONE", "NONE"]);
	});
});
