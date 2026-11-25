import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

/**
 * header.image: the item art above the card.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Header/Image",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: royal clothes have a cut-out, so it breaks out above the card. */
export const Default: Story = {};

/** NONE: no item art; the golden line and its clouds go with it. */
export const None: Story = {
	args: { item: withAppearance({ header: { image: "NONE" } }) },
};

/** An explicit image URL: a warhammer cut-out on the royal clothes. */
export const CustomImage: Story = {
	args: {
		item: withAppearance({
			header: {
				image:
					"modules/the-magic-emporium/icons/melee/martial/warhammer.cutout.png",
			},
		}),
	},
};
