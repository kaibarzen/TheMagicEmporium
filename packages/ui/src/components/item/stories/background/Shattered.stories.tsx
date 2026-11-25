import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * background.blur SHATTERED: the art seen through broken glass. The item name seeds the crack pattern.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Shattered",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The base item's crack pattern. */
export const Default: Story = {
	args: { item: withAppearance({ background: { blur: "SHATTERED" } }) },
};

/** Another name breaks the glass in a different place. */
export const OtherSeed: Story = {
	args: {
		item: withAppearance(
			{ background: { blur: "SHATTERED" } },
			"Rare Robes of the Broken Mirror",
		),
	},
};
