import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * effects.embers: embers rising from the bottom edge, flickering and burning out.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Effects/Embers",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: no embers. */
export const Default: Story = {};

/** BRIGHT: white-hot to orange to a dull red, like a campfire. */
export const Bright: Story = {
	args: { item: withAppearance({ effects: { embers: "BRIGHT" } }) },
};

/** FIRE: a deeper, angrier red. */
export const Fire: Story = {
	args: { item: withAppearance({ effects: { embers: "FIRE" } }) },
};

/** GOLDEN: pale gold to amber. */
export const Golden: Story = {
	args: { item: withAppearance({ effects: { embers: "GOLDEN" } }) },
};

/** BLACK: void-black specks in a cold violet glow. */
export const Black: Story = {
	args: { item: withAppearance({ effects: { embers: "BLACK" } }) },
};

/** WISPS: every colour, each slowly shifting hue. */
export const Wisps: Story = {
	args: { item: withAppearance({ effects: { embers: "WISPS" } }) },
};
