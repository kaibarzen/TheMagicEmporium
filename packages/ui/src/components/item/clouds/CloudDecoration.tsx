import type { JSX } from "react";
import { CloudBand } from "./variants/CloudBand";
import { EmberClouds } from "./variants/EmberClouds";
import { MinimalCurl } from "./variants/MinimalCurl";
import { PuffyClouds } from "./variants/PuffyClouds";
import { RuyiScrolls } from "./variants/RuyiScrolls";
import { WindStreaks } from "./variants/WindStreaks";

export enum CloudVariant {
	Puffy = "puffy",
	Ruyi = "ruyi",
	Band = "band",
	Minimal = "minimal",
	Ember = "ember",
	Wind = "wind",
}

/** The decoration used on item cards until we decide when to swap variants */
export const DEFAULT_CLOUD_VARIANT = CloudVariant.Puffy;

export interface CloudDecorationProps {
	variant: CloudVariant;
	/** Item rarity colour; only the ember variant uses it */
	rarityColor: string;
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
		case CloudVariant.Minimal:
			return <MinimalCurl />;
		case CloudVariant.Ember:
			return <EmberClouds color={props.rarityColor} />;
		case CloudVariant.Wind:
			return <WindStreaks />;
	}
};
