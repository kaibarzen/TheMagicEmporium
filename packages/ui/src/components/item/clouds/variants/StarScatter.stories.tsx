import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { StarScatter } from "./StarScatter";

/**
 * Four-pointed stars joined by faint constellation lines, twinkling out of step.
 */
const meta = {
	title: "Components/Item/Clouds/StarScatter",
	component: StarScatter,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<StarScatter />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof StarScatter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
