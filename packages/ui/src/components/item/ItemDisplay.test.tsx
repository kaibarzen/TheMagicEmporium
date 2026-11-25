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

	it("tilts a very rare card lightly and a legendary card heavily", () => {
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
			veryRareView.container.querySelector('[data-tilt="LIGHT"]'),
		).not.toBeNull();
		expect(
			legendaryView.container.querySelector('[data-tilt="HEAVY"]'),
		).not.toBeNull();
	});

	it("tilts a common card whose appearance asks for it", () => {
		// ARRANGE
		const item = new AbstractItem();
		item.rarity = Rarity.Common;
		item.appearance = { effects: { tilt: "HEAVY" } };

		// ACT
		const view = render(<ItemDisplay item={item} hideFrame />);

		// ASSERT
		expect(view.container.querySelector('[data-tilt="HEAVY"]')).not.toBeNull();
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
});
