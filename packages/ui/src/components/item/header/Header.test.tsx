import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
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
});
