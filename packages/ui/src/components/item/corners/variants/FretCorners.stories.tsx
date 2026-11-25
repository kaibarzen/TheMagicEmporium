import type { Meta, StoryObj } from "@storybook/react-vite";
import { CornerStoryFrame } from "../CornerStoryFrame";
import { FretCorners } from "./FretCorners";

/**
 * Fret corners: the square key pattern folded into each corner.
 */
const meta = {
	title: "Components/Item/Corners/FretCorners",
	component: FretCorners,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CornerStoryFrame>
			<FretCorners />
		</CornerStoryFrame>
	),
} satisfies Meta<typeof FretCorners>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
