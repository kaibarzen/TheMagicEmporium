import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { WindStreaks } from "./WindStreaks";

/**
 * Thin drifting lines ending in small curls.
 */
const meta = {
	title: "Components/Item/Parts/Clouds/Variants/Wind",
	component: WindStreaks,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<WindStreaks />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof WindStreaks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
