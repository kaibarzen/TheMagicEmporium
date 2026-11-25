import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { CornerDetail } from "../cornerDetail";
import { FretCorners } from "./FretCorners";

const topLeft = (container: HTMLElement): Element => {
	const corner = container.querySelector('[data-corner="top-left"]');
	if (!corner) {
		throw new Error("No top-left corner rendered");
	}
	return corner;
};

describe("FretCorners", () => {
	it("draws only the outer bracket at bracket detail", () => {
		// ARRANGE & ACT
		const view = render(<FretCorners detail={CornerDetail.Bracket} />);

		// ASSERT
		const corner = topLeft(view.container);
		expect(corner.querySelectorAll("path").length).toBe(1);
		expect(corner.querySelector("rect")).toBeNull();
	});

	it("adds the square stud at stud detail", () => {
		// ARRANGE & ACT
		const view = render(<FretCorners detail={CornerDetail.Stud} />);

		// ASSERT
		const corner = topLeft(view.container);
		expect(corner.querySelectorAll("path").length).toBe(1);
		expect(corner.querySelector("rect")).not.toBeNull();
	});

	it("draws the full fret when no detail is given", () => {
		// ARRANGE & ACT
		const view = render(<FretCorners />);

		// ASSERT
		const corner = topLeft(view.container);
		expect(corner.querySelector('[data-detail="full"]')).not.toBeNull();
		expect(corner.querySelectorAll("path").length).toBe(3);
		expect(corner.querySelectorAll("polygon").length).toBe(0);
	});

	it("adds an outer bracket and arm diamonds at ornate detail", () => {
		// ARRANGE & ACT
		const view = render(<FretCorners detail={CornerDetail.Ornate} />);

		// ASSERT
		const corner = topLeft(view.container);
		expect(corner.querySelectorAll("path").length).toBe(4);
		expect(corner.querySelectorAll("polygon").length).toBe(2);
	});
});
