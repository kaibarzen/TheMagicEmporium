import type { Meta, StoryObj } from "@storybook/react-vite";
import { baseRareFixture } from "../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "./ItemDisplay";
import {
	itemDisplayParameters,
	renderItemDisplay,
} from "./stories/itemDisplayStory";

/**
 * Renders a full magic item card: header, modifier sections, rarity frame,
 * optional background art, and effects. This is the base rare item every
 * other ItemDisplay story builds on; each appearance setting has its own
 * folder next to this one.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Base",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The base rare item: background art, everything else on AUTO. */
export const Default: Story = {};

/** Renders without the surrounding rarity frame. */
export const HideFrame: Story = {
	args: { hideFrame: true },
};
