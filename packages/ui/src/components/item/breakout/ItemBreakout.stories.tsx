import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "@tme/library/src/item/icon";
import { Rarity } from "@tme/library/src/item/item.types";
import { CloudVariant, DEFAULT_CLOUD_VARIANT } from "../clouds/CloudDecoration";
import { metalStyle } from "../metal/metal";
import { getCutoutUrl } from "./cutoutUrl";
import { ItemBreakout } from "./ItemBreakout";

/**
 * Item art breaking out above the top of the card, resting on a golden line
 * with a cloud decoration.
 */
const meta = {
	title: "Components/Item/ItemBreakout",
	component: ItemBreakout,
	parameters: {
		layout: "centered",
	},
	args: {
		src: getCutoutUrl(Icon.RoyalClothes),
		alt: "Royal clothes",
		rarityColor: "#ee7e3e",
		cloudVariant: DEFAULT_CLOUD_VARIANT,
	},
	argTypes: {
		cloudVariant: { control: "select", options: Object.values(CloudVariant) },
		rarityColor: { control: "color" },
	},
	render: (args) => (
		<div
			style={{
				...metalStyle(Rarity.VeryRare),
				width: "460px",
				padding: "278px 28px 40px",
				background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
			}}
		>
			<ItemBreakout
				src={args.src}
				alt={args.alt}
				rarityColor={args.rarityColor}
				cloudVariant={args.cloudVariant}
			/>
		</div>
	),
} satisfies Meta<typeof ItemBreakout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** With the rarity-tinted ember clouds */
export const Ember: Story = {
	args: { cloudVariant: CloudVariant.Ember },
};
