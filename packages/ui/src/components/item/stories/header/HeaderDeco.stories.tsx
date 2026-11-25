import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * header.deco: the cloud design on the golden line under the header art.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Header/Deco",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: puffy clouds on rare and better cards. */
export const Default: Story = {};

/** PUFFY: Puffy clouds. */
export const Puffy: Story = {
	args: { item: withAppearance({ header: { deco: "PUFFY" } }) },
};

/** RUYI: Ruyi scroll clouds. */
export const Ruyi: Story = {
	args: { item: withAppearance({ header: { deco: "RUYI" } }) },
};

/** BAND: A cloud band. */
export const Band: Story = {
	args: { item: withAppearance({ header: { deco: "BAND" } }) },
};

/** WIND: Wind streaks. */
export const Wind: Story = {
	args: { item: withAppearance({ header: { deco: "WIND" } }) },
};

/** DIAMONDS: A trail of diamonds. */
export const Diamonds: Story = {
	args: { item: withAppearance({ header: { deco: "DIAMONDS" } }) },
};

/** STARS: Scattered stars. */
export const Stars: Story = {
	args: { item: withAppearance({ header: { deco: "STARS" } }) },
};

/** NONE: A bare golden line. */
export const None: Story = {
	args: { item: withAppearance({ header: { deco: "NONE" } }) },
};
