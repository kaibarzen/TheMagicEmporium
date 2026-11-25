import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { BackgroundEdge } from "./BackgroundEdge";

describe("BackgroundEdge", () => {
	it("shows the edge image on the chosen side", () => {
		// ARRANGE & ACT
		const view = render(
			<BackgroundEdge side="BOTTOM" image="art/rubble.png" blur="NONE" />,
		);

		// ASSERT
		const edge = view.container.querySelector('[data-edge="BOTTOM"]');
		expect(edge?.getAttribute("src")).toBe("art/rubble.png");
	});

	it("keeps a NONE edge sharp", () => {
		// ARRANGE & ACT
		const view = render(
			<BackgroundEdge side="TOP" image="art/roots.png" blur="NONE" />,
		);

		// ASSERT
		const edge = view.container.querySelector("[data-edge]") as HTMLElement;
		expect(edge.style.getPropertyValue("--blur")).toBe("0px");
	});

	it("blurs a MEDIUM edge more strongly than a LIGHT one", () => {
		// ARRANGE & ACT
		const light = render(
			<BackgroundEdge side="TOP" image="art/roots.png" blur="LIGHT" />,
		);
		const medium = render(
			<BackgroundEdge side="TOP" image="art/roots.png" blur="MEDIUM" />,
		);

		// ASSERT
		const lightEdge = light.container.querySelector(
			"[data-edge]",
		) as HTMLElement;
		const mediumEdge = medium.container.querySelector(
			"[data-edge]",
		) as HTMLElement;
		expect(
			Number.parseFloat(mediumEdge.style.getPropertyValue("--blur")),
		).toBeGreaterThan(
			Number.parseFloat(lightEdge.style.getPropertyValue("--blur")),
		);
	});

	it("hides the edge image from assistive technology", () => {
		// ARRANGE & ACT
		const view = render(
			<BackgroundEdge side="TOP" image="art/roots.png" blur="NONE" />,
		);

		// ASSERT
		const edge = view.container.querySelector("[data-edge]");
		expect(edge?.getAttribute("aria-hidden")).toBe("true");
	});
});
