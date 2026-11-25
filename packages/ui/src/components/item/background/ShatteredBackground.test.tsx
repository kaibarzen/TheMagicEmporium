import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { ShatteredBackground } from "./ShatteredBackground";
import { SHARD_COUNT } from "./shatter";

describe("ShatteredBackground", () => {
	it("shows the art in every shard", () => {
		// ARRANGE & ACT
		const view = render(
			<ShatteredBackground image="art/glass.jpg" seed="Crimson Fang" />,
		);

		// ASSERT
		const shards = view.container.querySelectorAll("[style*='clip-path']");
		const art = view.container.querySelectorAll<HTMLElement>(
			"[style*='background-image']",
		);
		expect(shards.length).toBe(SHARD_COUNT);
		expect(art.length).toBe(SHARD_COUNT + 1);
		expect(art[0].style.backgroundImage).toContain("art/glass.jpg");
	});

	it("backs the shards with the art so their joins stay seamless", () => {
		// ARRANGE & ACT
		const view = render(
			<ShatteredBackground image="art/glass.jpg" seed="Crimson Fang" />,
		);

		// ASSERT
		const root = view.container.firstElementChild as HTMLElement;
		const backing = root.firstElementChild as HTMLElement;
		expect(backing.style.backgroundImage).toContain("art/glass.jpg");
		expect(backing.style.clipPath).toBe("");
	});

	it("draws no crack lines between the shards", () => {
		// ARRANGE & ACT
		const view = render(
			<ShatteredBackground image="art/glass.jpg" seed="Crimson Fang" />,
		);

		// ASSERT
		expect(view.container.querySelector("svg")).toBeNull();
	});
});
