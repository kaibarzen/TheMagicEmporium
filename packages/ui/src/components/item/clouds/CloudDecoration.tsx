import type { JSX } from "react";
import { CloudBand } from "./variants/CloudBand";
import { DiamondTrail } from "./variants/DiamondTrail";
import { PuffyClouds } from "./variants/PuffyClouds";
import { RuyiScrolls } from "./variants/RuyiScrolls";
import { StarScatter } from "./variants/StarScatter";
import { WindStreaks } from "./variants/WindStreaks";

export enum CloudVariant {
	Puffy = "puffy",
	Ruyi = "ruyi",
	Band = "band",
	Wind = "wind",
	Diamonds = "diamonds",
	Stars = "stars",
}

/** The decoration used on item cards until we decide when to swap variants */
export const DEFAULT_CLOUD_VARIANT = CloudVariant.Puffy;

export interface CloudDecorationProps {
	variant: CloudVariant;
}

/**
 * Mirrored cloud decoration that sits on the golden line under the item art.
 * Switches between the available designs by `variant`.
 */
export const CloudDecoration = (props: CloudDecorationProps): JSX.Element => {
	switch (props.variant) {
		case CloudVariant.Puffy:
			return <PuffyClouds />;
		case CloudVariant.Ruyi:
			return <RuyiScrolls />;
		case CloudVariant.Band:
			return <CloudBand />;
		case CloudVariant.Wind:
			return <WindStreaks />;
		case CloudVariant.Diamonds:
			return <DiamondTrail />;
		case CloudVariant.Stars:
			return <StarScatter />;
	}
};
