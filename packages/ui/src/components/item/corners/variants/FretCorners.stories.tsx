import type { Meta, StoryObj } from "@storybook/react-vite";
import { CornerStoryFrame } from "../CornerStoryFrame";
import { CornerDetail } from "../cornerDetail";
import { FretCorners } from "./FretCorners";

/**
 * Fret corners: the square key pattern folded into each corner. The detail
 * level grows with rarity, from a bare bracket to ornate.
 */
const meta = {
	title: "Components/Item/Corners/FretCorners",
	component: FretCorners,
	parameters: {
		layout: "centered",
	},
	args: {
		detail: CornerDetail.Full,
	},
	argTypes: {
		detail: { control: "select", options: Object.values(CornerDetail) },
	},
	render: (args) => (
		<CornerStoryFrame>
			<FretCorners detail={args.detail} />
		</CornerStoryFrame>
	),
} satisfies Meta<typeof FretCorners>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Rare and very rare: the complete fret */
export const Default: Story = {};

/** Common: only the outer bracket */
export const Bracket: Story = { args: { detail: CornerDetail.Bracket } };

/** Uncommon: bracket and stud */
export const Stud: Story = { args: { detail: CornerDetail.Stud } };

/** Legendary: outer bracket, arm diamonds and an ember glow */
export const Ornate: Story = { args: { detail: CornerDetail.Ornate } };
