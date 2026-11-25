import type { EdgeBlur } from "@tme/shared/src/types/itemAppearance";
import type { CSSProperties, JSX } from "react";
import styles from "./BackgroundEdge.module.css";

/** Blur radius (px) of each edge blur setting */
const EDGE_BLUR_PX: Record<EdgeBlur, number> = {
	NONE: 0,
	LIGHT: 2,
	MEDIUM: 4,
};

export type EdgeSide = "TOP" | "BOTTOM";

export interface BackgroundEdgeProps {
	side: EdgeSide;
	image: string;
	blur: EdgeBlur;
}

/**
 * An image pinned to the top or bottom edge of the card, spanning its width
 * at the image's own proportions and fading out toward the card's middle.
 * Must be placed inside a positioned container that clips its overflow: a
 * blurred image overhangs the container so its soft rim never shows.
 */
export const BackgroundEdge = (props: BackgroundEdgeProps): JSX.Element => {
	const blur = EDGE_BLUR_PX[props.blur];

	return (
		<img
			className={styles.edge}
			src={props.image}
			alt=""
			aria-hidden="true"
			data-edge={props.side}
			data-edge-blur={props.blur}
			style={
				{
					"--blur": `${blur}px`,
					// Twice the blur radius hides the faded rim outside the card
					"--overhang": `${blur * 2}px`,
				} as CSSProperties
			}
		/>
	);
};
