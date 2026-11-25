import type { JSX } from "react";
import { ItemDisplay, type ItemDisplayProps } from "../ItemDisplay";

/** Shared Storybook parameters for every ItemDisplay story */
export const itemDisplayParameters = {
	layout: "centered",
	backgrounds: {
		default: "dark",
		values: [{ name: "dark", value: "#040510" }],
	},
};

/** Renders a single card on the dark page background */
export const renderItemDisplay = (props: ItemDisplayProps): JSX.Element => {
	return (
		<div style={{ background: "#040510", padding: "40px" }}>
			<ItemDisplay item={props.item} hideFrame={props.hideFrame} />
		</div>
	);
};
