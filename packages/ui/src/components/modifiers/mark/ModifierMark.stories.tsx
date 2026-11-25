import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModifierMark } from "./ModifierMark";

/**
 * Brush character with a colour trail that marks a modifier's type on the item card.
 */
const meta = {
	title: "Components/Modifiers/ModifierMark",
	component: ModifierMark,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#07091a" }],
		},
	},
	args: {
		kanji: "进",
		color: "#5dd49a",
	},
	render: (args) => (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "22px 200px",
				gap: "12px",
				height: "120px",
				padding: "16px",
				background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
			}}
		>
			<ModifierMark kanji={args.kanji} color={args.color} />
			<div />
		</div>
	),
} satisfies Meta<typeof ModifierMark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tiered: Story = {
	args: { kanji: "阶", color: "#b88ce8" },
};

export const Independent: Story = {
	args: { kanji: "独", color: "#5db4e8" },
};

export const Unique: Story = {
	args: { kanji: "唯", color: "#ee7e3e" },
};
