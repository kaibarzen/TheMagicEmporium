import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "./CloudStoryFrame";

/**
 * Story backdrop for the cloud decorations: a dark strip with the golden line.
 */
const meta = {
	title: "Components/Item/Parts/Clouds/StoryFrame",
	component: CloudStoryFrame,
	parameters: {
		layout: "centered",
	},
	args: {
		children: <div style={{ height: "96px" }} />,
	},
	render: (args) => <CloudStoryFrame>{args.children}</CloudStoryFrame>,
} satisfies Meta<typeof CloudStoryFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
