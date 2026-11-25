import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { RuyiScrolls } from "./RuyiScrolls";

/**
 * Gold line art curling up into spiral ruyi scrolls.
 */
const meta = {
	title: "Components/Item/Clouds/RuyiScrolls",
	component: RuyiScrolls,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<RuyiScrolls />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof RuyiScrolls>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
