import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { CardFooter } from "./CardFooter";

describe("CardFooter", () => {
	it("fills the seal with the rarity colour", () => {
		// ARRANGE & ACT
		const view = render(<CardFooter rarityColor="#ee7e3e" />);

		// ASSERT
		expect(view.container.querySelector('path[fill="#ee7e3e"]')).not.toBeNull();
	});

	it("is hidden from assistive technology", () => {
		// ARRANGE & ACT
		render(<CardFooter rarityColor="#ee7e3e" />);

		// ASSERT
		expect(
			screen.getByTestId("card-footer").querySelector("svg"),
		).toHaveAttribute("aria-hidden", "true");
	});
});
