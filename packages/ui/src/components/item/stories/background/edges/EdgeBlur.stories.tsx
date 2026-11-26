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
 * background.top.blur / background.bottom.blur: how much an edge strip is softened.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Edges/Blur",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** AUTO: LIGHT. */
export const Default: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x4 } },
		}),
	},
};

/** NONE: a sharp edge. */
export const None: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x4, blur: "NONE" } },
		}),
	},
};

/** LIGHT: barely softer than sharp. */
export const Light: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x4, blur: "LIGHT" } },
		}),
	},
};

/** MEDIUM: as if slightly out of focus. */
export const Medium: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacle1x4, blur: "MEDIUM" } },
		}),
	},
};
