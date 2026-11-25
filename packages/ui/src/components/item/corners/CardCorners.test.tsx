import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import {
	CardCorners,
	CornerVariant,
	DEFAULT_CORNER_VARIANT,
} from "./CardCorners";

describe("CardCorners", () => {
	it("uses the fret corners by default", () => {
		// ARRANGE & ACT
		const variant = DEFAULT_CORNER_VARIANT;

		// ASSERT
		expect(variant).toBe(CornerVariant.Fret);
	});

	it("decorates all four corners for every variant", () => {
		for (const variant of Object.values(CornerVariant)) {
			// ARRANGE & ACT
			const view = render(<CardCorners variant={variant} />);

			// ASSERT
			const corners = Array.from(
				view.container.querySelectorAll("[data-corner]"),
			).map((corner) => corner.getAttribute("data-corner"));
			expect(corners).toEqual([
				"top-left",
				"top-right",
				"bottom-right",
				"bottom-left",
			]);
			view.unmount();
		}
	});

	it("draws the same ornament in every corner", () => {
		// ARRANGE & ACT
		const view = render(<CardCorners variant={CornerVariant.Fret} />);

		// ASSERT
		const drawings = Array.from(
			view.container.querySelectorAll("[data-corner]"),
		).map((corner) => corner.innerHTML);
		expect(new Set(drawings).size).toBe(1);
	});

	it("is hidden from assistive technology", () => {
		// ARRANGE & ACT
		const view = render(<CardCorners variant={CornerVariant.Diamond} />);

		// ASSERT
		for (const corner of view.container.querySelectorAll("[data-corner]")) {
			expect(corner.getAttribute("aria-hidden")).toBe("true");
		}
	});
});
