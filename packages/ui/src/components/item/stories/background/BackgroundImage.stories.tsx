import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * background.image: the art behind the card.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Image",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Background art behind the card. */
export const Default: Story = {};

/** NONE: the plain rarity frame. */
export const None: Story = {
	args: { item: withAppearance({ background: { image: "NONE" } }) },
};
