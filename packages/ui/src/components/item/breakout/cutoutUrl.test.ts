import { describe, expect, it } from "bun:test";
import { Icon } from "@tme/library/src/item/icon";
import { getCutoutUrl } from "./cutoutUrl";

describe("getCutoutUrl", () => {
	it("points to the .cutout.png next to the icon", () => {
		// ARRANGE & ACT
		const url = getCutoutUrl(Icon.RoyalClothes);

		// ASSERT
		expect(url.endsWith("icons/clothes/royal.cutout.png")).toBe(true);
	});

	it("keeps the icon's folder", () => {
		// ARRANGE & ACT
		const url = getCutoutUrl(Icon.Handaxe);

		// ASSERT
		expect(url.endsWith("icons/melee/simple/handaxe.cutout.png")).toBe(true);
	});
});
