import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { PuffyClouds } from "./PuffyClouds";

/**
 * Filled navy clouds with gold outlines, three per side.
 */
const meta = {
	title: "Components/Item/Parts/Clouds/Variants/Puffy",
	component: PuffyClouds,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<PuffyClouds />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof PuffyClouds>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
