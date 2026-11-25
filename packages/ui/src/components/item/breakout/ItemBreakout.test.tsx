import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ItemBreakout } from "./ItemBreakout";

describe("ItemBreakout", () => {
	it("shows the item cut-out", () => {
		// ARRANGE & ACT
		render(
			<ItemBreakout
				src="icons/clothes/royal.cutout.png"
				alt="Royal clothes"
				rarityColor="#ee7e3e"
			/>,
		);

		// ASSERT
		const image = screen.getByAltText("Royal clothes");
		expect(image.getAttribute("src")).toBe("icons/clothes/royal.cutout.png");
	});

	it("passes the rarity colour to its styles", () => {
		// ARRANGE & ACT
		const view = render(
			<ItemBreakout src="cutout.png" alt="Item" rarityColor="#b88ce8" />,
		);

		// ASSERT
		const root = view.container.firstElementChild as HTMLElement;
		expect(root.style.getPropertyValue("--rarity-color")).toBe("#b88ce8");
	});

	it("draws the cloud decoration", () => {
		// ARRANGE & ACT
		const view = render(
			<ItemBreakout src="cutout.png" alt="Item" rarityColor="#ee7e3e" />,
		);

		// ASSERT
		expect(view.container.querySelector('[data-side="left"]')).not.toBeNull();
	});
});
