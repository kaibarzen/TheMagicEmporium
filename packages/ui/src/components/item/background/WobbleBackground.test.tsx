import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { WobbleBackground } from "./WobbleBackground";

describe("WobbleBackground", () => {
	it("warps the art through its own noise filter", () => {
		// ARRANGE & ACT
		const view = render(
			<WobbleBackground>
				<div data-art="" />
			</WobbleBackground>,
		);

		// ASSERT
		const filter = view.container.querySelector("filter");
		const art = view.container.querySelector("[data-art]");
		expect(art?.parentElement?.style.filter).toBe(`url(#${filter?.id})`);
	});

	it("gives each instance a distinct filter", () => {
		// ARRANGE & ACT
		const view = render(
			<>
				<WobbleBackground>{null}</WobbleBackground>
				<WobbleBackground>{null}</WobbleBackground>
			</>,
		);

		// ASSERT
		const ids = Array.from(view.container.querySelectorAll("filter")).map(
			(filter) => filter.id,
		);
		expect(new Set(ids).size).toBe(2);
	});
});
