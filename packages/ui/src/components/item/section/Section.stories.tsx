import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rarity } from "@tme/library/src/item/item.types";
import { veilpiercerFixture } from "../../../fixtures/items/veilpiercerFixture";
import { metalStyle } from "../metal/metal";
import { Section, type SectionProps } from "./Section";
import { SectionTier } from "./tier";

/**
 * A titled group of modifiers within an item card — e.g. the primary,
 * secondary, or tertiary slot. Each tier's header wears its own metal, so the
 * three sections read as a progression from mortal to immortal.
 */
const meta = {
	title: "Components/Item/Parts/Section",
	component: Section,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	argTypes: {
		tier: {
			control: "select",
			options: Object.values(SectionTier),
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
			<Section tier={props.tier} modifiers={props.modifiers} />
		</div>
	),
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The primary modifier slot — 凡 fán (Mortal), the weakest tier, in muted bronze, flanked by empty diamonds. */
export const Default: Story = {
	args: { tier: SectionTier.Mortal, modifiers: veilpiercerFixture.primary },
};

/** The secondary modifier slot — 灵 líng (Spiritual), in jade-tinged silver, flanked by filled diamonds. */
export const Spirit: Story = {
	args: { tier: SectionTier.Spirit, modifiers: veilpiercerFixture.secondary },
};

/** The tertiary modifier slot — 仙 xiān (Immortal), the strongest tier, in glowing gold with cloud curls. */
export const Immortal: Story = {
	args: { tier: SectionTier.Immortal, modifiers: veilpiercerFixture.tertiary },
};
