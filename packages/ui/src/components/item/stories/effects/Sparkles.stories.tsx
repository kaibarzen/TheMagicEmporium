import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	baseRarePerfectFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * effects.sparkles: sparkle density, scaled to the number of modifiers.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Effects/Sparkles",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: no sparkles unless every modifier rolled its highest breakpoint. */
export const Default: Story = {};

/** NONE. */
export const None: Story = {
	args: { item: withAppearance({ effects: { sparkles: "NONE" } }) },
};

/** MILD. */
export const Mild: Story = {
	args: { item: withAppearance({ effects: { sparkles: "MILD" } }) },
};

/** MEDIUM. */
export const Medium: Story = {
	args: { item: withAppearance({ effects: { sparkles: "MEDIUM" } }) },
};

/** STRONG. */
export const Strong: Story = {
	args: { item: withAppearance({ effects: { sparkles: "STRONG" } }) },
};

/** EXTREME. */
export const Extreme: Story = {
	args: { item: withAppearance({ effects: { sparkles: "EXTREME" } }) },
};

/** AUTO on a perfect roll: every modifier maxed, so the card sparkles MEDIUM. */
export const AutoPerfectRoll: Story = {
	args: { item: baseRarePerfectFixture },
};
