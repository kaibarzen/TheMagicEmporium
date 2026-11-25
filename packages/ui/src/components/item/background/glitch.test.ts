import { describe, expect, it } from "bun:test";
import { glitchSlices, SLICE_COUNT } from "./glitch";

describe("glitchSlices", () => {
	it("glitches the same seed in the same places every time", () => {
		// ARRANGE & ACT
		const first = glitchSlices("Robes of the Void Court");
		const second = glitchSlices("Robes of the Void Court");

		// ASSERT
		expect(second).toEqual(first);
	});

	it("keeps every band inside the card", () => {
		// ARRANGE & ACT
		const slices = glitchSlices("Robes of the Void Court");

		// ASSERT
		expect(slices.length).toBe(SLICE_COUNT);
		for (const slice of slices) {
			expect(slice.top).toBeGreaterThanOrEqual(0);
			expect(slice.bottom).toBeGreaterThanOrEqual(0);
			expect(slice.top + slice.bottom).toBeLessThan(100);
		}
	});

	it("jolts every band sideways by a noticeable amount", () => {
		// ARRANGE & ACT
		const slices = glitchSlices("Robes of the Void Court");

		// ASSERT
		for (const slice of slices) {
			expect(Math.abs(slice.shift)).toBeGreaterThanOrEqual(6);
		}
	});
});
