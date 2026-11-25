import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Embers } from "./Embers";

describe("Embers", () => {
	it("draws on a canvas hidden from assistive technology", () => {
		// ARRANGE & ACT
		const view = render(<Embers amount={10} style="BRIGHT" />);

		// ASSERT
		const canvas = view.container.querySelector("canvas");
		expect(canvas).not.toBeNull();
		expect(canvas?.closest('[aria-hidden="true"]')).not.toBeNull();
	});
});
