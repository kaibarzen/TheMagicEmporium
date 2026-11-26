import type { Meta, StoryObj } from "@storybook/react-vite";
import boundlessSpirit from "../../../fixtures/items/BoundlessSpirit.jpg";
import { edgeImages } from "../stories/background/edges/edgeImages";
import { BackgroundEdge, type BackgroundEdgeProps } from "./BackgroundEdge";

/**
 * An image pinned to the top or bottom edge of the card, in front of the
 * background art, shown whole without a fade. Pick any of the example
 * strips from the image control.
 */
const meta = {
	title: "Components/Item/Parts/Background/Edge",
	component: BackgroundEdge,
	parameters: {
		layout: "centered",
	},
	args: {
		side: "BOTTOM",
		image: edgeImages.tentacle1x4,
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

/** An edge pinned to the top. */
export const Top: Story = {
	args: { side: "TOP", image: edgeImages.tentacle1x1 },
};

/** A MEDIUM blurred edge, as if slightly out of focus. */
export const MediumBlur: Story = {
	args: { image: edgeImages.tentacle1x4, blur: "MEDIUM" },
};
