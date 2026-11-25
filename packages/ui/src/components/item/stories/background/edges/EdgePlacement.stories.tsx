import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../../fixtures/items/baseRareFixture";
import { edgeImages } from "../../../../../fixtures/items/edges/edgeImages";
import { ItemDisplay } from "../../../ItemDisplay";
import {
	itemDisplayParameters,
	renderItemDisplay,
} from "../../itemDisplayStory";

/**
 * background.top / background.bottom: which edges show and where they come from.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Edges/Placement",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** No edges. */
export const Default: Story = {};

/** An edge along the top only. */
export const Top: Story = {
	args: {
		item: withAppearance({ background: { top: { image: edgeImages.blood } } }),
	},
};

/** An edge along the bottom only. */
export const Bottom: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.skulls } },
		}),
	},
};

/** Edges along the top and bottom at once. */
export const Both: Story = {
	args: {
		item: withAppearance({
			background: {
				top: { image: edgeImages.blood },
				bottom: { image: edgeImages.skulls },
			},
		}),
	},
};

/** AUTO: redBloodSkull.jpg has a .top.png and .bottom.png next to it, so the card picks both up by itself. */
export const Auto: Story = {
	args: {
		item: withAppearance({
			background: {
				image: "modules/the-magic-emporium/backgrounds/redBloodSkull.jpg",
			},
		}),
	},
};

/** Edges stay put while parallax art drifts behind them. Hover and move around. */
export const InFrontOfParallax: Story = {
	args: {
		item: withAppearance({
			background: {
				blur: "PARALLAX",
				top: { image: edgeImages.blood },
				bottom: { image: edgeImages.destruction },
			},
		}),
	},
};
