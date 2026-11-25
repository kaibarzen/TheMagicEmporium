import type { Meta, StoryObj } from "@storybook/react-vite";
import { Smoke, type SmokeProps } from "./Smoke";

/** Smoke curling up from the bottom edge, or drifting over the whole card for the _FULL styles. `style` picks the colour and spread, `amount` the number of puffs. */
const meta = {
	title: "Components/Item/Parts/Effects/Smoke",
	component: Smoke,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	args: {
		amount: 22,
		style: "WHITE",
	},
	render: (props: SmokeProps) => (
		<div
			style={{
				position: "relative",
				width: "460px",
				height: "520px",
				background: "linear-gradient(180deg, #2a2148 0%, #120e24 100%)",
				borderRadius: "4px",
				boxShadow: "inset 0 0 0 1px rgba(212, 166, 74, 0.35)",
			}}
		>
			<Smoke amount={props.amount} style={props.style} />
		</div>
	),
} satisfies Meta<typeof Smoke>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Near-black smoke with a cold blue cast. */
export const Black: Story = {
	args: { style: "BLACK" },
};

/** Thin violet-grey mist drifting over the whole card. */
export const WhiteFull: Story = {
	args: { style: "WHITE_FULL", amount: 36 },
};

/** Dark haze drifting over the whole card. */
export const BlackFull: Story = {
	args: { style: "BLACK_FULL", amount: 36 },
};

/** Sparse — only a handful of puffs. */
export const Few: Story = {
	args: { amount: 8 },
};

/** Dense — a thick bank of smoke. */
export const Many: Story = {
	args: { amount: 40 },
};
