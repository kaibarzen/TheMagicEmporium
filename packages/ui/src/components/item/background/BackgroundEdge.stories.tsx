import type { Meta, StoryObj } from "@storybook/react-vite";
import boundlessSpirit from "../../../fixtures/items/BoundlessSpirit.jpg";
import { edgeImages } from "../../../fixtures/items/rareEdgeFixtures";
import { BackgroundEdge, type BackgroundEdgeProps } from "./BackgroundEdge";

/**
 * An image pinned to the top or bottom edge of the card, in front of the
 * background art, fading out toward the middle. Pick any of the example
 * strips from the image control.
 */
const meta = {
	title: "Components/Item/Background/BackgroundEdge",
	component: BackgroundEdge,
	parameters: {
		layout: "centered",
	},
	args: {
		side: "BOTTOM",
		image: edgeImages.destruction,
		blur: "NONE",
	},
	argTypes: {
		side: { control: "inline-radio", options: ["TOP", "BOTTOM"] },
		blur: { control: "inline-radio", options: ["NONE", "LIGHT", "MEDIUM"] },
		image: {
			control: "select",
			options: Object.keys(edgeImages),
			mapping: edgeImages,
		},
	},
	render: (props: BackgroundEdgeProps) => (
		<div
			style={{
				position: "relative",
				width: "460px",
				height: "640px",
				overflow: "hidden",
				borderRadius: "4px",
				backgroundImage: `url(${boundlessSpirit})`,
				backgroundPosition: "center center",
				backgroundSize: "cover",
			}}
		>
			<BackgroundEdge side={props.side} image={props.image} blur={props.blur} />
		</div>
	),
} satisfies Meta<typeof BackgroundEdge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Blood running down from the top edge. */
export const Top: Story = {
	args: { side: "TOP", image: edgeImages.blood },
};

/** A MEDIUM blurred edge, as if slightly out of focus. */
export const MediumBlur: Story = {
	args: { image: edgeImages.tentacles, blur: "MEDIUM" },
};
