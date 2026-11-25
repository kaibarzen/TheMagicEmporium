import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * effects.reveal: the animation that uncovers the card when it appears. Remount the story to replay it.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Effects/Reveal",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: no reveal, since the card does not sparkle. */
export const Default: Story = {};

/** CIRCLE: the card opens in a widening circle. */
export const Circle: Story = {
	args: { item: withAppearance({ effects: { reveal: "CIRCLE" } }) },
};

/** NONE: shown straight away, even though it sparkles. */
export const None: Story = {
	args: {
		item: withAppearance({ effects: { sparkles: "MEDIUM", reveal: "NONE" } }),
	},
};
