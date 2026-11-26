import type { Meta, StoryObj } from "@storybook/react-vite";
import { withAppearance } from "../../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../../ItemDisplay";
import {
	itemDisplayParameters,
	renderItemDisplay,
} from "../../itemDisplayStory";
import { edgeImages } from "./edgeImages";

/**
 * background.bottom: one giant tentacle made with the background-edge ComfyUI
 * workflow, at each of its aspect ratios (width:height).
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Edges/Tentacle",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle9x16 } },
		}),
	},
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 9:16, the best fit for a typical card. */
export const Default: Story = {};

/** 1:1, the default for small and medium details. */
export const Ratio1x1: Story = {
	name: "1:1",
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x1 } },
		}),
	},
};

/** 9:16, the default for large details: going big on a theme. */
export const Ratio9x16: Story = {
	name: "9:16",
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle9x16 } },
		}),
	},
};

/** 1:4, stretching one subject over the whole card. */
export const Ratio1x4: Story = {
	name: "1:4",
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x4 } },
		}),
	},
};
