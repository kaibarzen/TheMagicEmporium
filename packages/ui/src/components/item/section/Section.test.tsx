import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import type { AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import { Section } from "./Section";
import { SectionTier, TIER_METAL } from "./tier";

// An object that is not an instance of any blueprint makes ModifierDisplay
// render null, isolating Section's own structural rendering.
const modifiers = [{ modifier: {}, float: 0 }] as unknown as AppliedModifier[];

describe("Section", () => {
	it("renders nothing when there are no modifiers", () => {
		// ARRANGE & ACT
		const view = render(<Section tier={SectionTier.Mortal} modifiers={[]} />);

		// ASSERT
		expect(view.container.firstChild).toBeNull();
	});

	it("renders the tier's title when modifiers are present", () => {
		// ARRANGE & ACT
		render(<Section tier={SectionTier.Spirit} modifiers={modifiers} />);

		// ASSERT
		expect(screen.getByText("LING")).toBeInTheDocument();
	});

	it("renders the tier kanji above the title", () => {
		// ARRANGE & ACT
		render(<Section tier={SectionTier.Spirit} modifiers={modifiers} />);

		// ASSERT
		expect(screen.getByText("灵")).toBeInTheDocument();
	});

	it("dresses the header in the tier's own metal", () => {
		// ARRANGE & ACT
		render(<Section tier={SectionTier.Immortal} modifiers={modifiers} />);

		// ASSERT
		const header = screen.getByText("仙").closest("[data-tier]") as HTMLElement;
		expect(header.dataset.tier).toBe(SectionTier.Immortal);
		expect(header.style.getPropertyValue("--metal")).toBe(
			TIER_METAL[SectionTier.Immortal].base,
		);
	});

	it("flanks the immortal title with cloud curls", () => {
		// ARRANGE & ACT
		render(<Section tier={SectionTier.Immortal} modifiers={modifiers} />);

		// ASSERT
		expect(screen.getAllByTestId("tier-cloud")).toHaveLength(2);
	});

	it("flanks the mortal title with empty diamonds", () => {
		// ARRANGE & ACT
		render(<Section tier={SectionTier.Mortal} modifiers={modifiers} />);

		// ASSERT
		expect(screen.getAllByTestId("tier-hollow-diamond")).toHaveLength(2);
		expect(screen.queryByTestId("tier-cloud")).toBeNull();
	});
});
