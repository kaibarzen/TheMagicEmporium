import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	CardCorners,
	CornerVariant,
	DEFAULT_CORNER_VARIANT,
} from "./CardCorners";
import { CornerStoryFrame } from "./CornerStoryFrame";
import { CornerDetail } from "./cornerDetail";

/**
 * Switches between the corner ornaments of the item card.
 */
const meta = {
	title: "Components/Item/Parts/Corners/CardCorners",
	component: CardCorners,
	parameters: {
		layout: "centered",
	},
	args: {
		variant: DEFAULT_CORNER_VARIANT,
		detail: CornerDetail.Full,
	},
	argTypes: {
		variant: { control: "select", options: Object.values(CornerVariant) },
		detail: { control: "select", options: Object.values(CornerDetail) },
	},
	render: (args) => (
		<CornerStoryFrame>
			<CardCorners variant={args.variant} detail={args.detail} />
		</CornerStoryFrame>
	),
} satisfies Meta<typeof CardCorners>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default corners used on item cards; pick another from the variant and detail controls */
export const Default: Story = {};
