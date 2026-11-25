import { describe, expect, it } from "bun:test";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { legendaryModifierBackgroundFixture } from "../../../fixtures/items/legendaryModifierBackgroundFixture";
import { veryRarePerfectFixture } from "../../../fixtures/items/veryRarePerfectFixture";
import { resolveAppearance } from "./resolveAppearance";

describe("resolveAppearance", () => {
	it("takes the background from the modifiers when left on AUTO", () => {
		// ARRANGE & ACT
		const appearance = resolveAppearance(legendaryModifierBackgroundFixture);

		// ASSERT
		expect(appearance.background).toBe(
			legendaryModifierBackgroundFixture.getModifierBackground(),
		);
		expect(appearance.background).not.toBeNull();
	});

	it("uses an explicit background URL over the modifiers", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { background: { image: "art/custom.jpg" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.background).toBe("art/custom.jpg");
	});

	it("hides the background when set to NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.primary = legendaryModifierBackgroundFixture.primary;
		item.secondary = legendaryModifierBackgroundFixture.secondary;
		item.tertiary = legendaryModifierBackgroundFixture.tertiary;
		item.appearance = { background: { image: "NONE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.background).toBeNull();
	});

	it("looks for a cut-out of the base icon as header art by default", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.base = Equipment.Longsword;

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.header.image).toEndWith(".cutout.png");
	});

	it("drops the header art when set to NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { header: { image: "NONE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.header.image).toBeNull();
	});

	it("decorates the header with clouds by default", () => {
		// ARRANGE & ACT
		const appearance = resolveAppearance(new AbstractItem());

		// ASSERT
		expect(appearance.header.deco).toBe("CLOUDS");
	});

	it("tilts by rarity when left on AUTO", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.tilt).toBe("HEAVY");
	});

	it("tilts a common card when told to", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { effects: { tilt: "LIGHT" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.tilt).toBe("LIGHT");
	});

	it("sparkles and reveals a perfect roll when left on AUTO", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.primary = veryRarePerfectFixture.primary;
		item.secondary = veryRarePerfectFixture.secondary;
		item.tertiary = veryRarePerfectFixture.tertiary;

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).toBe(24);
		expect(appearance.effects.reveal).toBe(true);
	});

	it("keeps an ordinary roll free of sparkles and reveal", () => {
		// ARRANGE & ACT
		const appearance = resolveAppearance(new AbstractItem());

		// ASSERT
		expect(appearance.effects.sparkles).toBeNull();
		expect(appearance.effects.reveal).toBe(false);
	});

	it("uses an explicit sparkle count and reveals along with it", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { effects: { sparkles: 12 } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).toBe(12);
		expect(appearance.effects.reveal).toBe(true);
	});

	it("silences a perfect roll when sparkles are NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.primary = veryRarePerfectFixture.primary;
		item.secondary = veryRarePerfectFixture.secondary;
		item.tertiary = veryRarePerfectFixture.tertiary;
		item.appearance = { effects: { sparkles: "NONE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).toBeNull();
		expect(appearance.effects.reveal).toBe(false);
	});

	it("reveals without sparkles when reveal is forced on", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { effects: { reveal: true } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).toBeNull();
		expect(appearance.effects.reveal).toBe(true);
	});
});
