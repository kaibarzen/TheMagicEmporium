import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ModifierMark } from "./ModifierMark";

describe("ModifierMark", () => {
	it("shows the modifier type character", () => {
		// ARRANGE & ACT
		render(<ModifierMark kanji="进" color="#5dd49a" />);

		// ASSERT
		expect(screen.getByText("进")).toBeInTheDocument();
	});

	it("paints the mark in the modifier type colour", () => {
		// ARRANGE & ACT
		const view = render(<ModifierMark kanji="唯" color="#ee7e3e" />);

		// ASSERT
		const mark = view.container.firstElementChild as HTMLElement;
		expect(mark.style.getPropertyValue("--mark-color")).toBe("#ee7e3e");
	});

	it("is hidden from assistive technology", () => {
		// ARRANGE & ACT
		const view = render(<ModifierMark kanji="阶" color="#b88ce8" />);

		// ASSERT
		const mark = view.container.firstElementChild as HTMLElement;
		expect(mark.getAttribute("aria-hidden")).toBe("true");
	});
});
