import { describe, expect, it } from "bun:test";
import { getEdgeUrl } from "./edgeUrl";

describe("getEdgeUrl", () => {
	it("points to the .top.png next to the background", () => {
		// ARRANGE & ACT
		const url = getEdgeUrl("backgrounds/cave.jpg", "top");

		// ASSERT
		expect(url).toBe("backgrounds/cave.top.png");
	});

	it("points to the .bottom.png next to the background", () => {
		// ARRANGE & ACT
		const url = getEdgeUrl("backgrounds/cave.jpg", "bottom");

		// ASSERT
		expect(url).toBe("backgrounds/cave.bottom.png");
	});

	it("keeps the background's folder when it contains dots", () => {
		// ARRANGE & ACT
		const url = getEdgeUrl("modules/v1.2/backgrounds/cave.webp", "top");

		// ASSERT
		expect(url).toBe("modules/v1.2/backgrounds/cave.top.png");
	});
});
