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
			const view = render(
				<CloudDecoration variant={variant} rarityColor="#ee7e3e" />,
			);

			// ASSERT
			expect(view.container.querySelector("svg")).not.toBeNull();
			view.unmount();
		}
	});

	it("mirrors the left side onto the right side", () => {
		// ARRANGE & ACT
		const view = render(
			<CloudDecoration variant={CloudVariant.Ruyi} rarityColor="#ee7e3e" />,
		);

		// ASSERT
		const left = view.container.querySelector('[data-side="left"]');
		const right = view.container.querySelector('[data-side="right"]');
		expect(right?.getAttribute("transform")).toBe(
			"translate(488 0) scale(-1 1)",
		);
		expect(right?.innerHTML).toBe(left?.innerHTML);
	});

	it("tints the ember clouds with the rarity colour", () => {
		// ARRANGE & ACT
		const view = render(
			<CloudDecoration variant={CloudVariant.Ember} rarityColor="#b88ce8" />,
		);

		// ASSERT
		expect(view.container.innerHTML).toContain("#b88ce8");
	});

	it("is hidden from assistive technology", () => {
		// ARRANGE & ACT
		const view = render(
			<CloudDecoration variant={CloudVariant.Puffy} rarityColor="#ee7e3e" />,
		);

		// ASSERT
		expect(
			view.container.querySelector("svg")?.getAttribute("aria-hidden"),
		).toBe("true");
	});
});
