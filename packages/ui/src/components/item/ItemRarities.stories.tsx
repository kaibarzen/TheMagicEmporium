import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryNoBackgroundFixture } from "../../fixtures/items/legendaryNoBackgroundFixture";
import { rareFixture } from "../../fixtures/items/rareFixture";
import { uncommonFixture } from "../../fixtures/items/uncommonFixture";
import { veryRareFixture } from "../../fixtures/items/veryRareFixture";
import { ItemDisplay, type ItemDisplayProps } from "./ItemDisplay";

const LINEUP = [
	commonFixture,
	uncommonFixture,
	rareFixture,
	veryRareFixture,
	legendaryNoBackgroundFixture,
];

/**
 * Every rarity side by side, to compare the frame metal (iron, bronze,
 * silver, gold, gold with embers), corner detail and name styling.
 */
const meta = {
	title: "Components/Item/Rarities",
	component: ItemDisplay,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		item: commonFixture,
		hideFrame: true,
	},
	render: (props: ItemDisplayProps) => (
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
				<ItemDisplay key={item.name} item={item} hideFrame={props.hideFrame} />
			))}
		</div>
	),
} satisfies Meta<typeof ItemDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Cards only, without the surrounding aura */
export const Default: Story = {};

/** With the aura backdrop around each card */
export const WithFrame: Story = {
	args: { hideFrame: false },
};
