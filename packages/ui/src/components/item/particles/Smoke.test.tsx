import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Smoke } from "./Smoke";

describe("Smoke", () => {
	it("twists the smoke through its own noise filter", () => {
		// ARRANGE & ACT
		const view = render(<Smoke amount={10} style="WHITE" />);

		// ASSERT
		const filter = view.container.querySelector("filter");
		const canvas = view.container.querySelector("canvas");
		expect(canvas?.style.getPropertyValue("--smoke-filter")).toBe(
			`url(#${filter?.id})`,
		);
	});

	it("gives each instance a distinct filter", () => {
		// ARRANGE & ACT
		const view = render(
			<>
				<Smoke amount={1} style="WHITE" />
				<Smoke amount={1} style="BLACK" />
			</>,
		);

		// ASSERT
		const ids = Array.from(view.container.querySelectorAll("filter")).map(
			(filter) => filter.id,
		);
		expect(new Set(ids).size).toBe(2);
	});

	it("marks which colour of smoke it shows", () => {
		// ARRANGE & ACT
		const view = render(<Smoke amount={1} style="BLACK" />);

		// ASSERT
		expect(view.container.querySelector('[data-smoke="BLACK"]')).not.toBeNull();
	});
});
