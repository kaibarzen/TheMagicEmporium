import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * effects.tilt: how far the card tilts toward the pointer. Hover and move around.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Effects/Tilt",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: rare cards do not tilt. */
export const Default: Story = {};

/** NONE. */
export const None: Story = {
	args: { item: withAppearance({ effects: { tilt: "NONE" } }) },
};

/** MILD. */
export const Mild: Story = {
	args: { item: withAppearance({ effects: { tilt: "MILD" } }) },
};

/** MEDIUM. */
export const Medium: Story = {
	args: { item: withAppearance({ effects: { tilt: "MEDIUM" } }) },
};

/** STRONG. */
export const Strong: Story = {
	args: { item: withAppearance({ effects: { tilt: "STRONG" } }) },
};

/** EXTREME. */
export const Extreme: Story = {
	args: { item: withAppearance({ effects: { tilt: "EXTREME" } }) },
};
