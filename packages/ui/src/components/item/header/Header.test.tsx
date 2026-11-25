import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { metalFromColor, RARITY_METAL } from "../metal/metal";
import { Header } from "./Header";

describe("Header", () => {
	it("shows the rarity label", () => {
		// ARRANGE & ACT
		render(
			<Header
				name="Blade"
				rarity={Rarity.Legendary}
				base={Equipment.Relic}
				currency={0}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Legendary")).toBeInTheDocument();
	});

	it("strips the rarity prefix from the name", () => {
		// ARRANGE & ACT
		render(
			<Header
				name="Very Rare Cloak of Shadows"
				rarity={Rarity.VeryRare}
				base={Equipment.Relic}
				currency={0}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Cloak of Shadows")).toBeInTheDocument();
	});

	it("formats currency with thousands separators and a gp suffix", () => {
		// ARRANGE & ACT
		render(
			<Header
				name="Ring"
				rarity={Rarity.Rare}
				base={Equipment.Relic}
				currency={12500}
			/>,
		);

		// ASSERT
		expect(screen.getByText("12,500 gp")).toBeInTheDocument();
	});

	it("shows one divider diamond for common items", () => {
		// ARRANGE & ACT
		render(
			<Header
				name="Ring"
				rarity={Rarity.Common}
				base={Equipment.Relic}
				currency={0}
			/>,
		);

		// ASSERT
		expect(screen.getAllByTestId("rarity-pip")).toHaveLength(1);
	});

	it("shows five divider diamonds for legendary items", () => {
		// ARRANGE & ACT
		render(
			<Header
				name="Ring"
				rarity={Rarity.Legendary}
				base={Equipment.Relic}
				currency={0}
			/>,
		);

		// ASSERT
		expect(screen.getAllByTestId("rarity-pip")).toHaveLength(5);
	});

	it("renders the base equipment title", () => {
		// ARRANGE & ACT
		render(
			<Header
				name="Ring"
				rarity={Rarity.Common}
				base={Equipment.Relic}
				currency={0}
			/>,
		);

		// ASSERT
		expect(screen.getByText("Relic")).toBeInTheDocument();
	});

	it("wears the metal of its rarity", () => {
		// ARRANGE & ACT
		const view = render(
			<Header
				name="Ring"
				rarity={Rarity.Uncommon}
				base={Equipment.Relic}
				currency={0}
			/>,
		);

		// ASSERT
		const root = view.container.firstElementChild as HTMLElement;
		expect(root.style.getPropertyValue("--metal")).toBe(
			RARITY_METAL[Rarity.Uncommon].base,
		);
	});

	it("wears the colours it is given instead of its rarity's", () => {
		// ARRANGE
		const colors = { accent: "#3fd0c9", metal: metalFromColor("#7f9bb8") };

		// ACT
		const view = render(
			<Header
				name="Ring"
				rarity={Rarity.Legendary}
				base={Equipment.Relic}
				currency={0}
				colors={colors}
			/>,
		);

		// ASSERT
		const root = view.container.firstElementChild as HTMLElement;
		expect(root.style.getPropertyValue("--rarity-color")).toBe("#3fd0c9");
		expect(root.style.getPropertyValue("--metal")).toBe("#7f9bb8");
	});
});
