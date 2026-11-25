import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * corners: the ornaments on the card's four corners.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Corners",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: fret corners as elaborate as the rarity. */
export const Default: Story = {};

/** BRACKET: The plainest fret corners. */
export const Bracket: Story = {
	args: { item: withAppearance({ corners: "BRACKET" }) },
};

/** STUD: Fret corners with a stud. */
export const Stud: Story = {
	args: { item: withAppearance({ corners: "STUD" }) },
};

/** FULL: Full fret corners. */
export const Full: Story = {
	args: { item: withAppearance({ corners: "FULL" }) },
};

/** ORNATE: The most elaborate fret corners. */
export const Ornate: Story = {
	args: { item: withAppearance({ corners: "ORNATE" }) },
};

/** DIAMOND: The separate diamond design. */
export const Diamond: Story = {
	args: { item: withAppearance({ corners: "DIAMOND" }) },
};

/** NONE: Bare corners. */
export const None: Story = {
	args: { item: withAppearance({ corners: "NONE" }) },
};
