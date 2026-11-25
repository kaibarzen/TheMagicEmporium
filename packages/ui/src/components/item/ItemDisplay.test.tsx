import { describe, expect, it } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { Rarity } from "@tme/library/src/item/item.types";
import { ItemDisplay } from "./ItemDisplay";

describe("ItemDisplay", () => {
	it("renders the item name through the header", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.name = "Sunforged Ring";

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.textContent).toContain("Sunforged Ring");
	});

	it("renders no modifier sections for an item with empty slots", () => {
		// ARRANGE
		const item = new AbstractItem();

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.textContent).not.toContain("仙");
		expect(view.container.textContent).not.toContain("灵");
		expect(view.container.textContent).not.toContain("凡");
	});

	it("mounts without throwing when the full frame is shown", () => {
		// ARRANGE
		const item = new AbstractItem();

		// ACT & ASSERT
		expect(() => render(<ItemDisplay item={item} />)).not.toThrow();
	});

	it("shows no item art while no cut-out has loaded", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.name = "Plain Relic";

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('img[alt="Plain Relic"]')).toBeNull();
	});

	it("marks the card with the item's rarity", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(
			view.container.querySelector('[data-rarity="legendary"]'),
		).not.toBeNull();
	});

	it("gives common items bare bracket corners", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(
			view.container.querySelector('[data-detail="bracket"]'),
		).not.toBeNull();
	});

	it("gives legendary items ornate corners", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(
			view.container.querySelector('[data-detail="ornate"]'),
		).not.toBeNull();
	});
	it("tilts a legendary card while the pointer is over it", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;
		const view = render(<ItemDisplay item={item} hideFrame />);
		const surface = view.container.querySelector("[data-tilt]") as HTMLElement;

		// ACT
		fireEvent.pointerEnter(surface);

		// ASSERT
		expect(surface.hasAttribute("data-tilting")).toBe(true);
	});

	it("settles a tilted card back when the pointer leaves", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.VeryRare;
		const view = render(<ItemDisplay item={item} hideFrame />);
		const surface = view.container.querySelector("[data-tilt]") as HTMLElement;
		fireEvent.pointerEnter(surface);

		// ACT
		fireEvent.pointerLeave(surface);

		// ASSERT
		expect(surface.hasAttribute("data-tilting")).toBe(false);
		expect(surface.style.getPropertyValue("--tilt-x")).toBe("0.000");
	});

	it("keeps a common card still", () => {
		// ARRANGE & ACT
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector("[data-tilt]")).toBeNull();
	});

	it("tilts a very rare card moderately and a legendary card strongly", () => {
		// ARRANGE
		const veryRare = new AbstractItem();
		veryRare.rarity = Rarity.VeryRare;
		const legendary = new AbstractItem();
		legendary.rarity = Rarity.Legendary;

		// ACT
		const veryRareView = render(<ItemDisplay item={veryRare} hideFrame />);
		const legendaryView = render(<ItemDisplay item={legendary} hideFrame />);

		// ASSERT
		expect(
			veryRareView.container.querySelector('[data-tilt="MEDIUM"]'),
		).not.toBeNull();
		expect(
			legendaryView.container.querySelector('[data-tilt="STRONG"]'),
		).not.toBeNull();
	});

	it("tilts a common card whose appearance asks for it", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { effects: { tilt: "EXTREME" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(
			view.container.querySelector('[data-tilt="EXTREME"]'),
		).not.toBeNull();
	});

	it("keeps a legendary card still when its tilt is NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;
		item.appearance = { effects: { tilt: "NONE" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector("[data-tilt]")).toBeNull();
	});

	it("gives a common card ornate corners when its appearance asks for them", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { corners: "ORNATE" };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(
			view.container.querySelector('[data-detail="ornate"]'),
		).not.toBeNull();
	});

	it("draws no corner ornaments when the corners are NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;
		item.appearance = { corners: "NONE" };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector("[data-detail]")).toBeNull();
	});

	it("sweeps light across a legendary card by default", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('[data-gleam="SWEEP"]')).not.toBeNull();
	});

	it("sweeps light across a card that does not tilt when asked to", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { effects: { gleam: "SWEEP" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('[data-gleam="SWEEP"]')).not.toBeNull();
		expect(view.container.querySelector("[data-tilt]")).toBeNull();
	});

	it("keeps a legendary card tilting but unlit when its gleam is NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Legendary;
		item.appearance = { effects: { gleam: "NONE" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector("[data-gleam]")).toBeNull();
		expect(view.container.querySelector("[data-tilt]")).not.toBeNull();
	});

	it("blurs the background art progressively by default", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { background: { image: "art/custom.jpg" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		const background = view.container.querySelector("[data-blur]");
		expect(background?.getAttribute("data-blur")).toBe("PARTIAL");
		expect(background?.children.length).toBeGreaterThan(2);
	});

	it("keeps the background art sharp when its blur is NONE", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { background: { image: "art/custom.jpg", blur: "NONE" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		const layer = view.container.querySelector(
			'[data-blur="NONE"] > [style]',
		) as HTMLElement;
		expect(layer.style.getPropertyValue("--blur")).toBe("0px");
	});

	it("shows the background art through broken glass when its blur is SHATTERED", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = {
			background: { image: "art/custom.jpg", blur: "SHATTERED" },
		};

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(
			view.container.querySelector('[data-blur="SHATTERED"] [data-shards]'),
		).not.toBeNull();
	});

	for (const blur of ["PARALLAX", "GLITCH", "WOBBLE"] as const) {
		it(`renders the ${blur} background treatment`, () => {
			// ARRANGE
			const item = new AbstractItem();
			item.appearance = { background: { image: "art/custom.jpg", blur } };

			// ACT
			const view = render(<ItemDisplay item={item} hideFrame />);

			// ASSERT
			const background = view.container.querySelector(`[data-blur="${blur}"]`);
			expect(background?.innerHTML).toContain("art/custom.jpg");
		});
	}

	it("follows the pointer for a parallax background on a card that does not tilt", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = {
			background: { image: "art/custom.jpg", blur: "PARALLAX" },
		};
		const view = render(<ItemDisplay item={item} hideFrame />);
		const card = view.container.querySelector('[data-rarity="common"]');
		const surface = card?.parentElement?.parentElement as HTMLElement;

		// ACT
		fireEvent.pointerEnter(surface);

		// ASSERT
		expect(surface.hasAttribute("data-tilting")).toBe(true);
		expect(view.container.querySelector("[data-tilt]")).toBeNull();
	});

	it("lays holo foil over a card whose gleam is HOLO", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { effects: { gleam: "HOLO" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('[data-gleam="HOLO"]')).not.toBeNull();
		expect(view.container.querySelector('[data-gleam="SWEEP"]')).toBeNull();
	});

	it("sends embers of the chosen colour up the card", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { effects: { embers: "FIRE" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('[data-embers="FIRE"]')).not.toBeNull();
	});

	it("curls smoke of the chosen colour up the card", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.appearance = { effects: { smoke: "BLACK" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('[data-smoke="BLACK"]')).not.toBeNull();
	});
});
