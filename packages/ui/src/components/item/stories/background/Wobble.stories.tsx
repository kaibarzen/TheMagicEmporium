import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * background.blur WOBBLE: the art warps and breathes like something alive.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Wobble",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Wobbling art. */
export const Default: Story = {
	args: { item: withAppearance({ background: { blur: "WOBBLE" } }) },
};
