import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	CardCorners,
	CornerVariant,
	DEFAULT_CORNER_VARIANT,
} from "./CardCorners";
import { CornerStoryFrame } from "./CornerStoryFrame";

/**
 * Switches between the corner ornaments of the item card.
 */
const meta = {
	title: "Components/Item/Corners/CardCorners",
	component: CardCorners,
	parameters: {
		layout: "centered",
	},
	args: {
		variant: DEFAULT_CORNER_VARIANT,
	},
	argTypes: {
		variant: { control: "select", options: Object.values(CornerVariant) },
	},
	render: (args) => (
		<CornerStoryFrame>
			<CardCorners variant={args.variant} />
		</CornerStoryFrame>
	),
} satisfies Meta<typeof CardCorners>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default corners used on item cards */
export const Default: Story = {};

export const Diamond: Story = { args: { variant: CornerVariant.Diamond } };
