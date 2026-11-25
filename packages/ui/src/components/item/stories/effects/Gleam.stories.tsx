import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * effects.gleam: light that plays across the card under the pointer. Hover and move around.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Effects/Gleam",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: rare cards stay unlit. */
export const Default: Story = {};

/** SWEEP: one band of light across the card when the pointer enters. */
export const Sweep: Story = {
	args: { item: withAppearance({ effects: { gleam: "SWEEP" } }) },
};

/** HOLO: a rainbow foil over the art that shifts with the pointer. */
export const Holo: Story = {
	args: { item: withAppearance({ effects: { gleam: "HOLO" } }) },
};

/** NONE: the card stays unlit. */
export const None: Story = {
	args: { item: withAppearance({ effects: { gleam: "NONE" } }) },
};
