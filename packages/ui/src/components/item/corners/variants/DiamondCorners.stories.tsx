import type { Meta, StoryObj } from "@storybook/react-vite";
import { CornerStoryFrame } from "../CornerStoryFrame";
import { DiamondCorners } from "./DiamondCorners";

/**
 * A diamond on each corner with gold lines fading along the edges.
 */
const meta = {
	title: "Components/Item/Parts/Corners/Variants/Diamond",
	component: DiamondCorners,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CornerStoryFrame>
			<DiamondCorners />
		</CornerStoryFrame>
	),
} satisfies Meta<typeof DiamondCorners>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
