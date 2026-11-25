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
 * background.top / background.bottom: every example edge strip on the side it was made for.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Background/Edges/Images",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: baseRareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** No edges. */
export const Default: Story = {};

/** Blood running down from the top in long drips. */
export const Blood: Story = {
	args: {
		item: withAppearance({ background: { top: { image: edgeImages.blood } } }),
	},
};

/** A heap of skulls along the bottom. */
export const Skulls: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.skulls } },
		}),
	},
};

/** Stark black-and-white skulls along the bottom. */
export const WhiteSkulls: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.whiteSkulls } },
		}),
	},
};

/** Bright, icy blue ice breaking apart along the bottom. */
export const Ice: Story = {
	args: {
		item: withAppearance({ background: { bottom: { image: edgeImages.ice } } }),
	},
};

/** Dark ice breaking apart along the bottom. */
export const DarkIce: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.darkIce } },
		}),
	},
};

/** Bright purple octopus arms curling up from the bottom. */
export const Tentacles: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.tentacles } },
		}),
	},
};

/** Dark octopus arms curling up from the bottom. */
export const DarkTentacles: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.darkTentacles } },
		}),
	},
};

/** Rubble and broken pillars along the bottom. */
export const Destruction: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.destruction } },
		}),
	},
};

/** Ruins sinking into violet mist along the bottom. */
export const MistRuins: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.mistRuins } },
		}),
	},
};

/** Two huge, bloodshot eyes staring over the bottom. */
export const Desperation: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.desperation } },
		}),
	},
};

/** A mound of bloody eyeballs along the bottom. */
export const Eyeballs: Story = {
	args: {
		item: withAppearance({
			background: { bottom: { image: edgeImages.eyeballs } },
		}),
	},
};
