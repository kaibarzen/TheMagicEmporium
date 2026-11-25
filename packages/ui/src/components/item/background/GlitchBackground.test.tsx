import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { GlitchBackground } from "./GlitchBackground";
import { SLICE_COUNT } from "./glitch";

describe("GlitchBackground", () => {
	it("layers two colour channels and the jolting bands of art", () => {
		// ARRANGE & ACT
		const view = render(
			<GlitchBackground image="art/void.jpg" seed="Void Court" />,
		);

		// ASSERT
		const art = view.container.querySelectorAll("[style*='background-image']");
		expect(art.length).toBe(2 + SLICE_COUNT);
		expect(view.container.querySelectorAll("[data-slice]").length).toBe(
			SLICE_COUNT,
		);
	});
});
