import type { Meta, StoryObj } from "@storybook/react-vite";
import boundlessSpirit from "../../../fixtures/items/BoundlessSpirit.jpg";
import {
	WobbleBackground,
	type WobbleBackgroundProps,
} from "./WobbleBackground";

/**
 * Background art that wobbles like something alive: it warps like jelly,
 * breathes, and its colours drift faintly off true.
 */
const meta = {
	title: "Components/Item/Background/WobbleBackground",
	component: WobbleBackground,
	parameters: {
		layout: "centered",
	},
	args: {
		children: null,
	},
	render: (_props: WobbleBackgroundProps) => (
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
			<WobbleBackground>
				<div
					style={{
						position: "absolute",
						inset: "-32px",
						backgroundImage: `url(${boundlessSpirit})`,
						backgroundPosition: "center center",
						backgroundSize: "cover",
					}}
				/>
			</WobbleBackground>
		</div>
	),
} satisfies Meta<typeof WobbleBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
