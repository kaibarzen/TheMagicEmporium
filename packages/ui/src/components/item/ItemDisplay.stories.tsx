import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryItemArtFixture } from "../../fixtures/items/legendaryItemArtFixture";
import { legendaryNoBackgroundFixture } from "../../fixtures/items/legendaryNoBackgroundFixture";
import { legendaryOverrideBackgroundFixture } from "../../fixtures/items/legendaryOverrideBackgroundFixture";
import { legendaryWarhammerArtFixture } from "../../fixtures/items/legendaryWarhammerArtFixture";
import { rareCustomAppearanceFixture } from "../../fixtures/items/rareCustomAppearanceFixture";
import { rareFixture } from "../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../fixtures/items/veryRareFixture";
import { veryRarePerfectFixture } from "../../fixtures/items/veryRarePerfectFixture";
import { ItemDisplay, type ItemDisplayProps } from "./ItemDisplay";

/**
 * Renders a full magic item card: header, modifier sections, rarity frame,
 * optional background art, and sparkles. This is the primary readout for a
 * forged item.
 */
const meta = {
	title: "Components/Item",
	component: ItemDisplay,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#040510" }],
		},
	},
	render: (props: ItemDisplayProps) => (
		<div style={{ background: "#040510", padding: "40px" }}>
			<ItemDisplay item={props.item} hideFrame={props.hideFrame} />
		</div>
	),
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A legendary item using an explicit background override. */
export const Default: Story = {
	args: { item: legendaryOverrideBackgroundFixture },
};

/** Legendary whose base item has a cut-out, so the item art breaks out above the card. */
export const LegendaryItemArt: Story = {
	args: { item: legendaryItemArtFixture },
};

/** Legendary warhammer with a cut-out: a weapon cut only along its handle. */
export const LegendaryWarhammerArt: Story = {
	args: { item: legendaryWarhammerArtFixture },
};

/** Legendary with no background — falls back to the plain rarity frame. */
export const LegendaryNoBackground: Story = {
	args: { item: legendaryNoBackgroundFixture },
};

/** Legendary whose background is set via an explicit override. */
export const LegendaryOverrideBackground: Story = {
	args: { item: legendaryOverrideBackgroundFixture },
};

/** A very rare item. */
export const VeryRare: Story = {
	args: { item: veryRareFixture },
};

/** A very rare item with every modifier float maxed — a perfect roll. */
export const VeryRarePerfect: Story = {
	args: { item: veryRarePerfectFixture },
};

/** A rare item. */
export const Rare: Story = {
	args: { item: rareFixture },
};

/** A rare item whose appearance sets its background, sparkles and heavy tilt, and drops the clouds. */
export const RareCustomAppearance: Story = {
	args: { item: rareCustomAppearanceFixture },
};

/** An uncommon item. */
export const Uncommon: Story = {
	args: { item: uncommonFixture },
};

/** A common item. */
export const Common: Story = {
	args: { item: commonFixture },
};

/** Renders without the surrounding rarity frame. */
export const HideFrame: Story = {
	args: { item: legendaryOverrideBackgroundFixture, hideFrame: true },
};
