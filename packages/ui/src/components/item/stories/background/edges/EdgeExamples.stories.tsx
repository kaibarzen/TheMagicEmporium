import type { Meta, StoryObj } from "@storybook/react-vite";
import { withAppearance } from "../../../../../fixtures/items/baseRareFixture";
import { ItemDisplay } from "../../../ItemDisplay";
import {
	itemDisplayParameters,
	renderItemDisplay,
} from "../../itemDisplayStory";
import { edgeImages } from "./edgeImages";

/**
 * background.top / background.bottom: example 9:16 edges made with the
 * background-edge ComfyUI workflow, each on the side it was painted for.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Edges/Examples",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.fire9x16 } },
		}),
	},
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A tongue of fire rising from the bottom. */
export const Default: Story = {};

/** A giant spider hanging down from the top on its thread. */
export const Spider: Story = {
	args: {
		item: withAppearance({
			background: { top: { image: edgeImages.spider9x16 } },
		}),
	},
};

/** A golden angel wing draping down from the top. */
export const AngelWing: Story = {
	args: {
		item: withAppearance({
			background: { top: { image: edgeImages.angelWing9x16 } },
		}),
	},
};

/** A cluster of arcane crystals bursting up from the bottom. */
export const CrystalCluster: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.crystalCluster9x16 } },
		}),
	},
};

/** A thorned vine climbing up from the bottom. */
export const ThornedVine: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.thornedVine9x16 } },
		}),
	},
};

/** Jagged ice shards erupting from the bottom. */
export const Ice: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.ice9x16 } },
		}),
	},
};

/** A tongue of fire rising from the bottom. */
export const Fire: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.fire9x16 } },
		}),
	},
};
