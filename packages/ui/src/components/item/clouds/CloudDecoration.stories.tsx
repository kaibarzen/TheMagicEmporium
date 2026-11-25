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
		rarityColor: "#ee7e3e",
	},
	argTypes: {
		variant: { control: "select", options: Object.values(CloudVariant) },
		rarityColor: { control: "color" },
	},
	render: (args) => (
		<CloudStoryFrame>
			<CloudDecoration variant={args.variant} rarityColor={args.rarityColor} />
		</CloudStoryFrame>
	),
} satisfies Meta<typeof CloudDecoration>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default decoration used on item cards */
export const Default: Story = {};

export const Ruyi: Story = { args: { variant: CloudVariant.Ruyi } };

export const Band: Story = { args: { variant: CloudVariant.Band } };

export const Minimal: Story = { args: { variant: CloudVariant.Minimal } };

export const Ember: Story = { args: { variant: CloudVariant.Ember } };

export const Wind: Story = { args: { variant: CloudVariant.Wind } };
