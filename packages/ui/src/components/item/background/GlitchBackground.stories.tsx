import type { Meta, StoryObj } from "@storybook/react-vite";
import boundlessSpirit from "../../../fixtures/items/BoundlessSpirit.jpg";
import {
	GlitchBackground,
	type GlitchBackgroundProps,
} from "./GlitchBackground";

/**
 * Background art breaking up like a corrupted signal. The seed decides
 * which bands of the art jolt sideways.
 */
const meta = {
	title: "Components/Item/Background/GlitchBackground",
	component: GlitchBackground,
	parameters: {
		layout: "centered",
	},
	args: {
		image: boundlessSpirit,
		seed: "Robes of the Ember Court",
	},
	render: (props: GlitchBackgroundProps) => (
		<div
			style={{
				position: "relative",
				width: "460px",
				height: "820px",
				overflow: "hidden",
				borderRadius: "4px",
				background: "#07091a",
			}}
		>
			<GlitchBackground image={props.image} seed={props.seed} />
		</div>
	),
} satisfies Meta<typeof GlitchBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A different seed lays the effect out differently */
export const OtherSeed: Story = {
	args: { seed: "Legendary Veilpiercer" },
};
