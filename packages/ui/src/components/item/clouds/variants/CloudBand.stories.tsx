import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { CloudBand } from "./CloudBand";

/**
 * Stacked half-round lobes with concentric lines.
 */
const meta = {
	title: "Components/Item/Parts/Clouds/Variants/Band",
	component: CloudBand,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<CloudBand />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof CloudBand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
