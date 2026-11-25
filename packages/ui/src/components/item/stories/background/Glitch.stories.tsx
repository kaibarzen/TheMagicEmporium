import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * background.blur GLITCH: split colour, jolting bands and scanlines. The item name seeds which bands jolt.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Glitch",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The base item's glitch bands. */
export const Default: Story = {
	args: { item: withAppearance({ background: { blur: "GLITCH" } }) },
};

/** Another name jolts different bands. */
export const OtherSeed: Story = {
	args: {
		item: withAppearance(
			{ background: { blur: "GLITCH" } },
			"Rare Robes of the Void Court",
		),
	},
};
