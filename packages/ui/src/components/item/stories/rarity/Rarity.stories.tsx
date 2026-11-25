import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JSX } from "react";
import { commonFixture } from "../../../../fixtures/items/commonFixture";
import { legendaryNoBackgroundFixture } from "../../../../fixtures/items/legendaryNoBackgroundFixture";
import { rareFixture } from "../../../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../../../fixtures/items/veryRareFixture";
import { ItemDisplay, type ItemDisplayProps } from "../../ItemDisplay";
import { itemDisplayParameters, renderItemDisplay } from "../itemDisplayStory";

const LINEUP = [
	commonFixture,
	uncommonFixture,
	rareFixture,
	veryRareFixture,
	legendaryNoBackgroundFixture,
];

/**
 * One item of each rarity, every appearance setting left on its default, to
 * compare what the rarity alone gives a card: frame metal, accent, corner
 * detail, clouds, tilt and gleam.
 */
const meta = {
	title: "Components/Item/ItemDisplay/Rarity",
	component: ItemDisplay,
	parameters: { ...itemDisplayParameters },
	args: { item: rareFixture },
	render: renderItemDisplay,
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A rare item. */
export const Default: Story = {};

/** A common item: iron frame, bare line under the header. */
export const Common: Story = {
	args: { item: commonFixture },
};

/** An uncommon item: bronze frame. */
export const Uncommon: Story = {
	args: { item: uncommonFixture },
};

/** A very rare item: tilts MEDIUM and sweeps a gleam on hover. */
export const VeryRare: Story = {
	args: { item: veryRareFixture },
};

/** A legendary item: gold frame, tilts STRONG and sweeps a gleam on hover. */
export const Legendary: Story = {
	args: { item: legendaryNoBackgroundFixture },
};

/** Every rarity side by side, without the surrounding aura. */
export const Lineup: Story = {
	args: { hideFrame: true },
	parameters: { layout: "fullscreen" },
	render: (props: ItemDisplayProps): JSX.Element => {
		return (
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "flex-start",
					gap: "32px",
					padding: "40px",
					background: "#040510",
				}}
			>
				{LINEUP.map((item) => (
					<ItemDisplay
						key={item.name}
						item={item}
						hideFrame={props.hideFrame}
					/>
				))}
			</div>
		);
	},
};
