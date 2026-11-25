import type { JSX } from "react";
import { DiamondCorners } from "./variants/DiamondCorners";
import { FretCorners } from "./variants/FretCorners";

export enum CornerVariant {
	Fret = "fret",
	Diamond = "diamond",
}

/** The corner ornament used on item cards until we decide when to swap variants */
export const DEFAULT_CORNER_VARIANT = CornerVariant.Fret;

export interface CardCornersProps {
	variant: CornerVariant;
}

/**
 * Ornaments on the four corners of the item card. Must be placed inside a
 * positioned container. Switches between the available designs by `variant`.
 */
export const CardCorners = (props: CardCornersProps): JSX.Element => {
	switch (props.variant) {
		case CornerVariant.Fret:
			return <FretCorners />;
		case CornerVariant.Diamond:
			return <DiamondCorners />;
	}
};
