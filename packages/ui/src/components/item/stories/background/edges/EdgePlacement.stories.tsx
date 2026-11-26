import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	baseRareFixture,
	withAppearance,
} from "../../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../../ItemDisplay";
import {
	itemDisplayParameters,
	renderItemDisplay,
} from "../../itemDisplayStory";
import { edgeImages } from "./edgeImages";

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
		item: withAppearance({
			background: { top: { image: edgeImages.tentacle1x1 } },
		}),
	},
};

/** An edge along the bottom only. */
export const Bottom: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x4 } },
		}),
	},
};

/** Edges along the top and bottom at once. */
export const Both: Story = {
	args: {
		item: withAppearance({
			background: {
				top: { image: edgeImages.tentacle1x1 },
				bottom: { image: edgeImages.tentacle1x4 },
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
				top: { image: edgeImages.tentacle1x1 },
				bottom: { image: edgeImages.tentacle1x4 },
			},
		}),
	},
};
