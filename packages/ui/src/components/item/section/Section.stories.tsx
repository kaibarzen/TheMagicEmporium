import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rarity } from "@tme/library/src/item/item.types";
import { veilpiercerFixture } from "../../../fixtures/items/veilpiercerFixture";
import { metalStyle } from "../metal/metal";
import { Section, type SectionProps } from "./Section";

/**
 * A titled group of modifiers within an item card — e.g. the primary,
 * secondary, or tertiary slot.
 */
const meta = {
	title: "Components/Item/Section",
	component: Section,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: SectionProps) => (
		<div
			style={{
				...metalStyle(Rarity.VeryRare),
				background: "#040510",
				width: "460px",
				padding: "16px",
			}}
		>
			<Section
				kanji={props.kanji}
				title={props.title}
				modifiers={props.modifiers}
			/>
		</div>
	),
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The primary modifier slot — 凡 fán (Mortal), the weakest tier. */
export const Default: Story = {
	args: { kanji: "凡", title: "FAN", modifiers: veilpiercerFixture.primary },
};

/** The secondary modifier slot — 灵 líng (Spiritual). */
export const Secondary: Story = {
	args: { kanji: "灵", title: "LING", modifiers: veilpiercerFixture.secondary },
};

/** The tertiary modifier slot — 仙 xiān (Immortal), the strongest tier. */
export const Tertiary: Story = {
	args: { kanji: "仙", title: "XIAN", modifiers: veilpiercerFixture.tertiary },
};
