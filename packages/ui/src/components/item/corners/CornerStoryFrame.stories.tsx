import type { Meta, StoryObj } from "@storybook/react-vite";
import { CornerStoryFrame } from "./CornerStoryFrame";

/**
 * Story backdrop for the corner ornaments: an empty item card.
 */
const meta = {
	title: "Components/Item/Parts/Corners/StoryFrame",
	component: CornerStoryFrame,
	parameters: {
		layout: "centered",
	},
	args: {
		children: null,
	},
	render: (args) => <CornerStoryFrame>{args.children}</CornerStoryFrame>,
} satisfies Meta<typeof CornerStoryFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
