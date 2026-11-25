import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { AbstractItem } from "@tme/library/src/item/AbstractItem";
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
});
