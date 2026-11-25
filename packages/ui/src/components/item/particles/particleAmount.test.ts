import { describe, expect, it } from "bun:test";
import { emberAmount } from "./particleAmount";

describe("emberAmount", () => {
	it("gives longer cards more embers", () => {
		// ARRANGE & ACT
		const short = emberAmount(1);
		const long = emberAmount(4);

		// ASSERT
		expect(long).toBe(short * 4);
	});

	it("treats an empty card as one modifier", () => {
		// ARRANGE & ACT
		const amount = emberAmount(0);

		// ASSERT
		expect(amount).toBe(emberAmount(1));
	});
});
