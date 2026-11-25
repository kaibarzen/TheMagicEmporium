import { describe, expect, it } from "bun:test";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { legendarySkulltakerFixture } from "../../../fixtures/items/legendarySkulltakerFixture";
import { veryRarePerfectFixture } from "../../../fixtures/items/veryRarePerfectFixture";
import { CloudVariant } from "../clouds/CloudDecoration";
import { CornerVariant } from "../corners/CardCorners";
import { CornerDetail } from "../corners/cornerDetail";
import { sparkleAmount } from "../sparkles/sparkleDensity";
import { resolveAppearance } from "./resolveAppearance";

describe("resolveAppearance", () => {
	it("shows no background by default, whatever the modifiers", () => {
		// ARRANGE & ACT
		const appearance = resolveAppearance(legendarySkulltakerFixture);

		// ASSERT
		expect(appearance.background.image).toBeNull();
	});

	it("uses an explicit background URL", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { background: { image: "art/custom.jpg" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.background.image).toBe("art/custom.jpg");
	});

	it("hides the background when set to NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { background: { image: "NONE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.background.image).toBeNull();
	});

	it("blurs the background partially by default", () => {
		// ARRANGE & ACT
		const appearance = resolveAppearance(new AbstractItem());

		// ASSERT
		expect(appearance.background.blur).toBe("PARTIAL");
	});

	it("uses the chosen background blur", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { background: { blur: "FULL" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.background.blur).toBe("FULL");
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

	it("decorates the header by rarity when left on AUTO", () => {
		// ARRANGE
		const common = new AbstractItem();
		common.rarity = Rarity.Common;
		const legendary = new AbstractItem();
		legendary.rarity = Rarity.Legendary;

		// ACT
		const commonAppearance = resolveAppearance(common);
		const legendaryAppearance = resolveAppearance(legendary);

		// ASSERT
		expect(commonAppearance.header.deco).toBeNull();
		expect(legendaryAppearance.header.deco).toBe(CloudVariant.Puffy);
	});

	it("decorates the header with the chosen cloud design", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { header: { deco: "RUYI" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.header.deco).toBe(CloudVariant.Ruyi);
	});

	it("leaves the header line bare when the deco is NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { header: { deco: "NONE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.header.deco).toBeNull();
	});

	it("tilts by rarity when left on AUTO", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.tilt).toBe("STRONG");
	});

	it("tilts a common card when told to", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { effects: { tilt: "MILD" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.tilt).toBe("MILD");
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
		expect(appearance.effects.sparkles).toBe(sparkleAmount("MEDIUM", 4));
		expect(appearance.effects.reveal).toBe("CIRCLE");
	});

	it("keeps an ordinary roll free of sparkles and reveal", () => {
		// ARRANGE & ACT
		const appearance = resolveAppearance(new AbstractItem());

		// ASSERT
		expect(appearance.effects.sparkles).toBeNull();
		expect(appearance.effects.reveal).toBeNull();
	});

	it("sparkles at the chosen intensity and reveals along with it", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.primary = veryRarePerfectFixture.primary;
		item.appearance = { effects: { sparkles: "STRONG" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).toBe(
			sparkleAmount("STRONG", item.primary.length),
		);
		expect(appearance.effects.reveal).toBe("CIRCLE");
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
		expect(appearance.effects.reveal).toBeNull();
	});

	it("reveals without sparkles when a reveal is chosen", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { effects: { reveal: "CIRCLE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).toBeNull();
		expect(appearance.effects.reveal).toBe("CIRCLE");
	});

	it("uses fret corners that grow more elaborate with rarity when left on AUTO", () => {
		// ARRANGE
		const common = new AbstractItem();
		common.rarity = Rarity.Common;
		const legendary = new AbstractItem();
		legendary.rarity = Rarity.Legendary;

		// ACT
		const commonAppearance = resolveAppearance(common);
		const legendaryAppearance = resolveAppearance(legendary);

		// ASSERT
		expect(commonAppearance.corners).toEqual({
			variant: CornerVariant.Fret,
			detail: CornerDetail.Bracket,
		});
		expect(legendaryAppearance.corners).toEqual({
			variant: CornerVariant.Fret,
			detail: CornerDetail.Ornate,
		});
	});

	it("uses the chosen fret corners whatever the rarity", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { corners: "ORNATE" };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.corners).toEqual({
			variant: CornerVariant.Fret,
			detail: CornerDetail.Ornate,
		});
	});

	it("uses the diamond corners when chosen", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { corners: "DIAMOND" };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.corners?.variant).toBe(CornerVariant.Diamond);
	});

	it("leaves the corners bare when set to NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { corners: "NONE" };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.corners).toBeNull();
	});

	it("skips the reveal of a perfect roll when set to NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.primary = veryRarePerfectFixture.primary;
		item.secondary = veryRarePerfectFixture.secondary;
		item.tertiary = veryRarePerfectFixture.tertiary;
		item.appearance = { effects: { reveal: "NONE" } };

		// ACT
		const appearance = resolveAppearance(item);

		// ASSERT
		expect(appearance.effects.sparkles).not.toBeNull();
		expect(appearance.effects.reveal).toBeNull();
	});
});
