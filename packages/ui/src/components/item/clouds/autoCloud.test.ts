import { describe, expect, it } from "bun:test";
import { Rarity } from "@tme/library/src/item/item.types";
import { autoCloud } from "./autoCloud";
import { CloudVariant } from "./CloudDecoration";

describe("autoCloud", () => {
	it("decorates rare and better cards with puffy clouds", () => {
		// ARRANGE & ACT
		const clouds = [Rarity.Rare, Rarity.VeryRare, Rarity.Legendary].map(
			autoCloud,
		);

		// ASSERT
		expect(clouds).toEqual([
			CloudVariant.Puffy,
			CloudVariant.Puffy,
			CloudVariant.Puffy,
		]);
	});

	it("leaves common and uncommon cards with a bare line", () => {
		// ARRANGE & ACT
		const clouds = [Rarity.Common, Rarity.Uncommon].map(autoCloud);

		// ASSERT
		expect(clouds).toEqual([null, null]);
	});
});
