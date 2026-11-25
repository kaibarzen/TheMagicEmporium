import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * colors.accent and colors.metal: recolouring the rarity accent and the frame metal.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Colors",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: the rare accent on the rare metal. */
export const Default: Story = {};

/** A teal accent on the rare metal. */
export const Accent: Story = {
	args: { item: withAppearance({ colors: { accent: "#3fd0c9" } }) },
};

/** The rare accent on a steel-blue metal. */
export const Metal: Story = {
	args: { item: withAppearance({ colors: { metal: "#7f9bb8" } }) },
};

/** A teal accent on a steel-blue metal. */
export const AccentAndMetal: Story = {
	args: {
		item: withAppearance({ colors: { accent: "#3fd0c9", metal: "#7f9bb8" } }),
	},
};
