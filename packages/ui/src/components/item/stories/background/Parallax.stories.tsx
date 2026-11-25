import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * background.blur PARALLAX: the art drifts against the pointer, as if seen through a window. Hover and move around.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Parallax",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Parallax art. */
export const Default: Story = {
	args: { item: withAppearance({ background: { blur: "PARALLAX" } }) },
};
