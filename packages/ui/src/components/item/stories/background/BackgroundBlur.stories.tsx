import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * background.blur: the plain blur settings. The animated treatments (shattered, parallax, glitch, wobble) have their own folders.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Blur",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: PARTIAL. */
export const Default: Story = {};

/** LIGHT: Softens the whole card evenly. */
export const Light: Story = {
	args: { item: withAppearance({ background: { blur: "LIGHT" } }) },
};

/** PARTIAL: Sharp behind the header, blurring toward the modifiers. */
export const Partial: Story = {
	args: { item: withAppearance({ background: { blur: "PARTIAL" } }) },
};

/** FULL: Blurs the whole card evenly and strongly. */
export const Full: Story = {
	args: { item: withAppearance({ background: { blur: "FULL" } }) },
};

/** NONE: Keeps the art sharp everywhere. */
export const None: Story = {
	args: { item: withAppearance({ background: { blur: "NONE" } }) },
};
