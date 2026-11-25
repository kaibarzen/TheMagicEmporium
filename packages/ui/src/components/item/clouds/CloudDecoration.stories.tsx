import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	CloudDecoration,
	CloudVariant,
	DEFAULT_CLOUD_VARIANT,
} from "./CloudDecoration";
import { CloudStoryFrame } from "./CloudStoryFrame";

/**
 * Switches between the cloud decorations that sit on the golden line under
 * the item art.
 */
const meta = {
	title: "Components/Item/Clouds/CloudDecoration",
	component: CloudDecoration,
	parameters: {
		layout: "centered",
	},
	args: {
		variant: DEFAULT_CLOUD_VARIANT,
	},
	argTypes: {
		variant: { control: "select", options: Object.values(CloudVariant) },
	},
	render: (args) => (
		<CloudStoryFrame>
			<CloudDecoration variant={args.variant} />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof CloudDecoration>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default decoration used on item cards */
export const Default: Story = {};

export const Ruyi: Story = { args: { variant: CloudVariant.Ruyi } };

export const Band: Story = { args: { variant: CloudVariant.Band } };

export const Wind: Story = { args: { variant: CloudVariant.Wind } };

export const Diamonds: Story = { args: { variant: CloudVariant.Diamonds } };

export const Stars: Story = { args: { variant: CloudVariant.Stars } };
