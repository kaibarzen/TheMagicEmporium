import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudStoryFrame } from "../CloudStoryFrame";
import { MinimalCurl } from "./MinimalCurl";

/**
 * Each end of the line finishes in a single curl with a diamond.
 */
const meta = {
	title: "Components/Item/Clouds/MinimalCurl",
	component: MinimalCurl,
	parameters: {
		layout: "centered",
	},
	render: () => (
		<CloudStoryFrame>
			<MinimalCurl />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof MinimalCurl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
