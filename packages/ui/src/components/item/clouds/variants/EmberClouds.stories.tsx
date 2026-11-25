import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { EmberClouds } from "./EmberClouds";

/**
 * The puffy clouds tinted with the item's rarity colour.
 */
const meta = {
	title: "Components/Item/Clouds/EmberClouds",
	component: EmberClouds,
	parameters: {
		layout: "centered",
	},
	args: {
		color: "#ee7e3e",
	},
	argTypes: {
		color: { control: "color" },
	},
	render: (args) => (
		<CloudStoryFrame>
			<EmberClouds color={args.color} />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof EmberClouds>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Legendary orange */
export const Default: Story = {};

/** Very rare purple */
export const VeryRare: Story = {
	args: { color: "#b88ce8" },
};

/** Rare blue */
export const Rare: Story = {
	args: { color: "#5b9de8" },
};
