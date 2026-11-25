import type { Meta, StoryObj } from "@storybook/react-vite";
import { Embers, type EmbersProps } from "./Embers";

/** Sparks that rise from the bottom edge, flicker and burn out. `style` picks the colour, `amount` the number of particles. */
const meta = {
	title: "Components/Item/Parts/Effects/Embers",
	component: Embers,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	args: {
		amount: 40,
		style: "BRIGHT",
	},
	render: (props: EmbersProps) => (
		<div
			style={{
				position: "relative",
				width: "460px",
				height: "520px",
				background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
				borderRadius: "4px",
				boxShadow: "inset 0 0 0 1px rgba(212, 166, 74, 0.35)",
			}}
		>
			<Embers amount={props.amount} style={props.style} />
		</div>
	),
} satisfies Meta<typeof Embers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A deeper, angrier red. */
export const Fire: Story = {
	args: { style: "FIRE" },
};

/** Pale gold to amber. */
export const Golden: Story = {
	args: { style: "GOLDEN" },
};

/** Void-black specks in a cold violet glow. */
export const Black: Story = {
	args: { style: "BLACK" },
};

/** Every colour, each ember slowly shifting hue. */
export const Wisps: Story = {
	args: { style: "WISPS" },
};

/** Sparse — only a handful of particles. */
export const Few: Story = {
	args: { amount: 12 },
};

/** Dense — the most a long card would get. */
export const Many: Story = {
	args: { amount: 120 },
};
