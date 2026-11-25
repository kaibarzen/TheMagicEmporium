import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * effects.smoke: smoke behind the text, curling up from the bottom or drifting over the whole card.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Effects/Smoke",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: no smoke. */
export const Default: Story = {};

/** WHITE: pale, ghostly violet-grey curling up from the bottom. */
export const White: Story = {
	args: { item: withAppearance({ effects: { smoke: "WHITE" } }) },
};

/** BLACK: a thick, near-black haze curling up from the bottom. */
export const Black: Story = {
	args: { item: withAppearance({ effects: { smoke: "BLACK" } }) },
};

/** WHITE_FULL: a thin violet-grey mist over the whole card. */
export const WhiteFull: Story = {
	args: { item: withAppearance({ effects: { smoke: "WHITE_FULL" } }) },
};

/** BLACK_FULL: a dark haze over the whole card. */
export const BlackFull: Story = {
	args: { item: withAppearance({ effects: { smoke: "BLACK_FULL" } }) },
};
