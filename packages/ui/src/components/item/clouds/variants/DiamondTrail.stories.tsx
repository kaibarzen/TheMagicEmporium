import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { DiamondTrail } from "./DiamondTrail";

/**
 * A trail of diamonds shrinking toward the item, with a few loose ones floating above.
 */
const meta = {
	title: "Components/Item/Clouds/DiamondTrail",
	component: DiamondTrail,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<DiamondTrail />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof DiamondTrail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
