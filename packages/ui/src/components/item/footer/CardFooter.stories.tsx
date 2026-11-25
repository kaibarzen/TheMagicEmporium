import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardFooter, type CardFooterProps } from "./CardFooter";

/** Closing ornament at the bottom of an item card, sealed in the rarity colour. */
const meta = {
	title: "Components/Item/CardFooter",
	component: CardFooter,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: CardFooterProps) => (
		<div style={{ background: "#07091a", width: "404px", padding: "24px" }}>
			<CardFooter rarityColor={props.rarityColor} />
		</div>
	),
} satisfies Meta<typeof CardFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Legendary seal. */
export const Default: Story = {
	args: { rarityColor: "#ee7e3e" },
};

/** Very rare seal. */
export const VeryRare: Story = {
	args: { rarityColor: "#b88ce8" },
};

/** Common seal. */
export const Common: Story = {
	args: { rarityColor: "#9d9d9d" },
};
