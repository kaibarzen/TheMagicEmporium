import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import {
	CloudDecoration,
	CloudVariant,
	DEFAULT_CLOUD_VARIANT,
} from "./CloudDecoration";

describe("CloudDecoration", () => {
	it("uses the puffy clouds by default", () => {
		// ARRANGE & ACT
		const variant = DEFAULT_CLOUD_VARIANT;

		// ASSERT
		expect(variant).toBe(CloudVariant.Puffy);
	});

	it("draws a decoration for every variant", () => {
		for (const variant of Object.values(CloudVariant)) {
			// ARRANGE & ACT
			const view = render(<CloudDecoration variant={variant} />);

			// ASSERT
			expect(view.container.querySelector("svg")).not.toBeNull();
			view.unmount();
		}
	});

	it("mirrors the left side onto the right side", () => {
		// ARRANGE & ACT
		const view = render(<CloudDecoration variant={CloudVariant.Ruyi} />);

		// ASSERT
		const left = view.container.querySelector('[data-side="left"]');
		const right = view.container.querySelector('[data-side="right"]');
		expect(right?.getAttribute("transform")).toBe(
			"translate(488 0) scale(-1 1)",
		);
		expect(right?.innerHTML).toBe(left?.innerHTML);
	});

	it("is hidden from assistive technology", () => {
		// ARRANGE & ACT
		const view = render(<CloudDecoration variant={CloudVariant.Puffy} />);

		// ASSERT
		expect(
			view.container.querySelector("svg")?.getAttribute("aria-hidden"),
		).toBe("true");
	});

	it("draws the diamond trail as diamond shapes", () => {
		// ARRANGE & ACT
		const view = render(<CloudDecoration variant={CloudVariant.Diamonds} />);

		// ASSERT
		const left = view.container.querySelector('[data-side="left"]');
		expect(left?.querySelectorAll("polygon").length).toBeGreaterThan(0);
	});

	it("makes the stars twinkle out of step", () => {
		// ARRANGE & ACT
		const view = render(<CloudDecoration variant={CloudVariant.Stars} />);

		// ASSERT
		const left = view.container.querySelector('[data-side="left"]');
		const delays = Array.from(left?.querySelectorAll("path[style]") ?? []).map(
			(star) => (star as SVGElement).style.animationDelay,
		);
		expect(
			new Set(delays.filter((delay) => delay !== "")).size,
		).toBeGreaterThan(1);
	});
});
