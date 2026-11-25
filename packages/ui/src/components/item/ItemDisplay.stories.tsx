import type { Meta, StoryObj } from "@storybook/react-vite";
import { commonFixture } from "../../fixtures/items/commonFixture";
import { legendaryCustomColorsFixture } from "../../fixtures/items/legendaryCustomColorsFixture";
import { legendaryItemArtFixture } from "../../fixtures/items/legendaryItemArtFixture";
import { legendaryNoBackgroundFixture } from "../../fixtures/items/legendaryNoBackgroundFixture";
import { legendaryOverrideBackgroundFixture } from "../../fixtures/items/legendaryOverrideBackgroundFixture";
import { legendaryWarhammerArtFixture } from "../../fixtures/items/legendaryWarhammerArtFixture";
import {
	rareGlitchFixture,
	rareParallaxFixture,
	rareWobbleFixture,
} from "../../fixtures/items/rareBackgroundEffectFixtures";
import { rareCustomAppearanceFixture } from "../../fixtures/items/rareCustomAppearanceFixture";
import {
	rareAutoEdgesFixture,
	rareBloodAndSkullsEdgesFixture,
	rareBloodEdgeFixture,
	rareDarkIceEdgeFixture,
	rareDarkTentaclesEdgeFixture,
	rareDestructionEdgeFixture,
	rareIceEdgeFixture,
	rareMistRuinsEdgeFixture,
	rareParallaxEdgesFixture,
	rareSkullsEdgeFixture,
	rareTentaclesEdgeFixture,
} from "../../fixtures/items/rareEdgeFixtures";
import { rareFixture } from "../../fixtures/items/rareFixture";
import {
	rareBlackEmbersFixture,
	rareBlackFullSmokeFixture,
	rareBlackSmokeFixture,
	rareBrightEmbersFixture,
	rareFireEmbersFixture,
	rareGoldenEmbersFixture,
	rareHoloFixture,
	rareWhiteFullSmokeFixture,
	rareWhiteSmokeFixture,
	rareWispEmbersFixture,
} from "../../fixtures/items/rareParticleFixtures";
import { rareShatteredFixture } from "../../fixtures/items/rareShatteredFixture";
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

/** Legendary recoloured through its appearance: teal accent on a steel-blue metal. */
export const LegendaryCustomColors: Story = {
	args: { item: legendaryCustomColorsFixture },
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

/** A rare item whose appearance sets a fully blurred background, sparkles, extreme tilt, ornate corners and star decoration. */
export const RareCustomAppearance: Story = {
	args: { item: rareCustomAppearanceFixture },
};

/** The custom appearance rare item, with its background art seen through broken glass. */
export const RareShatteredBackground: Story = {
	args: { item: rareShatteredFixture },
};

/** Background art drifting against the pointer, as if seen through a window. Hover and move around. */
export const RareParallaxBackground: Story = {
	args: { item: rareParallaxFixture },
};

/** Background art breaking up like a corrupted signal: split colour, jolting bands, scanlines. */
export const RareGlitchBackground: Story = {
	args: { item: rareGlitchFixture },
};

/** Background art wobbling like something alive: a jelly-like warp that breathes, colours drifting off true. */
export const RareWobbleBackground: Story = {
	args: { item: rareWobbleFixture },
};

/** Blood running down from the top edge and a heap of skulls along the bottom, both edges at once. */
export const RareBackgroundEdges: Story = {
	args: { item: rareBloodAndSkullsEdgesFixture },
};

/** Edges left on AUTO: the card finds redBloodSkull.top.png and redBloodSkull.bottom.png next to its background art. */
export const RareAutoEdges: Story = {
	args: { item: rareAutoEdgesFixture },
};

/** Edge: blood running down from the top in long drips. */
export const RareBloodEdge: Story = {
	args: { item: rareBloodEdgeFixture },
};

/** Edge: a heap of skulls along the bottom. */
export const RareSkullsEdge: Story = {
	args: { item: rareSkullsEdgeFixture },
};

/** Edge: bright, icy blue ice breaking apart along the bottom. */
export const RareIceEdge: Story = {
	args: { item: rareIceEdgeFixture },
};

/** Edge: dark ice breaking apart along the bottom. */
export const RareDarkIceEdge: Story = {
	args: { item: rareDarkIceEdgeFixture },
};

/** Edge: bright purple octopus arms curling up from the bottom. */
export const RareTentaclesEdge: Story = {
	args: { item: rareTentaclesEdgeFixture },
};

/** Edge: dark octopus arms curling up from the bottom. */
export const RareDarkTentaclesEdge: Story = {
	args: { item: rareDarkTentaclesEdgeFixture },
};

/** Edge: rubble and broken pillars along the bottom. */
export const RareDestructionEdge: Story = {
	args: { item: rareDestructionEdgeFixture },
};

/** Edge: ruins sinking into violet mist along the bottom. */
export const RareMistRuinsEdge: Story = {
	args: { item: rareMistRuinsEdgeFixture },
};

/** Blurred edges in front of parallax art: the art drifts behind them while they stay put. Hover and move around. */
export const RareParallaxBackgroundEdges: Story = {
	args: { item: rareParallaxEdgesFixture },
};

/** Rainbow holo foil over the art that shifts with the pointer. */
export const RareHoloFoil: Story = {
	args: { item: rareHoloFixture },
};

/** BRIGHT embers: white-hot to orange to a dull red, like a campfire. */
export const RareBrightEmbers: Story = {
	args: { item: rareBrightEmbersFixture },
};

/** FIRE embers: a deeper, angrier red. */
export const RareFireEmbers: Story = {
	args: { item: rareFireEmbersFixture },
};

/** GOLDEN embers: pale gold to amber. */
export const RareGoldenEmbers: Story = {
	args: { item: rareGoldenEmbersFixture },
};

/** BLACK embers: void-black specks in a cold violet glow. */
export const RareBlackEmbers: Story = {
	args: { item: rareBlackEmbersFixture },
};

/** WISPS embers: every colour, each slowly shifting hue. */
export const RareWispEmbers: Story = {
	args: { item: rareWispEmbersFixture },
};

/** WHITE smoke: pale, ghostly violet-grey curling up behind the text. */
export const RareWhiteSmoke: Story = {
	args: { item: rareWhiteSmokeFixture },
};

/** BLACK smoke: a thick, near-black haze curling up behind the text. */
export const RareBlackSmoke: Story = {
	args: { item: rareBlackSmokeFixture },
};

/** WHITE_FULL smoke: a thin violet-grey mist drifting over the whole card. */
export const RareWhiteFullSmoke: Story = {
	args: { item: rareWhiteFullSmokeFixture },
};

/** BLACK_FULL smoke: a dark haze drifting over the whole card. */
export const RareBlackFullSmoke: Story = {
	args: { item: rareBlackFullSmokeFixture },
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
