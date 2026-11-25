import type { Meta, StoryObj } from "@storybook/react-vite";
import boundlessSpirit from "../../../fixtures/items/BoundlessSpirit.jpg";
import {
	ShatteredBackground,
	type ShatteredBackgroundProps,
} from "./ShatteredBackground";

/**
 * Background art seen through broken glass. The seed decides the crack
 * pattern, so each item shatters its own way.
 */
const meta = {
	title: "Components/Item/Parts/Background/Shattered",
	component: ShatteredBackground,
	parameters: {
		layout: "centered",
	},
	args: {
		image: boundlessSpirit,
		seed: "Robes of the Ember Court",
	},
	render: (props: ShatteredBackgroundProps) => (
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
			<ShatteredBackground image={props.image} seed={props.seed} />
		</div>
	),
} satisfies Meta<typeof ShatteredBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A different seed breaks the glass in a different place */
export const OtherSeed: Story = {
	args: { seed: "Legendary Veilpiercer" },
};
